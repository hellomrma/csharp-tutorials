'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="header-link" aria-label={t.siteName}>
            <span className="header-title">
              <span className="header-title-main">C#</span>
              <span className="header-title-sub">{t.siteNameShort}</span>
            </span>
          </Link>
          <div className="header-actions">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
