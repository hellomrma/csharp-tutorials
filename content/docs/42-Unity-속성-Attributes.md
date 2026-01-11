---
title: Unity 속성 (Attributes)
titleEn: Unity Attributes
slugEn: 42-unity-attributes
description: Unity Inspector를 개선하기 위한 속성(Attributes)을 학습합니다. [Header], [SerializeField], [Range] 등을 다룹니다.
descriptionEn: Learn attributes to improve Unity Inspector. Covers [Header], [SerializeField], [Range], and more.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 42
---

# 42. Unity 속성 (Attributes)

## Unity 속성이란?

Unity 속성(Attributes)은 코드에 메타데이터를 추가하여 Unity Inspector의 표시 방식을 제어하는 기능입니다. 변수를 그룹화하거나, 범위를 제한하거나, 도구팁을 추가하는 등 Inspector를 더 사용하기 쉽게 만들 수 있습니다.

## 기본 개념

- **속성(Attribute)**: 코드에 추가하는 메타데이터
- **Inspector 개선**: 변수 표시 방식 제어
- **코드 가독성**: 변수 그룹화 및 정리
- **사용자 경험**: Inspector를 더 직관적으로 만듦

---

## 1. [Header] - 변수 그룹화

`[Header]`는 Inspector에서 변수들을 그룹화하여 표시합니다.

### 기본 사용법

```csharp
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    // Unity Inspector에서 UI 참조 변수들을 그룹화하여 표시
    [Header("UI References")]
    public Image hpGauge;
    public GameObject restartButton;
    public GameObject gameOverText;
    
    [Header("Game Settings")]
    public float gameSpeed = 1f;
    public int maxLives = 3;
}
```

### Inspector 표시

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

### 여러 Header 사용

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("이동 설정")]
    public float moveSpeed = 5f;
    public float jumpForce = 10f;
    
    [Header("공격 설정")]
    public float attackDamage = 10f;
    public float attackRange = 2f;
    
    [Header("체력 설정")]
    public float maxHealth = 100f;
    public float currentHealth = 100f;
}
```

---

## 2. [SerializeField] - private 변수를 Inspector에 표시

`[SerializeField]`는 private 변수를 Inspector에 표시할 수 있게 합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    // private이지만 Inspector에 표시됨
    [SerializeField] private float health = 100f;
    [SerializeField] private float speed = 5f;
    
    // public 변수 (Inspector에 표시됨)
    public float damage = 10f;
}
```

### 언제 사용?

```csharp
// ✅ 좋은 예: 캡슐화 유지하면서 Inspector에서 조정 가능
[SerializeField] private float health = 100f;

// ❌ 나쁜 예: 캡슐화 깨짐
public float health = 100f;  // 다른 스크립트에서도 접근 가능
```

---

## 3. [Range] - 값 범위 제한

`[Range]`는 Inspector에서 슬라이더로 값을 조정할 수 있게 하고, 범위를 제한합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    // 0~10 사이의 값만 선택 가능 (슬라이더)
    [Range(0f, 10f)]
    public float moveSpeed = 5f;
    
    // 1~100 사이의 값만 선택 가능
    [Range(1, 100)]
    public int maxHealth = 50;
}
```

### 실제 사용 예제

```csharp
using UnityEngine;

public class GameSettings : MonoBehaviour
{
    [Header("플레이어 설정")]
    [Range(1f, 20f)]
    public float playerSpeed = 5f;
    
    [Range(10, 200)]
    public int playerHealth = 100;
    
    [Header("게임 설정")]
    [Range(0.1f, 5f)]
    public float gameSpeed = 1f;
    
    [Range(1, 10)]
    public int difficulty = 5;
}
```

---

## 4. [Tooltip] - 도구팁 추가

`[Tooltip]`은 Inspector에서 변수에 마우스를 올렸을 때 설명을 표시합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Tooltip("플레이어의 이동 속도입니다. 값이 클수록 빠르게 이동합니다.")]
    public float moveSpeed = 5f;
    
    [Tooltip("플레이어의 최대 체력입니다.")]
    public int maxHealth = 100;
}
```

### Header와 함께 사용

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [Header("UI References")]
    [Tooltip("HP 게이지를 표시하는 UI Image 컴포넌트")]
    public Image hpGauge;
    
    [Tooltip("게임 재시작 버튼 오브젝트")]
    public GameObject restartButton;
}
```

---

## 5. [Space] - 공백 추가

`[Space]`는 Inspector에서 변수 사이에 공백을 추가합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    
    [Space]  // 위에 공백 추가
    public float jumpForce = 10f;
    
    [Space(10)]  // 10픽셀 공백 추가
    public float attackDamage = 10f;
}
```

---

## 6. 실제 사용 예제

### 예제 1: GameManager

```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    // 게임 오버 상태를 추적하는 정적 변수
    public static bool isGameOver = false;

    // Unity Inspector에서 UI 참조 변수들을 그룹화하여 표시
    [Header("UI References")]
    [Tooltip("HP 게이지를 표시하는 UI Image 컴포넌트")]
    public Image hpGauge;
    
    [Tooltip("게임 재시작 버튼 오브젝트")]
    public GameObject restartButton;
    
    [Tooltip("게임 오버 텍스트 오브젝트")]
    public GameObject gameOverText;

    [Header("Game Settings")]
    [Range(0.5f, 2f)]
    [Tooltip("게임 속도 배율")]
    public float gameSpeed = 1f;
    
    [Range(1, 10)]
    [Tooltip("게임 난이도 (1=쉬움, 10=어려움)")]
    public int difficulty = 5;
}
```

### 예제 2: PlayerController

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("이동 설정")]
    [Range(1f, 20f)]
    [Tooltip("플레이어의 이동 속도")]
    public float moveSpeed = 5f;
    
    [Range(5f, 30f)]
    [Tooltip("플레이어의 점프 힘")]
    public float jumpForce = 10f;
    
    [Space]
    [Header("체력 설정")]
    [Range(10, 200)]
    [Tooltip("플레이어의 최대 체력")]
    public int maxHealth = 100;
    
    [SerializeField]
    [Tooltip("플레이어의 현재 체력 (Inspector에서만 수정 가능)")]
    private int currentHealth = 100;
}
```

---

## 7. 속성 조합 사용

여러 속성을 함께 사용할 수 있습니다.

### 속성 순서

```csharp
[Header("그룹 이름")]
[Tooltip("설명")]
[Range(min, max)]
[SerializeField]
private float value;
```

### 실제 예제

```csharp
using UnityEngine;

public class Weapon : MonoBehaviour
{
    [Header("공격 설정")]
    [Range(1f, 100f)]
    [Tooltip("무기의 공격력")]
    public float damage = 10f;
    
    [Range(0.1f, 5f)]
    [Tooltip("공격 속도 (초당 공격 횟수)")]
    public float attackSpeed = 1f;
    
    [Space]
    [Header("내구도 설정")]
    [SerializeField]
    [Range(1, 1000)]
    [Tooltip("무기의 최대 내구도")]
    private int maxDurability = 100;
    
    [SerializeField]
    [Tooltip("무기의 현재 내구도")]
    private int currentDurability = 100;
}
```

---

## 8. 정리

### 주요 Unity 속성

| 속성 | 용도 | 예제 |
|------|------|------|
| `[Header("이름")]` | 변수 그룹화 | `[Header("UI References")]` |
| `[SerializeField]` | private 변수 Inspector 표시 | `[SerializeField] private float health;` |
| `[Range(min, max)]` | 값 범위 제한 (슬라이더) | `[Range(0f, 10f)]` |
| `[Tooltip("설명")]` | 도구팁 추가 | `[Tooltip("체력 값")]` |
| `[Space]` | 공백 추가 | `[Space]` 또는 `[Space(10)]` |

### 베스트 프랙티스

1. **Header 사용**: 관련 변수들을 그룹화
2. **SerializeField**: 캡슐화 유지하면서 Inspector 접근
3. **Range 사용**: 값 범위 제한 및 슬라이더 제공
4. **Tooltip 추가**: 변수 설명으로 가독성 향상
5. **속성 조합**: 여러 속성을 함께 사용하여 Inspector 개선

---

## 연습 문제

1. PlayerController에 [Header]를 사용하여 이동 설정과 체력 설정을 그룹화하세요.

2. private 변수를 [SerializeField]로 Inspector에 표시하고, [Range]로 범위를 제한하세요.

3. 모든 public 변수에 [Tooltip]을 추가하여 설명을 작성하세요.

4. [Space]를 사용하여 변수 그룹 사이에 적절한 간격을 추가하세요.
