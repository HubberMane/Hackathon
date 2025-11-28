import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

/**
 * Screen Wrapper Component
 * Tüm ekranlar için ortak container
 * @param {Object} props
 * @param {React.ReactNode} props.children - Ekran içeriği
 * @param {boolean} props.scroll - ScrollView kullan mı
 * @param {Object} props.style - Ek stil
 */
const ScreenWrapper = ({ children, scroll = true, style }) => {
  const containerStyles = [styles.container, style];

  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={containerStyles}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={containerStyles}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    padding: 16,
  },
});

export default ScreenWrapper;