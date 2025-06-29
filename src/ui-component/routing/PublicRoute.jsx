// src/ui-component/routing/PublicRoute.jsx
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const user = localStorage.getItem('user');
  // If user logged in, redirect to dashboard
  return user ? <Navigate to="/dashboard" replace /> : children;
}