// =========================================================
//  POST /api/create-payment
//  Buat transaksi Midtrans Snap — return snap_token
//
//  Body JSON:
//  {
//    session_key: "premium_night",
//    duration_hours: 2,
//    date: "2026-09-16",
//    time_start: "20:00",
//    customer_name: "Reza - Cimahi United",
//    customer_phone: "081234567890"
//  }
//
//  Response:
//  { order_id, snap_token, amount, session_name, expires_at }
// =========================================================

'use strict';

const {
  calcAmount,
  generateOrderId,
  generateReceiptToken,
} = require('./_schema');
const store = require('./_store');

const MIDTRANS_SNAP_URL = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

module.exports = async function handler(req, res) {
  // CORS headers agar dapat dipanggil dari frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // --- Parse & validasi input ---
  const { session_key, duration_hours, date, time_start, customer_name, customer_phone } = req.body || {};

  if (!session_key || !duration_hours || !date || !time_start || !customer_name || !customer_phone) {
    return res.status(400).json({ error: 'Field wajib tidak lengkap.' });
  }

  // Validasi nama & nomor (basic)
  if (typeof customer_name !== 'string' || customer_name.trim().length < 2) {
    return res.status(400).json({ error: 'Nama tidak valid.' });
  }
  const phoneClean = String(customer_phone).replace(/\D/g, '');
  if (phoneClean.length < 9 || phoneClean.length > 15) {
    return res.status(400).json({ error: 'Nomor WhatsApp tidak valid.' });
  }

  // Validasi tanggal (tidak lebih dari 30 hari ke depan)
  const playDate = new Date(date);
  const today    = new Date(); today.setHours(0,0,0,0);
  const maxDate  = new Date(today); maxDate.setDate(maxDate.getDate() + 30);
  if (isNaN(playDate) || playDate < today || playDate > maxDate) {
    return res.status(400).json({ error: 'Tanggal tidak valid (max 30 hari ke depan).' });
  }

  // --- Hitung nominal di SERVER (tidak percaya dari browser) ---
  const calc = calcAmount(session_key, duration_hours);
  if (!calc) {
    return res.status(400).json({ error: 'Paket sesi tidak dikenal: ' + session_key });
  }
  const { amount, session, hours } = calc;

  // --- Generate order ID & idempotency key ---
  const order_id = generateOrderId();
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 jam

  // --- Buat payload Midtrans Snap ---
  const snapPayload = {
    transaction_details: {
      order_id,
      gross_amount: amount,
    },
    item_details: [{
      id:       session_key,
      price:    session.price_per_hour,
      quantity: hours,
      name:     `${session.name} — ${date} ${time_start} (${hours} Jam)`,
    }],
    customer_details: {
      first_name: customer_name.trim().split(/\s+/)[0],
      last_name:  customer_name.trim().split(/\s+/).slice(1).join(' ') || '-',
      phone:      phoneClean,
    },
    // Hanya izinkan QRIS sebagai metode aktif
    enabled_payments: ['qris', 'gopay', 'shopeepay'],
    expiry: {
      unit:     'hours',
      duration: 1,
    },
  };

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    // Mode demo: tidak ada server key — kembalikan token dummy
    console.warn('[create-payment] MIDTRANS_SERVER_KEY tidak diset — mode DEMO.');

    const demoPayment = {
      id:                   order_id,
      snap_token:           'DEMO-TOKEN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      provider:             'midtrans-demo',
      provider_transaction_id: null,
      session_key,
      session_name:         `${session.name} (${session.hours_range})`,
      amount,
      duration_hours:       hours,
      date,
      time_start,
      customer_name:        customer_name.trim(),
      customer_phone:       phoneClean,
      status:               'pending',
      expires_at,
      paid_at:              null,
      created_at:           new Date().toISOString(),
    };
    store.savePayment(demoPayment);

    return res.status(200).json({
      order_id,
      snap_token:   demoPayment.snap_token,
      amount,
      session_name: demoPayment.session_name,
      expires_at,
      demo_mode:    true,
    });
  }

  // --- Panggil Midtrans Snap API ---
  const b64key = Buffer.from(serverKey + ':').toString('base64');
  let snapRes;
  try {
    const fetchFn = typeof fetch !== 'undefined' ? fetch : require('node-fetch');
    const resp = await fetchFn(MIDTRANS_SNAP_URL, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + b64key,
      },
      body: JSON.stringify(snapPayload),
    });
    snapRes = await resp.json();

    if (!snapRes.token) {
      console.error('[create-payment] Midtrans error:', snapRes);
      return res.status(502).json({ error: 'Gagal membuat transaksi. Coba lagi.', detail: snapRes.error_messages });
    }
  } catch (err) {
    console.error('[create-payment] Network error:', err.message);
    return res.status(503).json({ error: 'Layanan pembayaran tidak dapat dijangkau.' });
  }

  // --- Simpan payment record ---
  const payment = {
    id:                   order_id,
    snap_token:           snapRes.token,
    provider:             'midtrans',
    provider_transaction_id: null,
    session_key,
    session_name:         `${session.name} (${session.hours_range})`,
    amount,
    duration_hours:       hours,
    date,
    time_start,
    customer_name:        customer_name.trim(),
    customer_phone:       phoneClean,
    status:               'pending',
    expires_at,
    paid_at:              null,
    created_at:           new Date().toISOString(),
  };
  store.savePayment(payment);

  return res.status(200).json({
    order_id,
    snap_token:   snapRes.token,
    amount,
    session_name: payment.session_name,
    expires_at,
  });
};
