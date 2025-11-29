import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getForumPost } from '../data/forumPosts';

const seededComments = [
  { id: 1, author: 'Ayşe K.', text: 'Harika bir konu, teşekkürler!', createdAt: '2 saat önce' },
  { id: 2, author: 'Mehmet T.', text: 'Ben de katılıyorum, iyi toparlanmış.', createdAt: '1 saat önce' },
];

const ForumPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const fallback = getForumPost(id);
  const post = location.state?.post || fallback;

  const baseLikes = useMemo(() => post?.upvotes || 0, [post]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(seededComments);
  const [commentCount, setCommentCount] = useState(() => post?.comments ?? seededComments.length);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Bu gönderi bulunamadı.</h2>
        <p className="muted">Silinmiş veya henüz yayınlanmamış olabilir.</p>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), author: 'Sen', text: newComment.trim(), createdAt: 'az önce' },
    ]);
    setCommentCount((prev) => prev + 1);
    setNewComment('');
  };

  return (
    <article className="detail-card">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>{post.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{post.author} • {post.date}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {post.tags?.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </header>

      {post.image && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      <p style={{ marginTop: '18px', lineHeight: 1.6 }}>
        {post.excerpt}
      </p>

      <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center', color: 'inherit' }}>
        <button
          className={`like-button ${liked ? 'is-active' : ''}`}
          onClick={() => setLiked((prev) => !prev)}
        >
          👍 Beğen ({baseLikes + (liked ? 1 : 0)})
        </button>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span aria-hidden>💬</span>
          <span>{commentCount}</span>
        </span>
      </div>

      <section style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 10px' }}>Yorumlar</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {comments.map((c) => (
            <div key={c.id} className="comment-card">
              <p style={{ margin: 0, fontWeight: 700 }}>
                {c.author} <span style={{ color: '#6b7280', fontWeight: 400 }}>• {c.createdAt}</span>
              </p>
              <p className="comment-text" style={{ margin: '4px 0 0' }}>{c.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Yorum yaz..."
            style={{
              flex: 1,
              minHeight: '70px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              padding: '10px 12px',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={handleAddComment}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #2d198e, #4f46e5)',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              minWidth: '110px',
            }}
          >
            Gönder
          </button>
        </div>
      </section>
    </article>
  );
};

export default ForumPost;
