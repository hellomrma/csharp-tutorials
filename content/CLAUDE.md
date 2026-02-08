# content/ - 튜토리얼 콘텐츠

## 콘텐츠 파이프라인

1. `content/docs/` 디렉토리에서 `.md` 파일 읽기
2. `gray-matter`로 frontmatter 파싱
3. `remark` + `rehype`로 Markdown → HTML 변환
4. `rehype-highlight`로 코드 하이라이팅
5. `lib/terms.ts`의 용어 사전으로 자동 변환
6. 캐싱 시스템으로 성능 최적화

## 다국어 지원

- 기본 언어: 한국어 (`ko`)
- 지원 언어: 한국어, 영어 (`ko`, `en`)
- 영문 파일: `.en.md` 확장자
- 번역: `lib/i18n.ts`에서 관리
- 언어 설정: 쿠키로 유지

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

## 카테고리 체계

| 카테고리 | 한국어 frontmatter | 영어 frontmatter | 범위 |
|----------|-------------------|-----------------|------|
| 기초 | Unity C# 기초 | Unity C# Basics | 01-26 |
| 응용 | Unity C# 응용 | Unity C# Application | 27-37, 39-43 |
| 실전 | 실전 | Practice | 38, 44-46 |

## 새 튜토리얼 추가

1. `content/docs/`에 새 `XX-제목.md` 파일 생성
2. frontmatter 포함 (title, category, order, description 등)
3. 영문 버전: `XX-제목.en.md` 파일 생성
4. `content/README.md` 목차 업데이트
5. 루트 `README.md` 튜토리얼 수 및 목록 업데이트
6. 루트 `CLAUDE.md` 튜토리얼 수 업데이트
7. 자동으로 홈페이지에 표시됨

## 주의사항

- `content/docs/`의 파일명 숫자가 정렬 순서 결정
- 영문 slug는 frontmatter의 `slugEn` 필드로 지정
- 용어 자동 변환은 코드 블록 내부에서는 동작하지 않음
- 빌드 시 모든 페이지가 정적으로 생성됨 (SSG)

## 예제 소스 코드 (content/sources/)

- **밤송이 던지기**: `BamsongiController.cs`, `BamsongiGenerator.cs`, `TargetController.cs`
- **공룡 달리기 (Dino Run 2D)**: `Assets/02.Scripts/DinoController.cs` (점프·바닥 감지), `Assets/02.Scripts/Scroll.cs` (땅/구름 스크롤)
