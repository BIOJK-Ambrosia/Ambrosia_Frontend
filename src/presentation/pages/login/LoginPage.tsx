import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '@/presentation/components/common/FormField';
import { useToastStore } from '@/presentation/stores/toastStore';

type LoginRole = 'buyer' | 'seller';

export function LoginPage() {
  const [role, setRole] = useState<LoginRole>('buyer');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(formData.get('id') ?? '').trim()) {
      nextErrors.id = 'ID/Username wajib diisi';
    }
    if (!String(formData.get('password') ?? '').trim()) {
      nextErrors.password = 'Password wajib diisi';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    showToast('Login berhasil (dummy)');
    navigate(role === 'seller' ? '/vendor/dashboard' : '/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-container-low p-huge">
      <form
        className="w-full max-w-[28rem] space-y-xl rounded-xl bg-white p-huge shadow-lg shadow-primary/10"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h1 className="text-h2 font-black text-primary">Ambrosia</h1>
          <p className="mt-xs text-on-surface-variant">Masuk untuk melanjutkan</p>
        </div>

        <div className="flex rounded-lg bg-surface-container p-1">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 rounded-md px-lg py-2 font-bold transition-all ${
              role === 'buyer' ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`flex-1 rounded-md px-lg py-2 font-bold transition-all ${
              role === 'seller' ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Seller
          </button>
        </div>

        <FormField label="ID/Username" placeholder="procurement_user_1" name="id" error={errors.id} />
        <FormField label="Password" placeholder="********" name="password" type="password" error={errors.password} />

        <button
          className="w-full rounded-lg bg-primary py-3 font-bold text-on-primary shadow-md transition-all hover:opacity-90"
          type="submit"
        >
          Masuk
        </button>

        <p className="text-center text-caption text-on-surface-variant">
          Belum punya akun?{' '}
          <Link className="font-bold text-primary hover:underline" to="/buyer/registrasi">
            Daftar Buyer
          </Link>{' '}
          ·{' '}
          <Link className="font-bold text-primary hover:underline" to="/vendor/registrasi">
            Daftar Seller
          </Link>
        </p>
      </form>
    </main>
  );
}
