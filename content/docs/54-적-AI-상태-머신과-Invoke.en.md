---
title: "Enemy AI – State Machine and Invoke"
titleEn: "Enemy AI – State Machine and Invoke"
category: "Practice"
categoryEn: "Practice"
order: 54
description: "Implement enemy AI with an enum-based state machine. Detect nearby raptors with OverlapSphere, chase them with MoveTowards, and prevent duplicate targeting with Invoke"
descriptionEn: "Implement enemy AI with an enum-based state machine. Detect nearby raptors with OverlapSphere, chase them with MoveTowards, and prevent duplicate targeting with Invoke"
slugEn: "54-enemy-ai-state-machine-invoke"
tags: ["State Machine", "Invoke", "Vector3.MoveTowards", "Vector3.Distance", "OverlapSphere", "Animator", "Raptor"]
---

# 54. Enemy AI – State Machine and Invoke

The math runner game places enemy raptors on the map. An enemy stands still at first (`Idle`), then detects a nearby player raptor and sprints after it (`Run`). This behavior is implemented with an **enum-based state machine**. `Invoke` prevents multiple enemies from targeting the same raptor simultaneously, and `Vector3.MoveTowards` produces smooth pursuit movement.

---

## Game Structure

| Script | Role |
|--------|------|
| `Raptor` | Player raptor – tracks whether it has been targeted |
| `Enermy` | Enemy AI – detect / chase / capture state machine |
| `EnermyRaptors` | Enemy group spawner – places enemies in a Fibonacci spiral |

---

## Raptor – Targeting Management

```csharp
using UnityEngine;

public class Raptor : MonoBehaviour
{
    private bool isTarget;  // already targeted by an enemy?

    public void SetTarget()
    {
        isTarget = true;
    }

    public bool IsTarget()
    {
        return isTarget;
    }
}
```

`Raptor` is a simple data class. The single `isTarget` flag records whether another enemy is already chasing this raptor, preventing duplicate targeting.

---

## Enermy – Full Code

```csharp
using UnityEngine;

public class Enermy : MonoBehaviour
{
    enum State { Idle, Run }

    public float moveSpeed;
    public float detectRadius;
    private State state;
    private Transform targetRaptor;
    [SerializeField] private bool isTargetOn;

    void Start()
    {
        GetComponent<Animator>().speed = 0f;  // start with idle animation paused
    }

    void Update()
    {
        SetState();
    }

    private void SetState()
    {
        switch (state)
        {
            case State.Idle: DetectDino(); break;
            case State.Run:  GoToDino();   break;
        }
    }

    private void DetectDino()
    {
        if (isTargetOn) return;  // already reserved a target

        Collider[] hitColliders = Physics.OverlapSphere(transform.position, detectRadius);
        foreach (Collider col in hitColliders)
        {
            Raptor raptor = col.GetComponent<Raptor>();
            if (raptor != null && !raptor.IsTarget())
            {
                Invoke("SetTargetDino", 0.1f);   // confirm target after 0.1 s
                targetRaptor = raptor.transform;
                break;
            }
        }
    }

    private void SetTargetDino()
    {
        if (targetRaptor != null && !targetRaptor.GetComponent<Raptor>().IsTarget())
        {
            targetRaptor.GetComponent<Raptor>().SetTarget();
            isTargetOn = true;
            StartGotoDino();
        }
    }

    private void StartGotoDino()
    {
        state = State.Run;
        GetComponent<Animator>().speed = 1f;  // start run animation
    }

    private void GoToDino()
    {
        if (targetRaptor == null) return;

        transform.position = Vector3.MoveTowards(
            transform.position,
            targetRaptor.position,
            moveSpeed * Time.deltaTime
        );

        if (Vector3.Distance(transform.position, targetRaptor.position) < 0.1f)
        {
            SoundManager.instance.DinoDieSoundPlay();
            Destroy(targetRaptor.gameObject);  // remove raptor
            Destroy(this.gameObject);          // remove enemy too
        }
    }
}
```

---

## EnermyRaptors – Enemy Group Spawner

```csharp
using UnityEngine;

public class EnermyRaptors : MonoBehaviour
{
    public GameObject enermyRaptorPrefab;
    public int enermyRaptorNumber;
    public Transform enermyRaptorsParent;
    public float initialRadius  = 0f;
    public float radiusGrowth   = 0.12f;
    public float angleIncrement = 137.5f;

    void Start()
    {
        CreateEnemyRaptors();
        this.gameObject.transform.GetChild(0).gameObject.SetActive(true);
    }

    private void CreateEnemyRaptors()
    {
        for (int i = 0; i < enermyRaptorNumber; i++)
        {
            float currentRadius = initialRadius + (radiusGrowth * i);
            float angle = i * angleIncrement;
            float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
            float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;

            GameObject enemyRaptor = Instantiate(
                enermyRaptorPrefab,
                enermyRaptorsParent
            );
            enemyRaptor.transform.localPosition = new Vector3(x, 0, z);
        }
    }
}
```

---

## Key Concept Explanations

### 1. Enum State Machine

```csharp
enum State { Idle, Run }

private State state;

private void SetState()
{
    switch (state)
    {
        case State.Idle: DetectDino(); break;
        case State.Run:  GoToDino();   break;
    }
}
```

A **state machine** ensures an object can only be in one state at a time and transitions between states based on conditions.

```
[Idle] → (raptor detected) → [Run] → (captured) → (destroyed)
```

- `Idle` state: calls `DetectDino()` every frame to scan for nearby raptors.
- `Run` state: calls `GoToDino()` every frame to move toward the target.
- State transition happens in `StartGotoDino()` by setting `state = State.Run`.

A `switch` statement is a natural fit for state machines — new states can be added as independent cases without tangling existing logic.

---

### 2. Invoke – Delayed Call

```csharp
Invoke("SetTargetDino", 0.1f);  // calls SetTargetDino() after 0.1 seconds
```

`Invoke(methodName, delay)` calls the named method once after the specified number of seconds.

**Why is the 0.1 s delay needed?**

Multiple enemies can detect the same raptor in the same frame. Without a delay:

```
Enemy A: detects Raptor1 → SetTarget() immediately → isTarget = true
Enemy B: detects Raptor1 (same frame) → reads IsTarget() = false (not yet updated) → duplicate!
```

With the 0.1 s delay, targeting is staggered:
```
Enemy A: schedules 0.1 s → SetTargetDino() → SetTarget()
Enemy B: DetectDino() sees isTargetOn = true → return (no duplicate)
```

- `isTargetOn`: prevents *this* enemy from scheduling more than one target reservation.
- `raptor.IsTarget()`: prevents another enemy from stealing a raptor already claimed.

---

### 3. Vector3.MoveTowards – Moving at a Constant Speed

```csharp
transform.position = Vector3.MoveTowards(
    transform.position,       // current position
    targetRaptor.position,    // destination
    moveSpeed * Time.deltaTime // max distance this frame
);
```

`Vector3.MoveTowards` returns the position moved from `current` toward `target` by at most `maxDistanceDelta`. It never overshoots — once the target is reached it returns the target position exactly.

Comparison with `Vector3.Lerp`:

| Approach | Speed | Characteristic |
|----------|-------|----------------|
| `MoveTowards` | Constant | Same speed all the way; no overshoot |
| `Lerp` | Decelerates | Fast at first, slows as it approaches |

`MoveTowards` is the better choice for a pursuit AI.

---

### 4. Vector3.Distance – Measuring Distance

```csharp
if (Vector3.Distance(transform.position, targetRaptor.position) < 0.1f)
{
    // capture successful
}
```

`Vector3.Distance(a, b)` returns the distance between two points. When it drops below 0.1 the enemy is "close enough" and the capture triggers.

For performance-critical code, `sqrMagnitude` avoids the square root:
```csharp
// Optimized: compare squares instead
if ((transform.position - targetRaptor.position).sqrMagnitude < 0.01f)
```

For a simple game like this, the readable `Vector3.Distance` is fine.

---

### 5. Animator.speed – Pausing and Resuming Animation

```csharp
GetComponent<Animator>().speed = 0f;  // freeze (Start)
GetComponent<Animator>().speed = 1f;  // resume (entering Run state)
```

Setting `Animator.speed` to 0 freezes the animation on the current frame. Restoring it to 1 resumes normal playback. This is useful when you want to pause only the animation without deactivating the entire GameObject.

---

### 6. Null Check – Safety After targetRaptor is Destroyed

```csharp
private void GoToDino()
{
    if (targetRaptor == null) return;  // already destroyed — bail out
    // …
}
```

If the target raptor was already destroyed by something else (another enemy, a subtraction door, etc.), `targetRaptor` becomes null in C#. Accessing any property on a null reference throws a `NullReferenceException`, so the null check is essential.

---

## Unity Scene Setup

| Item | Setting |
|------|---------|
| Enemy raptor prefab | Attach `Enermy` + `Animator` + `Collider` |
| `detectRadius` | Start around 2–3 |
| `moveSpeed` | 2–4 (slightly slower than the player) |
| `EnermyRaptors` | Place on map segments; assign parent Transform |
| Player raptor prefab | Attach `Raptor` component |
