import apiClient from './client';

/**
 * Universities API
 */
const universitiesAPI = {
  /**
   * Get all universities
   */
  async getAll() {
    try {
      const response = await apiClient.get('/universities');
      return response.data;
    } catch (error) {
      console.error('Get universities error:', error);
      throw error;
    }
  },
};

export default universitiesAPI;
