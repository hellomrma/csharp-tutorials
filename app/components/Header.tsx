'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="header-link">
            <h1 className="header-title">
              <span className="header-title-main">C#</span>
              <span className="header-title-sub">{t.siteNameShort}</span>
            </h1>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

