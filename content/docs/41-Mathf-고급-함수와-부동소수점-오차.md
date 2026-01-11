---
title: Mathf 고급 함수와 부동소수점 오차
titleEn: Advanced Mathf Functions and Floating Point Errors
slugEn: 41-advanced-mathf-functions-and-floating-point-errors
description: Unity의 Mathf 클래스 고급 함수들과 부동소수점 오차를 처리하는 방법을 학습합니다. Mathf.Clamp, Mathf.Clamp01, Mathf.Approximately 등을 다룹니다.
descriptionEn: Learn advanced Mathf class functions in Unity and how to handle floating point errors. Covers Mathf.Clamp, Mathf.Clamp01, Mathf.Approximately, and more.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 41
---

# 41. Mathf 고급 함수와 부동소수점 오차

## 개요

Unity의 Mathf 클래스는 수학 연산을 위한 다양한 함수를 제공합니다. 특히 값 제한, 부동소수점 비교 등 게임 개발에서 자주 사용하는 함수들을 포함합니다.

## 부동소수점 오차란?

부동소수점(float)은 정확한 값을 표현하지 못하고 근사치를 사용합니다. 따라서 연산 결과가 예상과 다를 수 있습니다.

### 부동소수점 오차 예제

```csharp
float a = 0.1f + 0.2f;
Debug.Log(a);  // 0.30000001 (정확히 0.3이 아님!)

float b = 1.0f - 0.9f;
Debug.Log(b);  // 0.09999999 (정확히 0.1이 아님!)
```

---

## 1. Mathf.Clamp() - 값 제한

`Mathf.Clamp()`는 값을 지정된 범위 내로 제한합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // 플레이어의 X 위치를 -8과 8 사이로 제한
        float clampedX = Mathf.Clamp(transform.position.x, -8f, 8f);
        transform.position = new Vector3(clampedX, transform.position.y, transform.position.z);
    }
}
```

### 간단한 사용법

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // 한 줄로 위치 제한
        transform.position = new Vector3(
            Mathf.Clamp(transform.position.x, -8f, 8f), 
            transform.position.y, 
            transform.position.z
        );
    }
}
```

### HP 제한 예제

```csharp
using UnityEngine;

public class HealthSystem : MonoBehaviour
{
    public float health = 100f;
    public float maxHealth = 100f;
    
    void Update()
    {
        // HP를 0과 maxHealth 사이로 제한
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

## 2. Mathf.Clamp01() - 0~1 범위 제한

`Mathf.Clamp01()`는 값을 0과 1 사이로 제한합니다. UI fillAmount 등에 유용합니다.

### 기본 사용법

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        // HP 감소
        hpGauge.fillAmount -= 0.2f;
        
        // 0과 1 사이로 제한 (fillAmount는 0~1 사이 값)
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
    }
}
```

### 부동소수점 오차 처리

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        // 부동소수점 오차 방지: 매우 작은 값(0.001 이하)을 0으로 처리
        if (hpGauge.fillAmount < 0.001f)
        {
            hpGauge.fillAmount = 0f;
        }
        
        // 0과 1 사이로 제한
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
    }
}
```

### Clamp01 vs Clamp 비교

```csharp
float value = 1.5f;

// Clamp01: 0~1 사이로 제한
float clamped01 = Mathf.Clamp01(value);  // 1.0

// Clamp: 지정된 범위로 제한
float clamped = Mathf.Clamp(value, 0f, 1f);  // 1.0 (동일한 결과)
```

---

## 3. Mathf.Approximately() - 부동소수점 비교

`Mathf.Approximately()`는 부동소수점 오차를 고려하여 두 값을 비교합니다.

### 문제 상황

```csharp
// ❌ 문제: 정확한 비교는 부동소수점 오차로 인해 실패할 수 있음
float a = 0.1f + 0.2f;  // 0.30000001
if (a == 0.3f)  // false! (예상과 다름)
{
    Debug.Log("같음");
}
```

### 해결 방법

```csharp
// ✅ 해결: Mathf.Approximately() 사용
float a = 0.1f + 0.2f;  // 0.30000001
if (Mathf.Approximately(a, 0.3f))  // true (오차를 고려)
{
    Debug.Log("같음");
}
```

### 실제 사용 예제

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        // 부동소수점 오차를 고려한 비교
        if (hpGauge.fillAmount <= 0f || Mathf.Approximately(hpGauge.fillAmount, 0f))
        {
            // HP가 0이거나 거의 0인 경우 게임 오버
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

## 4. 부동소수점 오차 처리 패턴

### 패턴 1: 작은 값 처리

```csharp
// 매우 작은 값을 0으로 처리
if (hpGauge.fillAmount < 0.001f)
{
    hpGauge.fillAmount = 0f;
}
```

### 패턴 2: Approximately 사용

```csharp
// 부동소수점 오차를 고려한 비교
if (Mathf.Approximately(value, targetValue))
{
    // 값이 거의 같음
}
```

### 패턴 3: 범위 체크

```csharp
// 범위 내에 있는지 확인
float epsilon = 0.001f;
if (Mathf.Abs(value - targetValue) < epsilon)
{
    // 값이 거의 같음
}
```

---

## 5. 다른 Mathf 고급 함수들

### Mathf.Abs() - 절댓값

```csharp
float value = -5.5f;
float abs = Mathf.Abs(value);  // 5.5
```

### Mathf.Max() / Mathf.Min() - 최댓값/최솟값

```csharp
float max = Mathf.Max(10f, 20f, 30f);  // 30
float min = Mathf.Min(10f, 20f, 30f);  // 10
```

### Mathf.Lerp() - 선형 보간

```csharp
// a와 b 사이를 t 비율로 보간 (0~1)
float result = Mathf.Lerp(0f, 10f, 0.5f);  // 5.0
```

### Mathf.SmoothStep() - 부드러운 보간

```csharp
// Lerp보다 부드러운 보간
float result = Mathf.SmoothStep(0f, 10f, 0.5f);
```

---

## 6. 실제 사용 예제

### 예제 1: 화면 경계 제한

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        Move();
        
        // 화면 경계 제한
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

### 예제 2: HP 시스템

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Image hpGauge;
    
    public void DecreaseHp()
    {
        // HP 감소
        hpGauge.fillAmount -= 0.2f;
        
        // 부동소수점 오차 방지
        if (hpGauge.fillAmount < 0.001f)
        {
            hpGauge.fillAmount = 0f;
        }
        
        // 0과 1 사이로 제한
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
        
        // 게임 오버 체크 (부동소수점 오차 고려)
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

## 7. 정리

### 주요 Mathf 함수

| 함수 | 용도 | 예제 |
|------|------|------|
| `Mathf.Clamp(value, min, max)` | 값 범위 제한 | `Clamp(health, 0, 100)` |
| `Mathf.Clamp01(value)` | 0~1 범위 제한 | `Clamp01(fillAmount)` |
| `Mathf.Approximately(a, b)` | 부동소수점 비교 | `Approximately(a, 0.3f)` |
| `Mathf.Abs(value)` | 절댓값 | `Abs(-5.5f)` = 5.5 |
| `Mathf.Max(a, b)` | 최댓값 | `Max(10, 20)` = 20 |
| `Mathf.Min(a, b)` | 최솟값 | `Min(10, 20)` = 10 |

### 부동소수점 오차 처리

1. **작은 값 처리**: `if (value < 0.001f) value = 0f;`
2. **Approximately 사용**: `Mathf.Approximately(a, b)`
3. **범위 체크**: `Mathf.Abs(a - b) < epsilon`

### 베스트 프랙티스

1. **Clamp 사용**: 값이 범위를 벗어나지 않도록 제한
2. **Approximately 사용**: 부동소수점 비교 시 사용
3. **오차 처리**: 작은 값은 명시적으로 0으로 처리
4. **Clamp01 활용**: UI fillAmount 등에 유용

---

## 연습 문제

1. 플레이어의 위치를 화면 경계(-10, 10) 내로 제한하는 코드를 작성하세요.

2. HP가 0 이하로 내려가지 않도록 Mathf.Clamp를 사용하는 코드를 작성하세요.

3. 두 float 값이 거의 같은지 비교하는 함수를 Mathf.Approximately를 사용하여 작성하세요.

4. fillAmount가 0에 가까울 때 게임 오버를 처리하는 코드를 작성하세요.
