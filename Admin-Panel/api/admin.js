import apiClient from './client';

// Admin API servisleri
const adminAPI = {
  // Admin login
  async login(email, password) {
    const { data } = await apiClient.post('/admin/login', { email, password });
    return data;
  },

  // Dashboard istatistikleri
  async getDashboardStats() {
    const { data } = await apiClient.get('/admin/dashboard-stats');
    return data;
  },

  // Kullanici listesi
  async getUsers() {
    const { data } = await apiClient.get('/admin/users');
    return data;
  },

  // Kullanici banla
  async banUser(userId) {
    const { data } = await apiClient.post(`/admin/users/${userId}/ban`);
    return data;
  },

  // Ban kaldir
  async unbanUser(userId) {
    const { data } = await apiClient.post(`/admin/users/${userId}/unban`);
    return data;
  },
};

export default adminAPI;
