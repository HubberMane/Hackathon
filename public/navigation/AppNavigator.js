import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import useAuthStore from '../store/authStore';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

/**
 * Ana navigasyon yapısı
 * Auth durumuna göre Auth veya Main navigator gösterir
 */
const AppNavigator = () => {
  const { isLoggedIn, isLoading, loadUser } = useAuthStore();
  const bypassAuth = true; // Ön izleme için auth'u atla

  // Uygulama başlangıcında kullanıcı bilgisini yükle (bypass kapalıysa)
  useEffect(() => {
    if (!bypassAuth) {
      loadUser();
    }
  }, []);

  // Bypass açıkken direkt ana sekmelere gir
  if (bypassAuth) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Loading durumu
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
