import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

/**
 * User Registration Page
 */
const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username.trim() || !formData.email.trim() ||
        !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement user registration API call
      // const response = await userAPI.register(formData);

      // Simulate API call
      setTimeout(() => {
        setError('API henüz bağlanmadı. Geliştirme aşamasında.');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo auth-logo--gradient">AS</div>
          <h1 className="auth-title">Kayıt Ol</h1>
          <p className="auth-subtitle">Yeni hesap oluştur</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="kullaniciadi"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="ogrenci@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Şifre Tekrar
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/" className="auth-link">
            Zaten hesabın var mı? Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
