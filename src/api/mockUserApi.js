// Mock API for user-side preview
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDashboardSummary = async () => {
  await delay(200);
  return {
    places: 12,
    events: 5,
    forumThreads: 48,
    cafeteriaMenu: 'Makarna, Izgara Tavuk, Çorba',
  };
};

export const getPlaces = async () => {
  await delay(250);
  return [
    {
      id: 1,
      name: 'Merkez Spor Salonu',
      type: 'Salon',
      availability: '09:00 - 22:00',
      slots: generateSlots('09:00', '22:00', [10, 14, 19]),
    },
    {
      id: 2,
      name: 'Açık Saha - A',
      type: 'Futbol',
      availability: '10:00 - 20:00',
      slots: generateSlots('10:00', '20:00', [11, 16]),
    },
    {
      id: 3,
      name: 'Yüzme Havuzu',
      type: 'Havuz',
      availability: '08:00 - 21:00',
      slots: generateSlots('08:00', '21:00', [9, 12, 18]),
    },
    {
      id: 4,
      name: 'Tenis Kortu',
      type: 'Tenis',
      availability: '10:00 - 19:00',
      slots: generateSlots('10:00', '19:00', [13]),
    },
  ];
};

export const getEvents = async () => {
  await delay(250);
  return [
    { id: 1, title: 'Basketbol Turnuvası', date: '2025-03-12', location: 'Spor Salonu', paid: false, capacity: 32, price: 0 },
    { id: 2, title: 'Koşu Kulübü', date: '2025-03-14', location: 'Stadyum', paid: false, capacity: 20, price: 0 },
    { id: 3, title: 'Tenis Workshop', date: '2025-03-16', location: 'Tenis Kortu', paid: true, capacity: 12, price: 120 },
  ];
};

export const getForumThreads = async () => {
  await delay(250);
  return [
    { id: 1, title: 'Salon rezervasyonu nasıl yapılır?', replies: 12, likes: 32 },
    { id: 2, title: 'Koşu için en iyi parkur?', replies: 8, likes: 18 },
    { id: 3, title: 'Protein mi karbonhidrat mı?', replies: 5, likes: 9 },
  ];
};

export const getCafeteriaMenu = async () => {
  await delay(200);
  return {
    today: 'Makarna, Izgara Tavuk, Çorba',
    tomorrow: 'Kuru Fasulye, Pilav, Salata',
  };
};

// Helpers
function generateSlots(start, end, busyHours = []) {
  const slots = [];
  let [sh, sm] = start.split(':').map(Number);
  const [eh] = end.split(':').map(Number);
  while (sh < eh) {
    const label = `${String(sh).padStart(2, '0')}:00`;
    slots.push({ hour: label, busy: busyHours.includes(sh) });
    sh += 1;
  }
  return slots;
}

export const getProfilePreview = async () => {
  await delay(200);
  return {
    name: 'Örnek Kullanıcı',
    email: 'ornek@hubber.app',
    phone: '+90 555 555 55 55',
    description: 'Sporu seven, kampüste aktif bir Hubber üyesi.',
    membership: 'Gold',
    avatar: '',
  };
};
