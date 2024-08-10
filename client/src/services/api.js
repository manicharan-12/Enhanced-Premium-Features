import axios from 'axios';

const API_URL = 'https://enhanced-premium-features.onrender.com';

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
  try {
    const response = await api.post('/login', { email, password });
    return response.data;    
  } catch (error) {
    console.error(error);
    
  }

};

export const register = async (email, password, userType, company) => {
  try {
    const response = await api.post('/register', { email, password, userType, company });
    return response.data;    
  } catch (error) {
    console.error(error);
    
  }

};

export const getUserDashboard = async () => {
  try {
    const response = await api.get('/user-dashboard');
    return response.data;    
  } catch (error) {
    console.error(error);
  }

};

export const getRecruiterDashboard = async () => {
  try {
    const response = await api.get('/recruiter-dashboard');
    return response.data;    
  } catch (error) {
    console.error(error); 
  }
};

export const getPremiumPlans=async()=>{
  try {
    const response=await api.get('/premium-plans')
    return response.data    
  } catch (error) {
    console.error(error);
  }

}

export const upgradeToPremium = async () => {
  try {
    const response = await api.post('/upgrade-plan');
    return response.data;    
  } catch (error) {
    console.error(error);    
  }
};

export default api;