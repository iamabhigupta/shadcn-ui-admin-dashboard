import { Box, Gift, LayoutGrid, Users, Utensils } from 'lucide-react';

export const filterRoutesByRole = (role: string) => {
  const allRoutes = [
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

  if (role === 'admin') {
    return allRoutes;
  } else {
    return allRoutes.filter(
      (route) => route.label !== 'Users' && route.label !== 'Restaurants'
    );
  }
};
