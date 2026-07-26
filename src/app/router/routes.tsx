import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BuyerLayout } from '@/presentation/components/layout/BuyerLayout';
import { SellerLayout } from '@/presentation/components/layout/SellerLayout';
import { BuyerDashboardPage } from '@/presentation/pages/dashboard/BuyerDashboardPage';
import { DemandForecastingPage } from '@/presentation/pages/forecasting/DemandForecastingPage';
import { DocumentParsingPage } from '@/presentation/pages/document-parsing/DocumentParsingPage';
import { RfqManagementPage } from '@/presentation/pages/rfq/RfqManagementPage';
import { VendorRegistrationPage } from '@/presentation/pages/vendor-registration/VendorRegistrationPage';
import { VendorPortalPage } from '@/presentation/pages/vendor-portal/VendorPortalPage';
import { SellerDashboardPage } from '@/presentation/pages/vendor-portal/SellerDashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <BuyerLayout />,
    children: [
      { path: '/dashboard', element: <BuyerDashboardPage /> },
      { path: '/forecasting', element: <DemandForecastingPage /> },
      { path: '/document-parsing', element: <DocumentParsingPage /> },
      { path: '/rfq', element: <RfqManagementPage /> },
    ],
  },
  {
    element: <SellerLayout />,
    children: [
      { path: '/vendor/dashboard', element: <SellerDashboardPage /> },
      { path: '/vendor/registrasi', element: <VendorRegistrationPage /> },
      { path: '/vendor/portal', element: <VendorPortalPage /> },
    ],
  },
]);
