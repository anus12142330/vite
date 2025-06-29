import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  console.log(user);
  return user ? children : <Navigate to="/login" replace />;
}