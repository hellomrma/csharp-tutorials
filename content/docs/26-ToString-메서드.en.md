---
title: ToString Method
titleEn: ToString Method
slugEn: 26-tostring-method
description: Learn about the ToString() method in C#. Understand how to convert numbers and objects to strings, and use format specifiers to output in desired formats.
descriptionEn: Learn about the ToString() method in C#. Understand how to convert numbers and objects to strings, and use format specifiers to output in desired formats.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 26
---

# 26. ToString Method

## What is ToString?

ToString() is a method that all objects have, which **converts objects to strings**. It's used to convert numbers to strings or express object information as text.

## Basic Concepts

- **ToString()**: Method that converts objects to strings
- **Built-in**: All classes inherit ToString() from Object
- **Override**: Can override ToString() to match your class
- **Format Specifiers**: Can convert numbers to desired formats

## Basic Usage

### Converting Numbers to Strings

```csharp
using UnityEngine;

public class BasicToString : MonoBehaviour
{
    void Start()
    {
        int number = 100;
        string text = number.ToString();
        Debug.Log("Number: " + text);  // "Number: 100"
        
        float pi = 3.14f;
        string piText = pi.ToString();
        Debug.Log("Pi: " + piText);  // "Pi: 3.14"
        
        bool isTrue = true;
        string boolText = isTrue.ToString();
        Debug.Log("Boolean: " + boolText);  // "Boolean: True"
    }
}
```

### Using with String Interpolation

```csharp
using UnityEngine;

public class StringInterpolation : MonoBehaviour
{
    void Start()
    {
        int score = 1500;
        int level = 5;
        
        // Using string interpolation
        string message = $"Score: {score.ToString()}, Level: {level.ToString()}";
        Debug.Log(message);  // "Score: 1500, Level: 5"
        
        // ToString() can be omitted (automatic conversion)
        string message2 = $"Score: {score}, Level: {level}";
        Debug.Log(message2);  // "Score: 1500, Level: 5"
    }
}
```

## Number Format Specifiers

### Integer Format

```csharp
using UnityEngine;

public class IntegerFormat : MonoBehaviour
{
    void Start()
    {
        int number = 12345;
        
        // Default format
        Debug.Log(number.ToString());  // "12345"
        
        // Decimal (default)
        Debug.Log(number.ToString("D"));  // "12345"
        
        // Decimal (with digit specification)
        Debug.Log(number.ToString("D8"));  // "00012345" (8 digits, padded with 0)
        
        // Hexadecimal (lowercase)
        Debug.Log(number.ToString("x"));  // "3039"
        
        // Hexadecimal (uppercase)
        Debug.Log(number.ToString("X"));  // "3039"
        
        // Hexadecimal (with digit specification)
        Debug.Log(number.ToString("X8"));  // "00003039"
    }
}
```

### Float Format

```csharp
using UnityEngine;

public class FloatFormat : MonoBehaviour
{
    void Start()
    {
        float number = 1234.5678f;
        
        // Default format
        Debug.Log(number.ToString());  // "1234.568" (rounded)
        
        // Fixed point (F)
        Debug.Log(number.ToString("F"));  // "1234.57" (2 decimal places)
        Debug.Log(number.ToString("F2"));  // "1234.57"
        Debug.Log(number.ToString("F4"));  // "1234.5678"
        
        // Exponential notation (E)
        Debug.Log(number.ToString("E"));  // "1.234568E+003"
        Debug.Log(number.ToString("e"));  // "1.234568e+003"
        
        // General format (G)
        Debug.Log(number.ToString("G"));  // "1234.568"
        
        // Number format (N) - includes thousand separators
        Debug.Log(number.ToString("N"));  // "1,234.57"
        Debug.Log(number.ToString("N2"));  // "1,234.57"
        
        // Currency format (C)
        Debug.Log(number.ToString("C"));  // "$1,235" (US locale)
        Debug.Log(number.ToString("C2"));  // "$1,234.57"
    }
}
```

### Percent Format

```csharp
using UnityEngine;

public class PercentFormat : MonoBehaviour
{
    void Start()
    {
        float ratio = 0.75f;
        
        // Percent format (P)
        Debug.Log(ratio.ToString("P"));  // "75.00 %"
        Debug.Log(ratio.ToString("P0"));  // "75 %" (no decimals)
        Debug.Log(ratio.ToString("P2"));  // "75.00 %"
    }
}
```

## Date/Time Format

### DateTime ToString

```csharp
using System;
using UnityEngine;

public class DateTimeFormat : MonoBehaviour
{
    void Start()
    {
        DateTime now = DateTime.Now;
        
        // Default format
        Debug.Log(now.ToString());  // "1/15/2024 3:30:45 PM"
        
        // Short date
        Debug.Log(now.ToString("d"));  // "1/15/2024"
        
        // Long date
        Debug.Log(now.ToString("D"));  // "Monday, January 15, 2024"
        
        // Time
        Debug.Log(now.ToString("t"));  // "3:30 PM"
        Debug.Log(now.ToString("T"));  // "3:30:45 PM"
        
        // Custom format
        Debug.Log(now.ToString("yyyy-MM-dd HH:mm:ss"));  // "2024-01-15 15:30:45"
        Debug.Log(now.ToString("MM/dd/yyyy"));  // "01/15/2024"
    }
}
```

## Overriding ToString() in Classes

### Default ToString()

```csharp
using UnityEngine;

public class Player
{
    public string name;
    public int level;
    public int hp;
    
    // Without overriding ToString(), only class name is returned
    // Example: "Player"
}

public class ToStringOverride : MonoBehaviour
{
    void Start()
    {
        Player player = new Player();
        player.name = "Warrior";
        player.level = 10;
        player.hp = 100;
        
        Debug.Log(player.ToString());  // "Player" (only class name)
    }
}
```

### Overriding ToString()

```csharp
using UnityEngine;

public class Player
{
    public string name;
    public int level;
    public int hp;
    
    // Override ToString()
    public override string ToString()
    {
        return $"Name: {name}, Level: {level}, HP: {hp}";
    }
}

public class ToStringOverride : MonoBehaviour
{
    void Start()
    {
        Player player = new Player();
        player.name = "Warrior";
        player.level = 10;
        player.hp = 100;
        
        Debug.Log(player.ToString());  // "Name: Warrior, Level: 10, HP: 100"
    }
}
```

### ToString() in Unity MonoBehaviour

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public string enemyName;
    public int hp;
    public int maxHp;
    
    public override string ToString()
    {
        return $"{enemyName} (HP: {hp}/{maxHp})";
    }
    
    void Start()
    {
        enemyName = "Goblin";
        hp = 50;
        maxHp = 50;
        
        Debug.Log(this.ToString());  // "Goblin (HP: 50/50)"
    }
}
```

## Practical Usage Examples

### Example 1: Score Display

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ScoreDisplay : MonoBehaviour
{
    public Text scoreText;
    private int score = 0;
    
    void Update()
    {
        // Convert score to string and display in UI
        scoreText.text = "Score: " + score.ToString();
        
        // Or use string interpolation
        scoreText.text = $"Score: {score}";
    }
    
    void AddScore(int points)
    {
        score += points;
    }
}
```

### Example 2: Time Display

```csharp
using System;
using UnityEngine;
using UnityEngine.UI;

public class TimeDisplay : MonoBehaviour
{
    public Text timeText;
    
    void Update()
    {
        float time = Time.time;
        
        // Convert seconds to minutes:seconds format
        int minutes = (int)(time / 60);
        int seconds = (int)(time % 60);
        
        // Use ToString("D2") to display as 2-digit number (e.g., "05:03")
        timeText.text = $"{minutes.ToString("D2")}:{seconds.ToString("D2")}";
    }
}
```

### Example 3: Percentage Display

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    public Text healthText;
    public int currentHp = 75;
    public int maxHp = 100;
    
    void Update()
    {
        float percentage = (float)currentHp / maxHp;
        
        // Display in percentage format
        healthText.text = $"Health: {percentage.ToString("P0")} ({currentHp}/{maxHp})";
        // Output: "Health: 75 % (75/100)"
    }
}
```

### Example 4: Currency Display

```csharp
using UnityEngine;
using UnityEngine.UI;

public class CurrencyDisplay : MonoBehaviour
{
    public Text goldText;
    private int gold = 1234567;
    
    void Update()
    {
        // Display in currency format (with thousand separators)
        goldText.text = "Gold: " + gold.ToString("N0");
        // Output: "Gold: 1,234,567"
        
        // Or with currency symbol
        goldText.text = gold.ToString("C0");
        // Output: "$1,234,567"
    }
}
```

### Example 5: Debug Information Output

```csharp
using UnityEngine;

public class DebugInfo : MonoBehaviour
{
    public Vector3 position;
    public float speed;
    public bool isMoving;
    
    public override string ToString()
    {
        return $"Position: {position}, Speed: {speed.ToString("F2")}, Moving: {isMoving}";
    }
    
    void Update()
    {
        // Output debug information
        Debug.Log(this.ToString());
        // Output: "Position: (1, 2, 3), Speed: 5.50, Moving: True"
    }
}
```

## Format Specifier Summary

### Number Formats

| Format | Description | Example |
|--------|-------------|---------|
| `D` or `d` | Decimal | `123.ToString("D")` → "123" |
| `D5` | Decimal (5 digits) | `123.ToString("D5")` → "00123" |
| `X` | Hexadecimal (uppercase) | `255.ToString("X")` → "FF" |
| `x` | Hexadecimal (lowercase) | `255.ToString("x")` → "ff" |
| `F` or `f` | Fixed point | `3.14.ToString("F2")` → "3.14" |
| `E` or `e` | Exponential notation | `1234.ToString("E")` → "1.234000E+003" |
| `N` or `n` | Number format (thousand separators) | `1234.ToString("N")` → "1,234.00" |
| `C` or `c` | Currency format | `1234.ToString("C")` → "$1,234" |
| `P` or `p` | Percent | `0.75.ToString("P")` → "75.00 %" |

### Date Formats

| Format | Description | Example |
|--------|-------------|---------|
| `d` | Short date | `DateTime.Now.ToString("d")` → "1/15/2024" |
| `D` | Long date | `DateTime.Now.ToString("D")` → "Monday, January 15, 2024" |
| `t` | Short time | `DateTime.Now.ToString("t")` → "3:30 PM" |
| `T` | Long time | `DateTime.Now.ToString("T")` → "3:30:45 PM" |
| `yyyy-MM-dd` | Custom format | `DateTime.Now.ToString("yyyy-MM-dd")` → "2024-01-15" |

## Notes

1. **Null Handling**: Calling ToString() on null object throws NullReferenceException
2. **Performance**: String interpolation (`$"..."`) automatically calls ToString(), so it's convenient
3. **Locale**: Currency (C) or date formats may vary depending on system locale
4. **Override**: Overriding ToString() to match your class is useful for debugging

## Practical Tips

### Tip 1: Using with Null Check

```csharp
using UnityEngine;

public class NullSafeToString : MonoBehaviour
{
    void Start()
    {
        object obj = null;
        
        // Safe ToString() call
        string result = obj?.ToString() ?? "null";
        Debug.Log(result);  // "null"
        
        // Or
        if (obj != null)
        {
            Debug.Log(obj.ToString());
        }
    }
}
```

### Tip 2: Combining Multiple Values

```csharp
using UnityEngine;

public class CombineValues : MonoBehaviour
{
    void Start()
    {
        int score = 1500;
        int level = 5;
        float time = 123.45f;
        
        // Combine multiple values into string
        string info = $"Score: {score.ToString("N0")}, Level: {level}, Time: {time.ToString("F2")}s";
        Debug.Log(info);
        // Output: "Score: 1,500, Level: 5, Time: 123.45s"
    }
}
```

### Tip 3: Conditional Format

```csharp
using UnityEngine;

public class ConditionalFormat : MonoBehaviour
{
    void Start()
    {
        float number = 1234.567f;
        
        // Show decimals if present, otherwise show as integer
        string formatted = number % 1 == 0 
            ? number.ToString("N0") 
            : number.ToString("F2");
        
        Debug.Log(formatted);
    }
}
```

### Tip 4: Outputting List Elements

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ListToString : MonoBehaviour
{
    void Start()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        // Convert each list element to string
        string result = string.Join(", ", numbers.ConvertAll(x => x.ToString()));
        Debug.Log(result);  // "1, 2, 3, 4, 5"
        
        // Or using LINQ
        // string result = string.Join(", ", numbers.Select(x => x.ToString()));
    }
}
```

---

[← Back to Table of Contents](../README.md)

