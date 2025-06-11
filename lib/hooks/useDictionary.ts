'use client';

import { useParams } from 'next/navigation';
import type { Locale} from '@/lib/dictionaries/client';
import { defaultLocale, dictionaries } from '@/lib/dictionaries/client';

export function useDictionary() {
  const params = useParams();
  const lang = (params.lang as Locale) || defaultLocale;
  return dictionaries[lang] || dictionaries[defaultLocale];
} 