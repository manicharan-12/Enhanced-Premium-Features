import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (email, password, userType, company) => {
  const response = await api.post('/register', { email, password, userType, company });
  return response.data;
};

export const getUserDashboard = async () => {
  const response = await api.get('/user-dashboard');
  return response.data;
};

export const getRecruiterDashboard = async () => {
  const response = await api.get('/recruiter-dashboard');
  return response.data;
};

export const upgradeToPremium = async () => {
  const response = await api.post('/upgrade-plan');
  return response.data;
};

export default api;