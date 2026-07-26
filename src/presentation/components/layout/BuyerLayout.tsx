import { Outlet } from 'react-router-dom';
import { BuyerSidebar } from './BuyerSidebar';
import { BuyerTopBar } from './BuyerTopBar';

export function BuyerLayout() {
  return (
    <div className="min-h-screen bg-background">
      <BuyerSidebar />
      <main className="ml-sidebar-width flex min-h-screen flex-col">
        <BuyerTopBar />
        <Outlet />
      </main>
    </div>
  );
}
