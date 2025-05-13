import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// ---  interceptor block ---
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // must include "Bearer "
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => Promise.reject(error));
// ----------------------------------

export default API;

// Auth
export const register   = data => API.post('/auth/register', data);
export const login      = data => API.post('/auth/login', data);

// Projects
export const fetchProjects  = () => API.get('/projects');
export const addProject     = data => API.post('/projects', data);

// Tasks
export const fetchTasks     = () => API.get('/tasks');
export const addTask        = data => API.post('/tasks', data);
export const editTask       = (id, data) => API.put(`/tasks/${id}`, data);
export const removeTask     = id => API.delete(`/tasks/${id}`);