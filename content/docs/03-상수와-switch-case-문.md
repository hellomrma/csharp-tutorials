---
title: 상수와 switch-case 문
titleEn: Constants and switch-case Statement
slugEn: 03-constants-and-switch-case
description: C#의 상수(const)와 switch-case 문을 학습합니다. Input.GetKeyDown()을 사용한 키보드 입력 감지 방법을 이해합니다.
descriptionEn: Learn about constants (const) and the switch-case statement in C#. Understand how to use Input.GetKeyDown() for keyboard input detection.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 3
---

# 3. 상수와 switch-case 문

## 상수 (const)

상수는 한 번 정하면 절대 바뀌지 않는 값입니다. 게임에서 최대 체력, 최대 레벨, 기본 속도 등 고정된 값들을 정의할 때 사용합니다.

```csharp
public class Player : MonoBehaviour
{
    // 게임 설정 상수들
    const int MAX_HP = 100;           // 최대 체력
    const int MAX_LEVEL = 50;         // 최대 레벨
    const float BASE_MOVE_SPEED = 5f;  // 기본 이동 속도
    const int STARTING_GOLD = 100;     // 시작 골드
    
    public int currentHp = MAX_HP;
    public int currentLevel = 1;
}
```

- **왜 사용하나요?**
  - 코드에서 의미 있는 이름을 사용할 수 있습니다 (`hp > 0`보다 `hp > DEAD_HP`가 더 명확)
  - 나중에 값을 바꿀 때 한 곳만 수정하면 됩니다 (모든 곳에서 100을 쓰는 대신 MAX_HP 상수 사용)
  - 실수로 값을 바꾸는 것을 방지합니다 (const는 변경 불가)
  - 매직 넘버(의미 없는 숫자)를 피할 수 있습니다

- **일반 변수와 차이점**
  - 변수: `int hp = 100;` (나중에 `hp = 50;`으로 변경 가능)
  - 상수: `const int MAX_HP = 100;` (나중에 변경 불가능, `MAX_HP = 50;`은 에러!)

## Input.GetKeyDown()

키보드 입력을 감지하는 Unity 함수입니다. 플레이어의 입력을 받아 게임을 제어할 때 사용합니다.

```csharp
void Update()
{
    // 스페이스바를 누르면 점프
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Jump();
    }
    
    // 엔터키를 누르면 대화 스킵
    if (Input.GetKeyDown(KeyCode.Return))
    {
        SkipDialogue();
    }
}
```

- **주요 키 코드**
  - `KeyCode.Space`: 스페이스바 (점프, 대화 스킵)
  - `KeyCode.Return` 또는 `KeyCode.Enter`: 엔터키 (확인, 대화 진행)
  - `KeyCode.A`, `KeyCode.B`, `KeyCode.C`: 알파벳 키 (스킬 단축키)
  - `KeyCode.LeftArrow`, `KeyCode.RightArrow`: 방향키 (이동)
  - `KeyCode.Alpha1`, `KeyCode.Alpha2`: 숫자 키 1, 2 (아이템 사용)

- **GetKeyDown vs GetKey vs GetKeyUp**
  - `GetKeyDown`: 키를 누르는 순간 딱 한 번만 true (점프, 공격 등)
  - `GetKey`: 키를 누르고 있는 동안 계속 true (이동, 달리기 등)
  - `GetKeyUp`: 키를 떼는 순간 딱 한 번만 true (특수 동작)

**게임 활용 예시**:
```csharp
void Update()
{
    // 이동 (누르고 있는 동안)
    if (Input.GetKey(KeyCode.W))
    {
        MoveForward();
    }
    
    // 점프 (누르는 순간)
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Jump();
    }
    
    // 스킬 사용 (숫자 키)
    if (Input.GetKeyDown(KeyCode.Alpha1))
    {
        UseSkill(1);
    }
}
```

## switch-case 문

여러 가지 경우를 깔끔하게 처리하는 방법입니다. if-else if를 여러 번 쓰는 것보다 훨씬 읽기 쉽습니다.

```csharp
public class Player : MonoBehaviour
{
    public int playerLevel = 1;
    
    void Start()
    {
        // 레벨에 따라 다른 보상 지급
        switch (playerLevel)
        {
            case 1:
                GiveReward("초보자 무기");
                break;
            case 5:
                GiveReward("중급자 갑옷");
                break;
            case 10:
                GiveReward("고급자 반지");
                break;
            default:
                Debug.Log("보상 없음");
                break;
        }
    }
    
    void GiveReward(string itemName)
    {
        Debug.Log(itemName + " 획득!");
    }
}
```

- **if-else if와 비교**
  - if-else if: 조건이 복잡할 때 유용 (`hp > 0 && hp < 50` 같은 범위 비교)
  - switch-case: 특정 값들을 비교할 때 더 깔끔 (정확한 값 비교)

- **각 키워드 의미**
  - `switch (변수)`: 어떤 변수를 비교할지
  - `case 값:`: 변수가 이 값이면 실행
  - `break;`: 여기서 끝내고 나가기 (필수! 없으면 다음 case도 실행됨)
  - `default:`: 위의 어떤 경우도 아니면 실행

- **게임 개발 실전 예시**

**예시 1: 아이템 타입에 따라 다른 효과**
```csharp
public enum ItemType { Weapon, Armor, Potion, Key }

void UseItem(ItemType itemType)
{
    switch (itemType)
    {
        case ItemType.Weapon:
            EquipWeapon();
            break;
        case ItemType.Armor:
            EquipArmor();
            break;
        case ItemType.Potion:
            RestoreHealth();
            break;
        case ItemType.Key:
            UnlockDoor();
            break;
    }
}
```

**예시 2: 게임 상태에 따라 다른 동작**
```csharp
public enum GameState { Menu, Playing, Paused, GameOver }

void UpdateGameState(GameState state)
{
    switch (state)
    {
        case GameState.Menu:
            ShowMainMenu();
            break;
        case GameState.Playing:
            StartGameplay();
            break;
        case GameState.Paused:
            PauseGame();
            break;
        case GameState.GameOver:
            ShowGameOverScreen();
            break;
    }
}
```

---

[← 목차로 돌아가기](../README.md)

