---
title: "피보나치 나선 배치와 사칙연산 - DinoPositionController"
titleEn: "Fibonacci Spiral Layout and Arithmetic Operations – DinoPositionController"
category: "실전"
categoryEn: "Practice"
order: 53
description: "황금각(137.508°)을 이용한 피보나치 나선 배치로 랩터를 고르게 분포시키고, 문 통과 시 사칙연산(덧셈·뺄셈·곱셈·나눗셈)으로 랩터 수를 동적으로 조절하는 방법을 학습합니다"
descriptionEn: "Distribute raptors evenly using a Fibonacci spiral based on the golden angle (137.508°), and dynamically adjust the raptor count with arithmetic operations (add, subtract, multiply, divide) when passing through doors"
slugEn: "53-fibonacci-spiral-arithmetic-operations-dinopositioncontroller"
tags: ["Fibonacci", "Golden Angle", "Instantiate", "Destroy", "childCount", "GetChild", "SetActive"]
---

# 53. 피보나치 나선 배치와 사칙연산 - DinoPositionController

튜토리얼 50에서 삼각함수로 오브젝트를 균등하게 원형 배치했습니다. 이번에는 **황금각(137.508°)** 을 이용한 피보나치 나선 배치로 업그레이드합니다. 피보나치 나선은 해바라기 씨앗 패턴처럼 오브젝트들이 서로 겹치지 않고 촘촘하게 배치됩니다. 또한 문을 통과할 때마다 사칙연산으로 랩터 수가 바뀝니다.

---

## 균등 원형 배치 vs 피보나치 나선 배치

이전 방식(균등 원형)과 새 방식(피보나치 나선)을 코드로 비교합니다:

```csharp
// ── 이전 방식: 균등 원형 배치 ──────────────────────────────
// 360도를 오브젝트 수로 나눠 균등한 각도 간격 사용
float angleStep = 360f / raptors.childCount;       // 예: 4마리 → 90도 간격
float angle     = i * angleStep;                    // 0°, 90°, 180°, 270°
float x = Mathf.Cos(angle * Mathf.Deg2Rad) * radius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * radius;
// 결과: 같은 원 위에 균등하게 배치 (모두 반지름 동일)

// ── 새 방식: 피보나치 나선 배치 ────────────────────────────
// 황금각을 누적 적용, 반지름은 인덱스에 따라 증가
float currentRadius = initialRadius + radiusGrowth * i; // 나선형으로 퍼져나감
float angle         = i * angleIncrement;               // 137.508° 씩 회전
float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;
// 결과: 나선형으로 겹치지 않게 분포 (반지름과 각도 모두 변화)
```

| 비교 항목 | 균등 원형 배치 | 피보나치 나선 배치 |
|----------|------------|----------------|
| 각도 간격 | `360° / n` (균등) | `137.508°` (황금각 고정) |
| 반지름 | 고정 | 인덱스마다 증가 |
| 모양 | 원 | 나선형 |
| 밀집도 | 수가 많으면 겹칠 수 있음 | 항상 서로 비켜남 |

---

## DinoPositionController - 전체 코드

```csharp
using UnityEngine;

public class DinoPositionController : MonoBehaviour
{
    public Transform raptors;
    public GameObject raptorPrefab;

    public int visibleRaptorNumber;
    public float initialRadius = 0f;
    public float radiusGrowth  = 0.12f;
    public float angleIncrement = 137.508f;  // 황금각

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
        {
            Instantiate(raptorPrefab, raptors);
        }
    }

    private void MinusRaptor(int number)
    {
        if (number > raptors.childCount)
            number = raptors.childCount;

        int total = raptors.childCount;
        for (int i = total - 1; i >= total - number; i--)
        {
            Destroy(raptors.GetChild(i).gameObject);
        }
    }

    private void TimesRaptor(int number)
    {
        int current = raptors.childCount;
        int toAdd   = current * number - current;
        for (int i = 0; i < toAdd; i++)
        {
            Instantiate(raptorPrefab, raptors);
        }
    }

    private void DivisionRaptor(int number)
    {
        int current  = raptors.childCount;
        int toRemain = current / number;
        if (toRemain < 0) toRemain = 0;
        int toRemove = current - toRemain;

        for (int i = current - 1; i >= current - toRemove; i--)
        {
            Destroy(raptors.GetChild(i).gameObject);
        }
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

## 핵심 개념 설명

### 1. 황금각(Golden Angle) - 137.508°

**황금각**은 황금비(φ ≈ 1.618)에서 유도된 각도입니다:

```
황금각 = 360° × (1 - 1/φ) ≈ 137.508°
```

이 각도를 연속으로 누적하면 어떤 두 오브젝트도 같은 방향에 겹치지 않습니다. 자연에서 해바라기 씨앗, 솔방울 비늘이 이 패턴을 따릅니다.

```csharp
public float angleIncrement = 137.508f;

float angle = i * angleIncrement;  // 0°, 137.5°, 275°, 52.5°, 190°, ...
```

137.508°를 계속 누적해도 360° 내에서 균일하게 분포됩니다. 90°나 120° 같은 "깔끔한" 각도는 일정 수마다 겹칩니다.

배치 좌표 계산:

```csharp
float currentRadius = initialRadius + radiusGrowth * i; // 인덱스마다 반지름 증가
float angle         = i * angleIncrement;               // 황금각 누적

float x = Mathf.Cos(angle * Mathf.Deg2Rad) * currentRadius;
float z = Mathf.Sin(angle * Mathf.Deg2Rad) * currentRadius;

raptors.GetChild(i).localPosition = new Vector3(x, 0f, z);
```

| i | currentRadius | angle | 위치 |
|---|-------------|-------|-----|
| 0 | 0 (중심) | 0° | (0, 0) |
| 1 | 0.12 | 137.5° | 나선 1번째 |
| 2 | 0.24 | 275° | 나선 2번째 |
| 3 | 0.36 | 52.5° | 나선 3번째 |

`initialRadius = 0`이면 첫 번째 랩터는 중심에, 이후로 나선형으로 퍼져나갑니다.

---

### 2. Instantiate(prefab, parent) - 부모 지정 생성

```csharp
Instantiate(raptorPrefab, raptors);
```

`Instantiate`의 두 번째 매개변수에 `Transform`을 전달하면 생성된 오브젝트가 해당 Transform의 자식이 됩니다. 이 덕분에:
- `raptors.childCount`로 랩터 수를 즉시 파악할 수 있습니다.
- `raptors.GetChild(i)`로 개별 랩터에 접근할 수 있습니다.

```csharp
// 월드 위치 지정 없이 부모만 지정: 로컬 원점(0,0,0)에 생성됨
Instantiate(raptorPrefab, raptors);

// 위치·회전·부모 모두 지정
Instantiate(prefab, position, rotation, parent);
```

---

### 3. 사칙연산 메서드

#### 덧셈 (Plus)

```csharp
private void PlusRaptor(int number)
{
    for (int i = 0; i < number; i++)
    {
        Instantiate(raptorPrefab, raptors);
    }
}
```

`+3` 문을 통과하면 랩터 3마리를 즉시 생성합니다.

#### 뺄셈 (Minus)

```csharp
private void MinusRaptor(int number)
{
    if (number > raptors.childCount)
        number = raptors.childCount;  // 현재 수보다 많이 제거 시도하면 전부 제거

    int total = raptors.childCount;
    for (int i = total - 1; i >= total - number; i--)
    {
        Destroy(raptors.GetChild(i).gameObject);
    }
}
```

**역순 삭제가 중요합니다.** 앞에서부터 제거하면 인덱스가 바뀌어 잘못된 오브젝트를 제거할 수 있습니다.

```
인덱스: 0  1  2  3  4   (총 5마리, -2 문 통과)
역순으로 4, 3 제거 → 0, 1, 2 남음 ✅

앞에서 0, 1 제거 → 삭제 도중 인덱스 재배치 발생 ❌
```

#### 곱셈 (Times)

```csharp
private void TimesRaptor(int number)
{
    int current = raptors.childCount;
    int toAdd   = current * number - current;  // 목표 수 - 현재 수
    for (int i = 0; i < toAdd; i++)
    {
        Instantiate(raptorPrefab, raptors);
    }
}
```

현재 3마리에서 `×3` 문을 통과하면 총 9마리가 목표이므로 6마리를 추가합니다.

```
toAdd = 3 × 3 - 3 = 6
```

#### 나눗셈 (Division)

```csharp
private void DivisionRaptor(int number)
{
    int current  = raptors.childCount;
    int toRemain = current / number;   // 정수 나눗셈 (소수점 버림)
    int toRemove = current - toRemain;

    for (int i = current - 1; i >= current - toRemove; i--)
    {
        Destroy(raptors.GetChild(i).gameObject);
    }
}
```

C#의 정수 나눗셈은 자동으로 소수점을 버립니다:

```csharp
9 / 3 = 3  // 3마리 남음
7 / 3 = 2  // 2마리 남음 (2.33... → 2)
```

---

### 4. childCount와 GetChild - 자식 오브젝트 관리

```csharp
raptors.childCount           // 자식 수 (읽기 전용)
raptors.GetChild(i)          // i번째 자식 Transform
raptors.GetChild(i).gameObject  // i번째 자식 GameObject
```

`Destroy`로 자식을 제거하면 `childCount`가 즉시 감소합니다. `SetActive(false)`는 자식을 숨기지만 `childCount`에는 포함됩니다.

---

### 5. visibleRaptorNumber - 표시 한도 제한

```csharp
if (i > visibleRaptorNumber - 1)
{
    raptors.GetChild(i).gameObject.SetActive(false);
    continue;
}
```

랩터가 수백 마리가 되어도 화면에는 최대 `visibleRaptorNumber`마리만 표시합니다. 나머지는 씬에 존재하지만 비활성화되어 보이지 않습니다. 공룡 수를 UI에 표시할 때는 `childCount`(실제 수)를 사용하는 것이 맞습니다.

---

## Unity 씬 설정

| 항목 | 설정 |
|------|------|
| `raptors` | 랩터들의 부모 빈 GameObject의 Transform |
| `raptorPrefab` | 랩터 3D 프리팹 |
| `visibleRaptorNumber` | 20~30 정도로 시작 |
| `initialRadius` | 0 (중심부터 시작) |
| `radiusGrowth` | 0.12f (Inspector에서 조절) |
| `angleIncrement` | 137.508 (황금각, 변경 불필요) |
