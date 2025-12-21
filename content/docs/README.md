# 유니티 C# 튜토리얼 목차

Unity와 C# 프로그래밍을 체계적으로 학습할 수 있는 튜토리얼 목록입니다.

## Unity C# 기초

### 1. 변수와 조건문 기초
- 변수 타입, 접근 제한자, Unity 생명주기 메서드, 조건문

### 2. 비교 연산자와 논리 연산자
- 비교 연산자, 논리 연산자, 복합 조건문

### 3. 상수와 switch-case 문
- 상수, switch-case 문, break 문

### 4. 열거형 (enum)
- enum 정의, 사용법, Unity에서의 활용

### 5. 함수 기초
- 함수 정의, 호출, void 함수

### 6. 반환값이 있는 함수
- return 문, 반환 타입, 함수의 반환값 활용

### 7. 매개변수가 있는 함수
- 함수 매개변수, 인자 전달, 매개변수 활용

### 8. 여러 매개변수 사용하기
- 다중 매개변수, 매개변수 순서, 다양한 활용 예시

### 9. 사칙연산 함수 만들기
- 사칙연산 함수 구현, 계산기 만들기

### 10. 함수 오버로딩
- 함수 오버로딩, 같은 이름의 다른 함수, 매개변수에 따른 함수 선택

### 11. 클래스와 상속
- 클래스 정의, 상속, base 키워드, 상속의 활용

### 12. 접근 제한자 심화
- public, private, protected, 접근 제한자 활용

### 13. 배열 (Array)
- 배열 선언, 초기화, 배열 요소 접근, 배열 순회

### 14. 리스트 (List)
- List 선언, 요소 추가/제거, List 메서드, 동적 배열

### 15. 값 형식과 참조 형식 (Value Type & Reference Type)
- 값 형식, 참조 형식, 메모리 관리, 복사 vs 참조

### 16. 반복문 (Loop)
- while 문, for 문, foreach 문, 반복문 활용

### 17. 변수와 프로퍼티 (Fields & Properties)
- 필드, 프로퍼티, getter/setter, 프로퍼티 활용

### 18. 클래스의 생성자 (Constructor)
- 생성자 정의, 생성자 오버로딩, 초기화

### 19. 가상 함수 (Virtual, Override)
- virtual 키워드, override 키워드, 다형성

### 20. 인터페이스 (Interface)
- 인터페이스 정의, 구현, 인터페이스 활용

### 21. 델리게이트 (Delegate)
- 델리게이트 정의, 델리게이트 사용, 함수 포인터

### 22. 이벤트 (Event)
- 이벤트 정의, 이벤트 구독, 이벤트 발생

### 23. 유니티 함수 실행 순서
- Awake, Start, Update, FixedUpdate, LateUpdate 등 Unity 생명주기

### 24. 딕셔너리 (Dictionary)
- Dictionary 선언, 키-값 쌍, Dictionary 메서드

### 25. Random 함수
- Random 클래스, 랜덤 숫자 생성, 게임에서의 활용

### 28. 로컬 좌표계와 월드 좌표계
- transform.position, transform.localPosition, 좌표 변환

### 29. Rect Transform
- Rect Transform, Anchors, Pivot, Rotation, UI 배치

### 30. ToString 메서드
- ToString() 기본 사용법, 숫자 포맷 지정자, 클래스에서 ToString() 오버라이드

## Unity C# 응용

### 26. 룰렛 회전 제어
- 마우스 입력 처리, transform.Rotate() 사용, 자연스러운 감속 효과 구현

### 27. 마우스 드래그로 자동차 제어
- Input.mousePosition, GetMouseButtonDown/Up, transform.Translate() 사용, 플래그 변수로 상태 관리

---

## 학습 순서 추천

### 초급 (1~10)
기본 문법과 함수를 학습합니다.
- 변수, 조건문, 반복문
- 함수 정의와 호출
- 함수 오버로딩

### 중급 (11~20)
객체지향 프로그래밍을 학습합니다.
- 클래스와 상속
- 인터페이스와 델리게이트
- 이벤트 시스템

### 고급 (21~25, 28~30)
Unity와 C#의 고급 기능을 학습합니다.
- Unity 생명주기
- 컬렉션 (Dictionary, List)
- 좌표계와 Transform
- ToString() 메서드

### 실전 응용 (26~27)
실제 게임 개발에 활용할 수 있는 예제를 학습합니다.
- 룰렛 회전 제어
- 마우스 드래그로 자동차 제어

---

## 파일 구조

각 튜토리얼은 다음 형식으로 저장됩니다:
- `NN-제목.md` - 한국어 버전
- `NN-제목.en.md` - 영어 버전

파일명의 숫자(NN)는 학습 순서를 나타냅니다.

---

## 기여하기

새로운 튜토리얼을 추가하거나 기존 튜토리얼을 개선하고 싶으시다면:
1. `content/docs/` 폴더에 마크다운 파일을 추가하세요
2. 파일명은 `NN-제목.md` 형식을 따르세요
3. Frontmatter에 title, description, category, order를 포함하세요

---

[← 홈으로 돌아가기](../../README.md)

