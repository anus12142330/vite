import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from 'ui-component/routing/PrivateRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ProfilePage = Loadable(lazy(() => import('views/profile-page')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <Navigate to="/dashboard/default" replace />
    },
    {
      path: 'dashboard/default',
      element: (
        <PrivateRoute>
          <DashboardDefault />
        </PrivateRoute>
      )
    },
     {
      path: 'profile-page',
      element: (
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      )
    },
    {
      path: 'sample-page',
      element: (
        <PrivateRoute>
          <SamplePage />
        </PrivateRoute>
      )
    },
    
    // other routes
  ]
};

export default MainRoutes;
