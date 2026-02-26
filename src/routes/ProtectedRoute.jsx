import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
  const { user, status } = useSelector((s) => s.auth);

  if (status === 'loading') return null;

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
