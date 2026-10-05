import { useEffect, useState, useCallback } from 'react';
import type { GoldPricesResponse, Karat } from '../types';

export const DEFAULT_FALLBACK_PRICES: GoldPricesResponse = {
  updatedAt: new Date().toISOString(),
  ounce: 2658.4,
  saghaUsd: 49.65,
  screen: {
    '24': 4243.9,
    '21': 3713.4,
    '18': 3182.9,
  },
  final: {
    '24': { buy: 4210, sell: 4255, sellFromScreen: true },
    '21': { buy: 3680, sell: 3725, sellFromScreen: true },
    '18': { buy: 3150, sell: 3195, sellFromScreen: true },
  },
  sources: [
    {
      name: 'قناة سوق الدهب',
      url: 'https://t.me/souqeldahb24',
      ok: true,
      buy: { '21': 3685 },
      sell: { '21': 3715 },
    },
    {
      name: 'آي صاغة',
      url: 'https://market.isagha.com/prices',
      ok: true,
      buy: { '24': 4215, '21': 3688, '18': 3160 },
      sell: { '24': 4250, '21': 3720, '18': 3190 },
    },
    {
      name: 'إي دهب',
      url: 'https://edahabapp.com/',
      ok: true,
      buy: { '24': 4210, '21': 3685, '18': 3155 },
      sell: { '24': 4245, '21': 3715, '18': 3185 },
    },
  ],
  history: [],
};

export function useLiveGoldPrices() {
  const [data, setData] = useState<GoldPricesResponse>(DEFAULT_FALLBACK_PRICES);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      let res: Response | null = null;

      // 1. Try local Express API route
      try {
        res = await fetch(`/api/gold-prices${isManualRefresh ? '?refresh=true' : ''}`, {
          headers: { Accept: 'application/json' },
        });
      } catch {
        res = null;
      }

      // 2. If not available (e.g. on Shared Hosting / cPanel), try get_prices.php
      if (!res || !res.ok) {
        try {
          res = await fetch(`get_prices.php${isManualRefresh ? '?refresh=true' : ''}`, {
            headers: { Accept: 'application/json' },
          });
        } catch {
          res = null;
        }
      }

      // 3. Fallback to prices_cache.json static file
      if (!res || !res.ok) {
        try {
          res = await fetch('prices_cache.json', {
            headers: { Accept: 'application/json' },
          });
        } catch {
          res = null;
        }
      }

      if (res && res.ok) {
        const json = await res.json();
        const responseData = json.data || json;
        if (responseData && responseData.final) {
          setData(responseData);
          setError(null);
        }
      }
    } catch (err) {
      console.warn('Could not fetch from live sources, using cached/fallback:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices(false);
    // Auto-poll every 60 seconds
    const interval = setInterval(() => {
      fetchPrices(false);
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const refresh = () => fetchPrices(true);

  return {
    data,
    loading,
    refreshing,
    error,
    refresh,
  };
}
