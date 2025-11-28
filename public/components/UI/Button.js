import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

/**
 * Custom Button Component
 * @param {Object} props
 * @param {Function} props.onPress - Tıklama fonksiyonu
 * @param {string} props.title - Button yazısı
 * @param {string} props.variant - 'primary', 'secondary', 'outline', 'danger'
 * @param {boolean} props.disabled - Disabled durumu
 * @param {boolean} props.loading - Loading durumu
 * @param {boolean} props.fullWidth - Tam genişlik
 * @param {React.ReactNode} props.icon - Sol tarafta gösterilecek ikon
 * @param {React.ReactNode} props.iconRight - Sağ tarafta gösterilecek ikon
 * @param {Object} props.style - Ek stil
 */
const Button = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconRight = null,
  style,
  ...rest
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#007AFF' : '#FFFFFF'} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Primary variant
  primary: {
    backgroundColor: '#007AFF',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  // Secondary variant
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  secondaryText: {
    color: '#000000',
  },
  // Outline variant
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  outlineText: {
    color: '#007AFF',
  },
  // Danger variant
  danger: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;