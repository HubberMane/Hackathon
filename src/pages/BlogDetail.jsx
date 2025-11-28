import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getBlog } from '../data/blogs';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const fallback = getBlog(id);
  const blog = location.state?.blog || fallback;

  if (!blog) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Bu blog bulunamadı.</h2>
        <p className="muted">Yayınlanmamış veya silinmiş olabilir.</p>
      </div>
    );
  }

  return (
    <article className="detail-card">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Blog</p>
          <h1 style={{ margin: '6px 0 4px' }}>{blog.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{blog.author} • {blog.publishedAt}</p>
        </div>
      </header>

      {blog.cover && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={blog.cover} alt={blog.title} style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      <p style={{ marginTop: '18px', lineHeight: 1.6 }}>
        {blog.body}
      </p>
    </article>
  );
};

export default BlogDetail;
