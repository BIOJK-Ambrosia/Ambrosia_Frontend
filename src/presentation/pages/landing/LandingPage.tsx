import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-container-low p-huge text-center">
      <div className="max-w-[36rem] space-y-xl">
        <h1 className="text-display font-black text-primary">Ambrosia</h1>
        <p className="text-h3 text-on-surface-variant">
          AI Decision Intelligence Layer untuk procurement bahan baku pangan
        </p>
        <p className="text-body text-on-surface-variant">
          Mengubah pengadaan dari reaktif menjadi prediktif &amp; preskriptif — untuk tim
          procurement (Buyer Side) maupun vendor/supplier (Seller Side).
        </p>
        <Link
          className="inline-flex items-center gap-sm rounded-lg bg-primary px-huge py-3 font-bold text-on-primary shadow-md transition-all hover:opacity-90"
          to="/login"
        >
          <span className="material-symbols-outlined">login</span>
          Masuk
        </Link>
      </div>
    </main>
  );
}
