---
title: 열거형 (enum)
titleEn: Enumeration (enum)
slugEn: 04-enumeration-enum
description: C#의 enum을 학습합니다. 관련된 상수들을 그룹으로 묶어서 관리하고 Unity Inspector에서 사용하는 방법을 이해합니다.
descriptionEn: Learn about enums in C#. Understand how to group related constants together and use them in Unity Inspector.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 4
---

# 4. 열거형 (enum)

## enum이란?

enum은 관련된 상수들을 그룹으로 묶어서 관리하는 방법입니다. 게임에서 아이템 타입, 캐릭터 직업, 게임 상태 등을 정의할 때 매우 유용합니다.

```csharp
// 아이템 타입 정의
public enum ItemType { 
    Weapon,    // 무기
    Armor,     // 방어구
    Potion,    // 물약
    Key,       // 열쇠
    Consumable // 소비 아이템
}

// 캐릭터 직업 정의
public enum CharacterClass
{
    Warrior,   // 전사
    Mage,      // 마법사
    Archer,    // 궁수
    Rogue      // 도적
}
```

- **왜 사용하나요?**
  - 관련된 값들을 한 곳에 모아서 관리 (코드가 깔끔해짐)
  - 오타를 방지 (문자열 "Weapon" 대신 `ItemType.Weapon` 사용)
  - Unity Inspector에서 드롭다운 메뉴로 선택 가능 (직관적)
  - 자동완성 지원 (IDE가 모든 옵션을 보여줌)
  - 타입 안정성 (잘못된 값 입력 방지)

## enum 사용하기

```csharp
public class Item : MonoBehaviour
{
    public ItemType itemType;  // Inspector에서 드롭다운으로 선택 가능
    
    void Start()
    {
        // 아이템 타입에 따라 다른 효과 적용
        switch (itemType)
        {
            case ItemType.Weapon:
                Debug.Log("무기를 획득했습니다!");
                IncreaseAttackPower(10);
                break;
            case ItemType.Armor:
                Debug.Log("방어구를 획득했습니다!");
                IncreaseDefense(5);
                break;
            case ItemType.Potion:
                Debug.Log("물약을 마셨습니다!");
                RestoreHealth(50);
                break;
        }
    }
    
    void IncreaseAttackPower(int amount) { }
    void IncreaseDefense(int amount) { }
    void RestoreHealth(int amount) { }
}
```

- **게임 개발 실전 활용 예시**

**예시 1: 아이템 타입**
```csharp
public enum ItemType { Weapon, Armor, Potion, Key, Consumable }

public class InventoryItem
{
    public ItemType type;
    public string name;
}
```

**예시 2: 게임 상태**
```csharp
public enum GameState { Menu, Playing, Paused, GameOver, Victory }

public class GameManager : MonoBehaviour
{
    public GameState currentState = GameState.Menu;
    
    void Update()
    {
        if (currentState == GameState.Playing)
        {
            // 게임 플레이 로직
        }
    }
}
```

**예시 3: 캐릭터 직업**
```csharp
public enum CharacterClass { Warrior, Mage, Archer, Rogue }

public class Player : MonoBehaviour
{
    public CharacterClass playerClass;
    
    void Start()
    {
        switch (playerClass)
        {
            case CharacterClass.Warrior:
                baseAttack = 20;
                baseDefense = 15;
                break;
            case CharacterClass.Mage:
                baseAttack = 15;
                baseMana = 100;
                break;
        }
    }
}
```

**예시 4: 적 AI 상태**
```csharp
public enum EnemyState { Idle, Patrol, Chase, Attack, Dead }

public class Enemy : MonoBehaviour
{
    public EnemyState currentState = EnemyState.Idle;
}
```

## Unity Inspector에서 사용

enum을 public 변수로 선언하면 Unity Inspector에서 드롭다운 메뉴로 선택할 수 있습니다.

**사용 방법:**
1. 스크립트에 `public ItemType itemType;` 선언
2. Unity 에디터에서 GameObject에 스크립트 추가
3. Inspector 창에서 드롭다운 메뉴로 ItemType 선택 가능
4. 게임 실행 중에도 값을 바꿀 수 있음 (디버깅에 유용)

**실제 예시:**
```csharp
public class ItemPickup : MonoBehaviour
{
    public ItemType itemType = ItemType.Potion;  // Inspector에서 선택 가능
    public int value = 10;
    
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            ApplyItemEffect(itemType, value);
        }
    }
    
    void ApplyItemEffect(ItemType type, int val)
    {
        switch (type)
        {
            case ItemType.Potion:
                // 체력 회복
                break;
            case ItemType.Weapon:
                // 무기 획득
                break;
        }
    }
}
```

**장점:**
- 코드를 수정하지 않고도 Inspector에서 값 변경 가능
- 실수로 잘못된 값을 입력하는 것을 방지
- 게임 디자이너도 쉽게 사용 가능

---

[← 목차로 돌아가기](../README.md)

