import { getAllTutorials } from '@/lib/markdown';
import { getLocale } from '@/lib/cookies';
import type { Metadata } from 'next';
import MainPageContent from './components/MainPageContent';

export const metadata: Metadata = {
  title: 'C# 프로그래밍 마스터하기 | Unity 게임 개발 튜토리얼',
  description: 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배워보세요. 기초 문법부터 고급 개념까지, 실전 예제와 상세한 설명으로 프로그래밍 실력을 향상시킬 수 있습니다.',
  keywords: ['C#', 'CSharp', '프로그래밍', '튜토리얼', 'Unity', '게임 개발', 'C# 기초', 'C# 학습', '프로그래밍 강의', '코딩 학습', 'C# 마스터', 'Unity C#', 'C# 튜토리얼'],
  openGraph: {
    title: 'C# 프로그래밍 마스터하기 | Unity 게임 개발 튜토리얼',
    description: 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배워보세요.',
    type: 'website',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app',
  },
};

export default async function Home() {
  const locale = await getLocale();
  const tutorials = getAllTutorials(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app';

  // 구조화된 데이터 (JSON-LD) - 웹사이트 정보
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'en' ? 'Unity C# Tutorial' : 'Unity C# 튜토리얼',
    alternateName: locale === 'en' ? 'Unity C# Tutorial' : 'Unity C# 튜토리얼',
    description: locale === 'en'
      ? 'Online tutorial website to systematically learn Unity and C# programming language'
      : 'Unity와 C# 프로그래밍 언어를 체계적으로 학습할 수 있는 온라인 튜토리얼 웹사이트',
    url: siteUrl,
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    about: {
      '@type': 'Thing',
      name: 'C# Programming Education',
      description: 'C# 프로그래밍 언어 학습을 위한 체계적인 튜토리얼',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/tutorials?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // 구조화된 데이터 (JSON-LD) - 컬렉션 페이지
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'en' ? 'Unity C# Tutorial List' : 'Unity C# 튜토리얼 목록',
    description: locale === 'en'
      ? 'List of tutorials to systematically learn Unity and C# programming language'
      : 'Unity와 C# 프로그래밍 언어를 체계적으로 학습할 수 있는 튜토리얼 목록',
    url: siteUrl,
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tutorials.length,
      itemListElement: tutorials.map((tutorial, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          '@id': `${siteUrl}/tutorials/${tutorial.slug}`,
          name: tutorial.title,
          description: locale === 'en' 
            ? `${tutorial.title} - Unity C# Tutorial`
            : `${tutorial.title} - Unity C# 튜토리얼`,
          url: `${siteUrl}/tutorials/${tutorial.slug}`,
        },
      })),
    },
  };

  // 구조화된 데이터 (JSON-LD) - Course (GEO 최적화)
  const courseCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'en' ? 'Master Unity C# Programming' : 'Unity C# 마스터하기',
    description: locale === 'en'
      ? 'Comprehensive course to learn everything about C# programming step by step, from Unity game development to real-world applications'
      : 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배우는 종합 교육 과정',
    provider: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    courseCode: 'C#-MASTER',
    educationalLevel: 'Beginner',
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    url: siteUrl,
    teaches: 'C# 프로그래밍, Unity 게임 개발',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Organization',
        name: 'C# Tutorials',
      },
    },
    coursePrerequisites: '프로그래밍 기초 지식 (선택사항)',
    numberOfCredits: tutorials.length,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
    },
  };

  return (
    <main className="main-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseCollectionJsonLd) }}
      />
      <MainPageContent tutorials={tutorials} />
    </main>
  );
}

