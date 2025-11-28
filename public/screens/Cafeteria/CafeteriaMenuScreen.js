import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';

const CafeteriaMenuScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Yemekhane Menusu</Text>
        <Text style={styles.text}>Menu bilgisi henuz eklenmedi.</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default CafeteriaMenuScreen;
