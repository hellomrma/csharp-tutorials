'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import type { TutorialMeta } from '@/lib/markdown';

interface MainPageContentProps {
  tutorials: TutorialMeta[];
}

export default function MainPageContent({ tutorials }: MainPageContentProps) {
  const { t, locale } = useLanguage();

  // 카테고리별로 튜토리얼 그룹화
  const tutorialsByCategory = tutorials.reduce((acc, tutorial) => {
    const category = locale === 'en' && tutorial.categoryEn 
      ? tutorial.categoryEn 
      : (tutorial.category || 'Unity C# 기초');
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorials>);

  // 카테고리 순서 정의 (기초가 먼저, 그 다음 응용)
  const categoryOrder = locale === 'en' 
    ? ['Unity C# Basics', 'Unity C# Applications']
    : ['Unity C# 기초', 'Unity C# 응용'];

  // 정의된 순서대로 정렬하고, 없는 카테고리는 뒤에 추가
  const sortedCategories = [
    ...categoryOrder.filter(cat => tutorialsByCategory[cat]),
    ...Object.keys(tutorialsByCategory).filter(cat => !categoryOrder.includes(cat))
  ];

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="main-header">
        <h1 className="main-title">
          <span className="main-title-main">C#</span>
          <span className="main-title-sub">{t.mainTitle}</span>
          <span className="main-title-en">{t.mainTitleEn}</span>
        </h1>
        <p className="main-subtitle">
          {t.mainSubtitle}
        </p>
        <p className="main-description">
          {t.mainDescription}
        </p>
      </div>

      {tutorials.length > 0 ? (
        <>
          {sortedCategories.map((category) => {
            const categoryTutorials = tutorialsByCategory[category];
            if (!categoryTutorials || categoryTutorials.length === 0) return null;

            return (
              <section 
                key={category} 
                className="tutorial-category-section"
                style={{ marginBottom: '3rem' }}
              >
                <h2 
                  className="category-title"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    color: 'var(--slate-100)',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--slate-700)'
                  }}
                >
                  {category}
                </h2>
                <div className="tutorial-list" aria-label={`${category} ${t.tutorialList}`}>
                  {categoryTutorials.map((tutorial, index) => {
                    // 언어에 따라 타이틀 선택
                    const displayTitle = locale === 'en' && tutorial.titleEn ? tutorial.titleEn : tutorial.title;
                    // 언어에 따라 slug 선택
                    const displaySlug = locale === 'en' && tutorial.slugEn ? tutorial.slugEn : tutorial.slug;
                    
                    return (
                      <Link
                        key={tutorial.slug}
                        href={`/tutorials/${displaySlug}`}
                        className="tutorial-item"
                        aria-label={`${displayTitle} ${t.tutorialList}`}
                      >
                        <span className="tutorial-number" aria-hidden="true">
                          {String(tutorial.order ?? index + 1).padStart(2, '0')}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 className="tutorial-title">
                            <span className="tutorial-title-kr">{displayTitle}</span>
                            {locale === 'ko' && tutorial.titleEn && (
                              <span className="tutorial-title-en">({tutorial.titleEn})</span>
                            )}
                            {locale === 'en' && tutorial.title && tutorial.title !== tutorial.titleEn && (
                              <span className="tutorial-title-en">({tutorial.title})</span>
                            )}
                          </h3>
                        </div>
                        <svg className="tutorial-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </>
      ) : (
        <div className="empty-state" role="status" aria-live="polite">
          <p>{t.noTutorials}</p>
          <p>
            <code>content/docs/</code>
            <span>{t.addTutorials}</span>
          </p>
        </div>
      )}
    </div>
  );
}

