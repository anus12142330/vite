import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import PublicRoute from 'ui-component/routing/PublicRoute'; // import public route wrapper

// lazy-loaded pages
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));

// ROUTES
const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/login" replace />
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    },
    {
      path: 'register',
      element: (
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      )
    }
  ]
};

export default AuthenticationRoutes;
