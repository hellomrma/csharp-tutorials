# CLAUDE.md - 프로젝트 컨텍스트

Unity와 C# 프로그래밍을 학습할 수 있는 Next.js 14 기반 튜토리얼 웹사이트입니다.

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **콘텐츠**: Markdown 파일 기반 (47개 튜토리얼, 한국어/영어)
- **분석**: Google Analytics (GA4)
- **배포**: Vercel

## 핵심 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 빌드
npm start        # 프로덕션 실행
npm run lint     # 린트 검사
```

## 디렉토리 구조

```
app/                    # Next.js App Router (→ app/CLAUDE.md)
├── components/         # React 컴포넌트
├── tutorials/[...slug]/ # 동적 튜토리얼 라우트
├── layout.tsx          # 루트 레이아웃
└── page.tsx            # 홈페이지

content/                # 콘텐츠 (→ content/CLAUDE.md)
├── docs/               # 튜토리얼 마크다운 파일
└── sources/            # 예제 소스 코드

lib/                    # 유틸리티 함수 (→ lib/CLAUDE.md)
```

## 환경 변수

`.env.local` 파일에 설정:

```bash
NEXT_PUBLIC_SITE_URL=https://csharp-tutorials.vercel.app
```

**참고**: Google Analytics ID (`G-91EN6ZPDC2`)는 `app/layout.tsx`에 직접 설정되어 있습니다.

## 코딩 컨벤션

### TypeScript
- 타입 정의는 명시적으로 작성
- `interface` 사용 권장 (객체 타입)
- 유틸리티 함수는 `lib/` 디렉토리에 배치

### 파일 명명
- 컴포넌트: PascalCase (`Header.tsx`)
- 유틸리티: camelCase (`markdown.ts`)
- 튜토리얼: `XX-제목.md` 형식 (XX는 숫자)

### CSS
- Tailwind CSS 유틸리티 클래스 사용
- 글로벌 스타일은 `app/globals.css`

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

## 개선 사항 추적

`IMPROVEMENTS.md` 파일 참조. 주요 완료 항목:
- Sitemap 다국어 지원, 타입 안정성 개선, SEO 메타데이터 개선
- 에러 처리 개선, 성능 최적화 (캐싱), 코드 중복 제거
