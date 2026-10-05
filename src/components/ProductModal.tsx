import React from 'react';
import { JewelryItem } from '../types';
import { BRAND_INFO } from '../data/mockData';
import { calculateProductPrice, GoldPriceItem, getGoldPricesList } from '../utils/pricing';

interface ProductModalProps {
  item: JewelryItem | null;
  goldPrices?: GoldPriceItem[];
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  goldPrices = getGoldPricesList(),
  onClose,
}) => {
  if (!item) return null;

  // استخدام المعادلة الرسمية المعتمدة
  const { sellPrice, buyPrice } = calculateProductPrice(
    {
      carat: String(item.karat),
      weight: item.weightGrams,
      workmanship: item.workmanship || 150,
    },
    goldPrices
  );

  const matchingGold = goldPrices.find((p) => p.carat === String(item.karat)) || goldPrices[1];

  const whatsappMessage = encodeURIComponent(
    `مرحباً مجوهرات الزهرة (إدارة الخواجة بيمن ابراهيم)، أود الاستفسار ومعاينة قطعة:\n` +
      `• القطعة: ${item.title}\n` +
      `• العيار: عيار ${item.karat}\n` +
      `• الوزن: ${item.weightGrams} جم\n` +
      `• سعر الاقتناء التقديري: ${sellPrice.toLocaleString('ar-EG')} ج.م\n` +
      `• القيمة الاستردادية الحالية للذهب: ${buyPrice.toLocaleString('ar-EG')} ج.م`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#faf7f2] rounded-2xl overflow-hidden shadow-2xl border border-[#cfbe9b] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1a1a1a] shadow-md flex items-center justify-center transition-all cursor-pointer"
          aria-label="إغلاق"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Image Showcase */}
        <div className="md:w-1/2 relative bg-[#f4efe7] flex items-center justify-center p-6 border-b md:border-b-0 md:border-l border-[#cfbe9b]/40">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-inner group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-[#b89342] text-white px-3 py-1 rounded text-xs font-sans-lux font-bold shadow-sm">
              {item.badge || `عيار ${item.karat}`}
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-sans-lux font-bold text-[#b89342]">
              {item.tag}
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-lux text-[#8c6b23] uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span>مقتنيات صاغة الزهرة الملكية</span>
            </div>

            <h3 className="font-amiri text-2xl font-bold text-[#1a1a1a] mb-2">
              {item.title}
            </h3>

            <p className="font-serif-lux text-sm text-[#433e36] mb-4 leading-relaxed">
              {item.description}
            </p>

            {/* Spec & Pricing Grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-[#faf8f5] border border-[#e6dbc8] mb-4 text-xs font-sans-lux">
              <div>
                <span className="text-[#7f7667] block">العيار المعتمد:</span>
                <span className="font-bold text-[#1a1a1a] text-sm">ذهب عيار {item.karat}</span>
              </div>
              <div>
                <span className="text-[#7f7667] block">الوزن الصافي:</span>
                <span className="font-bold text-[#b89342] text-sm font-sans">
                  {item.weightRange || `${item.weightGrams} جرام`}
                </span>
              </div>

              <div className="col-span-2 pt-2 border-t border-[#e6dbc8]/60 space-y-1.5">
                <div className="flex items-center justify-between text-[#433e36]">
                  <span>سعر بيع الجرام اليوم:</span>
                  <span className="font-bold font-sans">{matchingGold.sellPrice.toLocaleString()} ج.م</span>
                </div>
                <div className="flex items-center justify-between text-[#433e36]">
                  <span>المصنعية والدمغة الرسمية:</span>
                  <span className="font-bold font-sans">{item.workmanship} ج.م / جم</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#e6dbc8]/60">
                  <div>
                    <span className="text-[#7f7667] block text-[11px]">سعر الشراء بالمصنعية:</span>
                    <span className="font-bold text-[#b89342] text-lg font-sans">
                      {sellPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#7f7667] block text-[11px]">قيمة وزن الذهب الصافي:</span>
                    <span className="font-bold text-emerald-800 text-sm font-sans">
                      {buyPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature bullets */}
            <div className="space-y-1.5 mb-5">
              <span className="font-sans-lux text-xs font-bold text-[#1a1a1a] block">
                مواصفات القطعة والضمان:
              </span>
              {item.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-[#433e36]">
                  <span className="material-symbols-outlined text-xs text-[#b89342]">
                    verified
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-3 border-t border-[#e6dbc8]/60">
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#b89342] hover:bg-[#8c6b23] text-white py-2.5 px-4 rounded-lg font-sans-lux text-sm font-bold shadow-md transition-colors"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>حجز القطعة والاستفسار عبر واتساب</span>
            </a>

            <a
              href={`tel:${BRAND_INFO.phones[0]}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#f4efe7] hover:bg-[#ede6da] text-[#1a1a1a] py-2 px-4 rounded-lg font-sans-lux text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-base text-[#b89342]">
                call
              </span>
              <span>اتصال هاتفي مباشر ({BRAND_INFO.phones[0]})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
