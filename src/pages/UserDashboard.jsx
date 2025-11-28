import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { getDashboardSummary } from '../api/mockUserApi';
import UserTopBar from '../components/UserTopBar';

/**
 * User Dashboard - Main landing page (preview mode with mock API)
 */
const UserDashboard = () => {
  const [summary, setSummary] = useState({
    places: 0,
    events: 0,
    forumThreads: 0,
    cafeteriaMenu: '',
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    window.location.href = '/';
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error('Dashboard özet verisi alınamadı (mock):', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Spor Tesisleri',
      icon: '📌',
      description: `${summary.places} aktif tesis ve saha seni bekliyor.`,
      link: '/dashboard/places',
      cta: 'Keşfet →',
    },
    {
      title: 'Etkinlikler',
      icon: '🗓️',
      description: `${summary.events} etkinlik bu hafta takvimde.`,
      link: '/dashboard/events',
      cta: 'Görüntüle →',
    },
    {
      title: 'Forum',
      icon: '🗨️',
      description: `${summary.forumThreads}+ tartışma ve yanıt.`,
      link: '/dashboard/forum',
      cta: 'Katıl →',
    },
    {
      title: 'Yemekhane',
      icon: '🍲',
      description: `Bugünün menüsü: ${summary.cafeteriaMenu || 'Yükleniyor...'}`,
      link: '/dashboard/cafeteria',
      cta: 'Menüyü Gör →',
    },
  ];

  return (
    <div className="dashboard">
      <UserTopBar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="welcome-section">
            <h1 className="welcome-title">Hoş Geldin! 👋</h1>
            <p className="welcome-subtitle">
              Hubber platformuna hoş geldin. Burada spor etkinliklerine katılabilir,
              tesisleri keşfedebilir ve diğer öğrencilerle iletişime geçebilirsin.
            </p>
          </section>

          {loading ? (
            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div className="card-icon" aria-hidden>⏳</div>
              <p className="card-description">Özet veriler yükleniyor...</p>
            </div>
          ) : (
            <div className="dashboard-grid">
              {cards.map((card) => (
                <div className="dashboard-card" key={card.title}>
                  <div className="card-icon">{card.icon}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <Link to={card.link} className="card-link">
                    {card.cta}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <section className="preview-notice">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h4>Önizleme Modu</h4>
              <p>Bu sayfa mock API verileri ile çalışıyor. Canlı bağlantılar eklendiğinde otomatik güncellenecek.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
