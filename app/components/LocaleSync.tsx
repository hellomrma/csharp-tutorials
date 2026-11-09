'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { type Locale } from '@/lib/i18n';

/**
 * URL로 결정된 언어를 클라이언트 언어 상태(쿠키 포함)에 맞춥니다.
 * 예: 영문 URL로 직접 들어오면 UI도 영문으로 표시됩니다.
 */
export default function LocaleSync({ locale }: { locale: Locale }) {
  const { setLocale } = useLanguage();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return null;
}
