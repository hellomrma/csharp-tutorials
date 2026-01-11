---
title: Unity Attributes
titleEn: Unity Attributes
slugEn: 42-unity-attributes
description: Learn attributes to improve Unity Inspector. Covers [Header], [SerializeField], [Range], and more.
descriptionEn: Learn attributes to improve Unity Inspector. Covers [Header], [SerializeField], [Range], and more.
category: Unity C# Application
categoryEn: Unity C# Application
order: 42
---

# 42. Unity Attributes

## What are Unity Attributes?

Unity attributes add metadata to code to control how Unity Inspector displays variables. You can group variables, limit ranges, add tooltips, etc., to make the Inspector more user-friendly.

## Basic Concepts

- **Attribute**: Metadata added to code
- **Inspector improvement**: Control how variables are displayed
- **Code readability**: Group and organize variables
- **User experience**: Make Inspector more intuitive

---

## 1. [Header] - Group Variables

`[Header]` groups variables in the Inspector.

### Basic Usage

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    // Group UI reference variables in Inspector
    [Header("UI References")]
    public Image hpGauge;
    public GameObject restartButton;
    public GameObject gameOverText;
    
    [Header("Game Settings")]
    public float gameSpeed = 1f;
    public int maxLives = 3;
}
```

### Inspector Display

```
GameManager (Script)
├── UI References          ← Header
│   ├── Hp Gauge
│   ├── Restart Button
│   └── Game Over Text
└── Game Settings          ← Header
    ├── Game Speed
    └── Max Lives
```

### Using Multiple Headers

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    public float moveSpeed = 5f;
    public float jumpForce = 10f;
    
    [Header("Attack Settings")]
    public float attackDamage = 10f;
    public float attackRange = 2f;
    
    [Header("Health Settings")]
    public float maxHealth = 100f;
    public float currentHealth = 100f;
}
```

---

## 2. [SerializeField] - Display private Variables in Inspector

`[SerializeField]` allows private variables to be displayed in the Inspector.

### Basic Usage

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    // private but displayed in Inspector
    [SerializeField] private float health = 100f;
    [SerializeField] private float speed = 5f;
    
    // public variable (displayed in Inspector)
    public float damage = 10f;
}
```

### When to Use?

```csharp
// ✅ Good example: Maintain encapsulation while allowing Inspector adjustment
[SerializeField] private float health = 100f;

// ❌ Bad example: Breaks encapsulation
public float health = 100f;  // Accessible from other scripts
```

---

## 3. [Range] - Limit Value Range

`[Range]` allows values to be adjusted with a slider in the Inspector and limits the range.

### Basic Usage

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    // Only values between 0~10 can be selected (slider)
    [Range(0f, 10f)]
    public float moveSpeed = 5f;
    
    // Only values between 1~100 can be selected
    [Range(1, 100)]
    public int maxHealth = 50;
}
```

### Practical Example

```csharp
using UnityEngine;

public class GameSettings : MonoBehaviour
{
    [Header("Player Settings")]
    [Range(1f, 20f)]
    public float playerSpeed = 5f;
    
    [Range(10, 200)]
    public int playerHealth = 100;
    
    [Header("Game Settings")]
    [Range(0.1f, 5f)]
    public float gameSpeed = 1f;
    
    [Range(1, 10)]
    public int difficulty = 5;
}
```

---

## 4. [Tooltip] - Add Tooltip

`[Tooltip]` displays a description when hovering over a variable in the Inspector.

### Basic Usage

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Tooltip("Player's movement speed. Higher values move faster.")]
    public float moveSpeed = 5f;
    
    [Tooltip("Player's maximum health.")]
    public int maxHealth = 100;
}
```

### Using with Header

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [Header("UI References")]
    [Tooltip("UI Image component that displays HP gauge")]
    public Image hpGauge;
    
    [Tooltip("Game restart button object")]
    public GameObject restartButton;
}
```

---

## 5. [Space] - Add Spacing

`[Space]` adds spacing between variables in the Inspector.

### Basic Usage

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    
    [Space]  // Add space above
    public float jumpForce = 10f;
    
    [Space(10)]  // Add 10 pixel space
    public float attackDamage = 10f;
}
```

---

## 6. Practical Examples

### Example 1: GameManager

```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    // Static variable to track game over state
    public static bool isGameOver = false;

    // Group UI reference variables in Inspector
    [Header("UI References")]
    [Tooltip("UI Image component that displays HP gauge")]
    public Image hpGauge;
    
    [Tooltip("Game restart button object")]
    public GameObject restartButton;
    
    [Tooltip("Game over text object")]
    public GameObject gameOverText;

    [Header("Game Settings")]
    [Range(0.5f, 2f)]
    [Tooltip("Game speed multiplier")]
    public float gameSpeed = 1f;
    
    [Range(1, 10)]
    [Tooltip("Game difficulty (1=easy, 10=hard)")]
    public int difficulty = 5;
}
```

### Example 2: PlayerController

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    [Range(1f, 20f)]
    [Tooltip("Player's movement speed")]
    public float moveSpeed = 5f;
    
    [Range(5f, 30f)]
    [Tooltip("Player's jump force")]
    public float jumpForce = 10f;
    
    [Space]
    [Header("Health Settings")]
    [Range(10, 200)]
    [Tooltip("Player's maximum health")]
    public int maxHealth = 100;
    
    [SerializeField]
    [Tooltip("Player's current health (only editable in Inspector)")]
    private int currentHealth = 100;
}
```

---

## 7. Combining Attributes

Multiple attributes can be used together.

### Attribute Order

```csharp
[Header("Group Name")]
[Tooltip("Description")]
[Range(min, max)]
[SerializeField]
private float value;
```

### Practical Example

```csharp
using UnityEngine;

public class Weapon : MonoBehaviour
{
    [Header("Attack Settings")]
    [Range(1f, 100f)]
    [Tooltip("Weapon's attack damage")]
    public float damage = 10f;
    
    [Range(0.1f, 5f)]
    [Tooltip("Attack speed (attacks per second)")]
    public float attackSpeed = 1f;
    
    [Space]
    [Header("Durability Settings")]
    [SerializeField]
    [Range(1, 1000)]
    [Tooltip("Weapon's maximum durability")]
    private int maxDurability = 100;
    
    [SerializeField]
    [Tooltip("Weapon's current durability")]
    private int currentDurability = 100;
}
```

---

## 8. Summary

### Key Unity Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `[Header("name")]` | Group variables | `[Header("UI References")]` |
| `[SerializeField]` | Display private variable in Inspector | `[SerializeField] private float health;` |
| `[Range(min, max)]` | Limit value range (slider) | `[Range(0f, 10f)]` |
| `[Tooltip("description")]` | Add tooltip | `[Tooltip("Health value")]` |
| `[Space]` | Add spacing | `[Space]` or `[Space(10)]` |

### Best Practices

1. **Use Header**: Group related variables
2. **SerializeField**: Maintain encapsulation while allowing Inspector access
3. **Use Range**: Limit value range and provide slider
4. **Add Tooltip**: Improve readability with variable descriptions
5. **Combine attributes**: Use multiple attributes together to improve Inspector

---

## Practice Problems

1. Use [Header] in PlayerController to group movement settings and health settings.

2. Display private variables in Inspector with [SerializeField] and limit range with [Range].

3. Add [Tooltip] to all public variables with descriptions.

4. Use [Space] to add appropriate spacing between variable groups.
