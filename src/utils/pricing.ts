import type { Karat, GoldPricesResponse } from '../types';

export interface Product {
  id?: string;
  title?: string;
  carat: string;
  weight: number;
  workmanship: number;
}

export interface GoldPriceItem {
  carat: string;
  sellPrice: number;
  buyPrice: number;
}

// دالة تحويل سعر العيار استناداً إلى عيار أساسي
export function convertCaratPrice(price: number, fromCarat: string, toCarat: string): number {
  const from = Number(fromCarat);
  const to = Number(toCarat);
  if (!from || !to) return price;
  return Math.round(((price * to) / from) * 10) / 10;
}

// ==========================================
// الدالة المعتمدة لحساب سعر القطعة (بيع وشراء)
// ==========================================
export const calculateProductPrice = (
  product: Product,
  goldPrices: GoldPriceItem[]
): { sellPrice: number; buyPrice: number } => {
  let matchingPrice = goldPrices.find((price) => price.carat === String(product.carat));

  // إذا لم يتوفر العيار لحظياً، يتم التحويل تلقائياً من عيار 21
  if (!matchingPrice) {
    const base = goldPrices.find((p) => p.carat === "21") || goldPrices[0];
    if (!base) return { sellPrice: 0, buyPrice: 0 };
    matchingPrice = {
      carat: String(product.carat),
      sellPrice: convertCaratPrice(base.sellPrice, base.carat, String(product.carat)),
      buyPrice: convertCaratPrice(base.buyPrice, base.carat, String(product.carat)),
    };
  }

  if (!matchingPrice.buyPrice && !matchingPrice.sellPrice) {
    return { sellPrice: 0, buyPrice: 0 };
  }

  // 1. سعر البيع = (سعر بيع الذهب + المصنعية والدمغة) × الوزن
  const sellPrice = Math.round((matchingPrice.sellPrice + product.workmanship) * product.weight);

  // 2. سعر الشراء = سعر شراء الذهب × الوزن
  const buyPrice = Math.round(matchingPrice.buyPrice * product.weight);

  return { sellPrice, buyPrice };
};

// تحويل أسعار البورصة الحية إلى مصفوفة متوافقة
export function getGoldPricesList(liveData?: GoldPricesResponse): GoldPriceItem[] {
  if (!liveData?.final) {
    return [
      { carat: '24', sellPrice: 7033, buyPrice: 6955 },
      { carat: '21', sellPrice: 6155, buyPrice: 6085 },
      { carat: '18', sellPrice: 5277, buyPrice: 5214 },
    ];
  }

  return (['24', '21', '18'] as Karat[]).map((k) => ({
    carat: k,
    sellPrice: liveData.final[k]?.sell ?? (k === '24' ? 7033 : k === '21' ? 6155 : 5277),
    buyPrice: liveData.final[k]?.buy ?? (k === '24' ? 6955 : k === '21' ? 6085 : 5214),
  }));
}
