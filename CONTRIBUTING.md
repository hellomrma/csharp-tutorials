# 기여 가이드

Unity C# 튜토리얼 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 설명합니다.

## 목차

- [시작하기](#시작하기)
- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [기여 방법](#기여-방법)
- [코딩 컨벤션](#코딩-컨벤션)
- [튜토리얼 작성 가이드](#튜토리얼-작성-가이드)
- [Pull Request 가이드라인](#pull-request-가이드라인)
- [코드 리뷰 프로세스](#코드-리뷰-프로세스)
- [문제 해결](#문제-해결)

## 시작하기

### 필수 조건

- **Node.js**: 18.17.0 이상
- **npm**: 9.0.0 이상
- **Git**: 2.0.0 이상
- 코드 에디터 (VS Code 권장)

### Fork 및 Clone

1. 이 저장소를 Fork합니다
2. 로컬에 Clone합니다

```bash
git clone https://github.com/YOUR-USERNAME/csharp-tutorials.git
cd csharp-tutorials
```

3. Upstream 원격 저장소 추가

```bash
git remote add upstream https://github.com/hellomrma/csharp-tutorials.git
```

## 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 3. 환경 변수 설정 (선택 사항)

`.env.local` 파일을 생성합니다:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 프로젝트 구조

```
csharp-tutorials/
├── app/                    # Next.js App Router
│   ├── components/         # React 컴포넌트
│   ├── tutorials/          # 튜토리얼 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 홈 페이지
├── content/
│   └── docs/               # 튜토리얼 Markdown 파일
├── lib/                    # 유틸리티 함수
│   ├── markdown.ts         # MD 파싱
│   ├── i18n.ts             # 다국어
│   ├── cache.ts            # 캐싱
│   └── ...
├── CLAUDE.md               # AI 컨텍스트 문서
├── README.md               # 프로젝트 문서
└── CONTRIBUTING.md         # 이 파일
```

주요 파일 설명은 [CLAUDE.md](CLAUDE.md)를 참조하세요.

## 기여 방법

### 🐛 버그 리포트

버그를 발견하셨나요?

1. [Issues](https://github.com/hellomrma/csharp-tutorials/issues)에서 중복 확인
2. 새 Issue 생성
3. 다음 정보 포함:
   - 버그 설명
   - 재현 단계
   - 예상 동작
   - 실제 동작
   - 스크린샷 (가능하면)
   - 환경 정보 (OS, 브라우저 등)

### ✨ 새로운 기능 제안

1. [Discussions](https://github.com/hellomrma/csharp-tutorials/discussions)에서 논의
2. 메인테이너의 승인 후 작업 시작
3. Issue 생성 및 할당

### 📝 튜토리얼 추가/수정

1. `content/docs/` 디렉토리에서 작업
2. 한국어/영어 버전 모두 작성
3. 코드 예제 포함
4. [튜토리얼 작성 가이드](#튜토리얼-작성-가이드) 참조

### 🌐 번역 기여

1. 기존 튜토리얼 영문 번역 (`.en.md`)
2. UI 문자열 번역 (`lib/i18n.ts`)

## 코딩 컨벤션

자세한 내용은 [.cursorrules](.cursorrules)를 참조하세요.

### TypeScript

```typescript
// ✅ Good
interface Tutorial {
  title: string;
  slug: string;
  content: string;
}

// ❌ Bad
interface Tutorial {
  title: any;
  slug: any;
}
```

### React 컴포넌트

```typescript
// ✅ Good - 서버 컴포넌트 (기본)
export default function TutorialList() {
  const tutorials = getAllTutorials();
  return <div>{/* ... */}</div>;
}

// ✅ Good - 클라이언트 컴포넌트 (필요시만)
'use client';
export default function LanguageSwitcher() {
  const [lang, setLang] = useState('ko');
  return <button onClick={() => setLang('en')}>Switch</button>;
}
```

### 파일 명명

- 컴포넌트: `PascalCase.tsx`
- 유틸리티: `camelCase.ts`
- 튜토리얼: `XX-제목.md` (XX는 순서)

### 스타일링

```tsx
// ✅ Good - Tailwind 유틸리티 클래스
<div className="flex items-center gap-4 p-4">

// ❌ Bad - 인라인 스타일
<div style={{ display: 'flex', padding: '16px' }}>
```

## 튜토리얼 작성 가이드

### 파일 생성

1. 다음 튜토리얼 번호 확인 (예: 46)
2. 한국어 파일 생성: `content/docs/46-새로운-주제.md`
3. 영문 파일 생성: `content/docs/46-새로운-주제.en.md`

### Frontmatter 형식

```markdown
---
title: "새로운 주제"
titleEn: "New Topic"
category: "고급"
categoryEn: "Advanced"
order: 46
description: "새로운 Unity C# 개념을 학습합니다"
descriptionEn: "Learn new Unity C# concepts"
slugEn: "46-new-topic"
---
```

### 필수 필드

- `title`: 한국어 제목
- `titleEn`: 영어 제목
- `category`: 한국어 카테고리 (기초/고급/응용)
- `categoryEn`: 영어 카테고리
- `description`: 한국어 설명
- `descriptionEn`: 영어 설명
- `slugEn`: 영어 URL slug

### 콘텐츠 작성 팁

#### 1. 구조화된 콘텐츠

```markdown
# 제목

## 학습 목표

- 목표 1
- 목표 2

## 개념 설명

개념에 대한 설명...

## 코드 예제

\`\`\`csharp
// C# 코드
public class Example {
    // ...
}
\`\`\`

## 실습

단계별 실습 가이드...

## 요약

핵심 내용 요약...
```

#### 2. 코드 하이라이팅

````markdown
```csharp
// C# 코드는 'csharp' 지정
public class GameManager : MonoBehaviour {
    void Start() {
        Debug.Log("Hello Unity!");
    }
}
```
````

#### 3. 이미지 추가

```markdown
![이미지 설명](./images/example.png)
```

이미지는 `public/images/` 디렉토리에 저장합니다.

#### 4. 용어 사용

한글 용어는 자동으로 "한글(영문)" 형식으로 변환됩니다:
- 변수 → 변수(variable)
- 함수 → 함수(function)

코드 블록 내부는 변환되지 않습니다.

### 품질 체크리스트

튜토리얼 제출 전 확인:

- [ ] 한국어/영어 버전 모두 작성
- [ ] Frontmatter 필수 필드 포함
- [ ] 코드 예제 동작 확인
- [ ] 맞춤법 검사
- [ ] 이미지 최적화 (webp 권장)
- [ ] 접근성 (alt 텍스트)
- [ ] 로컬에서 빌드 테스트

```bash
npm run build
```

## Pull Request 가이드라인

### 브랜치 전략

```bash
# main 브랜치에서 최신 코드 가져오기
git checkout main
git pull upstream main

# 새 브랜치 생성
git checkout -b feature/tutorial-46
git checkout -b fix/typo-in-tutorial-10
git checkout -b docs/update-readme
```

브랜치 명명 규칙:
- `feature/`: 새로운 기능
- `fix/`: 버그 수정
- `docs/`: 문서 변경
- `refactor/`: 리팩토링
- `style/`: 코드 포맷팅

### 커밋 메시지

Conventional Commits 형식 권장:

```bash
# 새 튜토리얼
git commit -m "feat(tutorials): 46번 튜토리얼 추가

벡터 연산 심화 튜토리얼 작성
- 한국어/영어 버전
- 코드 예제 5개 포함"

# 버그 수정
git commit -m "fix(markdown): 코드 블록 하이라이팅 버그 수정"

# 문서 수정
git commit -m "docs(readme): 환경 변수 섹션 추가"
```

한국어 커밋 메시지도 허용:
```bash
git commit -m "기능: 검색 기능 추가"
```

### PR 템플릿

PR 생성 시 다음 정보를 포함하세요:

```markdown
## 변경 사항

- 변경 내용 요약

## 변경 이유

- 왜 이 변경이 필요한가?

## 테스트

- [ ] 로컬 개발 서버에서 테스트
- [ ] 빌드 성공 확인
- [ ] 다국어 전환 테스트

## 스크린샷

(변경 사항이 UI에 영향을 주는 경우)

## 체크리스트

- [ ] 코드 컨벤션 준수
- [ ] TypeScript 타입 에러 없음
- [ ] ESLint 경고 없음
- [ ] 불필요한 console.log 제거
- [ ] CLAUDE.md 업데이트 (필요시)
```

### PR 크기

- 작은 PR 권장 (변경 파일 5개 이하)
- 큰 기능은 여러 PR로 분할
- 한 PR에 한 가지 목적

## 코드 리뷰 프로세스

### 리뷰어

1. 코드 컨벤션 확인
2. 로직 검증
3. 성능 영향 검토
4. 보안 이슈 확인
5. 테스트 결과 확인

### 작성자

1. 피드백에 대응
2. 변경 사항 설명
3. 추가 커밋으로 수정
4. 리뷰어 승인 대기

### 리뷰 가이드라인

- 건설적인 피드백
- 명확한 제안
- 질문은 명확하게
- 긍정적인 톤 유지

예시:
```
❌ "이 코드는 잘못되었습니다."
✅ "이 부분은 `useMemo`를 사용하면 성능이 개선될 것 같습니다. 어떻게 생각하시나요?"
```

## 문제 해결

### 빌드 오류

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 삭제
rm -rf .next
npm run dev
```

### 포트 충돌

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### TypeScript 오류

```bash
# 타입 체크
npm run build

# tsconfig 확인
cat tsconfig.json
```

### ESLint 오류

```bash
# 린트 검사
npm run lint

# 자동 수정
npm run lint -- --fix
```

## 도움 받기

### 문서

- [CLAUDE.md](CLAUDE.md) - 프로젝트 컨텍스트
- [README.md](README.md) - 프로젝트 문서
- [.cursorrules](.cursorrules) - 코딩 규칙

### 커뮤니티

- GitHub Issues - 버그 리포트
- GitHub Discussions - 질문 및 토론
- Pull Requests - 코드 리뷰

### 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

## 라이선스

이 프로젝트에 기여함으로써, 당신의 기여가 프로젝트의 라이선스에 따라 배포됨에 동의합니다.

## 행동 강령

우리는 모든 기여자가 존중받는 환경을 만들기 위해 노력합니다:

- 존중과 배려
- 건설적인 피드백
- 다양성 포용
- 협력적 태도

---

**감사합니다!** 🎉

당신의 기여가 Unity C# 학습 커뮤니티에 큰 도움이 됩니다.
