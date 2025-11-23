# 코드베이스 개선 사항 분석

## 🔴 높은 우선순위

### 1. Sitemap 다국어 지원
**현재 문제:**
- `app/sitemap.ts`에서 한국어 slug만 포함
- 영문 slug (`slugEn`)가 누락됨

**개선 방안:**
```typescript
// 한국어와 영문 slug 모두 포함
const allSlugs = [
  ...tutorials.map(t => t.slug),
  ...tutorials.filter(t => t.slugEn).map(t => t.slugEn)
];
```

### 2. 타입 안정성 개선
**현재 문제:**
- `app/tutorials/[...slug]/page.tsx:179`에서 `any` 타입 사용
- JSON-LD 스키마 타입 정의 부재

**개선 방안:**
```typescript
interface CourseJsonLd {
  '@context': string;
  '@type': 'Course';
  name: string;
  // ... 나머지 필드
}
```

### 3. SEO 메타데이터 개선
**현재 문제:**
- `app/page.tsx`에서 `inLanguage`가 하드코딩됨 (`'ko-KR'`)
- locale에 따라 동적으로 변경되어야 함

**개선 방안:**
```typescript
inLanguage: locale === 'en' ? 'en-US' : 'ko-KR'
```

## 🟡 중간 우선순위

### 4. 에러 처리 개선
**현재 문제:**
- `lib/markdown.ts`에서 `console.error`만 사용
- 사용자에게 에러 피드백이 없음

**개선 방안:**
- 에러 바운더리 추가
- 사용자 친화적인 에러 메시지 표시

### 5. 성능 최적화
**현재 문제:**
- 매 요청마다 파일 시스템 접근
- 중복 파일 읽기

**개선 방안:**
- 파일 내용 캐싱
- 빌드 타임에 정적 생성 최대화

### 6. 코드 중복 제거
**현재 문제:**
- JSON-LD 생성 로직이 여러 곳에 중복
- 유사한 메타데이터 생성 코드 반복

**개선 방안:**
- `lib/seo.ts` 유틸 함수 생성
- 재사용 가능한 헬퍼 함수로 분리

## 🟢 낮은 우선순위

### 7. 접근성 개선
- 일부 aria-label 개선
- 키보드 네비게이션 강화

### 8. 테스트 추가
- 단위 테스트
- 통합 테스트

### 9. 문서화
- API 문서
- 컴포넌트 문서

