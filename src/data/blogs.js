export const blogs = [
  {
    id: 1,
    title: 'Hubber’da Sporla Başlayan Günler',
    summary: 'Spor salonu rezervasyonları ve kampüs koşu rotaları hakkında kısa bir rehber.',
    cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    body:
      'Kampüs spor salonu artık çevrim içi rezervasyonla daha erişilebilir. Sabah erken saatlerde yoğunluk az, akşamları ise grup dersleri doluyor. Koşu için sahil hattı ve orman yolu rotalarını deneyin.',
    publishedAt: '2025-02-12',
    author: 'Hubber Editör',
  },
  {
    id: 2,
    title: 'Kulüp Etkinliklerinde Verimlilik',
    summary: 'Toplantı planlamak, görev dağıtmak ve duyuru yapmak için pratik tüyolar.',
    cover: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80',
    body:
      'Kulüp yönetiminde net görev dağılımı ve haftalık takvim verimliliği artırır. Slack/Discord gibi kanallarda sabit duyurular kullanın, toplantı notlarını paylaşın ve görev takibini haftalık gözden geçirin.',
    publishedAt: '2025-02-05',
    author: 'Kampüs İletişim',
  },
  {
    id: 3,
    title: 'Haftalık Yemekhane Favorileri',
    summary: 'Öğrencilerden gelen en beğenilen menülerin kısa listesi.',
    cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    body:
      'Hafta boyunca en çok oy alan menüler: Hünkar beğendi, fırın makarna, sebze çorbası ve ızgara balık. Dengeli menüler için salata barını unutmayın.',
    publishedAt: '2025-01-28',
    author: 'Yemekhane Ekibi',
  },
];

export const getBlog = (id) => blogs.find((blog) => String(blog.id) === String(id));
