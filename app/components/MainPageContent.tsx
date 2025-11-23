'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import type { TutorialMeta } from '@/lib/markdown';

interface MainPageContentProps {
  tutorials: TutorialMeta[];
}

export default function MainPageContent({ tutorials }: MainPageContentProps) {
  const { t, locale } = useLanguage();

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
        <section className="tutorial-list" aria-label={t.tutorialList}>
          {tutorials.map((tutorial, index) => {
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
                  <h2 className="tutorial-title">
                    <span className="tutorial-title-kr">{displayTitle}</span>
                    {locale === 'ko' && tutorial.titleEn && (
                      <span className="tutorial-title-en">({tutorial.titleEn})</span>
                    )}
                    {locale === 'en' && tutorial.title && tutorial.title !== tutorial.titleEn && (
                      <span className="tutorial-title-en">({tutorial.title})</span>
                    )}
                  </h2>
                </div>
                <svg className="tutorial-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </section>
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

