import { NavLink } from 'react-router-dom';

interface NavItem {
  icon: string;
  label: string;
  path?: string;
}

const SELLER_NAV_ITEMS: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/vendor/dashboard' },
  { icon: 'notifications', label: 'Notifikasi RFQ' },
  { icon: 'send', label: 'Submit Penawaran', path: '/vendor/portal' },
  { icon: 'grade', label: 'Skor & Histori Saya' },
  { icon: 'inventory_2', label: 'Status PO' },
];

const SELLER_FOOTER_ITEMS: NavItem[] = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help', label: 'Help Center' },
];

function SidebarLink({ item }: { item: NavItem }) {
  if (!item.path) {
    return (
      <span className="mx-2 my-1 flex items-center gap-md rounded-lg px-4 py-3 text-primary/40">
        <span className="material-symbols-outlined">{item.icon}</span>
        <span>{item.label}</span>
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `mx-2 my-1 flex items-center gap-md rounded-lg px-4 py-3 transition-all ${
          isActive ? 'bg-white/30 font-bold text-primary' : 'text-primary/70 hover:bg-white/20 hover:text-primary'
        }`
      }
    >
      <span className="material-symbols-outlined">{item.icon}</span>
      <span>{item.label}</span>
    </NavLink>
  );
}

export function SellerSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-sidebar-width flex-col bg-ocean shadow-md">
      <div className="px-xl py-huge">
        <h1 className="text-h3 font-black text-primary">Ambrosia</h1>
        <p className="mt-xs text-label-medium uppercase tracking-widest text-primary/80">Seller Portal</p>
      </div>
      <nav className="flex-grow">
        {SELLER_NAV_ITEMS.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </nav>
      <div className="border-t border-primary/10 p-xl">
        {SELLER_FOOTER_ITEMS.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </div>
    </aside>
  );
}
