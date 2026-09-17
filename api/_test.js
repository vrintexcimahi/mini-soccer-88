// =========================================================
//  Unit Tests — api/_test.js
//  Jalankan: node api/_test.js
// =========================================================

'use strict';

// Polyfill TextEncoder untuk Node.js < 18
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

const {
  PRICE_TABLE,
  calcAmount,
  generateOrderId,
  generateReceiptNo,
  generateReceiptToken,
  verifyMidtransSignature,
  fmtRp,
  fmtDateID,
} = require('./_schema');

let passed = 0;
let failed = 0;

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${label}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

// ---- Test 1: Price Table ---
console.log('\n📋 Test 1: Price Table');
assert('prime_morning ada',    !!PRICE_TABLE.prime_morning);
assert('happy_hours = 225000', PRICE_TABLE.happy_hours.price_per_hour === 225000);
assert('premium_night = 350000', PRICE_TABLE.premium_night.price_per_hour === 350000);
assert('morning = 275000',     PRICE_TABLE.morning.price_per_hour === 275000);
assert('prime_time = 300000',  PRICE_TABLE.prime_time.price_per_hour === 300000);

// ---- Test 2: calcAmount ---
console.log('\n💰 Test 2: calcAmount (server-side)');
const c1 = calcAmount('premium_night', 2);
assert('premium_night 2 jam = 700000', c1 && c1.amount === 700000, JSON.stringify(c1));
assert('hours = 2',                    c1 && c1.hours === 2);

const c2 = calcAmount('happy_hours', 3);
assert('happy_hours 3 jam = 675000',   c2 && c2.amount === 675000);

const c3 = calcAmount('unknown_session', 1);
assert('session tidak dikenal → null', c3 === null);

// Clamp: max 5 jam
const c4 = calcAmount('prime_morning', 99);
assert('durasi 99 jam di-clamp ke 5 jam', c4 && c4.hours === 5);

// Clamp: min 1 jam
const c5 = calcAmount('morning', 0);
assert('durasi 0 di-clamp ke 1 jam', c5 && c5.hours === 1);

// Integer check (tidak ada floating point)
assert('amount selalu integer', Number.isInteger(c1.amount));

// ---- Test 3: generateOrderId ---
console.log('\n🔑 Test 3: generateOrderId');
const oid = generateOrderId();
assert('format MS88-YYYYMMDD-XXXXXX', /^MS88-\d{8}-[A-Z0-9]{6}$/.test(oid), oid);
const oid2 = generateOrderId();
assert('dua order ID berbeda', oid !== oid2);

// ---- Test 4: generateReceiptNo ---
console.log('\n🧾 Test 4: generateReceiptNo');
const rno = generateReceiptNo(1);
assert('format NOTA-YYYYMM-000001', /^NOTA-\d{6}-\d{6}$/.test(rno), rno);
const rno2 = generateReceiptNo(42);
assert('seq 42 → 000042', rno2.endsWith('-000042'));

// ---- Test 5: generateReceiptToken ---
console.log('\n🔐 Test 5: generateReceiptToken (HMAC)');
const tok1 = generateReceiptToken('MS88-20260916-ABCDEF', 'test-secret');
const tok2 = generateReceiptToken('MS88-20260916-ABCDEF', 'test-secret');
const tok3 = generateReceiptToken('MS88-20260916-XXXXXX', 'test-secret');
assert('token deterministik', tok1 === tok2);
assert('token berbeda untuk order berbeda', tok1 !== tok3);
assert('token adalah hex 64 karakter', /^[a-f0-9]{64}$/.test(tok1), tok1);

// ---- Test 6: verifyMidtransSignature ---
console.log('\n🔏 Test 6: verifyMidtransSignature');
(async () => {
  const crypto = require('crypto');
  const serverKey   = 'SB-Mid-server-test-key';
  const order_id    = 'MS88-20260916-ABCDEF';
  const status_code = '200';
  const gross_amount = '700000.00';
  const raw = `${order_id}${status_code}${gross_amount}${serverKey}`;
  const sig = crypto.createHash('sha512').update(raw).digest('hex');

  const body = { order_id, status_code, gross_amount, signature_key: sig };
  const valid = await verifyMidtransSignature(body, serverKey);
  assert('signature valid diterima', valid === true);

  const bodyBad = { ...body, signature_key: 'invalid-signature' };
  const invalid = await verifyMidtransSignature(bodyBad, serverKey);
  assert('signature invalid ditolak', invalid === false);

  const bodyMissingField = { order_id, status_code };
  const missingField = await verifyMidtransSignature(bodyMissingField, serverKey);
  assert('body tidak lengkap ditolak', missingField === false);

  // ---- Test 7: fmtRp ---
  console.log('\n💵 Test 7: fmtRp');
  assert('350000 → Rp 350.000', fmtRp(350000) === 'Rp 350.000');
  assert('700000 → Rp 700.000', fmtRp(700000) === 'Rp 700.000');
  assert('225000 → Rp 225.000', fmtRp(225000) === 'Rp 225.000');

  // ---- Test 8: fmtDateID ---
  console.log('\n📅 Test 8: fmtDateID');
  assert('2026-09-16 → 16 September 2026', fmtDateID('2026-09-16') === '16 September 2026');
  assert('2026-01-01 → 1 Januari 2026',    fmtDateID('2026-01-01') === '1 Januari 2026');

  // ---- Summary ---
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Hasil: ${passed} lulus, ${failed} gagal dari ${passed + failed} test`);
  if (failed > 0) {
    console.error('❌ Ada test yang gagal!');
    process.exit(1);
  } else {
    console.log('✅ Semua test lulus!');
    process.exit(0);
  }
})();
