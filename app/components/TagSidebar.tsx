'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import type { TutorialMeta } from '@/lib/markdown';

interface TagSidebarProps {
  tutorials: TutorialMeta[];
  currentCategory?: string;
}

// 주요 태그 정의 (튜토리얼 제목 기반)
const getPopularTags = (locale: string): string[] => {
  if (locale === 'en') {
    return [
      'Variables',
      'Operators',
      'Constants',
      'Enum',
      'Functions',
      'Return Values',
      'Parameters',
      'Overloading',
      'Classes',
      'Inheritance',
      'Access Modifiers',
      'Properties',
      'Constructors',
      'Virtual',
      'Interfaces',
      'Delegates',
      'Events',
      'Arrays',
      'Lists',
      'Loops',
      'Dictionary',
      'Unity',
    ];
  } else {
    return [
      '변수',
      '조건문',
      '연산자',
      '상수',
      'switch',
      'enum',
      '열거형',
      '함수',
      '반환값',
      '매개변수',
      '오버로딩',
      '클래스',
      '상속',
      '접근제한자',
      '프로퍼티',
      '생성자',
      '가상함수',
      '인터페이스',
      '델리게이트',
      '이벤트',
      '배열',
      '리스트',
      '반복문',
      '딕셔너리',
      '유니티',
      'MonoBehaviour',
    ];
  }
};

export default function TagSidebar({ tutorials, currentCategory }: TagSidebarProps) {
  const { locale } = useLanguage();
  const popularTags = getPopularTags(locale);

  // 각 태그에 해당하는 튜토리얼 찾기
  const tagMap = new Map<string, TutorialMeta[]>();
  
  popularTags.forEach((tag) => {
    const matchingTutorials = tutorials.filter((tutorial) => {
      const title = locale === 'en' && tutorial.titleEn 
        ? tutorial.titleEn 
        : tutorial.title;
      const description = locale === 'en' && tutorial.descriptionEn 
        ? tutorial.descriptionEn 
        : (tutorial.description || '');
      const searchText = `${title} ${description}`.toLowerCase();
      const tagLower = tag.toLowerCase();
      
      // 태그가 제목이나 설명에 포함되어 있는지 확인
      return searchText.includes(tagLower) || 
             title.toLowerCase().includes(tagLower);
    });
    
    if (matchingTutorials.length > 0) {
      tagMap.set(tag, matchingTutorials);
    }
  });

  // 튜토리얼 개수로 정렬 (많이 사용되는 순서)
  const sortedTags = Array.from(tagMap.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 30); // 상위 30개 표시

  // 각 태그의 첫 번째 튜토리얼 URL 생성
  const getTagUrl = (tag: string, tagTutorials: TutorialMeta[]) => {
    const firstTutorial = tagTutorials[0];
    if (!firstTutorial) return '/';
    
    const slug = locale === 'en' && firstTutorial.slugEn 
      ? firstTutorial.slugEn 
      : firstTutorial.slug;
    
    return `/tutorials/${slug}`;
  };

  // 현재 튜토리얼의 태그 찾기
  const getCurrentTags = () => {
    if (!currentCategory) return new Set<string>();
    
    const currentTags = new Set<string>();
    sortedTags.forEach(([tag, tagTutorials]) => {
      const isInTag = tagTutorials.some(t => {
        const cat = locale === 'en' && t.categoryEn ? t.categoryEn : (t.category || '');
        return cat === currentCategory;
      });
      if (isInTag) {
        currentTags.add(tag);
      }
    });
    return currentTags;
  };

  const currentTags = getCurrentTags();

  if (sortedTags.length === 0) {
    return null;
  }

  return (
    <aside className="tag-sidebar">
      <div className="tag-sidebar-content">
        <h3 className="tag-sidebar-title">
          {locale === 'en' ? 'Tags' : 'Tags'}
        </h3>
        <nav className="tag-list" aria-label={locale === 'en' ? 'Tags navigation' : '태그 네비게이션'}>
          {sortedTags.map(([tag, tagTutorials]) => {
            const isActive = currentTags.has(tag);
            const url = getTagUrl(tag, tagTutorials);
            
            return (
              <Link
                key={tag}
                href={url}
                className={`tag-item ${isActive ? 'tag-item-active' : ''}`}
                aria-label={`#${tag}`}
              >
                <span className="tag-name">#{tag}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

