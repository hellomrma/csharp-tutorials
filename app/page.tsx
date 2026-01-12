import { getAllTutorials } from '@/lib/markdown';
import { getLocale } from '@/lib/cookies';
import type { Metadata } from 'next';
import MainPageContent from './components/MainPageContent';
import {
  generateWebSiteJsonLd,
  generateCollectionPageJsonLd,
  generateCourseCollectionJsonLd,
  renderJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: '유니티 C# 튜토리얼 | Unity C# 마스터하기',
  description: 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼입니다. Unity 게임 개발을 위한 C# 기초부터 고급 개념까지, 실전 예제와 상세한 설명으로 Unity C#을 마스터하세요.',
  keywords: ['Unity C#', '유니티 C#', 'Unity 튜토리얼', 'C# 튜토리얼', 'Unity 게임 개발', 'C# 프로그래밍', 'Unity 학습', 'C# 기초', 'Unity 기초', '게임 개발', 'Unity C# 마스터'],
  openGraph: {
    title: '유니티 C# 튜토리얼 | Unity C# 마스터하기',
    description: 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼입니다.',
    type: 'website',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app',
  },
};

export default async function Home() {
  const locale = await getLocale();
  const tutorials = getAllTutorials(locale);

  // JSON-LD 구조화된 데이터 생성
  const websiteJsonLd = generateWebSiteJsonLd(locale);
  const collectionJsonLd = generateCollectionPageJsonLd(tutorials, locale);
  const courseCollectionJsonLd = generateCourseCollectionJsonLd(tutorials, locale);

  return (
    <main className="main-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(courseCollectionJsonLd) }}
      />
      <MainPageContent tutorials={tutorials} />
    </main>
  );
}

