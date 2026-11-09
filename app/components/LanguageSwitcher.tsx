'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { type Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);

    // 튜토리얼 페이지는 URL이 언어를 결정하므로 해당 언어의 URL(hreflang)로 이동
    const alternate = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${newLocale}"]`
    );
    if (alternate) {
      router.push(new URL(alternate.href).pathname);
      return;
    }

    // 쿠키 저장 후 페이지 새로고침하여 서버 컴포넌트 재렌더링
    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <div className="language-switcher" role="group" aria-label="언어 선택">
      <button
        type="button"
        onClick={() => handleLanguageChange('ko')}
        className={`lang-button ${locale === 'ko' ? 'active' : ''}`}
        aria-label="한국어로 전환"
        aria-pressed={locale === 'ko'}
      >
        KO
      </button>
      <span className="lang-separator" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`lang-button ${locale === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
