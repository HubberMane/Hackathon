import React, { useEffect, useState } from 'react';
import { fetchFacilities } from '../services/api';

const Sports = ({ onReserveClick }) => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchFacilities();
      if (ignore) return;

      if (fetchError) {
        setError('Spor tesisi listesi alŽñnamadŽñ. Backend baYlantŽñnŽñ kontrol edin.');
        setFacilities([]);
      } else {
        setFacilities(Array.isArray(data) ? data : data?.facilities || []);
        setError('');
      }
      setLoading(false);
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSlotClick = (facility, slot) => {
    if (!onReserveClick || slot?.isBooked) return;
    onReserveClick(facility, slot.time);
  };

  return (
    <div className="facilities-container">
      <h2 style={{ borderLeft: '5px solid #4f46e5', paddingLeft: '15px', marginBottom: '25px' }}>
        Antalya Spor Tesisleri & Rezervasyon
      </h2>

      {error && (
        <div className="detail-card" style={{ background: '#fff5f5', border: '1px solid #fecdd3' }}>
          <p style={{ margin: 0, color: '#b91c1c' }}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>Tesisler yÇükleniyor...</h3>
        </div>
      ) : !facilities.length ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>Tesis bulunamadŽñ</h3>
          <p className="muted">Backend baYlantŽñ geldikten sonra burada tesis listesi gÇûrÇ¬necek.</p>
        </div>
      ) : (
        facilities.map((facility) => (
          <div key={facility.id} className="facility-card">
            <div className="facility-image">
              {facility.image ? (
                <img src={facility.image} alt={facility.name} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#f3f4f6', display: 'grid', placeItems: 'center' }}>
                  <span className="muted">GÇôrsel yok</span>
                </div>
              )}
            </div>
            <div className="facility-info">
              <div className="facility-header">
                <div>
                  <h3 style={{ margin: 10, fontSize: '1.3rem' }}>{facility.name}</h3>
                  {facility.hours && <span className="hours-badge"> {facility.hours}</span>}
                </div>
                {facility.type && <span className="facility-tag">{facility.type}</span>}
              </div>

              <div className="slots-grid">
                {(facility.slots || []).length ? (
                  facility.slots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSlotClick(facility, slot)}
                      className={`time-slot ${slot.isBooked ? 'booked' : 'available'}`}
                      disabled={slot.isBooked}
                      style={{ cursor: slot.isBooked ? 'not-allowed' : 'pointer' }}
                    >
                      <span>{slot.time}</span>
                      <small className="slot-status">{slot.isBooked ? 'Dolu' : 'MÇ¬sait'}</small>
                    </button>
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>
                    Slot bilgisi henÇ¬z gelmedi.
                  </div>
                )}
              </div>

              {facility.appointmentUrl && (
                <a
                  className="external-reserve-btn"
                  href={facility.appointmentUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Randevu sayfasŽñna git
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Sports;
