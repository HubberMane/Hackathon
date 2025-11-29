import React from 'react';

const FACILITIES = [
  {
    id: 1,
    name: 'Akdeniz Üni. Kapalı Yüzme Havuzu',
    type: 'Yüzme',
    hours: '08:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    appointmentUrl: 'https://randevu.example.com/pool',
    slots: [
      { time: '09:00', isBooked: true },
      { time: '10:00', isBooked: false },
      { time: '11:00', isBooked: false },
      { time: '12:00', isBooked: true },
      { time: '13:00', isBooked: false },
      { time: '14:00', isBooked: true },
    ],
  },
  {
    id: 2,
    name: 'Konyaaltı Tenis Kortları',
    type: 'Tenis',
    hours: '10:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
    appointmentUrl: 'https://randevu.example.com/tenis',
    slots: [
      { time: '16:00', isBooked: false },
      { time: '17:00', isBooked: true },
      { time: '18:00', isBooked: true },
      { time: '19:00', isBooked: false },
    ],
  },
  {
    id: 3,
    name: 'Kepez Halı Saha Tesisleri',
    type: 'Futbol',
    hours: '17:00 - 02:00',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
    appointmentUrl: 'https://randevu.example.com/hali-saha',
    slots: [
      { time: '19:00', isBooked: false },
      { time: '20:00', isBooked: false },
      { time: '21:00', isBooked: true },
      { time: '22:00', isBooked: false },
    ],
  },
];

const Sports = () => {
  return (
    <div className="facilities-container">
      <h2 style={{ borderLeft: '5px solid #4f46e5', paddingLeft: '15px', marginBottom: '25px' }}>
        Antalya Spor Tesisleri & Rezervasyon
      </h2>

      {FACILITIES.map((facility) => (
        <div key={facility.id} className="facility-card">
          <div className="facility-image">
            <img src={facility.image} alt={facility.name} />
          </div>
          <div className="facility-info">
            <div className="facility-header">
              <div>
                <h3 style={{ margin: 10, fontSize: '1.3rem' }}>{facility.name}</h3>
                <span className="hours-badge"> {facility.hours}</span>
              </div>
              <span className="facility-tag">{facility.type}</span>
            </div>


            <div className="slots-grid">
              {facility.slots.map((slot, index) => (
                <div
                  key={index}
                  className={`time-slot ${slot.isBooked ? 'booked' : 'available'}`}
                >
                  <span>{slot.time}</span>
                  <small className="slot-status">{slot.isBooked ? 'Dolu' : 'Müsait'}</small>
                </div>
              ))}
            </div>

            <a
              className="external-reserve-btn"
              href={facility.appointmentUrl}
              target="_blank"
              rel="noreferrer"
            >
              Randevu sayfasına git
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sports;
