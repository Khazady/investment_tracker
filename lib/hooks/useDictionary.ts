'use client';

import { useParams } from 'next/navigation';
import { Locale, defaultLocale, dictionaries } from '@/lib/dictionaries/client';

export function useDictionary() {
  const params = useParams();
  const lang = (params.lang as Locale) || defaultLocale;
  return dictionaries[lang] || dictionaries[defaultLocale];
} 