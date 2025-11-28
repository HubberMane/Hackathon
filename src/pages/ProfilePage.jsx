import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { getProfilePreview } from '../api/mockUserApi';
import UserTopBar from '../components/UserTopBar';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfilePreview();
      setProfile(data);
    } catch (e) {
      console.error('Profil mock yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div className="dashboard">
      <UserTopBar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2 style={{ margin: '0 0 12px', color: '#0f172a' }}>Profil</h2>
            {loading ? (
              <p className="card-description">Profil verisi yükleniyor...</p>
            ) : (
              <div className="profile-grid">
                <div className="profile-avatar">
                  <div
                    className={`avatar-circle ${dragOver ? 'avatar-circle--drag' : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : '👤'}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </div>
                <div className="profile-fields">
                  <label className="form-label">Ad Soyad</label>
                  <input
                    className="form-input"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />

                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />

                  <label className="form-label">Telefon</label>
                  <input
                    className="form-input"
                    value={profile.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />

                  <label className="form-label">Açıklama</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={profile.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />

                  <div style={{ marginTop: '12px' }}>
                    <button className="btn btn--primary btn--sm">Kaydet (mock)</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <section className="preview-notice">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h4>Önizleme Modu</h4>
              <p>Bu sayfa mock API verileri ile çalışıyor. Profil düzenleme canlı bağlandığında backend’e kaydedilecek.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
