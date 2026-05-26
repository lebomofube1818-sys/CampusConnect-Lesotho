import axios from 'axios';

// Using relative paths to talk to our local Express proxy
// This avoids CORS issues because the browser talks to the same origin
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export const dataApi = {
  getRequests: () => api.get('/requests'),
  getStudents: () => api.get('/students'),
  getCategories: () => api.get('/categories'),
  getVendors: () => api.get('/vendors'),
  createRequest: (data: any) => api.post('/updates', data),
  sync: (data?: any) => data ? api.post('/sync', data) : api.get('/sync'),
};

export const updatesApi = {
  pushUpdate: (data: any) => api.post('/updates', data),
};

export default api;
