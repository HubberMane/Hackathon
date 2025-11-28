import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

/**
 * Login Screen (preview friendly)
 */
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const showToast = useUIStore((state) => state.showToast);

  // Form validasyonu
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }

    if (!password.trim()) {
      newErrors.password = 'Şifre zorunludur';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login işlemi
  const handleLogin = async () => {
    if (loading) return; // Prevent multiple submissions
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const result = await login(email, password);

      if (result.success) {
        showToast('Giriş başarılı!', 'success');
      } else {
        const errorMsg = result.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
        showToast(errorMsg, 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Hubber’a hoş geldin!</Text>

        <Input
          label="Email"
          placeholder="ornek@email.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Şifre"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secure
        />

        <Button
          title={loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.loginButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 32,
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  registerLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;
