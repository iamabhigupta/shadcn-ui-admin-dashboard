import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/store/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-56">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <ScrollArea>
          <main className="p-5 bg-gray-100 h-full">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Dashboard;
