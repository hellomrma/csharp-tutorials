# lib/ - 유틸리티 함수

## 파일 목록

| 파일 | 설명 |
|------|------|
| `markdown.ts` | 튜토리얼 데이터 로딩 및 MD → HTML 변환 |
| `i18n.ts` | 다국어 번역 문자열 관리 |
| `terms.ts` | 용어 자동 변환 사전 (변수→변수(variable)) |
| `cache.ts` | 메모리 기반 캐싱 시스템 |
| `seo.ts` | SEO JSON-LD 스키마 생성 유틸리티 |
| `tags.ts` | 태그 관리 |
| `cookies.ts` | 쿠키 관리 (언어 설정) |

## 캐싱 시스템 (cache.ts)

- **프로덕션**: 무제한 캐싱 (한 번 로드하면 메모리에 유지)
- **개발**: 5분 TTL (hot reload 지원)
- **캐싱 대상**: `getAllTutorials()`, `getTutorialBySlug()`, `getAllTutorialSlugs()`
- **성능 향상**: 반복적인 파일 읽기 및 마크다운 파싱 방지
- **빌드 최적화**: 정적 생성 시 빌드 속도 크게 향상
