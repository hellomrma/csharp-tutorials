'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import type { TutorialMeta } from '@/lib/markdown';

interface TutorialPageContentProps {
  tutorial: {
    meta: TutorialMeta;
    content: string;
  };
  prevTutorial: TutorialMeta | null;
  nextTutorial: TutorialMeta | null;
}

export default function TutorialPageContent({ tutorial, prevTutorial, nextTutorial }: TutorialPageContentProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="detail-container">
      <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <li>
            <Link href="/" className="nav-link" aria-label={t.backToHome}>
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t.backToHome}</span>
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
            dangerouslySetInnerHTML={{ __html: tutorial.content }}
          />
      </article>

      <nav className="nav-footer" aria-label={`${t.prevTutorial}/${t.nextTutorial} 네비게이션`}>
        {prevTutorial ? (
          <Link 
            href={`/tutorials/${locale === 'en' && prevTutorial.slugEn ? prevTutorial.slugEn : prevTutorial.slug}`} 
            className="nav-card" 
            rel="prev" 
            aria-label={`${t.prevTutorial}: ${prevTutorial.title}`}
          >
            <svg className="nav-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div>
              <div className="nav-card-label">{t.prevTutorial}</div>
              <p className="nav-card-title">{prevTutorial.title}</p>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {nextTutorial ? (
          <Link 
            href={`/tutorials/${locale === 'en' && nextTutorial.slugEn ? nextTutorial.slugEn : nextTutorial.slug}`} 
            className="nav-card nav-card-right" 
            rel="next" 
            aria-label={`${t.nextTutorial}: ${nextTutorial.title}`}
          >
            <div>
              <div className="nav-card-label">{t.nextTutorial}</div>
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
          <span>{t.backToList}</span>
        </Link>
      </div>
    </div>
  );
}

