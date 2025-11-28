import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { getEvents } from '../api/mockUserApi';
import UserTopBar from '../components/UserTopBar';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (e) {
      console.error('Events mock yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = events.filter((e) => {
    if (filter === 'paid') return e.paid;
    if (filter === 'free') return !e.paid;
    return true;
  });

  return (
    <div className="dashboard">
      <UserTopBar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div
            className="dashboard-card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2 style={{ margin: '0 0 6px', color: '#0f172a' }}>Etkinlikler</h2>
              <p className="card-description" style={{ margin: 0 }}>
                Bu hafta {events.length} etkinlik mock olarak listeleniyor.
              </p>
            </div>
            <div className="input-search">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Hepsi</option>
                <option value="free">Ücretsiz</option>
                <option value="paid">Ücretli</option>
              </select>
            </div>
          </div>

          <div className="dashboard-grid" style={{ gap: '28px' }}>
            {loading ? (
              <div className="dashboard-card" style={{ textAlign: 'center' }}>
                <div className="card-icon">⏳</div>
                <p className="card-description">Etkinlikler yükleniyor...</p>
              </div>
            ) : (
              filtered.map((event) => (
                <div key={event.id} className="dashboard-card">
                  <div className="card-icon">🗓️</div>
                  <h3 className="card-title">{event.title}</h3>
                  <p className="card-description">Tarih: {event.date}</p>
                  <p className="card-description">Lokasyon: {event.location}</p>
                  <p className="card-description">
                    {event.paid ? `Ücretli · ${event.price} TL` : 'Ücretsiz'}
                  </p>
                  <p className="card-description">Kontenjan: {event.capacity}</p>
                </div>
              ))
            )}
          </div>

          <section className="preview-notice">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h4>Önizleme Modu</h4>
              <p>Bu sayfa mock API verileri ile çalışıyor. Canlı etkinlik takvimi eklendiğinde otomatik güncellenecek.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
