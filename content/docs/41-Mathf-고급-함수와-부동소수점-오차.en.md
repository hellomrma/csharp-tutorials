---
title: Advanced Mathf Functions and Floating Point Errors
titleEn: Advanced Mathf Functions and Floating Point Errors
slugEn: 41-advanced-mathf-functions-and-floating-point-errors
description: Learn advanced Mathf class functions in Unity and how to handle floating point errors. Covers Mathf.Clamp, Mathf.Clamp01, Mathf.Approximately, and more.
descriptionEn: Learn advanced Mathf class functions in Unity and how to handle floating point errors. Covers Mathf.Clamp, Mathf.Clamp01, Mathf.Approximately, and more.
category: Unity C# Application
categoryEn: Unity C# Application
order: 41
---

# 41. Advanced Mathf Functions and Floating Point Errors

## Overview

Unity's Mathf class provides various functions for mathematical operations. It includes functions frequently used in game development, such as value clamping and floating point comparison.

## What are Floating Point Errors?

Floating point (float) uses approximations rather than exact values. Therefore, calculation results may differ from expectations.

### Floating Point Error Example

```csharp
float a = 0.1f + 0.2f;
Debug.Log(a);  // 0.30000001 (not exactly 0.3!)

float b = 1.0f - 0.9f;
Debug.Log(b);  // 0.09999999 (not exactly 0.1!)
```

---

## 1. Mathf.Clamp() - Clamp Value

`Mathf.Clamp()` restricts a value within a specified range.

### Basic Usage

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // Clamp player's X position between -8 and 8
        float clampedX = Mathf.Clamp(transform.position.x, -8f, 8f);
        transform.position = new Vector3(clampedX, transform.position.y, transform.position.z);
    }
}
```

### Simple Usage

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // Clamp position in one line
        transform.position = new Vector3(
            Mathf.Clamp(transform.position.x, -8f, 8f), 
            transform.position.y, 
            transform.position.z
        );
    }
}
```

### HP Clamping Example

```csharp
using UnityEngine;

public class HealthSystem : MonoBehaviour
{
    public float health = 100f;
    public float maxHealth = 100f;
    
    void Update()
    {
        // Clamp health between 0 and maxHealth
        health = Mathf.Clamp(health, 0f, maxHealth);
    }
    
    public void TakeDamage(float damage)
    {
        health -= damage;
        health = Mathf.Clamp(health, 0f, maxHealth);
    }
}
```

---

## 2. Mathf.Clamp01() - Clamp Between 0~1

`Mathf.Clamp01()` restricts a value between 0 and 1. Useful for UI fillAmount, etc.

### Basic Usage

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        // Decrease HP
        hpGauge.fillAmount -= 0.2f;
        
        // Clamp between 0 and 1 (fillAmount is 0~1 value)
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
    }
}
```

### Handling Floating Point Errors

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        // Prevent floating point error: treat very small values (below 0.001) as 0
        if (hpGauge.fillAmount < 0.001f)
        {
            hpGauge.fillAmount = 0f;
        }
        
        // Clamp between 0 and 1
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
    }
}
```

### Clamp01 vs Clamp Comparison

```csharp
float value = 1.5f;

// Clamp01: Clamp between 0~1
float clamped01 = Mathf.Clamp01(value);  // 1.0

// Clamp: Clamp to specified range
float clamped = Mathf.Clamp(value, 0f, 1f);  // 1.0 (same result)
```

---

## 3. Mathf.Approximately() - Floating Point Comparison

`Mathf.Approximately()` compares two values considering floating point errors.

### Problem Situation

```csharp
// ❌ Problem: Exact comparison may fail due to floating point errors
float a = 0.1f + 0.2f;  // 0.30000001
if (a == 0.3f)  // false! (unexpected)
{
    Debug.Log("Equal");
}
```

### Solution

```csharp
// ✅ Solution: Use Mathf.Approximately()
float a = 0.1f + 0.2f;  // 0.30000001
if (Mathf.Approximately(a, 0.3f))  // true (considers error)
{
    Debug.Log("Equal");
}
```

### Practical Example

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        // Comparison considering floating point error
        if (hpGauge.fillAmount <= 0f || Mathf.Approximately(hpGauge.fillAmount, 0f))
        {
            // Game over when HP is 0 or nearly 0
            GameOver();
        }
    }
    
    void GameOver()
    {
        Debug.Log("Game Over!");
    }
}
```

---

## 4. Floating Point Error Handling Patterns

### Pattern 1: Handle Small Values

```csharp
// Treat very small values as 0
if (hpGauge.fillAmount < 0.001f)
{
    hpGauge.fillAmount = 0f;
}
```

### Pattern 2: Use Approximately

```csharp
// Comparison considering floating point error
if (Mathf.Approximately(value, targetValue))
{
    // Values are nearly equal
}
```

### Pattern 3: Range Check

```csharp
// Check if within range
float epsilon = 0.001f;
if (Mathf.Abs(value - targetValue) < epsilon)
{
    // Values are nearly equal
}
```

---

## 5. Other Advanced Mathf Functions

### Mathf.Abs() - Absolute Value

```csharp
float value = -5.5f;
float abs = Mathf.Abs(value);  // 5.5
```

### Mathf.Max() / Mathf.Min() - Maximum/Minimum

```csharp
float max = Mathf.Max(10f, 20f, 30f);  // 30
float min = Mathf.Min(10f, 20f, 30f);  // 10
```

### Mathf.Lerp() - Linear Interpolation

```csharp
// Interpolate between a and b by t ratio (0~1)
float result = Mathf.Lerp(0f, 10f, 0.5f);  // 5.0
```

### Mathf.SmoothStep() - Smooth Interpolation

```csharp
// Smoother interpolation than Lerp
float result = Mathf.SmoothStep(0f, 10f, 0.5f);
```

---

## 6. Practical Examples

### Example 1: Screen Boundary Clamping

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        Move();
        
        // Clamp screen boundaries
        float clampedX = Mathf.Clamp(transform.position.x, -8f, 8f);
        transform.position = new Vector3(clampedX, transform.position.y, transform.position.z);
    }
    
    void Move()
    {
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            transform.Translate(-0.2f, 0, 0);
        }
        if (Input.GetKey(KeyCode.RightArrow))
        {
            transform.Translate(0.2f, 0, 0);
        }
    }
}
```

### Example 2: HP System

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        // Decrease HP
        hpGauge.fillAmount -= 0.2f;
        
        // Prevent floating point error
        if (hpGauge.fillAmount < 0.001f)
        {
            hpGauge.fillAmount = 0f;
        }
        
        // Clamp between 0 and 1
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
        
        // Game over check (considering floating point error)
        if (hpGauge.fillAmount <= 0f || Mathf.Approximately(hpGauge.fillAmount, 0f))
        {
            GameOver();
        }
    }
    
    void GameOver()
    {
        Debug.Log("Game Over!");
    }
}
```

---

## 7. Summary

### Key Mathf Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `Mathf.Clamp(value, min, max)` | Clamp value to range | `Clamp(health, 0, 100)` |
| `Mathf.Clamp01(value)` | Clamp to 0~1 range | `Clamp01(fillAmount)` |
| `Mathf.Approximately(a, b)` | Floating point comparison | `Approximately(a, 0.3f)` |
| `Mathf.Abs(value)` | Absolute value | `Abs(-5.5f)` = 5.5 |
| `Mathf.Max(a, b)` | Maximum value | `Max(10, 20)` = 20 |
| `Mathf.Min(a, b)` | Minimum value | `Min(10, 20)` = 10 |

### Floating Point Error Handling

1. **Handle small values**: `if (value < 0.001f) value = 0f;`
2. **Use Approximately**: `Mathf.Approximately(a, b)`
3. **Range check**: `Mathf.Abs(a - b) < epsilon`

### Best Practices

1. **Use Clamp**: Restrict values to prevent going out of range
2. **Use Approximately**: Use for floating point comparisons
3. **Handle errors**: Explicitly set small values to 0
4. **Use Clamp01**: Useful for UI fillAmount, etc.

---

## Practice Problems

1. Write code that clamps player position within screen boundaries (-10, 10).

2. Write code that uses Mathf.Clamp to prevent HP from going below 0.

3. Write a function that compares if two float values are nearly equal using Mathf.Approximately.

4. Write code that handles game over when fillAmount is close to 0.
