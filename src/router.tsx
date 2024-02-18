import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/home';
import LoginPage from '@/pages/login/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
]);
