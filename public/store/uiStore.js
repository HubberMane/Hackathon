import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * UI state management store with persistence
 * Toast notifications, loading states, modals, theme preferences
 */
const useUIStore = create(
  persist(
    (set) => ({
      // State
      toast: null,
      isGlobalLoading: false,
      theme: 'light', // 'light' or 'dark'

  // Actions

  /**
   * Toast göster
   * @param {string} message 
   * @param {string} type - 'success', 'error', 'info', 'warning'
   */
  showToast: (message, type = 'info') => {
    set({ toast: { message, type, id: Date.now() } });
    // 3 saniye sonra otomatik kapat
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },

  /**
   * Toast kapat
   */
  hideToast: () => {
    set({ toast: null });
  },

  /**
   * Global loading göster/gizle
   */
  setGlobalLoading: (isLoading) => {
    set({ isGlobalLoading: isLoading });
  },

  /**
   * Theme değiştir
   */
  setTheme: (theme) => {
    set({ theme });
  },

  /**
   * Theme toggle
   */
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  },
    }),
    {
      name: 'ui-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
        // Don't persist toast and loading states
      }),
    }
  )
);

export default useUIStore;