// =========================================================
//  POST /api/webhook-midtrans
//  Terima notifikasi pembayaran dari Midtrans
//  — Verifikasi signature, update status, buat nota
// =========================================================

'use strict';

const crypto = require('crypto');
const {
  MIDTRANS_STATUS_MAP,
  PAYMENT_STATUS,
  verifyMidtransSignature,
  generateReceiptNo,
  generateReceiptToken,
  VENUE_INFO,
} = require('./_schema');
const store = require('./_store');

module.exports = async function handler(req, res) {
  // Midtrans webhook hanya pakai autentikasi signature, bukan login user
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  if (req.method !== 'POST') return res.status(405).end();

  // --- Parse body ---
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).end(); }
  }
  if (!body || typeof body !== 'object') return res.status(400).end();

  const {
    order_id,
    transaction_status,
    fraud_status,
    gross_amount,
    transaction_id,
    status_code,
    settlement_time,
    transaction_time,
  } = body;

  // --- Validasi field minimal ---
  if (!order_id || !transaction_status) {
    console.warn('[webhook] Body tidak lengkap:', body);
    return res.status(400).end();
  }

  // --- Verifikasi signature Midtrans ---
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (serverKey) {
    const isValid = await verifyMidtransSignature(body, serverKey);
    if (!isValid) {
      console.warn('[webhook] Signature INVALID untuk order:', order_id);
      return res.status(403).json({ error: 'Signature tidak valid.' });
    }
  } else {
    // Mode demo/sandbox tanpa key: log saja, jangan blokir
    console.warn('[webhook] MIDTRANS_SERVER_KEY tidak diset — signature tidak diverifikasi (demo mode).');
  }

  // --- Ambil payment record ---
  const payment = store.getPayment(order_id);
  if (!payment) {
    // Kembalikan 200 agar Midtrans tidak retry (transaksi tidak dikenal)
    console.warn('[webhook] Order tidak ditemukan di store:', order_id);
    return res.status(200).json({ message: 'order_not_found' });
  }

  // --- Cocokkan nominal (jangan percaya nominal dari webhook saja, bandingkan) ---
  const webhookAmount = parseInt(String(gross_amount).replace(/\D/g, ''), 10);
  if (webhookAmount !== payment.amount) {
    console.error(`[webhook] Nominal tidak cocok! Expected: ${payment.amount}, Got: ${webhookAmount}`);
    // Catat anomali tapi jangan mark as paid
    payment.anomaly = `amount_mismatch: expected=${payment.amount} got=${webhookAmount}`;
    store.savePayment(payment);
    return res.status(200).json({ message: 'amount_mismatch_recorded' });
  }

  // --- Jangan turunkan status paid ---
  if (payment.status === PAYMENT_STATUS.PAID) {
    return res.status(200).json({ message: 'already_paid' });
  }

  // --- Petakan status Midtrans → internal ---
  let newStatus = MIDTRANS_STATUS_MAP[transaction_status] || payment.status;

  // Fraud check: jika fraud_status = 'deny', tolak walaupun status = 'capture'
  if (fraud_status === 'deny') newStatus = PAYMENT_STATUS.FAILED;

  payment.status                  = newStatus;
  payment.provider_transaction_id = transaction_id || null;
  payment.updated_at              = new Date().toISOString();

  if (newStatus === PAYMENT_STATUS.PAID) {
    payment.paid_at = settlement_time || transaction_time || new Date().toISOString();
  }

  store.savePayment(payment);

  // --- Buat nota jika paid (idempotent) ---
  if (newStatus === PAYMENT_STATUS.PAID) {
    try {
      let receipt = store.getReceiptByOrder(order_id);
      if (!receipt) {
        const seq        = store.nextReceiptSeq();
        const receipt_no = generateReceiptNo(seq);
        const secret     = process.env.RECEIPT_SECRET || 'ms88-receipt-secret-key-2026';
        const token      = generateReceiptToken(order_id, secret);

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

        // Update payment dengan receipt_url
        payment.receipt_url = `/receipt?order_id=${order_id}&token=${token}`;
        store.savePayment(payment);
        console.log('[webhook] Nota dibuat:', receipt.receipt_no);
      } else {
        console.log('[webhook] Nota sudah ada (idempotent):', receipt.receipt_no);
      }
    } catch (err) {
      // Kegagalan generate nota TIDAK boleh mempengaruhi status pembayaran
      console.error('[webhook] Error buat nota:', err.message);
      // Pembayaran tetap tercatat paid, nota dapat dicoba ulang
    }
  }

  // Selalu kembalikan 200 agar Midtrans tidak retry terus
  return res.status(200).json({ message: 'ok', status: newStatus });
};
