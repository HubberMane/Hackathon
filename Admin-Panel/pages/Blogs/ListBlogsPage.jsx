import React from 'react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const MOCK_BLOGS = [
  { id: 1, title: 'Hubber’da Sporla Başlayan Günler', created_at: '2025-02-12', status: 'Taslak' },
  { id: 2, title: 'Kulüp Etkinliklerinde Verimlilik', created_at: '2025-02-05', status: 'Yayında' },
  { id: 3, title: 'Haftalık Yemekhane Favorileri', created_at: '2025-01-28', status: 'Taslak' },
];

/**
 * Basit blog listeleme placeholder
 */
const ListBlogsPage = () => {
  const blogs = MOCK_BLOGS;

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Bloglar</p>
          <h1>Blog Yönetimi</h1>
          <p className="muted">Yeni içerikler ekle, taslakları gör.</p>
        </div>
        <Button>Yeni Blog Ekle</Button>
      </header>

      <div className="card">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <h3>Henüz blog bulunmuyor</h3>
            <p className="muted">İlk yazını eklemek için sağ üstten başlayabilirsin.</p>
          </div>
        ) : (
          <div className="stack">
            {blogs.map((blog) => (
              <article key={blog.id} className="list-row">
                <div>
                  <p className="list-row__title">{blog.title}</p>
                  <p className="muted">{blog.created_at}</p>
                </div>
                <Badge variant={blog.status === 'Yayında' ? 'success' : 'default'}>
                  {blog.status}
                </Badge>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBlogsPage;
