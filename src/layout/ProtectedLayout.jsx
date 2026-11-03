import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  return localStorage.getItem('linkme_token')
    ? <Outlet />
    : <Navigate to="/login" replace />;
}
