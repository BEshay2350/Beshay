import React from 'react';
import { BRAND_INFO } from '../data/mockData';
import { ScreenTab } from '../types';

interface AboutScreenProps {
  onNavigate: (tab: ScreenTab) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-[#faf7f2] text-[#1a1a1a]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Intro matching Image 3 */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5] text-[#b89342] font-sans-lux text-xs sm:text-sm uppercase tracking-wider shadow-sm mb-3 border border-[#cfbe9b]/50">
            <span className="material-symbols-outlined text-base">stars</span>
            <span>من نحن • إرث الذهب والنيل</span>
          </div>

          <h1 className="font-amiri text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] max-w-3xl leading-tight font-bold">
            مجوهرات الزهرة <br />
            <span className="text-[#b89342] font-amiri text-2xl sm:text-3xl lg:text-4xl block mt-2">
              حكاية أصالة تتوارثها الأجيال بقلب أسوان
            </span>
          </h1>

          <div className="w-20 h-0.5 bg-[#c5a059] mx-auto my-4 opacity-70"></div>

          <p className="font-serif-lux text-base sm:text-lg text-[#433e36] max-w-2xl leading-relaxed">
            تحت إشراف وإدارة الخواجة بيمن ابراهيم، نجسد عراقة الصياغة الذهبية المتقنة بروح جنوبية دافئة وتصاميم ملكية تتناغم مع سحر النيل الخالد.
          </p>
        </div>

        {/* Logo Card and Story Details matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Logo Brand Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-[#faf8f5] p-8 shadow-xl border border-[#e6dbc8] flex flex-col items-center justify-center text-center group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#c5a059]/10 via-transparent to-[#b89342]/5 pointer-events-none"></div>

              <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-white p-4 shadow-sm mb-5 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 border border-[#e6dbc8]/60">
                <img
                  alt="شعار مجوهرات الزهرة الرسمي"
                  className="w-full h-full object-contain drop-shadow-sm"
                  src={BRAND_INFO.badgeLogoUrl}
                />
              </div>

              <div className="font-amiri text-2xl font-bold text-[#1a1a1a]">
                محل الزهرة للمجوهرات
              </div>
              <div className="font-sans-lux text-xs text-[#b89342] uppercase tracking-widest mt-1 font-semibold">
                EL ZAHRA HAUTE JOAILLERIE
              </div>
              <div className="mt-4 py-1.5 px-6 rounded-full bg-[#ede6da] text-[#433e36] font-sans-lux text-xs sm:text-sm font-bold border border-[#cfbe9b]">
                بإدارة الخواجة: بيمن ابراهيم
              </div>
            </div>
          </div>

          {/* Story & Vision Columns */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e6dbc8]">
              <div className="flex items-center gap-3 mb-3 text-[#b89342]">
                <span className="material-symbols-outlined text-3xl">water</span>
                <h2 className="font-amiri text-2xl font-bold text-[#1a1a1a]">
                  قصة الدار في قلب النيل وأسوان
                </h2>
              </div>
              <p className="font-serif-lux text-sm sm:text-base text-[#433e36] leading-relaxed">
                منذ انطلاقتنا في مدينة أسوان العريقة، اتخذنا من انسيابية النيل وهدوئه مصدراً لإلهام متجدد في فنون الصياغة. نحن لا نقدم مجرد حليّ ومصوغات، بل نخلد لحظاتكم النفيسة بأيدي نخبة من أمهر الصاغة. تتشابك في معروضاتنا تفاصيل التراث الجنوبي الأصيل مع أحدث صيحات الموضة العالمية، لنمنحكم قطعاً تزداد بريقاً وقيمة بمرور السنين.
              </p>
            </div>

            <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e6dbc8]">
              <div className="flex items-center gap-3 mb-3 text-[#b89342]">
                <span className="material-symbols-outlined text-3xl">verified</span>
                <h2 className="font-amiri text-2xl font-bold text-[#1a1a1a]">
                  رؤية الخواجة بيمن ابراهيم
                </h2>
              </div>
              <p className="font-serif-lux text-sm sm:text-base text-[#433e36] leading-relaxed">
                يقود الخواجة بيمن ابراهيم الدار بفلسفة راسخة جوهرها الأمانة الصارمة ودقة العيار والنقاء المضمون. نحرص كل الحرص على انتقاء أدق التفاصيل في الأوزان والأحجار الكريمة والمشغولات العصرية التي تتلألأ في حفلات الزفاف والمناسبات الخاصة، ليبقى اسم الزهرة عنواناً مضيئاً للثقة والمصداقية لكل عائلة وبيت في أسوان ومصر كافة.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars matching Image 3 */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="font-sans-lux text-xs text-[#b89342] uppercase tracking-widest font-bold">
              ركائزنا الأصيلة
            </span>
            <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-1">
              قيم ومبادئ الزهرة
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#faf8f5] p-6 rounded-xl shadow-sm text-center flex flex-col items-center border border-[#e6dbc8]">
              <div className="w-12 h-12 rounded-full bg-[#b89342]/10 text-[#b89342] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">balance</span>
              </div>
              <h4 className="font-amiri text-lg font-bold text-[#1a1a1a] mb-2">دقة الوزن والعيار</h4>
              <p className="font-serif-lux text-xs sm:text-sm text-[#433e36] leading-relaxed">
                مطابقة متناهية ومضمونة لأدق موازين الصاغة ومقاييس النقاوة المعتمدة عالمياً ومحلياً.
              </p>
            </div>

            <div className="bg-[#faf8f5] p-6 rounded-xl shadow-sm text-center flex flex-col items-center border border-[#e6dbc8]">
              <div className="w-12 h-12 rounded-full bg-[#b89342]/10 text-[#b89342] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">handshake</span>
              </div>
              <h4 className="font-amiri text-lg font-bold text-[#1a1a1a] mb-2">الثقة والأمانة</h4>
              <p className="font-serif-lux text-xs sm:text-sm text-[#433e36] leading-relaxed">
                علاقة وطيدة وإخلاص حقيقي ممتد مع عملائنا الكرام، نتوارث مودتهم جيلاً بعد جيل.
              </p>
            </div>

            <div className="bg-[#faf8f5] p-6 rounded-xl shadow-sm text-center flex flex-col items-center border border-[#e6dbc8]">
              <div className="w-12 h-12 rounded-full bg-[#b89342]/10 text-[#b89342] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">diamond</span>
              </div>
              <h4 className="font-amiri text-lg font-bold text-[#1a1a1a] mb-2">نخبة التشكيلات</h4>
              <p className="font-serif-lux text-xs sm:text-sm text-[#433e36] leading-relaxed">
                أطقم شبكة راقية، مصوغات لاظوردي وإيطالية فاخرة، وموديلات حصرية متباينة الأذواق.
              </p>
            </div>

            <div className="bg-[#faf8f5] p-6 rounded-xl shadow-sm text-center flex flex-col items-center border border-[#e6dbc8]">
              <div className="w-12 h-12 rounded-full bg-[#b89342]/10 text-[#b89342] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </div>
              <h4 className="font-amiri text-lg font-bold text-[#1a1a1a] mb-2">كرم الضيافة</h4>
              <p className="font-serif-lux text-xs sm:text-sm text-[#433e36] leading-relaxed">
                استقبال دافئ وكرم أسواني أصيل يليق ببهجة مناسباتكم واختياراتكم المميزة.
              </p>
            </div>
          </div>
        </div>

        {/* Visit & Contact Columns matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Salon Visit */}
          <div className="lg:col-span-6 bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between border border-[#e6dbc8]">
            <div>
              <div className="flex items-center gap-2 text-[#b89342] mb-3">
                <span className="material-symbols-outlined text-2xl">location_on</span>
                <span className="font-sans-lux text-xs uppercase tracking-widest font-bold">
                  موقعنا المميز
                </span>
              </div>
              <h3 className="font-amiri text-2xl font-bold text-[#1a1a1a] mb-3">
                زيارة محل العرض
              </h3>
              <p className="font-serif-lux text-sm text-[#433e36] mb-5 leading-relaxed">
                يسعدنا تشريفكم واستقبالكم في موقعنا الحيوي والفاخر على ضفاف نيل أسوان الساحر:
              </p>

              <div className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3 mb-5 border border-[#e6dbc8]">
                <span className="material-symbols-outlined text-[#b89342] mt-1">pin_drop</span>
                <div>
                  <div className="font-amiri text-lg font-bold text-[#1a1a1a]">
                    أسوان - عمارة متى - شارع كورنيش النيل
                  </div>
                  <div className="font-serif-lux text-xs text-[#433e36] mt-1">
                    موقع استراتيجي وسهل الوصول بإطلالة ساحرة وأجواء تسوق هادئة وراقية.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#b89342] font-sans-lux text-xs sm:text-sm font-semibold pt-2 border-t border-[#e6dbc8]">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>مواعيد العمل: يومياً من 10:00 صباحاً حتى 10:30 مساءً</span>
            </div>
          </div>

          {/* Contact & Inquiry */}
          <div className="lg:col-span-6 bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between border border-[#e6dbc8]">
            <div>
              <div className="flex items-center gap-2 text-[#b89342] mb-3">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
                <span className="font-sans-lux text-xs uppercase tracking-widest font-bold">
                  تواصل مباشر
                </span>
              </div>
              <h3 className="font-amiri text-2xl font-bold text-[#1a1a1a] mb-3">
                أرقام التواصل والاستفسار
              </h3>
              <p className="font-serif-lux text-sm text-[#433e36] mb-5 leading-relaxed">
                فريق مجوهرات الزهرة والخواجة بيمن ابراهيم في خدمتكم دائماً للرد على كافة التساؤلات، استشارات أسعار الذهب، وحجز الموديلات الخاصة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e6dbc8] flex flex-col">
                  <span className="font-sans-lux text-xs text-[#7f7667]">الخط المباشر الأول</span>
                  <a
                    href="tel:01227887660"
                    className="font-sans text-xl font-bold text-[#1a1a1a] hover:text-[#b89342] mt-1 dir-ltr text-right"
                  >
                    01227887660
                  </a>
                </div>
                <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e6dbc8] flex flex-col">
                  <span className="font-sans-lux text-xs text-[#7f7667]">الخط المباشر الثاني</span>
                  <a
                    href="tel:01117723173"
                    className="font-sans text-xl font-bold text-[#1a1a1a] hover:text-[#b89342] mt-1 dir-ltr text-right"
                  >
                    01117723173
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#b89342] transition-all duration-300 py-3 px-5 rounded-lg font-sans-lux text-xs sm:text-sm font-bold shadow-sm"
                href="tel:01227887660"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>اتصال هاتفي مباشر</span>
              </a>
              <a
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#b89342] text-white hover:bg-[#8c6b23] transition-all duration-300 py-3 px-5 rounded-lg font-sans-lux text-xs sm:text-sm font-bold shadow-sm"
                href={`https://wa.me/${BRAND_INFO.whatsappDirect}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>محادثة واتساب سريعة</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
