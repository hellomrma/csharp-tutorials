export type Locale = 'ko' | 'en';

export const defaultLocale: Locale = 'ko';
export const locales: Locale[] = ['ko', 'en'];

export const translations = {
  ko: {
    // 공통
    siteName: '유니티 C# 튜토리얼',
    siteNameShort: '튜토리얼',
    home: '홈',
    backToHome: '홈으로 돌아가기',
    
    // 메인 페이지
    mainTitle: '마스터하기',
    mainTitleEn: '(Master Unity C#)',
    mainSubtitle: 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼',
    mainDescription: 'Unity 게임 개발을 위한 C# 기초부터 고급 개념까지, 실전 예제와 상세한 설명으로 Unity C#을 마스터하세요.',
    tutorialList: '튜토리얼 목록',
    noTutorials: '아직 튜토리얼이 없습니다',
    addTutorials: '디렉토리에 MD 파일을 추가하세요',
    
    // 상세 페이지
    prevTutorial: '이전 튜토리얼',
    nextTutorial: '다음 튜토리얼',
    backToList: '튜토리얼 목록으로 돌아가기',
    articleSection: 'Unity C# 기초',
    
    // Footer
    footerDescription: 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼',
    allRightsReserved: 'All rights reserved.',
    
    // SEO
    seoTitle: '유니티 C# 튜토리얼 | Unity C# 마스터하기',
    seoDescription: 'Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 온라인 튜토리얼입니다. Unity 게임 개발을 위한 C# 기초부터 고급 개념까지, 실전 예제와 상세한 설명으로 Unity C#을 마스터하세요.',
  },
  en: {
    // Common
    siteName: 'Unity C# Tutorial',
    siteNameShort: 'Tutorial',
    home: 'Home',
    backToHome: 'Back to Home',
    
    // Main page
    mainTitle: 'Master',
    mainTitleEn: '(Unity C#)',
    mainSubtitle: 'Online tutorial to systematically learn Unity and C# programming',
    mainDescription: 'Master Unity C# from basics to advanced concepts with practical examples and detailed explanations for Unity game development.',
    tutorialList: 'Tutorial List',
    noTutorials: 'No tutorials yet',
    addTutorials: 'Add MD files to the directory',
    
    // Detail page
    prevTutorial: 'Previous Tutorial',
    nextTutorial: 'Next Tutorial',
    backToList: 'Back to Tutorial List',
    articleSection: 'Unity C# Basics',
    
    // Footer
    footerDescription: 'Online tutorial to systematically learn Unity and C#',
    allRightsReserved: 'All rights reserved.',
    
    // SEO
    seoTitle: 'Unity C# Tutorial | Master Unity C# Programming',
    seoDescription: 'Online tutorial to systematically learn Unity and C# programming. Master Unity C# from basics to advanced concepts with practical examples and detailed explanations for Unity game development.',
  },
} as const;

export type TranslationKey = keyof typeof translations.ko;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations[defaultLocale][key];
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}

