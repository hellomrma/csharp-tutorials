---
title: 이벤트 (Event)
titleEn: Event
slugEn: 22-event
description: C#의 이벤트를 학습합니다. 델리게이트를 안전하게 캡슐화하여 이벤트 기반 프로그래밍을 구현하는 방법을 이해합니다.
descriptionEn: Learn about events in C#. Understand how to safely encapsulate delegates to implement event-based programming.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 22
---

# 22. 이벤트 (Event)

## 이벤트란?

이벤트는 **델리게이트를 안전하게 캡슐화**한 것입니다. 외부에서는 이벤트를 구독하거나 구독 해제만 할 수 있고, 직접 호출할 수 없습니다.

## 이벤트의 장점

1. **캡슐화**: 외부에서 직접 호출 불가
2. **안전성**: 클래스 내부에서만 이벤트 발생 가능
3. **구독 패턴**: 여러 구독자가 이벤트를 구독 가능

## 이벤트 선언 및 사용

```csharp
using UnityEngine;
using System;

public class EventPublisher : MonoBehaviour
{
    // 이벤트 선언
    public event Action OnPlayerDeath;
    public event Action<int> OnScoreChanged;
    
    void Start()
    {
        // 이벤트 발생
        OnPlayerDeath?.Invoke();
        OnScoreChanged?.Invoke(100);
    }
}

public class EventSubscriber : MonoBehaviour
{
    public EventPublisher publisher;
    
    void Start()
    {
        // 이벤트 구독
        publisher.OnPlayerDeath += HandlePlayerDeath;
        publisher.OnScoreChanged += HandleScoreChanged;
    }
    
    void OnDestroy()
    {
        // 이벤트 구독 해제 (메모리 누수 방지)
        if (publisher != null)
        {
            publisher.OnPlayerDeath -= HandlePlayerDeath;
            publisher.OnScoreChanged -= HandleScoreChanged;
        }
    }
    
    void HandlePlayerDeath()
    {
        Debug.Log("플레이어가 사망했습니다!");
    }
    
    void HandleScoreChanged(int score)
    {
        Debug.Log($"점수가 변경되었습니다: {score}");
    }
}
```

## Unity 이벤트 예시

```csharp
using UnityEngine;
using UnityEngine.Events;

public class Button : MonoBehaviour
{
    // Unity 이벤트 (Inspector에서 설정 가능)
    public UnityEvent OnButtonClicked;
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // 이벤트 발생
            OnButtonClicked?.Invoke();
        }
    }
}

public class GameManager : MonoBehaviour
{
    public Button button;
    
    void Start()
    {
        // 이벤트 구독
        button.OnButtonClicked.AddListener(HandleButtonClick);
    }
    
    void HandleButtonClick()
    {
        Debug.Log("버튼이 클릭되었습니다!");
    }
}
```

## 델리게이트 vs 이벤트

| 특징 | 델리게이트 | 이벤트 |
|-----|----------|--------|
| 외부 호출 | ✅ 가능 | ❌ 불가능 |
| 구독/해제 | ✅ 가능 | ✅ 가능 |
| 캡슐화 | ❌ 없음 | ✅ 있음 |
| 안전성 | 낮음 | 높음 |

## 실전 활용 예시

### 예시 1: 게임 이벤트 시스템

```csharp
using System;
using UnityEngine;

public class GameEventManager : MonoBehaviour
{
    // 싱글톤 패턴
    public static GameEventManager Instance;
    
    // 게임 이벤트들
    public event Action OnGameStart;
    public event Action OnGameOver;
    public event Action<int> OnScoreChanged;
    public event Action<int> OnHealthChanged;
    
    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }
    
    public void StartGame()
    {
        OnGameStart?.Invoke();
    }
    
    public void GameOver()
    {
        OnGameOver?.Invoke();
    }
    
    public void ChangeScore(int newScore)
    {
        OnScoreChanged?.Invoke(newScore);
    }
    
    public void ChangeHealth(int newHealth)
    {
        OnHealthChanged?.Invoke(newHealth);
    }
}

// 사용 예시
public class UIManager : MonoBehaviour
{
    void Start()
    {
        // 이벤트 구독
        GameEventManager.Instance.OnGameStart += HandleGameStart;
        GameEventManager.Instance.OnGameOver += HandleGameOver;
        GameEventManager.Instance.OnScoreChanged += HandleScoreChanged;
    }
    
    void OnDestroy()
    {
        // 구독 해제
        if (GameEventManager.Instance != null)
        {
            GameEventManager.Instance.OnGameStart -= HandleGameStart;
            GameEventManager.Instance.OnGameOver -= HandleGameOver;
            GameEventManager.Instance.OnScoreChanged -= HandleScoreChanged;
        }
    }
    
    void HandleGameStart()
    {
        Debug.Log("게임 시작!");
    }
    
    void HandleGameOver()
    {
        Debug.Log("게임 오버!");
    }
    
    void HandleScoreChanged(int score)
    {
        Debug.Log($"점수: {score}");
    }
}
```

### 예시 2: 플레이어 이벤트

```csharp
using System;
using UnityEngine;

public class Player : MonoBehaviour
{
    public event Action<int> OnHealthChanged;
    public event Action OnPlayerDeath;
    public event Action<int> OnLevelUp;
    
    private int health = 100;
    private int level = 1;
    
    public void TakeDamage(int damage)
    {
        health -= damage;
        OnHealthChanged?.Invoke(health);
        
        if (health <= 0)
        {
            OnPlayerDeath?.Invoke();
        }
    }
    
    public void GainExperience(int exp)
    {
        // 경험치 획득 로직...
        if (ShouldLevelUp())
        {
            level++;
            OnLevelUp?.Invoke(level);
        }
    }
    
    bool ShouldLevelUp()
    {
        // 레벨업 조건 체크
        return true;
    }
}
```

## 주의사항

1. **메모리 누수**: 이벤트 구독 후 반드시 구독 해제
2. **null 체크**: 이벤트 호출 전 null 체크 필수
3. **구독 해제**: OnDestroy나 OnDisable에서 구독 해제

## 실전 활용 팁

### 팁 1: 이벤트 구독 해제 패턴

```csharp
void OnEnable()
{
    // 구독
    EventManager.OnEvent += HandleEvent;
}

void OnDisable()
{
    // 반드시 구독 해제 (메모리 누수 방지)
    EventManager.OnEvent -= HandleEvent;
}
```

### 팁 2: 안전한 이벤트 호출

```csharp
// ✅ 안전한 호출
OnEvent?.Invoke();

// 또는
if (OnEvent != null)
{
    OnEvent.Invoke();
}
```

### 팁 3: UnityEvent 사용

```csharp
using UnityEngine.Events;

// Inspector에서 설정 가능한 이벤트
public UnityEvent OnButtonClick;

// 코드에서 호출
OnButtonClick?.Invoke();

// Inspector에서 함수를 드래그 앤 드롭으로 연결 가능
```

---

[← 목차로 돌아가기](../README.md)

