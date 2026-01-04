---
title: Finding GameObjects and Getting Components
titleEn: Finding GameObjects and Getting Components
slugEn: 32-finding-gameobjects-and-getting-components
description: Learn how to find GameObjects and get components in Unity. Covers GameObject.Find(), GetComponent(), FindObjectOfType(), and other functions.
descriptionEn: Learn how to find GameObjects and get components in Unity. Covers GameObject.Find(), GetComponent(), FindObjectOfType(), and other functions.
category: Unity C# Application
categoryEn: Unity C# Application
order: 32
---

# 32. Finding GameObjects and Getting Components

## What is Finding GameObjects?

In Unity game development, finding other objects to reference or getting their components is a very important task. For example, when a player needs to find an enemy to attack, or when a game manager needs to check the player's health.

## Basic Concepts

- **GameObject**: All objects in a Unity scene
- **Component**: Functional units attached to GameObjects (e.g., Transform, Rigidbody, Script)
- **Reference**: Variables that point to other objects or components

---

## 1. GameObject.Find() - Finding by Name

`GameObject.Find()` finds and returns a GameObject with a specific name in the scene.

### Basic Usage

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    GameObject player;

    void Start()
    {
        // Find GameObject named "player" in the scene and store it
        player = GameObject.Find("player");
        
        if (player != null)
        {
            Debug.Log("Player found!");
        }
        else
        {
            Debug.Log("Player not found.");
        }
    }
}
```

### Features

- **Find by name**: GameObject name must match exactly
- **Cannot find inactive objects**: Only finds active objects
- **Performance warning**: Calling every frame can cause performance issues
- **Null check required**: Returns `null` if not found

### Precautions

```csharp
void Update()
{
    // ❌ Bad example: Finding every frame (performance issue)
    GameObject player = GameObject.Find("player");
    
    // ✅ Good example: Find once in Start() and store
    // (as shown in the example above)
}
```

---

## 2. GetComponent() - Getting Components

`GetComponent<T>()` gets a component of a specific type attached to a GameObject.

### Basic Usage

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    void Start()
    {
        // Find GameObject named "GameManager"
        GameObject gm = GameObject.Find("GameManager");
        
        if (gm != null)
        {
            // Get GameManager component
            GameManager gameManager = gm.GetComponent<GameManager>();
            
            if (gameManager != null)
            {
                // Call GameManager's method
                gameManager.DecreaseHp();
            }
        }
    }
}
```

### Getting Your Own Component

```csharp
public class PlayerController : MonoBehaviour
{
    void Start()
    {
        // Get your own Transform component
        Transform myTransform = GetComponent<Transform>();
        
        // Get your own Rigidbody2D component
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        
        // Get your own SpriteRenderer component
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
    }
}
```

### Getting Another Object's Component

```csharp
public class EnemyController : MonoBehaviour
{
    GameObject player;
    PlayerController playerController;

    void Start()
    {
        // Find player
        player = GameObject.Find("player");
        
        if (player != null)
        {
            // Get player's PlayerController component
            playerController = player.GetComponent<PlayerController>();
        }
    }
}
```

### Null Checking

```csharp
void Start()
{
    GameObject player = GameObject.Find("player");
    
    // Using without null check can cause errors
    // player.GetComponent<PlayerController>(); // ❌ Dangerous
    
    // ✅ Safe way
    if (player != null)
    {
        PlayerController pc = player.GetComponent<PlayerController>();
        if (pc != null)
        {
            // Use component
        }
    }
}
```

---

## 3. FindObjectOfType() - Finding by Type

`FindObjectOfType<T>()` finds a GameObject with a specific type of component in the scene.

### Basic Usage

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private Camera mainCamera;

    void Start()
    {
        // Find GameObject with Camera component
        mainCamera = Camera.main;
        
        // Use FindObjectOfType if Camera.main is null
        if (mainCamera == null)
        {
            mainCamera = FindObjectOfType<Camera>();
        }
    }
}
```

### Finding Multiple Objects

```csharp
using UnityEngine;

public class FireballSpawner : MonoBehaviour
{
    void Start()
    {
        // Find all FallingFireball components in the scene
        FallingFireball[] allFireballs = FindObjectsOfType<FallingFireball>();
        
        foreach (var fireball in allFireballs)
        {
            Debug.Log("Fireball found: " + fireball.name);
        }
    }
}
```

### Finding Inactive Objects Too

```csharp
// Find including inactive objects
FallingFireball[] allFireballs = FindObjectsOfType<FallingFireball>(true);
```

---

## 4. Practical Examples

### Example 1: Finding Player for Collision Detection

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    GameObject player;
    public float arrowSpeed = 0.1f;

    void Start()
    {
        // Find player
        player = GameObject.Find("player");
    }

    void Update()
    {
        // Move arrow
        transform.Translate(0, -arrowSpeed, 0);

        // Detect collision with player
        if (player != null)
        {
            Vector2 arrowPos = transform.position;
            Vector2 playerPos = player.transform.position;
            Vector2 direction = arrowPos - playerPos;
            float distance = direction.magnitude;

            if (distance < 1.5f) // Collision distance
            {
                // Find GameManager and decrease HP
                GameObject gm = GameObject.Find("GameManager");
                if (gm != null)
                {
                    GameManager gameManager = gm.GetComponent<GameManager>();
                    if (gameManager != null)
                    {
                        gameManager.DecreaseHp();
                    }
                }
                
                Destroy(gameObject);
            }
        }
    }
}
```

### Example 2: Finding Camera for Boundary Calculation

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private Camera mainCamera;
    private float minX, maxX;

    void Start()
    {
        // Find camera
        mainCamera = Camera.main;
        if (mainCamera == null)
        {
            mainCamera = FindObjectOfType<Camera>();
        }

        // Calculate camera bounds
        if (mainCamera != null && mainCamera.orthographic)
        {
            float orthographicSize = mainCamera.orthographicSize;
            float aspect = mainCamera.aspect;
            Vector3 cameraPos = mainCamera.transform.position;

            float cameraWidth = orthographicSize * 2f * aspect;
            minX = cameraPos.x - cameraWidth / 2f;
            maxX = cameraPos.x + cameraWidth / 2f;
        }
    }
}
```

---

## 5. Performance Optimization Tips

### 1. Find Once in Start()

```csharp
// ✅ Good example
GameObject player;

void Start()
{
    player = GameObject.Find("player");
}

void Update()
{
    if (player != null)
    {
        // Use player
    }
}
```

### 2. Assign Directly in Inspector

```csharp
// ✅ Best method: Assign directly in Inspector
public GameObject player; // Drag and drop in Inspector

void Start()
{
    // Already assigned, no need for Find()
    if (player != null)
    {
        // Use player
    }
}
```

### 3. Using Tags

```csharp
// Use tag instead of GameObject.Find()
GameObject player = GameObject.FindGameObjectWithTag("Player");
```

---

## 6. Summary

### GameObject Finding Methods Comparison

| Method | When to Use | Performance | Inactive Objects |
|--------|-------------|-------------|------------------|
| `GameObject.Find("name")` | When you know exact name | Slow | ❌ |
| `FindObjectOfType<T>()` | When finding by type | Medium | ❌ |
| `FindObjectsOfType<T>()` | When finding multiple | Slow | ❌ |
| Inspector Assignment | Most recommended | Fast | ✅ |

### Getting Components

- `GetComponent<T>()`: Get component from self or other GameObject
- Always null check required
- Efficient to get in Start() and store in variable

### Best Practices

1. **Inspector assignment first**: Fastest and safest
2. **Find in Start()**: Use Find() only once in Start()
3. **Null check required**: Always check null before use
4. **Caching**: Store frequently used references in variables

---

## Practice Problems

1. Write a script that finds a GameObject named "Enemy" in the scene and prints its position.

2. Write a script that gets your own Rigidbody2D component and sets gravity to 0.

3. Write a script that finds all GameObjects with the "Coin" tag in the scene and prints the count.
