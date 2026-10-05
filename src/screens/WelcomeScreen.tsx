import React from 'react';
import type { ScreenTab, GoldPricesResponse } from '../types';
import { BRAND_INFO } from '../data/mockData';

interface WelcomeScreenProps {
  onNavigate: (tab: ScreenTab) => void;
  liveData?: GoldPricesResponse;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate, liveData }) => {
  const p24Sell = liveData?.final['24']?.sell ?? 4255;
  const p24Buy = liveData?.final['24']?.buy ?? 4210;
  const p21Sell = liveData?.final['21']?.sell ?? 3725;
  const p21Buy = liveData?.final['21']?.buy ?? 3680;
  const p18Sell = liveData?.final['18']?.sell ?? 3195;
  const p18Buy = liveData?.final['18']?.buy ?? 3150;
  const coinSell = p21Sell * 8;
  const coinBuy = p21Buy * 8;

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-5rem)] bg-regal-texture text-[#1a1a1a]">
      {/* Ambient Soft Golden Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#b89342]/10 blur-[130px]"></div>
        <div className="absolute -bottom-20 left-10 w-[30rem] h-[30rem] rounded-full bg-[#f5ebd7]/40 blur-[150px]"></div>
      </div>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 flex flex-col justify-center flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Right Column: High-Impact Gold Pricing Stage */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-right order-2 lg:order-1">
            
            {/* Header Kicker */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e6dbc8] shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-sans-lux text-xs font-bold text-[#b89342]">
                  مجوهرات الزهرة • إدارة الخواجة بيمن ابراهيم
                </span>
              </div>

              <div className="text-xs font-sans-lux text-[#8c6b23] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>تحديث لحظي من الصاغة</span>
              </div>
            </div>

            {/* Sharp, Regal Headline with No Clutter */}
            <div>
              <h1 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
                أسعار الذهب والسبائك الرسمية
              </h1>
              <p className="font-serif-lux text-sm sm:text-base text-[#5c5446] mt-1.5">
                أسعار البيع والشراء اللحظية المعتمدة بأسوان لكافة العيارات والجنيهات الذهبية
              </p>
            </div>

            {/* 4 Primary High-Glamour Gold Rate Showcases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* Karat 21 - Crown Jewel */}
              <div
                onClick={() => onNavigate('rates')}
                className="group relative bg-gradient-to-br from-[#ffffff] via-[#fbf7ed] to-[#f7eedc] rounded-2xl p-4 sm:p-5 border-2 border-[#b89342] shadow-[0_8px_25px_rgba(184,147,66,0.15)] hover:shadow-[0_12px_32px_rgba(184,147,66,0.25)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 bg-[#b89342] text-white text-[10px] font-sans-lux font-bold px-3 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-sm">
                  <span>★</span> الأكثر تداولاً وطلباً
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-amiri text-xl font-bold text-[#1a1a1a]">
                      ذهب عيار 21
                    </span>
                    <span className="text-[11px] font-sans-lux text-[#8c6b23] bg-white px-2 py-0.5 rounded-full border border-[#b89342]/30 font-bold">
                      نقاء 875
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-serif-lux text-[#433e36]">سعر البيع (للزبون):</span>
                    <div className="font-sans font-bold text-2xl sm:text-3xl text-[#b89342]">
                      {p21Sell.toLocaleString()}{' '}
                      <span className="text-xs font-serif-lux text-[#433e36]">ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1.5 border-t border-[#b89342]/20 text-xs">
                    <span className="text-[#7f7667]">سعر الشراء (كاش منا):</span>
                    <span className="font-sans font-bold text-sm text-[#1a1a1a]">
                      {p21Buy.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#b89342]/20 flex items-center justify-between text-[11px] text-[#8c6b23] font-bold">
                  <span>المصوغات والشبكة</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    احسب المصنعية &larr;
                  </span>
                </div>
              </div>

              {/* Gold Sovereign Coin */}
              <div
                onClick={() => onNavigate('rates')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#e6dbc8] hover:border-[#b89342] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-amiri text-xl font-bold text-[#1a1a1a]">
                      الجنيه الذهب (8 جم)
                    </span>
                    <span className="text-[11px] font-sans-lux text-[#433e36] bg-[#faf8f5] px-2 py-0.5 rounded-full border border-[#e6dbc8] font-bold">
                      عيار 21
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-serif-lux text-[#433e36]">سعر البيع:</span>
                    <div className="font-sans font-bold text-2xl sm:text-3xl text-[#b89342]">
                      {coinSell.toLocaleString()}{' '}
                      <span className="text-xs font-serif-lux text-[#433e36]">ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1.5 border-t border-[#e6dbc8]/60 text-xs">
                    <span className="text-[#7f7667]">سعر الشراء:</span>
                    <span className="font-sans font-bold text-sm text-[#1a1a1a]">
                      {coinBuy.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#e6dbc8]/60 flex items-center justify-between text-[11px] text-[#7f7667] font-bold">
                  <span>BTC وسام معتمد</span>
                  <span className="text-[#b89342] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    تفاصيل الفئات &larr;
                  </span>
                </div>
              </div>

              {/* Karat 24 - Pure Ingot */}
              <div
                onClick={() => onNavigate('rates')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#e6dbc8] hover:border-[#b89342] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-amiri text-lg sm:text-xl font-bold text-[#1a1a1a]">
                      ذهب عيار 24 (السبائك)
                    </span>
                    <span className="text-[11px] font-sans-lux text-[#433e36] bg-[#faf8f5] px-2 py-0.5 rounded-full border border-[#e6dbc8] font-bold">
                      999.9
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-serif-lux text-[#433e36]">سعر البيع:</span>
                    <div className="font-sans font-bold text-xl sm:text-2xl text-[#b89342]">
                      {p24Sell.toLocaleString()}{' '}
                      <span className="text-xs font-serif-lux text-[#433e36]">ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1.5 border-t border-[#e6dbc8]/60 text-xs">
                    <span className="text-[#7f7667]">سعر الشراء:</span>
                    <span className="font-sans font-bold text-sm text-[#1a1a1a]">
                      {p24Buy.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#e6dbc8]/60 flex items-center justify-between text-[11px] text-[#7f7667] font-bold">
                  <span>ذهب استثماري خالص</span>
                  <span className="text-[#b89342] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    عرض السبائك &larr;
                  </span>
                </div>
              </div>

              {/* Karat 18 - Italian Jewelry */}
              <div
                onClick={() => onNavigate('rates')}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#e6dbc8] hover:border-[#b89342] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-amiri text-lg sm:text-xl font-bold text-[#1a1a1a]">
                      ذهب عيار 18 (الإيطالي)
                    </span>
                    <span className="text-[11px] font-sans-lux text-[#433e36] bg-[#faf8f5] px-2 py-0.5 rounded-full border border-[#e6dbc8] font-bold">
                      750
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-serif-lux text-[#433e36]">سعر البيع:</span>
                    <div className="font-sans font-bold text-xl sm:text-2xl text-[#b89342]">
                      {p18Sell.toLocaleString()}{' '}
                      <span className="text-xs font-serif-lux text-[#433e36]">ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1.5 border-t border-[#e6dbc8]/60 text-xs">
                    <span className="text-[#7f7667]">سعر الشراء:</span>
                    <span className="font-sans font-bold text-sm text-[#1a1a1a]">
                      {p18Buy.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#e6dbc8]/60 flex items-center justify-between text-[11px] text-[#7f7667] font-bold">
                  <span>الأطقم والسلاسل</span>
                  <span className="text-[#b89342] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    حاسبة المصنعية &larr;
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('rates')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#b89342] text-white px-6 py-3.5 rounded-xl font-sans-lux text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">table_chart</span>
                <span>جدول البورصة المتكامل والحاسبة</span>
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${encodeURIComponent(
                  'مرحباً، أود الاستفسار عن أسعار الذهب والسبائك اليوم بمحل مجوهرات الزهرة.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-5 py-3.5 rounded-xl font-sans-lux text-sm font-bold shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>تثبيت السعر عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Left Column: Official Royal Emblem Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative">
            <div className="relative group p-2 sm:p-4">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#b89342]/20 via-[#f0e2c8] to-[#c5a059]/30 blur-2xl opacity-75"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-2xl p-2.5 bg-gradient-to-b from-[#eadecc] via-[#ffffff] to-[#dcc8a7] shadow-[0_20px_50px_rgba(184,147,66,0.18)] border border-[#e6dbc8] flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#faf8f4] flex items-center justify-center shadow-inner">
                  <img
                    alt="شعار مجوهرات الزهرة الرسمي بأسوان"
                    className="w-full h-full object-cover rounded-xl"
                    src={BRAND_INFO.logoUrl}
                  />
                </div>
              </div>

              {/* Floating Verified Seal Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-[#b89342]/30 px-5 py-2 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold font-sans-lux text-[#1a1a1a]">
                <span className="material-symbols-outlined text-[#b89342] text-lg">
                  verified
                </span>
                <span>صاغة معتمدة • أسوان كورنيش النيل</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
