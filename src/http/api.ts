import { CreateTenant, CreateUser, Credentials } from '@/types';
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
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
// GET ALL TENANTS
export const getRestaurants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);
// CREATE USER
export const createUser = (user: CreateUser) => api.post('/users', user);
// CREATE TENANT
export const createTenant = (tenantData: CreateTenant) =>
  api.post('/tenants', tenantData);
