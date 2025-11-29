import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createForumPost } from '../services/api';

const CreatePost = () => {
  const { isLoggedIn } = useOutletContext() || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    tags: '',
    imageUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('GÇônderi oluYturmak iÇõin lÇ¬tfen giriY yapŽñn.');
      return;
    }
    if (!form.title.trim() || !form.excerpt.trim()) return;

    setSubmitting(true);
    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      image: form.imageUrl.trim() || null,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => t.toLowerCase()),
    };

    const { error } = await createForumPost(payload);
    if (error) {
      setSubmitError('GÇônderi backend e kaydedilirken hata oluYtu.');
      setSubmitting(false);
      return;
    }

    setSubmitError('');
    setForm({ title: '', excerpt: '', tags: '', imageUrl: '' });
    setSubmitting(false);
    navigate('/forum/benim-gonderilerim', { replace: true });
  };

  return (
    <div style={{ minHeight: '70vh', padding: '24px 20px 50px' }}>
      <article className="detail-card" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '12px' }}>
        <header>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>Yeni GÇônderi </h1>
          <p className="muted" style={{ margin: 0 }}>KampÇ¬s topluluŽYu ile paylaYmak istediŽYin konuyu ekle.</p>
        </header>

        {!isLoggedIn && (
          <p className="muted" style={{ margin: '0 0 6px' }}>
            GÇônderi eklemek iÇõin giriY yapmalŽñsŽñn.
          </p>
        )}

        {submitError && (
          <div className="detail-card" style={{ background: '#fff5f5', border: '1px solid #fecdd3' }}>
            <p style={{ margin: 0, color: '#b91c1c' }}>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
          <input
            className="search-input"
            placeholder="BaYlŽñk"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            disabled={!isLoggedIn}
          />
          <textarea
            placeholder="AÇõŽñklama"
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              fontFamily: 'inherit',
            }}
            required
            disabled={!isLoggedIn}
          />
          <input
            className="search-input"
            placeholder="Etiketler (virgÇ¬l ile)"
            value={form.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            disabled={!isLoggedIn}
          />
          <input
            className="search-input"
            placeholder="GÇôrsel URL (isteŽYe baŽYlŽñ)"
            value={form.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            disabled={!isLoggedIn}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button type="submit" className="save-btn" disabled={!isLoggedIn || submitting}>
              {submitting ? 'Kaydediliyor...' : 'GÇônderi Ekle'}
            </button>
            <button
              type="button"
              className="tab-btn"
              onClick={() => navigate('/forum')}
            >
              Foruma DÇôn
            </button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default CreatePost;
