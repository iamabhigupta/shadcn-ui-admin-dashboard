import { useAuth } from '@/store/use-auth';
import { SidebarItem } from './sidebar-item';
import { filterRoutesByRole } from './utils';

export const SidebarRoutes = () => {
  const { user } = useAuth();
  const routes = filterRoutesByRole(user?.role as string);

  return (
    <div className="flex flex-col w-full px-2 py-3 gap-y-1.5">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
