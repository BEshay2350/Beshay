import React from 'react';
import { BRAND_INFO } from '../data/mockData';
import { ScreenTab } from '../types';

interface FooterProps {
  onNavigate?: (tab: ScreenTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f4efe7] border-t border-[#cfbe9b]/50 py-12 relative z-10 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <div className="font-amiri text-2xl font-bold text-[#b89342]">
              مجوهرات الزهرة
            </div>
            <div className="font-sans-lux text-xs tracking-wider font-semibold text-[#433e36]">
              إدارة بيمن ابراهيم
            </div>
            <p className="font-serif-lux text-sm text-[#433e36] max-w-md mt-2 leading-relaxed">
              إرث ملكي ممتد في صياغة النفائس النادرة، والأحجار الكريمة الاستثنائية، المكرسة لصفوة جامعي المقتنيات والعائلات العريقة في الشرق والعالم.
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-[#8c6b23] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#b89342]"></span>
              <span>الفرع الرئيسي: أسوان - كورنيش النيل (عمارة متى)</span>
            </div>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-3">
            <span className="font-sans-lux text-xs uppercase font-bold text-[#1a1a1a] tracking-wider">
              أقسام الموقع
            </span>
            <ul className="flex flex-col gap-2 font-serif-lux text-sm text-[#433e36]">
              <li
                onClick={() => onNavigate?.('home')}
                className="hover:text-[#b89342] transition-colors cursor-pointer"
              >
                الرئيسية
              </li>
              <li
                onClick={() => onNavigate?.('rates')}
                className="hover:text-[#b89342] transition-colors cursor-pointer"
              >
                بورصة أسعار الذهب والسبائك
              </li>
              <li
                onClick={() => onNavigate?.('about')}
                className="hover:text-[#b89342] transition-colors cursor-pointer"
              >
                عن المحل & الإدارة
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <span className="font-sans-lux text-xs uppercase font-bold text-[#1a1a1a] tracking-wider">
              التواصل والاستفسار
            </span>
            <div className="flex flex-col gap-2 font-serif-lux text-sm text-[#433e36]">
              <span className="text-[#1a1a1a] font-medium">أسوان - عمارة متى - كورنيش النيل</span>
              <span>مواعيد العمل: يومياً 10:00 ص - 10:30 م</span>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`tel:${BRAND_INFO.phones[0]}`}
                  className="px-3 py-1 bg-[#ede6da] hover:bg-[#b89342] hover:text-white rounded text-xs font-sans-lux font-bold transition-colors"
                >
                  {BRAND_INFO.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappDirect}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#25D366] text-white hover:bg-[#1ebd5a] rounded text-xs font-sans-lux font-bold transition-colors flex items-center gap-1"
                >
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 border-t border-[#cfbe9b]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#433e36]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مجوهرات الزهرة. إدارة الخواجة بيمن ابراهيم.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89342]"></span>
            <span className="font-sans-lux text-xs text-[#b89342] font-bold">
              عراقة وأمانة الصياغة بأسوان
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
