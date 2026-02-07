# app/ - Next.js App Router

## 라우팅

- 홈: `/`
- 튜토리얼: `/tutorials/docs/[slug]`
- 예: `/tutorials/docs/01-변수와-조건문-기초`

## React/Next.js 패턴

- 서버 컴포넌트 우선 사용 (App Router)
- 클라이언트 컴포넌트는 `'use client'` 명시
- 컴포넌트는 `app/components/`에 배치

## 주요 파일

| 파일 | 설명 |
|------|------|
| `layout.tsx` | 루트 레이아웃, 메타데이터, GA 설정 |
| `page.tsx` | 홈페이지 (튜토리얼 목록) |

## 컴포넌트

| 컴포넌트 | 타입 | 설명 |
|---------|------|------|
| `Header.tsx` | 클라이언트 | 네비게이션 바, 언어 전환 버튼 포함 |
| `Footer.tsx` | 서버 | 푸터 섹션 |
| `LanguageProvider.tsx` | 클라이언트 | Context API로 언어 상태 관리 |
| `LanguageSwitcher.tsx` | 클라이언트 | 언어 전환 UI 버튼 |
| `MainPageContent.tsx` | 클라이언트 | 홈페이지 튜토리얼 목록 렌더링 |
| `TagSidebar.tsx` | 클라이언트 | 카테고리/태그 필터링 사이드바 |
| `TutorialPageContent.tsx` | 클라이언트 | 튜토리얼 상세 콘텐츠 표시 |

## Google Analytics

- **측정 ID**: `G-91EN6ZPDC2`
- **위치**: `layout.tsx`에 직접 설정
- **추적 항목**: 페이지뷰, 사용자 행동
- **설정**: `gtag.js` 라이브러리 사용
