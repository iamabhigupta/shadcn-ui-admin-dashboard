import { Logo } from '../icons/logo';
import { SidebarRoutes } from './sidebar-routes';

export const Sidebar = () => {
  return (
    <div className="w-full h-full">
      <div className="p-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  );
};
