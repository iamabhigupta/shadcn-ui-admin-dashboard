import { useAuth } from '@/store/use-auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const NonAuth = () => {
  const { user } = useAuth();

  const { search } = useLocation();

  if (user !== null) {
    const redirect = new URLSearchParams(search).get('redirect') || '/';
    console.log('search', search);
    console.log('redirect', redirect);
    return <Navigate to={redirect} replace={true} />;
  }

  return <Outlet />;
};

export default NonAuth;
