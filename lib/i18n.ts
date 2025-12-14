export type Locale = 'ko' | 'en';

export const defaultLocale: Locale = 'ko';
export const locales: Locale[] = ['ko', 'en'];

export const translations = {
  ko: {
    // 공통
    siteName: 'C# 프로그래밍 튜토리얼',
    siteNameShort: '튜토리얼',
    home: '홈',
    backToHome: '홈으로 돌아가기',
    
    // 메인 페이지
    mainTitle: '마스터하기',
    mainTitleEn: '(C# Master Programming)',
    mainSubtitle: 'Unity 게임 개발을 위한 C# 프로그래밍을 처음부터 차근차근 배워보세요',
    mainDescription: '변수와 조건문부터 클래스와 상속까지, Unity에서 바로 활용할 수 있는 실전 예제와 함께 C#의 핵심 개념을 쉽고 재미있게 학습할 수 있습니다.',
    tutorialList: '튜토리얼 목록',
    noTutorials: '아직 튜토리얼이 없습니다',
    addTutorials: '디렉토리에 MD 파일을 추가하세요',
    
    // 상세 페이지
    prevTutorial: '이전 튜토리얼',
    nextTutorial: '다음 튜토리얼',
    backToList: '튜토리얼 목록으로 돌아가기',
    articleSection: 'Unity C# 기초',
    
    // Footer
    footerDescription: 'Unity와 C#을 체계적으로 학습할 수 있는 온라인 튜토리얼',
    allRightsReserved: 'All rights reserved.',
    
    // SEO
    seoTitle: 'C# 프로그래밍 마스터하기 | Unity 게임 개발 튜토리얼',
    seoDescription: 'Unity 게임 개발을 위한 C# 프로그래밍을 처음부터 차근차근 배워보세요. 변수와 조건문부터 클래스와 상속까지, Unity에서 바로 활용할 수 있는 실전 예제와 함께 C#의 핵심 개념을 쉽고 재미있게 학습할 수 있습니다.',
  },
  en: {
    // Common
    siteName: 'C# Programming Tutorial',
    siteNameShort: 'Tutorial',
    home: 'Home',
    backToHome: 'Back to Home',
    
    // Main page
    mainTitle: 'Master',
    mainTitleEn: '(C# Master Programming)',
    mainSubtitle: 'Learn C# programming for Unity game development from the ground up',
    mainDescription: 'From variables and conditionals to classes and inheritance, master the core concepts of C# through practical examples that you can immediately apply in Unity.',
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
    seoTitle: 'Master C# Programming | Unity Game Development Tutorial',
    seoDescription: 'Learn C# programming for Unity game development from the ground up. From variables and conditionals to classes and inheritance, master the core concepts of C# through practical examples that you can immediately apply in Unity.',
  },
} as const;

export type TranslationKey = keyof typeof translations.ko;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations[defaultLocale][key];
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}

