"use client";

import { useEffect, useState } from 'react';
import { CURRENCIES, COUNTRY_TO_CURRENCY, type Currency } from '@/lib/pricing';

export function useGeoCurrency() {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.DEFAULT);
  const [countryCode, setCountryCode] = useState<string>('IN');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data: unknown = await res.json();
        const country = (data as { country_code?: string } | null)?.country_code || 'US';
        setCountryCode(country);
        const currencyKey = COUNTRY_TO_CURRENCY[country] || 'DEFAULT';
        setCurrency(CURRENCIES[currencyKey] || CURRENCIES.DEFAULT);
      } catch {
        setCurrency(CURRENCIES.DEFAULT);
      } finally {
        setLoading(false);
      }
    };

    detect();
  }, []);

  return { currency, countryCode, loading, setCurrency };
}

