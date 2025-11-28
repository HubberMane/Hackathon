import React, { useEffect, useState } from 'react';
import adminAPI from '../api/admin';
import { Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';

const MOCK_STATS = {
  total_users: 1280,
  total_posts: 342,
  total_comments: 1894,
  total_blogs: 42,
};

const USE_MOCK = true;

/**
 * Dashboard Page
 * Admin paneli ana sayfa - istatistikler
 */
const Dashboard = () => {
  const [stats, setStats] = useState(MOCK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    if (USE_MOCK) {
      setStats(MOCK_STATS);
      setLoading(false);
      return;
    }

    try {
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Stats yüklenemedi, mock veriye düşüldü:', error);
      setStats(MOCK_STATS);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Toplam Kullanıcı', value: stats?.total_users || 0, icon: Users, tone: 'blue' },
    { title: 'Toplam Post', value: stats?.total_posts || 0, icon: FileText, tone: 'green' },
    { title: 'Toplam Yorum', value: stats?.total_comments || 0, icon: MessageSquare, tone: 'purple' },
    { title: 'Toplam Blog', value: stats?.total_blogs || 0, icon: TrendingUp, tone: 'amber' },
  ];

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Kontrol Paneli</p>
          <h1>Dashboard</h1>
          <p className="muted">
            Hubber ekosisteminin nabzını tutan ferah bir görünüm. Anlık değerler burada.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="card card--center">
          <p className="muted">Yükleniyor...</p>
        </div>
      ) : (
        <>
          <section className="stat-grid">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className={`card stat-card stat-card--${card.tone}`}>
                  <div>
                    <p className="muted">{card.title}</p>
                    <p className="stat-card__value">{card.value}</p>
                  </div>
                  <span className="stat-card__icon">
                    <Icon size={22} />
                  </span>
                </article>
              );
            })}
          </section>

          <section className="card">
            <div className="card__header">
              <div>
                <p className="eyebrow">Hoş Geldin</p>
                <h2>Panoya göz at</h2>
              </div>
            </div>
            <p className="muted">
              Blog içerikleri, kullanıcılar ve moderasyon işlemleri sol menüden yönetilebilir.
              Sade kartlar ve cool gray palet ile daha samimi bir akış yakalandı.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
