import { CreateUser, Credentials } from '@/types';
import { api } from './client';

// Auth Service
// LOGIN
export const login = (credentials: Credentials) =>
  api.post('/auth/login', credentials);
// SELF
export const self = () => api.get('/auth/self');
// LOGOUT
export const logout = () => api.post('/auth/logout');
// GET ALL USERS
export const getUsers = () => api.get('/users');
// GET ALL TENANTS
export const getRestaurants = () => api.get('/tenants');
// CREATE USER
export const createUser = (user: CreateUser) => api.post('/users', user);
