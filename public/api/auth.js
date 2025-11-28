import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './client';

/**
 * Auth API servisleri
 */
const authAPI = {
  // Kayit ol
  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    if (response.data?.token) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
    }
    return response.data;
  },

  // Giris yap
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data?.token) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
    }
    return response.data;
  },

  // Cikis yap
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      await AsyncStorage.removeItem('jwt_token');
    }
  },

  // Token var mi?
  async hasToken() {
    const token = await AsyncStorage.getItem('jwt_token');
    return Boolean(token);
  },

  // Mevcut kullanici
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

export default authAPI;
