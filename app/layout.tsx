import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app';
const siteName = '유니티 C# 튜토리얼';
const defaultDescription = 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼 웹사이트입니다. 실전 예제와 상세한 설명으로 Unity C# 기초부터 고급까지 마스터하세요.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '유니티 C# 튜토리얼 | Unity C# 마스터하기',
    template: `%s`,
  },
  description: defaultDescription,
  keywords: ['Unity C#', '유니티 C#', 'Unity 튜토리얼', 'C# 튜토리얼', 'Unity 게임 개발', 'C# 프로그래밍', 'Unity 학습', 'C# 기초', 'Unity 기초', '게임 개발', 'Unity C# 마스터'],
  authors: [{ name: 'C# Tutorials' }],
  creator: 'C# Tutorials',
  publisher: 'C# Tutorials',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Google Search Console 등에서 제공하는 verification 코드를 여기에 추가하세요
    // google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-91EN6ZPDC2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-91EN6ZPDC2');
          `}
        </Script>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

