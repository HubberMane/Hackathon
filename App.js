import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './public/navigation/AppNavigator';
import Toast from './public/components/UI/Toast';
import LoadingOverlay from './public/components/UI/LoadingOverlay';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      <Toast />
      <LoadingOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
