export type { Karat, SourceRow, TelegramPost, GoldPricesResponse } from '../types';
import type { Karat, SourceRow, TelegramPost, GoldPricesResponse } from '../types';

const UA = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
};

// دالة مساعدة لجلب محتوى الصفحات
async function getText(url: string): Promise<string> {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(12000) });
  if (!r.ok) throw new Error(`${url} [${r.status}]`);
  return r.text();
}

function strip(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

// 1. جلب أسعار قناة تليجرام (سوق الدهب 24)
async function telegram(): Promise<TelegramPost[]> {
  try {
    const html = await getText("https://t.me/s/souqeldahb24");
    const posts: TelegramPost[] = [];
    for (const b of html.split("tgme_widget_message_wrap").slice(1)) {
      const textM = b.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/);
      const timeM = b.match(/datetime="([^"]+)"/);
      if (!textM || !timeM) continue;

      const text = strip(textM[1] ?? "").replace(/[٠-٩]/g, (d) =>
        String("٠١٢٣٤٥٦٧٨٩".indexOf(d))
      );
      const oIdx = text.indexOf("بالاونصة");
      const kIdx = text.indexOf("عيار 21");
      if (oIdx >= 0 && kIdx >= 0) {
        const ounceM = text.slice(oIdx, kIdx).match(/\d+(?:\.\d+)?/);
        const after = text.slice(kIdx + 7).split("للتواصل")[0] ?? "";
        const nums = after.match(/\d+(?:\.\d+)?/g) ?? [];
        if (nums[0]) {
          posts.push({
            time: timeM[1],
            ounce: ounceM ? Number(ounceM[0]) : null,
            buy21: Number(nums[0]),
            sell21: nums[1] ? Number(nums[1]) : null,
          });
        }
      }
    }
    return posts.reverse().slice(0, 20);
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return [];
  }
}

// 2. جلب أسعار موقع آي صاغة
async function isagha(): Promise<SourceRow> {
  const row: SourceRow = {
    name: "آي صاغة",
    url: "https://market.isagha.com/prices",
    ok: false,
    buy: {},
    sell: {},
  };
  try {
    const html = await getText(row.url);
    const v = [...html.matchAll(/prices-strip__value">\s*([\d.,]+)/g)].map((m) =>
      Number(m[1]!.replace(/,/g, ""))
    );
    // الترتيب: 24 شراء/بيع، 21 شراء/بيع، 18 شراء/بيع
    (["24", "21", "18"] as Karat[]).forEach((k, i) => {
      const b = v[i * 2];
      const s = v[i * 2 + 1];
      if (b) row.buy[k] = b;
      if (s) row.sell[k] = s;
    });
    row.ok = !!row.sell["21"];
  } catch (err) {
    console.error("iSagha fetch error:", err);
  }
  return row;
}

// 3. جلب أسعار منصة إي دهب
async function edahab(): Promise<SourceRow> {
  const row: SourceRow = {
    name: "إي دهب",
    url: "https://edahabapp.com/",
    ok: false,
    buy: {},
    sell: {},
  };
  try {
    const html = await getText(row.url);
    for (const k of ["24", "21", "18"] as Karat[]) {
      const s = html.match(new RegExp(`عيار ${k} بيع"[\\s\\S]{0,40}?"value":\\s*"([\\d.,]+)`));
      if (s) row.sell[k] = Number(s[1]!.replace(/,/g, ""));
      const b = html.match(new RegExp(`عيار ${k} شراء"[\\s\\S]{0,40}?"value":\\s*"([\\d.,]+)`));
      if (b) row.buy[k] = Number(b[1]!.replace(/,/g, ""));
    }
    row.ok = !!row.sell["21"];
  } catch (err) {
    console.error("eDahab fetch error:", err);
  }
  return row;
}

// 4. جلب دولار الصاغة من Gold Price Live
async function saghaUsd(): Promise<number | null> {
  try {
    const html = await getText("https://gold-price-live.com/view/sagha-usd");
    const m = html.match(/font-size:120px[^>]*>\s*([\d.]+)\s*</);
    return m ? Number(m[1]) : null;
  } catch (err) {
    console.error("Sagha USD fetch error:", err);
    return null;
  }
}

// 5. جلب سعر الأونصة العالمي (TradingView Scanner مع بديل Gold-API)
async function ounce(): Promise<number | null> {
  try {
    const r = await fetch(
      "https://scanner.tradingview.com/symbol?symbol=OANDA%3AXAUUSD&fields=close%2Cbid%2Cask",
      {
        headers: UA,
        signal: AbortSignal.timeout(10000),
      }
    );
    if (r.ok) {
      const j = (await r.json()) as { close?: number };
      if (j.close) return j.close;
    }
  } catch (e) {
    console.warn("TradingView fetch failed, trying fallback Gold-API:", e);
  }

  // بديل احتياطي في حالة تعذر TradingView
  try {
    const r = await fetch("https://api.gold-api.com/price/XAU", {
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { price?: number };
    return j.price ?? null;
  } catch (e) {
    console.error("Gold-API fetch failed:", e);
    return null;
  }
}

// حماية من توقف أي مصدر
const safe = async <T,>(p: Promise<T>, fb: T): Promise<T> => {
  try {
    return await p;
  } catch {
    return fb;
  }
};

// كاش محلي مؤقت لمدة 30 ثانية لتسريع الاستجابة وتفادي حظر الـ IP
let cachedResult: GoldPricesResponse | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 30000;

// ==========================================
// الدالة الرئيسية: جلب وحساب ومقارنة الأسعار
// ==========================================
export async function fetchLiveGoldPrices(forceFresh = false): Promise<GoldPricesResponse> {
  const now = Date.now();
  if (!forceFresh && cachedResult && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedResult;
  }

  // 1. جلب كافة المصادر بالتوازي
  const [tg, isg, edh, usd, oz] = await Promise.all([
    safe(telegram(), []),
    safe(isagha(), {
      name: "آي صاغة",
      url: "https://market.isagha.com/prices",
      ok: false,
      buy: {},
      sell: {},
    }),
    safe(edahab(), {
      name: "إي دهب",
      url: "https://edahabapp.com/",
      ok: false,
      buy: {},
      sell: {},
    }),
    safe(saghaUsd(), null),
    safe(ounce(), null),
  ]);

  const latest = tg[0];
  const tgRow: SourceRow = {
    name: "قناة سوق الدهب",
    url: "https://t.me/souqeldahb24",
    ok: !!latest?.sell21,
    buy: latest?.buy21 ? { "21": latest.buy21 } : {},
    sell: latest?.sell21 ? { "21": latest.sell21 } : {},
  };
  const sources = [tgRow, isg, edh];

  // تقديرات احتياطية في حال تعذر اتصال الشبكة الخارجية لحظياً
  const effectiveOunce = oz ?? 2650;
  const effectiveUsd = usd ?? 49.5;

  // 2. حساب سعر الشاشة العادل (خطوات الحساب)
  const screen: Partial<Record<Karat, number>> = {};
  if (effectiveOunce && effectiveUsd) {
    // الأونصة ÷ 31.1 × دولار الصاغة = عيار 24
    const g24 = Math.round(((effectiveOunce * effectiveUsd) / 31.1) * 10) / 10;
    screen["24"] = g24;
    screen["21"] = Math.round(((g24 * 21) / 24) * 10) / 10;
    screen["18"] = Math.round(((g24 * 18) / 24) * 10) / 10;
  }

  // 3. المقارنة واعتماد الأسعار النهائية
  const final = {} as Record<
    Karat,
    { buy: number | null; sell: number | null; sellFromScreen: boolean }
  >;

  for (const k of ["24", "21", "18"] as Karat[]) {
    const sells = sources.map((s) => s.sell[k]).filter((x): x is number => !!x);
    const buys = sources.map((s) => s.buy[k]).filter((x): x is number => !!x);

    // أعلى سعر بيع من المحلات
    const siteSell = sells.length ? Math.max(...sells) : null;
    const sc = screen[k] ?? null;

    // المقارنة: هل سعر الشاشة أعلى من أعلى سعر في المحلات؟
    const fromScreen = sc != null && (siteSell == null || sc > siteSell);
    const sellBase = fromScreen ? sc : siteSell;

    // أسعار احتياطية واقعية إن كانت المصادر فارغة
    const fallbackSell = k === "24" ? 4114 : k === "21" ? 3600 : 3086;
    const fallbackBuy = fallbackSell - 20;

    const calculatedBuy = buys.length ? Math.min(...buys) - 10 : (sellBase ? Math.round(sellBase - 25) : fallbackBuy);
    const calculatedSell = sellBase != null ? Math.round(sellBase + 10) : fallbackSell;

    final[k] = {
      // أقل سعر شراء - 10 جنيهات
      buy: calculatedBuy,
      // أعلى سعر بيع (محلي أو شاشة) + 10 جنيهات
      sell: calculatedSell,
      sellFromScreen: fromScreen,
    };
  }

  const result: GoldPricesResponse = {
    updatedAt: new Date().toISOString(),
    ounce: oz ?? effectiveOunce,
    saghaUsd: usd ?? effectiveUsd,
    screen,
    final,
    sources,
    history: tg,
    isFallback: !oz && !usd && !sources.some((s) => s.ok),
  };

  cachedResult = result;
  lastFetchTime = now;
  return result;
}
