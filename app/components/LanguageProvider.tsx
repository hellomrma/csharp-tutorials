'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { type Locale, defaultLocale, locales, getTranslations } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
}

// 기본값 제공으로 안전성 향상
// getTranslations는 매번 새로운 객체를 반환하므로, 기본값은 나중에 설정
const defaultContextValue: LanguageContextType = {
  locale: defaultLocale,
  setLocale: () => {},
  t: {} as ReturnType<typeof getTranslations>,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // 초기 상태 설정 시 클라이언트에서만 쿠키 읽기
    if (typeof window !== 'undefined') {
      const savedLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('locale='))
        ?.split('=')[1] as Locale | undefined;
      
      if (savedLocale && locales.includes(savedLocale)) {
        return savedLocale;
      }
    }
    return defaultLocale;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // 쿠키에 저장
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  // 항상 Provider를 제공하되, mounted 전에는 기본 locale 사용
  const currentLocale = mounted ? locale : defaultLocale;
  
  // translations와 value 객체를 메모이제이션하여 무한 루프 방지
  const translations = useMemo(() => getTranslations(currentLocale), [currentLocale]);
  
  const value = useMemo(() => ({
    locale: currentLocale,
    setLocale,
    t: translations,
  }), [currentLocale, setLocale, translations]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

