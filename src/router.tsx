import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <h1>login</h1>,
  },
]);
