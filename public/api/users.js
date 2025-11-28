import apiClient from './client';

/**
 * Users API servisleri
 */
const usersAPI = {
  /**
   * Kullanıcı profili getir
   * @param {number} userId 
   */
  getUserById: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Kendi profilimi güncelle
   * @param {Object} data - { username, bio, avatar_url }
   */
  updateMyProfile: async (data) => {
    const response = await apiClient.put('/users/me', data);
    return response.data;
  },

  /**
   * Kullanıcı istatistikleri
   * @param {number} userId 
   */
  getUserStats: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/stats`);
    return response.data;
  },
};

export default usersAPI;