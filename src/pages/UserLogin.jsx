import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

/**
 * User Login Page (Main Landing)
 */
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);

    try {
      // Simulate successful login for preview
      setTimeout(() => {
        localStorage.setItem('user_token', 'preview_token');
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo auth-logo--gradient">HB</div>
          <h1 className="auth-title">Hubber</h1>
          <p className="auth-subtitle">Öğrenci platformuna hoş geldiniz</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="ogrenci@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register" className="auth-link">
            Hesabın yok mu? Kayıt ol
          </Link>
          <Link to="/admin-login" className="auth-link auth-link--secondary">
            Admin Girişi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
