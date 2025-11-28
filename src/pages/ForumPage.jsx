import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { getForumThreads } from '../api/mockUserApi';
import UserTopBar from '../components/UserTopBar';

const ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [liked, setLiked] = useState(() => new Set());

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      const data = await getForumThreads();
      setThreads(data.map((t) => ({ ...t, comments: [] })));
    } catch (e) {
      console.error('Forum mock yüklenemedi:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (id) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const hasLiked = liked.has(id);
        const likes = hasLiked ? Math.max((t.likes || 1) - 1, 0) : (t.likes || 0) + 1;
        return { ...t, likes };
      })
    );

    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;
    const post = {
      id: Date.now(),
      title: newPost.title,
      replies: 0,
      likes: 0,
      comments: [],
    };
    setThreads((prev) => [post, ...prev]);
    setNewPost({ title: '', content: '' });
  };

  const handleComment = (threadId) => {
    if (!newComment.trim()) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, comments: [...t.comments, newComment], replies: (t.replies || 0) + 1 }
          : t
      )
    );
    setNewComment('');
    setSelectedThread(threadId);
  };

  return (
    <div className="dashboard">
      <UserTopBar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-card" style={{ marginBottom: '16px' }}>
            <h2 style={{ margin: '0 0 12px', color: '#0f172a' }}>Yeni Gönderi Oluştur</h2>
            <form onSubmit={handleNewPost} style={{ display: 'grid', gap: '8px' }}>
              <input
                className="form-input"
                placeholder="Başlık"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <textarea
                className="form-input"
                placeholder="İçerik (mock)"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={3}
              />
              <button className="logout-btn" type="submit">
                Gönder
              </button>
            </form>
          </div>

          <div className="dashboard-grid" style={{ gap: '28px' }}>
            {loading ? (
              <div className="dashboard-card" style={{ textAlign: 'center' }}>
                <div className="card-icon">⏳</div>
                <p className="card-description">Forum başlıkları yükleniyor...</p>
              </div>
            ) : (
              threads.map((thread) => (
                <div key={thread.id} className="dashboard-card">
                  <div className="card-icon">🗨️</div>
                  <h3 className="card-title">{thread.title}</h3>
                  <p className="card-description">
                    {thread.replies || 0} yanıt · {thread.likes || 0} beğeni
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      className={`btn btn--secondary btn--sm ${liked.has(thread.id) ? 'btn--liked' : ''}`}
                      onClick={() => handleLike(thread.id)}
                    >
                      Beğen ({thread.likes || 0})
                    </button>
                    <button
                      className="btn btn--outline btn--sm"
                      onClick={() => setSelectedThread(thread.id)}
                    >
                      Yorum Yap
                    </button>
                  </div>
                  {selectedThread === thread.id && (
                    <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
                      <textarea
                        className="form-input"
                        rows={2}
                        placeholder="Yorumunu yaz"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => handleComment(thread.id)}
                      >
                        Yorum Ekle
                      </button>
                    </div>
                  )}
                  {thread.comments && thread.comments.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <p className="card-description" style={{ marginBottom: '8px' }}>Yorumlar:</p>
                      <ul style={{ paddingLeft: '18px', margin: 0, color: '#52606d' }}>
                        {thread.comments.map((c, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{c}</li>
                        ))}
                      </ul>
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
              <p>Bu sayfa mock API verileri ile çalışıyor. Canlı forum bağlandığında gerçek post ve yorumlar gösterilecek.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ForumPage;
