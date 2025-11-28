import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const PlaceholderPage = ({ title, icon, description, items = [], columns = [] }) => {
  const hasTable = items.length > 0 && columns.length > 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header__content">
          <div className="dashboard-logo">
            <span className="logo-icon">HB</span>
            <span className="logo-text">Hubber</span>
          </div>
          <nav className="dashboard-nav">
            <Link to="/dashboard" className="nav-link">Ana Sayfa</Link>
            <Link to="/dashboard/places" className="nav-link">Spor Tesisleri</Link>
            <Link to="/dashboard/events" className="nav-link">Etkinlikler</Link>
            <Link to="/dashboard/forum" className="nav-link">Forum</Link>
            <Link to="/dashboard/profile" className="nav-link">Profil</Link>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
            <h1 style={{ fontSize: '28px', margin: '0 0 8px' }}>{title}</h1>
            <p className="card-description" style={{ margin: '0 auto 16px', maxWidth: '560px' }}>
              {description}
            </p>
          </div>

          {hasTable && (
            <div className="dashboard-card" style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c.key} className="table__head">{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="table__row">
                      {columns.map((c) => (
                        <td key={c.key} className="table__cell">
                          {typeof c.render === 'function' ? c.render(row[c.key], row) : row[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default PlaceholderPage;
