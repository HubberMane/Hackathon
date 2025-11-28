import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { getPlaces } from '../api/mockUserApi';
import UserTopBar from '../components/UserTopBar';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [openSlots, setOpenSlots] = useState({});

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const data = await getPlaces();
      setPlaces(data);
    } catch (e) {
      console.error('Places mock yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  const types = useMemo(
    () => ['all', ...new Set(places.map((p) => p.type))],
    [places]
  );

  const filtered = places.filter((p) => (filter === 'all' ? true : p.type === filter));

  const toggleSlots = (id) => {
    setOpenSlots((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="dashboard">
      <UserTopBar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: '0 0 6px', color: '#0f172a' }}>Spor Tesisleri</h2>
              <p className="card-description" style={{ margin: 0 }}>
                Şu an {places.length} tesis ve saha mock olarak listeleniyor.
              </p>
            </div>
            <div className="input-search">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? 'Tümü' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-grid" style={{ gap: '28px' }}>
            {loading ? (
              <div className="dashboard-card" style={{ textAlign: 'center' }}>
                <div className="card-icon">⏳</div>
                <p className="card-description">Yerler yükleniyor...</p>
              </div>
            ) : (
              filtered.map((place) => (
                <div key={place.id} className="dashboard-card">
                  <div className="card-icon">📌</div>
                  <h3 className="card-title">{place.name}</h3>
                  <p className="card-description">Tür: {place.type}</p>
                  <p className="card-description">Saat: {place.availability}</p>
                  <button className="btn btn--outline btn--sm" onClick={() => toggleSlots(place.id)}>
                    Saatleri {openSlots[place.id] ? 'Kapat' : 'Göster'}
                  </button>
                  {openSlots[place.id] && (
                    <div style={{ marginTop: '12px', display: 'grid', gap: '6px' }}>
                      <div className="slots-grid">
                        {place.slots?.map((s) => (
                          <span key={s.hour} className={`slot-pill ${s.busy ? 'slot-pill--busy' : 'slot-pill--free'}`}>
                            {s.hour}
                          </span>
                        ))}
                      </div>
                      <p className="card-description" style={{ margin: 0 }}>
                        Meşgul: kırmızı · Müsait: yeşil
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <section className="preview-notice">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h4>Önizleme Modu</h4>
              <p>Bu sayfa mock API verileri ile çalışıyor. Canlı yer verisi bağlandığında otomatik güncellenecek.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PlacesPage;
