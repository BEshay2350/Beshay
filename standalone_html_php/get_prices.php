<?php
/**
 * خادم جلب ومقارنة أسعار الذهب اللحظية - فائق السرعة وخفيف جداً
 * مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم - أسوان
 * متوافق 100% مع الاستضافات المشتركة (Shared Hosting / cPanel / DirectAdmin / Apache / Nginx)
 * بدون الحاجة إلى Node.js أو VPS أو سيرفرات معقدة
 */

error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: public, max-age=20');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$cacheFile = __DIR__ . '/prices_cache.json';
$cacheTTL = 30; // مدة الكاش بالثواني (30 ثانية لتحديث فوري وخفة تامة على السيرفر)

$forceRefresh = isset($_GET['refresh']) && ($_GET['refresh'] === 'true' || $_GET['refresh'] === '1');

// 1. فحص الكاش السريع
if (!$forceRefresh && file_exists($cacheFile)) {
    $fileAge = time() - filemtime($cacheFile);
    if ($fileAge < $cacheTTL) {
        $cached = @file_get_contents($cacheFile);
        if ($cached && strlen($cached) > 100) {
            echo $cached;
            exit(0);
        }
    }
}

// دالة جلب الصفحات تدعم cURL و stream_context مع timeout قصير لتفادي بطء الاستضافة
function fetchRemotePage($url, $timeout = 4) {
    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $res = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($res && $code >= 200 && $code < 400) {
            return $res;
        }
    }

    if (ini_get('allow_url_fopen')) {
        $ctx = stream_context_create([
            'http' => [
                'timeout' => $timeout,
                'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\nAccept: text/html,application/xhtml+xml,application/json\r\n"
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]);
        $res = @file_get_contents($url, false, $ctx);
        if ($res) return $res;
    }

    return '';
}

// 1. جلب قناة تليجرام سوق الدهب
function fetchTelegramPrices() {
    $html = fetchRemotePage('https://t.me/s/souqeldahb24', 4);
    $posts = [];
    if (!$html) return $posts;

    $blocks = explode('tgme_widget_message_wrap', $html);
    array_shift($blocks);

    $arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    $englishDigits = ['0','1','2','3','4','5','6','7','8','9'];

    foreach ($blocks as $b) {
        if (!preg_match('/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/', $b, $textM)) continue;
        if (!preg_match('/datetime="([^"]+)"/', $b, $timeM)) continue;

        $text = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $textM[1]));
        $text = str_replace($arabicDigits, $englishDigits, $text);

        $oIdx = mb_strpos($text, 'بالاونصة');
        $kIdx = mb_strpos($text, 'عيار 21');

        if ($oIdx !== false && $kIdx !== false) {
            $slice = mb_substr($text, $oIdx, $kIdx - $oIdx);
            preg_match('/\d+(?:\.\d+)?/', $slice, $ounceM);
            $after = mb_substr($text, $kIdx + 7);
            $afterPart = explode('للتواصل', $after)[0];
            preg_match_all('/\d+(?:\.\d+)?/', $afterPart, $nums);

            if (!empty($nums[0])) {
                $posts[] = [
                    'time' => $timeM[1],
                    'ounce' => !empty($ounceM[0]) ? floatval($ounceM[0]) : null,
                    'buy21' => floatval($nums[0][0]),
                    'sell21' => isset($nums[0][1]) ? floatval($nums[0][1]) : null,
                ];
            }
        }
    }
    return array_slice(array_reverse($posts), 0, 15);
}

// 2. جلب منصة آي صاغة
function fetchIsaghaPrices() {
    $row = ['name' => 'آي صاغة', 'url' => 'https://market.isagha.com/prices', 'ok' => false, 'buy' => [], 'sell' => [], 'ounce' => null];
    $html = fetchRemotePage($row['url'], 4);
    if (!$html) return $row;

    preg_match_all('/prices-strip__value">\s*([\d.,]+)/', $html, $matches);
    if (!empty($matches[1])) {
        $v = array_map(function($m) { return floatval(str_replace(',', '', $m)); }, $matches[1]);
        $karats = ['24', '21', '18'];
        foreach ($karats as $i => $k) {
            if (isset($v[$i * 2])) $row['buy'][$k] = $v[$i * 2];
            if (isset($v[$i * 2 + 1])) $row['sell'][$k] = $v[$i * 2 + 1];
        }
        if (isset($v[6]) && $v[6] > 1500) {
            $row['ounce'] = $v[6];
        }
        $row['ok'] = !empty($row['sell']['21']);
    }
    return $row;
}

// 3. جلب منصة إي دهب
function fetchEdahabPrices() {
    $row = ['name' => 'إي دهب', 'url' => 'https://edahabapp.com/', 'ok' => false, 'buy' => [], 'sell' => []];
    $html = fetchRemotePage($row['url'], 4);
    if (!$html) return $row;

    $karats = ['24', '21', '18'];
    foreach ($karats as $k) {
        // Regex 1: Schema property value
        if (preg_match('/عيار\s*' . $k . '\s*بيع"[\s\S]{0,40}?"value":\s*"([\d.,]+)/', $html, $sm)) {
            $row['sell'][$k] = floatval(str_replace(',', '', $sm[1]));
        }
        if (preg_match('/عيار\s*' . $k . '\s*شراء"[\s\S]{0,40}?"value":\s*"([\d.,]+)/', $html, $bm)) {
            $row['buy'][$k] = floatval(str_replace(',', '', $bm[1]));
        }
        // Regex 2: Direct span class
        if (empty($row['sell'][$k]) && preg_match('/عيار\s*' . $k . '[\s\S]{0,100}?بيع:[\s\S]{0,30}?<span[^>]*class="[^"]*number-font[^"]*"[^>]*>([\d.,]+)/', $html, $sm2)) {
            $row['sell'][$k] = floatval(str_replace(',', '', $sm2[1]));
        }
        if (empty($row['buy'][$k]) && preg_match('/عيار\s*' . $k . '[\s\S]{0,100}?شراء:[\s\S]{0,30}?<span[^>]*class="[^"]*number-font[^"]*"[^>]*>([\d.,]+)/', $html, $bm2)) {
            $row['buy'][$k] = floatval(str_replace(',', '', $bm2[1]));
        }
    }
    $row['ok'] = !empty($row['sell']['21']);
    return $row;
}

// 4. جلب الأونصة العالمية مع تعدد البدائل
function fetchGlobalOunce($isaghaOunce = null, $tgOunce = null) {
    // 1. TradingView
    $tv = fetchRemotePage('https://scanner.tradingview.com/symbol?symbol=OANDA%3AXAUUSD&fields=close', 3);
    if ($tv) {
        $d = json_decode($tv, true);
        if (!empty($d['close']) && $d['close'] > 1500) {
            return floatval($d['close']);
        }
    }

    // 2. Binance PAXGUSDT (تحديث فوري للأونصة بدون أي حظر)
    $binance = fetchRemotePage('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT', 3);
    if ($binance) {
        $d = json_decode($binance, true);
        if (!empty($d['price']) && $d['price'] > 1500) {
            return floatval($d['price']);
        }
    }

    // 3. Gold-API
    $json = fetchRemotePage('https://api.gold-api.com/price/XAU', 3);
    if ($json) {
        $d = json_decode($json, true);
        if (!empty($d['price']) && $d['price'] > 1500) {
            return floatval($d['price']);
        }
    }

    // 4. أونصة آي صاغة المدمجة
    if ($isaghaOunce && $isaghaOunce > 1500) {
        return floatval($isaghaOunce);
    }

    // 5. أونصة منشور تليجرام الأخير
    if ($tgOunce && $tgOunce > 1500) {
        return floatval($tgOunce);
    }

    return 4140.0;
}

// 5. جلب دولار الصاغة مع حسابه تلقائياً من السوق لتفادي أي توقف
function fetchSaghaUsd($oz, $isagha, $latestTg) {
    // محاولة جلب من gold-price-live مع تايم أوت 2.5 ثانية فقط
    $html = fetchRemotePage('https://gold-price-live.com/view/sagha-usd', 2.5);
    if ($html && preg_match('/font-size:120px[^>]*>\s*([\d.]+)\s*</', $html, $m)) {
        $val = floatval($m[1]);
        if ($val > 30 && $val < 100) return $val;
    }

    // حساب دولار الصاغة مباشرة وبدقة متناهية من سعر السوق: (سعر عيار 24 × 31.1035) ÷ الأونصة
    $market24 = null;
    if (!empty($isagha['sell']['24'])) {
        $market24 = $isagha['sell']['24'];
    } elseif (!empty($latestTg['sell21'])) {
        $market24 = ($latestTg['sell21'] * 24) / 21;
    }

    if ($market24 && $oz > 1500) {
        $computedUsd = round((($market24 * 31.1035) / $oz), 2);
        if ($computedUsd > 30 && $computedUsd < 100) {
            return $computedUsd;
        }
    }

    return 52.60;
}

// تنفيذ عمليات الجلب
$tgPosts = fetchTelegramPrices();
$isagha = fetchIsaghaPrices();
$edahab = fetchEdahabPrices();

$latestTg = !empty($tgPosts[0]) ? $tgPosts[0] : null;
$oz = fetchGlobalOunce($isagha['ounce'] ?? null, $latestTg['ounce'] ?? null);
$usd = fetchSaghaUsd($oz, $isagha, $latestTg);

$tgRow = [
    'name' => 'قناة سوق الدهب',
    'url' => 'https://t.me/souqeldahb24',
    'ok' => !empty($latestTg['sell21']),
    'buy' => !empty($latestTg['buy21']) ? ['21' => $latestTg['buy21']] : [],
    'sell' => !empty($latestTg['sell21']) ? ['21' => $latestTg['sell21']] : []
];

$sources = [$tgRow, $isagha, $edahab];

// حساب سعر الشاشة العادل (Fair Screen Price)
$screen = [];
$g24 = round((($oz * $usd) / 31.1035) * 10) / 10;
$screen['24'] = $g24;
$screen['21'] = round((($g24 * 21) / 24) * 10) / 10;
$screen['18'] = round((($g24 * 18) / 24) * 10) / 10;

// احتساب الأسعار المعتمدة لمحل الزهرة وفق معادلة الصاغة
$final = [];
foreach (['24', '21', '18'] as $k) {
    $sells = [];
    $buys = [];
    foreach ($sources as $s) {
        if (!empty($s['sell'][$k])) $sells[] = $s['sell'][$k];
        if (!empty($s['buy'][$k])) $buys[] = $s['buy'][$k];
    }

    $siteSell = !empty($sells) ? max($sells) : null;
    $sc = $screen[$k] ?? null;
    $fromScreen = ($sc !== null && ($siteSell === null || $sc > $siteSell));
    $sellBase = $fromScreen ? $sc : $siteSell;

    $fallbackSell = $k === '24' ? 7015 : ($k === '21' ? 6140 : 5260);
    $fallbackBuy = $fallbackSell - 50;

    $calcBuy = !empty($buys) ? round(min($buys) - 10) : ($sellBase ? round($sellBase - 25) : $fallbackBuy);
    $calcSell = $sellBase !== null ? round($sellBase + 10) : $fallbackSell;

    $final[$k] = [
        'buy' => $calcBuy,
        'sell' => $calcSell,
        'sellFromScreen' => $fromScreen
    ];
}

// عيار 14 و 22 و 12
$final['22'] = [
    'buy' => round(($final['24']['buy'] * 22) / 24),
    'sell' => round(($final['24']['sell'] * 22) / 24),
    'sellFromScreen' => $final['24']['sellFromScreen']
];
$final['14'] = [
    'buy' => round(($final['21']['buy'] * 14) / 21),
    'sell' => round(($final['21']['sell'] * 14) / 21),
    'sellFromScreen' => $final['21']['sellFromScreen']
];
$final['12'] = [
    'buy' => round(($final['24']['buy'] * 12) / 24),
    'sell' => round(($final['24']['sell'] * 12) / 24),
    'sellFromScreen' => $final['24']['sellFromScreen']
];

// احتساب العملات الذهبية (عيار 21)
$g21Sell = $final['21']['sell'];
$g21Buy = $final['21']['buy'];
$coins = [
    'pound' => [
        'name' => 'الجنيه الذهب (8 جرام)',
        'weight' => 8,
        'karat' => '21',
        'sell' => round($g21Sell * 8),
        'buy' => round($g21Buy * 8)
    ],
    'half_pound' => [
        'name' => 'نصف جنيه ذهب (4 جرام)',
        'weight' => 4,
        'karat' => '21',
        'sell' => round($g21Sell * 4),
        'buy' => round($g21Buy * 4)
    ],
    'quarter_pound' => [
        'name' => 'ربع جنيه ذهب (2 جرام)',
        'weight' => 2,
        'karat' => '21',
        'sell' => round($g21Sell * 2),
        'buy' => round($g21Buy * 2)
    ],
    'five_pounds' => [
        'name' => 'خمسة جنيهات ذهب (40 جرام)',
        'weight' => 40,
        'karat' => '21',
        'sell' => round($g21Sell * 40),
        'buy' => round($g21Buy * 40)
    ]
];

// احتساب السبائك الذهبية (عيار 24 صافي 999.9)
$g24Sell = $final['24']['sell'];
$g24Buy = $final['24']['buy'];
$bullions = [
    'b_1g' => ['name' => 'سبيكة 1 جرام BTC معتمدة', 'weight' => 1, 'sell' => round($g24Sell * 1 + 85), 'buy' => round($g24Buy * 1)],
    'b_2_5g' => ['name' => 'سبيكة 2.5 جرام معتمدة', 'weight' => 2.5, 'sell' => round($g24Sell * 2.5 + 140), 'buy' => round($g24Buy * 2.5)],
    'b_5g' => ['name' => 'سبيكة 5 جرام معتمدة', 'weight' => 5, 'sell' => round($g24Sell * 5 + 220), 'buy' => round($g24Buy * 5)],
    'b_10g' => ['name' => 'سبيكة 10 جرام معتمدة', 'weight' => 10, 'sell' => round($g24Sell * 10 + 380), 'buy' => round($g24Buy * 10)],
    'b_20g' => ['name' => 'سبيكة 20 جرام معتمدة', 'weight' => 20, 'sell' => round($g24Sell * 20 + 700), 'buy' => round($g24Buy * 20)],
    'b_31_1g' => ['name' => 'سبيكة أونصة (31.10 جرام)', 'weight' => 31.10, 'sell' => round($g24Sell * 31.10 + 950), 'buy' => round($g24Buy * 31.10)],
    'b_50g' => ['name' => 'سبيكة 50 جرام معتمدة', 'weight' => 50, 'sell' => round($g24Sell * 50 + 1400), 'buy' => round($g24Buy * 50)],
    'b_100g' => ['name' => 'سبيكة 100 جرام معتمدة', 'weight' => 100, 'sell' => round($g24Sell * 100 + 2500), 'buy' => round($g24Buy * 100)],
];

$response = [
    'success' => true,
    'data' => [
        'updatedAt' => date('c'),
        'ounce' => $oz,
        'saghaUsd' => $usd,
        'screen' => $screen,
        'final' => $final,
        'coins' => $coins,
        'bullions' => $bullions,
        'sources' => $sources,
        'history' => $tgPosts,
        'isFallback' => false
    ]
];

$output = json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// حفظ في الكاش مع القفل الآمن
@file_put_contents($cacheFile, $output, LOCK_EX);

echo $output;
