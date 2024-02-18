import { useAuth } from '@/store/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuth = () => {
  const { user } = useAuth();

  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default NonAuth;
