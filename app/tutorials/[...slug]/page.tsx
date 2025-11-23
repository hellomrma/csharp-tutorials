import { notFound } from 'next/navigation';
import { getTutorialBySlug, getAllTutorialSlugs, getAllTutorials } from '@/lib/markdown';
import { getLocale } from '@/lib/cookies';
import type { Metadata } from 'next';
import TutorialPageContent from '@/app/components/TutorialPageContent';

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
  const locale = await getLocale();
  const tutorial = await getTutorialBySlug(slugString, locale);
  
  if (!tutorial) {
    return {
      title: locale === 'en' ? 'Page Not Found' : '페이지를 찾을 수 없습니다',
    };
  }

  const title = tutorial.meta.title;
  const seoTitle = locale === 'en' 
    ? `${title} | Unity C# Tutorial`
    : `${title} | Unity C# 튜토리얼`;
  const description = tutorial.meta.description || (locale === 'en'
    ? `${title} - Learn Unity and C# programming systematically.`
    : `${title} - Unity와 C#을 체계적으로 학습할 수 있는 튜토리얼입니다.`);
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
  const locale = await getLocale();
  const tutorial = await getTutorialBySlug(slugString, locale);

  if (!tutorial) {
    notFound();
  }

  // 리다이렉트는 클라이언트 사이드에서 처리하도록 함
  // 서버 사이드 리다이렉트는 무한 루프를 일으킬 수 있으므로 제거
  // LanguageSwitcher에서 언어 변경 시 router.push로 처리

  // 이전/다음 튜토리얼 찾기
  const allTutorials = getAllTutorials(locale);
  
  // slug 비교: 언어에 따라 적절한 slug 사용
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
  
  // 현재 튜토리얼의 slug (언어에 따라)
  const currentSlug = normalizeSlug(tutorial.meta.slug);
  
  // allTutorials에서 현재 튜토리얼 찾기
  // slug 또는 order로 매칭
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
    description: tutorial.meta.description || (locale === 'en'
      ? `${tutorial.meta.title} - Unity C# Tutorial`
      : `${tutorial.meta.title} - Unity C# 튜토리얼`),
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
    keywords: tutorial.meta.keywords || (locale === 'en'
      ? ['C#', 'CSharp', 'Programming', 'Tutorial', 'Unity']
      : ['C#', 'CSharp', '프로그래밍', '튜토리얼', 'Unity']),
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    about: {
      '@type': 'Thing',
      name: 'C# Programming',
      description: 'C# 프로그래밍 언어 학습',
    },
    teaches: 'C# 프로그래밍',
    educationalLevel: 'Beginner',
  };

  // 구조화된 데이터 (JSON-LD) - Course (GEO 최적화)
  const courseJsonLd: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    provider: { '@type': string; name: string; url: string };
    courseCode: string;
    educationalLevel: string;
    inLanguage: string;
    url: string;
    teaches: string;
    hasCourseInstance: { '@type': string; courseMode: string; instructor: { '@type': string; name: string } };
    coursePrerequisites?: { '@type': string; name: string; url: string };
  } = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: tutorial.meta.title,
    description: tutorial.meta.description || (locale === 'en'
      ? `${tutorial.meta.title} - Unity C# Tutorial`
      : `${tutorial.meta.title} - Unity C# 튜토리얼`),
    provider: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    courseCode: `C#-${String(tutorial.meta.order || 0).padStart(2, '0')}`,
    educationalLevel: 'Beginner',
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
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
      <TutorialPageContent 
        tutorial={{ meta: tutorial.meta, content: tutorial.htmlContent }}
        prevTutorial={prevTutorial}
        nextTutorial={nextTutorial}
      />
    </div>
  );
}

