import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/login/login';
import Dashboard from '@/layouts/dashboard';
import NonAuth from '@/layouts/non-auth';
import Root from '@/layouts/root';
import Users from '@/pages/users';
import HomePage from './pages/home';
import Restaurants from './pages/restaurants';
import RestaurantsPage2 from './pages/restaurants2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/restaurants',
            element: <Restaurants />,
          },
          {
            path: '/restaurants2',
            element: <RestaurantsPage2 />,
          },
        ],
      },
      {
        path: '/auth',
        element: <NonAuth />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
