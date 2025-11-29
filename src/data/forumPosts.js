const USER_POSTS_KEY = 'userForumPosts';

const baseForumPosts = [
  {
    id: 1,
    title: 'Bilgisayar Müh. 1. Sınıf Kaynak Önerisi',
    excerpt:
      'Arkadaşlar merhaba, C programlama için hangi kaynakları önerirsiniz? YouTube kanalı veya kitap tavsiyesi olan var mı?',
    author: 'Ahmet Y.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet',
    date: '2 saat önce',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
    tags: ['soru', 'yazılım'],
    upvotes: 24,
    comments: 12,
  },
  {
    id: 2,
    title: 'Kayıp Kedi İlanı - Mühendislik Fakültesi',
    excerpt:
      'Turuncu sarman kedimizi fakülte önünde kaybettik. Görenlerin acil iletişime geçmesini rica ederim. Tasma mavi renkte.',
    author: 'Ayşe K.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse',
    date: '5 saat önce',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80',
    tags: ['kayıp', 'acil'],
    upvotes: 156,
    comments: 4,
  },
  {
    id: 3,
    title: 'Bahar Şenliği Konserleri Hakkında Düşünceler',
    excerpt:
      'Bu seneki lineup hakkında ne düşünüyorsunuz? Bence geçen seneye göre biraz sönük kalmış gibi.',
    author: 'Mehmet T.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet',
    date: '1 gün önce',
    image: 'https://images.unsplash.com/photo-1459749411177-260f11470c25?w=500&q=80',
    tags: ['etkinlik', 'tartışma'],
    upvotes: 45,
    comments: 89,
  },
  {
    id: 4,
    title: 'Yemekhane Zamları',
    excerpt:
      'Gelecek aydan itibaren yemek ücretlerine %20 zam geleceği söyleniyor. Bu konuda bilgisi olan var mı?',
    author: 'Zeynep B.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
    date: '2 gün önce',
    image: null,
    tags: ['duyuru', 'yemekhane'],
    upvotes: 310,
    comments: 102,
  },
];

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value) || fallback;
  } catch {
    return fallback;
  }
};

export const loadUserPosts = () => {
  if (!isBrowser) return [];
  const stored = localStorage.getItem(USER_POSTS_KEY);
  return stored ? safeParse(stored, []) : [];
};

export const saveUserPosts = (posts) => {
  if (!isBrowser) return;
  localStorage.setItem(USER_POSTS_KEY, JSON.stringify(posts));
};

export const addUserPost = (post) => {
  const next = [post, ...loadUserPosts()];
  saveUserPosts(next);
  return next;
};

export const getAllForumPosts = () => [...loadUserPosts(), ...baseForumPosts];

export const getForumPost = (id) =>
  getAllForumPosts().find((post) => String(post.id) === String(id));

export { baseForumPosts as forumPosts };
