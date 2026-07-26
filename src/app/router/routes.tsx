import { createBrowserRouter } from 'react-router-dom';
import { BuyerLayout } from '@/presentation/components/layout/BuyerLayout';
import { SellerLayout } from '@/presentation/components/layout/SellerLayout';
import { BuyerDashboardPage } from '@/presentation/pages/dashboard/BuyerDashboardPage';
import { DemandForecastingPage } from '@/presentation/pages/forecasting/DemandForecastingPage';
import { DocumentParsingPage } from '@/presentation/pages/document-parsing/DocumentParsingPage';
import { RfqManagementPage } from '@/presentation/pages/rfq/RfqManagementPage';
import { VendorRegistrationPage } from '@/presentation/pages/vendor-registration/VendorRegistrationPage';
import { VendorPortalPage } from '@/presentation/pages/vendor-portal/VendorPortalPage';
import { SellerDashboardPage } from '@/presentation/pages/vendor-portal/SellerDashboardPage';
import { LoginPage } from '@/presentation/pages/login/LoginPage';
import { BuyerRegisterPage } from '@/presentation/pages/buyer-registration/BuyerRegisterPage';
import { LandingPage } from '@/presentation/pages/landing/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <BuyerLayout />,
    children: [
      { path: '/dashboard', element: <BuyerDashboardPage /> },
      { path: '/forecasting', element: <DemandForecastingPage /> },
      { path: '/document-parsing', element: <DocumentParsingPage /> },
      { path: '/rfq', element: <RfqManagementPage /> },
      { path: '/buyer/registrasi', element: <BuyerRegisterPage /> },
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
