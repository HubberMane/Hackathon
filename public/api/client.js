import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API base URL from environment variables
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.antalyasports.com/api';

// Axios instance oluştur
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte JWT token ekle
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Token alınamadı:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 durumunda token temizle
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz, kullanıcıyı logout et
      await AsyncStorage.removeItem('jwt_token');
      // authStore'dan logout çağır (circular dependency önlemek için event kullan)
      if (global.onUnauthorized) {
        global.onUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;