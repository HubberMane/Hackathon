import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';

const PlacesListScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Tesisler</Text>
        <Text style={styles.text}>Tesis listesi henuz tanimlanmadi.</Text>
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

export default PlacesListScreen;
