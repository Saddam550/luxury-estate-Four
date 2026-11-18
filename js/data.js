const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

window.IMG = {
  hero: U('photo-1613490493576-7fde63acd811', 2400),
  about: U('photo-1600596542815-ffad4c1539a9', 1400),
  about2: U('photo-1600607687939-ce8a6c25118c', 1000),
  pool: U('photo-1512917774080-9991f1c4c750', 1600),
  interior: U('photo-1600585154340-be6161a56a0c', 1400),
  interior2: U('photo-1502672260266-1c1ef2d93688', 1400),
  cta: U('photo-1600566753190-17f0baa2a6c3', 2400),
  contact: U('photo-1600047509807-ba8f99d2cdde', 1400),
  city: U('photo-1486406146926-c627a92ad1ab', 1400),
  quote: U('photo-1564013799919-ab600027ffc6', 1200)
};

window.CITIES = [
  { name: 'Dubai', n: '14 homes', img: U('photo-1512453979798-5ea266f8880c', 1600) },
  { name: 'Paris', n: '6 homes', img: U('photo-1502602898657-3e91760cbb34', 1400) },
  { name: 'New York', n: '9 homes', img: U('photo-1496442226666-8d4d0e62e6e9', 1400) },
  { name: 'Miami', n: '11 homes', img: U('photo-1506966953602-c20cc11f75e3', 1200) },
  { name: 'Maldives', n: '4 homes', img: U('photo-1514282401047-d79a71a590e8', 1600) }
];

window.PROPERTIES = [
  { id: 1, title: 'The Obsidian Villa', location: 'Beverly Hills, California', price: 12500000, beds: 7, baths: 9, area: 11200, type: 'Villa', status: 'For sale', featured: true,
    img: U('photo-1613490493576-7fde63acd811'),
    gallery: [U('photo-1613490493576-7fde63acd811'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1600566753190-17f0baa2a6c3'), U('photo-1512917774080-9991f1c4c750'), U('photo-1600585154526-990dced4db0d')],
    desc: 'A gated canyon-top villa with panoramic views, an infinity pool, a private cinema and a cellar for 2,000 bottles.' },
  { id: 2, title: 'Azure Bay Penthouse', location: 'Miami Beach, Florida', price: 8900000, beds: 4, baths: 5, area: 5400, type: 'Penthouse', status: 'For sale', featured: true,
    img: U('photo-1545324418-cc1a3fa10c00'),
    gallery: [U('photo-1545324418-cc1a3fa10c00'), U('photo-1502672260266-1c1ef2d93688'), U('photo-1560448204-e02f11c3d0e2'), U('photo-1600585154526-990dced4db0d'), U('photo-1486406146926-c627a92ad1ab')],
    desc: 'A full-floor penthouse with 360° ocean views, a private elevator and a wraparound terrace.' },
  { id: 3, title: 'Maison Lumière', location: 'Paris, France', price: 15800000, beds: 6, baths: 6, area: 8300, type: 'Mansion', status: 'For sale', featured: true,
    img: U('photo-1600596542815-ffad4c1539a9'),
    gallery: [U('photo-1600596542815-ffad4c1539a9'), U('photo-1600585154340-be6161a56a0c'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1600047509807-ba8f99d2cdde'), U('photo-1502672260266-1c1ef2d93688')],
    desc: 'A restored hôtel particulier steps from the Seine, with original moulding, parquet and a discreet modern spa.' },
  { id: 4, title: 'Skyline Residence 88', location: 'Dubai Marina, UAE', price: 6200000, beds: 5, baths: 6, area: 6100, type: 'Penthouse', status: 'For sale', featured: true,
    img: U('photo-1486406146926-c627a92ad1ab'),
    gallery: [U('photo-1486406146926-c627a92ad1ab'), U('photo-1560448204-e02f11c3d0e2'), U('photo-1502672260266-1c1ef2d93688'), U('photo-1600585154526-990dced4db0d'), U('photo-1545324418-cc1a3fa10c00')],
    desc: 'Double-height living space behind floor-to-ceiling glass, with smart-home control and marina access.' },
  { id: 5, title: 'Cedar Ridge Estate', location: 'Aspen, Colorado', price: 9750000, beds: 8, baths: 10, area: 12500, type: 'Estate', status: 'For sale', featured: false,
    img: U('photo-1564013799919-ab600027ffc6'),
    gallery: [U('photo-1564013799919-ab600027ffc6'), U('photo-1600566753190-17f0baa2a6c3'), U('photo-1600047509807-ba8f99d2cdde'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1613490493576-7fde63acd811')],
    desc: 'A ski-in, ski-out mountain estate with a heated driveway, spa wing, library and fire terrace.' },
  { id: 6, title: 'Villa Serena', location: 'Lake Como, Italy', price: 18400000, beds: 9, baths: 11, area: 14000, type: 'Villa', status: 'For sale', featured: true,
    img: U('photo-1512917774080-9991f1c4c750'),
    gallery: [U('photo-1512917774080-9991f1c4c750'), U('photo-1613977257363-707ba9348227'), U('photo-1600585154340-be6161a56a0c'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1600596542815-ffad4c1539a9')],
    desc: 'A lakefront 19th-century villa with a private dock, terraced gardens and a frescoed ballroom.' },
  { id: 7, title: 'Glass House Malibu', location: 'Malibu, California', price: 22000, beds: 5, baths: 6, area: 6800, type: 'Villa', status: 'For rent', featured: false, rent: true,
    img: U('photo-1600585154340-be6161a56a0c'),
    gallery: [U('photo-1600585154340-be6161a56a0c'), U('photo-1600566753190-17f0baa2a6c3'), U('photo-1512917774080-9991f1c4c750'), U('photo-1600047509807-ba8f99d2cdde'), U('photo-1613490493576-7fde63acd811')],
    desc: 'A beachfront glass pavilion with direct sand access, an outdoor kitchen and a heated lap pool. Price per month.' },
  { id: 8, title: 'The Meridian Loft', location: 'New York, USA', price: 5400000, beds: 3, baths: 4, area: 3900, type: 'Apartment', status: 'For sale', featured: false,
    img: U('photo-1560448204-e02f11c3d0e2'),
    gallery: [U('photo-1560448204-e02f11c3d0e2'), U('photo-1502672260266-1c1ef2d93688'), U('photo-1545324418-cc1a3fa10c00'), U('photo-1600585154526-990dced4db0d'), U('photo-1486406146926-c627a92ad1ab')],
    desc: 'A corner loft in a landmark Tribeca building with 14-foot ceilings, a chef’s kitchen and Hudson River light.' },
  { id: 9, title: 'Palm Jumeirah Signature', location: 'Palm Jumeirah, Dubai', price: 14200000, beds: 7, baths: 8, area: 9600, type: 'Villa', status: 'For sale', featured: false,
    img: U('photo-1600047509807-ba8f99d2cdde'),
    gallery: [U('photo-1600047509807-ba8f99d2cdde'), U('photo-1613490493576-7fde63acd811'), U('photo-1512917774080-9991f1c4c750'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1613977257363-707ba9348227')],
    desc: 'A signature-frond villa with 90 metres of private beach, a floating cinema and staff quarters.' }
];

window.AGENTS = [
  { name: 'Alexander Hale', role: 'Founding partner', deals: '$1.2B in sales', img: U('photo-1560250097-0b93528c311a', 900) },
  { name: 'Isabella Moretti', role: 'Senior advisor', deals: '$640M in sales', img: U('photo-1573496359142-b8d87734a5a2', 900) },
  { name: 'Daniel Okafor', role: 'International director', deals: '$510M in sales', img: U('photo-1507003211169-0a1dd7228f2d', 900) },
  { name: 'Sophie Laurent', role: 'Head of private office', deals: '$430M in sales', img: U('photo-1494790108377-be9c29b29330', 900) }
];

window.POSTS = [
  { title: 'Why waterfront estates keep outperforming the market', cat: 'Market', date: 'Nov 02, 2026', img: U('photo-1512917774080-9991f1c4c750', 1000) },
  { title: 'The design details shaping ultra-luxury homes', cat: 'Design', date: 'Oct 21, 2026', img: U('photo-1600607687939-ce8a6c25118c', 1000) },
  { title: 'A buyer’s guide to purchasing property abroad', cat: 'Guide', date: 'Oct 09, 2026', img: U('photo-1486406146926-c627a92ad1ab', 1000) },
  { title: 'Smart homes: technology that disappears into the walls', cat: 'Technology', date: 'Sep 28, 2026', img: U('photo-1600566753190-17f0baa2a6c3', 1000) },
  { title: 'How off-market sales really work', cat: 'Insight', date: 'Sep 15, 2026', img: U('photo-1600596542815-ffad4c1539a9', 1000) },
  { title: 'Staging a villa for a seven-figure offer', cat: 'Selling', date: 'Sep 03, 2026', img: U('photo-1502672260266-1c1ef2d93688', 1000) }
];

window.setMedia = (id, src) => {
  const m = document.getElementById(id); if (!m) return;
  m.dataset.src = src; const i = m.querySelector('img'); if (i) i.src = src;
};
