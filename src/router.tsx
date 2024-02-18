import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/home';
import LoginPage from '@/pages/login/login';
import Dashboard from '@/layouts/dashboard';
import NonAuth from '@/layouts/non-auth';
import Root from '@/layouts/root';

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
