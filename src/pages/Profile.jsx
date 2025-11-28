import React, { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: 'Felix K.',
    email: 'felix@kampus.edu.tr',
    phone: '0555 123 45 67',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStatus({ type: 'idle', message: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, avatar: newUrl }));
      setStatus({ type: 'success', message: 'Profil fotoğrafı güncellendi (lokal önizleme).' });
    }
  };

  const handleSave = () => {
    if (!userData.fullName.trim() || !userData.email.trim()) {
      setStatus({ type: 'error', message: 'Ad Soyad ve E-Posta zorunludur.' });
      return;
    }
    setStatus({ type: 'success', message: 'Profil bilgileriniz kaydedildi.' });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Profil Bilgilerim</h2>

        <div className="profile-avatar-wrapper">
          <img src={userData.avatar} alt="Profil" />
          <label className="avatar-overlay">
            <span>Değiştir</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>Fotoğrafı değiştirmek için üzerine tıklayın</span>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label">Ad Soyad</label>
          <input
            type="text"
            name="fullName"
            className="form-input"
            value={userData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">E-Posta Adresi</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telefon Numarası</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Şifre</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        {status.type !== 'idle' && (
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: status.type === 'error' ? '#fff4f4' : '#ecfdf3',
              border: `1px solid ${status.type === 'error' ? '#fecdd3' : '#bbf7d0'}`,
              color: status.type === 'error' ? '#b91c1c' : '#14532d',
              marginTop: '6px',
            }}
          >
            {status.message}
          </div>
        )}

        <button className="save-btn" onClick={handleSave}>
          Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
};

export default Profile;
