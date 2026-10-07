/**
 * Verified category names and features from the hotel's official room pages.
 * Photograph IDs refer to the audited original-image manifest.
 * Guest capacities and rates are intentionally absent: the source does not
 * establish them, and its Deluxe card's “4 Bed rooms” value is ambiguous.
 */
export const rooms = [
  {
    slug: 'agung-view',
    title: 'Suite Agung View',
    tagline: 'A living room, a terrace, and a wider view.',
    description: 'A spacious one-bedroom suite overlooking the Agung pool, with a living room and terraces opening towards Mount Agung and South Bali Bay.',
    heroId: 98,
    photoIds: [98, 97, 99, 96],
    features: ['One bedroom', 'Living room', 'Terraces', 'Mount Agung and South Bali Bay views', 'Overlooks the Agung pool', 'Air conditioning'],
    sourceUrl: 'https://suryashantivilla.com/untitled-2/agung-view',
  },
  {
    slug: 'agung-pool-view',
    title: 'Suite Agung Pool View',
    tagline: 'A few steps from the water.',
    description: 'A spacious one-bedroom suite with a semi-open bathroom and direct access to the Agung pool and leisure lounge.',
    heroId: 101,
    photoIds: [101, 100, 103, 104, 102],
    features: ['One bedroom', 'Semi-open bathroom', 'Direct access to the Agung pool', 'Access to the leisure lounge', 'Air conditioning'],
    sourceUrl: 'https://suryashantivilla.com/untitled-2/pool-access',
  },
  {
    slug: 'deluxe-valley-view',
    title: 'Deluxe Room Valley View',
    tagline: 'Open your doors to the valley.',
    description: 'A spacious room overlooking the valley pool, with a king-size bed or twin beds, a sofa bed, a bathtub and shower, and a terrace or balcony with views towards South Bali.',
    heroId: 105,
    photoIds: [105, 106, 3, 107],
    features: ['King-size bed or twin beds', 'Sofa bed', 'Bathtub and shower', 'Terrace or balcony', 'Valley pool and South Bali views', 'Air conditioning'],
    sourceUrl: 'https://suryashantivilla.com/untitled-2/deluxe-room',
  },
  {
    slug: 'mezzanine-family-villa',
    title: 'Mezzanine Family Villa',
    tagline: 'Two levels. A little more room to be together.',
    description: 'A two-storey villa overlooking the valley pool, with two bedrooms and a generous semi-open bathroom. A welcoming choice for a family stay in Sidemen.',
    heroId: 111,
    photoIds: [111, 108, 109, 110],
    features: ['Two bedrooms', 'Two-storey villa', 'Large semi-open bathroom', 'Overlooks the valley pool', 'Air conditioning'],
    sourceUrl: 'https://suryashantivilla.com/untitled-2/mezzanine',
  },
  {
    slug: 'joglo-saraswati',
    title: 'Joglo Saraswati',
    tagline: 'A wooden house beside the river.',
    description: 'A traditional wooden house beside the river and spa, with one bedroom, a spacious open bathroom and an intimate connection to Sidemen’s natural surroundings.',
    heroId: 112,
    photoIds: [112, 113, 114, 115],
    features: ['One bedroom', 'Traditional wooden house', 'Spacious open bathroom', 'Located beside the river and spa', 'Air conditioning'],
    sourceUrl: 'https://suryashantivilla.com/untitled-2/joglo',
  },
];
