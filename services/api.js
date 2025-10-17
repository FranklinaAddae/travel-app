import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// API Configuration\\\\\
const API_BASE_URL = 'https://travel-app-backend-bmja.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'auth_token';


export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await removeToken();
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Profile API calls
export const profileAPI = {
  updateProfile: async (profileData) => {
    const response = await api.put('/profile/update', profileData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not running');
  }
};

export default api;