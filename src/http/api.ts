import { Credentials } from '@/types';
import { api } from './client';

// Auth Service
// LOGIN
export const login = (credentials: Credentials) =>
  api.post('/auth/login', credentials);
// SELF
export const self = () => api.get('/auth/self');
// SELF
export const logout = () => api.post('/auth/logout');
// ALL USERS
export const getUsers = () => api.get('/users');
// ALL TENANTS
export const getRestaurants = () => api.get('/tenants');
