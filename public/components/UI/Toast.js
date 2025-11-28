import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import useUIStore from '../../store/uiStore';

/**
 * Toast Notification Component
 * Displays toast messages at the top of the screen
 */
const Toast = () => {
  const toast = useUIStore((state) => state.toast);
  const hideToast = useUIStore((state) => state.hideToast);
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (toast) {
      // Slide in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  if (!toast) return null;

  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return styles.toastSuccess;
      case 'error':
        return styles.toastError;
      case 'warning':
        return styles.toastWarning;
      case 'info':
      default:
        return styles.toastInfo;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ⓘ';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.toast, getToastStyle()]}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.message}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  toastSuccess: {
    backgroundColor: '#10B981',
  },
  toastError: {
    backgroundColor: '#EF4444',
  },
  toastWarning: {
    backgroundColor: '#F59E0B',
  },
  toastInfo: {
    backgroundColor: '#3B82F6',
  },
  icon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default Toast;
