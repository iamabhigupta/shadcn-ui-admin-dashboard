import { Credentials } from '@/types';
import { api } from './client';

// Auth Service
// LOGIN
export const login = (credentials: Credentials) =>
  api.post('/auth/login', credentials);
// SELF
export const self = () => api.get('/auth/self');
