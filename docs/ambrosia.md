# Ambrosia — Konteks Produk

Ringkasan produk untuk tim frontend. Sumber kebenaran penuh ada di repo backend:
`../Golang/Ambrosia_Backend/docs/PRD_Ambrosia.md` (requirement lengkap) dan
`docs/ERD_Ambrosia.md` (skema data). Dokumen ini hanya ringkasan — baca PRD penuh
sebelum membangun fitur baru yang belum jelas cakupannya.

## Apa itu Ambrosia

**AI Decision Intelligence Layer** untuk procurement bahan baku pangan — SaaS B2B yang
menempel di atas ERP/POS klien (restoran, manufaktur F&B, HORECA). Mengubah pengadaan dari
**reaktif** (beli saat stok habis) menjadi **prediktif & preskriptif** (sistem kasih tahu
kapan restock, berapa banyak, dari vendor mana — berdasarkan prediksi harga & simulasi
biaya). Komoditas MVP: **cabai rawit merah**.

## Dua POV (Point of View) — penting untuk desain UI

Aplikasi frontend melayani **dua permukaan produk terpisah**, biasanya dua alur
login/dashboard yang berbeda:

| POV | Siapa | Kebutuhan utama di UI |
|---|---|---|
| **Buyer Side** | Internal klien: procurement manager, warehouse/QA staff, CFO, ops director, admin | Dashboard rekomendasi, RFQ management, PO + approval berjenjang, alert/trigger, skor vendor |
| **Seller Side** | Vendor/supplier eksternal (akun terverifikasi terpisah) | Registrasi & status verifikasi, daftar RFQ terbuka, submit penawaran, lihat skor & histori transaksi **milik sendiri saja** |

**Isolasi data non-negosiable (FR-15)**: vendor tidak pernah bisa melihat data vendor lain
atau data internal klien. Ini bukan cuma aturan backend — UI Seller Side tidak boleh punya
jalur navigasi/state yang bisa menampilkan data lintas-tenant sekalipun by accident.

## Alur inti yang perlu didesain

1. **Onboarding vendor** — vendor daftar (Seller Side) → **verifikasi manual oleh Admin
   klien** (bukan otomatis, bukan document parsing) → akun aktif.
2. **RFQ → Quotation** — Buyer bikin RFQ, vendor terverifikasi submit penawaran (manual atau
   upload dokumen yang diekstrak OCR).
3. **Purchase Order + Approval berjenjang** — PO dibuat dari quotation terpilih; sebagian PO
   butuh eskalasi approval CFO (ditentukan dinamis oleh interpretasi Gemini API, bukan ambang
   nominal tetap).
4. **Goods Receipt & QA** — warehouse catat penerimaan, QA catat hasil inspeksi → jadi input
   skor vendor.
5. **Trigger & Alert** — dua jalur independen: **stock-based** (reorder point dinamis, selalu
   aktif) dan **macro-based** (kalender HBKN sebagai sinyal dominan, cuaca sebagai sinyal
   pendukung lemah).
6. **Rekomendasi AI (Gemini)** — Accept/Reject/Negotiate untuk quotation, plus alasan eskalasi
   approval PO. **Wajib ditampilkan sebagai narasi bahasa natural yang menonjol**, bukan cuma
   tabel angka — ini requirement produk (PRD §5.5.1), bukan preferensi desain.

## Prinsip produk yang berdampak ke UI

- **Auditability** — tiap rekomendasi AI harus bisa ditelusuri balik ke data yang mendasarinya.
  Kalau UI menampilkan rekomendasi, sediakan jalan untuk lihat "kenapa" (link ke log
  interpretasi), jangan black-box.
- **Kejujuran metodologi** — kalau menampilkan metrik model (MASE, coverage, dst.), tampilkan
  apa adanya termasuk saat model kalah dari baseline. Jangan poles/sembunyikan angka buruk.
- **Shelf-life pendek (5–7 hari)** — UI rekomendasi timing pembelian harus mencerminkan
  keterbatasan ini (tidak ada opsi "beli jauh-jauh hari untuk stok besar").

## Status implementasi backend (per 2026-07-25)

**Hanya Auth/User yang sudah jalan** — 5 endpoint: registrasi (buyer/vendor), login,
get/update current user, logout. Sisanya (RFQ, Quotation, PO, Goods Receipt, Vendor
Documents, Forecast, Trigger, Recommendation, dst.) **sudah punya kontrak API lengkap**
di `api_contract.md` tapi **belum diimplementasikan** di backend. Jangan asumsikan endpoint
selain Auth sudah bisa dipanggil — cek `roadmap_implementasi.md` untuk fase mana yang
sedang/sudah dikerjakan sebelum membangun UI yang bergantung padanya.

Urutan fase backend (lihat `roadmap_implementasi.md` untuk detail): (1) Reference data +
verifikasi vendor → (2) RFQ/PO/Receiving/QA → (3) Dokumen vendor & OCR → (4) Forecast &
evaluasi model → (5) Gateway Gemini → (6) Trigger, alert & rekomendasi AI.

## Referensi API

- Kontrak lengkap: `../Golang/Ambrosia_Backend/docs/api_contract.md` (20 grup endpoint,
  response wrapper standar `{ data, errors }`, auth header `Bearer <token>`).
- Skema data: `../Golang/Ambrosia_Backend/docs/ERD_Ambrosia.md` (untuk memahami bentuk data
  sebelum membuat TypeScript type/DTO di layer `domain`/`infrastructure`).
- Base URL API dikonfigurasi lewat `VITE_API_BASE_URL` (lihat `.env.example` &
  `src/shared/config/env.ts`).
