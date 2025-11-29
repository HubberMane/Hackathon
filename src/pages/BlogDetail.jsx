import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchBlog } from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(location.state?.blog || null);
  const [loading, setLoading] = useState(!location.state?.blog);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blog) return undefined;

    let ignore = false;
    const load = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchBlog(id);
      if (ignore) return;
      if (fetchError) {
        setError('Blog iÇûeriŽYi alŽñnamadŽñ.');
      } else {
        setBlog(data || null);
        setError('');
      }
      setLoading(false);
    };

    load();
    return () => {
      ignore = true;
    };
  }, [id, blog]);

  if (loading) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Blog yÇükleniyor...</h2>
      </div>
    );
  }

  if (!blog || error) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Bu blog bulunamadŽñ.</h2>
        <p className="muted">{error || 'YayŽñnlanmamŽñY veya silinmiY olabilir.'}</p>
      </div>
    );
  }

  return (
    <article className="detail-card">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Blog</p>
          <h1 style={{ margin: '6px 0 4px' }}>{blog.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{blog.author} ƒ?½ {blog.publishedAt}</p>
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
