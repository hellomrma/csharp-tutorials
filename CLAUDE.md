# CLAUDE.md - 프로젝트 컨텍스트

이 문서는 Claude AI가 이 프로젝트를 이해하고 작업하는 데 필요한 컨텍스트를 제공합니다.

## 프로젝트 개요

Unity와 C# 프로그래밍을 학습할 수 있는 Next.js 14 기반 튜토리얼 웹사이트입니다.

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **콘텐츠**: Markdown 파일 기반 (45개 튜토리얼, 한국어/영어)
- **분석**: Google Analytics (GA4)
- **배포**: Vercel

## 핵심 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start

# 린트 검사
npm run lint
```

## 디렉토리 구조

```
app/                    # Next.js App Router
├── components/         # React 컴포넌트
├── tutorials/[...slug]/ # 동적 튜토리얼 라우트
├── layout.tsx          # 루트 레이아웃
└── page.tsx            # 홈페이지

content/docs/           # 튜토리얼 마크다운 파일
├── XX-제목.md          # 한국어 버전
└── XX-제목.en.md       # 영문 버전

content/sources/        # 예제 소스 코드
├── BamsongiController.cs # 밤송이(투사체) 컨트롤러
├── BamsongiGenerator.cs  # 밤송이 생성기
└── TargetController.cs   # 타겟 좌우 이동

lib/                    # 유틸리티 함수
├── markdown.ts         # MD 파싱 및 HTML 변환
├── i18n.ts             # 다국어 설정
├── cache.ts            # 캐싱 시스템 (메모리 캐시)
├── terms.ts            # 용어 자동 변환
├── seo.ts              # SEO 유틸리티 (JSON-LD 생성)
├── tags.ts             # 태그 관리
└── cookies.ts          # 쿠키 관리 (언어 설정)
```

## 환경 변수

프로젝트에서 사용하는 환경 변수입니다. `.env.local` 파일에 설정하세요.

```bash
# 사이트 URL (SEO 및 메타데이터에 사용)
NEXT_PUBLIC_SITE_URL=https://csharp-tutorials.vercel.app

# Google Analytics 측정 ID (이미 layout.tsx에 하드코딩됨)
# NEXT_PUBLIC_GA_ID=G-91EN6ZPDC2
```

**참고**: 현재 Google Analytics ID (`G-91EN6ZPDC2`)는 `app/layout.tsx`에 직접 설정되어 있습니다. 환경 변수로 분리하려면 layout.tsx를 수정하세요.

## 주요 아키텍처

### 콘텐츠 파이프라인

1. `content/docs/` 디렉토리에서 `.md` 파일 읽기
2. `gray-matter`로 frontmatter 파싱
3. `remark` + `rehype`로 Markdown → HTML 변환
4. `rehype-highlight`로 코드 하이라이팅
5. `lib/terms.ts`의 용어 사전으로 자동 변환
6. 캐싱 시스템으로 성능 최적화

### 다국어 지원

- 기본 언어: 한국어 (`ko`)
- 지원 언어: 한국어, 영어 (`ko`, `en`)
- 영문 파일: `.en.md` 확장자
- 번역: `lib/i18n.ts`에서 관리
- 언어 설정: 쿠키로 유지

### 라우팅

- 홈: `/`
- 튜토리얼: `/tutorials/docs/[slug]`
- 예: `/tutorials/docs/01-변수와-조건문-기초`

## 튜토리얼 파일 형식

```markdown
---
title: "변수와 조건문 기초"
titleEn: "Variables and Conditional Statements"
category: "기초"
categoryEn: "Basics"
order: 1
description: "C# 변수와 조건문을 학습합니다"
descriptionEn: "Learn C# variables and conditional statements"
slugEn: "01-variables-and-conditionals"
---

# 튜토리얼 내용
```

## 코딩 컨벤션

### TypeScript

- 타입 정의는 명시적으로 작성
- `interface` 사용 권장 (객체 타입)
- 유틸리티 함수는 `lib/` 디렉토리에 배치

### React/Next.js

- 서버 컴포넌트 우선 사용 (App Router)
- 클라이언트 컴포넌트는 `'use client'` 명시
- 컴포넌트는 `app/components/`에 배치

### CSS

- Tailwind CSS 유틸리티 클래스 사용
- 글로벌 스타일은 `app/globals.css`

### 파일 명명

- 컴포넌트: PascalCase (`Header.tsx`)
- 유틸리티: camelCase (`markdown.ts`)
- 튜토리얼: `XX-제목.md` 형식 (XX는 숫자)

## 주요 파일

| 파일 | 설명 |
|------|------|
| `lib/markdown.ts` | 튜토리얼 데이터 로딩 및 파싱 |
| `lib/i18n.ts` | 다국어 번역 문자열 |
| `lib/terms.ts` | 용어 자동 변환 사전 (변수→변수(variable)) |
| `lib/cache.ts` | 튜토리얼 캐싱 로직 (메모리 캐시) |
| `lib/seo.ts` | SEO JSON-LD 스키마 생성 유틸리티 |
| `app/layout.tsx` | 루트 레이아웃, 메타데이터, GA 설정 |
| `app/page.tsx` | 홈페이지 (튜토리얼 목록) |

## 주요 컴포넌트

| 컴포넌트 | 타입 | 설명 |
|---------|------|------|
| `Header.tsx` | 클라이언트 | 네비게이션 바, 언어 전환 버튼 포함 |
| `Footer.tsx` | 서버 | 푸터 섹션 |
| `LanguageProvider.tsx` | 클라이언트 | Context API로 언어 상태 관리 |
| `LanguageSwitcher.tsx` | 클라이언트 | 언어 전환 UI 버튼 |
| `MainPageContent.tsx` | 클라이언트 | 홈페이지 튜토리얼 목록 렌더링 |
| `TagSidebar.tsx` | 클라이언트 | 카테고리/태그 필터링 사이드바 |
| `TutorialPageContent.tsx` | 클라이언트 | 튜토리얼 상세 콘텐츠 표시 |

## 캐싱 시스템

`lib/cache.ts`는 메모리 기반 캐싱 시스템을 제공합니다:

- **프로덕션**: 무제한 캐싱 (한 번 로드하면 메모리에 유지)
- **개발**: 5분 TTL (hot reload 지원)
- **캐싱 대상**: `getAllTutorials()`, `getTutorialBySlug()`, `getAllTutorialSlugs()`
- **성능 향상**: 반복적인 파일 읽기 및 마크다운 파싱 방지
- **빌드 최적화**: 정적 생성 시 빌드 속도 크게 향상

## 새 튜토리얼 추가

1. `content/docs/`에 새 `.md` 파일 생성
2. 파일명: `XX-제목.md` (XX는 순서 번호)
3. frontmatter 포함 (title, description 등)
4. 영문 버전: `XX-제목.en.md` 파일 생성
5. 자동으로 홈페이지에 표시됨

## 주의사항

- `content/docs/`의 파일명 숫자가 정렬 순서 결정
- 영문 slug는 frontmatter의 `slugEn` 필드로 지정
- 용어 자동 변환은 코드 블록 내부에서는 동작하지 않음
- 빌드 시 모든 페이지가 정적으로 생성됨 (SSG)

## 의존성

주요 패키지:

- `next`: ^14.2.5 (App Router)
- `react`: ^18.3.1
- `typescript`: ^5.5.4
- `gray-matter`: ^4.0.3 (frontmatter 파싱)
- `remark`, `rehype`: Markdown 처리 파이프라인
- `rehype-highlight`: ^7.0.2 (코드 하이라이팅)
- `tailwindcss`: ^3.4.7 (CSS 프레임워크)
- `highlight.js`: ^11.11.1 (구문 강조)

## 분석 및 모니터링

### Google Analytics

- **측정 ID**: `G-91EN6ZPDC2`
- **위치**: `app/layout.tsx`
- **추적 항목**: 페이지뷰, 사용자 행동
- **설정**: `gtag.js` 라이브러리 사용

## 개선 사항 추적

프로젝트의 진행 중인 개선 사항 및 완료된 작업은 `IMPROVEMENTS.md` 파일을 참조하세요.

주요 완료 항목:
- ✅ Sitemap 다국어 지원
- ✅ 타입 안정성 개선
- ✅ SEO 메타데이터 개선
- ✅ 에러 처리 개선 (error.tsx, not-found.tsx)
- ✅ 성능 최적화 (캐싱 시스템)
- ✅ 코드 중복 제거 (lib/seo.ts 유틸리티)

## 문제 해결

### 빌드 오류
- 파일명 인코딩 문제: UTF-8 인코딩 확인
- 마크다운 파싱 오류: frontmatter 형식 검증

### 개발 서버 오류
- 포트 충돌: `lsof -ti:3000 | xargs kill -9`
- 캐시 문제: `.next` 디렉토리 삭제 후 재시작

### 배포 문제
- 환경 변수 누락: Vercel에서 `NEXT_PUBLIC_SITE_URL` 설정 확인
- 빌드 시간 초과: 캐싱 시스템이 제대로 작동하는지 확인
