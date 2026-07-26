import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FormField } from '@/presentation/components/common/FormField';

const BUYER_ROLES = [
  { value: 'procurement_manager', label: 'Procurement Manager' },
  { value: 'ops_director', label: 'Ops Director' },
  { value: 'cfo', label: 'CFO' },
  { value: 'warehouse_qa', label: 'Warehouse / QA' },
  { value: 'admin', label: 'Admin' },
];

export function BuyerRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isNewOrg, setIsNewOrg] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requiredFields: Array<[string, string]> = [
      ['name', 'Nama lengkap wajib diisi'],
      ['id', 'ID/Email wajib diisi'],
      ['password', 'Password wajib diisi'],
    ];
    const nextErrors: Record<string, string> = {};
    for (const [name, message] of requiredFields) {
      const value = formData.get(name);
      if (!value || String(value).trim() === '') {
        nextErrors[name] = message;
      }
    }
    const orgField = isNewOrg ? 'clientName' : 'clientId';
    const orgValue = formData.get(orgField);
    if (!orgValue || String(orgValue).trim() === '') {
      nextErrors[orgField] = isNewOrg ? 'Nama perusahaan wajib diisi' : 'Client ID wajib diisi';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-huge">
        <div className="w-full max-w-[32rem] rounded-xl border border-outline-variant bg-white p-huge text-center shadow-2xl">
          <div className="mx-auto mb-xl flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <span className="material-symbols-outlined text-[40px] text-success">check_circle</span>
          </div>
          <h2 className="mb-md text-display text-primary">Registrasi Berhasil</h2>
          <p className="mx-auto mb-xl max-w-[24rem] text-on-surface-variant">
            Akun Buyer Anda sudah dibuat (dummy). Silakan login untuk melanjutkan.
          </p>
          <Link
            className="inline-flex items-center gap-sm rounded-lg bg-primary px-xl py-3 font-bold text-on-primary shadow-md transition-all hover:opacity-90"
            to="/login"
          >
            <span className="material-symbols-outlined">login</span>
            Ke Halaman Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center p-huge">
      <form
        className="w-full max-w-2xl space-y-xl rounded-xl border border-outline-variant bg-white p-huge shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-display text-primary">Registrasi Buyer</h2>
          <p className="mt-xs text-on-surface-variant">
            Daftar sebagai pengguna internal klien (procurement, ops, CFO, warehouse/QA, admin).
          </p>
        </div>

        <FormField label="Nama Lengkap" placeholder="Budi Procurement" name="name" error={errors.name} />
        <div className="grid grid-cols-2 gap-lg">
          <FormField label="ID/Email" placeholder="procurement_user_1" name="id" error={errors.id} />
          <FormField label="Password" placeholder="********" name="password" type="password" error={errors.password} />
        </div>

        <div className="space-y-sm">
          <label className="block text-label-medium text-on-surface-variant" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-lg border border-outline-variant p-2 text-on-surface focus:border-secondary focus:ring-secondary"
          >
            {BUYER_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-sm">
          <div className="flex rounded-lg bg-surface-container p-1">
            <button
              type="button"
              onClick={() => setIsNewOrg(false)}
              className={`flex-1 rounded-md px-lg py-2 font-bold transition-all ${
                !isNewOrg ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Organisasi Sudah Terdaftar
            </button>
            <button
              type="button"
              onClick={() => setIsNewOrg(true)}
              className={`flex-1 rounded-md px-lg py-2 font-bold transition-all ${
                isNewOrg ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Daftarkan Organisasi Baru
            </button>
          </div>
          {isNewOrg ? (
            <FormField label="Nama Perusahaan" placeholder="Restoran Nusantara Jaya" name="clientName" error={errors.clientName} />
          ) : (
            <FormField label="Client ID" placeholder="client-uuid-12345" name="clientId" error={errors.clientId} />
          )}
        </div>

        <button
          className="w-full rounded-lg bg-primary py-3 font-bold text-on-primary shadow-md transition-all hover:opacity-90"
          type="submit"
        >
          Daftar
        </button>

        <p className="text-center text-caption text-on-surface-variant">
          Sudah punya akun?{' '}
          <Link className="font-bold text-primary hover:underline" to="/login">
            Masuk di sini
          </Link>
        </p>
      </form>
    </main>
  );
}
