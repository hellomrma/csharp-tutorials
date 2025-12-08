---
title: Event
titleEn: Event
description: Learn about events in C#. Understand how to safely encapsulate delegates to implement event-based programming.
descriptionEn: Learn about events in C#. Understand how to safely encapsulate delegates to implement event-based programming.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 22
---

# 22. Event

## What is an Event?

An event is a **safe encapsulation of a delegate**. External code can only subscribe to or unsubscribe from events, but cannot directly invoke them.

## Advantages of Events

1. **Encapsulation**: Cannot be directly invoked from outside
2. **Safety**: Events can only be raised from within the class
3. **Subscription Pattern**: Multiple subscribers can subscribe to events

## Event Declaration and Usage

```csharp
using UnityEngine;
using System;

public class EventPublisher : MonoBehaviour
{
    // Event declaration
    public event Action OnPlayerDeath;
    public event Action<int> OnScoreChanged;
    
    void Start()
    {
        // Raise event
        OnPlayerDeath?.Invoke();
        OnScoreChanged?.Invoke(100);
    }
}

public class EventSubscriber : MonoBehaviour
{
    public EventPublisher publisher;
    
    void Start()
    {
        // Subscribe to event
        publisher.OnPlayerDeath += HandlePlayerDeath;
        publisher.OnScoreChanged += HandleScoreChanged;
    }
    
    void OnDestroy()
    {
        // Unsubscribe from event (prevent memory leaks)
        if (publisher != null)
        {
            publisher.OnPlayerDeath -= HandlePlayerDeath;
            publisher.OnScoreChanged -= HandleScoreChanged;
        }
    }
    
    void HandlePlayerDeath()
    {
        Debug.Log("Player has died!");
    }
    
    void HandleScoreChanged(int score)
    {
        Debug.Log($"Score changed: {score}");
    }
}
```

## Unity Event Example

```csharp
using UnityEngine;
using UnityEngine.Events;

public class Button : MonoBehaviour
{
    // Unity event (can be set in Inspector)
    public UnityEvent OnButtonClicked;
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Raise event
            OnButtonClicked?.Invoke();
        }
    }
}

public class GameManager : MonoBehaviour
{
    public Button button;
    
    void Start()
    {
        // Subscribe to event
        button.OnButtonClicked.AddListener(HandleButtonClick);
    }
    
    void HandleButtonClick()
    {
        Debug.Log("Button clicked!");
    }
}
```

## Delegate vs Event

| Feature | Delegate | Event |
|---------|----------|-------|
| External Invocation | ✅ Possible | ❌ Not possible |
| Subscribe/Unsubscribe | ✅ Possible | ✅ Possible |
| Encapsulation | ❌ None | ✅ Yes |
| Safety | Low | High |

## Practical Usage Examples

### Example 1: Game Event System

```csharp
using System;
using UnityEngine;

public class GameEventManager : MonoBehaviour
{
    // Singleton pattern
    public static GameEventManager Instance;
    
    // Game events
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

// Usage example
public class UIManager : MonoBehaviour
{
    void Start()
    {
        // Subscribe to events
        GameEventManager.Instance.OnGameStart += HandleGameStart;
        GameEventManager.Instance.OnGameOver += HandleGameOver;
        GameEventManager.Instance.OnScoreChanged += HandleScoreChanged;
    }
    
    void OnDestroy()
    {
        // Unsubscribe
        if (GameEventManager.Instance != null)
        {
            GameEventManager.Instance.OnGameStart -= HandleGameStart;
            GameEventManager.Instance.OnGameOver -= HandleGameOver;
            GameEventManager.Instance.OnScoreChanged -= HandleScoreChanged;
        }
    }
    
    void HandleGameStart()
    {
        Debug.Log("Game started!");
    }
    
    void HandleGameOver()
    {
        Debug.Log("Game over!");
    }
    
    void HandleScoreChanged(int score)
    {
        Debug.Log($"Score: {score}");
    }
}
```

### Example 2: Player Event

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
        // Experience gain logic...
        if (ShouldLevelUp())
        {
            level++;
            OnLevelUp?.Invoke(level);
        }
    }
    
    bool ShouldLevelUp()
    {
        // Level up condition check
        return true;
    }
}
```

## Notes

1. **Memory Leaks**: Always unsubscribe from events after subscribing
2. **Null Check**: Always check for null before invoking events
3. **Unsubscribe**: Unsubscribe in OnDestroy or OnDisable

## Practical Tips

### Tip 1: Event Unsubscribe Pattern

```csharp
void OnEnable()
{
    // Subscribe
    EventManager.OnEvent += HandleEvent;
}

void OnDisable()
{
    // Always unsubscribe (prevent memory leaks)
    EventManager.OnEvent -= HandleEvent;
}
```

### Tip 2: Safe Event Invocation

```csharp
// ✅ Safe invocation
OnEvent?.Invoke();

// Or
if (OnEvent != null)
{
    OnEvent.Invoke();
}
```

### Tip 3: Using UnityEvent

```csharp
using UnityEngine.Events;

// Event that can be set in Inspector
public UnityEvent OnButtonClick;

// Invoke from code
OnButtonClick?.Invoke();

// Can connect functions via drag and drop in Inspector
```

---

[← Back to Table of Contents](../README.md)

