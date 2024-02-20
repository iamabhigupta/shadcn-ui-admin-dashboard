import { Compass, LayoutGrid, List } from 'lucide-react';

import { SidebarItem } from './sidebar-item';

const routes = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: List,
    label: 'Users',
    href: '/users',
  },
  {
    icon: Compass,
    label: 'BarChart',
    href: '/search',
  },
];

export const SidebarRoutes = () => {
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
