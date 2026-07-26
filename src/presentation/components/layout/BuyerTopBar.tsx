import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/presentation/stores/toastStore';

export function BuyerTopBar() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  function handleLogout() {
    showToast('Logout berhasil (dummy)');
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-surface-variant bg-surface px-xl">
      <div className="relative w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input
          className="w-full rounded-full border-none bg-surface-container py-2 pl-10 pr-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/30"
          placeholder="Cari PR, Vendor, atau Alert..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-md">
        <button
          className="rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high active:opacity-80"
          type="button"
          aria-label="Notifikasi"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          className="rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high active:opacity-80"
          type="button"
          aria-label="Aplikasi"
        >
          <span className="material-symbols-outlined">apps</span>
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-primary text-on-primary">
          <span className="material-symbols-outlined">person</span>
        </div>
        <button
          className="rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high active:opacity-80"
          type="button"
          aria-label="Logout"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
}
