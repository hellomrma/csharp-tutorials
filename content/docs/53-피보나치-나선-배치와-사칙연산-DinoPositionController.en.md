---
title: "Fibonacci Spiral Layout and Arithmetic Operations – DinoPositionController"
titleEn: "Fibonacci Spiral Layout and Arithmetic Operations – DinoPositionController"
category: "Practice"
categoryEn: "Practice"
order: 53
description: "Distribute raptors evenly using a Fibonacci spiral based on the golden angle (137.508°), and dynamically adjust the raptor count with arithmetic operations (add, subtract, multiply, divide) when passing through doors"
descriptionEn: "Distribute raptors evenly using a Fibonacci spiral based on the golden angle (137.508°), and dynamically adjust the raptor count with arithmetic operations (add, subtract, multiply, divide) when passing through doors"
slugEn: "53-fibonacci-spiral-arithmetic-operations-dinopositioncontroller"
tags: ["Fibonacci", "Golden Angle", "Instantiate", "Destroy", "childCount", "GetChild", "SetActive"]
---

# 53. Fibonacci Spiral Layout and Arithmetic Operations – DinoPositionController

Tutorial 50 arranged objects on a circle using trigonometry with equal angular spacing. This tutorial upgrades that to a **Fibonacci spiral** based on the **golden angle (137.508°)**. Like sunflower seeds, the spiral packs objects tightly without overlapping. Raptor counts also change dynamically through arithmetic operations as the player passes through doors.

---

## Equal Circle vs Fibonacci Spiral

A side-by-side code comparison of the two approaches:

```csharp
// ── Old approach: equal circular layout ─────────────────────────
// Divide 360° by the object count to get a uniform angle step
float angleStep = 360f / raptors.childCount;       // e.g. 4 objects → 90° each
float angle     = i * angleStep;                    // 0°, 90°, 180°, 270°
float x = Mathf.Cos(angle * Mathf.Deg2Rad) * radius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * radius;
// Result: evenly spaced on a single circle (all at the same radius)

// ── New approach: Fibonacci spiral ──────────────────────────────
// Accumulate the golden angle; radius grows with each index
float currentRadius = initialRadius + radiusGrowth * i; // spiral outward
float angle         = i * angleIncrement;               // rotate 137.508° each step
float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;
// Result: spiral with no overlaps (both angle and radius change)
```

| Comparison | Equal circle | Fibonacci spiral |
|------------|-------------|-----------------|
| Angle step | `360° / n` (uniform) | `137.508°` (fixed golden angle) |
| Radius | Fixed | Grows per index |
| Shape | Circle | Spiral |
| Overlap at high counts | Possible | Never |

---

## DinoPositionController – Full Code

```csharp
using UnityEngine;

public class DinoPositionController : MonoBehaviour
{
    public Transform raptors;
    public GameObject raptorPrefab;

    public int visibleRaptorNumber;
    public float initialRadius  = 0f;
    public float radiusGrowth   = 0.12f;
    public float angleIncrement = 137.508f;  // golden angle

    void Update()
    {
        if (!GameManager.instance.isGameStart) return;

        SetDinoPosition();

        if (raptors.childCount <= 0)
        {
            GameManager.instance.GameOver();
        }
    }

    public void SetDoorCalc(DoorType doorType, int doorNumber)
    {
        if      (doorType.Equals(DoorType.Plus))     PlusRaptor(doorNumber);
        else if (doorType.Equals(DoorType.Minus))    MinusRaptor(doorNumber);
        else if (doorType.Equals(DoorType.Times))    TimesRaptor(doorNumber);
        else if (doorType.Equals(DoorType.Division)) DivisionRaptor(doorNumber);

        SetDinoPosition();
    }

    private void PlusRaptor(int number)
    {
        for (int i = 0; i < number; i++)
            Instantiate(raptorPrefab, raptors);
    }

    private void MinusRaptor(int number)
    {
        if (number > raptors.childCount)
            number = raptors.childCount;

        int total = raptors.childCount;
        for (int i = total - 1; i >= total - number; i--)
            Destroy(raptors.GetChild(i).gameObject);
    }

    private void TimesRaptor(int number)
    {
        int current = raptors.childCount;
        int toAdd   = current * number - current;
        for (int i = 0; i < toAdd; i++)
            Instantiate(raptorPrefab, raptors);
    }

    private void DivisionRaptor(int number)
    {
        int current  = raptors.childCount;
        int toRemain = current / number;
        if (toRemain < 0) toRemain = 0;
        int toRemove = current - toRemain;

        for (int i = current - 1; i >= current - toRemove; i--)
            Destroy(raptors.GetChild(i).gameObject);
    }

    private void SetDinoPosition()
    {
        for (int i = 0; i < raptors.childCount; i++)
        {
            if (i > visibleRaptorNumber - 1)
            {
                raptors.GetChild(i).gameObject.SetActive(false);
                continue;
            }

            float currentRadius = initialRadius + radiusGrowth * i;
            float angle         = i * angleIncrement;
            float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
            float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;

            raptors.GetChild(i).localPosition = new Vector3(x, 0f, z);
            raptors.GetChild(i).gameObject.SetActive(true);
        }
    }
}
```

---

## Key Concept Explanations

### 1. The Golden Angle – 137.508°

The **golden angle** is derived from the golden ratio (φ ≈ 1.618):

```
Golden angle = 360° × (1 - 1/φ) ≈ 137.508°
```

Accumulating this angle guarantees no two objects ever land on the exact same direction. Sunflower seeds, pine cone scales, and many other natural patterns follow this rule.

```csharp
public float angleIncrement = 137.508f;

float angle = i * angleIncrement;  // 0°, 137.5°, 275°, 52.5°, 190°, …
```

Unlike "clean" angles such as 90° or 120°, 137.508° never produces periodic overlaps no matter how many objects are placed.

Position calculation:

```csharp
float currentRadius = initialRadius + radiusGrowth * i;
float angle         = i * angleIncrement;

float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;

raptors.GetChild(i).localPosition = new Vector3(x, 0f, z);
```

| i | currentRadius | angle | Description |
|---|--------------|-------|-------------|
| 0 | 0 (center) | 0° | First raptor at center |
| 1 | 0.12 | 137.5° | Spiral position 1 |
| 2 | 0.24 | 275° | Spiral position 2 |
| 3 | 0.36 | 52.5° | Spiral position 3 |

---

### 2. Instantiate(prefab, parent) – Creating with a Parent

```csharp
Instantiate(raptorPrefab, raptors);
```

Passing a `Transform` as the second argument makes the new object a child of that transform immediately. This means:
- `raptors.childCount` always reflects the current raptor count.
- `raptors.GetChild(i)` gives direct access to each raptor.

```csharp
// Parent only (spawns at local origin 0,0,0)
Instantiate(raptorPrefab, raptors);

// Position, rotation, and parent all specified
Instantiate(prefab, position, rotation, parent);
```

---

### 3. Arithmetic Operation Methods

#### Addition (Plus)

```csharp
private void PlusRaptor(int number)
{
    for (int i = 0; i < number; i++)
        Instantiate(raptorPrefab, raptors);
}
```

Passing through a `+3` door instantly spawns 3 more raptors.

#### Subtraction (Minus)

```csharp
private void MinusRaptor(int number)
{
    if (number > raptors.childCount)
        number = raptors.childCount;

    int total = raptors.childCount;
    for (int i = total - 1; i >= total - number; i--)
        Destroy(raptors.GetChild(i).gameObject);
}
```

**Removing in reverse order is important.** Removing from the front shifts indices and causes the wrong objects to be deleted.

```
Indices: 0  1  2  3  4   (5 raptors, pass through -2 door)
Remove 4 then 3 in reverse → 0, 1, 2 remain ✅

Remove 0 then 1 forward → index shifts during deletion ❌
```

#### Multiplication (Times)

```csharp
private void TimesRaptor(int number)
{
    int current = raptors.childCount;
    int toAdd   = current * number - current;
    for (int i = 0; i < toAdd; i++)
        Instantiate(raptorPrefab, raptors);
}
```

With 3 raptors passing through a `×3` door, the target is 9, so 6 are added:

```
toAdd = 3 × 3 - 3 = 6
```

#### Division (Division)

```csharp
private void DivisionRaptor(int number)
{
    int current  = raptors.childCount;
    int toRemain = current / number;   // integer division — truncates decimal
    int toRemove = current - toRemain;

    for (int i = current - 1; i >= current - toRemove; i--)
        Destroy(raptors.GetChild(i).gameObject);
}
```

C# integer division truncates automatically:

```csharp
9 / 3 = 3  // 3 raptors remain
7 / 3 = 2  // 2 raptors remain (2.33… → 2)
```

---

### 4. childCount and GetChild – Managing Child Objects

```csharp
raptors.childCount              // number of children (read-only)
raptors.GetChild(i)             // i-th child Transform
raptors.GetChild(i).gameObject  // i-th child GameObject
```

`Destroy`ing a child immediately decrements `childCount`. `SetActive(false)` hides a child but it remains counted in `childCount`.

---

### 5. visibleRaptorNumber – Capping the Displayed Count

```csharp
if (i > visibleRaptorNumber - 1)
{
    raptors.GetChild(i).gameObject.SetActive(false);
    continue;
}
```

Even with hundreds of raptors, only up to `visibleRaptorNumber` are shown. The rest exist in the scene but are deactivated and invisible. When displaying the raptor count in the UI, use `childCount` (the real total) rather than the visible count.

---

## Unity Scene Setup

| Item | Setting |
|------|---------|
| `raptors` | Transform of the empty parent GameObject holding raptors |
| `raptorPrefab` | 3D raptor prefab |
| `visibleRaptorNumber` | Start around 20–30 |
| `initialRadius` | 0 (start at center) |
| `radiusGrowth` | 0.12f (adjust in Inspector) |
| `angleIncrement` | 137.508 (golden angle — no need to change) |
