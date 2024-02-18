import { useAuth } from '@/store/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div>
      Dashboard <Outlet />
    </div>
  );
};

export default Dashboard;
