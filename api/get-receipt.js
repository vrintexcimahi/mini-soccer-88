// =========================================================
//  GET /api/get-receipt?order_id=MS88-XXX&token=HMAC
//  Ambil data nota — URL di-protect dengan HMAC token
// =========================================================

'use strict';

const crypto = require('crypto');
const { generateReceiptToken, fmtRp, fmtDateID, fmtDateTimeWIB } = require('./_schema');
const store = require('./_store');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' });

  const { order_id, token } = req.query;
  if (!order_id || !token) {
    return res.status(400).json({ error: 'order_id dan token wajib diisi.' });
  }

  // Validasi format
  if (!/^MS88-\d{8}-[A-Z0-9]{6}$/.test(order_id)) {
    return res.status(400).json({ error: 'Format order_id tidak valid.' });
  }

  // Verifikasi token (HMAC-SHA256)
  const secret   = process.env.RECEIPT_SECRET || 'ms88-receipt-secret-key-2026';
  const expected = generateReceiptToken(order_id, secret);

  // Constant-time comparison untuk mencegah timing attack
  let tokensMatch = false;
  try {
    tokensMatch = crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(expected, 'hex'),
    );
  } catch {
    tokensMatch = false;
  }

  if (!tokensMatch) {
    return res.status(403).json({ error: 'Akses ditolak. Token tidak valid.' });
  }

  // Ambil payment record
  const payment = store.getPayment(order_id);
  if (!payment) {
    return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
  }

  // Ambil atau buat receipt record
  let receipt = store.getReceiptByOrder(order_id);

  if (!receipt && payment.status === 'paid') {
    // Regenerasi nota jika hilang tapi payment sudah paid (fault recovery)
    const { generateReceiptNo, VENUE_INFO } = require('./_schema');
    const seq        = store.nextReceiptSeq();
    const receipt_no = generateReceiptNo(seq);
    receipt = store.saveReceipt({
      receipt_no,
      order_id,
      access_token: token,
      snapshot: {
        customer_name:  payment.customer_name,
        customer_phone: payment.customer_phone,
        session_name:   payment.session_name,
        session_key:    payment.session_key,
        date:           payment.date,
        time_start:     payment.time_start,
        duration_hours: payment.duration_hours,
        amount:         payment.amount,
        paid_at:        payment.paid_at,
        provider:       payment.provider,
        transaction_id: payment.provider_transaction_id,
        venue:          VENUE_INFO,
      },
    });
  }

  // Build response
  const snap = receipt ? receipt.snapshot : {};
  const isPaid = payment.status === 'paid';

  return res.status(200).json({
    receipt_no:      receipt ? receipt.receipt_no : null,
    order_id,
    status:          payment.status,
    is_paid:         isPaid,
    status_label:    isPaid ? 'LUNAS' : 'BELUM DIBAYAR',

    // Detail transaksi (snapshot saat paid — tidak berubah walau data master berubah)
    customer_name:   snap.customer_name  || payment.customer_name,
    customer_phone:  snap.customer_phone || payment.customer_phone,
    session_name:    snap.session_name   || payment.session_name,
    date:            snap.date           || payment.date,
    date_formatted:  fmtDateID(snap.date || payment.date),
    time_start:      snap.time_start     || payment.time_start,
    duration_hours:  snap.duration_hours || payment.duration_hours,
    amount:          snap.amount         || payment.amount,
    amount_formatted: fmtRp(snap.amount || payment.amount),
    paid_at:         payment.paid_at,
    paid_at_formatted: payment.paid_at ? fmtDateTimeWIB(payment.paid_at) : '-',
    provider:        snap.provider       || payment.provider,
    transaction_id:  snap.transaction_id || payment.provider_transaction_id,
    generated_at:    receipt ? receipt.generated_at : null,

    // Venue info (dari snapshot agar tahan perubahan di masa depan)
    venue: snap.venue || {},
  });
};
