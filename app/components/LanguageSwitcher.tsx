'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { type Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    
    // 쿠키 저장 후 페이지 새로고침하여 서버 컴포넌트 재렌더링
    // 리다이렉트는 서버 사이드에서 하지 않고 클라이언트에서만 처리
    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => handleLanguageChange('ko')}
        className={`lang-button ${locale === 'ko' ? 'active' : ''}`}
        aria-label="한국어로 전환"
        aria-pressed={locale === 'ko'}
      >
        한국어
      </button>
      <span className="lang-separator">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`lang-button ${locale === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        English
      </button>
    </div>
  );
}

