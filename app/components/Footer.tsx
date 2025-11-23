'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p className="footer-text">
              © {currentYear} <Link href="/" className="footer-link">{t.siteName}</Link>
            </p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p className="footer-copyright-text">
              © {currentYear} hellomrma. {t.allRightsReserved}
            </p>
          </div>
          <div className="footer-contacts">
            <a href="mailto:hellomrma@gmail.com" className="footer-contact-link" aria-label="이메일">
              hellomrma@gmail.com
            </a>
            <span className="footer-contact-separator">•</span>
            <a href="https://github.com/hellomrma" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="GitHub">
              GitHub
            </a>
            <span className="footer-contact-separator">•</span>
            <a href="https://linkedin.com/in/hellomrma" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="LinkedIn">
              LinkedIn
            </a>
            <span className="footer-contact-separator">•</span>
            <a href="https://instagram.com/hellomrma" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="Instagram">
              @hellomrma
            </a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-subtext">
            {t.footerDescription}
          </p>
        </div>
      </div>
    </footer>
  );
}

