import { notFound } from 'next/navigation';
import { getTutorialBySlug, getAllTutorialSlugs, getAllTutorials } from '@/lib/markdown';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app';

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => {
    // slug를 배열로 나누고 각 부분을 인코딩
    const parts = slug.split('/');
    return {
      slug: parts,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const tutorial = await getTutorialBySlug(slugString);

  if (!tutorial) {
    return {
      title: '페이지를 찾을 수 없습니다',
    };
  }

  const title = tutorial.meta.title;
  const seoTitle = `${title} | C# 프로그래밍 튜토리얼`;
  const description = tutorial.meta.description || `${title} - C# 프로그래밍 튜토리얼. Unity와 C#을 체계적으로 학습할 수 있는 튜토리얼입니다.`;
  const url = `${siteUrl}/tutorials/${slugString}`;
  const keywords = tutorial.meta.keywords || ['C#', 'CSharp', '프로그래밍', '튜토리얼', 'Unity', '게임 개발', 'C# 학습'];

  return {
    title: seoTitle,
    description,
    keywords: [...keywords, 'C# 기초', '프로그래밍 강의', '코딩 학습', 'Unity C#'],
    openGraph: {
      title: seoTitle,
      description,
      url,
      type: 'article',
      publishedTime: tutorial.meta.date,
      authors: ['C# Tutorials'],
      tags: keywords,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:section': tutorial.meta.category || 'Unity C# 기초',
      'article:author': 'C# Tutorials',
    },
  };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const tutorial = await getTutorialBySlug(slugString);

  if (!tutorial) {
    notFound();
  }

  // 이전/다음 튜토리얼 찾기
  const allTutorials = getAllTutorials();
  
  // slug 비교: tutorial.meta.slug는 항상 'docs/...' 형식으로 정규화됨
  // 한글 파일명의 경우 URL 인코딩 차이를 고려하여 정규화된 slug로 비교
  const normalizeSlug = (s: string) => {
    // 'docs/' 접두사 확인 및 정규화
    const normalized = s.startsWith('docs/') ? s : `docs/${s}`;
    // URL 디코딩하여 비교 (한글 파일명 처리)
    try {
      return decodeURIComponent(normalized);
    } catch {
      return normalized;
    }
  };
  
  const currentSlug = normalizeSlug(tutorial.meta.slug);
  let currentIndex = allTutorials.findIndex((t) => {
    const tutorialSlug = normalizeSlug(t.slug);
    return tutorialSlug === currentSlug;
  });
  
  // slug로 찾지 못한 경우 order로 찾기 (fallback)
  if (currentIndex === -1 && tutorial.meta.order !== undefined) {
    currentIndex = allTutorials.findIndex((t) => t.order === tutorial.meta.order);
  }
  
  // 여전히 못 찾은 경우 첫 번째 항목으로 간주
  if (currentIndex === -1) {
    currentIndex = 0;
  }
  
  const prevTutorial = currentIndex > 0 ? allTutorials[currentIndex - 1] : null;
  const nextTutorial = currentIndex >= 0 && currentIndex < allTutorials.length - 1 ? allTutorials[currentIndex + 1] : null;

  // 구조화된 데이터 (JSON-LD) - Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tutorial.meta.title,
    description: tutorial.meta.description || `${tutorial.meta.title} - C# 프로그래밍 튜토리얼`,
    author: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: tutorial.meta.date || new Date().toISOString(),
    dateModified: tutorial.meta.dateModified || tutorial.meta.date || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tutorials/${slugString}`,
    },
    articleSection: tutorial.meta.category || 'Unity C# 기초',
    keywords: tutorial.meta.keywords || ['C#', 'CSharp', '프로그래밍', '튜토리얼'],
    inLanguage: 'ko-KR',
    about: {
      '@type': 'Thing',
      name: 'C# Programming',
      description: 'C# 프로그래밍 언어 학습',
    },
    teaches: 'C# 프로그래밍',
    educationalLevel: 'Beginner',
  };

  // 구조화된 데이터 (JSON-LD) - Course (GEO 최적화)
  const courseJsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: tutorial.meta.title,
    description: tutorial.meta.description || `${tutorial.meta.title} - C# 프로그래밍 튜토리얼`,
    provider: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    courseCode: `C#-${String(tutorial.meta.order || 0).padStart(2, '0')}`,
    educationalLevel: 'Beginner',
    inLanguage: 'ko-KR',
    url: `${siteUrl}/tutorials/${slugString}`,
    teaches: 'C# 프로그래밍',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Organization',
        name: 'C# Tutorials',
      },
    },
  };

  // 이전 튜토리얼이 있으면 선수과목으로 추가
  if (prevTutorial) {
    courseJsonLd.coursePrerequisites = {
      '@type': 'Course',
      name: prevTutorial.title,
      url: `${siteUrl}/tutorials/${prevTutorial.slug}`,
    };
  }

  // 구조화된 데이터 (JSON-LD) - BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tutorial.meta.title,
        item: `${siteUrl}/tutorials/${slugString}`,
      },
    ],
  };

  return (
    <div className="detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="detail-container">
        <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <li>
              <Link href="/" className="nav-link" aria-label="홈으로 돌아가기">
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>홈으로 돌아가기</span>
              </Link>
            </li>
          </ol>
        </nav>

        <article className="article-container" itemScope itemType="https://schema.org/Article">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-number" aria-label="튜토리얼 번호">
                {String(tutorial.meta.order || 0).padStart(2, '0')}
              </span>
              {tutorial.meta.category && (
                <span className="article-category" itemProp="articleSection">{tutorial.meta.category}</span>
              )}
            </div>
            <h1 className="article-title" itemProp="headline">{tutorial.meta.title}</h1>
            {tutorial.meta.description && (
              <p className="article-description" itemProp="description" style={{ 
                marginTop: '0.75rem', 
                color: 'var(--slate-300)', 
                fontSize: '0.9375rem',
                lineHeight: '1.6'
              }}>
                {tutorial.meta.description}
              </p>
            )}
            {tutorial.meta.date && (
              <time dateTime={tutorial.meta.date} itemProp="datePublished" style={{ display: 'none' }}>
                {tutorial.meta.date}
              </time>
            )}
          </header>

          <div
            className="markdown-content"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: tutorial.htmlContent }}
          />
        </article>

        <nav className="nav-footer" aria-label="이전/다음 튜토리얼 네비게이션">
          {prevTutorial ? (
            <Link href={`/tutorials/${prevTutorial.slug}`} className="nav-card" rel="prev" aria-label={`이전 튜토리얼: ${prevTutorial.title}`}>
              <svg className="nav-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <div className="nav-card-label">이전</div>
                <p className="nav-card-title">{prevTutorial.title}</p>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextTutorial ? (
            <Link href={`/tutorials/${nextTutorial.slug}`} className="nav-card nav-card-right" rel="next" aria-label={`다음 튜토리얼: ${nextTutorial.title}`}>
              <div>
                <div className="nav-card-label">다음</div>
                <p className="nav-card-title">{nextTutorial.title}</p>
              </div>
              <svg className="nav-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div></div>
          )}
        </nav>

        <div className="back-link">
          <Link href="/">
            <svg className="back-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>튜토리얼 목록으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

