import { useState } from 'react';
import type { FormEvent } from 'react';
import { FormField } from '@/presentation/components/common/FormField';

const STEPS = ['Data Legal', 'Dokumen', 'Kontak PIC', 'Kategori'];
const COMMODITY_CATEGORIES = ['Raw Materials', 'Chemicals', 'Packaging', 'Logistics Services'];

export function VendorRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requiredFields: Array<[string, string]> = [
      ['companyName', 'Nama Perusahaan wajib diisi'],
      ['nib', 'NIB wajib diisi'],
      ['npwp', 'NPWP wajib diisi'],
      ['picName', 'Nama Lengkap PIC wajib diisi'],
      ['picWhatsapp', 'No. WhatsApp wajib diisi'],
    ];
    const nextErrors: Record<string, string> = {};
    for (const [name, message] of requiredFields) {
      const value = formData.get(name);
      if (!value || String(value).trim() === '') {
        nextErrors[name] = message;
      }
    }
    if (formData.getAll('category').length === 0) {
      nextErrors.category = 'Pilih minimal 1 kategori komoditas';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center p-huge">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white p-huge text-center shadow-2xl shadow-primary/10">
          <div className="relative z-10">
            <div className="mx-auto mb-xl flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-surface-container-low shadow-inner">
              <span className="material-symbols-outlined text-[48px] text-secondary">schedule</span>
            </div>
            <h2 className="mb-md text-display text-primary">Menunggu Verifikasi Admin</h2>
            <div className="mb-xl rounded-xl border-2 border-primary bg-powder p-xl">
              <p className="text-lg leading-relaxed text-primary">
                Verifikasi dilakukan <strong>manual</strong> oleh tim Admin klien, bukan otomatis — estimasi{' '}
                <strong>1-2 hari kerja</strong>.
              </p>
            </div>
            <p className="mx-auto mb-huge max-w-[28rem] text-on-surface-variant">
              Terima kasih telah melengkapi data perusahaan Anda. Kami akan mengirimkan notifikasi melalui Email dan
              WhatsApp setelah akun Anda aktif.
            </p>
            <div className="flex flex-col items-center gap-md">
              <button
                className="flex items-center gap-sm rounded-lg bg-primary px-huge py-md font-bold text-white shadow-md transition-all hover:brightness-125"
                type="button"
                onClick={() => setSubmitted(false)}
              >
                <span className="material-symbols-outlined">dashboard</span>
                Lihat Dashboard Preview
              </button>
              <span className="text-caption italic text-outline">Ref. ID: VEND-REG-99120-X</span>
            </div>
          </div>
        </div>

        <div className="mt-huge flex max-w-2xl items-center gap-xl rounded-xl border border-white/30 bg-white/70 p-xl backdrop-blur-md">
          <span className="material-symbols-outlined text-huge text-secondary">security</span>
          <div>
            <h4 className="text-h3 text-primary">Data Anda Aman</h4>
            <p className="text-caption text-on-surface-variant">
              Sesuai dengan protokol keamanan Ambrosia, data legalitas Anda terenkripsi dan hanya dapat diakses oleh
              auditor internal klien yang berwenang.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center p-huge">
      <div className="mb-huge w-full max-w-4xl">
        <div className="relative mb-huge flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-full bg-surface-variant" />
          {STEPS.map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-sm bg-surface px-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-sm ${
                  index === 0
                    ? 'border-secondary font-bold text-secondary'
                    : 'border-outline-variant text-on-surface-variant'
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-label-medium ${index === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <form className="grid grid-cols-12 gap-xl" onSubmit={handleSubmit}>
          <div className="relative col-span-12 flex items-center justify-between overflow-hidden rounded-xl bg-white p-huge shadow-md shadow-primary/[0.06]">
            <div className="relative z-10">
              <h2 className="text-display text-primary">Registrasi Vendor Baru</h2>
              <p className="mt-xs max-w-[28rem] text-on-surface-variant">
                Lengkapi data legalitas dan operasional perusahaan Anda untuk mulai berpartisipasi dalam RFQ.
              </p>
            </div>
            <div className="absolute -right-12 -top-12 opacity-10">
              <span className="material-symbols-outlined text-[160px]">business_center</span>
            </div>
          </div>

          <div className="col-span-12 rounded-xl bg-white p-xl shadow-md shadow-primary/[0.06] md:col-span-7">
            <h3 className="mb-lg flex items-center gap-sm text-h3 text-primary">
              <span className="material-symbols-outlined">gavel</span>
              Informasi Legalitas
            </h3>
            <div className="space-y-lg">
              <FormField
                label="Nama Perusahaan (Sesuai Akta)"
                placeholder="PT. Global Solusi Industri"
                name="companyName"
                error={errors.companyName}
              />
              <div className="grid grid-cols-2 gap-lg">
                <FormField label="NIB (Nomor Induk Berusaha)" placeholder="1234567890123" name="nib" error={errors.nib} />
                <FormField label="NPWP Perusahaan" placeholder="00.000.000.0-000.000" name="npwp" error={errors.npwp} />
              </div>
            </div>
          </div>

          <div className="col-span-12 flex flex-col rounded-xl bg-surface-container p-xl shadow-md shadow-primary/[0.06] md:col-span-5">
            <h3 className="mb-lg flex items-center gap-sm text-h3 text-primary">
              <span className="material-symbols-outlined">upload_file</span>
              Upload Legalitas
            </h3>
            <div className="flex flex-grow cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-white/50 p-xl transition-colors hover:bg-white">
              <span className="material-symbols-outlined text-huge text-outline-variant">cloud_upload</span>
              <p className="mt-sm text-center text-label-medium text-on-surface-variant">
                Tarik file Akta, NIB, atau NPWP ke sini
              </p>
              <p className="mt-xs text-caption text-outline">PDF, JPG (Max. 5MB)</p>
            </div>
          </div>

          <div className="col-span-12 rounded-xl bg-white p-xl shadow-md shadow-primary/[0.06] md:col-span-6">
            <h3 className="mb-lg flex items-center gap-sm text-h3 text-primary">
              <span className="material-symbols-outlined">contact_phone</span>
              Kontak PIC (Person In Charge)
            </h3>
            <div className="grid grid-cols-2 gap-lg">
              <FormField label="Nama Lengkap" placeholder="John Doe" name="picName" error={errors.picName} />
              <FormField label="No. WhatsApp" placeholder="+62 812 3456 7890" name="picWhatsapp" error={errors.picWhatsapp} />
            </div>
          </div>

          <div className="col-span-12 rounded-xl bg-white p-xl shadow-md shadow-primary/[0.06] md:col-span-6">
            <h3 className="mb-lg flex items-center gap-sm text-h3 text-primary">
              <span className="material-symbols-outlined">category</span>
              Kategori Komoditas
            </h3>
            <div className="flex flex-wrap gap-sm">
              {COMMODITY_CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-xs rounded-full border border-outline-variant bg-surface px-md py-xs transition-all hover:border-secondary"
                >
                  <input
                    className="rounded-full text-secondary focus:ring-secondary"
                    type="checkbox"
                    name="category"
                    value={category}
                  />
                  <span className="text-label-medium text-on-surface">{category}</span>
                </label>
              ))}
            </div>
            {errors.category && <p className="mt-sm text-caption text-danger">{errors.category}</p>}
          </div>

          <div className="col-span-12 flex justify-end gap-lg py-xl">
            <button className="rounded-lg px-huge py-md font-bold text-secondary transition-colors hover:bg-secondary/10" type="button">
              Batal
            </button>
            <button
              className="rounded-lg bg-secondary px-huge py-md font-bold text-on-secondary shadow-lg transition-all hover:brightness-110 active:scale-95"
              type="submit"
            >
              Kirim Registrasi
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
