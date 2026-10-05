import React, { useState } from 'react';
import { ALL_BULLION_TARIFF, BullionTariffItem } from '../data/bullionCatalog';
import { calculateProductPrice, GoldPriceItem, getGoldPricesList } from '../utils/pricing';
import { BRAND_INFO } from '../data/mockData';

interface BullionTariffSectionProps {
  goldPrices?: GoldPriceItem[];
  onSelectPreset?: (item: BullionTariffItem) => void;
}

export const BullionTariffSection: React.FC<BullionTariffSectionProps> = ({
  goldPrices = getGoldPricesList(),
  onSelectPreset,
}) => {
  const [selectedKarat, setSelectedKarat] = useState<'all' | '24' | '21'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const groups = [
    'all',
    'سبائك تقليدية',
    'سبائك بيضاوية',
    'جنيهات عيار 21',
    'جنيهات تعليقة',
    'كيلو 999.9 & 995',
    'سبائك هدايا',
    'سبائك ديزني ومارفل',
    'سبائك الأميرات',
    'خواتم عيار 24',
    'خواتم عيار 21',
    'أساور عيار 24',
    'أساور عيار 21',
    'سبائك الخرائط',
    'تعليقات عيار 24',
    'إطارات وسلاسل',
  ];

  const filteredItems = ALL_BULLION_TARIFF.filter((item) => {
    const matchesKarat = selectedKarat === 'all' || item.karat === selectedKarat;
    const matchesGroup = selectedGroup === 'all' || item.group === selectedGroup;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKarat && matchesGroup && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-[#cfbe9b]/50 my-10">
      {/* Title & Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#e6dbc8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faf8f5] text-[#b89342] font-sans-lux text-xs uppercase font-bold mb-2 border border-[#cfbe9b]/40">
            <span className="material-symbols-outlined text-sm">savings</span>
            <span>التسعيرة الرسمية المعتمدة للمصنعيات</span>
          </div>
          <h2 className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
            جدول سبائك وجنيهات الصاغة (21 فئة معتمدة)
          </h2>
          <p className="font-serif-lux text-xs sm:text-sm text-[#433e36] mt-2 max-w-2xl leading-relaxed">
            تسعير فوري ومباشر لـ 13 فئة من سبائك وخواتم عيار 24، و8 فئات من جنيهات ومشغولات عيار 21، محسوبة تلقائياً بدقة بالغة وفق معادلة: <code className="bg-[#faf8f5] px-1.5 py-0.5 rounded text-[#b89342] font-sans font-bold">(سعر الذهب + المصنعية) × الوزن</code>.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="text-xs font-sans-lux text-[#7f7667]">
            ({filteredItems.length} صنف مسعر لحظياً)
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Karat Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedKarat('all')}
              className={`px-4 py-2 rounded-lg text-xs font-sans-lux font-bold transition-all whitespace-nowrap ${
                selectedKarat === 'all'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da] border border-[#e6dbc8]'
              }`}
            >
              جميع الفئات (21 فئة)
            </button>
            <button
              onClick={() => setSelectedKarat('24')}
              className={`px-4 py-2 rounded-lg text-xs font-sans-lux font-bold transition-all whitespace-nowrap ${
                selectedKarat === '24'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da] border border-[#e6dbc8]'
              }`}
            >
              فئات عيار 24 (13 فئة)
            </button>
            <button
              onClick={() => setSelectedKarat('21')}
              className={`px-4 py-2 rounded-lg text-xs font-sans-lux font-bold transition-all whitespace-nowrap ${
                selectedKarat === '21'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da] border border-[#e6dbc8]'
              }`}
            >
              فئات عيار 21 (8 فئات)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#7f7667]">
              <span className="material-symbols-outlined text-base">search</span>
            </span>
            <input
              type="text"
              placeholder="ابحث بالاسم أو الفئة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 bg-[#faf8f5] border border-[#cfbe9b] rounded-lg text-xs text-[#1a1a1a] focus:outline-none focus:border-[#b89342]"
            />
          </div>
        </div>

        {/* Group Sub-pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px] font-sans-lux">
          <span className="text-[#7f7667] font-semibold whitespace-nowrap ml-1">التصنيف:</span>
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedGroup === grp
                  ? 'bg-[#1a1a1a] text-white font-bold'
                  : 'bg-[#faf8f5] hover:bg-[#ede6da] text-[#433e36] border border-[#e6dbc8]/60'
              }`}
            >
              {grp === 'all' ? 'الكل' : grp}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Bullion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const { sellPrice, buyPrice } = calculateProductPrice(
            {
              carat: item.karat,
              weight: item.weight,
              workmanship: item.workmanship,
            },
            goldPrices
          );

          const whatsappMessage = encodeURIComponent(
            `مرحباً محل مجوهرات الزهرة (إدارة الخواجة بيمن ابراهيم)، أود حجز وتثبيت سعر:\n` +
              `• الفئة: ${item.name} (${item.group})\n` +
              `• العيار: عيار ${item.karat}\n` +
              `• الوزن: ${item.weight} جرام\n` +
              `• المصنعية الرسمية: ${item.workmanship} ج.م / جم\n` +
              `• إجمالي سعر الاقتناء المباشر: ${sellPrice.toLocaleString('ar-EG')} جنيه مصري\n` +
              `• القيمة الاستردادية للذهب الصافي: ${buyPrice.toLocaleString('ar-EG')} ج.م`
          );

          return (
            <div
              key={item.id}
              className="bg-[#faf8f5] rounded-xl p-4 border border-[#e6dbc8] hover:border-[#b89342] transition-all flex flex-col justify-between shadow-sm hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans-lux font-bold text-[#8c6b23] bg-[#f5ebd7] px-2 py-0.5 rounded">
                    {item.group}
                  </span>
                  <span
                    className={`text-[10px] font-sans-lux font-bold px-2 py-0.5 rounded text-white ${
                      item.karat === '24' ? 'bg-[#b89342]' : 'bg-[#a27a36]'
                    }`}
                  >
                    عيار {item.karat}
                  </span>
                </div>

                <h4 className="font-amiri text-lg font-bold text-[#1a1a1a] mb-1 group-hover:text-[#b89342] transition-colors">
                  {item.name}
                </h4>

                <div className="flex items-center gap-3 text-xs font-sans-lux text-[#433e36] mb-3">
                  <span>
                    الوزن:{' '}
                    <strong className="text-[#1a1a1a] font-sans font-bold">
                      {item.weight} جم
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    المصنعية:{' '}
                    <strong className="text-[#b89342] font-sans font-bold">
                      {item.workmanship} ج/جم
                    </strong>
                  </span>
                </div>

                {/* Price Matrix */}
                <div className="bg-white p-2.5 rounded-lg border border-[#e6dbc8]/80 mb-3 text-xs font-sans-lux space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7f7667]">سعر الشراء بالمصنعية:</span>
                    <span className="font-bold text-[#b89342] text-sm font-sans">
                      {sellPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#e6dbc8]/50 text-[11px]">
                    <span className="text-[#7f7667]">قيمة الذهب الصافي:</span>
                    <span className="font-bold text-emerald-800 font-sans">
                      {buyPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                {onSelectPreset && (
                  <button
                    type="button"
                    onClick={() => onSelectPreset(item)}
                    className="flex-1 py-1.5 bg-white hover:bg-[#ede6da] text-[#1a1a1a] text-xs font-sans-lux font-bold rounded border border-[#cfbe9b] transition-colors"
                  >
                    احتساب بالحاسبة
                  </button>
                )}
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-[#b89342] hover:bg-[#8c6b23] text-white py-1.5 px-3 rounded text-xs font-sans-lux font-bold transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>حجز عبر واتساب</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
