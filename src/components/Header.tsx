import React, { useState } from 'react';
import { ScreenTab } from '../types';
import { BRAND_INFO } from '../data/mockData';

interface HeaderProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'rates', label: 'بورصة الذهب والأسعار' },
    { id: 'about', label: 'عن المحل & الإدارة' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8f4]/95 backdrop-blur-xl border-b border-[#e6dbc8]/70 shadow-[0_4px_25px_rgba(184,147,66,0.08)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Right side in RTL: Brand Identity */}
        <div
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group transition-all"
        >
          <div className="flex flex-col text-right">
            <span className="font-amiri text-xl sm:text-2xl font-bold text-[#b89342] tracking-wide group-hover:text-[#8c6b23] transition-colors">
              مجوهرات الزهرة
            </span>
            <span className="font-sans-lux text-[11px] sm:text-xs text-[#433e36] tracking-wider font-semibold">
              إدارة بيمن ابراهيم
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`font-amiri text-base lg:text-lg transition-all py-1.5 relative cursor-pointer ${
                  isActive
                    ? 'text-[#b89342] font-bold'
                    : 'text-[#433e36] hover:text-[#b89342]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b89342] rounded-full shadow-[0_0_8px_rgba(184,147,66,0.6)] animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Left side: Quick Direct Contact & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${BRAND_INFO.phones[0]}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4efe7] hover:bg-[#ede6da] text-[#8c6b23] hover:text-[#b89342] font-sans-lux text-xs font-semibold border border-[#cfbe9b]/60 transition-colors"
            title="اتصال مباشر بالمحل"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span dir="ltr">{BRAND_INFO.phones[0]}</span>
          </a>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#433e36] hover:text-[#b89342] hover:bg-[#ede6da]/50 transition-colors"
            aria-label="القائمة الرئيسية"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f4] border-b border-[#e6dbc8] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-2.5 rounded-lg font-amiri text-lg flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#c5a059]/15 text-[#b89342] font-bold border-r-4 border-[#b89342]'
                    : 'text-[#1a1a1a] hover:bg-[#ede6da]/40'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="material-symbols-outlined text-sm text-[#b89342]">
                    arrow_back_ios
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#e6dbc8]/60 flex items-center justify-between text-xs text-[#433e36]">
            <span>المحل - كورنيش النيل بأسوان</span>
            <a
              href={`tel:${BRAND_INFO.phones[0]}`}
              className="text-[#b89342] font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              {BRAND_INFO.phones[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
