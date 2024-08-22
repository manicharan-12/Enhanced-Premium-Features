import axios from "axios";
//https://enhanced-premium-features.onrender.com
//http://localhost:5000
const API_URL = "https://enhanced-premium-features.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const register = async (email, password, userType, company) => {
  try {
    const response = await api.post("/register", {
      email,
      password,
      userType,
      company,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserDashboard = async () => {
  try {
    const response = await api.get("/user-dashboard");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRecruiterDashboard = async () => {
  try {
    const response = await api.get("/recruiter-dashboard");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPremiumPlans = async () => {
  try {
    const response = await api.get("/premium-plans");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updatePlan = async (planId) => {
  const response = await api.post("/update-plan", { planId });
  return response.data;
};
export default api;
