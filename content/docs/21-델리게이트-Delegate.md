---
title: 델리게이트 (Delegate)
titleEn: Delegate
slugEn: 21-delegate
description: C#의 델리게이트를 학습합니다. 함수를 변수처럼 저장하고 전달하는 방법을 이해합니다.
descriptionEn: Learn about delegates in C#. Understand how to store and pass functions like variables.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 21
---

# 21. 델리게이트 (Delegate)

## 델리게이트란?

델리게이트는 **함수를 변수처럼 저장하고 전달할 수 있게 해주는 타입**입니다. 함수 포인터와 비슷한 개념으로, 나중에 호출할 함수를 저장해두고 필요할 때 실행할 수 있습니다.

## 기본 개념

- **함수 참조 저장**: 함수를 변수에 저장
- **나중에 호출**: 저장된 함수를 원하는 시점에 실행
- **다형성**: 같은 델리게이트 타입으로 다양한 함수 연결 가능

## 델리게이트 선언

```csharp
// 델리게이트 타입 선언
public delegate void MyDelegate();

// 매개변수가 있는 델리게이트
public delegate void MyDelegateWithParam(string message);

// 반환값이 있는 델리게이트
public delegate int MyDelegateWithReturn(int a, int b);
```

## 기본 예시

```csharp
using UnityEngine;

// 델리게이트 타입 선언
public delegate void SimpleDelegate();

public class DelegateExample : MonoBehaviour
{
    void Start()
    {
        // 델리게이트 변수 생성
        SimpleDelegate myDelegate;
        
        // 함수를 델리게이트에 할당
        myDelegate = SayHello;
        
        // 델리게이트 호출 (함수 실행)
        myDelegate(); // "안녕하세요!" 출력
    }
    
    void SayHello()
    {
        Debug.Log("안녕하세요!");
    }
}
```

## 매개변수가 있는 델리게이트

```csharp
public delegate void MessageDelegate(string message);

public class DelegateWithParam : MonoBehaviour
{
    void Start()
    {
        MessageDelegate myDelegate = PrintMessage;
        myDelegate("Unity 학습 중!"); // "Unity 학습 중!" 출력
    }
    
    void PrintMessage(string msg)
    {
        Debug.Log(msg);
    }
}
```

## 반환값이 있는 델리게이트

```csharp
public delegate int CalculateDelegate(int a, int b);

public class DelegateWithReturn : MonoBehaviour
{
    void Start()
    {
        CalculateDelegate calc = Add;
        int result = calc(5, 3); // 8 반환
        Debug.Log(result);
    }
    
    int Add(int a, int b)
    {
        return a + b;
    }
}
```

## 멀티캐스트 델리게이트 (Multicast Delegate)

### 멀티캐스트 델리게이트란?

하나의 델리게이트에 **여러 함수를 연결**하여 한 번의 호출로 여러 함수를 실행할 수 있습니다.

### 기본 사용법

```csharp
public delegate void MultiDelegate();

public class MulticastExample : MonoBehaviour
{
    void Start()
    {
        MultiDelegate myDelegate;
        
        // 첫 번째 함수 추가
        myDelegate = FirstFunction;
        
        // += 연산자로 추가 함수 연결
        myDelegate += SecondFunction;
        myDelegate += ThirdFunction;
        
        // 한 번 호출하면 모든 함수 실행
        myDelegate();
        // 출력:
        // "첫 번째 함수 실행"
        // "두 번째 함수 실행"
        // "세 번째 함수 실행"
    }
    
    void FirstFunction()
    {
        Debug.Log("첫 번째 함수 실행");
    }
    
    void SecondFunction()
    {
        Debug.Log("두 번째 함수 실행");
    }
    
    void ThirdFunction()
    {
        Debug.Log("세 번째 함수 실행");
    }
}
```

### 함수 제거하기

```csharp
void Start()
{
    MultiDelegate myDelegate = FirstFunction;
    myDelegate += SecondFunction;
    myDelegate += ThirdFunction;
    
    // -= 연산자로 함수 제거
    myDelegate -= SecondFunction;
    
    myDelegate(); // FirstFunction과 ThirdFunction만 실행
}
```

### null 체크

```csharp
void Start()
{
    MultiDelegate myDelegate = null;
    
    // null 체크 후 호출 (중요!)
    if (myDelegate != null)
    {
        myDelegate();
    }
    
    // 또는 간단하게
    myDelegate?.Invoke();
}
```

## 실전 활용 예시

### 예시 1: 게임 이벤트 콜백

```csharp
public delegate void OnEnemyKilledDelegate(string enemyName);
public delegate void OnPlayerLevelUpDelegate(int newLevel);

public class GameEventManager : MonoBehaviour
{
    public OnEnemyKilledDelegate OnEnemyKilled;
    public OnPlayerLevelUpDelegate OnPlayerLevelUp;
    
    void Start()
    {
        // 여러 함수를 연결 (멀티캐스트)
        OnEnemyKilled += UpdateScore;
        OnEnemyKilled += PlayKillSound;
        OnEnemyKilled += CheckQuestProgress;
        
        OnPlayerLevelUp += ShowLevelUpUI;
        OnPlayerLevelUp += UnlockNewAbilities;
    }
    
    // 적 처치 시 호출
    public void EnemyKilled(string enemyName)
    {
        OnEnemyKilled?.Invoke(enemyName);
    }
    
    // 레벨업 시 호출
    public void PlayerLevelUp(int newLevel)
    {
        OnPlayerLevelUp?.Invoke(newLevel);
    }
    
    void UpdateScore(string enemyName)
    {
        Debug.Log(enemyName + " 처치! 점수 +10");
    }
    
    void PlayKillSound(string enemyName)
    {
        Debug.Log("적 처치 사운드 재생");
    }
    
    void CheckQuestProgress(string enemyName)
    {
        Debug.Log("퀘스트 진행도 확인");
    }
    
    void ShowLevelUpUI(int newLevel)
    {
        Debug.Log("레벨업 UI 표시: 레벨 " + newLevel);
    }
    
    void UnlockNewAbilities(int newLevel)
    {
        Debug.Log("새로운 능력 해제");
    }
}
```

### 예시 2: 조건부 함수 실행 (게임 로직)

```csharp
public delegate bool CanUseItemDelegate(int playerLevel, int itemLevel);

public class ItemSystem : MonoBehaviour
{
    void Start()
    {
        CanUseItemDelegate canUse = CheckItemLevel;
        
        int playerLevel = 10;
        int itemLevel = 15;
        
        if (canUse(playerLevel, itemLevel))
        {
            Debug.Log("아이템 사용 가능!");
        }
        else
        {
            Debug.Log("레벨이 부족합니다!");
        }
    }
    
    bool CheckItemLevel(int playerLevel, int itemLevel)
    {
        return playerLevel >= itemLevel;
    }
}

// 다른 조건도 사용 가능
public class CombatSystem : MonoBehaviour
{
    public delegate bool CanAttackDelegate(int hp, int mana);
    
    void Start()
    {
        CanAttackDelegate canAttack = (hp, mana) => hp > 0 && mana >= 10;
        
        if (canAttack(50, 20))
        {
            Debug.Log("공격 가능!");
        }
    }
}
```

### 예시 3: 무기 공격 패턴 (델리게이트로 다양한 공격 방식)

```csharp
public delegate void AttackPatternDelegate();

public class Weapon : MonoBehaviour
{
    public AttackPatternDelegate attackPattern;
    
    void Start()
    {
        // 무기 타입에 따라 다른 공격 패턴 설정
        attackPattern = NormalAttack;
        // 또는
        // attackPattern = ComboAttack;
        // attackPattern = ChargeAttack;
    }
    
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            attackPattern?.Invoke();
        }
    }
    
    void NormalAttack()
    {
        Debug.Log("일반 공격!");
    }
    
    void ComboAttack()
    {
        Debug.Log("콤보 공격!");
    }
    
    void ChargeAttack()
    {
        Debug.Log("차지 공격!");
    }
}
```

## 주의사항

1. **null 체크**: 델리게이트 호출 전 null 체크 필수
2. **메모리 누수**: 델리게이트에 연결된 함수는 참조를 유지하므로 필요 없을 때 제거
3. **멀티캐스트**: 여러 함수가 연결된 경우 모두 실행됨

## 실전 활용 팁

### 팁 1: null 체크 패턴

```csharp
// ✅ 안전한 호출
myDelegate?.Invoke();

// 또는
if (myDelegate != null)
{
    myDelegate();
}
```

### 팁 2: 델리게이트 초기화

```csharp
// 델리게이트를 빈 함수로 초기화하여 null 체크 불필요
public delegate void MyDelegate();
MyDelegate myDelegate = () => { }; // 빈 람다 함수로 초기화
```

### 팁 3: Action과 Func 사용

```csharp
using System;

// Action: 반환값이 없는 델리게이트
Action<string> printAction = Debug.Log;
printAction("Hello");

// Func: 반환값이 있는 델리게이트
Func<int, int, int> addFunc = (a, b) => a + b;
int result = addFunc(5, 3);
```

---

[← 목차로 돌아가기](../README.md)

