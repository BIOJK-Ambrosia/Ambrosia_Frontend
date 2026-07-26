interface SellerTopBarProps {
  vendorName: string;
  dateLabel: string;
}

export function SellerTopBar({ vendorName, dateLabel }: SellerTopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-surface-variant bg-surface/80 px-gutter backdrop-blur-md">
      <div className="flex flex-col">
        <h2 className="text-h3 text-primary">Halo, {vendorName}</h2>
        <p className="text-caption text-on-surface-variant">{dateLabel} • Workspace Seller</p>
      </div>
      <div className="flex items-center gap-lg">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-surface-container-high"
          type="button"
          aria-label="Bantuan"
        >
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-surface-container-high"
          type="button"
          aria-label="Akun"
        >
          <span className="material-symbols-outlined text-primary">account_circle</span>
        </button>
      </div>
    </header>
  );
}
