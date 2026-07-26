# Design — Ambrosia

Ringkasan desain UI/UX dari project Stitch **"Ambrosia AI Design System"**
(https://stitch.withgoogle.com/projects/1625703610939944692). Stitch adalah sumber visual
utama (mockup per halaman + `design.md` internal berisi design tokens) — dokumen ini
merangkum isinya untuk dipakai sebagai acuan implementasi di kode. Kalau ada detail
piksel-presisi (hex warna eksak, spacing eksak) yang dibutuhkan, cek langsung ke project
Stitch-nya; dokumen ini fokus ke struktur, komponen, dan pola yang berulang.

## Prinsip Desain

1. **Living document** — design system ini sinkron dengan PRD & ERD backend; kalau ada
   perubahan fitur di salah satu, dokumen desain harus diperbarui juga.
2. **Single source of truth visual** — dipakai siapa pun yang mendesain/mengembangkan UI,
   termasuk saat menyusun prompt baru ke Stitch.
3. **Warna semantik hanya untuk status/alert/risiko** — tidak dipakai untuk elemen dekoratif
   biasa, supaya sinyal warna (merah/oranye/hijau) selalu berarti sesuatu yang perlu
   diperhatikan.
4. **Theming Buyer vs Seller dibedakan secara sengaja** — dua sisi produk (POV Buyer Side
   internal klien vs Seller/Vendor Portal) dibuat terasa berbeda secara visual, bukan skin
   yang sama dengan label berbeda. Selaras dengan isolasi data ketat di backend (FR-15).
5. **Tabular figures untuk angka finansial** — semua angka Rupiah/metrik di tabel dan kartu
   KPI pakai tabular figure supaya rapi sejajar.
6. **Disclaimer/limitasi model ditampilkan eksplisit di UI** — bukan disembunyikan. Selaras
   dengan prinsip "Kejujuran Metodologi" PRD.

## Warna & Tipografi

- **Palet**: Primary (navy/biru tua), Secondary (biru medium), Tertiary (teal/biru gelap),
  Neutral (grayscale) — nuansa dominan **dark navy/blue-grey**, dengan warna semantik terpisah
  (hijau = positif/accept/on-track, oranye/kuning = perlu perhatian/negotiate/pending, merah
  = urgent/reject/critical).
- **Font**: sans-serif modern bergaya Inter/Manrope.

### Color Palette (base blue, sumber: colorblend.io)

| Nama | Hex | Pemakaian |
|---|---|---|
| Cloud Blue | `#EDF4FA` | Background halaman/kartu paling terang, area netral |
| Powder Sky | `#CFE3F1` | Background sekunder, hover state, badge/tag ringan |
| Calm Ocean | `#8FB6D8` | Aksen sekunder, elemen interaktif tidak-dominan |
| Dusty Denim | `#5F86A6` | Warna Secondary — elemen UI level menengah (border aktif, ikon, chart line kedua) |
| Midnight Blue | `#243A5E` | Warna Primary — sidebar, header, tombol utama, teks penting |

Urutan dari terang ke gelap dipakai sebagai skala satu keluarga warna (bukan lima warna
lepas): Cloud Blue/Powder Sky untuk background & permukaan, Calm Ocean/Dusty Denim untuk
elemen interaktif & aksen, Midnight Blue untuk elemen dominan (sidebar, teks utama, tombol
primary). Warna semantik (hijau/oranye/merah untuk status) tetap terpisah dari palet ini —
jangan dicampur, sesuai Prinsip Desain §3 di atas.
- **Layout**: breakpoint desktop-first (dirancang untuk lebar layar ≥1280px), grid berbasis
  kartu (card) dengan spacing konsisten, shadow lembut untuk elevasi kartu.

## Struktur Navigasi

Dua sidebar berbeda sesuai POV:

- **Buyer Side** ("Ambrosia Procurement — Buyer Workspace"): Dashboard, Forecasting, RFQ,
  PO, Document Parsing, Vendor Scorecard, Receiving, Model Monitoring, Alert Center, Reports,
  ROI — plus Settings & Help Center di bawah.
- **Seller/Vendor Portal** ("Ambrosia — Portal Vendor"): Dashboard, Notifikasi RFQ, Submit
  Penawaran, Skor & Riwayat Saya, Status PO — plus Settings & Help Center di bawah.

Pola umum tiap halaman: sidebar kiri tetap, top bar (search + notifikasi + avatar), konten
utama kartu-kartu, dan panel kanan opsional untuk info kontekstual (alert, rekomendasi AI,
skor).

## Halaman yang Sudah Didesain di Stitch

### 1. Dashboard Utama — Buyer Side
Landing page Buyer. KPI row (Estimasi Penghematan, Alert Aktif, PR Menunggu Approval,
Coverage Model), chart tren harga dengan pita P10–P90 + catatan metodologi model, panel
"Alert Terbaru" (list alert stok/logistik/anomali dengan severity tag), kartu **"Gemini AI
Recommendation"** menonjol (narasi rekomendasi + tombol Setujui/Tolak — implementasi visual
langsung dari requirement PRD §5.5.1 bahwa narasi Gemini wajib tampil menonjol, bukan cuma
angka), dan mini panel status Vendor Scorecard.

### 2. Demand Forecasting & Reorder Point
Filter komoditas/outlet/horizon (H+7/H+30). Chart forecast (actual vs P50 vs pita P10–P90)
dengan kartu ringkasan target window & avg predicted price serta perbandingan model
(baseline vs TFT). **Box "Predictive Model Limitation Notice"** — disclaimer eksplisit
tentang keterbatasan model, langsung mencerminkan prinsip Kejujuran Metodologi PRD. Panel
kanan "Inventory Health" (stock level, hari-hingga-habis, optimal order qty) + kartu
rekomendasi (mis. "Hold Purchase" dengan alasan) + reorder point threshold + tombol Buat
Purchase Requisition.

### 3. Document Parsing Center
Layar dua kolom: kiri upload dokumen (drag & drop) + antrean proses (status ekstraksi per
file), kanan hasil ekstraksi 5 entitas (nama vendor, harga, lead time, batas waktu, syarat
pembayaran) **masing-masing dengan badge confidence** (mis. "Confidence Tinggi" vs
"Verifikasi Manual" untuk yang kurang yakin) — mencerminkan kolom `confidence` jsonb di
`document_extractions`. Kartu "Rekomendasi Gemini AI" dengan badge keputusan
(Accept/Reject/**Negotiate**) + narasi. Preview dokumen asli (scan) ditampilkan berdampingan.
Tombol: Tolak Dokumen / Edit Manual / Setujui.

### 4. RFQ Management
Grid kartu, satu kartu per RFQ/penawaran vendor, dengan filter Status/Deadline/Kategori dan
tombol "Create New RFQ". Tiap kartu menampilkan perbandingan **harga penawaran vs prediksi
P50** (bar visual + selisih %), badge rekomendasi (**Accept** hijau / **Negotiate** oranye /
**Select**) dengan alasan singkat, dan aksi kontekstual (Details / Send Reminder / Counter
Offer / Review). Footer box "Model Methodology & Prediction Integrity" — disclaimer lagi,
konsisten dengan pola di halaman lain.

### 5. Registrasi & Verifikasi Vendor
Wizard 4 langkah (Data Legal → Dokumen → Kontak PIC → Kategori) di sisi Vendor saat
mendaftar: Informasi Legalitas (nama perusahaan, NIB, NPWP), Upload Legalitas (drag & drop
akta/NIB/NPWP), Kontak PIC, Kategori Komoditas (checkbox). **Catatan penting**: form ini
hanya mengumpulkan data — proses **verifikasi tetap manual oleh Admin klien** (tidak ada
langkah "auto-verify" di alur ini, sesuai PRD §5.7).

### 6. Vendor Portal — Submit Penawaran
Halaman kerja Seller Side untuk menawar. List "Notifikasi RFQ Baru" (komoditas, quantity,
deadline) dengan tombol Abaikan/Kirim Penawaran per item. Form submit penawaran (harga/kg,
lead time, termin pembayaran, lampiran PDF/foto) dengan Simpan Draft / Kirim Penawaran
Sekarang.

> **Catatan implementasi**: desain Stitch asli menggabungkan halaman ini dengan skor vendor +
> histori di satu layar sebagai "Landing Seller Side". Implementasi memisahkannya menjadi
> halaman ini (fokus ke aksi menawar) dan Seller Dashboard (§7) sebagai landing/overview —
> mengikuti pola Buyer Side yang juga memisahkan Dashboard dari halaman kerja (RFQ Management,
> dst). Kedua halaman berbagi state notifikasi/histori lewat satu Zustand store supaya tetap
> konsisten saat berpindah halaman.

### 7. Seller Dashboard
Landing Seller Side (menggantikan peran landing yang sebelumnya dipegang Vendor Portal).
KPI row: Skor Vendor (skor komposit + level), RFQ Pending, Kontrak Dimenangkan, On-time
Delivery %. Preview "Notifikasi RFQ Terbaru" (2 item teratas, read-only, link "Lihat Semua"
ke Vendor Portal) dan preview "Histori Transaksi Terbaru" (2 item teratas) — histori
**miliknya sendiri saja**, konsisten dengan isolasi data FR-15. Tombol CTA "Submit Penawaran
Baru" menuju Vendor Portal.

### Prototype
Ada satu frame "Prototype: Ambrosia Procurement & Vendor..." di project Stitch untuk preview
alur klik-through — buka langsung di Stitch untuk interaksi, tidak direplikasi di sini.

## Implikasi untuk Implementasi Frontend

- Setiap kartu "rekomendasi AI" (Dashboard, Document Parsing, RFQ Management) mengikuti pola
  UI yang sama: **badge keputusan + narasi + aksi** — cocok jadi satu komponen
  `presentation/components` reusable (mis. `RecommendationCard`), bukan diduplikasi per
  halaman.
- Disclaimer/limitation notice (muncul di ≥2 halaman forecast) juga pola berulang — cocok
  jadi komponen `MethodologyNotice` reusable di `shared`/`presentation/components/common`.
- Badge confidence per-entitas di Document Parsing perlu varian warna yang konsisten dengan
  aturan "warna semantik hanya untuk status" di atas.
- Dua sidebar (Buyer vs Seller) sebaiknya jadi dua layout/komponen navigasi terpisah di
  `presentation`, bukan satu komponen dengan banyak conditional — selaras prinsip theming
  yang sengaja dibedakan.
