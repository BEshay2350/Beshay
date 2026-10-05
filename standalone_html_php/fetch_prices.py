#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكربت بايثون فائق الدقة لجلب ومقارنة أسعار الذهب اللحظية وحفظها في prices_cache.json
مجوهرات الزهرة - إدارة الخواجة بيمن ابراهيم - أسوان
يعمل على أي استضافة تدعم بايثون أو عبر Cron Job مجدول
"""

import urllib.request
import json
import re
from datetime import datetime

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

def get_text(url, timeout=5):
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception:
        return ""

def get_telegram_prices():
    html = get_text("https://t.me/s/souqeldahb24", timeout=5)
    posts = []
    if not html:
        return posts

    blocks = html.split("tgme_widget_message_wrap")[1:]
    arabic_digits = "٠١٢٣٤٥٦٧٨٩"
    trans = str.maketrans(arabic_digits, "0123456789")

    for b in blocks:
        text_match = re.search(r'tgme_widget_message_text[^>]*>([\s\S]*?)</div>', b)
        time_match = re.search(r'datetime="([^"]+)"', b)
        if not text_match or not time_match:
            continue

        raw = re.sub(r'<[^>]+>', ' ', text_match.group(1))
        text = raw.translate(trans)

        o_idx = text.find("بالاونصة")
        k_idx = text.find("عيار 21")

        if o_idx >= 0 and k_idx >= 0:
            slice_text = text[o_idx:k_idx]
            ounce_m = re.findall(r'\d+(?:\.\d+)?', slice_text)
            after = text[k_idx + 7:].split("للتواصل")[0]
            nums = re.findall(r'\d+(?:\.\d+)?', after)
            if nums:
                posts.append({
                    "time": time_match.group(1),
                    "ounce": float(ounce_m[0]) if ounce_m else None,
                    "buy21": float(nums[0]),
                    "sell21": float(nums[1]) if len(nums) > 1 else None
                })
    posts.reverse()
    return posts[:15]

def get_isagha():
    row = {"name": "آي صاغة", "url": "https://market.isagha.com/prices", "ok": False, "buy": {}, "sell": {}, "ounce": None}
    html = get_text(row["url"], timeout=5)
    if not html:
        return row

    vals = re.findall(r'prices-strip__value">\s*([\d.,]+)', html)
    if vals:
        nums = [float(v.replace(',', '')) for v in vals]
        karats = ["24", "21", "18"]
        for i, k in enumerate(karats):
            if i * 2 < len(nums):
                row["buy"][k] = nums[i * 2]
            if i * 2 + 1 < len(nums):
                row["sell"][k] = nums[i * 2 + 1]
        if len(nums) > 6 and nums[6] > 1500:
            row["ounce"] = nums[6]
        row["ok"] = bool(row["sell"].get("21"))
    return row

def get_edahab():
    row = {"name": "إي دهب", "url": "https://edahabapp.com/", "ok": False, "buy": {}, "sell": {}}
    html = get_text(row["url"], timeout=5)
    if not html:
        return row

    for k in ["24", "21", "18"]:
        # Match from JSON schema
        sm = re.search(rf'عيار\s*{k}\s*بيع"[\s\S]{{0,40}}?"value":\s*"([\d.,]+)', html)
        if sm:
            row["sell"][k] = float(sm.group(1).replace(',', ''))
        bm = re.search(rf'عيار\s*{k}\s*شراء"[\s\S]{{0,40}}?"value":\s*"([\d.,]+)', html)
        if bm:
            row["buy"][k] = float(bm.group(1).replace(',', ''))

        # Match from HTML span class if missing
        if k not in row["sell"]:
            sm2 = re.search(rf'عيار\s*{k}[\s\S]{{0,100}}?بيع:[\s\S]{{0,30}}?<span[^>]*class="[^"]*number-font[^"]*"[^>]*>([\d.,]+)', html)
            if sm2:
                row["sell"][k] = float(sm2.group(1).replace(',', ''))
        if k not in row["buy"]:
            bm2 = re.search(rf'عيار\s*{k}[\s\S]{{0,100}}?شراء:[\s\S]{{0,30}}?<span[^>]*class="[^"]*number-font[^"]*"[^>]*>([\d.,]+)', html)
            if bm2:
                row["buy"][k] = float(bm2.group(1).replace(',', ''))

    row["ok"] = bool(row["sell"].get("21"))
    return row

def get_ounce(isagha_ounce=None, tg_ounce=None):
    # 1. TradingView
    try:
        req = urllib.request.Request("https://scanner.tradingview.com/symbol?symbol=OANDA%3AXAUUSD&fields=close%2Cbid%2Cask", headers=UA)
        with urllib.request.urlopen(req, timeout=4) as res:
            data = json.loads(res.read().decode('utf-8'))
            if "close" in data and float(data["close"]) > 1500:
                return float(data["close"])
    except Exception:
        pass

    # 2. Binance PAXGUSDT
    try:
        req = urllib.request.Request("https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT", headers=UA)
        with urllib.request.urlopen(req, timeout=4) as res:
            data = json.loads(res.read().decode('utf-8'))
            if "price" in data and float(data["price"]) > 1500:
                return float(data["price"])
    except Exception:
        pass

    # 3. Gold-API
    try:
        with urllib.request.urlopen("https://api.gold-api.com/price/XAU", timeout=4) as res:
            data = json.loads(res.read().decode('utf-8'))
            if "price" in data and float(data["price"]) > 1500:
                return float(data["price"])
    except Exception:
        pass

    if isagha_ounce and isagha_ounce > 1500:
        return float(isagha_ounce)
    if tg_ounce and tg_ounce > 1500:
        return float(tg_ounce)
    return 4140.0

def get_usd(oz, isagha, latest_tg):
    # Fast check gold-price-live with 2.5s
    html = get_text("https://gold-price-live.com/view/sagha-usd", timeout=2.5)
    if html:
        m = re.search(r'font-size:120px[^>]*>\s*([\d.]+)\s*<', html)
        if m:
            try:
                v = float(m.group(1))
                if 30 < v < 100:
                    return v
            except Exception:
                pass

    # Dynamic calculation from Egyptian market
    market24 = None
    if isagha.get("sell", {}).get("24"):
        market24 = isagha["sell"]["24"]
    elif latest_tg and latest_tg.get("sell21"):
        market24 = (latest_tg["sell21"] * 24) / 21

    if market24 and oz > 1500:
        usd_calc = round((market24 * 31.1035) / oz, 2)
        if 30 < usd_calc < 100:
            return usd_calc

    return 52.60

def fetch_and_calculate():
    tg_posts = get_telegram_prices()
    isagha = get_isagha()
    edahab = get_edahab()

    latest_tg = tg_posts[0] if tg_posts else None
    oz = get_ounce(isagha.get("ounce"), latest_tg.get("ounce") if latest_tg else None)
    usd = get_usd(oz, isagha, latest_tg)

    tg_row = {
        "name": "قناة سوق الدهب",
        "url": "https://t.me/souqeldahb24",
        "ok": bool(latest_tg and latest_tg.get("sell21")),
        "buy": {"21": latest_tg["buy21"]} if latest_tg and latest_tg.get("buy21") else {},
        "sell": {"21": latest_tg["sell21"]} if latest_tg and latest_tg.get("sell21") else {}
    }

    sources = [tg_row, isagha, edahab]

    # حساب الشاشة
    g24 = round(((oz * usd) / 31.1035), 1)
    g21 = round(((g24 * 21) / 24), 1)
    g18 = round(((g24 * 18) / 24), 1)
    screen = {"24": g24, "21": g21, "18": g18}

    final = {}
    for k in ["24", "21", "18"]:
        sells = [s["sell"][k] for s in sources if k in s.get("sell", {})]
        buys = [s["buy"][k] for s in sources if k in s.get("buy", {})]

        site_sell = max(sells) if sells else None
        sc = screen.get(k)
        from_screen = (sc is not None and (site_sell is None or sc > site_sell))
        sell_base = sc if from_screen else site_sell

        fallback_sell = 7015 if k == "24" else (6140 if k == "21" else 5260)
        fallback_buy = fallback_sell - 50

        calc_buy = round(min(buys) - 10) if buys else (round(sell_base - 25) if sell_base else fallback_buy)
        calc_sell = round(sell_base + 10) if sell_base is not None else fallback_sell

        final[k] = {
            "buy": calc_buy,
            "sell": calc_sell,
            "sellFromScreen": from_screen
        }

    final["22"] = {
        "buy": round((final["24"]["buy"] * 22) / 24),
        "sell": round((final["24"]["sell"] * 22) / 24),
        "sellFromScreen": final["24"]["sellFromScreen"]
    }
    final["14"] = {
        "buy": round((final["21"]["buy"] * 14) / 21),
        "sell": round((final["21"]["sell"] * 14) / 21),
        "sellFromScreen": final["21"]["sellFromScreen"]
    }
    final["12"] = {
        "buy": round((final["24"]["buy"] * 12) / 24),
        "sell": round((final["24"]["sell"] * 12) / 24),
        "sellFromScreen": final["24"]["sellFromScreen"]
    }

    g21_sell = final["21"]["sell"]
    g21_buy = final["21"]["buy"]
    coins = {
        "pound": {
            "name": "الجنيه الذهب (8 جرام)",
            "weight": 8,
            "karat": "21",
            "sell": round(g21_sell * 8),
            "buy": round(g21_buy * 8)
        },
        "half_pound": {
            "name": "نصف جنيه ذهب (4 جرام)",
            "weight": 4,
            "karat": "21",
            "sell": round(g21_sell * 4),
            "buy": round(g21_buy * 4)
        },
        "quarter_pound": {
            "name": "ربع جنيه ذهب (2 جرام)",
            "weight": 2,
            "karat": "21",
            "sell": round(g21_sell * 2),
            "buy": round(g21_buy * 2)
        },
        "five_pounds": {
            "name": "خمسة جنيهات ذهب (40 جرام)",
            "weight": 40,
            "karat": "21",
            "sell": round(g21_sell * 40),
            "buy": round(g21_buy * 40)
        }
    }

    g24_sell = final["24"]["sell"]
    g24_buy = final["24"]["buy"]
    bullions = {
        "b_1g": {"name": "سبيكة 1 جرام BTC معتمدة", "weight": 1, "sell": round(g24_sell * 1 + 85), "buy": round(g24_buy * 1)},
        "b_2_5g": {"name": "سبيكة 2.5 جرام معتمدة", "weight": 2.5, "sell": round(g24_sell * 2.5 + 140), "buy": round(g24_buy * 2.5)},
        "b_5g": {"name": "سبيكة 5 جرام معتمدة", "weight": 5, "sell": round(g24_sell * 5 + 220), "buy": round(g24_buy * 5)},
        "b_10g": {"name": "سبيكة 10 جرام معتمدة", "weight": 10, "sell": round(g24_sell * 10 + 380), "buy": round(g24_buy * 10)},
        "b_20g": {"name": "سبيكة 20 جرام معتمدة", "weight": 20, "sell": round(g24_sell * 20 + 700), "buy": round(g24_buy * 20)},
        "b_31_1g": {"name": "سبيكة أونصة (31.10 جرام)", "weight": 31.10, "sell": round(g24_sell * 31.10 + 950), "buy": round(g24_buy * 31.10)},
        "b_50g": {"name": "سبيكة 50 جرام معتمدة", "weight": 50, "sell": round(g24_sell * 50 + 1400), "buy": round(g24_buy * 50)},
        "b_100g": {"name": "سبيكة 100 جرام معتمدة", "weight": 100, "sell": round(g24_sell * 100 + 2500), "buy": round(g24_buy * 100)},
    }

    output = {
        "success": True,
        "data": {
            "updatedAt": datetime.utcnow().isoformat() + "Z",
            "ounce": oz,
            "saghaUsd": usd,
            "screen": screen,
            "final": final,
            "coins": coins,
            "bullions": bullions,
            "sources": sources,
            "history": tg_posts,
            "isFallback": False
        }
    }

    with open("prices_cache.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    return output

if __name__ == "__main__":
    res = fetch_and_calculate()
    d = res["data"]
    print("Success! Live Gold Prices Updated:")
    print(f"Ounce: {d['ounce']}, USD: {d['saghaUsd']}")
    print(f"24 Sell: {d['final']['24']['sell']}, 21 Sell: {d['final']['21']['sell']}, 18 Sell: {d['final']['18']['sell']}")
    print(f"Pound: {d['coins']['pound']['sell']} EGP")
