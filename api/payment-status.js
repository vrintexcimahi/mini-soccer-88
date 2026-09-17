// =========================================================
//  GET /api/payment-status?order_id=MS88-XXXXXXXX
//  Cek status pembayaran ke Midtrans API (server-to-server)
//  — Tidak mengubah status berdasarkan request frontend.
// =========================================================

'use strict';

const { MIDTRANS_STATUS_MAP, PAYMENT_STATUS } = require('./_schema');
const store = require('./_store');

const MIDTRANS_STATUS_URL = (orderId) => process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? `https://api.midtrans.com/v2/${encodeURIComponent(orderId)}/status`
  : `https://api.sandbox.midtrans.com/v2/${encodeURIComponent(orderId)}/status`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { order_id } = req.query;
  if (!order_id || typeof order_id !== 'string') {
    return res.status(400).json({ error: 'order_id wajib diisi.' });
  }

  // Validasi format order_id (MS88-YYYYMMDD-XXXXXX atau format MS88-...)
  if (!/^MS88-[\w-]{4,24}$/i.test(order_id)) {
    return res.status(400).json({ error: 'Format order_id tidak valid.' });
  }

  // Ambil dari store lokal dulu
  const payment = store.getPayment(order_id);
  if (!payment) {
    return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
  }

  // Jika sudah paid/expired/failed, kembalikan langsung (tidak perlu query ulang)
  if (payment.status !== PAYMENT_STATUS.PENDING) {
    return res.status(200).json({
      order_id,
      status: payment.status,
      amount: payment.amount,
      session_name: payment.session_name,
      paid_at: payment.paid_at,
      receipt_url: payment.receipt_url || null,
    });
  }

  // Cek apakah sudah expired berdasarkan waktu
  if (payment.expires_at && new Date() > new Date(payment.expires_at)) {
    payment.status = PAYMENT_STATUS.EXPIRED;
    store.savePayment(payment);
    return res.status(200).json({
      order_id,
      status: PAYMENT_STATUS.EXPIRED,
      amount: payment.amount,
      session_name: payment.session_name,
      paid_at: null,
      receipt_url: null,
    });
  }

  // Mode demo: tidak query Midtrans
  if (!process.env.MIDTRANS_SERVER_KEY) {
    return res.status(200).json({
      order_id,
      status:       payment.status,
      amount:       payment.amount,
      session_name: payment.session_name,
      paid_at:      payment.paid_at,
      receipt_url:  payment.receipt_url || null,
      demo_mode:    true,
    });
  }

  // Query Midtrans status API (server-to-server)
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const b64key    = Buffer.from(serverKey + ':').toString('base64');
  let mtStatus;

  try {
    const fetchFn = typeof fetch !== 'undefined' ? fetch : require('node-fetch');
    const resp = await fetchFn(MIDTRANS_STATUS_URL(order_id), {
      headers: { 'Authorization': 'Basic ' + b64key },
    });
    mtStatus = await resp.json();
  } catch (err) {
    console.error('[payment-status] Network error:', err.message);
    // Kembalikan status lokal jika Midtrans tidak bisa dijangkau
    return res.status(200).json({
      order_id,
      status:       payment.status,
      amount:       payment.amount,
      session_name: payment.session_name,
      paid_at:      payment.paid_at,
      receipt_url:  payment.receipt_url || null,
      stale:        true,
    });
  }

  // Petakan status Midtrans ke internal
  const newStatus = MIDTRANS_STATUS_MAP[mtStatus.transaction_status] || payment.status;

  // Jangan turunkan status paid menjadi apapun
  const finalStatus = payment.status === PAYMENT_STATUS.PAID ? PAYMENT_STATUS.PAID : newStatus;

  if (finalStatus !== payment.status) {
    payment.status = finalStatus;
    if (finalStatus === PAYMENT_STATUS.PAID && !payment.paid_at) {
      payment.paid_at = mtStatus.settlement_time || new Date().toISOString();
      payment.provider_transaction_id = mtStatus.transaction_id || null;
    }
    store.savePayment(payment);
  }

  return res.status(200).json({
    order_id,
    status:       payment.status,
    amount:       payment.amount,
    session_name: payment.session_name,
    paid_at:      payment.paid_at,
    receipt_url:  payment.receipt_url || null,
  });
};
