// =========================================================
//  Mini Soccer 88 Alpha Sport — Storage Helper
//  Vercel Serverless: gunakan /tmp untuk sandbox (ephemeral).
//  Untuk produksi: ganti dengan Vercel KV atau database.
// =========================================================

'use strict';

const fs   = require('fs');
const path = require('path');

const STORE_DIR  = process.env.STORE_DIR || '/tmp/ms88_store';
const PAY_FILE   = path.join(STORE_DIR, 'payments.json');
const REC_FILE   = path.join(STORE_DIR, 'receipts.json');
const SEQ_FILE   = path.join(STORE_DIR, 'receipt_seq.txt');

function ensureDir() {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
}

// --- Generic read/write ---
function readJSON(file, def) {
  try {
    if (!fs.existsSync(file)) return def;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch { return def; }
}

function writeJSON(file, data) {
  ensureDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ---- Receipt sequence (atomic increment for unique receipt numbers) ----
function nextReceiptSeq() {
  ensureDir();
  let seq = 1;
  try {
    if (fs.existsSync(SEQ_FILE)) {
      seq = parseInt(fs.readFileSync(SEQ_FILE, 'utf8'), 10) + 1;
    }
  } catch { seq = Date.now() % 100000; } // fallback jika error
  fs.writeFileSync(SEQ_FILE, String(seq), 'utf8');
  return seq;
}

// ---- Payment CRUD ----

/**
 * Ambil semua payment records.
 * @returns {Object.<string, object>} map: order_id → payment
 */
function getAllPayments() {
  return readJSON(PAY_FILE, {});
}

/**
 * Ambil satu payment by order_id.
 */
function getPayment(orderId) {
  return getAllPayments()[orderId] || null;
}

/**
 * Simpan/update payment record.
 */
function savePayment(payment) {
  const all = getAllPayments();
  all[payment.id] = { ...payment, updated_at: new Date().toISOString() };
  writeJSON(PAY_FILE, all);
  return all[payment.id];
}

// ---- Receipt CRUD ----

/**
 * Ambil semua receipts.
 */
function getAllReceipts() {
  return readJSON(REC_FILE, {});
}

/**
 * Ambil receipt by order_id.
 */
function getReceiptByOrder(orderId) {
  const all = getAllReceipts();
  return Object.values(all).find(r => r.order_id === orderId) || null;
}

/**
 * Simpan receipt (idempotent: jika sudah ada untuk order_id yang sama, kembalikan yang lama).
 */
function saveReceipt(receipt) {
  const all = getAllReceipts();

  // Cek apakah sudah ada receipt untuk order_id ini
  const existing = Object.values(all).find(r => r.order_id === receipt.order_id);
  if (existing) return existing; // idempotent

  all[receipt.receipt_no] = { ...receipt, generated_at: new Date().toISOString() };
  writeJSON(REC_FILE, all);
  return all[receipt.receipt_no];
}

/**
 * Ambil receipt by receipt_no.
 */
function getReceipt(receiptNo) {
  return getAllReceipts()[receiptNo] || null;
}

module.exports = {
  getPayment,
  savePayment,
  getAllPayments,
  getReceiptByOrder,
  saveReceipt,
  getReceipt,
  getAllReceipts,
  nextReceiptSeq,
};
