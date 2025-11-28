import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Custom Badge Component
 * @param {Object} props
 * @param {string} props.text - Badge yazısı
 * @param {string} props.variant - 'default', 'success', 'warning', 'danger', 'info'
 * @param {Object} props.style - Ek stil
 */
const Badge = ({ text, variant = 'default', style }) => {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Default variant
  default: {
    backgroundColor: '#E5E5EA',
  },
  defaultText: {
    color: '#000000',
  },
  // Success variant
  success: {
    backgroundColor: '#34C759',
  },
  successText: {
    color: '#FFFFFF',
  },
  // Warning variant
  warning: {
    backgroundColor: '#FF9500',
  },
  warningText: {
    color: '#FFFFFF',
  },
  // Danger variant
  danger: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  // Info variant
  info: {
    backgroundColor: '#007AFF',
  },
  infoText: {
    color: '#FFFFFF',
  },
});

export default Badge;