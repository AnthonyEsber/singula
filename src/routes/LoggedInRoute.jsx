import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

function LoggedInRoute() {
  const { user, status } = useSelector((s) => s.auth);

  if (status === 'loading') return null;

  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export default LoggedInRoute;
