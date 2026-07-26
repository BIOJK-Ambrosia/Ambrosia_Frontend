import { Outlet } from 'react-router-dom';
import { SellerSidebar } from './SellerSidebar';
import { SellerTopBar } from './SellerTopBar';

export function SellerLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SellerSidebar />
      <div className="ml-sidebar-width flex min-h-screen flex-col">
        <SellerTopBar vendorName="PT Agro Industri Mandiri" dateLabel="Senin, 27 Juli 2026" />
        <Outlet />
      </div>
    </div>
  );
}
