import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import universitiesAPI from '../../api/universities';

/**
 * Register Screen
 */
const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    university_id: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loadingUniversities, setLoadingUniversities] = useState(true);

  const register = useAuthStore((state) => state.register);
  const showToast = useUIStore((state) => state.showToast);

  // Fetch universities on mount
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoadingUniversities(true);
      const data = await universitiesAPI.getAll();
      setUniversities(data.universities || data || []);
      // Set first university as default if available
      if (data.universities?.length > 0 || data?.length > 0) {
        const unis = data.universities || data;
        setFormData((prev) => ({ ...prev, university_id: unis[0].id }));
      }
    } catch (error) {
      console.error('Failed to fetch universities:', error);
      showToast('Üniversiteler yüklenemedi', 'error');
    } finally {
      setLoadingUniversities(false);
    }
  };

  // Form değişimi
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Form validasyonu
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı zorunludur';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    } else if (formData.username.length > 30) {
      newErrors.username = 'Kullanıcı adı çok uzun';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Şifre çok uzun';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifre tekrarı zorunludur';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!formData.university_id) {
      newErrors.university_id = 'Lütfen bir üniversite seçin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Register işlemi
  const handleRegister = async () => {
    if (loading) return; // Prevent multiple submissions
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const result = await register({
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        university_id: formData.university_id,
      });

      if (result.success) {
        showToast('Kayıt başarılı! Giriş yapabilirsiniz.', 'success');
      } else {
        // Display backend error message
        const errorMsg = result.error || 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.';
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
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>
          Hesap oluştur ve platformu keşfet!
        </Text>

        <Input
          label="Kullanıcı Adı"
          placeholder="kullaniciadi"
          value={formData.username}
          onChangeText={(value) => handleChange('username', value)}
          error={errors.username}
          autoCapitalize="none"
        />

        <Input
          label="Email"
          placeholder="ornek@email.com"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Şifre"
          placeholder="••••••••"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          error={errors.password}
          secure
        />

        <Input
          label="Şifre Tekrar"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          error={errors.confirmPassword}
          secure
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Üniversite</Text>
          {loadingUniversities ? (
            <View style={styles.pickerLoading}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.pickerLoadingText}>Yükleniyor...</Text>
            </View>
          ) : (
            <View style={[styles.picker, errors.university_id && styles.pickerError]}>
              <Picker
                selectedValue={formData.university_id}
                onValueChange={(value) => handleChange('university_id', value)}
                style={styles.pickerInput}
              >
                <Picker.Item label="Üniversite seçin" value="" />
                {universities.map((uni) => (
                  <Picker.Item
                    key={uni.id}
                    label={uni.name}
                    value={uni.id}
                  />
                ))}
              </Picker>
            </View>
          )}
          {errors.university_id ? (
            <Text style={styles.pickerErrorText}>{errors.university_id}</Text>
          ) : null}
        </View>

        <Button
          title={loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.registerButton}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten hesabın var mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
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
  registerButton: {
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  picker: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  pickerError: {
    borderColor: '#EF4444',
  },
  pickerInput: {
    height: 48,
  },
  pickerLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 8,
  },
  pickerLoadingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  pickerErrorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444',
  },
});

export default RegisterScreen;