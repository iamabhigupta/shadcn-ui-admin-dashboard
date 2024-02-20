import { Box, Gift, LayoutGrid, Users, Utensils } from 'lucide-react';

import { SidebarItem } from './sidebar-item';

const routes = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Users,
    label: 'Users',
    href: '/users',
  },
  {
    icon: Utensils,
    label: 'Restaurants',
    href: '/restaurants',
  },
  {
    icon: Box,
    label: 'Products',
    href: '/products',
  },
  {
    icon: Gift,
    label: 'Promos',
    href: '/promos',
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
