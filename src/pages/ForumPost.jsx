import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchForumComments, fetchForumPost } from '../services/api';

const ForumPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);

  const baseLikes = useMemo(() => post?.upvotes || 0, [post]);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setLoading(false);
      setLoadingComments(false);
      return undefined;
    }

    let ignore = false;
    const load = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchForumPost(id);
      if (ignore) return;

      if (fetchError) {
        setError('GÇônderi getirilemedi veya silinmiY olabilir.');
      } else {
        setPost(data || null);
        setComments(data?.comments || []);
        setError('');
      }
      setLoading(false);
      setLoadingComments(false);
    };

    load();
    return () => {
      ignore = true;
    };
  }, [id, post]);

  useEffect(() => {
    if (!id) return undefined;
    let ignore = false;

    const loadComments = async () => {
      setLoadingComments(true);
      const { data, error: fetchError } = await fetchForumComments(id);
      if (ignore) return;

      if (fetchError) {
        setCommentError('Yorumlar yÇüklenemedi.');
      } else if (Array.isArray(data) || Array.isArray(data?.comments)) {
        setComments(Array.isArray(data) ? data : data.comments);
        setCommentError('');
      }
      setLoadingComments(false);
    };

    loadComments();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), author: 'Sen', text: newComment.trim(), createdAt: 'az Çônce' },
    ]);
    setNewComment('');
  };

  if (loading) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>GÇônderi yÇükleniyor...</h2>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Bu gÇônderi bulunamadŽñ.</h2>
        <p className="muted">{error || 'SilinmiY veya henÇ¬z yayŽñnlanmamŽñY olabilir.'}</p>
      </div>
    );
  }

  return (
    <article className="detail-card">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>{post.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{post.author} ƒ?½ {post.date}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {(post.tags || []).map((tag) => (
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
          §Y'? BeŽYen ({baseLikes + (liked ? 1 : 0)})
        </button>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span aria-hidden>§Y'ª</span>
          <span>{comments.length}</span>
        </span>
      </div>

      <section style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 10px' }}>Yorumlar</h3>

        {commentError && (
          <div className="detail-card" style={{ background: '#fff5f5', border: '1px solid #fecdd3', marginBottom: '10px' }}>
            <p style={{ margin: 0, color: '#b91c1c' }}>{commentError}</p>
          </div>
        )}

        {loadingComments ? (
          <p className="muted">Yorumlar yÇükleniyor...</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {comments.length ? (
              comments.map((c) => (
                <div key={c.id} className="comment-card">
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    {c.author} <span style={{ color: '#6b7280', fontWeight: 400 }}>ƒ?½ {c.createdAt}</span>
                  </p>
                  <p className="comment-text" style={{ margin: '4px 0 0' }}>{c.text}</p>
                </div>
              ))
            ) : (
              <p className="muted">HenÇ¬z yorum yapŽñlmamŽñY.</p>
            )}
          </div>
        )}

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
            GÇônder
          </button>
        </div>
      </section>
    </article>
  );
};

export default ForumPost;
