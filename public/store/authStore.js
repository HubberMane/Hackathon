import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../api/auth';

/**
 * Auth state management store with persistence
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoggedIn: false,
      isLoading: true,

  // Actions

  /**
   * Kayıt ol
   */
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      set({ 
        user: response.user, 
        isLoggedIn: true,
        isLoading: false 
      });
      return { success: true, data: response };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Kayıt başarısız' 
      };
    }
  },

  /**
   * Giriş yap
   */
  login: async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      set({ 
        user: response.user, 
        isLoggedIn: true,
        isLoading: false 
      });
      return { success: true, data: response };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Giriş başarısız' 
      };
    }
  },

  /**
   * Çıkış yap
   */
  logout: async () => {
    try {
      await authAPI.logout();
      set({ 
        user: null, 
        isLoggedIn: false,
        isLoading: false 
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  /**
   * Mevcut kullanıcı bilgisini yükle (app başlangıcında)
   */
  loadUser: async () => {
    try {
      const hasToken = await authAPI.hasToken();
      if (!hasToken) {
        set({ isLoading: false, isLoggedIn: false });
        return;
      }

      const response = await authAPI.getCurrentUser();
      set({ 
        user: response.user, 
        isLoggedIn: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Load user error:', error);
      set({ 
        user: null, 
        isLoggedIn: false,
        isLoading: false 
      });
    }
  },

  /**
   * Kullanıcı bilgisini güncelle
   */
  updateUser: (userData) => {
    set({ user: { ...get().user, ...userData } });
  },

  /**
   * Force logout (401 durumu için)
   */
  forceLogout: () => {
    set({
      user: null,
      isLoggedIn: false,
      isLoading: false
    });
  },
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        // Don't persist isLoading
      }),
    }
  )
);

// Global unauthorized handler'ı bağla
global.onUnauthorized = () => {
  useAuthStore.getState().forceLogout();
};

export default useAuthStore;