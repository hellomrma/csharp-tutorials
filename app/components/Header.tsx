import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="header-link">
            <h1 className="header-title">
              <span className="header-title-main">C#</span>
              <span className="header-title-sub">프로그래밍 튜토리얼</span>
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

