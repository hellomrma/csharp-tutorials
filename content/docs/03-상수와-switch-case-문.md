# 3. 상수와 switch-case 문

## 상수 (const)

상수는 한 번 정하면 절대 바뀌지 않는 값입니다.

```csharp
const int DEAD_HP = 0;
const int DANGER_HP = 40;
const int WARNING_HP = 60;
```

- **왜 사용하나요?**
  - 코드에서 의미 있는 이름을 사용할 수 있습니다
  - 나중에 값을 바꿀 때 한 곳만 수정하면 됩니다
  - 실수로 값을 바꾸는 것을 방지합니다

- **일반 변수와 차이점**
  - 변수: `int hp = 100;` (나중에 `hp = 50;`으로 변경 가능)
  - 상수: `const int MAX_HP = 100;` (나중에 변경 불가능)

## Input.GetKeyDown()

키보드 입력을 감지하는 Unity 함수입니다.

```csharp
if (Input.GetKeyDown(KeyCode.Space))
{
    // 스페이스바를 누르면 실행되는 코드
}
```

- **주요 키 코드**
  - `KeyCode.Space`: 스페이스바
  - `KeyCode.Enter`: 엔터키
  - `KeyCode.A`, `KeyCode.B`: 알파벳 키
  - `KeyCode.LeftArrow`, `KeyCode.RightArrow`: 방향키

- **GetKeyDown vs GetKey**
  - `GetKeyDown`: 키를 누르는 순간 딱 한 번만 true
  - `GetKey`: 키를 누르고 있는 동안 계속 true

## switch-case 문

여러 가지 경우를 깔끔하게 처리하는 방법입니다.

```csharp
switch (hp)
{
    case 0:
        Debug.Log("게임 오버!");
        break;
    case 40:
        Debug.Log("위험!");
        break;
    case 60:
        Debug.Log("주의하세요!");
        break;
    default:
        Debug.Log("기본 메시지입니다.");
        break;
}
```

- **if-else if와 비교**
  - if-else if: 조건이 복잡할 때 유용
  - switch-case: 특정 값들을 비교할 때 더 깔끔

- **각 키워드 의미**
  - `switch (변수)`: 어떤 변수를 비교할지
  - `case 값:`: 변수가 이 값이면
  - `break;`: 여기서 끝내고 나가기 (필수!)
  - `default:`: 위의 어떤 경우도 아니면

- **실전 예시**
  - 체력에 따라 다른 메시지 표시
  - 레벨에 따라 다른 보상 지급
  - 아이템 타입에 따라 다른 효과 적용

---

[← 목차로 돌아가기](../README.md)

