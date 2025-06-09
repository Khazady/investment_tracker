'use client';

import { useParams } from 'next/navigation';
import { Locale, defaultLocale, clientDictionaries } from '@/lib/dictionaries';

export function useDictionary() {
  const params = useParams();
  const lang = (params.lang as Locale) || defaultLocale;
  return clientDictionaries[lang] || clientDictionaries[defaultLocale];
} 