// =========================================================
//  Mini Soccer 88 Alpha Sport — Data Schema & Price Table
//  Digunakan oleh seluruh Vercel Serverless Functions
// =========================================================

'use strict';

// --- Tarif resmi September 2026 (server-side authority, tidak dari browser) ---
const PRICE_TABLE = {
  prime_morning: { name: 'Prime Morning',        hours_range: '06:00–08:00', price_per_hour: 250000 },
  morning:       { name: 'Morning',              hours_range: '08:00–10:00', price_per_hour: 275000 },
  happy_hours:   { name: 'Happy Hours',          hours_range: '10:00–15:00', price_per_hour: 225000 },
  prime_time:    { name: 'Prime Time',           hours_range: '15:00–18:00', price_per_hour: 300000 },
  premium_night: { name: 'Premium Night (LED)',  hours_range: '18:00–22:00', price_per_hour: 350000 },
};

// --- Venue info (untuk nota) ---
const VENUE_INFO = {
  name:     'Mini Soccer 88 Alpha Sport',
  tagline:  'Lapangan Pusdikif Kodiklatad',
  address:  'Jl. Gatot Subroto, Kota Cimahi, Jawa Barat',
  phone:    '081295679799',
  phone2:   '08882133345',
  instagram: '@88alphasport',
  tiktok:   '@88alphasport',
  qris_nmid: 'ID1026529171542',
};

// --- Status internal yang valid ---
const PAYMENT_STATUS = {
  PENDING:   'pending',
  PAID:      'paid',
  EXPIRED:   'expired',
  FAILED:    'failed',
  CANCELLED: 'cancelled',
};

// --- Mapping status Midtrans → status internal ---
const MIDTRANS_STATUS_MAP = {
  'pending':    PAYMENT_STATUS.PENDING,
  'capture':    PAYMENT_STATUS.PAID,
  'settlement': PAYMENT_STATUS.PAID,
  'deny':       PAYMENT_STATUS.FAILED,
  'cancel':     PAYMENT_STATUS.CANCELLED,
  'expire':     PAYMENT_STATUS.EXPIRED,
  'failure':    PAYMENT_STATUS.FAILED,
};

/**
 * Hitung nominal transaksi secara server-side.
 * @param {string} session_key - kunci sesi (prime_morning, morning, dst.)
 * @param {number} duration_hours - durasi dalam jam (integer 1-5)
 * @returns {{ amount: number, session: object } | null}
 */
function calcAmount(session_key, duration_hours) {
  const session = PRICE_TABLE[session_key];
  if (!session) return null;
  const hours = Math.max(1, Math.min(5, parseInt(duration_hours, 10) || 1));
  return {
    amount: session.price_per_hour * hours,
    session,
    hours,
  };
}

/**
 * Generate order ID unik.
 * Format: MS88-YYYYMMDD-XXXXXX
 */
function generateOrderId() {
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MS88-${ymd}-${rand}`;
}

/**
 * Generate nomor nota unik.
 * Format: NOTA-YYYYMM-XXXXXX
 * @param {number} seq - nomor urut (atomic, disimpan di store)
 */
function generateReceiptNo(seq) {
  const now = new Date();
  const ym = now.toISOString().slice(0, 7).replace(/-/g, '');
  return `NOTA-${ym}-${String(seq).padStart(6, '0')}`;
}

/**
 * Verifikasi signature Midtrans webhook.
 * SHA512(order_id + status_code + gross_amount + server_key)
 * @param {object} body - raw parsed JSON dari Midtrans
 * @param {string} serverKey
 * @returns {boolean}
 */
async function verifyMidtransSignature(body, serverKey) {
  const { order_id, status_code, gross_amount, signature_key } = body;
  if (!order_id || !status_code || !gross_amount || !signature_key) return false;

  const raw = `${order_id}${status_code}${gross_amount}${serverKey}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(raw);

  // Node.js crypto (Vercel functions runtime)
  const crypto = require('crypto');
  const expected = crypto.createHash('sha512').update(raw).digest('hex');
  return expected === signature_key;
}

/**
 * Generate HMAC-SHA256 access token untuk receipt URL.
 * @param {string} orderId
 * @param {string} secret - RECEIPT_SECRET env var
 * @returns {string} hex token
 */
function generateReceiptToken(orderId, secret) {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secret).update(orderId).digest('hex');
}

/**
 * Format rupiah: 350000 → "Rp 350.000"
 */
function fmtRp(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

/**
 * Format tanggal Indonesia: "2026-09-16" → "16 September 2026"
 */
function fmtDateID(dateStr) {
  const months = ['Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'];
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

/**
 * Format datetime WIB.
 */
function fmtDateTimeWIB(isoStr) {
  const d = new Date(isoStr);
  // +7 offset
  const wib = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(wib.getUTCDate())}/${pad(wib.getUTCMonth()+1)}/${wib.getUTCFullYear()} ` +
         `${pad(wib.getUTCHours())}:${pad(wib.getUTCMinutes())} WIB`;
}

module.exports = {
  PRICE_TABLE,
  VENUE_INFO,
  PAYMENT_STATUS,
  MIDTRANS_STATUS_MAP,
  calcAmount,
  generateOrderId,
  generateReceiptNo,
  verifyMidtransSignature,
  generateReceiptToken,
  fmtRp,
  fmtDateID,
  fmtDateTimeWIB,
};
