export type PropertyType = "buy" | "rent";
export type District =
  | "seafront"
  | "old-town"
  | "gonio"
  | "new-boulevard"
  | "airport";

export interface Property {
  id: string;
  type: PropertyType;
  title: { ru: string; uk: string; en: string; ka: string; tr: string };
  district: District;
  districtLabel: { ru: string; uk: string; en: string; ka: string; tr: string };
  price: number; // USD (buy) or USD/month (rent)
  pricePerSqm?: number; // only for buy
  area: number; // m²
  rooms: number;
  floor: number;
  totalFloors: number;
  seaView: boolean;
  isNewBuild: boolean;
  isReady: boolean;
  isHot: boolean;
  image: string; // Unsplash URL
  images: string[];
  description: { ru: string; en: string };
  yield?: number; // annual % — invest properties
  slug: string;
}

export const DISTRICTS: Record<District, { ru: string; uk: string; en: string; ka: string; tr: string }> = {
  seafront: { ru: "Аллея героев", uk: "Морська набережна", en: "Seafront", ka: "საზღვაო ბულვარი", tr: "Sahil Bulvarı" },
  "old-town": { ru: "Старый город", uk: "Старе місто", en: "Old Town", ka: "ძველი ქალაქი", tr: "Eski Şehir" },
  gonio: { ru: "Гонио", uk: "Гоніо", en: "Gonio", ka: "გონიო", tr: "Gonio" },
  "new-boulevard": { ru: "Новый бульвар", uk: "Новий бульвар", en: "New Boulevard", ka: "ახალი ბულვარი", tr: "Yeni Bulvar" },
  airport: { ru: "Аэропорт", uk: "Аеропорт", en: "Airport Area", ka: "აეროპორტი", tr: "Havalimanı" },
};

export const PROPERTIES: Property[] = [
  {
    id: "1",
    slug: "seafront-studio-orbi",
    type: "buy",
    title: {
      ru: "Студия с видом на море, Orbi Beach",
      uk: "Студія з видом на море, Orbi Beach",
      en: "Sea-view studio, Orbi Beach",
      ka: "სტუდია ზღვის ხედით, Orbi Beach",
      tr: "Deniz manzaralı stüdyo, Orbi Beach",
    },
    district: "seafront",
    districtLabel: DISTRICTS["seafront"],
    price: 85000,
    pricePerSqm: 2125,
    area: 40,
    rooms: 1,
    floor: 14,
    totalFloors: 22,
    seaView: true,
    isNewBuild: true,
    isReady: true,
    isHot: true,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    ],
    description: {
      ru: "Полностью меблированная студия на 14 этаже с панорамным видом на Чёрное море. Апарт-отельный комплекс Orbi Beach Tower — развитая инфраструктура, бассейн, спа. Управляющая компания, доходность 7–9%.",
      en: "Fully furnished studio on the 14th floor with panoramic Black Sea views. Part of Orbi Beach Tower apart-hotel complex — pool, spa, full management. Yield 7–9%.",
    },
    yield: 8,
  },
  {
    id: "2",
    slug: "old-town-apartment-2br",
    type: "buy",
    title: {
      ru: "2-комнатная квартира в Старом городе",
      uk: "2-кімнатна квартира в Старому місті",
      en: "2-bedroom apartment in Old Town",
      ka: "2-ოთახიანი ბინა ძველ ქალაქში",
      tr: "Eski Şehir'de 2+1 daire",
    },
    district: "old-town",
    districtLabel: DISTRICTS["old-town"],
    price: 120000,
    pricePerSqm: 1500,
    area: 80,
    rooms: 2,
    floor: 3,
    totalFloors: 5,
    seaView: false,
    isNewBuild: false,
    isReady: true,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    description: {
      ru: "Просторная квартира в историческом центре Батуми. Высокие потолки, европейский ремонт, рядом Пьяцца Батуми. Отличный вариант для проживания или сдачи в аренду туристам.",
      en: "Spacious apartment in Batumi's historic center. High ceilings, European renovation, steps from Piazza Batumi. Great for living or tourist rental.",
    },
  },
  {
    id: "3",
    slug: "gonio-villa-3br",
    type: "buy",
    title: {
      ru: "Вилла в Гонио с видом на горы",
      uk: "Вілла в Гоніо з видом на гори",
      en: "Mountain-view villa in Gonio",
      ka: "ვილა გონიოში მთის ხედით",
      tr: "Gonio'da dağ manzaralı villa",
    },
    district: "gonio",
    districtLabel: DISTRICTS["gonio"],
    price: 220000,
    pricePerSqm: 1100,
    area: 200,
    rooms: 3,
    floor: 1,
    totalFloors: 2,
    seaView: false,
    isNewBuild: true,
    isReady: false,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
    description: {
      ru: "Двухэтажная вилла в тихом Гонио, 10 мин от центра Батуми. 3 спальни, 2 ванных комнаты, терраса с видом на горы Аджарии. Закрытый коттеджный посёлок. Сдача в 2025 году.",
      en: "Two-story villa in quiet Gonio, 10 min from central Batumi. 3 bedrooms, 2 bathrooms, mountain-view terrace. Gated community. Completion 2025.",
    },
  },
  {
    id: "4",
    slug: "seafront-1br-premium",
    type: "buy",
    title: {
      ru: "1-комнатная на первой линии моря",
      uk: "1-кімнатна на першій лінії моря",
      en: "1-bedroom first sea line apartment",
      ka: "1-ოთახიანი პირველი ხაზი",
      tr: "Birinci sıradan 1+1 daire",
    },
    district: "seafront",
    districtLabel: DISTRICTS["seafront"],
    price: 145000,
    pricePerSqm: 2900,
    area: 50,
    rooms: 1,
    floor: 8,
    totalFloors: 18,
    seaView: true,
    isNewBuild: true,
    isReady: true,
    isHot: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
    description: {
      ru: "Апартаменты на первой линии Батумского бульвара. Прямой вид на море из всех комнат. Новый дом 2023 года, готов к заселению. Популярен у арендаторов — загрузка летом 90%+.",
      en: "First-line Batumi Boulevard apartment. Direct sea view from all rooms. New 2023 building, move-in ready. Very popular with renters — 90%+ summer occupancy.",
    },
    yield: 9,
  },
  {
    id: "5",
    slug: "new-boulevard-2br-invest",
    type: "buy",
    title: {
      ru: "Инвест-апартаменты, Новый бульвар",
      uk: "Інвест-апартаменти, Новий бульвар",
      en: "Investment apartment, New Boulevard",
      ka: "საინვესტიციო აპარტამენტი",
      tr: "Yatırım amaçlı daire, Yeni Bulvar",
    },
    district: "new-boulevard",
    districtLabel: DISTRICTS["new-boulevard"],
    price: 68000,
    pricePerSqm: 1360,
    area: 50,
    rooms: 2,
    floor: 6,
    totalFloors: 14,
    seaView: false,
    isNewBuild: true,
    isReady: false,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    description: {
      ru: "Двухкомнатные апартаменты в новом жилом комплексе. Застройщик с 15-летней историей, ни одного незавершённого объекта. Рассрочка 0% на 2 года. Сдача 2026 Q1.",
      en: "Two-bedroom apartment in a new residential complex. Developer with 15-year track record, zero unfinished projects. 0% instalment plan for 2 years. Delivery Q1 2026.",
    },
    yield: 7,
  },
  {
    id: "6",
    slug: "rent-seafront-studio",
    type: "rent",
    title: {
      ru: "Студия на бульваре, посуточно и помесячно",
      uk: "Студія на бульварі, подобово і помісячно",
      en: "Boulevard studio, daily and monthly rent",
      ka: "სტუდია ბულვარზე, ყოველდღიური და თვიური",
      tr: "Bulvar stüdyosu, günlük ve aylık kiralık",
    },
    district: "seafront",
    districtLabel: DISTRICTS["seafront"],
    price: 650,
    area: 35,
    rooms: 1,
    floor: 5,
    totalFloors: 16,
    seaView: true,
    isNewBuild: true,
    isReady: true,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    ],
    description: {
      ru: "Уютная студия с видом на море. Полностью меблирована, Wi-Fi, кондиционер. Возможна аренда от 1 месяца. Идеально для цифровых кочевников и релокантов.",
      en: "Cozy sea-view studio. Fully furnished, Wi-Fi, A/C. Available from 1 month. Ideal for digital nomads and relocators.",
    },
  },
  {
    id: "7",
    slug: "rent-old-town-2br",
    type: "rent",
    title: {
      ru: "2-комнатная в Старом городе",
      uk: "2-кімнатна в Старому місті",
      en: "2-bedroom in Old Town",
      ka: "2-ოთახიანი ძველ ქალაქში",
      tr: "Eski Şehir'de 2+1 kiralık",
    },
    district: "old-town",
    districtLabel: DISTRICTS["old-town"],
    price: 850,
    area: 75,
    rooms: 2,
    floor: 2,
    totalFloors: 4,
    seaView: false,
    isNewBuild: false,
    isReady: true,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    description: {
      ru: "Просторная квартира в историческом квартале. 2 спальни, гостиная, кухня. Тихий двор, рядом рестораны и галереи. Долгосрочная аренда от 3 месяцев.",
      en: "Spacious apartment in the historic quarter. 2 bedrooms, living room, kitchen. Quiet courtyard, near restaurants and galleries. Long-term rental from 3 months.",
    },
  },
  {
    id: "8",
    slug: "rent-gonio-house",
    type: "rent",
    title: {
      ru: "Дом в Гонио для семьи",
      uk: "Будинок у Гоніо для сім'ї",
      en: "Family house in Gonio",
      ka: "სახლი გონიოში ოჯახისთვის",
      tr: "Gonio'da aile evi kiralık",
    },
    district: "gonio",
    districtLabel: DISTRICTS["gonio"],
    price: 1200,
    area: 160,
    rooms: 3,
    floor: 1,
    totalFloors: 2,
    seaView: false,
    isNewBuild: false,
    isReady: true,
    isHot: false,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    ],
    description: {
      ru: "Частный дом в спокойном Гонио. 3 спальни, 2 ванных, большой сад. Парковка, барбекю. Идеально для семей с детьми. До моря 5 минут на машине.",
      en: "Private house in quiet Gonio. 3 bedrooms, 2 bathrooms, large garden. Parking, BBQ. Ideal for families. 5 minutes drive to the sea.",
    },
  },
];

export function getPropertiesByType(type: PropertyType): Property[] {
  return PROPERTIES.filter((p) => p.type === type);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperties(type: PropertyType, limit = 3): Property[] {
  const filtered = PROPERTIES.filter((p) => p.type === type);
  const hot = filtered.filter((p) => p.isHot);
  const rest = filtered.filter((p) => !p.isHot);
  return [...hot, ...rest].slice(0, limit);
}
