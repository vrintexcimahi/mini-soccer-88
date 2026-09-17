# Audit & Notes Log — Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi

## [2026-09-16] Audit & Bug Fix Run

### Area yang sudah diaudit
- Struktur halaman web publik (`index.html`, `sewa-lapangan.html`, `kontak.html`, `kompetisi.html`, `main-bareng.html`, `partner.html`, `venue-management.html`, `blog.html`, `login.html`)
- Modul JavaScript klien (`js/assets-sync.js`, `js/custom.js`, `js/geo.js`, `assets/app.js`)
- Panel Superadmin (`superadmin/index.html`, `superadmin/login.html`, `superadmin/admin.js`, `superadmin/admin.css`, `admin.js`)
- Ketersediaan dan integritas link aset, pustaka pihak ketiga (Toastify, jQuery, jQuery UI, Bootstrap 5, DataTables)
- Script utilitas pembuat halaman (`create_pages.py`, `build_index.py`)

### Bug ditemukan & diperbaiki
- **[High] Duplikasi dan Konflik Pustaka jQuery di `index.html`** — Root Cause: `index.html` memuat jQuery 3.5.1 pada baris 1923 lalu langsung memuat ulang jQuery 1.10.2 pada baris 1925, menimpa instance global jQuery modern dan berisiko merusak plugin turunan serta membuang bandwidth — Fix: Menghapus tag script jQuery 1.10.2 usang dan mempertahankan jQuery 3.5.1 modern yang kompatibel dengan Bootstrap 5 & jQuery UI.
- **[High] Selektor Cart Counter & Potensi `NaN` di `js/custom.js`** — Root Cause: `decrementCartItem()` menggunakan selektor sempit `a.venue-cart-view-btn span.cart-icon-counter` yang tidak sinkron dengan `incrementCartItem()` yang menargetkan semua `span.cart-icon-counter`, serta tanpa boundary minimum aman — Fix: Menyelaraskan selektor ke `span.cart-icon-counter` dan membungkus dengan `Math.max(0, ...)` dengan safe integer parsing.
- **[Medium] State Tombol & Network Timeout Geolocation di `js/geo.js`** — Root Cause: Jika koneksi Nominatim OpenStreetMap lambat atau izin ditolak, tombol izin bisa tertinggal dalam status disabled/loading "Mendeteksi lokasi...", dan tidak ada abort timeout pada reverseGeocode fetch — Fix: Menambahkan `AbortController` dengan timeout 4 detik pada `reverseGeocode` agar otomatis fallback ke `approxCity`, serta memastikan state tombol di-reset ke "Izinkan Lokasi" dan `disabled = false` saat modal dibuka maupun saat error.
- **[Medium] Redirect URL Absolut di `login.html`** — Root Cause: Menggunakan `/superadmin/login.html` yang rentan gagal jika situs dibuka via subpath direktori atau file protocol — Fix: Mengubah ke path relatif `./superadmin/login.html`.
- **[Low] Sinkronisasi Dual Admin Scripts** — Root Cause: File `admin.js` di root dan `superadmin/admin.js` rentan desinkronisasi bila salah satu diedit tanpa mengupdate file lainnya — Fix: Memverifikasi keselarasan 100% byte-for-byte antar kedua file setelah seluruh perbaikan.

### Known issues / sengaja belum diperbaiki
- `assets/app.js` (43 KB): Merupakan implementasi SPA mandiri yang saat ini tidak dimuat di `index.html` karena antarmuka utama menggunakan kombinasi `js/custom.js` + `js/assets-sync.js` + `js/geo.js`. File ini sengaja dipertahankan sebagai modul referensi/arsip dan tidak dihapus agar tidak menghilangkan fitur cart/booking bawaan.
- Pustaka vendor lokal Toastify (`vendor/toastify/toastify.js` dan `toastify.min.js`) keduanya tersedia di disk; `index.html` menggunakan `vendor/toastify/toastify.js`.

### Keputusan teknis & alasannya
- Mengutamakan jQuery 3.5.1 dibanding versi 1.10.2 untuk menjaga kompatibilitas browser modern dan keamanan dari kerentanan XSS lama jQuery v1.
- Menambahkan fallback instan berbasis koordinat Euclidean/Haversine pada `js/geo.js` jika Nominatim OpenStreetMap memblokir request karena rate limiting atau ketiadaan koneksi internet.

### Perlu diperhatikan agent berikutnya
- Jika mengupdate fitur dashboard admin, pastikan selalu mengubah `superadmin/admin.js` dan `admin.js` di root secara bersamaan agar tidak terjadi perbedaan perilaku.
- Generator halaman `create_pages.py` menimpa file-file `.html` statis (`kontak.html`, `kompetisi.html`, dsb). Jika ada perubahan markup di file HTML tersebut, pastikan template string di `create_pages.py` juga disesuaikan.
- Form pemesanan lapangan di `sewa-lapangan.html` terhubung langsung via WhatsApp API ke nomor admin resmi (0812-9567-9799).

### Saran fitur yang sudah disampaikan ke user
1. **Web Push Notification / WhatsApp Direct Webhook Auto-confirmation**: Integrasi notifikasi booking otomatis dari form sewa ke WhatsApp pengelola tanpa harus redirect manual via wa.me (Effort: M).
2. **PWA (Progressive Web App) Offline Support**: Menambahkan `manifest.json` dan service worker ringan untuk caching aset gambar dan flyer jadwal September 2026 agar dapat diakses seketika saat sinyal di lapangan lemah (Effort: S).
3. **Penyatuan Single Source of Truth `admin.js`**: Mengeliminasi duplikasi fisik antara root `admin.js` dan `superadmin/admin.js` dengan symlink atau relative script reference (Effort: S).

---

## [2026-09-16] Audit & Bug Fix Run #2 — Deep Runtime Bug Fixes & Live Schedule Integration

### Area yang sudah diaudit
- Integrasi data jadwal pertandingan live September 2026 (`assets/data/bookings_september_2026.json`) ke antarmuka homepage (`index.html`).
- Skrip vendor Toastify (`vendor/toastify/`) dan eliminasi HTTP 404 pada network tab.
- Panel Superadmin: Logika aksi tabel booking, konfirmasi order, hapus order, filter status pesanan, dan penghitungan omset KPI (`superadmin/admin.js`, `admin.js`).
- Modul sinkronisasi aset otomatis (`js/assets-sync.js`): persistensi tag selektor dengan atribut `data-ms88-asset`, serta penambahan sinkronisasi Maskot dan QRIS pembayaran.
- Validasi form pemesanan (`sewa-lapangan.html`): integrasi input booking pelanggan ke persistent store `ms88_orders` di `localStorage` dan formatting link WhatsApp dinamis.
- Modul utilitas frontend (`js/custom.js`): deklarasi variabel global `totalCartItem` dan perbaikan off-by-one error pada fungsi `maskingPhoneNumber`.
- Halaman Blog publik (`blog.html`): integrasi kontainer artikel dinamis dari Superadmin (`ms88_blogs`).
- Pengujian interaktif end-to-end via Browser Subagent: switching tab jadwal minggu 2/3/4, rendering match table, autentikasi session admin, tombol aksi dashboard.

### Bug ditemukan & diperbaiki
- **[Critical] `switchSchedTab` Tidak Terdefinisi di `index.html`** — Root Cause: Tab jadwal Minggu II, III, dan IV memanggil `switchSchedTab('...')`, namun fungsinya tidak pernah diimplementasikan dalam JavaScript sehingga tabel jadwal pertandingan kosong dan memicu `Uncaught ReferenceError: switchSchedTab is not defined` saat tab diklik — Fix: Mengimplementasikan `window.switchSchedTab` lengkap dengan pemanggilan `assets/data/bookings_september_2026.json`, formatting waktu/hari/tanggal/tim, styling badge `tag-booked`, toggle class active pada pill tabs, dan auto-load saat DOM siap.
- **[Critical] 404 Not Found `vendor/toastify/toastify.min.js` di `index.html`** — Root Cause: `index.html` memuat `vendor/toastify/toastify.min.js` padahal yang ada di disk adalah `toastify.js`. Akibatnya network 404, library `Toastify` gagal dimuat, dan setiap pemanggilan toast error crash — Fix: Mengubah referensi ke `vendor/toastify/toastify.js` dan membuat salinan `toastify.min.js` di direktori vendor agar kedua jalur path selalu valid (200 OK).
- **[Critical] `Uncaught ReferenceError: MS88 is not defined` saat Konfirmasi / Hapus Booking di Superadmin** — Root Cause: ID pesanan berformat alfanumerik string (misal `"MS88-20260915-01"`). Pada HTML template `superadmin/admin.js`, ID dirender tanpa tanda petik: `onclick="confirmOrder(${o.id})"`, sehingga dievaluasi browser sebagai ekspresi matematis `MS88 - 20260915 - 1` yang memicu crash — Fix: Membungkus parameter dengan petik: `onclick="confirmOrder('${o.id}')"` dan `onclick="deleteOrder('${o.id}')"`, serta membandingkan dengan `String(o.id) === String(id)`.
- **[High] `ReferenceError` pada Penghapusan Sesi Mabar & Blog di Superadmin** — Root Cause: Serupa dengan order, ID sesi mabar (misal `"mabar-1"`) dan ID blog dirender tanpa tanda petik pada `deleteMabar(${s.id})` dan `editBlog(${b.id})` / `deleteBlog(${b.id})` — Fix: Menambahkan petik tunggal `'${s.id}'` dan `'${b.id}'` serta perbandingan string aman `String(s.id) !== String(id)`.
- **[High] Inkonsistensi Skema Status Order & Lapangan antara Public Client dan Superadmin** — Root Cause: `app.js` dan public checkout menyimpan status `'paid'` dan `'pending'`, serta nama lapangan sebagai `field: "Lapangan 1 (FIFA Synth)"`. Sementara `admin.js` hanya menghitung `status === 'confirmed'` untuk omset (sehingga omset Rp 0) dan mencocokkan `court === 'Lapangan ' + c` (sehingga slot tidak pernah ditandai "Dipesan") — Fix: Menyelaraskan filter omset dan slot grid agar mendukung `status === 'confirmed' || status === 'paid'`, serta memeriksa `o.court || (o.field && o.field.includes('Lapangan ' + c))`.
- **[High] Selektor Fragil & Kehilangan Reaktivitas Live Sync pada `js/assets-sync.js`** — Root Cause: Selektor pencocokan gambar berbasis string parsial URL asal (`img[src*="ayoindonesia-padel-1.jpg"]`). Begitu gambar diganti sekali, selektor tidak lagi cocok pada pembaruan berikutnya via `storage` event. Selain itu, aset Maskot dan QRIS belum masuk logika sinkronisasi — Fix: Menambahkan penandaan atribut persisten `data-ms88-asset` pada setiap elemen yang disinkronkan, memperluas selektor ke kelas semantik (`.ms88-brand-logo`, `.ms88-mascot-img`, `.ms88-qris-img`), serta mengintegrasikan key `mascot` dan `qris`.
- **[Medium] Variable Leak `totalCartItem` & Off-by-one Karakter Pertama pada `maskingPhoneNumber` di `js/custom.js`** — Root Cause: `totalCartItem` tidak dideklarasikan dengan `let`/`var` sehingga berpotensi leak ke window global atau menghasilkan `NaN`. Pada `maskingPhoneNumber`, loop `i > 0` berhenti pada indeks 1, menyebabkan karakter pertama nomor telepon selalu terpotong — Fix: Mendeklarasikan `let totalCartItem = 0;` dan memperbaiki kondisi loop ke `i >= 0`.
- **[Medium] Form Booking Lapangan di `sewa-lapangan.html` Tidak Tersimpan ke Dashboard** — Root Cause: `handleBookingSubmit` hanya membuat link WhatsApp tanpa menyimpan data ke `localStorage`, dan tertimpa oleh fungsi duplikat `submitBooking` yang hanya menampilkan alert — Fix: Menghapus fungsi duplikat, menghitung estimasi biaya secara dinamis, menyimpan pesanan ke `ms88_orders` agar langsung terlihat di Superadmin, dan meneruskan format booking rapi ke WhatsApp.
- **[Medium] Artikel Superadmin Tidak Tampil di Halaman Publik `blog.html`** — Root Cause: `blog.html` hanya memuat konten statis dan tidak membaca database `ms88_blogs` dari Superadmin — Fix: Menambahkan kontainer `#dynamicBlogGrid` dan script pembaca `ms88_blogs` berstatus `'published'`.

### Known issues / sengaja belum diperbaiki
- File arsip `ayo_live.html` (185 KB) tetap dipertahankan sebagai artefak referensi layout asli, tetapi tidak digunakan di alur aplikasi aktif.
- Pada browser modern, API `navigator.geolocation` memerlukan konteks HTTPS aman (atau `localhost`). Jika diakses lewat IP jaringan tanpa HTTPS, browser akan otomatis menolak izin; fallback perkiraan kota Pusdikif Cimahi / Bandung di `js/geo.js` berjalan secara otomatis dan aman.

### Keputusan teknis & alasannya
- Penyimpanan pesanan tetap menggunakan `localStorage` (`ms88_orders`) dengan schema terstandar: `id`, `name`, `phone`, `court`, `field`, `date`, `time`, `total`, `status`, `timestamp`. Hal ini memastikan komunikasi tanpa backend berjalan konsisten antara form publik dan Superadmin portal.
- Untuk tabel jadwal pertandingan September 2026, data dimuat dari file JSON terstruktur `assets/data/bookings_september_2026.json` sehingga perubahan jadwal di masa depan cukup mengedit file JSON tanpa perlu mengubah struktur HTML.

### Perlu diperhatikan agent berikutnya
- Pastikan setiap ada perubahan pada `superadmin/admin.js`, file `admin.js` di root tetap disalin/disinkronkan agar server lokal yang membaca root file tidak mengalami desinkronisasi.
- Tag atribut `data-ms88-asset` pada elemen-elemen gambar di `index.html` dan sub-halaman dimanfaatkan oleh `js/assets-sync.js` untuk merestorasi atau mengganti aset secara reaktif tanpa merusak tata letak.

### Saran fitur yang sudah disampaikan ke user
1. **Fitur Ekspor Rekap Booking & Omset ke Excel / PDF** (Effort: S) — Menambahkan tombol export CSV / XLSX pada tab 'Manajemen Booking' Superadmin agar admin lapangan bisa langsung mengunduh rekapan mingguan/bulanan untuk pembukuan fisik.
2. **Sistem Notifikasi WhatsApp Webhook Otomatis (Fonnte / Wablas)** (Effort: M) — Mengirim konfirmasi booking langsung dari background Superadmin ke nomor WhatsApp penyewa begitu admin menekan tombol centang 'Konfirmasi', tanpa perlu membuka wa.me manual.
3. **PWA (Progressive Web App) Support & Offline Caching** (Effort: S) — Menambahkan Service Worker dan `manifest.json` agar jadwal dan nomor kontak venue tetap bisa dibuka oleh pengunjung di lapangan Pusdikif saat sinyal seluler tidak stabil.

---

## [2026-09-17] Audit & Bug Fix Run #3 — Full Otonom Level Max

### Area yang sudah diaudit
- Alur Autentikasi Pengguna & Portal Member (`login.html`, `user/index.html`).
- Modul Transaksi & Penerbitan Nota Digital (`receipt.html`, `payment.html`, `api/`).
- Engine Service Worker & Caching PWA (`sw.js`, `manifest.json`).
- Homepage & Navigasi Klien (`index.html`, `js/custom.js`, `js/assets-sync.js`, `js/geo.js`).
- Subhalaman Web Publik (`sewa-lapangan.html`, `main-bareng.html`, `kompetisi.html`, `kontak.html`, `partner.html`, `venue-management.html`, `blog.html`).
- Panel Superadmin (`superadmin/index.html`, `superadmin/admin.js`, `admin.js`, `superadmin/admin.css`).
- Integritas link, path aset lokal, penanganan error runtime, dan keselarasan UI/UX tema brand.

### Bug ditemukan & diperbaiki
- **[High] Kegagalan Buka Nota Digital dari Portal Member & Modal Booking (`receipt.html` & `user/index.html`)** — Root Cause: `user/index.html` mengarahkan link nota ke `receipt.html?orderId=...`, sedangkan `receipt.html` hanya membaca `params.get('order_id')`. Akibatnya saat tombol "Nota" diklik dari riwayat member atau setelah reservasi sukses, `ORDER_ID` bernilai `null` dan halaman nota langsung crash dengan pesan "Parameter tidak valid" — Fix: Memperluas pembacaan parameter di `receipt.html` menjadi `params.get('order_id') || params.get('orderId') || params.get('id')`, menstandarkan tautan di `user/index.html` ke `../receipt.html?order_id=${ord.id}`, serta memperluas status lunas `isPaid` mencakup `'completed'` dan `'success'`.
- **[High] Tautan Rusak / 404 pada Tombol Navigasi `receipt.html`** — Root Cause: Empat tombol pada `receipt.html` (tombol topbar Kembali, tombol Buat Booking Baru, tombol Kembali ke Booking, dan tombol Booking Lagi) mengarah ke path tanpa ekstensi `href="/sewa-lapangan"` yang memicu 404 Not Found pada static host/server lokal — Fix: Memperbaiki seluruh 4 tautan menjadi `sewa-lapangan.html`.
- **[High] Panggilan AJAX Mati & Potensi `TypeError: Cannot read properties of undefined` di `index.html`** — Root Cause: Skrip `getUserCart()` mengeksekusi request AJAX GET ke `/sewa-lapangan.html` (file dokumen HTML statis sebesar 30 KB) setiap kali homepage dimuat, lalu mengevaluasi `response.data !== null`. Karena respon bertipe string HTML, `response.data` bernilai `undefined` dan `undefined !== null` bernilai `true`, sehingga eksekusi `response.data.forEach(...)` memicu `Uncaught TypeError` dan membuang bandwidth secara sia-sia — Fix: Menghapus skrip `getUserCart()` usang karena fungsionalitas cart lama sudah digantikan oleh alur reservasi mandiri Portal Member.
- **[Medium] Render String Tag SVG Mentah via `textContent` pada Tombol Demo di `payment.html`** — Root Cause: Pada baris 336 `payment.html`, penugasan tombol menggunakan `btnPay.textContent = '<svg ...> Simulasi Bayar (Demo)'`, sehingga string tag SVG XML dirender secara literal sebagai teks mentah di mata pengguna alih-alih menjadi ikon grafis — Fix: Mengubah `.textContent` menjadi `.innerHTML`.
- **[Medium] Desinkronisasi Warna Latar Belakang Header Subhalaman Publik** — Root Cause: Seluruh 7 subhalaman (`blog.html`, `kompetisi.html`, `kontak.html`, `main-bareng.html`, `partner.html`, `sewa-lapangan.html`, `venue-management.html`) memiliki inline style header statis `#D71926` atau `#FFFFFF`, sehingga tidak memiliki overlay transparan hitam 25% (`linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #D71926`) yang telah disematkan pada homepage dan file tema utama — Fix: Memperbarui inline style header pada ke-7 subhalaman agar selaras 100% dengan tema visual dark-red resmi, serta menghapus kelas `bg-white` pada footer subhalaman.
- **[Medium] Penanganan Error HTTP 404 & Rekursi Berlebih di `initDefaultOrdersIfEmpty()` (`superadmin/admin.js`)** — Root Cause: `fetch(jsonPath)` tidak mereject promise pada status HTTP 404 sehingga pemanggilan `.catch()` terlewat dan `r.json()` mencoba mem-parse dokumen 404 HTML sebagai JSON, memicu unhandled SyntaxError. Selain itu, fungsi memanggil dirinya sendiri secara rekursif di dalam blok callback sukses — Fix: Menambahkan pengecekan `r.ok` yang ketat, fallback berjenjang ke jalur path alternatif, dan mengeliminasi pemanggilan rekursif yang berisiko loop.

### Known issues / sengaja belum diperbaiki
- File serverless function di `api/` (`create-payment.js`, `payment-status.js`, `webhook-midtrans.js`, dsb.) menggunakan runtime Node.js CommonJS/Vercel. Saat dijalankan langsung di server statis browser klien (tanpa Vercel CLI atau Node runtime), antarmuka secara otomatis dan aman menggunakan local fallback `localStorage` dan mode simulasi, sehingga seluruh alur sistem tetap dapat diuji tanpa hambatan.
- File arsip layout lama `assets/app.js` tetap dipertahankan sebagai dokumen referensi historis.

### Keputusan teknis & alasannya
- Standarisasi query parameter nota menjadi `order_id` (dengan fallback kompatibilitas ke `orderId` dan `id`) menjaga integrasi lintas modul: baik dari dashboard member, payment gateway redirect, maupun aksi cetak admin Superadmin.
- Penghapusan panggilan AJAX polling keranjang belanja usang di `index.html` menghemat 30 KB per view dan mengeliminasi error `TypeError` di console browser.
- Seluruh perbaikan pada `superadmin/admin.js` disinkronkan secara otomatis ke `admin.js` di root guna menjaga keselarasan server statis.

### Perlu diperhatikan agent berikutnya
- Pastikan selalu menyalin perubahan antara `superadmin/admin.js` dan root `admin.js`.
- Semua halaman publik menggunakan CSS design system terpusat di `css/theme-88.css` dan font Rubik/Nunito lokal di direktori `fonts/`.

### Implementasi Fitur Saran (Selesai Dikerjakan Secara Otonom)
1. **Fitur Ekspor Rekap Booking & Omset ke Excel / CSV di Superadmin (Status: SELESAI)**
   - **Lokasi UI:** Tombol *"Ekspor CSV (Excel)"* disematkan di Tab Manajemen Booking (`#tabOrders`) dan Tombol *"Ekspor Omset (CSV)"* disematkan di Tab Transaksi & Nota (`#tabPayments`) pada Superadmin.
   - **Fungsi:** `exportOrdersToCSV()` dan `exportPaymentsToCSV()`.
   - **Format:** Menggunakan header CSV lengkap berstandar UTF-8 BOM (`\uFEFF`) sehingga langsung terbuka rapi di Microsoft Excel, Google Sheets, dan LibreOffice tanpa teks berantakan (*garbled characters*).
   - **Nama File Otomatis:** `Rekap_Booking_MS88_YYYYMMDD_HHmm.csv` dan `Laporan_Omset_MS88_YYYYMMDD_HHmm.csv`.

2. **Fitur "Kirim Nota ke WhatsApp" Langsung dari Halaman Nota (`receipt.html`) (Status: SELESAI)**
   - **Lokasi UI:** Tombol hijau WhatsApp (`.btn-wa`) *"Kirim ke WhatsApp"* di bagian action bar atas nota.
   - **Fungsi:** `shareReceiptWhatsApp()`.
   - **Pesan Otomatis:** Menghasilkan template pesan WhatsApp terstruktur yang mencantumkan Nomor Nota, Nama Pemesan, Layanan, Jam Sesi Lapangan, Durasi, Total Biaya, Status LUNAS, Tautan Nota Digital Resmi (`receipt.html?order_id=...`), serta panduan kedatangan di Lapangan Pusdikif Cimahi.
   - **Target Penerima:** Otomatis mendeteksi nomor ponsel pelanggan dan mengonversi format `08...` ke `628...` untuk langsung membuka chat WhatsApp penerima.

3. **Integrasi WhatsApp Gateway & 1-Klik Notifikasi Konfirmasi (Status: SELESAI)**
   - **Lokasi UI:** Card panel baru *"Integrasi WhatsApp Gateway & Notifikasi Otomatis"* pada Tab Pengaturan Sistem Superadmin (`#tabSettings`).
   - **Aksi 1-Klik di Tabel:** Icon chat WhatsApp 💬 disematkan di setiap baris data booking (`#ordersBody`) dan transaksi (`#paymentsBody`) untuk kirim konfirmasi / nota dalam 1 klik.
   - **Otomatisasi:** Ketika admin menekan tombol konfirmasi ("✓"), sistem dapat otomatis memicu dialog konfirmasi WhatsApp ke pelanggan.
   - **Pengaturan Multi-Provider:** Mendukung mode *Direct 1-Klik WA* (gratis tanpa token/API), *Fonnte API Gateway*, *Wablas API Gateway*, dan *Custom Webhook API*, lengkap dengan tombol *"Tes Kirim Template WhatsApp"*.
   - **Sinkronisasi Kode:** Seluruh fungsi disinkronkan 100% byte-for-byte antara `superadmin/admin.js` dan root `admin.js`.


