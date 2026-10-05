export type ScreenTab = 'home' | 'rates' | 'about';

export type Karat = '24' | '21' | '18';

export type SourceRow = {
  name: string;
  url: string;
  ok: boolean;
  buy: Partial<Record<Karat, number>>;
  sell: Partial<Record<Karat, number>>;
};

export type TelegramPost = {
  time: string;
  ounce: number | null;
  buy21: number;
  sell21: number | null;
};

export type GoldPricesResponse = {
  updatedAt: string;
  ounce: number | null;
  saghaUsd: number | null;
  screen: Partial<Record<Karat, number>>;
  final: Record<Karat, { buy: number | null; sell: number | null; sellFromScreen: boolean }>;
  sources: SourceRow[];
  history: TelegramPost[];
  isFallback?: boolean;
};

export interface JewelryItem {
  id: string;
  title: string;
  category: 'sets' | 'bangles' | 'necklaces' | 'rings' | 'bullion';
  karat: 18 | 21 | 24;
  weightGrams: number;
  workmanship: number; // المصنعية والدمغة لكل جرام بالجنيه
  weightRange?: string;
  description: string;
  image: string;
  tag: string;
  badge?: string;
  details: string[];
  isFeatured?: boolean;
}

export interface GoldRate {
  karat: number;
  name: string;
  purity: string;
  pricePerGram: number;
  highlight: string;
  liquidity: string;
  usage: string;
  featureTitle: string;
  featureValue: string;
  subFeatureTitle: string;
  subFeatureValue: string;
  isPopular?: boolean;
}

export interface BullionItem {
  id: string;
  name: string;
  weightDescription: string;
  subtext: string;
  karat: number;
  price: number;
  icon: string;
}

export interface AppointmentBooking {
  fullName: string;
  phone: string;
  date: string;
  timeSlot: string;
  purpose: string;
  notes?: string;
  bookingCode?: string;
}
