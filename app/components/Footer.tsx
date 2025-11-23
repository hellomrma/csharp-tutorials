import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p className="footer-text">
              © {currentYear} <Link href="/" className="footer-link">C# 프로그래밍 튜토리얼</Link>
            </p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p className="footer-copyright-text">
              © {currentYear} hellomrma. All rights reserved.
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
            Unity와 C#을 체계적으로 학습할 수 있는 온라인 튜토리얼
          </p>
        </div>
      </div>
    </footer>
  );
}

