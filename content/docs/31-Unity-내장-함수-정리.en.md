---
title: Unity Built-in Functions Reference
titleEn: Unity Built-in Functions Reference
slugEn: 31-unity-built-in-functions-reference
description: A comprehensive reference guide for commonly used Unity built-in functions. Learn about functions from Input, Transform, Time, Vector3, GameObject, and other essential classes.
descriptionEn: A comprehensive reference guide for commonly used Unity built-in functions. Learn about functions from Input, Transform, Time, Vector3, GameObject, and other essential classes.
category: Unity C# Application
categoryEn: Unity C# Application
order: 31
---

# 31. Unity Built-in Functions Reference

## What are Unity Built-in Functions?

Unity built-in functions are pre-made functions provided by the Unity engine. They offer various features needed for game development, such as moving and rotating game objects, receiving user input, and managing time.

## Basic Concepts

- **Class**: A group of related functions (e.g., Input, Transform, Time)
- **Static Function**: Called directly with the class name (e.g., `Input.GetKeyDown()`)
- **Instance Function**: Called through an object (e.g., `transform.Rotate()`)
- **Frame Independence**: Use `Time.deltaTime` to maintain constant speed regardless of framerate

---

## 1. Input Class - Input Handling

The Input class handles user input from keyboard, mouse, joystick, etc.

### Keyboard Input

#### Input.GetKeyDown() - Key Press Moment

```csharp
using UnityEngine;

public class KeyInput : MonoBehaviour
{
    void Update()
    {
        // Returns true only once when a specific key is pressed
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("Spacebar pressed!");
        }
        
        if (Input.GetKeyDown(KeyCode.W))
        {
            Debug.Log("W key pressed!");
        }
    }
}
```

**Features:**
- Returns true **only once** when key is pressed
- Returns true only once even if key is held down
- Used to detect key press start

#### Input.GetKey() - Key Held Down

```csharp
using UnityEngine;

public class KeyHold : MonoBehaviour
{
    void Update()
    {
        // Returns true continuously while key is held down
        if (Input.GetKey(KeyCode.W))
        {
            Debug.Log("W key is being held!");
            // Used for continuous actions like movement
        }
    }
}
```

**Features:**
- Returns true **continuously** while key is held down
- Used for continuous actions (movement, rotation, etc.)

#### Input.GetKeyUp() - Key Release Moment

```csharp
using UnityEngine;

public class KeyRelease : MonoBehaviour
{
    void Update()
    {
        // Returns true only once when key is released
        if (Input.GetKeyUp(KeyCode.Space))
        {
            Debug.Log("Spacebar released!");
        }
    }
}
```

**Features:**
- Returns true **only once** when key is released
- Used to detect key release

#### Common KeyCode List

```csharp
// Alphabet
KeyCode.A, KeyCode.B, KeyCode.C, ..., KeyCode.Z

// Numbers
KeyCode.Alpha0, KeyCode.Alpha1, ..., KeyCode.Alpha9

// Special Keys
KeyCode.Space        // Spacebar
KeyCode.Return       // Enter
KeyCode.Escape       // ESC
KeyCode.LeftShift    // Left Shift
KeyCode.RightShift   // Right Shift
KeyCode.LeftControl  // Left Ctrl
KeyCode.RightControl // Right Ctrl

// Arrow Keys
KeyCode.UpArrow      // Up Arrow
KeyCode.DownArrow    // Down Arrow
KeyCode.LeftArrow    // Left Arrow
KeyCode.RightArrow   // Right Arrow

// Mouse Buttons
KeyCode.Mouse0       // Left Button
KeyCode.Mouse1       // Right Button
KeyCode.Mouse2       // Middle Button
```

### Mouse Input

#### Input.GetMouseButtonDown() - Mouse Button Press Moment

```csharp
using UnityEngine;

public class MouseClick : MonoBehaviour
{
    void Update()
    {
        // Left button click (once)
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("Left click!");
        }
        
        // Right button click
        if (Input.GetMouseButtonDown(1))
        {
            Debug.Log("Right click!");
        }
        
        // Middle button click
        if (Input.GetMouseButtonDown(2))
        {
            Debug.Log("Middle click!");
        }
    }
}
```

**Mouse Button Numbers:**
- **0**: Left button
- **1**: Right button
- **2**: Middle button (wheel click)

#### Input.GetMouseButton() - Mouse Button Held Down

```csharp
using UnityEngine;

public class MouseDrag : MonoBehaviour
{
    void Update()
    {
        // While left button is held down
        if (Input.GetMouseButton(0))
        {
            Debug.Log("Dragging!");
        }
    }
}
```

#### Input.GetMouseButtonUp() - Mouse Button Release Moment

```csharp
using UnityEngine;

public class MouseRelease : MonoBehaviour
{
    void Update()
    {
        // When left button is released
        if (Input.GetMouseButtonUp(0))
        {
            Debug.Log("Drag ended!");
        }
    }
}
```

#### Input.mousePosition - Mouse Position

```csharp
using UnityEngine;

public class MousePosition : MonoBehaviour
{
    void Update()
    {
        // Current mouse position (screen coordinates)
        Vector3 mousePos = Input.mousePosition;
        
        // Output X, Y coordinates
        Debug.Log($"Mouse X: {mousePos.x}, Y: {mousePos.y}");
        
        // Screen size information
        float screenWidth = Screen.width;   // Screen width (pixels)
        float screenHeight = Screen.height; // Screen height (pixels)
        
        // Normalized position (0~1)
        float normalizedX = mousePos.x / screenWidth;
        float normalizedY = mousePos.y / screenHeight;
    }
}
```

**Features:**
- **Screen Coordinates**: Bottom-left is (0, 0), top-right is (Screen.width, Screen.height)
- **Pixel Units**: Value varies based on screen resolution
- **Z Value**: Always 0 (distance from camera)

#### Input.GetAxis() - Virtual Input Axis

```csharp
using UnityEngine;

public class AxisInput : MonoBehaviour
{
    void Update()
    {
        // Horizontal input (A/D, Left/Right arrows)
        float horizontal = Input.GetAxis("Horizontal");
        
        // Vertical input (W/S, Up/Down arrows)
        float vertical = Input.GetAxis("Vertical");
        
        // Returns smooth value between -1.0 ~ 1.0 (with acceleration/deceleration)
        Debug.Log($"Horizontal: {horizontal}, Vertical: {vertical}");
    }
}
```

**Features:**
- **Smooth Value**: Returns smooth value between -1.0 ~ 1.0 (with acceleration/deceleration)
- **Default Axes**: "Horizontal", "Vertical", "Mouse X", "Mouse Y", "Fire1", "Fire2", "Fire3"
- **Configuration**: Can configure axes in Edit > Project Settings > Input Manager

#### Input.GetAxisRaw() - Virtual Input Axis (No Smoothing)

```csharp
using UnityEngine;

public class RawAxisInput : MonoBehaviour
{
    void Update()
    {
        // Immediately returns -1, 0, or 1 (no smoothing)
        float horizontal = Input.GetAxisRaw("Horizontal");
        float vertical = Input.GetAxisRaw("Vertical");
    }
}
```

**Features:**
- **Immediate Response**: Returns only -1, 0, or 1
- **No Smoothing**: No acceleration/deceleration, immediate response

---

## 2. Transform Class - Transform (Position, Rotation, Scale)

The Transform class manages game object position, rotation, and scale.

### Position

#### transform.position - World Space Position

```csharp
using UnityEngine;

public class PositionControl : MonoBehaviour
{
    void Update()
    {
        // Get current position
        Vector3 currentPos = transform.position;
        
        // Set position
        transform.position = new Vector3(0, 0, 0);
        
        // Change only X coordinate
        transform.position = new Vector3(5, transform.position.y, transform.position.z);
        
        // Simple method
        transform.position = new Vector3(5, 0, 0);
    }
}
```

#### transform.localPosition - Local Space Position

```csharp
using UnityEngine;

public class LocalPosition : MonoBehaviour
{
    void Update()
    {
        // Relative position to parent
        transform.localPosition = new Vector3(1, 0, 0);
    }
}
```

**Difference:**
- **position**: World space (absolute position)
- **localPosition**: Local space (relative position to parent)

### Rotation

#### transform.Rotate() - Apply Rotation

```csharp
using UnityEngine;

public class RotateObject : MonoBehaviour
{
    void Update()
    {
        // Rotate 90 degrees around Z-axis (every frame)
        transform.Rotate(0, 0, 90);
        
        // Rotate 90 degrees per second (frame-independent)
        transform.Rotate(0, 0, 90 * Time.deltaTime);
        
        // Rotate around X-axis
        transform.Rotate(90 * Time.deltaTime, 0, 0);
        
        // Rotate around Y-axis
        transform.Rotate(0, 90 * Time.deltaTime, 0);
    }
}
```

**Parameters:**
- **First**: X-axis rotation angle (degrees)
- **Second**: Y-axis rotation angle (degrees)
- **Third**: Z-axis rotation angle (degrees)

#### transform.rotation - Set Rotation Value

```csharp
using UnityEngine;

public class SetRotation : MonoBehaviour
{
    void Update()
    {
        // Set rotation with Quaternion
        transform.rotation = Quaternion.Euler(0, 90, 0);
        
        // Get current rotation value
        Quaternion currentRot = transform.rotation;
    }
}
```

#### transform.localRotation - Local Rotation

```csharp
using UnityEngine;

public class LocalRotation : MonoBehaviour
{
    void Update()
    {
        // Relative rotation to parent
        transform.localRotation = Quaternion.Euler(0, 45, 0);
    }
}
```

#### transform.LookAt() - Look at Specific Direction

```csharp
using UnityEngine;

public class LookAtTarget : MonoBehaviour
{
    public Transform target;  // Target to look at
    
    void Update()
    {
        // Rotate to look at target
        transform.LookAt(target);
        
        // Look at specific position
        transform.LookAt(new Vector3(0, 0, 0));
    }
}
```

### Translation

#### transform.Translate() - Apply Movement

```csharp
using UnityEngine;

public class MoveObject : MonoBehaviour
{
    public float speed = 5f;
    
    void Update()
    {
        // Move forward (local space)
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        
        // Move right
        transform.Translate(Vector3.right * speed * Time.deltaTime);
        
        // Move up
        transform.Translate(Vector3.up * speed * Time.deltaTime);
        
        // Move in world space
        transform.Translate(Vector3.forward * speed * Time.deltaTime, Space.World);
    }
}
```

**Space Parameter:**
- **Space.Self** (default): Local space
- **Space.World**: World space

### Scale

#### transform.localScale - Set Scale

```csharp
using UnityEngine;

public class ScaleObject : MonoBehaviour
{
    void Update()
    {
        // Set scale (1 = original size)
        transform.localScale = new Vector3(2, 2, 2);  // 2x scale
        
        // Scale only X-axis
        transform.localScale = new Vector3(2, 1, 1);
        
        // Get scale
        Vector3 currentScale = transform.localScale;
    }
}
```

---

## 3. Time Class - Time Management

The Time class provides time-related information.

### Time.deltaTime - Time Between Frames

```csharp
using UnityEngine;

public class TimeBasedMovement : MonoBehaviour
{
    public float speed = 5f;
    
    void Update()
    {
        // Frame-independent movement
        // deltaTime: Time between previous and current frame (in seconds)
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        
        // Frame-independent rotation
        transform.Rotate(0, 90 * Time.deltaTime, 0);
    }
}
```

**Features:**
- **Frame Independence**: Maintains constant speed regardless of framerate
- **Unit**: Seconds (e.g., ~0.016 seconds at 60fps)
- **Essential**: Must use for continuous actions like movement and rotation

### Time.time - Elapsed Time Since Game Start

```csharp
using UnityEngine;

public class GameTime : MonoBehaviour
{
    void Update()
    {
        // Elapsed time since game start (in seconds)
        float elapsedTime = Time.time;
        Debug.Log($"Elapsed time: {elapsedTime} seconds");
        
        // Execute every 5 seconds
        if (Mathf.FloorToInt(Time.time) % 5 == 0)
        {
            Debug.Log("5 seconds elapsed!");
        }
    }
}
```

### Time.timeScale - Time Scale

```csharp
using UnityEngine;

public class TimeScale : MonoBehaviour
{
    void Update()
    {
        // Set time scale
        Time.timeScale = 1.0f;   // Normal speed
        Time.timeScale = 0.5f;  // Half speed (slow motion)
        Time.timeScale = 2.0f;  // 2x speed (fast motion)
        Time.timeScale = 0f;    // Time stop (pause)
    }
}
```

**Note:**
- When `Time.timeScale = 0`, `Time.deltaTime` also becomes 0
- Use `Time.unscaledDeltaTime` for pause scenarios

### Time.unscaledDeltaTime - Time Scale Independent

```csharp
using UnityEngine;

public class UnscaledTime : MonoBehaviour
{
    void Update()
    {
        // deltaTime not affected by timeScale
        // Used for UI animations, etc.
        float delta = Time.unscaledDeltaTime;
    }
}
```

---

## 4. Vector3, Vector2 - Vector Operations

Vector3 and Vector2 represent position, direction, and magnitude in 3D/2D space.

### Vector3 Basic Usage

```csharp
using UnityEngine;

public class VectorExample : MonoBehaviour
{
    void Start()
    {
        // Create Vector3
        Vector3 position = new Vector3(1, 2, 3);
        Vector3 direction = new Vector3(0, 1, 0);
        
        // Predefined vectors
        Vector3 forward = Vector3.forward;  // (0, 0, 1)
        Vector3 up = Vector3.up;            // (0, 1, 0)
        Vector3 right = Vector3.right;      // (1, 0, 0)
        Vector3 zero = Vector3.zero;       // (0, 0, 0)
        Vector3 one = Vector3.one;         // (1, 1, 1)
    }
}
```

### Vector Operations

```csharp
using UnityEngine;

public class VectorOperations : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(1, 2, 3);
        Vector3 b = new Vector3(4, 5, 6);
        
        // Addition
        Vector3 sum = a + b;  // (5, 7, 9)
        
        // Subtraction
        Vector3 diff = b - a;  // (3, 3, 3)
        
        // Scalar multiplication
        Vector3 scaled = a * 2;  // (2, 4, 6)
        
        // Dot product
        float dot = Vector3.Dot(a, b);
        
        // Cross product
        Vector3 cross = Vector3.Cross(a, b);
        
        // Distance
        float distance = Vector3.Distance(a, b);
        
        // Normalize (unit vector)
        Vector3 normalized = a.normalized;
        
        // Magnitude (length)
        float magnitude = a.magnitude;
    }
}
```

### Vector3.Lerp() - Linear Interpolation

```csharp
using UnityEngine;

public class LerpExample : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // Smoothly move from current position to target position
        // t value: 0 (start) ~ 1 (end)
        float t = Time.deltaTime * 2f;  // Movement speed
        transform.position = Vector3.Lerp(transform.position, target.position, t);
    }
}
```

### Vector3.Slerp() - Spherical Linear Interpolation

```csharp
using UnityEngine;

public class SlerpExample : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // Spherical linear interpolation (useful for rotation)
        float t = Time.deltaTime * 2f;
        transform.position = Vector3.Slerp(transform.position, target.position, t);
    }
}
```

---

## 5. GameObject Class - Game Object Management

The GameObject class creates, finds, and manages game objects.

### GameObject.Find() - Find by Name

```csharp
using UnityEngine;

public class FindObject : MonoBehaviour
{
    void Start()
    {
        // Find game object by name
        GameObject player = GameObject.Find("Player");
        
        if (player != null)
        {
            Debug.Log("Found player!");
        }
    }
}
```

**Note:**
- Cannot find inactive objects
- May be slow (use other methods if possible)

### GameObject.FindWithTag() - Find by Tag

```csharp
using UnityEngine;

public class FindByTag : MonoBehaviour
{
    void Start()
    {
        // Find game object by tag
        GameObject player = GameObject.FindWithTag("Player");
        
        // Find all objects with same tag
        GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
    }
}
```

### GameObject.FindObjectOfType() - Find by Type

```csharp
using UnityEngine;

public class FindByType : MonoBehaviour
{
    void Start()
    {
        // Find object with specific component
        PlayerController player = FindObjectOfType<PlayerController>();
        
        // Find all objects
        Enemy[] allEnemies = FindObjectsOfType<Enemy>();
    }
}
```

### GetComponent() - Get Component

```csharp
using UnityEngine;

public class GetComponentExample : MonoBehaviour
{
    void Start()
    {
        // Get component from same game object
        Rigidbody rb = GetComponent<Rigidbody>();
        
        // Get component from different game object
        GameObject player = GameObject.Find("Player");
        if (player != null)
        {
            PlayerController controller = player.GetComponent<PlayerController>();
        }
    }
}
```

### SetActive() - Activate/Deactivate

```csharp
using UnityEngine;

public class ActivateObject : MonoBehaviour
{
    public GameObject target;
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Activate
            target.SetActive(true);
        }
        
        if (Input.GetKeyDown(KeyCode.H))
        {
            // Deactivate
            target.SetActive(false);
        }
    }
}
```

---

## 6. Mathf Class - Math Functions

The Mathf class provides utility functions for mathematical operations.

### Mathf.Abs() - Absolute Value

```csharp
using UnityEngine;

public class MathExample : MonoBehaviour
{
    void Start()
    {
        float value = -5.5f;
        float abs = Mathf.Abs(value);  // 5.5
    }
}
```

### Mathf.Clamp() - Clamp Value

```csharp
using UnityEngine;

public class ClampExample : MonoBehaviour
{
    public float health = 100f;
    
    void Update()
    {
        // Clamp health between 0~100
        health = Mathf.Clamp(health, 0f, 100f);
        
        // Or
        health = Mathf.Clamp01(health);  // Clamp between 0~1
    }
}
```

### Mathf.Lerp() - Linear Interpolation

```csharp
using UnityEngine;

public class LerpMath : MonoBehaviour
{
    public float startValue = 0f;
    public float endValue = 10f;
    
    void Update()
    {
        // Smoothly interpolate from 0 to 10
        float t = Time.time % 1f;  // Repeat between 0~1
        float value = Mathf.Lerp(startValue, endValue, t);
    }
}
```

### Mathf.MoveTowards() - Move Towards Target

```csharp
using UnityEngine;

public class MoveTowards : MonoBehaviour
{
    public float current = 0f;
    public float target = 10f;
    public float speed = 2f;
    
    void Update()
    {
        // Move towards target at constant speed
        current = Mathf.MoveTowards(current, target, speed * Time.deltaTime);
    }
}
```

### Other Useful Mathf Functions

```csharp
using UnityEngine;

public class MoreMath : MonoBehaviour
{
    void Start()
    {
        // Minimum
        float min = Mathf.Min(5, 10, 3);  // 3
        
        // Maximum
        float max = Mathf.Max(5, 10, 3);  // 10
        
        // Round
        float rounded = Mathf.Round(5.7f);  // 6
        
        // Floor
        float floor = Mathf.Floor(5.7f);  // 5
        
        // Ceil
        float ceil = Mathf.Ceil(5.2f);  // 6
        
        // Square root
        float sqrt = Mathf.Sqrt(16f);  // 4
        
        // Power
        float power = Mathf.Pow(2f, 3f);  // 8
        
        // Sine, Cosine
        float sin = Mathf.Sin(90f * Mathf.Deg2Rad);
        float cos = Mathf.Cos(90f * Mathf.Deg2Rad);
    }
}
```

---

## 7. Quaternion Class - Rotation Representation

Quaternion is a class that represents 3D rotation.

### Quaternion.Euler() - Convert Euler Angles

```csharp
using UnityEngine;

public class QuaternionExample : MonoBehaviour
{
    void Update()
    {
        // Convert Euler angles (degrees) to Quaternion
        Quaternion rotation = Quaternion.Euler(0, 90, 0);
        transform.rotation = rotation;
        
        // Or directly
        transform.rotation = Quaternion.Euler(0, 90, 0);
    }
}
```

### Quaternion.Lerp() - Rotation Interpolation

```csharp
using UnityEngine;

public class RotateLerp : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // Smoothly interpolate from current rotation to target rotation
        float t = Time.deltaTime * 2f;
        transform.rotation = Quaternion.Lerp(
            transform.rotation, 
            target.rotation, 
            t
        );
    }
}
```

### Quaternion.Slerp() - Spherical Linear Interpolation

```csharp
using UnityEngine;

public class RotateSlerp : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // Spherical linear interpolation (more natural for rotation)
        float t = Time.deltaTime * 2f;
        transform.rotation = Quaternion.Slerp(
            transform.rotation, 
            target.rotation, 
            t
        );
    }
}
```

---

## 8. Debug Class - Debugging

The Debug class outputs messages to the console and helps with debugging.

### Debug.Log() - Output Message

```csharp
using UnityEngine;

public class DebugExample : MonoBehaviour
{
    void Start()
    {
        // Normal message
        Debug.Log("Game started!");
        
        // Output variable value
        int score = 100;
        Debug.Log($"Score: {score}");
        
        // Warning message
        Debug.LogWarning("This is a warning message!");
        
        // Error message
        Debug.LogError("An error occurred!");
    }
}
```

---

## Practical Examples

### Example 1: Player Movement with Keyboard

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float moveSpeed = 5f;
    
    void Update()
    {
        // Get input
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // Calculate movement direction
        Vector3 direction = new Vector3(horizontal, 0, vertical);
        
        // Apply movement
        transform.Translate(direction * moveSpeed * Time.deltaTime);
    }
}
```

### Example 2: Rotate Object with Mouse

```csharp
using UnityEngine;

public class MouseRotate : MonoBehaviour
{
    public float rotateSpeed = 100f;
    
    void Update()
    {
        // Mouse X-axis input
        float mouseX = Input.GetAxis("Mouse X");
        
        // Rotate around Y-axis
        transform.Rotate(0, mouseX * rotateSpeed * Time.deltaTime, 0);
    }
}
```

### Example 3: Smooth Camera Follow

```csharp
using UnityEngine;

public class SmoothFollow : MonoBehaviour
{
    public Transform target;
    public float smoothSpeed = 0.125f;
    public Vector3 offset = new Vector3(0, 5, -10);
    
    void LateUpdate()
    {
        // Calculate target position
        Vector3 desiredPosition = target.position + offset;
        
        // Smoothly move
        Vector3 smoothedPosition = Vector3.Lerp(
            transform.position, 
            desiredPosition, 
            smoothSpeed
        );
        
        transform.position = smoothedPosition;
        
        // Look at target
        transform.LookAt(target);
    }
}
```

### Example 4: Health System

```csharp
using UnityEngine;

public class HealthSystem : MonoBehaviour
{
    public float maxHealth = 100f;
    private float currentHealth;
    
    void Start()
    {
        currentHealth = maxHealth;
    }
    
    void Update()
    {
        // Take damage (for testing)
        if (Input.GetKeyDown(KeyCode.Space))
        {
            TakeDamage(10f);
        }
        
        // Heal
        if (Input.GetKeyDown(KeyCode.H))
        {
            Heal(5f);
        }
    }
    
    void TakeDamage(float damage)
    {
        currentHealth -= damage;
        currentHealth = Mathf.Clamp(currentHealth, 0f, maxHealth);
        
        Debug.Log($"Health: {currentHealth}/{maxHealth}");
        
        if (currentHealth <= 0)
        {
            Die();
        }
    }
    
    void Heal(float amount)
    {
        currentHealth += amount;
        currentHealth = Mathf.Clamp(currentHealth, 0f, maxHealth);
    }
    
    void Die()
    {
        Debug.Log("Died!");
        gameObject.SetActive(false);
    }
}
```

---

## Notes

1. **Use Time.deltaTime**: Must multiply by `Time.deltaTime` for continuous actions like movement and rotation
2. **Find() Performance**: `GameObject.Find()` can be slow, use other methods if possible
3. **GetComponent() Caching**: Don't call `GetComponent()` every frame, store in a variable
4. **Coordinate System Distinction**: Understand the difference between `position` and `localPosition`, `rotation` and `localRotation`
5. **Use Quaternion**: Prefer Quaternion over Euler angles for rotation

---

## Summary

- **Input**: Handle user input (keyboard, mouse)
- **Transform**: Manage object position, rotation, scale
- **Time**: Time management and frame independence
- **Vector3/Vector2**: Vector operations and spatial calculations
- **GameObject**: Find and manage objects
- **Mathf**: Math operation utilities
- **Quaternion**: Rotation representation and interpolation
- **Debug**: Debug message output

Using these functions well will make Unity game development much easier!

