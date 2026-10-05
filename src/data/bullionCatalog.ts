export interface BullionTariffItem {
  id: string;
  name: string;
  group: string; // 'سبائك تقليدية', 'سبائك بيضاوية', 'خواتم 24', 'كيلو', 'هدايا 24', 'جنيهات', 'جنيهات تعليقة', etc.
  karat: '24' | '21';
  weight: number;
  workmanship: number; // المصنعية الرسمية للجرام بالجنيه
  notes?: string;
}

export const BULLION_TARIFF_24K: BullionTariffItem[] = [
  // 1. سبائك تقليدية
  { id: 'ingot-24-1g', name: 'سبيكة 1 جرام', group: 'سبائك تقليدية', karat: '24', weight: 1, workmanship: 187 },
  { id: 'ingot-24-2.5g', name: 'سبيكة 2.5 جرام', group: 'سبائك تقليدية', karat: '24', weight: 2.5, workmanship: 112 },
  { id: 'ingot-24-5g', name: 'سبيكة 5 جرام', group: 'سبائك تقليدية', karat: '24', weight: 5, workmanship: 87 },
  { id: 'ingot-24-10g', name: 'سبيكة 10 جرام', group: 'سبائك تقليدية', karat: '24', weight: 10, workmanship: 84 },
  { id: 'ingot-24-20g', name: 'سبيكة 20 جرام', group: 'سبائك تقليدية', karat: '24', weight: 20, workmanship: 82 },
  { id: 'ingot-24-ounce', name: 'سبيكة 31.10 جرام (أونصة)', group: 'سبائك تقليدية', karat: '24', weight: 31.10, workmanship: 81 },
  { id: 'ingot-24-50g', name: 'سبيكة 50 جرام', group: 'سبائك تقليدية', karat: '24', weight: 50, workmanship: 79 },
  { id: 'ingot-24-100g', name: 'سبيكة 100 جرام', group: 'سبائك تقليدية', karat: '24', weight: 100, workmanship: 77 },
  { id: 'ingot-24-116.65g', name: 'سبيكة 116.65 جرام', group: 'سبائك تقليدية', karat: '24', weight: 116.65, workmanship: 67 },

  // 2. سبائك بيضاوية
  { id: 'oval-24-5g', name: 'سبيكة بيضاوية 5 جرام', group: 'سبائك بيضاوية', karat: '24', weight: 5, workmanship: 112 },
  { id: 'oval-24-10g', name: 'سبيكة بيضاوية 10 جرام', group: 'سبائك بيضاوية', karat: '24', weight: 10, workmanship: 102 },
  { id: 'oval-24-15.9g', name: 'سبيكة بيضاوية 15.9 جرام', group: 'سبائك بيضاوية', karat: '24', weight: 15.9, workmanship: 94 },
  { id: 'oval-24-31.1g', name: 'سبيكة بيضاوية 31.10 جرام', group: 'سبائك بيضاوية', karat: '24', weight: 31.10, workmanship: 92 },

  // 3. خواتم عيار 24
  { id: 'ring-24-1g', name: 'خاتم عيار 24 (1 جرام)', group: 'خواتم عيار 24', karat: '24', weight: 1, workmanship: 142 },
  { id: 'ring-24-2.5g', name: 'خاتم عيار 24 (2.5 جرام)', group: 'خواتم عيار 24', karat: '24', weight: 2.5, workmanship: 132 },
  { id: 'ring-24-5g', name: 'خاتم عيار 24 (5 جرام)', group: 'خواتم عيار 24', karat: '24', weight: 5, workmanship: 122 },
  { id: 'ring-24-10g', name: 'خاتم عيار 24 (10 جرام)', group: 'خواتم عيار 24', karat: '24', weight: 10, workmanship: 117 },
  { id: 'ring-24-31.1g', name: 'خاتم عيار 24 (31.1 جرام)', group: 'خواتم عيار 24', karat: '24', weight: 31.1, workmanship: 113 },

  // 4. إسوارة عيار 24
  { id: 'bracelet-24-15.55g', name: 'إسوارة عيار 24 (15.55 جرام)', group: 'أساور عيار 24', karat: '24', weight: 15.55, workmanship: 127 },

  // 5. كيلو 999.9 & 995
  { id: 'kilo-250g', name: 'ربع كيلو 250 جم (999.9 / 995)', group: 'كيلو 999.9 & 995', karat: '24', weight: 250, workmanship: 35 },
  { id: 'kilo-500g', name: 'نصف كيلو 500 جم (999.9 / 995)', group: 'كيلو 999.9 & 995', karat: '24', weight: 500, workmanship: 32.5 },
  { id: 'kilo-1000g', name: 'سبيكة 1 كيلو 1000 جم (999.9 / 995)', group: 'كيلو 999.9 & 995', karat: '24', weight: 1000, workmanship: 31.5 },

  // 6. كيلو دائري
  { id: 'kilo-round-250g', name: 'ربع كيلو دائري (250 جم)', group: 'كيلو دائري', karat: '24', weight: 250, workmanship: 36 },
  { id: 'kilo-round-500g', name: 'نصف كيلو دائري (500 جم)', group: 'كيلو دائري', karat: '24', weight: 500, workmanship: 35 },
  { id: 'kilo-round-1000g', name: '1 كيلو دائري (1000 جم)', group: 'كيلو دائري', karat: '24', weight: 1000, workmanship: 34 },

  // 7. هدايا 2.5 جرام (ملعقة، حصان، بطة، مشط، عربة أطفال، ببرونة، نيتينا)
  { id: 'gift-24-2.5g', name: 'هدايا 2.5 جم (ملعقة، حصان، بطة، مشط، عربة، ببرونة)', group: 'سبائك هدايا', karat: '24', weight: 2.5, workmanship: 127 },

  // 8. هدايا 5 جرام
  { id: 'gift-24-5g', name: 'هدايا 5 جم (ملعقة، حصان، بطة، مشط، عربة، ببرونة)', group: 'سبائك هدايا', karat: '24', weight: 5, workmanship: 117 },

  // 9. هدايا 10 جرام
  { id: 'gift-24-10g', name: 'هدايا 10 جم (ملعقة ذهب)', group: 'سبائك هدايا', karat: '24', weight: 10, workmanship: 102 },

  // 10. سبائك ديزني / مارفل
  { id: 'disney-24-2.5g', name: 'سبيكة ديزني / مارفل 2.5 جرام', group: 'سبائك ديزني ومارفل', karat: '24', weight: 2.5, workmanship: 112 },
  { id: 'disney-24-5g', name: 'سبيكة ديزني / مارفل 5 جرام', group: 'سبائك ديزني ومارفل', karat: '24', weight: 5, workmanship: 87 },
  { id: 'disney-24-10g', name: 'سبيكة ديزني / مارفل 10 جرام', group: 'سبائك ديزني ومارفل', karat: '24', weight: 10, workmanship: 84 },

  // 11. الأميرات
  { id: 'princess-24-5g', name: 'سبيكة الأميرات 5 جرام', group: 'سبائك الأميرات', karat: '24', weight: 5, workmanship: 112 },
  { id: 'princess-24-10g', name: 'سبيكة الأميرات 10 جرام', group: 'سبائك الأميرات', karat: '24', weight: 10, workmanship: 102 },
  { id: 'princess-24-15.9g', name: 'سبيكة الأميرات 15.9 جرام', group: 'سبائك الأميرات', karat: '24', weight: 15.9, workmanship: 94 },
  { id: 'princess-24-31.1g', name: 'سبيكة الأميرات 31.10 جرام', group: 'سبائك الأميرات', karat: '24', weight: 31.10, workmanship: 92 },

  // 12. قلب تعليقة
  { id: 'heart-pendant-24-10.35g', name: 'قلب تعليقة عيار 24 (10.35 جرام)', group: 'تعليقات عيار 24', karat: '24', weight: 10.35, workmanship: 84 },

  // 13. الخرائط
  { id: 'map-24-31.1g', name: 'سبيكة الخرائط 31.1 جم (خريطة مصر / السعودية)', group: 'سبائك الخرائط', karat: '24', weight: 31.1, workmanship: 77 },
];

export const BULLION_TARIFF_21K: BullionTariffItem[] = [
  // 1. الجنيهات
  { id: 'pound-quarter', name: 'ربع جنيه ذهب (2 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 2, workmanship: 87 },
  { id: 'pound-half', name: 'نصف جنيه ذهب (4 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 4, workmanship: 82 },
  { id: 'pound-full', name: 'جنيه ذهب كامل (8 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 8, workmanship: 77 },
  { id: 'pound-2.5', name: '2.5 جنيه ذهب (20 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 20, workmanship: 68 },
  { id: 'pound-5', name: '5 جنيه ذهب (40 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 40, workmanship: 64 },
  { id: 'pound-10', name: '10 جنيه ذهب (80 جرام)', group: 'جنيهات عيار 21', karat: '21', weight: 80, workmanship: 62 },

  // 2. جنيهات تعليقة
  { id: 'pendant-quarter-pound', name: 'ربع جنيه تعليقة (2 جرام)', group: 'جنيهات تعليقة', karat: '21', weight: 2, workmanship: 112 },
  { id: 'pendant-half-pound', name: 'نصف جنيه تعليقة (4 جرام)', group: 'جنيهات تعليقة', karat: '21', weight: 4, workmanship: 107 },
  { id: 'pendant-full-pound', name: 'جنيه كامل تعليقة (8 جرام)', group: 'جنيهات تعليقة', karat: '21', weight: 8, workmanship: 102 },

  // 3. جنيهات ديزني / مارفل
  { id: 'disney-pound-quarter', name: 'ربع جنيه ديزني / مارفل', group: 'جنيهات ديزني ومارفل', karat: '21', weight: 2, workmanship: 87 },
  { id: 'disney-pound-half', name: 'نصف جنيه ديزني / مارفل', group: 'جنيهات ديزني ومارفل', karat: '21', weight: 4, workmanship: 82 },
  { id: 'disney-pound-full', name: 'جنيه ديزني / مارفل كامل', group: 'جنيهات ديزني ومارفل', karat: '21', weight: 8, workmanship: 77 },
  { id: 'disney-pound-5', name: '5 جنيه ديزني / مارفل (40 جم)', group: 'جنيهات ديزني ومارفل', karat: '21', weight: 40, workmanship: 64 },

  // 4. جنيهات تعليقة مارفل
  { id: 'marvel-pendant-quarter', name: 'ربع جنيه تعليقة مارفل (2 جم)', group: 'جنيهات تعليقة مارفل', karat: '21', weight: 2, workmanship: 112 },
  { id: 'marvel-pendant-half', name: 'نصف جنيه تعليقة مارفل (4 جم)', group: 'جنيهات تعليقة مارفل', karat: '21', weight: 4, workmanship: 107 },
  { id: 'marvel-pendant-full', name: 'جنيه تعليقة مارفل كامل (8 جم)', group: 'جنيهات تعليقة مارفل', karat: '21', weight: 8, workmanship: 102 },

  // 5. خواتم عيار 21
  { id: 'ring-21-quarter-pound', name: 'خاتم ربع جنيه (2 جم)', group: 'خواتم عيار 21', karat: '21', weight: 2, workmanship: 142 },
  { id: 'ring-21-half-pound', name: 'خاتم نصف جنيه (4 جم)', group: 'خواتم عيار 21', karat: '21', weight: 4, workmanship: 132 },

  // 6. إسورة عيار 21
  { id: 'bangle-21-plain-30g', name: 'إسورة 30 جرام سادة', group: 'أساور عيار 21', karat: '21', weight: 30, workmanship: 127 },
  { id: 'bangle-21-braided-30g', name: 'إسورة 30 جرام مجدول', group: 'أساور عيار 21', karat: '21', weight: 30, workmanship: 132 },

  // 7. إطارات (فريمات)
  { id: 'frame-21', name: 'إطارات وفريمات جنيهات عيار 21 (لكل جرام)', group: 'إطارات وسلاسل', karat: '21', weight: 1, workmanship: 97, notes: 'المصنعية تحسب لكل جرام' },

  // 8. سلسلة
  { id: 'chain-21', name: 'سلسلة ذهب عيار 21 (لكل جرام)', group: 'إطارات وسلاسل', karat: '21', weight: 1, workmanship: 157, notes: 'المصنعية تحسب لكل جرام' },
];

export const ALL_BULLION_TARIFF: BullionTariffItem[] = [
  ...BULLION_TARIFF_24K,
  ...BULLION_TARIFF_21K,
];
