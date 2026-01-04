---
title: Rigidbody2D and Collider2D
titleEn: Rigidbody2D and Collider2D
slugEn: 37-rigidbody2d-and-collider2d
description: Learn how to use Rigidbody2D and Collider2D components for 2D physics simulation in Unity.
descriptionEn: Learn how to use Rigidbody2D and Collider2D components for 2D physics simulation in Unity.
category: Unity C# Application
categoryEn: Unity C# Application
order: 37
---

# 37. Rigidbody2D and Collider2D

## What are Rigidbody2D and Collider2D?

Rigidbody2D and Collider2D are core components for 2D physics simulation and collision detection in Unity. Rigidbody2D handles physics simulation, and Collider2D defines collision areas.

## Basic Concepts

- **Rigidbody2D**: Component that handles physics simulation
- **Collider2D**: Component that defines collision areas
- **Kinematic**: Mode that moves without physics influence
- **Trigger**: Mode that only detects without physical collision

---

## 1. Basic Rigidbody2D Setup

### Adding Rigidbody2D

```csharp
using UnityEngine;

public class FallingFireball : MonoBehaviour
{
    void Start()
    {
        SetupRigidbody();
    }

    private void SetupRigidbody()
    {
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        if (rb == null)
        {
            // Add Rigidbody2D if not present
            rb = gameObject.AddComponent<Rigidbody2D>();
        }

        // Set to Kinematic (move without physics influence)
        rb.bodyType = RigidbodyType2D.Kinematic;
        
        // Disable gravity
        rb.gravityScale = 0;
        
        // Prevent rotation
        rb.freezeRotation = true;
        
        // Enable simulation (required for collision detection)
        rb.simulated = true;
    }
}
```

### Rigidbody2D Types

```csharp
// Dynamic: Fully participates in physics simulation
rb.bodyType = RigidbodyType2D.Dynamic;

// Kinematic: Move with code without physics influence
rb.bodyType = RigidbodyType2D.Kinematic;

// Static: Static object (doesn't move)
rb.bodyType = RigidbodyType2D.Static;
```

---

## 2. Kinematic Mode

Kinematic mode moves directly with code without being affected by physics simulation.

### Kinematic Setup

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private Rigidbody2D rb;

    void Start()
    {
        SetupRigidbody();
    }

    private void SetupRigidbody()
    {
        rb = GetComponent<Rigidbody2D>();
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody2D>();
        }

        // Set to Kinematic
        rb.bodyType = RigidbodyType2D.Kinematic;
        rb.gravityScale = 0;
        rb.freezeRotation = true;
    }

    void Update()
    {
        // Move directly with code
        float horizontalInput = Input.GetAxisRaw("Horizontal");
        Vector3 movement = new Vector3(horizontalInput * 5f * Time.deltaTime, 0, 0);
        transform.position += movement;
    }
}
```

### Using MovePosition()

```csharp
using UnityEngine;

public class FallingFireball : MonoBehaviour
{
    public float fallSpeed = 5f;
    private Rigidbody2D rb;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        SetupRigidbody();
    }

    private void SetupRigidbody()
    {
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody2D>();
        }
        rb.bodyType = RigidbodyType2D.Kinematic;
        rb.gravityScale = 0;
        rb.freezeRotation = true;
    }

    void Update()
    {
        // Use MovePosition (compatible with physics simulation)
        Vector3 newPosition = transform.position + Vector3.down * fallSpeed * Time.deltaTime;
        rb.MovePosition(newPosition);
    }
}
```

---

## 3. Collider2D Types

### BoxCollider2D - Rectangular Collision Area

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    void Start()
    {
        SetupCollider();
    }

    private void SetupCollider()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider == null)
        {
            // Add BoxCollider2D
            BoxCollider2D boxCollider = gameObject.AddComponent<BoxCollider2D>();
            boxCollider.isTrigger = true;
            
            // Adjust to sprite size
            SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
            if (spriteRenderer != null && spriteRenderer.sprite != null)
            {
                boxCollider.size = spriteRenderer.bounds.size;
            }
        }
    }
}
```

### CircleCollider2D - Circular Collision Area

```csharp
using UnityEngine;

public class FallingFireball : MonoBehaviour
{
    void Start()
    {
        SetupCollider();
    }

    private void SetupCollider()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider == null)
        {
            // Add CircleCollider2D
            CircleCollider2D circleCollider = gameObject.AddComponent<CircleCollider2D>();
            circleCollider.isTrigger = true;
            
            // Adjust to sprite size
            AdjustColliderSize(circleCollider);
        }
    }

    private void AdjustColliderSize(CircleCollider2D collider)
    {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null && spriteRenderer.sprite != null)
        {
            // Use larger of width or height
            float spriteSize = Mathf.Max(
                spriteRenderer.bounds.size.x, 
                spriteRenderer.bounds.size.y
            );
            // Set radius to half of sprite size
            collider.radius = spriteSize / 2f;
        }
    }
}
```

---

## 4. Trigger Setup

Trigger mode only detects collisions without physical collision.

### Trigger Setup

```csharp
using UnityEngine;

public class Coin : MonoBehaviour
{
    void Start()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider != null)
        {
            // Set to Trigger mode
            collider.isTrigger = true;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Handle coin collection
            Destroy(gameObject);
        }
    }
}
```

### Trigger vs Collision

```csharp
// Trigger mode: Only detect without physical collision
collider.isTrigger = true;
// OnTriggerEnter2D() called

// Collision mode: Actual physical collision occurs
collider.isTrigger = false;
// OnCollisionEnter2D() called
```

---

## 5. Practical Examples

### Example 1: Sheep (Player) Setup

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;
    private Rigidbody2D rb;

    void Start()
    {
        Initialize();
    }

    private void Initialize()
    {
        InitializeComponents();
        SetupRigidbody();
        SetupCollider();
    }

    private void InitializeComponents()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    private void SetupRigidbody()
    {
        rb = GetComponent<Rigidbody2D>();
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody2D>();
            rb.bodyType = RigidbodyType2D.Kinematic;
            rb.gravityScale = 0;
            rb.freezeRotation = true;
        }
    }

    private void SetupCollider()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider == null)
        {
            BoxCollider2D boxCollider = gameObject.AddComponent<BoxCollider2D>();
            boxCollider.isTrigger = true;
            
            if (spriteRenderer != null && spriteRenderer.sprite != null)
            {
                boxCollider.size = spriteRenderer.bounds.size;
            }
        }
        else
        {
            collider.isTrigger = true;
        }

        // Set Player tag
        if (!gameObject.CompareTag("Player"))
        {
            gameObject.tag = "Player";
        }
    }
}
```

### Example 2: Fireball Setup

```csharp
using UnityEngine;

public class FallingFireball : MonoBehaviour
{
    public float fallSpeed = 5f;
    private Rigidbody2D rb;

    void Start()
    {
        Initialize();
    }

    private void Initialize()
    {
        SetupRigidbody();
        SetupCollider();
    }

    private void SetupRigidbody()
    {
        rb = GetComponent<Rigidbody2D>();
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody2D>();
        }

        rb.bodyType = RigidbodyType2D.Kinematic;
        rb.gravityScale = 0;
        rb.freezeRotation = true;
        rb.simulated = true;
    }

    private void SetupCollider()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider == null)
        {
            CircleCollider2D circleCollider = gameObject.AddComponent<CircleCollider2D>();
            circleCollider.isTrigger = true;
            AdjustColliderSize(circleCollider);
        }
        else
        {
            collider.isTrigger = true;
        }
    }

    private void AdjustColliderSize(CircleCollider2D collider)
    {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null && spriteRenderer.sprite != null)
        {
            float spriteSize = Mathf.Max(
                spriteRenderer.bounds.size.x, 
                spriteRenderer.bounds.size.y
            );
            collider.radius = spriteSize / 2f;
        }
    }

    void Update()
    {
        // Move with MovePosition
        Vector3 newPosition = transform.position + Vector3.down * fallSpeed * Time.deltaTime;
        rb.MovePosition(newPosition);
    }
}
```

---

## 6. Precautions

### 1. Rigidbody2D Required

```csharp
// ✅ At least one side needs Rigidbody2D for collision detection
// If both don't have it, collision won't be detected
```

### 2. Kinematic vs Dynamic

```csharp
// Kinematic: Move directly with code, no physics influence
rb.bodyType = RigidbodyType2D.Kinematic;
transform.position += movement; // or rb.MovePosition()

// Dynamic: Participate in physics simulation
rb.bodyType = RigidbodyType2D.Dynamic;
rb.velocity = new Vector2(5f, 0); // Move with velocity
```

### 3. Trigger Setup

```csharp
// Trigger mode: OnTriggerEnter2D() called
collider.isTrigger = true;

// Collision mode: OnCollisionEnter2D() called
collider.isTrigger = false;
```

### 4. Enable Simulation

```csharp
// Need to enable simulation for collision detection
rb.simulated = true;
```

---

## 7. Summary

### Rigidbody2D Type Comparison

| Type | Features | When to Use |
|------|----------|-------------|
| **Dynamic** | Fully participates in physics simulation | Need gravity, force, collision response |
| **Kinematic** | Move with code without physics influence | Objects controlled directly |
| **Static** | Static object | Walls, floors that don't move |

### Collider2D Types

- **BoxCollider2D**: Rectangular collision area (player, walls, etc.)
- **CircleCollider2D**: Circular collision area (bullets, coins, etc.)
- **CapsuleCollider2D**: Capsule-shaped collision area
- **PolygonCollider2D**: Polygon collision area

### Best Practices

1. **Use Kinematic**: Use Kinematic for directly controlled objects
2. **Set Trigger**: Use Trigger mode if only collision detection is needed
3. **Adjust Size**: Adjust Collider size to match sprite size
4. **Enable Simulation**: Set simulated = true for collision detection

---

## Practice Problems

1. Write a script that automatically adds Rigidbody2D (Kinematic) and BoxCollider2D (Trigger) to a player object.

2. Write a script that automatically adds Rigidbody2D (Kinematic) and CircleCollider2D (Trigger) to a bullet object.

3. Write a script that automatically destroys objects when they go off-screen.
