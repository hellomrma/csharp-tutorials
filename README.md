# 유니티 C# 튜토리얼

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.7-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Private-red?style=flat)](LICENSE)

Unity와 C# 프로그래밍을 학습할 수 있는 Next.js 기반 웹사이트입니다. 마크다운 파일을 기반으로 한 간단하고 모던한 튜토리얼 플랫폼입니다.

**🌐 라이브 데모**: [https://csharp-tutorials.vercel.app](https://csharp-tutorials.vercel.app)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 기술 스택

- **Next.js 14** - React 프레임워크 (App Router)
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **gray-matter** - Frontmatter 파싱
- **remark/rehype** - Markdown을 HTML로 변환
- **rehype-highlight** - 코드 하이라이팅

## 프로젝트 구조

```
csharp-tutorials/
├── app/                          # Next.js App Router 디렉토리
│   ├── components/               # React 컴포넌트
│   │   ├── Footer.tsx            # 푸터 컴포넌트
│   │   ├── Header.tsx            # 헤더/네비게이션
│   │   ├── LanguageProvider.tsx  # 다국어 Context Provider
│   │   ├── LanguageSwitcher.tsx  # 언어 전환 UI
│   │   ├── MainPageContent.tsx   # 메인 페이지 콘텐츠
│   │   ├── TagSidebar.tsx        # 태그 사이드바
│   │   └── TutorialPageContent.tsx # 튜토리얼 상세 페이지
│   ├── tutorials/
│   │   └── [...slug]/
│   │       └── page.tsx          # 동적 튜토리얼 페이지 (catch-all 라우트)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지 (튜토리얼 목록)
│   ├── globals.css               # 전역 스타일
│   ├── sitemap.ts                # 사이트맵 자동 생성
│   ├── robots.ts                 # robots.txt 자동 생성
│   ├── error.tsx                 # 에러 페이지
│   └── not-found.tsx             # 404 페이지
├── content/                      # 마크다운 콘텐츠 파일
│   ├── docs/                     # 튜토리얼 MD 파일들 (총 45개, 각각 영문 버전 포함)
│   │   ├── 01-변수와-조건문-기초.md
│   │   ├── 01-변수와-조건문-기초.en.md
│   │   ├── ...
│   │   ├── 43-씬-관리-SceneManager.md
│   │   ├── 44-2D-플랫포머-게임-기초.md
│   │   └── 45-밤송이-던지기-게임.md
│   └── sources/                  # 소스 코드 예제
├── lib/                          # 유틸리티 함수
│   ├── markdown.ts               # MD 파일 파싱 및 변환
│   ├── i18n.ts                   # 다국어 설정 및 번역
│   ├── cache.ts                  # 튜토리얼 캐싱
│   ├── cookies.ts                # 쿠키 관리
│   ├── seo.ts                    # SEO 유틸리티
│   ├── tags.ts                   # 태그 관리
│   └── terms.ts                  # 용어 자동 변환
├── package.json                  # 프로젝트 의존성
├── tailwind.config.ts            # Tailwind CSS 설정
├── next.config.js                # Next.js 설정
└── tsconfig.json                 # TypeScript 설정
```

## 튜토리얼 목록 (총 45개)

### Unity C# 기초 (1~26)

1. 변수와 조건문 기초
2. 비교 연산자와 논리 연산자
3. 상수와 switch-case 문
4. 열거형 (enum)
5. 함수 기초
6. 반환값이 있는 함수
7. 매개변수가 있는 함수
8. 여러 매개변수 사용하기
9. 사칙연산 함수 만들기
10. 함수 오버로딩
11. 클래스와 상속
12. 접근 제한자 심화
13. 배열 (Array)
14. 리스트 (List)
15. 값 형식과 참조 형식
16. 반복문 (Loop)
17. 변수와 프로퍼티
18. 클래스 생성자
19. 가상 함수 (virtual/override)
20. 인터페이스 (Interface)
21. 델리게이트 (Delegate)
22. 이벤트 (Event)
23. 유니티 함수 실행 순서
24. 딕셔너리 (Dictionary)
25. Random 함수
26. ToString 메서드

### Unity C# 응용 (27~31)

27. 룰렛 회전 제어
28. 마우스 드래그로 자동차 제어
29. 로컬 좌표계와 월드 좌표계
30. Rect Transform
31. Unity 내장 함수 정리

### Unity C# 고급 (32~45)

32. GameObject 찾기와 컴포넌트 가져오기
33. 오브젝트 생성과 삭제
34. 2D 충돌 감지
35. 코루틴 (Coroutine)
36. 싱글톤 패턴
37. Rigidbody2D와 Collider2D
38. 화살 피하기 게임 구현
39. 원-원 충돌 감지 알고리즘
40. 정적 변수 (static)
41. Mathf 고급 함수와 부동소수점 오차
42. Unity 속성 (Attributes)
43. 씬 관리 (SceneManager)
44. 2D 플랫포머 게임 기초
45. 밤송이 던지기 게임

## MD 파일 관리

### 위치

모든 튜토리얼 MD 파일은 **`content/docs/`** 디렉토리에 저장합니다.

파일을 추가하면 자동으로 홈페이지에 표시되며, 파일명의 숫자 순서대로 자동 정렬됩니다.

### 파일 명명 규칙

- 숫자로 시작하여 순서를 나타냅니다 (예: `01-변수와-조건문-기초.md`, `02-비교-연산자와-논리-연산자.md`)
- 하이픈(-)으로 단어를 구분합니다
- 한글 파일명을 지원합니다
- 영문 버전은 `.en.md` 확장자 사용 (예: `01-변수와-조건문-기초.en.md`)

### MD 파일 형식

각 MD 파일은 다음과 같은 형식을 따릅니다:

```markdown
---
title: "기초 문법"
titleEn: "Basic Syntax"
category: "기초"
categoryEn: "Basics"
order: 1
description: "C#의 기본 문법을 학습합니다"
descriptionEn: "Learn basic C# syntax"
slugEn: "01-variables-and-conditionals"
---

# 제목

## 섹션

내용...
```

### Frontmatter 필드

- `title`: 튜토리얼 제목 (없으면 파일명에서 추출)
- `titleEn`: 영어 제목
- `category`: 카테고리 (예: "기초", "고급")
- `categoryEn`: 영어 카테고리
- `order`: 정렬 순서 (없으면 파일명의 숫자 사용)
- `description`: 설명 (홈페이지에 표시)
- `descriptionEn`: 영어 설명
- `slugEn`: 영어 URL slug

### 자동 인식

- `content/docs/` 디렉토리에 `.md` 파일을 추가하면 자동으로 홈페이지에 표시됩니다
- 파일명의 숫자 순서대로 정렬됩니다 (예: `01-`, `02-`, ...)
- 각 튜토리얼은 `/tutorials/docs/[파일명]` 경로로 접근할 수 있습니다
- 한글 파일명도 완벽하게 지원됩니다 (URL 인코딩/디코딩 자동 처리)

## 주요 기능

- **MD 파일 기반 콘텐츠 관리** - `content/docs/` 폴더에 MD 파일만 추가하면 자동 반영
- **다국어 지원 (한국어/영어)** - 언어 전환 가능, `.en.md` 영문 파일 지원
- **자동 튜토리얼 목록 생성** - 파일명 순서대로 자동 정렬 및 표시
- **코드 하이라이팅** - C# 코드 구문 강조 표시
- **다크 모드 지원** - 시스템 설정에 따른 자동 다크 모드
- **GitHub Flavored Markdown 지원** - 테이블, 체크박스 등 GFM 기능 지원
- **정적 사이트 생성 (SSG)** - 빌드 시 모든 페이지 미리 생성
- **이전/다음 네비게이션** - 튜토리얼 간 쉬운 이동
- **반응형 디자인** - 모바일, 태블릿, 데스크톱 지원
- **용어 자동 변환** - 한글 용어를 "한글(영문)" 형식으로 자동 변환
- **캐싱 시스템** - 튜토리얼 데이터 캐싱으로 성능 최적화
- **SEO 최적화** - 메타데이터, 구조화된 데이터, 사이트맵 자동 생성

## 특수 기능

### 용어 자동 변환

마크다운 콘텐츠에서 특정 한글 용어가 자동으로 "한글(영문)" 형식으로 변환됩니다.

- 예: "변수" → "변수(variable)"
- 용어 사전은 `lib/terms.ts` 파일에서 관리합니다
- 코드 블록, 이미지, 링크 내부의 용어는 변환되지 않습니다

### 다국어 지원

- 언어 전환 버튼으로 한국어/영어 전환 가능
- 각 튜토리얼에 `.en.md` 영문 버전 제공
- 쿠키를 통한 언어 설정 유지

## 개발

### 환경 요구사항

- Node.js 18.17.0 이상
- npm 또는 yarn

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 배포

### Vercel 배포 (권장)

이 프로젝트는 Vercel에 최적화되어 있습니다.

1. **Vercel에 배포하기**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/csharp-tutorials)

또는 Vercel CLI 사용:

```bash
npm install -g vercel
vercel
```

2. **환경 변수 설정**

Vercel 프로젝트 설정 → Environment Variables에서 다음을 추가:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

3. **자동 배포**

- `main` 브랜치에 push하면 프로덕션 자동 배포
- PR 생성 시 프리뷰 배포 자동 생성

### 기타 플랫폼 배포

**Netlify**:
```bash
npm run build
```
빌드 디렉토리: `.next`

**Docker**:
```dockerfile
# Dockerfile 예시
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## SEO 최적화

### 메타데이터

- **기본 메타데이터**: 각 페이지에 적절한 title, description, keywords 설정
- **Open Graph 태그**: 소셜 미디어 공유 시 최적화된 미리보기
- **Twitter Cards**: Twitter 공유 시 최적화된 카드 표시
- **동적 메타데이터**: 각 튜토리얼 페이지에 개별 메타데이터 자동 생성

### 구조화된 데이터 (JSON-LD)

- **Article 스키마**: 각 튜토리얼 페이지에 Article 구조화된 데이터 포함
- **Course 스키마**: 각 튜토리얼을 교육 과정으로 표시 (GEO 최적화)
- **BreadcrumbList**: 페이지 계층 구조를 검색 엔진에 명확히 전달
- **WebSite 스키마**: 홈페이지에 웹사이트 정보 포함
- **학습 경로 정보**: 선수과목(coursePrerequisites) 정보 포함

### 사이트맵 및 Robots.txt

- **자동 사이트맵 생성**: `app/sitemap.ts`를 통해 모든 페이지 자동 포함
- **Robots.txt**: `app/robots.ts`를 통해 검색 엔진 크롤링 규칙 설정

### 환경 변수 설정

프로덕션 환경에서는 `.env.local` 파일에 다음 변수를 설정하세요:

```env
# 사이트 URL (SEO 및 메타데이터에 사용)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics 측정 ID (선택 사항, 현재는 layout.tsx에 하드코딩됨)
# NEXT_PUBLIC_GA_ID=G-YOUR-GA-ID
```

**참고**:
- 현재 Google Analytics ID (`G-91EN6ZPDC2`)는 `app/layout.tsx`에 직접 설정되어 있습니다.
- Vercel에 배포할 때는 프로젝트 설정에서 환경 변수를 설정하세요.

## 기여하기

프로젝트에 기여하고 싶으시다면 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

간단한 기여 방법:
1. 이 저장소를 Fork합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 버그 리포트 및 기능 제안

- 버그를 발견하셨나요? [Issue](https://github.com/yourusername/csharp-tutorials/issues)를 생성해주세요
- 새로운 기능 제안? [Discussions](https://github.com/yourusername/csharp-tutorials/discussions)에서 논의해주세요

## 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

## 감사의 말

- Unity 공식 문서
- Next.js 팀
- 오픈소스 커뮤니티
