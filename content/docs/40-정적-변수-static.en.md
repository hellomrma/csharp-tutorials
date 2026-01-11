---
title: Static Variables
titleEn: Static Variables
slugEn: 40-static-variables
description: Learn how to use static variables in C# to create variables shared at the class level. Useful for sharing state between multiple objects.
descriptionEn: Learn how to use static variables in C# to create variables shared at the class level. Useful for sharing state between multiple objects.
category: Unity C# Application
categoryEn: Unity C# Application
order: 40
---

# 40. Static Variables

## What are Static Variables?

Static variables are variables that belong to a class, shared by all instances. They can be accessed directly using the class name without creating an instance.

## Basic Concepts

- **Class-level variable**: Belongs to the class, not instances
- **Shared variable**: All instances share the same value
- **Direct access**: Access with `ClassName.VariableName` without instance
- **Memory efficient**: Uses only one memory space

---

## 1. Basic Usage

### Declaring Static Variables

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // Declare static variable
    public static bool isGameOver = false;
    
    void Start()
    {
        // Initialize static variable
        isGameOver = false;
    }
}
```

### Accessing Static Variables

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // Direct access to static variable (without instance)
        if (!GameManager.isGameOver)
        {
            // Move only when not game over
            Move();
        }
    }
    
    void Move()
    {
        // Movement logic
    }
}
```

### Accessible from Other Scripts

```csharp
using UnityEngine;

public class ArrowGenerator : MonoBehaviour
{
    void Update()
    {
        // Can access without GameManager instance
        if (GameManager.isGameOver)
        {
            return; // Stop spawning arrows if game over
        }
        
        // Arrow spawning logic
    }
}
```

---

## 2. Static Variables vs Instance Variables

### Instance Variables (Regular Variables)

```csharp
public class Player : MonoBehaviour
{
    // Instance variable: separate value for each object
    public int health = 100;
    
    void Start()
    {
        // Each Player object has its own health value
        Debug.Log(health); // Different values
    }
}
```

**Features:**
- Separate memory space for each instance
- Can have different values per object
- Access through instance: `player.health`

### Static Variables

```csharp
public class GameManager : MonoBehaviour
{
    // Static variable: shared by all instances
    public static bool isGameOver = false;
    
    void Start()
    {
        // All GameManager instances share the same value
        Debug.Log(isGameOver); // Same value for all
    }
}
```

**Features:**
- One memory space shared by entire class
- All instances have the same value
- Direct access with class name: `GameManager.isGameOver`

---

## 3. Practical Examples

### Example 1: Game State Management

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // Static variable to track game over state
    public static bool isGameOver = false;
    
    void Start()
    {
        // Initialize at game start
        isGameOver = false;
    }
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        if (hpGauge.fillAmount <= 0f)
        {
            // Set game over state
            isGameOver = true;
        }
    }
}
```

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // Check game state with static variable
        if (!GameManager.isGameOver)
        {
            Move();
        }
    }
    
    void Move()
    {
        // Movement logic
    }
}
```

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    void Update()
    {
        // Stop arrow movement if game over
        if (GameManager.isGameOver)
        {
            return;
        }
        
        // Arrow movement logic
    }
}
```

### Example 2: Score Management

```csharp
using UnityEngine;

public class ScoreManager : MonoBehaviour
{
    // Manage score with static variables
    public static int score = 0;
    public static int highScore = 0;
    
    public static void AddScore(int points)
    {
        score += points;
        
        // Update high score
        if (score > highScore)
        {
            highScore = score;
        }
    }
    
    public static void ResetScore()
    {
        score = 0;
    }
}
```

```csharp
using UnityEngine;

public class Coin : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Add score with static method
            ScoreManager.AddScore(10);
            Destroy(gameObject);
        }
    }
}
```

---

## 4. Advantages and Disadvantages of Static Variables

### Advantages

1. **Global access**: Accessible from anywhere with class name
2. **Memory efficient**: Uses only one memory space
3. **State sharing**: Multiple objects share the same state
4. **Convenience**: Accessible without creating instance

### Disadvantages

1. **Global state**: Global state can be difficult to debug
2. **Dependency**: Can create strong coupling with other classes
3. **Testing difficulty**: Static variables can be difficult to test
4. **Initialization order**: Need to be careful about initialization order

---

## 5. Precautions

### 1. Initialization Order

```csharp
// ❌ Problem: Accessing static variable before initialization
public class Player : MonoBehaviour
{
    void Start()
    {
        // GameManager might not have executed Start() yet
        if (GameManager.isGameOver) { }
    }
}

// ✅ Solution: Null check or initialization check
public class Player : MonoBehaviour
{
    void Start()
    {
        // Safe access
        if (GameManager.isGameOver) { }
    }
}
```

### 2. Multithreaded Environment

```csharp
// Static variables need caution in multithreaded environments
public static int counter = 0;

// Problems can occur when accessed simultaneously from multiple threads
// Need to use lock or thread-safe methods
```

### 3. Memory Leaks

```csharp
// Static variables remain in memory until game ends
// Set to null when no longer needed
public static GameObject player;
void OnDestroy()
{
    player = null;
}
```

---

## 6. Static Variables vs Singleton Pattern

### Using Static Variables

```csharp
public class GameManager : MonoBehaviour
{
    public static bool isGameOver = false;
    public static int score = 0;
}
```

**Advantages:**
- Simple and intuitive
- No need to create instance

**Disadvantages:**
- Cannot use MonoBehaviour features
- Cannot use Unity lifecycle methods

### Using Singleton Pattern

```csharp
public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }
    public bool isGameOver = false;
    public int score = 0;
}
```

**Advantages:**
- Can use MonoBehaviour features
- Can use Unity lifecycle methods
- Can be set in Inspector

**Disadvantages:**
- More complex implementation
- Need to manage instance

---

## 7. Summary

### When to Use Static Variables

- **Simple state sharing**: Game over, pause, etc.
- **Global settings**: Game settings, difficulty, etc.
- **Utility values**: Constants, configuration values, etc.

### When to Avoid Static Variables

- **Complex state management**: Consider singleton pattern
- **Need MonoBehaviour features**: Use singleton pattern
- **Need Inspector settings**: Use public variables

### Best Practices

1. **Clear naming**: Use clear names like `isGameOver`, `score`
2. **Initialization check**: Initialize in Start()
3. **Appropriate use**: Use only for simple state sharing
4. **Documentation**: Clearly document the purpose of static variables

---

## Practice Problems

1. Create a system that manages game difficulty using static variables.

2. Create a system that tracks player survival time using static variables.

3. Write example code that demonstrates the difference between static and regular variables.

4. Create a system that saves and loads the game's high score using static variables.
