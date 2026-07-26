import { NavLink } from 'react-router-dom';

interface NavItem {
  icon: string;
  label: string;
  path?: string;
}

const BUYER_NAV_ITEMS: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'trending_up', label: 'Forecasting', path: '/forecasting' },
  { icon: 'request_quote', label: 'PR' },
  { icon: 'request_page', label: 'RFQ', path: '/rfq' },
  { icon: 'description', label: 'Document Parsing', path: '/document-parsing' },
  { icon: 'fact_check', label: 'Vendor Scorecard' },
  { icon: 'shopping_cart', label: 'PO' },
  { icon: 'inventory_2', label: 'Receiving' },
  { icon: 'monitoring', label: 'Model Monitoring' },
  { icon: 'notifications', label: 'Alert Center' },
  { icon: 'assessment', label: 'Reports' },
  { icon: 'analytics', label: 'ROI' },
];

const BUYER_FOOTER_ITEMS: NavItem[] = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help', label: 'Help Center' },
];

function SidebarLink({ item }: { item: NavItem }) {
  if (!item.path) {
    return (
      <span className="mx-2 my-1 flex items-center gap-md rounded-lg px-4 py-2 text-on-primary/40">
        <span className="material-symbols-outlined">{item.icon}</span>
        <span className="text-body">{item.label}</span>
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `mx-2 my-1 flex items-center gap-md rounded-lg px-4 py-2 transition-colors ${
          isActive ? 'bg-secondary font-semibold text-on-secondary' : 'text-on-primary/70 hover:bg-white/10 hover:text-on-primary'
        }`
      }
    >
      <span className="material-symbols-outlined">{item.icon}</span>
      <span className="text-body">{item.label}</span>
    </NavLink>
  );
}

export function BuyerSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-sidebar-width flex-col border-r border-outline-variant/20 bg-primary text-on-primary shadow-md">
      <div className="p-xl">
        <h1 className="text-h3 font-bold text-on-primary">Ambrosia Procurement</h1>
        <p className="mt-xs text-caption text-on-primary/60">Buyer Workspace</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-sm">
        {BUYER_NAV_ITEMS.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-outline-variant/20 px-sm py-md">
        {BUYER_FOOTER_ITEMS.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </div>
    </aside>
  );
}
