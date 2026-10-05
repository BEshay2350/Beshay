import React, { useState } from 'react';
import { ScreenTab, JewelryItem } from './types';
import { INITIAL_BULLIONS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GoldRatesScreen } from './screens/GoldRatesScreen';
import { AboutScreen } from './screens/AboutScreen';
import { useLiveGoldPrices } from './services/goldPriceClient';
import { getGoldPricesList } from './utils/pricing';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [inspectedItem, setInspectedItem] = useState<JewelryItem | null>(null);

  // Real-time live market prices hook from backend sources
  const { data: liveData, refreshing, refresh } = useLiveGoldPrices();

  // Dynamic Gold Prices List matching calculateProductPrice format
  const goldPricesList = getGoldPricesList(liveData);

  const handleTabChange = (tab: ScreenTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative selection:bg-[#c5a059] selection:text-white">
      {/* Luxury Sticky Navigation Header */}
      <Header currentTab={currentTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 relative z-10">
        {currentTab === 'home' && (
          <WelcomeScreen onNavigate={handleTabChange} liveData={liveData} />
        )}

        {currentTab === 'rates' && (
          <GoldRatesScreen
            liveData={liveData}
            isRefreshing={refreshing}
            onRefresh={refresh}
            bullions={INITIAL_BULLIONS}
            onInspectItem={(item) => setInspectedItem(item)}
            onNavigate={handleTabChange}
          />
        )}

        {currentTab === 'about' && (
          <AboutScreen onNavigate={handleTabChange} />
        )}
      </main>

      {/* High-Resolution Bullion Inspection & WhatsApp Inquiry Modal */}
      <ProductModal
        item={inspectedItem}
        goldPrices={goldPricesList}
        onClose={() => setInspectedItem(null)}
      />

      {/* Universal Luxury Footer */}
      <Footer onNavigate={handleTabChange} />
    </div>
  );
}
