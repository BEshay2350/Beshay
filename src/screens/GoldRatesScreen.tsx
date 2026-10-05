import React, { useState, useEffect } from 'react';
import type { BullionItem, JewelryItem, ScreenTab, GoldPricesResponse, Karat } from '../types';
import { BRAND_INFO } from '../data/mockData';
import { ALL_BULLION_TARIFF, BullionTariffItem } from '../data/bullionCatalog';
import { calculateProductPrice, getGoldPricesList } from '../utils/pricing';
import { BullionTariffSection } from '../components/BullionTariffSection';

interface GoldRatesScreenProps {
  liveData: GoldPricesResponse;
  isRefreshing: boolean;
  onRefresh: () => void;
  bullions: BullionItem[];
  onInspectItem: (item: JewelryItem) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const GoldRatesScreen: React.FC<GoldRatesScreenProps> = ({
  liveData,
  isRefreshing,
  onRefresh,
  bullions,
  onInspectItem,
  onNavigate,
}) => {
  // Calculator state
  const [calcMode, setCalcMode] = useState<'sell' | 'buy'>('sell'); // 'sell' = buying from shop, 'buy' = selling to shop
  const [selectedKarat, setSelectedKarat] = useState<Karat>('21');
  const [weight, setWeight] = useState<number>(10);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [workmanship, setWorkmanship] = useState<number>(84); // مصنعية الجرام الافتراضية
  const [timeString, setTimeString] = useState<string>('');

  // Professional Gold Board View & Filter state
  const [ratesViewMode, setRatesViewMode] = useState<'table' | 'cards'>('table');
  const [ratesCategory, setRatesCategory] = useState<'all' | 'karats' | 'coins' | 'ingots'>('all');
  const [ratesSearch, setRatesSearch] = useState<string>('');

  const goldPricesList = getGoldPricesList(liveData);

  // Dynamic price calculations based on live official data
  const p24Sell = liveData.final['24']?.sell || 4255;
  const p24Buy = liveData.final['24']?.buy || 4210;
  const p21Sell = liveData.final['21']?.sell || 3725;
  const p21Buy = liveData.final['21']?.buy || 3680;
  const p18Sell = liveData.final['18']?.sell || 3195;
  const p18Buy = liveData.final['18']?.buy || 3150;

  const p22Sell = Math.round((p24Sell * 22) / 24);
  const p22Buy = Math.round((p24Buy * 22) / 24);
  const p14Sell = Math.round((p24Sell * 14) / 24);
  const p14Buy = Math.round((p24Buy * 14) / 24);

  const coinSell = p21Sell * 8;
  const coinBuy = p21Buy * 8;
  const halfCoinSell = p21Sell * 4;
  const halfCoinBuy = p21Buy * 4;
  const quarterCoinSell = p21Sell * 2;
  const quarterCoinBuy = p21Buy * 2;
  const fiveCoinsSell = p21Sell * 40;
  const fiveCoinsBuy = p21Buy * 40;

  const ounceSell = Math.round(p24Sell * 31.1035);
  const ounceBuy = Math.round(p24Buy * 31.1035);
  const bar100Sell = p24Sell * 100;
  const bar100Buy = p24Buy * 100;
  const bar1kSell = p24Sell * 1000;
  const bar1kBuy = p24Buy * 1000;

  interface RateItem {
    id: string;
    title: string;
    description: string;
    category: 'karats' | 'coins' | 'ingots';
    karatBadge: string;
    purity: string;
    unit: string;
    sellPrice: number;
    buyPrice: number;
    calcKarat: Karat;
    calcWeight: number;
    calcWorkmanship: number;
    isFeatured?: boolean;
    badge?: string;
    icon: string;
  }

  const allRateItems: RateItem[] = [
    {
      id: 'k21',
      title: 'ذهب عيار 21',
      description: 'العيار الملكي الأكثر طلباً وتداولاً بمصر وأسوان للشبكة والمصوغات والغوايش',
      category: 'karats',
      karatBadge: 'عيار 21',
      purity: '875 (87.5%)',
      unit: 'لكل 1 جرام',
      sellPrice: p21Sell,
      buyPrice: p21Buy,
      calcKarat: '21',
      calcWeight: 10,
      calcWorkmanship: 84,
      isFeatured: true,
      badge: 'الأنشط والأكثر طلباً',
      icon: 'stars',
    },
    {
      id: 'k24',
      title: 'ذهب عيار 24 النقي',
      description: 'المعيار الأنقى بنقاء 999.9 المخصص للسبائك الاستثمارية وصناديق الادخار',
      category: 'karats',
      karatBadge: 'عيار 24',
      purity: '999.9 (99.99%)',
      unit: 'لكل 1 جرام',
      sellPrice: p24Sell,
      buyPrice: p24Buy,
      calcKarat: '24',
      calcWeight: 10,
      calcWorkmanship: 60,
      badge: 'سبائك واستثمار',
      icon: 'token',
    },
    {
      id: 'k18',
      title: 'ذهب عيار 18 الإيطالي',
      description: 'عالم الأناقة العصرية، صياغة السوليتير، خواتم التوينز والموديلات العالمية',
      category: 'karats',
      karatBadge: 'عيار 18',
      purity: '750 (75.0%)',
      unit: 'لكل 1 جرام',
      sellPrice: p18Sell,
      buyPrice: p18Buy,
      calcKarat: '18',
      calcWeight: 10,
      calcWorkmanship: 110,
      badge: 'تشكيلات إيطالية',
      icon: 'flare',
    },
    {
      id: 'coin_full',
      title: 'الجنيه الذهب (8 جرام)',
      description: 'الجنيه الذهبي المعتمد عيار 21 (BTC / سام / صاغة معتمدة) خيار الادخار الأول',
      category: 'coins',
      karatBadge: 'عيار 21 • 8 جم',
      purity: '875 (87.5%)',
      unit: 'قطعة (8 جرام)',
      sellPrice: coinSell,
      buyPrice: coinBuy,
      calcKarat: '21',
      calcWeight: 8,
      calcWorkmanship: 55,
      isFeatured: true,
      badge: 'الوعاء الادخاري الأقوى',
      icon: 'monetization_on',
    },
    {
      id: 'k22',
      title: 'ذهب عيار 22',
      description: 'عيار الصاغة الخليجية والشرقية المتميز ببريقه الذهبي النضر والمصوغات النادرة',
      category: 'karats',
      karatBadge: 'عيار 22',
      purity: '916 (91.6%)',
      unit: 'لكل 1 جرام',
      sellPrice: p22Sell,
      buyPrice: p22Buy,
      calcKarat: '21',
      calcWeight: 10,
      calcWorkmanship: 90,
      badge: 'عيار الخليج',
      icon: 'workspace_premium',
    },
    {
      id: 'k14',
      title: 'ذهب عيار 14',
      description: 'المصوغات العصرية الاقتصادية الخفيفة ومثالية للإهداءات والاستخدام اليومي',
      category: 'karats',
      karatBadge: 'عيار 14',
      purity: '585 (58.5%)',
      unit: 'لكل 1 جرام',
      sellPrice: p14Sell,
      buyPrice: p14Buy,
      calcKarat: '18',
      calcWeight: 10,
      calcWorkmanship: 95,
      badge: 'اقتصادي',
      icon: 'interests',
    },
    {
      id: 'coin_half',
      title: 'نصف الجنيه الذهب (4 جرام)',
      description: 'نصف جنيه عيار 21 مغلف ومعتمد بوزن 4 جرامات صافية',
      category: 'coins',
      karatBadge: 'عيار 21 • 4 جم',
      purity: '875 (87.5%)',
      unit: 'قطعة (4 جرام)',
      sellPrice: halfCoinSell,
      buyPrice: halfCoinBuy,
      calcKarat: '21',
      calcWeight: 4,
      calcWorkmanship: 60,
      icon: 'savings',
    },
    {
      id: 'coin_quarter',
      title: 'ربع الجنيه الذهب (2 جرام)',
      description: 'ربع جنيه عيار 21 معتمد بوزن 2 جرام، ممتاز للهدايا والادخار الصغير',
      category: 'coins',
      karatBadge: 'عيار 21 • 2 جم',
      purity: '875 (87.5%)',
      unit: 'قطعة (2 جرام)',
      sellPrice: quarterCoinSell,
      buyPrice: quarterCoinBuy,
      calcKarat: '21',
      calcWeight: 2,
      calcWorkmanship: 65,
      icon: 'savings',
    },
    {
      id: 'coin_five',
      title: 'خمسة جنيهات ذهب (40 جرام)',
      description: 'طقم استثماري 5 جنيهات ذهب عيار 21 بوزن 40 جراماً كاملاً',
      category: 'coins',
      karatBadge: 'عيار 21 • 40 جم',
      purity: '875 (87.5%)',
      unit: 'طقم (40 جرام)',
      sellPrice: fiveCoinsSell,
      buyPrice: fiveCoinsBuy,
      calcKarat: '21',
      calcWeight: 40,
      calcWorkmanship: 50,
      badge: 'ادخار عائلي',
      icon: 'military_tech',
    },
    {
      id: 'ounce',
      title: 'أونصة الذهب (31.1035 جرام)',
      description: 'أونصة نقية عيار 24 غلاف أمان عالمي معتمد للشراء والادخار المحترف',
      category: 'ingots',
      karatBadge: 'عيار 24 • أونصة',
      purity: '999.9 (99.99%)',
      unit: 'أونصة (31.1 جم)',
      sellPrice: ounceSell,
      buyPrice: ounceBuy,
      calcKarat: '24',
      calcWeight: 31.1,
      calcWorkmanship: 55,
      badge: 'معيار دولي',
      icon: 'diamond',
    },
    {
      id: 'bar_100g',
      title: 'سبيكة ذهب 100 جرام',
      description: 'سبيكة استثمارية كبرى عيار 24 معتمدة من مصلحة الدمغة ومغلفة برقم تسلسلي',
      category: 'ingots',
      karatBadge: 'عيار 24 • 100 جم',
      purity: '999.9 (99.99%)',
      unit: 'سبيكة (100 جم)',
      sellPrice: bar100Sell,
      buyPrice: bar100Buy,
      calcKarat: '24',
      calcWeight: 100,
      calcWorkmanship: 45,
      badge: 'كبار المستثمرين',
      icon: 'account_balance',
    },
    {
      id: 'bar_1kg',
      title: 'سبيكة ذهب 1 كيلوجرام',
      description: 'سبيكة الذهب الخالص زنة 1000 جرام عيار 24 للمؤسسات والأفراد المحترفين',
      category: 'ingots',
      karatBadge: 'عيار 24 • 1 كجم',
      purity: '999.9 (99.99%)',
      unit: 'كيلو (1000 جم)',
      sellPrice: bar1kSell,
      buyPrice: bar1kBuy,
      calcKarat: '24',
      calcWeight: 1000,
      calcWorkmanship: 35,
      badge: 'الاحتياطي الذهبي',
      icon: 'assured_workload',
    },
  ];

  const handleQuickRateCalc = (item: RateItem) => {
    setSelectedKarat(item.calcKarat);
    setWeight(item.calcWeight);
    setWorkmanship(item.calcWorkmanship);
    setCalcMode('sell');
    document.getElementById('ratesCalculatorSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredRateItems = allRateItems.filter((item) => {
    const matchesCat = ratesCategory === 'all' || item.category === ratesCategory;
    const matchesQuery =
      ratesSearch.trim() === '' ||
      item.title.toLowerCase().includes(ratesSearch.toLowerCase()) ||
      item.karatBadge.toLowerCase().includes(ratesSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(ratesSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const unitGoldPrice =
    calcMode === 'sell'
      ? liveData.final[selectedKarat]?.sell || 3725
      : liveData.final[selectedKarat]?.buy || 3680;

  // استخدام دالة حساب أسعار المنتجات الرسمية
  const { sellPrice: calculatedSellTotal, buyPrice: calculatedBuyTotal } = calculateProductPrice(
    {
      carat: selectedKarat,
      weight,
      workmanship: calcMode === 'sell' ? workmanship : 0,
    },
    goldPricesList
  );

  const totalCalculated = calcMode === 'sell' ? calculatedSellTotal : calculatedBuyTotal;

  const handleSelectPreset = (item: BullionTariffItem) => {
    setSelectedPresetId(item.id);
    setSelectedKarat(item.karat);
    setWeight(item.weight);
    setWorkmanship(item.workmanship);
    // Smooth scroll to calculator
    document.getElementById('ratesCalculatorSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePresetDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedPresetId(id);
    if (!id) return;
    const found = ALL_BULLION_TARIFF.find((p) => p.id === id);
    if (found) {
      setSelectedKarat(found.karat);
      setWeight(found.weight);
      setWorkmanship(found.workmanship);
    }
  };

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const whatsappInquiryUrl = `https://wa.me/${BRAND_INFO.whatsappDirect}?text=${encodeURIComponent(
    `مرحباً مجوهرات الزهرة (إدارة الخواجة بيمن ابراهيم)، أود الاستفسار وحجز تسعيرة ${
      calcMode === 'sell' ? 'شراء' : 'بيع'
    } ذهب عيار ${selectedKarat} لوزن ${weight} جرام بسعر الذهب ${unitGoldPrice.toLocaleString('ar-EG')} ج.م ${
      calcMode === 'sell' ? `(المصنعية: ${workmanship} ج/جم)` : ''
    } (القيمة الإجمالية: ${totalCalculated.toLocaleString('ar-EG')} جنيه مصري).`
  )}`;

  return (
    <div className="flex flex-col w-full relative bg-[#faf7f2] text-[#1a1a1a]">
      {/* Hero Section matching Image 1 */}
      <section className="relative z-10 w-full overflow-hidden border-b border-[#e6dbc8]/40 mb-12">
        {/* Backdrop Image & Luxury Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            alt="مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم"
            className="w-full h-full object-cover object-top filter scale-105 transform brightness-[0.92] blur-[1px] opacity-25"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSKn0SNeL_OPZcbyu5TeSK4Go1mbInXJNqxK7lY6qBwylTecQwc2isTy3aYlatKTW96J1WjSKZzY07JTRDOx_Wt0xe5IT6Uwjq9YrmlDQiZ-nk5Xxtkst9Ku5VkBbL8THgiBPNdzIVelvuhla03z87sXlqUzjZWUej15QNcvGioDL50Ib8CaHsM7X0pXpWR4r8ecCCzbPEVB5SC3B7cDuJIhuIqIhJ5eIygxssrAMU6H91JbsLy1qVlI14o-vd92ATKxE"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/95 via-[#faf7f2]/85 to-[#faf7f2]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2] via-transparent to-[#faf7f2]/90"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Right Side: Narrative & Rates Intro */}
            <div className="lg:col-span-7 flex flex-col items-start text-right">
              {/* Top Crest & Live Pill */}
              <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm mb-4 border border-[#b89342]/20">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
                <span className="font-sans-lux text-xs sm:text-sm text-[#b89342] tracking-wider uppercase font-bold">
                  تحديث لحظي لأسعار الصاغة • إدارة الخواجة بيمن ابراهيم
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4 tracking-tight leading-tight">
                بورصة الذهب اليومية ونخبة المصوغات الحصرية
              </h1>

              <p className="font-serif-lux text-base sm:text-lg text-[#433e36] max-w-2xl mb-5 leading-relaxed">
                نقدم لعملائنا الكرام بأسوان وكافة المحافظات تسعيراً دقيقاً ومباشراً للذهب الصافي عيار 24، 21، و18 وفق أرقى معايير الصاغة المعتمدة، مع تشكيلة متجددة من أندر المشغولات الذهبية والأطقم الملكية بإشراف وإدارة الخواجة بيمن ابراهيم.
              </p>

              {/* Official Tagline & Live Sync Badge */}
              <div className="flex flex-wrap items-center gap-2.5 bg-white/90 backdrop-blur-md border border-[#e6dbc8]/60 px-4 py-2 rounded-xl shadow-sm mb-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-[#b89342] font-sans-lux font-bold">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  <span>محدث مباشرة اليوم: {timeString || 'الآن'} بتوقيت الصاغة</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="#ratesSection"
                  className="inline-flex items-center gap-2 bg-[#b89342] hover:bg-[#8c6b23] text-white px-6 py-3 rounded-lg font-sans-lux text-sm font-bold transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-base">monitoring</span>
                  <span>استعراض أسعار اليوم</span>
                </a>

                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#ede6da] text-[#1a1a1a] border border-[#cfbe9b] px-4 py-3 rounded-lg font-sans-lux text-sm font-semibold transition-all shadow-sm"
                  title="تحديث البيانات من المصادر الآن"
                >
                  <span className={`material-symbols-outlined text-base text-[#b89342] ${isRefreshing ? 'animate-spin' : ''}`}>
                    refresh
                  </span>
                  <span>{isRefreshing ? 'جارٍ التحديث...' : 'تحديث البورصة الآن'}</span>
                </button>

                <a
                  href="#bullionTariffSection"
                  className="inline-flex items-center gap-1.5 bg-[#faf8f5] hover:bg-[#ede6da] text-[#1a1a1a] border border-[#cfbe9b] px-3.5 py-3 rounded-lg font-sans-lux text-xs font-bold transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-[#b89342]">savings</span>
                  <span>جدول السبائك والجنيهات (21 فئة)</span>
                </a>
              </div>
            </div>

            {/* Left Side: Featured Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                {/* Ambient Gold Glow Ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#b89342] via-[#c5a059] to-[#a27a36] rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-700"></div>

                <div className="relative bg-white rounded-2xl overflow-hidden border border-[#b89342]/30 shadow-2xl">
                  {/* Framed Official Showcase Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#faf8f5]">
                    <img
                      alt="الخواجة بيمن ابراهيم - محل مجوهرات الزهرة"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      src={BRAND_INFO.portraitUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                    {/* Floating Brand Badge */}
                    <div className="absolute top-3 right-3 bg-[#b89342]/90 backdrop-blur-md text-white font-sans-lux text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#ffdea5]/40 font-bold">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>ثقة • تاريخ • وأصالة</span>
                    </div>

                    {/* Floating Quick Ticker Plinth inside framed card */}
                    <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#b89342]/20 shadow-lg text-center">
                      <div className="font-amiri text-lg font-bold text-[#b89342]">
                        مجوهرات الزهرة
                      </div>
                      <div className="font-sans-lux text-xs text-[#433e36] font-semibold mb-1">
                        إدارة / الخواجة بيمن إبراهيم
                      </div>
                      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#e6dbc8]/60 text-center font-sans-lux text-xs">
                        <div>
                          <div className="text-[10px] text-[#7f7667]">عيار 24</div>
                          <div className="font-bold text-[#b89342] font-sans">
                            {liveData.final['24'].sell?.toLocaleString() || 4255} ج.م
                          </div>
                        </div>
                        <div className="border-x border-[#e6dbc8]/60">
                          <div className="text-[10px] text-[#7f7667]">عيار 21</div>
                          <div className="font-bold text-[#b89342] font-sans">
                            {liveData.final['21'].sell?.toLocaleString() || 3725} ج.م
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#7f7667]">عيار 18</div>
                          <div className="font-bold text-[#b89342] font-sans">
                            {liveData.final['18'].sell?.toLocaleString() || 3195} ج.م
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Executive Quick Ticker Strip */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-8 max-w-7xl mx-auto w-full scroll-mt-24" id="ratesSection">
        <div className="bg-gradient-to-r from-[#ffffff] via-[#fdfbf7] to-[#ffffff] rounded-2xl p-4 sm:p-5 border border-[#e6dbc8] shadow-[0_4px_20px_rgba(184,147,66,0.08)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e6dbc8]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b89342]/15 text-[#b89342] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h2 className="font-amiri text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                    شاشة أسعار الذهب والسبائك الرسمية
                  </h2>
                </div>
                <p className="font-serif-lux text-xs text-[#7f7667]">
                  مجوهرات الزهرة • إدارة الخواجة بيمن ابراهيم — تحديث لحظي ومباشر وفق أسعار الصاغة
                </p>
              </div>
            </div>

            {/* View Switcher & Live Time */}
            <div className="flex items-center gap-3 self-end md:self-center">
              <div className="text-xs font-sans-lux text-[#8c6b23] flex items-center gap-1.5 bg-[#faf8f5] px-3 py-1.5 rounded-lg border border-[#e6dbc8]">
                <span className="material-symbols-outlined text-sm text-[#b89342]">schedule</span>
                <span>{timeString || 'محدث لحظياً'}</span>
              </div>

              {/* Segmented View Switcher */}
              <div className="inline-flex p-1 bg-[#ede6da]/70 rounded-xl border border-[#d8c7ac]">
                <button
                  type="button"
                  onClick={() => setRatesViewMode('table')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-all cursor-pointer ${
                    ratesViewMode === 'table'
                      ? 'bg-white text-[#1a1a1a] shadow-sm'
                      : 'text-[#5a5347] hover:text-[#1a1a1a]'
                  }`}
                  title="عرض جدول البورصة المعتمد"
                >
                  <span className="material-symbols-outlined text-sm">table_rows</span>
                  <span>جدول البورصة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRatesViewMode('cards')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-all cursor-pointer ${
                    ratesViewMode === 'cards'
                      ? 'bg-white text-[#1a1a1a] shadow-sm'
                      : 'text-[#5a5347] hover:text-[#1a1a1a]'
                  }`}
                  title="عرض البطاقات الملكية"
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  <span>بطاقات ملكية</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Benchmark 4 Tickers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            {/* Karat 21 */}
            <div className="bg-[#faf8f5] rounded-xl p-3 border border-[#b89342]/40 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-amiri text-base font-bold text-[#1a1a1a] flex items-center gap-1">
                  <span className="text-[#b89342]">★</span> عيار 21 (الرئيسي)
                </span>
                <span className="text-[10px] font-sans-lux text-[#8c6b23] bg-[#f5ebd7] px-1.5 py-0.5 rounded font-bold">
                  875
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs pt-1 border-t border-[#e6dbc8]/60">
                <span className="text-[#7f7667]">البيع للزبون:</span>
                <span className="font-sans font-bold text-lg text-[#b89342]">
                  {p21Sell.toLocaleString()} <span className="text-[10px] text-[#433e36]">ج.م</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-[#7f7667] mt-0.5">
                <span>الشراء منا:</span>
                <span className="font-sans font-semibold text-xs text-[#1a1a1a]">
                  {p21Buy.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Gold Sovereign Coin */}
            <div className="bg-[#faf8f5] rounded-xl p-3 border border-[#e6dbc8] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-amiri text-base font-bold text-[#1a1a1a]">
                  الجنيه الذهب (8 جم)
                </span>
                <span className="text-[10px] font-sans-lux text-[#433e36] bg-[#ede6da] px-1.5 py-0.5 rounded font-bold">
                  21 عيار
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs pt-1 border-t border-[#e6dbc8]/60">
                <span className="text-[#7f7667]">البيع للزبون:</span>
                <span className="font-sans font-bold text-lg text-[#b89342]">
                  {coinSell.toLocaleString()} <span className="text-[10px] text-[#433e36]">ج.م</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-[#7f7667] mt-0.5">
                <span>الشراء منا:</span>
                <span className="font-sans font-semibold text-xs text-[#1a1a1a]">
                  {coinBuy.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Karat 24 */}
            <div className="bg-[#faf8f5] rounded-xl p-3 border border-[#e6dbc8] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-amiri text-base font-bold text-[#1a1a1a]">
                  عيار 24 (السبائك)
                </span>
                <span className="text-[10px] font-sans-lux text-[#433e36] bg-[#ede6da] px-1.5 py-0.5 rounded font-bold">
                  999.9
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs pt-1 border-t border-[#e6dbc8]/60">
                <span className="text-[#7f7667]">البيع للزبون:</span>
                <span className="font-sans font-bold text-lg text-[#b89342]">
                  {p24Sell.toLocaleString()} <span className="text-[10px] text-[#433e36]">ج.م</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-[#7f7667] mt-0.5">
                <span>الشراء منا:</span>
                <span className="font-sans font-semibold text-xs text-[#1a1a1a]">
                  {p24Buy.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Karat 18 */}
            <div className="bg-[#faf8f5] rounded-xl p-3 border border-[#e6dbc8] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-amiri text-base font-bold text-[#1a1a1a]">
                  عيار 18 (الإيطالي)
                </span>
                <span className="text-[10px] font-sans-lux text-[#433e36] bg-[#ede6da] px-1.5 py-0.5 rounded font-bold">
                  750
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs pt-1 border-t border-[#e6dbc8]/60">
                <span className="text-[#7f7667]">البيع للزبون:</span>
                <span className="font-sans font-bold text-lg text-[#b89342]">
                  {p18Sell.toLocaleString()} <span className="text-[10px] text-[#433e36]">ج.م</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-[#7f7667] mt-0.5">
                <span>الشراء منا:</span>
                <span className="font-sans font-semibold text-xs text-[#1a1a1a]">
                  {p18Buy.toLocaleString()} ج.م
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#e6dbc8]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans-lux text-[#7f7667] ml-2 font-bold">التصنيف:</span>
            <button
              type="button"
              onClick={() => setRatesCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-colors cursor-pointer ${
                ratesCategory === 'all'
                  ? 'bg-[#1a1a1a] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da]'
              }`}
            >
              الكل ({allRateItems.length})
            </button>
            <button
              type="button"
              onClick={() => setRatesCategory('karats')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-colors cursor-pointer ${
                ratesCategory === 'karats'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da]'
              }`}
            >
              عيارات الذهب (24، 22، 21، 18، 14)
            </button>
            <button
              type="button"
              onClick={() => setRatesCategory('coins')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-colors cursor-pointer ${
                ratesCategory === 'coins'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da]'
              }`}
            >
              الجنيهات والعملات (8، 4، 2، 40 جم)
            </button>
            <button
              type="button"
              onClick={() => setRatesCategory('ingots')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-colors cursor-pointer ${
                ratesCategory === 'ingots'
                  ? 'bg-[#b89342] text-white shadow-sm'
                  : 'bg-[#faf8f5] text-[#433e36] hover:bg-[#ede6da]'
              }`}
            >
              السبائك والأونصات (أونصة، 100 جم، كيلو)
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={ratesSearch}
              onChange={(e) => setRatesSearch(e.target.value)}
              placeholder="ابحث عن عيار أو صنف..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] border border-[#e6dbc8] rounded-lg text-xs font-serif-lux focus:outline-none focus:border-[#b89342] transition-colors"
            />
            <span className="material-symbols-outlined text-sm text-[#7f7667] absolute left-2.5 top-2 pointer-events-none">
              search
            </span>
          </div>
        </div>

        {/* 1. TABULAR BOARD VIEW (شاشة البورصة المتكاملة) */}
        {ratesViewMode === 'table' && (
          <div className="mt-4 bg-white rounded-2xl border border-[#e6dbc8] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#1a1a1a] text-white text-xs font-sans-lux border-b border-[#333]">
                    <th className="py-3.5 px-4 font-bold text-right">العيار / الفئة والمواصفات</th>
                    <th className="py-3.5 px-3 font-bold text-center">النقاء والدمغة</th>
                    <th className="py-3.5 px-4 font-bold text-center bg-[#242424] text-[#edd8b8]">
                      سعر الشراء من الزبون (كاش فوري)
                    </th>
                    <th className="py-3.5 px-4 font-bold text-center bg-[#b89342] text-white">
                      سعر البيع للزبون
                    </th>
                    <th className="py-3.5 px-3 font-bold text-center">الفارق (السبريد)</th>
                    <th className="py-3.5 px-4 font-bold text-center">إجراءات الصاغة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6dbc8]/60 text-xs font-sans-lux">
                  {filteredRateItems.map((item) => {
                    const spread = item.sellPrice - item.buyPrice;
                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors duration-200 ${
                          item.isFeatured
                            ? 'bg-[#fbf7ee] hover:bg-[#f6ebd4]'
                            : 'hover:bg-[#faf8f5]'
                        }`}
                      >
                        {/* Title & Category Info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                item.isFeatured
                                  ? 'bg-[#b89342] text-white shadow-sm'
                                  : 'bg-[#faf8f5] text-[#b89342] border border-[#e6dbc8]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-amiri text-base font-bold text-[#1a1a1a]">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-sans-lux font-bold px-2 py-0.5 rounded bg-[#f5ebd7] text-[#8c6b23] border border-[#e6dbc8]">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="font-serif-lux text-[11px] text-[#7f7667] line-clamp-1 max-w-sm mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Purity & Stamp */}
                        <td className="py-4 px-3 text-center">
                          <div className="font-sans font-bold text-xs text-[#1a1a1a]">
                            {item.purity}
                          </div>
                          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                            دمغة معتمدة
                          </div>
                        </td>

                        {/* Buy from Customer */}
                        <td className="py-4 px-4 text-center bg-[#faf8f5]/60 font-sans">
                          <div className="text-base sm:text-lg font-bold text-[#1a1a1a]">
                            {item.buyPrice.toLocaleString()}
                            <span className="text-[11px] font-serif-lux text-[#7f7667] mr-1">ج.م</span>
                          </div>
                          <div className="text-[10px] text-emerald-800 font-sans-lux font-bold">
                            شراء فوري كاش
                          </div>
                        </td>

                        {/* Sell to Customer */}
                        <td className="py-4 px-4 text-center bg-[#fdfbf7] font-sans">
                          <div className="text-lg sm:text-xl font-bold text-[#b89342]">
                            {item.sellPrice.toLocaleString()}
                            <span className="text-xs font-serif-lux text-[#433e36] mr-1">ج.م</span>
                          </div>
                          <div className="text-[10px] text-[#7f7667] font-serif-lux">
                            {item.unit}
                          </div>
                        </td>

                        {/* Spread */}
                        <td className="py-4 px-3 text-center font-sans text-xs text-[#7f7667]">
                          <span className="bg-white px-2 py-1 rounded border border-[#e6dbc8] inline-block font-semibold">
                            {spread > 0 ? `+${spread.toLocaleString()} ج.م` : '-'}
                          </span>
                        </td>

                        {/* Quick Actions */}
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleQuickRateCalc(item)}
                              className="inline-flex items-center gap-1 bg-[#1a1a1a] hover:bg-[#b89342] text-white px-3 py-1.5 rounded-lg text-xs font-sans-lux font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                              title="تحديد في الحاسبة وحساب التكلفة"
                            >
                              <span className="material-symbols-outlined text-sm">calculate</span>
                              <span>احسب التكلفة</span>
                            </button>

                            <a
                              href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${encodeURIComponent(
                                `مرحباً، أود الاستفسار وتأكيد سعر ${item.title} اليوم بمحل مجوهرات الزهرة.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                              title="استفسار وتثبيت السعر عبر واتساب"
                            >
                              <span className="material-symbols-outlined text-base">chat</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="p-3 bg-[#faf8f5] border-t border-[#e6dbc8] flex items-center justify-between text-[11px] text-[#7f7667]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#b89342]">info</span>
                <span>الأسعار تُحدّث دورياً على مدار اليوم بحسب حركة التداول الفعلية بسوق الصاغة المصرية.</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[#b89342] font-bold">
                <span>مجوهرات الزهرة — الخواجة بيمن ابراهيم</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. LUXURY CARDS VIEW (عرض البطاقات الملكية الفاخرة) */}
        {ratesViewMode === 'cards' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredRateItems.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border overflow-hidden ${
                  item.isFeatured
                    ? 'border-2 border-[#b89342] shadow-[0_10px_30px_rgba(184,147,66,0.12)]'
                    : 'border-[#e6dbc8]'
                }`}
              >
                {item.isFeatured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#b89342] to-[#8c6b23] text-white font-sans-lux text-[11px] px-4 py-1 rounded-bl-xl shadow-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">star</span>
                    <span>{item.badge || 'الأكثر طلباً'}</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          item.isFeatured
                            ? 'bg-[#b89342] text-white shadow-md'
                            : 'bg-[#faf8f5] text-[#b89342] border border-[#e6dbc8]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-amiri text-xl font-bold text-[#1a1a1a]">
                          {item.title}
                        </h3>
                        <div className="text-xs font-sans-lux text-[#7f7667]">
                          النقاء: <strong className="text-[#1a1a1a]">{item.purity}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="font-serif-lux text-xs text-[#433e36] mb-4 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Pricing Board Box */}
                  <div className="bg-[#faf8f5] rounded-xl p-3.5 border border-[#e6dbc8] mb-4">
                    {/* Sell Price */}
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-serif-lux text-xs text-[#433e36]">
                        سعر البيع (للزبون):
                      </span>
                      <div className="font-sans font-bold text-2xl sm:text-3xl text-[#b89342]">
                        {item.sellPrice.toLocaleString()}{' '}
                        <span className="text-xs font-serif-lux text-[#7f7667]">ج.م</span>
                      </div>
                    </div>

                    {/* Buy Price */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-[#e6dbc8]/70 text-xs">
                      <span className="text-[#7f7667]">سعر الشراء (كاش منا):</span>
                      <div className="font-sans font-bold text-sm sm:text-base text-[#1a1a1a]">
                        {item.buyPrice.toLocaleString()} ج.م
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#e6dbc8]/40 text-[11px] text-[#7f7667]">
                      <span>وحدة القياس: {item.unit}</span>
                      <span>السبريد: +{(item.sellPrice - item.buyPrice).toLocaleString()} ج.م</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickRateCalc(item)}
                    className="flex-1 py-2.5 px-3 bg-[#1a1a1a] hover:bg-[#b89342] text-white rounded-xl text-xs font-sans-lux font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">calculate</span>
                    <span>احسب المصنعية</span>
                  </button>

                  <a
                    href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${encodeURIComponent(
                      `مرحباً، أود الاستفسار عن ${item.title} وسعر اليوم بمجوهرات الزهرة.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
                    title="تواصل مباشر عبر واتساب"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Smart Gold Calculator */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-14 max-w-7xl mx-auto w-full scroll-mt-24" id="ratesCalculatorSection">
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-[#cfbe9b]/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 text-[#b89342] font-sans-lux text-xs uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-lg">calculate</span>
                <span>حاسبة القيمة الفورية المتطورة</span>
              </div>

              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
                احسب قيمة مقتنياتك الذهبية بدقة الصاغة
              </h2>

              <p className="font-serif-lux text-sm text-[#433e36] leading-relaxed">
                اختر نوع العملية (شراء مصوغات جديدة أو بيع ذهبك القديم)، ثم حدد العيار والوزن لمعرفة القيمة التقديرية بدقة متناهية مع إمكانية تثبيت السعر عبر واتساب الإدارة.
              </p>

              {/* Calculator Mode Switch */}
              <div className="flex items-center gap-2 p-1.5 bg-[#faf8f5] rounded-xl border border-[#e6dbc8] max-w-md mt-2">
                <button
                  type="button"
                  onClick={() => setCalcMode('sell')}
                  className={`flex-1 py-2 px-3 rounded-lg font-sans-lux text-xs font-bold transition-all ${
                    calcMode === 'sell'
                      ? 'bg-[#b89342] text-white shadow-sm'
                      : 'text-[#433e36] hover:bg-[#ede6da]'
                  }`}
                >
                  أريد شراء ذهب جديد
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode('buy')}
                  className={`flex-1 py-2 px-3 rounded-lg font-sans-lux text-xs font-bold transition-all ${
                    calcMode === 'buy'
                      ? 'bg-[#1a1a1a] text-white shadow-sm'
                      : 'text-[#433e36] hover:bg-[#ede6da]'
                  }`}
                >
                  أريد بيع ذهبي القديم
                </button>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs font-sans-lux text-[#433e36]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  سعر الذهب الخام للجرام:{' '}
                  <strong className="text-[#b89342] font-sans text-sm">
                    {liveData.final[selectedKarat]?.sell?.toLocaleString('ar-EG') || '3,725'} ج.م
                  </strong>
                </span>
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="lg:col-span-7 bg-[#faf8f5] p-5 sm:p-6 rounded-xl border border-[#e6dbc8] flex flex-col gap-4">
              {/* Quick Preset Selector from Official 21 Bullion Categories */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-sans-lux text-xs font-bold text-[#433e36]">
                    اختيار سبيكة أو جنيه من الفئات الرسمية المعتمدة (21 فئة):
                  </label>
                  {selectedPresetId && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPresetId('');
                        setWorkmanship(84);
                      }}
                      className="text-[#b89342] text-[11px] underline font-bold"
                    >
                      إلغاء التحديد وتخصيص يدوي
                    </button>
                  )}
                </div>
                <select
                  value={selectedPresetId}
                  onChange={handlePresetDropdownChange}
                  className="w-full px-3 py-2.5 bg-white border border-[#cfbe9b] rounded-lg text-xs font-sans-lux text-[#1a1a1a] focus:outline-none focus:border-[#b89342]"
                >
                  <option value="">-- أو حدد الوزن والعيار يدوياً أدناه --</option>
                  <optgroup label="🟡 فئات عيار 24 (13 فئة)">
                    {ALL_BULLION_TARIFF.filter((i) => i.karat === '24').map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.weight} جم - مصنعية: {item.workmanship} ج/جم)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟡 فئات عيار 21 (8 فئات)">
                    {ALL_BULLION_TARIFF.filter((i) => i.karat === '21').map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.weight} جم - مصنعية: {item.workmanship} ج/جم)
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Select Karat */}
              <div>
                <label className="block font-sans-lux text-xs font-bold text-[#433e36] mb-2">
                  عيار الذهب:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['24', '21', '18'] as Karat[]).map((karat) => {
                    const isSelected = selectedKarat === karat;
                    return (
                      <button
                        key={karat}
                        type="button"
                        onClick={() => {
                          setSelectedKarat(karat);
                          setSelectedPresetId('');
                        }}
                        className={`py-2 px-3 rounded-lg font-sans-lux text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#b89342] text-white shadow-md'
                            : 'bg-white text-[#1a1a1a] shadow-sm hover:bg-[#ede6da]'
                        }`}
                      >
                        عيار {karat} {karat === '21' && '(المفضل)'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight Slider & Direct Gram input */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-sans-lux text-xs font-bold text-[#433e36]">
                    الوزن (بالجرام):
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-lg font-bold text-[#b89342]">
                      {weight} جرام
                    </span>
                    <input
                      type="number"
                      min={0.1}
                      max={1000}
                      step={0.1}
                      value={weight}
                      onChange={(e) => {
                        setWeight(Math.max(0.1, Number(e.target.value) || 0.1));
                        setSelectedPresetId('');
                      }}
                      className="w-20 px-2 py-1 bg-white border border-[#cfbe9b] rounded text-center text-xs font-bold text-[#1a1a1a]"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="250"
                  step="0.5"
                  value={weight > 250 ? 250 : weight}
                  onChange={(e) => {
                    setWeight(Number(e.target.value));
                    setSelectedPresetId('');
                  }}
                  className="w-full accent-[#b89342] h-2 bg-[#ede6da] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-sans-lux text-[#7f7667] mt-1">
                  <span>1 جرام</span>
                  <span>50 جم</span>
                  <span>100 جم</span>
                  <span>250 جم</span>
                </div>
              </div>

              {/* Workmanship Fee Setting (for Buying mode) */}
              {calcMode === 'sell' && (
                <div className="bg-white p-3 rounded-lg border border-[#e6dbc8]/80">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-sans-lux text-xs font-bold text-[#433e36]">
                      المصنعية والدمغة الرسمية المقررة:
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={0}
                        max={1000}
                        value={workmanship}
                        onChange={(e) => setWorkmanship(Math.max(0, Number(e.target.value) || 0))}
                        className="w-20 px-2 py-1 bg-[#faf8f5] border border-[#cfbe9b] rounded text-center text-xs font-bold text-[#b89342]"
                      />
                      <span className="text-xs font-sans-lux text-[#433e36]">ج/جم</span>
                    </div>
                  </div>
                  <div className="text-[11px] font-sans-lux text-[#7f7667]">
                    المعادلة المعتمدة: (سعر بيع الذهب + المصنعية والدمغة) × الوزن
                  </div>
                </div>
              )}

              {/* Result Plinth */}
              <div className="bg-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#e6dbc8]/60">
                <div>
                  <span className="font-sans-lux text-xs text-[#7f7667] block">
                    {calcMode === 'sell' ? 'القيمة الإجمالية للشراء (شامل المصنعية):' : 'القيمة التقديرية لبيع ذهبك الصافي:'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#b89342] flex items-baseline gap-2 font-sans">
                    <span>{totalCalculated.toLocaleString('ar-EG')}</span>
                    <span className="text-sm font-serif-lux text-[#1a1a1a]">جنيه مصري</span>
                  </div>
                  {calcMode === 'sell' && (
                    <div className="text-[11px] font-sans-lux text-emerald-800 mt-1 font-semibold">
                      قيمة استرداد الذهب الصافي بدون مصنعية: {calculatedBuyTotal.toLocaleString('ar-EG')} ج.م
                    </div>
                  )}
                </div>

                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappDirect}?text=${encodeURIComponent(
                    `مرحباً مجوهرات الزهرة (إدارة الخواجة بيمن ابراهيم)، أود الاستفسار وحجز تسعيرة ${
                      calcMode === 'sell' ? 'شراء' : 'بيع'
                    } عيار ${selectedKarat} لوزن ${weight} جرام (القيمة الإجمالية المحسوبة: ${totalCalculated.toLocaleString('ar-EG')} ج.م).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b89342] hover:bg-[#8c6b23] text-white px-5 py-3 rounded-lg font-sans-lux text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>حجز السعر والاستفسار عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21 Official Bullion & Coins Tariff Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24" id="bullionTariffSection">
        <BullionTariffSection
          goldPrices={goldPricesList}
          onSelectPreset={handleSelectPreset}
        />
      </section>



      {/* Trust & Heritage Strip matching Image 1 */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-14 max-w-7xl mx-auto w-full">
        <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8 border border-[#e6dbc8]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#b89342] flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <span className="font-sans-lux text-xs text-[#b89342] uppercase font-bold tracking-wider">
                  إرث وأمانة الصاغة
                </span>
                <h3 className="font-amiri text-2xl font-bold text-[#1a1a1a] mt-0.5">
                  ميثاق الثقة لإدارة الخواجة بيمن ابراهيم
                </h3>
                <p className="font-serif-lux text-sm text-[#433e36] max-w-xl leading-relaxed mt-1">
                  تاريخ طويل مبني على المصداقية المطلقة، موازين دقيقة للمليجرام، فواتير قانونية وضريبية شاملة تفاصيل كل جرام، وسياسة استبدال عادلة تضمن حق المشتري أولاً.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-[#e6dbc8]/60">
                <span className="material-symbols-outlined text-[#b89342] text-2xl mb-1">
                  scale
                </span>
                <div className="font-sans text-xl font-bold text-[#1a1a1a]">100%</div>
                <div className="font-sans-lux text-xs text-[#433e36]">دقة الميزان والوزن</div>
              </div>
              <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-[#e6dbc8]/60">
                <span className="material-symbols-outlined text-[#b89342] text-2xl mb-1">
                  receipt_long
                </span>
                <div className="font-amiri text-lg font-bold text-[#1a1a1a]">معتمد</div>
                <div className="font-sans-lux text-xs text-[#433e36]">فاتورة ضريبية رسمية</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Quick Direct Contact Plinth matching Image 1 */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-14 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md border border-[#e6dbc8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span className="font-sans-lux text-xs text-[#b89342] uppercase font-bold tracking-wider">
                تشرفنا زيارتكم في المحل
              </span>
              <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
                محل مجوهرات الزهرة - أسوان
              </h2>

              <div className="flex items-start gap-2.5 mt-2 text-[#433e36]">
                <span className="material-symbols-outlined text-[#b89342] text-xl mt-0.5">
                  location_on
                </span>
                <div className="font-serif-lux text-sm leading-relaxed">
                  <strong className="text-[#1a1a1a] block mb-0.5">العنوان الرئيسي:</strong>
                  محافظة أسوان - عمارة متى - شارع كورنيش النيل (موقع مميز يطل مباشرة على النيل الخالد).
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-[#433e36]">
                <span className="material-symbols-outlined text-[#b89342] text-xl mt-0.5">
                  call
                </span>
                <div className="font-serif-lux text-sm">
                  <strong className="text-[#1a1a1a] block mb-1">
                    أرقام الإدارة والمبيعات المباشرة:
                  </strong>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans font-bold text-[#b89342] text-base" dir="ltr">
                    <a className="hover:underline" href="tel:01227887660">
                      01227887660
                    </a>
                    <span className="text-[#cfbe9b]">•</span>
                    <a className="hover:underline" href="tel:01117723173">
                      01117723173
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <a
                  className="inline-flex items-center gap-2 bg-[#b89342] hover:bg-[#8c6b23] text-white px-5 py-2.5 rounded-lg font-sans-lux text-xs sm:text-sm font-bold transition-colors shadow-sm"
                  href="tel:01227887660"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>اتصال هاتفي مباشر</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 bg-[#faf8f5] hover:bg-[#ede6da] text-[#1a1a1a] border border-[#cfbe9b] px-5 py-2.5 rounded-lg font-sans-lux text-xs sm:text-sm font-semibold transition-colors"
                  href={`https://wa.me/${BRAND_INFO.whatsappDirect}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base text-[#25D366]">chat</span>
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="w-full h-64 rounded-xl shadow-inner bg-cover bg-center flex items-center justify-center relative overflow-hidden border border-[#cfbe9b]"
                style={{ backgroundImage: `url(${BRAND_INFO.mapBackgroundUrl})` }}
              >
                <div className="absolute inset-0 bg-[#b89342]/10 backdrop-blur-[1px]"></div>
                <div className="relative z-10 bg-white/95 px-5 py-3 rounded-lg shadow-md text-center border border-[#b89342]/20">
                  <span className="material-symbols-outlined text-[#b89342] text-3xl">
                    storefront
                  </span>
                  <div className="font-amiri text-lg font-bold text-[#1a1a1a]">
                    مجوهرات الزهرة
                  </div>
                  <div className="font-sans-lux text-xs text-[#433e36]">
                    شارع كورنيش النيل - أسوان
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
