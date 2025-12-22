# 유니티 C# 튜토리얼

Unity와 C# 프로그래밍을 학습할 수 있는 Next.js 기반 웹사이트입니다. 마크다운 파일을 기반으로 한 간단하고 모던한 튜토리얼 플랫폼입니다.

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
- **CSS** - 일반 CSS로 스타일 관리
- **gray-matter** - Frontmatter 파싱
- **remark/rehype** - Markdown을 HTML로 변환
- **rehype-highlight** - 코드 하이라이팅

## 프로젝트 구조

```
csharp-tutorials/
├── app/                          # Next.js App Router 디렉토리
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지 (튜토리얼 목록)
│   ├── globals.css               # 전역 스타일
│   ├── sitemap.ts                # 사이트맵 자동 생성
│   ├── robots.ts                 # robots.txt 자동 생성
│   └── tutorials/
│       └── [...slug]/
│           └── page.tsx          # 동적 튜토리얼 페이지 (catch-all 라우트)
├── content/                       # 마크다운 콘텐츠 파일
│   └── docs/                     # 튜토리얼 MD 파일들
│       ├── 01-변수와-조건문-기초.md
│       ├── 02-비교-연산자와-논리-연산자.md
│       ├── 03-상수와-switch-case-문.md
│       ├── ... (중간 파일들)
│       ├── 21-델리게이트-Delegate.md
│       ├── 22-이벤트-Event.md
│       ├── 23-유니티-함수-실행-순서.md
│       ├── 24-딕셔너리-Dictionary.md
│       ├── 25-Random-함수.md
│       ├── 26-ToString-메서드.md
│       ├── 27-룰렛-회전-제어.md
│       ├── 28-마우스-드래그로-자동차-제어.md
│       ├── 29-로컬-좌표계와-월드-좌표계.md
│       ├── 30-Rect-Transform.md
│       ├── 31-Unity-내장-함수-정리.md
│       └── ... (총 31개 파일, 각 파일에 영문 버전 .en.md 파일 포함)
├── lib/                          # 유틸리티 함수
│   └── markdown.ts               # MD 파일 파싱 및 변환 함수
├── public/                       # 정적 파일
├── package.json                  # 프로젝트 의존성
├── tailwind.config.ts            # Tailwind CSS 설정
└── tsconfig.json                 # TypeScript 설정
```

## MD 파일 관리

### 위치

모든 튜토리얼 MD 파일은 **`content/docs/`** 디렉토리에 저장합니다.

파일을 추가하면 자동으로 홈페이지에 표시되며, 파일명의 숫자 순서대로 자동 정렬됩니다.

### 파일 명명 규칙

- 숫자로 시작하여 순서를 나타냅니다 (예: `01-변수와-조건문-기초.md`, `02-비교-연산자와-논리-연산자.md`)
- 하이픈(-)으로 단어를 구분합니다
- 한글 파일명을 지원합니다
- 파일명의 첫 번째 숫자가 정렬 순서로 사용됩니다

### MD 파일 형식

각 MD 파일은 다음과 같은 형식을 따릅니다:

```markdown
---
title: "기초 문법"
category: "기초"
order: 1
description: "C#의 기본 문법을 학습합니다"
---

# 제목

## 섹션

내용...

### 하위 섹션

코드 예제:

```csharp
int number = 10;
Console.WriteLine(number);
```
```

### Frontmatter (선택사항)

파일 상단에 YAML frontmatter를 추가하여 메타데이터를 포함할 수 있습니다:

- `title`: 튜토리얼 제목 (없으면 파일명에서 추출)
- `titleEn`: 영어 제목 (선택사항, 리스트에 "한글 제목 (English Title)" 형식으로 표시)
- `category`: 카테고리 (예: "기초", "고급")
- `order`: 정렬 순서 (없으면 파일명의 숫자 사용)
- `description`: 설명 (홈페이지에 표시)

예시:
```yaml
---
title: "변수와 조건문 기초"
titleEn: "Variables and Conditional Statements"
category: "기초"
order: 1
---
```

### 자동 인식

- `content/docs/` 디렉토리에 `.md` 파일을 추가하면 자동으로 홈페이지에 표시됩니다
- 파일명의 숫자 순서대로 정렬됩니다 (예: `01-`, `02-`, ...)
- 각 튜토리얼은 `/tutorials/docs/[파일명]` 경로로 접근할 수 있습니다
- 한글 파일명도 완벽하게 지원됩니다 (URL 인코딩/디코딩 자동 처리)
- 제목은 다음 순서로 자동 추출됩니다:
  1. Frontmatter의 `title` 필드
  2. MD 파일 첫 번째 줄의 `# 제목`
  3. 파일명에서 숫자와 확장자 제거 후 하이픈을 공백으로 변환

### 특수 기능

- **README.md 링크 자동 변환**: MD 파일 내부의 `[← 목차로 돌아가기](../README.md)` 링크가 자동으로 홈페이지(`/`)로 변환됩니다
- **이전/다음 네비게이션**: 각 튜토리얼 페이지 하단에 이전/다음 튜토리얼로 이동할 수 있는 네비게이션이 자동으로 생성됩니다
- **용어 자동 변환**: 마크다운 콘텐츠에서 특정 한글 용어가 자동으로 "한글(영문)" 형식으로 변환됩니다 (예: "변수" → "변수(variable)")
  - 용어 사전은 `lib/terms.ts` 파일에서 관리합니다
  - 코드 블록, 이미지, 링크 내부의 용어는 변환되지 않습니다

## 주요 기능

- ✅ **MD 파일 기반 콘텐츠 관리** - `content/docs/` 폴더에 MD 파일만 추가하면 자동 반영
- ✅ **자동 튜토리얼 목록 생성** - 파일명 순서대로 자동 정렬 및 표시
- ✅ **코드 하이라이팅** - C# 코드 구문 강조 표시
- ✅ **다크 모드 지원** - 시스템 설정에 따른 자동 다크 모드
- ✅ **GitHub Flavored Markdown 지원** - 테이블, 체크박스 등 GFM 기능 지원
- ✅ **정적 사이트 생성 (SSG)** - 빌드 시 모든 페이지 미리 생성
- ✅ **이전/다음 네비게이션** - 튜토리얼 간 쉬운 이동
- ✅ **반응형 디자인** - 모바일, 태블릿, 데스크톱 지원
- ✅ **다크 그레이 모던 테마** - 깔끔하고 읽기 쉬운 UI
- ✅ **SEO 최적화** - 메타데이터, 구조화된 데이터, 사이트맵 자동 생성

## 디자인 특징

- **모던한 블루/그레이 테마**: 부드러운 그라데이션 배경과 블루 액센트 컬러
- **심플한 리스트 UI**: 깔끔한 카드 디자인과 호버 효과
- **반투명 효과**: backdrop-blur를 활용한 모던한 글래스모피즘 스타일
- **읽기 최적화**: 적절한 폰트 크기와 줄 간격으로 가독성 향상

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

## SEO 최적화

이 프로젝트는 검색 엔진 최적화(SEO)를 위해 다음과 같은 기능을 포함하고 있습니다:

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
- **CollectionPage**: 튜토리얼 목록 페이지에 컬렉션 정보 포함
- **학습 경로 정보**: 선수과목(coursePrerequisites) 정보 포함

### 사이트맵 및 Robots.txt

- **자동 사이트맵 생성**: `app/sitemap.ts`를 통해 모든 페이지 자동 포함
- **Robots.txt**: `app/robots.ts`를 통해 검색 엔진 크롤링 규칙 설정

### 시맨틱 HTML

- **의미 있는 HTML 태그**: `<article>`, `<nav>`, `<header>`, `<section>` 등 적절한 시맨틱 태그 사용
- **ARIA 속성**: 접근성을 위한 ARIA 레이블 및 속성 추가
- **rel 속성**: 이전/다음 링크에 `rel="prev"`, `rel="next"` 속성 추가

### GEO (Generative Engine Optimization)

이 프로젝트는 AI 검색 엔진(예: ChatGPT, Perplexity, Google AI Overview)을 위한 GEO 최적화를 포함하고 있습니다:

- **Course 스키마**: 튜토리얼을 교육 과정으로 구조화하여 AI가 학습 경로를 이해할 수 있도록 함
- **학습 목표 명시**: 각 튜토리얼의 목표와 학습 내용을 명확히 정의
- **선수과목 정보**: 이전 튜토리얼과의 연결 관계를 구조화된 데이터로 제공
- **교육 수준 표시**: Beginner, Intermediate, Advanced 등 교육 수준 명시
- **명확한 설명**: AI가 이해하기 쉬운 구조화된 설명과 메타데이터

### 환경 변수 설정

프로덕션 환경에서는 `.env.local` 파일에 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

이 URL은 메타데이터, 사이트맵, 구조화된 데이터에서 사용됩니다.

## 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.