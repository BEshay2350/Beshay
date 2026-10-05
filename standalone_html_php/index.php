<?php
/**
 * مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم - أسوان
 * النسخة المتكاملة للاستضافات المشتركة (Shared Hosting / cPanel)
 * لا تحتاج إلى Node.js أو VPS نهائياً
 */
$cachedData = null;
$cacheFile = __DIR__ . '/prices_cache.json';
if (file_exists($cacheFile)) {
    $raw = @file_get_contents($cacheFile);
    if ($raw) {
        $json = @json_decode($raw, true);
        if (!empty($json['data'])) {
            $cachedData = $json['data'];
        }
    }
}
$init21Sell = $cachedData['final']['21']['sell'] ?? 6150;
$init21Buy  = $cachedData['final']['21']['buy']  ?? 6090;
$init24Sell = $cachedData['final']['24']['sell'] ?? 7027;
$init24Buy  = $cachedData['final']['24']['buy']  ?? 6962;
$init18Sell = $cachedData['final']['18']['sell'] ?? 5273;
$init18Buy  = $cachedData['final']['18']['buy']  ?? 5218;
$initPoundSell = $cachedData['coins']['pound']['sell'] ?? ($init21Sell * 8);
$initPoundBuy  = $cachedData['coins']['pound']['buy']  ?? ($init21Buy * 8);
$initOunce = $cachedData['ounce'] ?? 4138;
$initUsd   = $cachedData['saghaUsd'] ?? 52.66;
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مجوهرات الزهرة | إدارة الخواجة بيمن ابراهيم - أسوان</title>
  <meta name="description" content="المنصة الرسمية لمجوهرات الزهرة بأسوان تحت إشراف وإدارة الخواجة بيمن ابراهيم - أسعار الذهب والسبائك اللحظية المعتمدة، عيارات 24 و 21 و 18 والجنيه الذهب وحاسبة المصنعية.">
  <meta name="keywords" content="مجوهرات الزهرة, الخواجة بيمن ابراهيم, أسعار الذهب في أسوان, سعر الذهب اليوم في مصر, عيار 21 اليوم أسوان, سبائك ذهب أسوان, صاغة أسوان, بورصة الذهب أسوان">
  <meta name="robots" content="index, follow">
  <meta name="author" content="مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم">

  <!-- OpenGraph Social Cards -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="مجوهرات الزهرة">
  <meta property="og:title" content="مجوهرات الزهرة | إدارة الخواجة بيمن ابراهيم - أسوان">
  <meta property="og:description" content="أسعار الذهب والسبائك اللحظية المعتمدة في أسوان، سبائك معتمدة وعيارات 24، 21، 18 والجنيه الذهب.">

  <!-- Schema.org Rich Structured Data for Google Search -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "مجوهرات الزهرة",
    "alternateName": "Al-Zahra Jewelry Aswan",
    "description": "عراقة الصياغة وتجارة الذهب والسبائك المعتمدة في صعيد مصر ومحافظة أسوان بإدارة الخواجة بيمن ابراهيم.",
    "telephone": "+201227887660",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "عمارة متى - شارع كورنيش النيل",
      "addressLocality": "أسوان",
      "addressRegion": "محافظة أسوان",
      "addressCountry": "EG"
    }
  }
  </script>

  <!-- Google Fonts: Amiri & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gold: {
              50: '#fdfbf7',
              100: '#f7f1e5',
              200: '#edd8b8',
              300: '#dfc28d',
              400: '#c5a059',
              500: '#b89342',
              600: '#8c6b23',
              700: '#684e16',
              800: '#48350d',
              900: '#2b1f05',
            }
          },
          fontFamily: {
            amiri: ['Amiri', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    .gold-gradient {
      background: linear-gradient(135deg, #b89342 0%, #d4af37 50%, #8c6b23 100%);
    }
    .gold-card-glow {
      box-shadow: 0 10px 30px -10px rgba(184, 147, 66, 0.25);
    }
  </style>
</head>
<body class="bg-[#faf7f2] text-[#1a1a1a] font-sans antialiased selection:bg-[#edd8b8] selection:text-[#8c6b23]">

  <!-- رأس الصفحة العلوي والتواصل المباشر -->
  <header class="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e6dbc8]/80 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- شعار المحل -->
      <div class="flex items-center gap-3">
        <img src="images/logo.png" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuCv0jSaQ6geQNBf2-Cag-HPCbSsB_cpo3EZ7Cu52GpE5Sgda3-pXPlzUMtvZradvq9P8PddhLoFdf4Uu2qf_ejgkUeULkiPaqB2HKuMyaLNNd8SrzJCKaCzVbzGTDpHiTqjt8fGDq5EEjXME4RxGq2P-vCiF7PFUdq206UidO74USfJ3-a-SxclLFhDfJ56giEA4SvPx4cOxbgnih4xmFxlAeJopeLaTpIlRx3uY0ehlF7yYRItECbKUlg6TlTWS87_Oxg'" alt="شعار مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم" class="w-12 h-12 rounded-2xl object-contain bg-white border border-[#b89342]/40 p-1 shadow-md" />
        <div>
          <h1 class="font-amiri text-2xl sm:text-3xl font-bold text-[#b89342] leading-none">مجوهرات الزهرة</h1>
          <p class="text-xs text-[#8c6b23] font-bold mt-1">إدارة الخواجة بيمن ابراهيم • أسوان</p>
        </div>
      </div>

      <!-- روابط التنقل السريع -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-bold text-[#433e36]">
        <a href="#rates-section" class="hover:text-[#b89342] transition-colors flex items-center gap-1.5">
          <span class="material-symbols-outlined text-lg text-[#b89342]">monitoring</span>
          <span>أسعار الذهب اللحظية</span>
        </a>
        <a href="#table-section" class="hover:text-[#b89342] transition-colors flex items-center gap-1.5">
          <span class="material-symbols-outlined text-lg text-[#b89342]">table_chart</span>
          <span>جدول العيارات والسبائك</span>
        </a>
        <a href="#calculator-section" class="hover:text-[#b89342] transition-colors flex items-center gap-1.5">
          <span class="material-symbols-outlined text-lg text-[#b89342]">calculate</span>
          <span>حاسبة الذهب والمصنعية</span>
        </a>
        <a href="#store-section" class="hover:text-[#b89342] transition-colors flex items-center gap-1.5">
          <span class="material-symbols-outlined text-lg text-[#b89342]">storefront</span>
          <span>مقر المحل بأسوان</span>
        </a>
      </nav>

      <!-- أزرار الاتصال السريع -->
      <div class="flex items-center gap-2.5">
        <a href="tel:01227887660" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#ede6da] text-[#1a1a1a] text-xs sm:text-sm font-bold border border-[#cfbe9b] transition-all shadow-xs">
          <span class="material-symbols-outlined text-sm text-[#b89342]">call</span>
          <span dir="ltr">01227887660</span>
        </a>
        <a href="https://wa.me/201227887660?text=مرحباً%20مجوهرات%20الزهرة،%20أود%20الاستفسار%20عن%20أسعار%20الذهب%20اليوم" target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs">
          <span class="material-symbols-outlined text-sm">chat</span>
          <span class="hidden sm:inline">واتساب المحل</span>
        </a>
      </div>
    </div>
  </header>

  <!-- الواجهة الرئيسية الجذابة للأسعار (Hero Section بدون حشو كلام) -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#f5ede0] to-[#faf7f2] border border-[#e6dbc8] p-6 sm:p-10 shadow-sm text-center">
      <!-- صورة الخلفية الفاخرة للذهب -->
      <div class="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
        <img src="images/showcase_hero.jpg" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuCSKn0SNeL_OPZcbyu5TeSK4Go1mbInXJNqxK7lY6qBwylTecQwc2isTy3aYlatKTW96J1WjSKZzY07JTRDOx_Wt0xe5IT6Uwjq9YrmlDQiZ-nk5Xxtkst9Ku5VkBbL8THgiBPNdzIVelvuhla03z87sXlqUzjZWUej15QNcvGioDL50Ib8CaHsM7X0pXpWR4r8ecCCzbPEVB5SC3B7cDuJIhuIqIhJ5eIygxssrAMU6H91JbsLy1qVlI14o-vd92ATKxE'" class="w-full h-full object-cover object-top filter blur-[0.5px]" alt="مجوهرات الزهرة" />
      </div>
      <div class="relative z-10">
      <!-- شارة البث المباشر -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#b89342]/30 text-[#8c6b23] text-xs font-bold mb-4 shadow-xs">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>بث لحظي مباشر • سوق الصاغة بمحافظة أسوان</span>
      </div>

      <h2 class="font-amiri text-3xl sm:text-5xl font-bold text-[#1a1a1a] mb-3">
        بورصة الذهب والسبائك الرسمية
      </h2>
      <p class="text-sm sm:text-base text-[#433e36] max-w-2xl mx-auto font-medium mb-6">
        الأسعار المعتمدة للبيع والشراء لدى <strong class="text-[#b89342]">مجوهرات الزهرة</strong> بإدارة <strong class="text-[#b89342]">الخواجة بيمن ابراهيم</strong> — تحديث فوري لكافة العيارات والجنيهات والسبائك
      </p>

      <!-- شريط مؤشرات السوق العالمي والمحلي السريع -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#433e36] bg-white/80 backdrop-blur-sm border border-[#e6dbc8]/80 py-2.5 px-6 rounded-2xl max-w-3xl mx-auto shadow-xs">
        <div class="flex items-center gap-1.5">
          <span class="text-gray-500">الأونصة العالمية:</span>
          <span class="font-sans text-emerald-700 font-extrabold text-sm" id="ribbon-ounce">$<?= number_format($initOunce, 2) ?></span>
        </div>
        <span class="text-[#cfbe9b]">•</span>
        <div class="flex items-center gap-1.5">
          <span class="text-gray-500">دولار الصاغة التقديري:</span>
          <span class="font-sans text-[#b89342] font-extrabold text-sm" id="ribbon-usd"><?= number_format($initUsd, 2) ?> ج.م</span>
        </div>
        <span class="text-[#cfbe9b]">•</span>
        <div class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm text-[#b89342]">schedule</span>
          <span id="ribbon-time" class="text-gray-600">محدث الآن</span>
        </div>
        <span class="text-[#cfbe9b]">•</span>
        <button onclick="loadPrices(true)" class="inline-flex items-center gap-1 text-[#8c6b23] hover:text-[#b89342] cursor-pointer">
          <span class="material-symbols-outlined text-sm" id="refresh-spin">refresh</span>
          <span>تحديث الآن</span>
        </button>
      </div>
      </div>
    </div>
  </section>

  <!-- بطاقات الأسعار الذهبية الأربعة الرئيسية -->
  <section id="rates-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- عيار 21 (الرئيسي الأكثر طلباً) -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#b89342] gold-card-glow relative overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mb-1">الأكثر طلباً وتداولاً</span>
            <h3 class="font-amiri text-2xl font-bold text-[#1a1a1a]">عيار 21</h3>
          </div>
          <div class="w-9 h-9 rounded-xl bg-[#f7f1e5] border border-[#b89342]/40 flex items-center justify-center text-[#b89342] font-bold text-xs">
            875
          </div>
        </div>

        <div class="space-y-3 py-3 border-y border-[#f2ece2]">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold text-gray-500">سعر البيع للزبون:</span>
            <div class="text-right">
              <span class="font-sans text-3xl font-extrabold text-[#b89342]" id="card-sell-21"><?= number_format($init21Sell) ?></span>
              <span class="text-xs font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
          <div class="flex items-baseline justify-between bg-[#faf7f2] p-2.5 rounded-xl border border-[#e6dbc8]/60">
            <span class="text-xs font-bold text-[#433e36]">سعر الشراء من الزبون:</span>
            <div class="text-right">
              <span class="font-sans text-lg font-bold text-[#1a1a1a]" id="card-buy-21"><?= number_format($init21Buy) ?></span>
              <span class="text-[11px] font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <a href="https://wa.me/201227887660?text=أود%20تثبيت%20وحجز%20شراء%20ذهب%20عيار%2021" target="_blank" class="w-full py-2.5 rounded-xl gold-gradient hover:brightness-105 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
            <span class="material-symbols-outlined text-base">chat</span>
            <span>تثبيت وشراء عيار 21</span>
          </a>
        </div>
      </div>

      <!-- الجنيه الذهب 8 جرام عيار 21 -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-[#e6dbc8] shadow-sm relative overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-[11px] font-bold text-[#8c6b23] bg-[#f7f1e5] border border-[#cfbe9b] px-2 py-0.5 rounded-full inline-block mb-1">وزن 8 جرام صافي</span>
            <h3 class="font-amiri text-2xl font-bold text-[#1a1a1a]">الجنيه الذهب</h3>
          </div>
          <div class="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#cfbe9b] flex items-center justify-center text-[#433e36] font-bold text-xs">
            21k
          </div>
        </div>

        <div class="space-y-3 py-3 border-y border-[#f2ece2]">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold text-gray-500">سعر البيع للزبون:</span>
            <div class="text-right">
              <span class="font-sans text-3xl font-extrabold text-[#b89342]" id="card-sell-pound"><?= number_format($initPoundSell) ?></span>
              <span class="text-xs font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
          <div class="flex items-baseline justify-between bg-[#faf7f2] p-2.5 rounded-xl border border-[#e6dbc8]/60">
            <span class="text-xs font-bold text-[#433e36]">سعر الشراء من الزبون:</span>
            <div class="text-right">
              <span class="font-sans text-lg font-bold text-[#1a1a1a]" id="card-buy-pound"><?= number_format($initPoundBuy) ?></span>
              <span class="text-[11px] font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <a href="https://wa.me/201227887660?text=أود%20تثبيت%20وحجز%20جنيه%20ذهب%20معتمد" target="_blank" class="w-full py-2.5 rounded-xl bg-[#f7f1e5] hover:bg-[#ede6da] text-[#8c6b23] text-xs font-bold border border-[#cfbe9b] flex items-center justify-center gap-1.5 transition">
            <span class="material-symbols-outlined text-base">savings</span>
            <span>حجز جنيه ذهب</span>
          </a>
        </div>
      </div>

      <!-- عيار 24 (السبائك والذهب الخالص) -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-[#e6dbc8] shadow-sm relative overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-[11px] font-bold text-[#8c6b23] bg-[#f7f1e5] border border-[#cfbe9b] px-2 py-0.5 rounded-full inline-block mb-1">ذهب خالص للسبائك</span>
            <h3 class="font-amiri text-2xl font-bold text-[#1a1a1a]">عيار 24</h3>
          </div>
          <div class="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#cfbe9b] flex items-center justify-center text-[#8c6b23] font-bold text-xs">
            999
          </div>
        </div>

        <div class="space-y-3 py-3 border-y border-[#f2ece2]">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold text-gray-500">سعر البيع للزبون:</span>
            <div class="text-right">
              <span class="font-sans text-3xl font-extrabold text-[#b89342]" id="card-sell-24"><?= number_format($init24Sell) ?></span>
              <span class="text-xs font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
          <div class="flex items-baseline justify-between bg-[#faf7f2] p-2.5 rounded-xl border border-[#e6dbc8]/60">
            <span class="text-xs font-bold text-[#433e36]">سعر الشراء من الزبون:</span>
            <div class="text-right">
              <span class="font-sans text-lg font-bold text-[#1a1a1a]" id="card-buy-24"><?= number_format($init24Buy) ?></span>
              <span class="text-[11px] font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <a href="https://wa.me/201227887660?text=أود%20الاستفسار%20عن%20سبائك%20عيار%2024" target="_blank" class="w-full py-2.5 rounded-xl bg-[#f7f1e5] hover:bg-[#ede6da] text-[#8c6b23] text-xs font-bold border border-[#cfbe9b] flex items-center justify-center gap-1.5 transition">
            <span class="material-symbols-outlined text-base">view_in_ar</span>
            <span>استفسار عن السبائك</span>
          </a>
        </div>
      </div>

      <!-- عيار 18 (المجوهرات الإيطالية) -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-[#e6dbc8] shadow-sm relative overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-[11px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full inline-block mb-1">المصوغات الحديثة</span>
            <h3 class="font-amiri text-2xl font-bold text-[#1a1a1a]">عيار 18</h3>
          </div>
          <div class="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#cfbe9b] flex items-center justify-center text-[#433e36] font-bold text-xs">
            750
          </div>
        </div>

        <div class="space-y-3 py-3 border-y border-[#f2ece2]">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold text-gray-500">سعر البيع للزبون:</span>
            <div class="text-right">
              <span class="font-sans text-3xl font-extrabold text-[#b89342]" id="card-sell-18"><?= number_format($init18Sell) ?></span>
              <span class="text-xs font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
          <div class="flex items-baseline justify-between bg-[#faf7f2] p-2.5 rounded-xl border border-[#e6dbc8]/60">
            <span class="text-xs font-bold text-[#433e36]">سعر الشراء من الزبون:</span>
            <div class="text-right">
              <span class="font-sans text-lg font-bold text-[#1a1a1a]" id="card-buy-18"><?= number_format($init18Buy) ?></span>
              <span class="text-[11px] font-bold text-gray-500 mr-1">ج.م</span>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <a href="https://wa.me/201227887660?text=أود%20الاستفسار%20عن%20مجوهرات%20عيار%2018" target="_blank" class="w-full py-2.5 rounded-xl bg-[#f7f1e5] hover:bg-[#ede6da] text-[#8c6b23] text-xs font-bold border border-[#cfbe9b] flex items-center justify-center gap-1.5 transition">
            <span class="material-symbols-outlined text-base">auto_awesome</span>
            <span>استفسار عن عيار 18</span>
          </a>
        </div>
      </div>

    </div>
  </section>

  <!-- جدول عرض أسعار الذهب والسبائك الاحترافي والمميز -->
  <section id="table-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-3xl border border-[#e6dbc8] shadow-sm overflow-hidden">
      <!-- ترويسة الجدول والتبويبات -->
      <div class="p-5 sm:p-6 border-b border-[#e6dbc8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#b89342] text-2xl">table_rows</span>
            <h3 class="font-amiri text-2xl sm:text-3xl font-bold text-[#1a1a1a]">جدول أسعار الذهب والسبائك الشامل</h3>
          </div>
          <p class="text-xs sm:text-sm text-[#8c6b23] mt-1">تسعيرة رسمية مباشرة بالجنيه المصري (سعر الكاش المعتمد بدون مصنعية)</p>
        </div>

        <!-- أزرار تصفية الأقسام -->
        <div class="inline-flex p-1 bg-[#faf7f2] rounded-2xl border border-[#cfbe9b]/70 self-start sm:self-auto text-xs font-bold">
          <button onclick="filterTable('all')" id="tab-all" class="px-3.5 py-1.5 rounded-xl bg-[#b89342] text-white shadow-xs transition">الكل (16)</button>
          <button onclick="filterTable('karats')" id="tab-karats" class="px-3.5 py-1.5 rounded-xl text-[#433e36] hover:text-[#b89342] transition">العيارات</button>
          <button onclick="filterTable('coins')" id="tab-coins" class="px-3.5 py-1.5 rounded-xl text-[#433e36] hover:text-[#b89342] transition">الجنيهات والعملات</button>
          <button onclick="filterTable('bullions')" id="tab-bullions" class="px-3.5 py-1.5 rounded-xl text-[#433e36] hover:text-[#b89342] transition">السبائك المعتمدة</button>
        </div>
      </div>

      <!-- محتوى الجدول فائق الدقة -->
      <div class="overflow-x-auto">
        <table class="w-full text-right border-collapse">
          <thead>
            <tr class="bg-[#1a1a1a] text-white text-xs font-bold">
              <th class="py-4 px-5 text-right">الفئة والمواصفات الرسمية</th>
              <th class="py-4 px-4 text-center">العيار والدمغة</th>
              <th class="py-4 px-4 text-center bg-[#242424] text-[#edd8b8]">سعر الشراء من الزبون (كاش)</th>
              <th class="py-4 px-5 text-center bg-[#b89342] text-white">سعر البيع للزبون</th>
              <th class="py-4 px-5 text-center">حجز فوري</th>
            </tr>
          </thead>
          <tbody id="rates-table-body" class="divide-y divide-[#f2ece2] text-xs sm:text-sm font-semibold">
            <!-- يتم تعبئة كافة الصفوف الـ 16 تلقائياً وبسرعة فائقة عبر الجافا سكريبت -->
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- حاسبة الذهب والمصنعية اللحظية -->
  <section id="calculator-section" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-6">
    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#e6dbc8] shadow-sm">
      <div class="text-center mb-8">
        <span class="text-xs font-bold text-[#8c6b23] tracking-widest uppercase block mb-1">دقة الحساب قبل الشراء</span>
        <h3 class="font-amiri text-3xl font-bold text-[#1a1a1a]">حاسبة تكلفة الذهب الفورية</h3>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">احسب القيمة الإجمالية شاملة سعر الجرام والمصنعية والدمغة طبقاً لأسعار اليوم</p>
      </div>

      <!-- تبديل نوع العملية: شراء من المحل أو بيع كاش -->
      <div class="flex justify-center mb-6">
        <div class="inline-flex p-1 bg-[#faf7f2] rounded-2xl border border-[#cfbe9b] text-xs font-bold">
          <button type="button" onclick="setCalcMode('buy_from_shop')" id="calc-mode-buy" class="px-5 py-2 rounded-xl bg-[#b89342] text-white shadow-xs transition">
            شراء ذهب جديد من المحل
          </button>
          <button type="button" onclick="setCalcMode('sell_to_shop')" id="calc-mode-sell" class="px-5 py-2 rounded-xl text-[#433e36] hover:text-[#b89342] transition">
            بيع ذهب قديم للمحل (كاش)
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div>
          <label class="block text-xs font-bold text-[#433e36] mb-2">اختر العيار</label>
          <select id="calc-karat" onchange="runCalculator()" class="w-full bg-[#faf7f2] border border-[#cfbe9b] rounded-xl px-4 py-3 text-sm font-bold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#b89342]">
            <option value="21" selected>عيار 21 (الأكثر تداولاً)</option>
            <option value="24">عيار 24 (السبائك الخالصة)</option>
            <option value="18">عيار 18 (المجوهرات الإيطالية)</option>
            <option value="14">عيار 14 (المصوغات الاقتصادية)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#433e36] mb-2">الوزن الصافي (بالجرام)</label>
          <input type="number" id="calc-weight" value="10" min="0.1" step="0.1" oninput="runCalculator()" class="w-full bg-[#faf7f2] border border-[#cfbe9b] rounded-xl px-4 py-3 text-sm font-bold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#b89342]">
        </div>

        <div>
          <label class="block text-xs font-bold text-[#433e36] mb-2" id="calc-fee-label">المصنعية والدمغة (لكل جرام)</label>
          <input type="number" id="calc-fee" value="80" min="0" step="5" oninput="runCalculator()" class="w-full bg-[#faf7f2] border border-[#cfbe9b] rounded-xl px-4 py-3 text-sm font-bold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#b89342]">
        </div>
      </div>

      <!-- عرض نتيجة الحساب الفورية -->
      <div class="bg-gradient-to-b from-[#faf7f2] to-[#f5ede0] rounded-2xl p-6 border border-[#e6dbc8] text-center">
        <span class="text-xs font-bold text-gray-500 block mb-1" id="calc-result-title">إجمالي القيمة التقديرية</span>
        <div class="flex items-baseline justify-center gap-2">
          <span class="font-sans text-4xl sm:text-5xl font-extrabold text-[#b89342]" id="calc-total">--</span>
          <span class="text-sm font-bold text-gray-700">جنيه مصري</span>
        </div>
        <p class="text-xs text-gray-500 mt-2" id="calc-breakdown">جاري احتساب السعر...</p>
        
        <div class="mt-5">
          <a id="calc-whatsapp-btn" href="#" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient hover:brightness-105 text-white text-xs sm:text-sm font-bold shadow-md transition">
            <span class="material-symbols-outlined text-base">chat</span>
            <span>تثبيت هذا السعر مع الخواجة بيمن ابراهيم عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- قسم عن المحل والمقر الرسمي بأسوان -->
  <section id="store-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#e6dbc8]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <span class="text-xs font-bold text-[#8c6b23] tracking-widest uppercase block mb-2">أمانة وعراقة الصياغة</span>
        <h3 class="font-amiri text-3xl font-bold text-[#1a1a1a] mb-4">مجوهرات الزهرة • محافظة أسوان</h3>
        <p class="text-[#433e36] text-sm leading-relaxed mb-4">
          تعتبر <strong class="text-[#b89342]">مجوهرات الزهرة</strong> تحت إشراف وإدارة <strong class="text-[#b89342]">الخواجة بيمن ابراهيم</strong> من أقدم بيوت الصياغة وتجارة الذهب والسبائك المعتمدة في محافظة أسوان وصعيد مصر.
        </p>
        <p class="text-[#433e36] text-sm leading-relaxed mb-6">
          نوفر أحدث المصوغات والسبائك المغلفة المعتمدة من كبرى الشركات مع فاتورة رسمية معتمدة تثبت الوزن والعيار والدمغة بدقة متناهية.
        </p>

        <div class="space-y-3 text-sm text-[#433e36]">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[#b89342]">location_on</span>
            <span><strong>العنوان:</strong> محافظة أسوان - عمارة متى - شارع كورنيش النيل</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[#b89342]">schedule</span>
            <span><strong>مواعيد العمل:</strong> يومياً من 10:00 صباحاً حتى 10:30 مساءً</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[#b89342]">call</span>
            <span><strong>هاتف الإدارة والمحل:</strong> <span dir="ltr" class="font-bold">01227887660</span></span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6dbc8] shadow-sm text-center overflow-hidden">
        <div class="relative max-w-xs mx-auto mb-4 rounded-2xl overflow-hidden shadow-md border-2 border-[#b89342]/30 aspect-square">
          <img src="images/portrait_manager.jpg" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuB-tM1L_WyRF7etpNBcOD6mP8bftd-rDJR63MGWipiNsFr7rmnjPnTsnJpLYkQciSS0eba-jrgwxZ87pr7Cly01HuH1FV85SgxAeHcFM7oq_wyPtAhkUSwVbRV3BXHzxnqwwk6Tk0lznSxjs898PAjdBKCtweDj5VQDrmjK2qiRGCqjiXMFlFPoLyH_BzE-iuNZsRzuRlZ0qABNK4pkWViybwfnetmbhCqkMRtEQKcZhQleSXSj5q7sy4db8dvFqn1TeLI'" alt="إدارة الخواجة بيمن ابراهيم" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs font-bold font-amiri">
            إدارة الخواجة بيمن ابراهيم - أسوان
          </div>
        </div>
        <h4 class="font-amiri text-2xl font-bold text-[#1a1a1a]">ميثاق الثقة والأمانة</h4>
        <p class="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
          كافة السبائك والمشغولات مفحوصة ومدموغة رسمياً، ويتم وزن كل قطعة على موازين إلكترونية حساسة ومعايرة دورياً من مصلحة الدمغة والموازين.
        </p>
        <div class="mt-6 flex justify-center gap-3">
          <a href="tel:01227887660" class="px-5 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#ede6da] text-[#1a1a1a] text-xs font-bold border border-[#cfbe9b] transition">
            اتصال بالمحل
          </a>
          <a href="https://wa.me/201227887660" target="_blank" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
            محادثة واتساب
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- تذييل الصفحة -->
  <footer class="bg-[#1a1a1a] text-white py-10 mt-12 border-t border-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
      <img src="images/badge_logo.png" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuBC7tTXNPaujsIH9tplS9UOXhlxEQUHtlQybUQTFmv074QfohpP7CO4s2k_e3bDckEGfNLvGbY5m-yMZPMSL0WxylkqnZ8n4skW0WecR211dF4PxvGFQ40q_DxrLoiyKc75apBrtBqZDF1jzCEfPNbaMdM-mXHmBQqV0SVLCarFIn6Bm77YebFbhUHQY2WUDlErLFXofIcZDIGfDcKoB6M3hJO_II_5xuQruQYn_xF3osKItzUQ0V87P7JbnIG3xdsYEU0'" alt="شعار مجوهرات الزهرة" class="w-14 h-14 mx-auto mb-3 object-contain opacity-90" />
      <p class="font-amiri text-xl font-bold text-[#edd8b8] mb-2">مجوهرات الزهرة — إدارة الخواجة بيمن ابراهيم</p>
      <p>محافظة أسوان، عمارة متى، شارع كورنيش النيل • هاتف: 01227887660</p>
      <p class="mt-4 border-t border-gray-800 pt-4 text-gray-500">
        النسخة الرسمية المستقلة الجاهزة للتشغيل المباشر على كافة أنواع الاستضافات المشتركة و cPanel
      </p>
    </div>
  </footer>

  <!-- كود الجافا سكريبت فائق الخفة والسرعة لجلب ومزامنة الأسعار وعرض الجدول والحاسبة -->
  <script>
    let appData = {
      final: {
        '24': { sell: <?= $init24Sell ?>, buy: <?= $init24Buy ?> },
        '22': { sell: <?= round($init24Sell * 22 / 24) ?>, buy: <?= round($init24Buy * 22 / 24) ?> },
        '21': { sell: <?= $init21Sell ?>, buy: <?= $init21Buy ?> },
        '18': { sell: <?= $init18Sell ?>, buy: <?= $init18Buy ?> },
        '14': { sell: <?= round($init21Sell * 14 / 21) ?>, buy: <?= round($init21Buy * 14 / 21) ?> },
        '12': { sell: <?= round($init24Sell * 12 / 24) ?>, buy: <?= round($init24Buy * 12 / 24) ?> }
      },
      coins: {
        pound: { name: 'الجنيه الذهب (8 جرام)', weight: 8, karat: '21', sell: <?= $initPoundSell ?>, buy: <?= $initPoundBuy ?> },
        half_pound: { name: 'نصف جنيه ذهب (4 جرام)', weight: 4, karat: '21', sell: <?= round($init21Sell * 4) ?>, buy: <?= round($init21Buy * 4) ?> },
        quarter_pound: { name: 'ربع جنيه ذهب (2 جرام)', weight: 2, karat: '21', sell: <?= round($init21Sell * 2) ?>, buy: <?= round($init21Buy * 2) ?> },
        five_pounds: { name: 'خمسة جنيهات ذهب (40 جرام)', weight: 40, karat: '21', sell: <?= round($init21Sell * 40) ?>, buy: <?= round($init21Buy * 40) ?> }
      },
      bullions: {
        b_1g: { name: 'سبيكة 1 جرام BTC معتمدة', weight: 1, sell: <?= $init24Sell + 85 ?>, buy: <?= $init24Buy ?> },
        b_2_5g: { name: 'سبيكة 2.5 جرام معتمدة', weight: 2.5, sell: <?= round($init24Sell * 2.5 + 140) ?>, buy: <?= round($init24Buy * 2.5) ?> },
        b_5g: { name: 'سبيكة 5 جرام معتمدة', weight: 5, sell: <?= round($init24Sell * 5 + 220) ?>, buy: <?= round($init24Buy * 5) ?> },
        b_10g: { name: 'سبيكة 10 جرام معتمدة', weight: 10, sell: <?= round($init24Sell * 10 + 380) ?>, buy: <?= round($init24Buy * 10) ?> },
        b_20g: { name: 'سبيكة 20 جرام معتمدة', weight: 20, sell: <?= round($init24Sell * 20 + 700) ?>, buy: <?= round($init24Buy * 20) ?> },
        b_31_1g: { name: 'سبيكة أونصة (31.10 جرام)', weight: 31.10, sell: <?= round($init24Sell * 31.10 + 950) ?>, buy: <?= round($init24Buy * 31.10) ?> },
        b_50g: { name: 'سبيكة 50 جرام معتمدة', weight: 50, sell: <?= round($init24Sell * 50 + 1400) ?>, buy: <?= round($init24Buy * 50) ?> },
        b_100g: { name: 'سبيكة 100 جرام معتمدة', weight: 100, sell: <?= round($init24Sell * 100 + 2500) ?>, buy: <?= round($init24Buy * 100) ?> }
      },
      ounce: <?= $initOunce ?>,
      saghaUsd: <?= $initUsd ?>
    };

    let activeFilter = 'all';
    let calcMode = 'buy_from_shop';

    // جلب ومزامنة الأسعار
    async function loadPrices(isManual = false) {
      const spinner = document.getElementById('refresh-spin');
      if (spinner && isManual) spinner.classList.add('animate-spin');

      try {
        let url = 'get_prices.php' + (isManual ? '?refresh=true' : '');
        let res = await fetch(url).catch(() => null);

        if (!res || !res.ok) {
          // محاولة بديلة من ملف الكاش المباشر
          res = await fetch('prices_cache.json').catch(() => null);
        }

        if (res && res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (data && data.final) {
            appData = Object.assign(appData, data);
            updateCardsAndRibbon(data);
            renderTable();
            document.getElementById('ribbon-time').innerText = 'آخر تحديث: ' + new Date().toLocaleTimeString('ar-EG');
          }
        }
      } catch (err) {
        console.warn('Price sync note:', err);
      } finally {
        if (spinner) spinner.classList.remove('animate-spin');
        runCalculator();
      }
    }

    // تحديث بطاقات العرض العلوية والشريط
    function updateCardsAndRibbon(data) {
      if (data.final['21']) {
        document.getElementById('card-sell-21').innerText = Number(data.final['21'].sell).toLocaleString('en-US');
        document.getElementById('card-buy-21').innerText = Number(data.final['21'].buy).toLocaleString('en-US');
      }
      if (data.final['24']) {
        document.getElementById('card-sell-24').innerText = Number(data.final['24'].sell).toLocaleString('en-US');
        document.getElementById('card-buy-24').innerText = Number(data.final['24'].buy).toLocaleString('en-US');
      }
      if (data.final['18']) {
        document.getElementById('card-sell-18').innerText = Number(data.final['18'].sell).toLocaleString('en-US');
        document.getElementById('card-buy-18').innerText = Number(data.final['18'].buy).toLocaleString('en-US');
      }
      if (data.coins && data.coins.pound) {
        document.getElementById('card-sell-pound').innerText = Number(data.coins.pound.sell).toLocaleString('en-US');
        document.getElementById('card-buy-pound').innerText = Number(data.coins.pound.buy).toLocaleString('en-US');
      } else if (data.final['21']) {
        const pSell = Math.round(data.final['21'].sell * 8);
        const pBuy = Math.round(data.final['21'].buy * 8);
        document.getElementById('card-sell-pound').innerText = pSell.toLocaleString('en-US');
        document.getElementById('card-buy-pound').innerText = pBuy.toLocaleString('en-US');
      }

      if (data.ounce) {
        document.getElementById('ribbon-ounce').innerText = '$' + Number(data.ounce).toLocaleString('en-US', { minimumFractionDigits: 2 });
      }
      if (data.saghaUsd) {
        document.getElementById('ribbon-usd').innerText = Number(data.saghaUsd).toFixed(2) + ' ج.م';
      }
    }

    // بناء قائمة الأصناف لجدول الأسعار
    function getTableItems() {
      const items = [];

      // 1. العيارات
      const karatsList = [
        { k: '24', name: 'عيار 24 (ذهب خالص / سبائك)', stamp: 'نقاء 999.9', cat: 'karats' },
        { k: '22', name: 'عيار 22 (ذهب خليجي)', stamp: 'نقاء 916', cat: 'karats' },
        { k: '21', name: 'عيار 21 (الرئيسي الأكثر طلباً)', stamp: 'نقاء 875', cat: 'karats', highlight: true },
        { k: '18', name: 'عيار 18 (المجوهرات الإيطالية)', stamp: 'نقاء 750', cat: 'karats' },
        { k: '14', name: 'عيار 14 (المصوغات الاقتصادية)', stamp: 'نقاء 583', cat: 'karats' },
        { k: '12', name: 'عيار 12 (التجاري)', stamp: 'نقاء 500', cat: 'karats' },
      ];

      for (const item of karatsList) {
        const val = appData.final[item.k] || { sell: 0, buy: 0 };
        items.push({
          category: 'karats',
          name: item.name,
          stamp: item.stamp,
          karatText: 'عيار ' + item.k,
          buy: val.buy,
          sell: val.sell,
          highlight: !!item.highlight,
          waText: encodeURIComponent(`مرحباً مجوهرات الزهرة، أود الاستفسار وتثبيت سعر ${item.name} بسعر بيع ${val.sell} ج.م`)
        });
      }

      // 2. العملات والجنيهات
      if (appData.coins) {
        for (const key in appData.coins) {
          const coin = appData.coins[key];
          items.push({
            category: 'coins',
            name: coin.name,
            stamp: `وزن ${coin.weight} جرام`,
            karatText: 'عيار 21 معتمد',
            buy: coin.buy,
            sell: coin.sell,
            highlight: key === 'pound',
            waText: encodeURIComponent(`مرحباً مجوهرات الزهرة، أود حجز ${coin.name} بسعر ${coin.sell} ج.م`)
          });
        }
      }

      // 3. السبائك المعتمدة
      if (appData.bullions) {
        for (const key in appData.bullions) {
          const b = appData.bullions[key];
          items.push({
            category: 'bullions',
            name: b.name,
            stamp: `وزن ${b.weight} جم (999.9)`,
            karatText: 'عيار 24 خالص',
            buy: b.buy,
            sell: b.sell,
            highlight: false,
            waText: encodeURIComponent(`مرحباً مجوهرات الزهرة، أود حجز ${b.name} بسعر ${b.sell} ج.م`)
          });
        }
      }

      return items;
    }

    // تصفية وعرض جدول الأسعار
    function filterTable(cat) {
      activeFilter = cat;
      ['all', 'karats', 'coins', 'bullions'].forEach(c => {
        const el = document.getElementById('tab-' + c);
        if (el) {
          if (c === cat) {
            el.className = 'px-3.5 py-1.5 rounded-xl bg-[#b89342] text-white shadow-xs transition';
          } else {
            el.className = 'px-3.5 py-1.5 rounded-xl text-[#433e36] hover:text-[#b89342] transition';
          }
        }
      });
      renderTable();
    }

    function renderTable() {
      const tbody = document.getElementById('rates-table-body');
      if (!tbody) return;

      const items = getTableItems();
      const filtered = activeFilter === 'all' ? items : items.filter(i => i.category === activeFilter);

      let html = '';
      filtered.forEach(item => {
        const isHigh = item.highlight ? 'bg-[#faf6ee]' : 'hover:bg-[#faf8f5]';
        html += `
          <tr class="${isHigh} transition-colors">
            <td class="py-4 px-5">
              <div class="flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full ${item.highlight ? 'bg-[#b89342]' : 'bg-[#cfbe9b]'}"></span>
                <div>
                  <span class="font-bold text-[#1a1a1a] block">${item.name}</span>
                  <span class="text-[11px] text-gray-500">${item.stamp}</span>
                </div>
              </div>
            </td>
            <td class="py-4 px-4 text-center">
              <span class="px-2.5 py-1 rounded-full bg-[#f7f1e5] text-[#8c6b23] text-xs font-bold border border-[#cfbe9b]/50">
                ${item.karatText}
              </span>
            </td>
            <td class="py-4 px-4 text-center bg-[#fdfbf7] font-sans font-bold text-gray-800">
              ${Number(item.buy).toLocaleString('en-US')} ج.م
            </td>
            <td class="py-4 px-5 text-center font-sans font-extrabold text-[#b89342] text-base">
              ${Number(item.sell).toLocaleString('en-US')} ج.م
            </td>
            <td class="py-4 px-5 text-center">
              <a href="https://wa.me/201227887660?text=${item.waText}" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold border border-emerald-300 transition-all shadow-xs">
                <span class="material-symbols-outlined text-sm">chat</span>
                <span>تثبيت</span>
              </a>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
    }

    // منطق حاسبة الذهب والمصنعية
    function setCalcMode(mode) {
      calcMode = mode;
      const buyBtn = document.getElementById('calc-mode-buy');
      const sellBtn = document.getElementById('calc-mode-sell');
      const feeInput = document.getElementById('calc-fee');
      const feeLabel = document.getElementById('calc-fee-label');
      const title = document.getElementById('calc-result-title');

      if (mode === 'buy_from_shop') {
        buyBtn.className = 'px-5 py-2 rounded-xl bg-[#b89342] text-white shadow-xs transition';
        sellBtn.className = 'px-5 py-2 rounded-xl text-[#433e36] hover:text-[#b89342] transition';
        feeInput.disabled = false;
        feeInput.value = '80';
        feeLabel.innerText = 'المصنعية والدمغة (لكل جرام)';
        title.innerText = 'إجمالي تكلفة الشراء من المحل';
      } else {
        sellBtn.className = 'px-5 py-2 rounded-xl bg-[#b89342] text-white shadow-xs transition';
        buyBtn.className = 'px-5 py-2 rounded-xl text-[#433e36] hover:text-[#b89342] transition';
        feeInput.disabled = true;
        feeInput.value = '0';
        feeLabel.innerText = 'البيع كاش (بدون مصنعية)';
        title.innerText = 'المبلغ المستحق لك نقداً (كاش)';
      }
      runCalculator();
    }

    function runCalculator() {
      const karat = document.getElementById('calc-karat').value;
      const weight = parseFloat(document.getElementById('calc-weight').value) || 0;
      const fee = calcMode === 'buy_from_shop' ? (parseFloat(document.getElementById('calc-fee').value) || 0) : 0;

      const karatData = appData.final[karat] || { sell: 6150, buy: 6090 };
      const unitPrice = calcMode === 'buy_from_shop' ? karatData.sell : karatData.buy;

      const gramTotal = unitPrice + fee;
      const grandTotal = Math.round(weight * gramTotal);

      document.getElementById('calc-total').innerText = grandTotal.toLocaleString('en-US');

      const opType = calcMode === 'buy_from_shop' ? 'شراء' : 'بيع كاش';
      const breakdownText = `${weight} جرام × (${unitPrice.toLocaleString('en-US')} ج.م ${fee > 0 ? '+ مصنعية ' + fee + ' ج' : ''})`;
      document.getElementById('calc-breakdown').innerText = breakdownText;

      const waMsg = encodeURIComponent(
        `مرحباً مجوهرات الزهرة (إدارة الخواجة بيمن ابراهيم)، أود الاستفسار وحجز تسعيرة ${opType} ذهب عيار ${karat} لوزن ${weight} جرام بسعر جرام ${unitPrice.toLocaleString('en-US')} ج.م ${fee > 0 ? '(المصنعية: ' + fee + ' ج/جم)' : ''} بإجمالي ${grandTotal.toLocaleString('en-US')} جنيه مصري.`
      );
      document.getElementById('calc-whatsapp-btn').href = `https://wa.me/201227887660?text=${waMsg}`;
    }

    // بدء التشغيل فور تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
      renderTable();
      runCalculator();
      loadPrices(false);

      // تحديث تلقائي لطيف كل 30 ثانية
      setInterval(() => loadPrices(false), 30000);
    });
  </script>
</body>
</html>
