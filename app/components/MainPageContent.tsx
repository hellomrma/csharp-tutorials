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

  // 카테고리 순서 정의 (기초 → 응용 → 실전)
  const categoryOrder = locale === 'en'
    ? ['Unity C# Basics', 'Unity C# Application', 'Practice']
    : ['Unity C# 기초', 'Unity C# 응용', '실전'];

  // 카테고리 키커 라벨 (영문, 트래킹 와이드)
  const kickerByCategory: Record<string, string> = {
    'Unity C# 기초': 'Basics',
    'Unity C# 응용': 'Application',
    '실전': 'Practice',
    'Unity C# Basics': 'Basics',
    'Unity C# Application': 'Application',
    'Practice': 'Practice',
  };

  // 정의된 순서대로 정렬하고, 없는 카테고리는 뒤에 추가
  const sortedCategories = [
    ...categoryOrder.filter(cat => tutorialsByCategory[cat]),
    ...Object.keys(tutorialsByCategory).filter(cat => !categoryOrder.includes(cat))
  ];

  return (
    <div className="container">
      <div className="main-header">
        <p className="kicker main-kicker">Unity C# Tutorials</p>
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

            const kickerLabel = kickerByCategory[category] || 'Section';

            return (
              <section key={category} className="tutorial-category-section">
                <p className="kicker category-kicker">{kickerLabel}</p>
                <h2 className="category-title">{category}</h2>
                <ul className="tutorial-list" aria-label={`${category} ${t.tutorialList}`}>
                  {categoryTutorials.map((tutorial, index) => {
                    const displayTitle = locale === 'en' && tutorial.titleEn ? tutorial.titleEn : tutorial.title;
                    const displaySlug = locale === 'en' && tutorial.slugEn ? tutorial.slugEn : tutorial.slug;
                    const orderLabel = String(tutorial.order ?? index + 1).padStart(2, '0');

                    return (
                      <li key={tutorial.slug}>
                        <Link
                          href={`/tutorials/${displaySlug}`}
                          className="tutorial-item"
                          aria-label={`${displayTitle} ${t.tutorialList}`}
                        >
                          <span className="tutorial-number" aria-hidden="true">
                            № {orderLabel}
                          </span>
                          <h3 className="tutorial-title">
                            <span className="tutorial-title-kr">{displayTitle}</span>
                            {locale === 'ko' && tutorial.titleEn && (
                              <span className="tutorial-title-en">{tutorial.titleEn}</span>
                            )}
                            {locale === 'en' && tutorial.title && tutorial.title !== tutorial.titleEn && (
                              <span className="tutorial-title-en">{tutorial.title}</span>
                            )}
                          </h3>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
