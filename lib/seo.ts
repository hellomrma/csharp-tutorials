import { type Locale } from './i18n';
import { type TutorialMeta } from './markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app';

/**
 * JSON-LD 타입 정의
 */
export interface ArticleJsonLd {
  '@context': string;
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleSection: string;
  keywords: string[];
  inLanguage: string;
  about: {
    '@type': 'Thing';
    name: string;
    description: string;
  };
  teaches: string;
  educationalLevel: string;
}

export interface CourseJsonLd {
  '@context': string;
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  courseCode: string;
  educationalLevel: string;
  inLanguage: string;
  url: string;
  teaches: string;
  hasCourseInstance: {
    '@type': 'CourseInstance';
    courseMode: string;
    instructor: {
      '@type': 'Organization';
      name: string;
    };
  };
  coursePrerequisites?: {
    '@type': 'Course';
    name: string;
    url: string;
  };
}

export interface BreadcrumbJsonLd {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface WebSiteJsonLd {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  alternateName: string;
  description: string;
  url: string;
  inLanguage: string;
  about: {
    '@type': 'Thing';
    name: string;
    description: string;
  };
  potentialAction: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface CollectionPageJsonLd {
  '@context': string;
  '@type': 'CollectionPage';
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  mainEntity: {
    '@type': 'ItemList';
    numberOfItems: number;
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      item: {
        '@type': 'Course';
        '@id': string;
        name: string;
        description: string;
        url: string;
      };
    }>;
  };
}

export interface CourseCollectionJsonLd {
  '@context': string;
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  courseCode: string;
  educationalLevel: string;
  inLanguage: string;
  url: string;
  teaches: string;
  hasCourseInstance: {
    '@type': 'CourseInstance';
    courseMode: string;
    instructor: {
      '@type': 'Organization';
      name: string;
    };
  };
  coursePrerequisites: string;
  numberOfCredits: number;
  aggregateRating: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

/**
 * Article JSON-LD 생성
 */
export function generateArticleJsonLd(
  tutorial: TutorialMeta,
  slug: string,
  locale: Locale
): ArticleJsonLd {
  const description = tutorial.description || (locale === 'en'
    ? `${tutorial.title} - Unity C# Tutorial`
    : `${tutorial.title} - Unity C# 튜토리얼`);

  const keywords = tutorial.keywords || (locale === 'en'
    ? ['C#', 'CSharp', 'Programming', 'Tutorial', 'Unity']
    : ['C#', 'CSharp', '프로그래밍', '튜토리얼', 'Unity']);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tutorial.title,
    description,
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
    datePublished: tutorial.date || new Date().toISOString(),
    dateModified: tutorial.dateModified || tutorial.date || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tutorials/${slug}`,
    },
    articleSection: tutorial.category || 'Unity C# 기초',
    keywords,
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    about: {
      '@type': 'Thing',
      name: 'C# Programming',
      description: 'C# 프로그래밍 언어 학습',
    },
    teaches: 'C# 프로그래밍',
    educationalLevel: 'Beginner',
  };
}

/**
 * Course JSON-LD 생성 (개별 튜토리얼용)
 */
export function generateCourseJsonLd(
  tutorial: TutorialMeta,
  slug: string,
  locale: Locale,
  prevTutorial?: TutorialMeta | null
): CourseJsonLd {
  const description = tutorial.description || (locale === 'en'
    ? `${tutorial.title} - Unity C# Tutorial`
    : `${tutorial.title} - Unity C# 튜토리얼`);

  const courseJsonLd: CourseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: tutorial.title,
    description,
    provider: {
      '@type': 'Organization',
      name: 'C# Tutorials',
      url: siteUrl,
    },
    courseCode: `C#-${String(tutorial.order || 0).padStart(2, '0')}`,
    educationalLevel: 'Beginner',
    inLanguage: locale === 'en' ? 'en-US' : 'ko-KR',
    url: `${siteUrl}/tutorials/${slug}`,
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

  return courseJsonLd;
}

/**
 * Breadcrumb JSON-LD 생성
 */
export function generateBreadcrumbJsonLd(
  tutorial: TutorialMeta,
  slug: string,
  locale: Locale
): BreadcrumbJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'en' ? 'Home' : '홈',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tutorial.title,
        item: `${siteUrl}/tutorials/${slug}`,
      },
    ],
  };
}

/**
 * WebSite JSON-LD 생성 (홈페이지용)
 */
export function generateWebSiteJsonLd(locale: Locale): WebSiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'en' ? 'Unity C# Tutorial' : '유니티 C# 튜토리얼',
    alternateName: locale === 'en' ? 'Unity C# Tutorial' : '유니티 C# 튜토리얼',
    description: locale === 'en'
      ? 'Online tutorial website to systematically learn Unity and C# programming'
      : 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼 웹사이트',
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
}

/**
 * CollectionPage JSON-LD 생성 (홈페이지용)
 */
export function generateCollectionPageJsonLd(
  tutorials: TutorialMeta[],
  locale: Locale
): CollectionPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'en' ? 'Unity C# Tutorial List' : '유니티 C# 튜토리얼 목록',
    description: locale === 'en'
      ? 'List of tutorials to systematically learn Unity and C# programming'
      : 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 튜토리얼 목록',
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
            : `${tutorial.title} - 유니티 C# 튜토리얼`,
          url: `${siteUrl}/tutorials/${tutorial.slug}`,
        },
      })),
    },
  };
}

/**
 * Course Collection JSON-LD 생성 (홈페이지용)
 */
export function generateCourseCollectionJsonLd(
  tutorials: TutorialMeta[],
  locale: Locale
): CourseCollectionJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'en' ? 'Master Unity C# Programming' : '유니티 C# 마스터하기',
    description: locale === 'en'
      ? 'Comprehensive course to learn Unity and C# programming step by step, from game development basics to advanced concepts'
      : 'Unity 게임 개발 기초부터 고급 개념까지, Unity와 C# 프로그래밍을 단계별로 배우는 종합 교육 과정',
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
}

/**
 * JSON-LD를 script 태그로 렌더링하기 위한 헬퍼
 */
export function renderJsonLd(jsonLd: object): string {
  return JSON.stringify(jsonLd);
}
