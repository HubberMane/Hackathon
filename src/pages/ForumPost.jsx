import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getForumPost } from '../data/forumPosts';

const ForumPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const fallback = getForumPost(id);
  const post = location.state?.post || fallback;

  if (!post) {
    return (
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '24px' }}>
        <h2>Bu gönderi bulunamadı.</h2>
        <p className="muted">Silinmiş veya henüz yayınlanmamış olabilir.</p>
      </div>
    );
  }

  return (
    <article style={{ maxWidth: '900px', margin: '40px auto', padding: '24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>{post.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{post.author} • {post.date}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {post.tags?.map((tag) => (
            <span key={tag} className="tag" style={{ padding: '6px 10px', borderRadius: '999px', background: '#eef2ff', color: '#4338ca', fontWeight: 700, textTransform: 'lowercase' }}>{tag}</span>
          ))}
        </div>
      </header>

      {post.image && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      <p style={{ marginTop: '18px', color: '#374151', lineHeight: 1.6 }}>
        {post.excerpt}
      </p>

      <div style={{ marginTop: '16px', display: 'flex', gap: '12px', color: '#4b5563' }}>
        <span>👍 {post.upvotes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </article>
  );
};

export default ForumPost;
