import Link from 'next/link';
import { getAllTutorials } from '@/lib/markdown';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배워보세요. 기초 문법부터 고급 개념까지, 실전 예제와 상세한 설명으로 프로그래밍 실력을 향상시킬 수 있습니다.',
  keywords: ['C#', 'CSharp', '프로그래밍', '튜토리얼', 'Unity', '게임 개발', 'C# 기초', 'C# 학습', '프로그래밍 강의', '코딩 학습', 'C# 마스터'],
  openGraph: {
    title: 'C# 프로그래밍 마스터하기',
    description: 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배워보세요.',
    type: 'website',
  },
};

export default function Home() {
  const tutorials = getAllTutorials();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.com';

  // 구조화된 데이터 (JSON-LD) - 웹사이트 정보
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'C# 프로그래밍 튜토리얼',
    alternateName: 'C# Programming Tutorial',
    description: 'Unity와 C# 프로그래밍 언어를 체계적으로 학습할 수 있는 온라인 튜토리얼 웹사이트',
    url: siteUrl,
    inLanguage: 'ko-KR',
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
    name: 'C# 프로그래밍 튜토리얼 목록',
    description: 'Unity와 C# 프로그래밍 언어를 체계적으로 학습할 수 있는 튜토리얼 목록',
    url: siteUrl,
    inLanguage: 'ko-KR',
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
          description: `${tutorial.title} - C# 프로그래밍 튜토리얼`,
          url: `${siteUrl}/tutorials/${tutorial.slug}`,
        },
      })),
    },
  };

  // 구조화된 데이터 (JSON-LD) - Course (GEO 최적화)
  const courseCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'C# 프로그래밍 마스터하기',
    description: 'Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배우는 종합 교육 과정',
    provider: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    courseCode: 'C#-MASTER',
    educationalLevel: 'Beginner',
    inLanguage: 'ko-KR',
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
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="main-header">
          <h1 className="main-title">
            <span className="main-title-main">C#</span>
            <span className="main-title-sub">마스터하기</span>
            <span className="main-title-en">(Master C# Programming)</span>
          </h1>
          <p className="main-subtitle">
            Unity 게임 개발부터 실전 애플리케이션까지, C# 프로그래밍의 모든 것을 단계별로 배워보세요
          </p>
          <p className="main-description">
            기초 문법부터 고급 개념까지, 실전 예제와 상세한 설명으로 프로그래밍 실력을 한 단계씩 향상시킬 수 있습니다.
          </p>
        </div>

        {tutorials.length > 0 ? (
          <section className="tutorial-list" aria-label="튜토리얼 목록">
            {tutorials.map((tutorial, index) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="tutorial-item"
                aria-label={`${tutorial.title} 튜토리얼 보기`}
              >
                <span className="tutorial-number" aria-hidden="true">
                  {String(tutorial.order ?? index + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 className="tutorial-title">
                    <span className="tutorial-title-kr">{tutorial.title}</span>
                    {tutorial.titleEn && (
                      <span className="tutorial-title-en">({tutorial.titleEn})</span>
                    )}
                  </h2>
                </div>
                <svg className="tutorial-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </section>
        ) : (
          <div className="empty-state" role="status" aria-live="polite">
            <p>아직 튜토리얼이 없습니다</p>
            <p>
              <code>content/docs/</code>
              <span>디렉토리에 MD 파일을 추가하세요</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

