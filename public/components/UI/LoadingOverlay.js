import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import useUIStore from '../../store/uiStore';

/**
 * Loading Overlay Component
 * Displays a full-screen loading indicator
 */
const LoadingOverlay = () => {
  const isGlobalLoading = useUIStore((state) => state.isGlobalLoading);

  if (!isGlobalLoading) return null;

  return (
    <Modal transparent visible={isGlobalLoading} animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>Yükleniyor...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});

export default LoadingOverlay;
