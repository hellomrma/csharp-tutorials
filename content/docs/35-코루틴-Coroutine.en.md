---
title: Coroutines
titleEn: Coroutines
slugEn: 35-coroutines
description: Learn how to implement delayed execution using coroutines in Unity. Covers IEnumerator, StartCoroutine, WaitForSeconds, and more.
descriptionEn: Learn how to implement delayed execution using coroutines in Unity. Covers IEnumerator, StartCoroutine, WaitForSeconds, and more.
category: Unity C# Application
categoryEn: Unity C# Application
order: 35
---

# 35. Coroutines

## What are Coroutines?

Coroutines allow functions to pause and resume execution later. They are used for performing multiple tasks with delays, or executing after a certain wait time.

## Basic Concepts

- **IEnumerator**: Return type of coroutine functions
- **StartCoroutine()**: Function to start a coroutine
- **yield**: Keyword to pause a coroutine
- **WaitForSeconds**: Wait for specified time

---

## 1. Basic Coroutine Structure

### Creating Coroutine Function

```csharp
using UnityEngine;
using System.Collections;

public class Example : MonoBehaviour
{
    void Start()
    {
        // Start coroutine
        StartCoroutine(MyCoroutine());
    }

    // Coroutine function (return type: IEnumerator)
    IEnumerator MyCoroutine()
    {
        Debug.Log("Coroutine started!");
        
        // Wait 2 seconds
        yield return new WaitForSeconds(2f);
        
        Debug.Log("Executed after 2 seconds!");
    }
}
```

### Coroutine Features

- **Pausable**: Can pause execution with `yield`
- **Resumable**: Unity automatically resumes execution
- **Independent of Update()**: Works separately from Update()

---

## 2. WaitForSeconds - Wait for Time

`WaitForSeconds` waits for a specified time (in seconds).

### Basic Usage

```csharp
using UnityEngine;
using System.Collections;

public class FireballSpawner : MonoBehaviour
{
    public GameObject fireballPrefab;

    void Start()
    {
        // Start coroutine
        StartCoroutine(SpawnFireballs());
    }

    IEnumerator SpawnFireballs()
    {
        for (int i = 0; i < 10; i++)
        {
            // Create fireball
            Instantiate(fireballPrefab);
            
            // Wait 1 second
            yield return new WaitForSeconds(1f);
        }
    }
}
```

### Wait for Random Time

```csharp
using UnityEngine;
using System.Collections;

public class FireballSpawner : MonoBehaviour
{
    public GameObject fireballPrefab;
    public float spawnDelayMin = 0.5f;
    public float spawnDelayMax = 2f;

    void Start()
    {
        StartCoroutine(SpawnFireballsWithDelay());
    }

    IEnumerator SpawnFireballsWithDelay()
    {
        for (int i = 0; i < 10; i++)
        {
            // Create fireball
            Instantiate(fireballPrefab);
            
            // Wait if not last fireball
            if (i < 9)
            {
                // Wait random time (0.5 to 2 seconds)
                float delay = Random.Range(spawnDelayMin, spawnDelayMax);
                yield return new WaitForSeconds(delay);
            }
        }
    }
}
```

---

## 3. WaitForSecondsRealtime - Wait for Real Time

`WaitForSecondsRealtime` waits for real time, unaffected by `Time.timeScale`.

### Difference from Time.timeScale

```csharp
using UnityEngine;
using System.Collections;

public class Example : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(TestCoroutine());
    }

    IEnumerator TestCoroutine()
    {
        Debug.Log("Start!");
        
        // Affected by Time.timeScale (waits when game is paused)
        yield return new WaitForSeconds(2f);
        Debug.Log("WaitForSeconds complete!");
        
        // Not affected by Time.timeScale (waits even when game is paused)
        yield return new WaitForSecondsRealtime(2f);
        Debug.Log("WaitForSecondsRealtime complete!");
    }
}
```

### Practical Example

```csharp
using UnityEngine;
using System.Collections;

public class FireballSpawner : MonoBehaviour
{
    public GameObject fireballPrefab;
    public float spawnDelayMin = 0.5f;
    public float spawnDelayMax = 2f;

    IEnumerator SpawnFireballsWithDelay()
    {
        for (int i = 0; i < 10; i++)
        {
            Instantiate(fireballPrefab);
            
            if (i < 9)
            {
                // Wait for real time even if game is paused
                float delay = Random.Range(spawnDelayMin, spawnDelayMax);
                yield return new WaitForSecondsRealtime(delay);
            }
        }
    }
}
```

---

## 4. WaitForEndOfFrame - Wait for Frame End

`WaitForEndOfFrame` waits until the current frame is completely finished.

### Usage Example

```csharp
using UnityEngine;
using System.Collections;

public class Screenshot : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            StartCoroutine(TakeScreenshot());
        }
    }

    IEnumerator TakeScreenshot()
    {
        // Wait until current frame is completely rendered
        yield return new WaitForEndOfFrame();
        
        // Take screenshot
        ScreenCapture.CaptureScreenshot("screenshot.png");
        Debug.Log("Screenshot saved!");
    }
}
```

---

## 5. Stopping Coroutines

### StopCoroutine() - Stop Specific Coroutine

```csharp
using UnityEngine;
using System.Collections;

public class Example : MonoBehaviour
{
    Coroutine myCoroutine;

    void Start()
    {
        // Start coroutine and save reference
        myCoroutine = StartCoroutine(MyCoroutine());
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Stop coroutine
            if (myCoroutine != null)
            {
                StopCoroutine(myCoroutine);
            }
        }
    }

    IEnumerator MyCoroutine()
    {
        while (true)
        {
            Debug.Log("Running...");
            yield return new WaitForSeconds(1f);
        }
    }
}
```

### StopAllCoroutines() - Stop All Coroutines

```csharp
void OnDestroy()
{
    // Stop all coroutines on this object
    StopAllCoroutines();
}
```

---

## 6. Practical Examples

### Example 1: Delayed Fireball Spawning

```csharp
using UnityEngine;
using System.Collections;

public class FireballSpawner : MonoBehaviour
{
    public GameObject fireballPrefab;
    public int fireballCount = 10;
    public float spawnDelayMin = 0.5f;
    public float spawnDelayMax = 2f;

    void Start()
    {
        StartCoroutine(SpawnFireballsWithDelay());
    }

    IEnumerator SpawnFireballsWithDelay()
    {
        // Don't spawn if fireballs already exist
        if (spawnedFireballs.Count > 0)
        {
            yield break; // End coroutine
        }

        // Spawn specified number of fireballs
        for (int i = 0; i < fireballCount; i++)
        {
            // Spawn one fireball
            SpawnSingleFireball();

            // Wait random time if not last fireball
            if (i < fireballCount - 1)
            {
                float delay = Random.Range(spawnDelayMin, spawnDelayMax);
                yield return new WaitForSecondsRealtime(delay);
            }
        }
    }

    void SpawnSingleFireball()
    {
        Vector3 spawnPosition = GetRandomSpawnPosition();
        GameObject fireball = Instantiate(fireballPrefab, spawnPosition, Quaternion.identity);
        fireball.SetActive(true);
    }

    Vector3 GetRandomSpawnPosition()
    {
        float randomX = Random.Range(-5f, 5f);
        return new Vector3(randomX, 8f, 0);
    }
}
```

### Example 2: Fade In/Out

```csharp
using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class FadeEffect : MonoBehaviour
{
    public Image fadeImage;
    public float fadeDuration = 1f;

    void Start()
    {
        StartCoroutine(FadeIn());
    }

    // Fade in (gradually brighten from black screen)
    IEnumerator FadeIn()
    {
        float elapsed = 0f;
        Color color = fadeImage.color;

        while (elapsed < fadeDuration)
        {
            elapsed += Time.deltaTime;
            color.a = 1f - (elapsed / fadeDuration);
            fadeImage.color = color;
            yield return null; // Wait until next frame
        }

        color.a = 0f;
        fadeImage.color = color;
    }

    // Fade out (gradually darken from bright screen)
    IEnumerator FadeOut()
    {
        float elapsed = 0f;
        Color color = fadeImage.color;

        while (elapsed < fadeDuration)
        {
            elapsed += Time.deltaTime;
            color.a = elapsed / fadeDuration;
            fadeImage.color = color;
            yield return null;
        }

        color.a = 1f;
        fadeImage.color = color;
    }
}
```

### Example 3: Repeating Execution

```csharp
using UnityEngine;
using System.Collections;

public class RepeatingAction : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(RepeatEverySecond());
    }

    IEnumerator RepeatEverySecond()
    {
        while (true)
        {
            Debug.Log("Execute every second!");
            
            // Wait 1 second
            yield return new WaitForSeconds(1f);
        }
    }
}
```

---

## 7. yield return null

`yield return null` waits until the next frame.

### Usage Example

```csharp
using UnityEngine;
using System.Collections;

public class SmoothMovement : MonoBehaviour
{
    public Vector3 targetPosition;
    public float speed = 2f;

    void Start()
    {
        StartCoroutine(MoveToTarget());
    }

    IEnumerator MoveToTarget()
    {
        while (Vector3.Distance(transform.position, targetPosition) > 0.1f)
        {
            // Move a little each frame
            transform.position = Vector3.MoveTowards(
                transform.position, 
                targetPosition, 
                speed * Time.deltaTime
            );
            
            // Wait until next frame
            yield return null;
        }
    }
}
```

---

## 8. Precautions

### 1. MonoBehaviour Required

```csharp
// ✅ Coroutines can only be used in classes that inherit MonoBehaviour
public class Example : MonoBehaviour
{
    IEnumerator MyCoroutine() { }
}

// ❌ Cannot use in regular classes
public class Example
{
    IEnumerator MyCoroutine() { } // Error!
}
```

### 2. StartCoroutine() Required

```csharp
// ✅ Correct way
StartCoroutine(MyCoroutine());

// ❌ Wrong way (coroutine won't run)
MyCoroutine();
```

### 3. Auto-Stop on Object Destruction

```csharp
// Coroutines automatically stop when GameObject is destroyed
void OnDestroy()
{
    // Can also stop explicitly
    StopAllCoroutines();
}
```

### 4. Nested Coroutines

```csharp
IEnumerator OuterCoroutine()
{
    Debug.Log("Outer coroutine started");
    
    // Start inner coroutine (wait until complete)
    yield return StartCoroutine(InnerCoroutine());
    
    Debug.Log("Executed after inner coroutine complete");
}

IEnumerator InnerCoroutine()
{
    yield return new WaitForSeconds(2f);
    Debug.Log("Inner coroutine complete");
}
```

---

## 9. Summary

### Coroutines vs Regular Functions

| Feature | Regular Function | Coroutine |
|---------|------------------|-----------|
| Execution | Executes immediately | Can pause and resume |
| Time Control | Not possible | Possible (using yield) |
| Return Type | void, int, etc. | IEnumerator |

### Main yield Types

- `yield return new WaitForSeconds(time)`: Wait for specified time
- `yield return new WaitForSecondsRealtime(time)`: Wait for real time
- `yield return new WaitForEndOfFrame()`: Wait for frame end
- `yield return null`: Wait until next frame

### Best Practices

1. **Use StartCoroutine()**: Coroutines must be started with StartCoroutine()
2. **Use appropriate yield**: Choose yield type according to usage
3. **Handle stopping**: Stop with StopCoroutine() when needed
4. **Consider performance**: Too many coroutines can cause performance issues

---

## Practice Problems

1. Write a coroutine that prints "Hello" every second.

2. Write a coroutine that prints "3 seconds elapsed!" 3 seconds after the player presses spacebar.

3. Write a coroutine that gradually fades an object by setting alpha to 0.
