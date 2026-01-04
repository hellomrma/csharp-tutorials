---
title: Rigidbody2D와 Collider2D
titleEn: Rigidbody2D and Collider2D
slugEn: 37-rigidbody2d-and-collider2d
description: Unity에서 2D 물리 시뮬레이션을 위한 Rigidbody2D와 Collider2D 컴포넌트를 사용하는 방법을 학습합니다.
descriptionEn: Learn how to use Rigidbody2D and Collider2D components for 2D physics simulation in Unity.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 37
---

# 37. Rigidbody2D와 Collider2D

## Rigidbody2D와 Collider2D란?

Rigidbody2D와 Collider2D는 Unity에서 2D 물리 시뮬레이션과 충돌 감지를 위한 핵심 컴포넌트입니다. Rigidbody2D는 물리 시뮬레이션을 담당하고, Collider2D는 충돌 영역을 정의합니다.

## 기본 개념

- **Rigidbody2D**: 물리 시뮬레이션을 담당하는 컴포넌트
- **Collider2D**: 충돌 영역을 정의하는 컴포넌트
- **Kinematic**: 물리 영향 없이 이동하는 모드
- **Trigger**: 물리 충돌 없이 감지만 하는 모드

---

## 1. Rigidbody2D 기본 설정

### Rigidbody2D 추가하기

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
            // Rigidbody2D가 없으면 추가
            rb = gameObject.AddComponent<Rigidbody2D>();
        }

        // Kinematic으로 설정 (물리 영향 없이 이동)
        rb.bodyType = RigidbodyType2D.Kinematic;
        
        // 중력 비활성화
        rb.gravityScale = 0;
        
        // 회전 방지
        rb.freezeRotation = true;
        
        // 시뮬레이션 활성화 (충돌 감지를 위해 필요)
        rb.simulated = true;
    }
}
```

### Rigidbody2D 타입

```csharp
// Dynamic: 물리 시뮬레이션에 완전히 참여
rb.bodyType = RigidbodyType2D.Dynamic;

// Kinematic: 물리 영향 없이 코드로 이동
rb.bodyType = RigidbodyType2D.Kinematic;

// Static: 정적 오브젝트 (이동하지 않음)
rb.bodyType = RigidbodyType2D.Static;
```

---

## 2. Kinematic 모드

Kinematic 모드는 물리 시뮬레이션의 영향을 받지 않고 코드로 직접 이동하는 모드입니다.

### Kinematic 설정

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

        // Kinematic으로 설정
        rb.bodyType = RigidbodyType2D.Kinematic;
        rb.gravityScale = 0;
        rb.freezeRotation = true;
    }

    void Update()
    {
        // 코드로 직접 이동
        float horizontalInput = Input.GetAxisRaw("Horizontal");
        Vector3 movement = new Vector3(horizontalInput * 5f * Time.deltaTime, 0, 0);
        transform.position += movement;
    }
}
```

### MovePosition() 사용

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
        // MovePosition 사용 (물리 시뮬레이션과 호환)
        Vector3 newPosition = transform.position + Vector3.down * fallSpeed * Time.deltaTime;
        rb.MovePosition(newPosition);
    }
}
```

---

## 3. Collider2D 종류

### BoxCollider2D - 사각형 충돌 영역

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
            // BoxCollider2D 추가
            BoxCollider2D boxCollider = gameObject.AddComponent<BoxCollider2D>();
            boxCollider.isTrigger = true;
            
            // 스프라이트 크기에 맞게 조정
            SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
            if (spriteRenderer != null && spriteRenderer.sprite != null)
            {
                boxCollider.size = spriteRenderer.bounds.size;
            }
        }
    }
}
```

### CircleCollider2D - 원형 충돌 영역

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
            // CircleCollider2D 추가
            CircleCollider2D circleCollider = gameObject.AddComponent<CircleCollider2D>();
            circleCollider.isTrigger = true;
            
            // 스프라이트 크기에 맞게 조정
            AdjustColliderSize(circleCollider);
        }
    }

    private void AdjustColliderSize(CircleCollider2D collider)
    {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null && spriteRenderer.sprite != null)
        {
            // 스프라이트의 가로, 세로 중 더 큰 값 사용
            float spriteSize = Mathf.Max(
                spriteRenderer.bounds.size.x, 
                spriteRenderer.bounds.size.y
            );
            // 반지름을 스프라이트 크기의 절반으로 설정
            collider.radius = spriteSize / 2f;
        }
    }
}
```

---

## 4. Trigger 설정

Trigger 모드는 물리 충돌 없이 충돌만 감지하는 모드입니다.

### Trigger 설정

```csharp
using UnityEngine;

public class Coin : MonoBehaviour
{
    void Start()
    {
        Collider2D collider = GetComponent<Collider2D>();
        if (collider != null)
        {
            // Trigger 모드로 설정
            collider.isTrigger = true;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // 코인 획득 처리
            Destroy(gameObject);
        }
    }
}
```

### Trigger vs Collision

```csharp
// Trigger 모드: 물리 충돌 없이 감지만
collider.isTrigger = true;
// OnTriggerEnter2D() 호출

// Collision 모드: 실제 물리 충돌 발생
collider.isTrigger = false;
// OnCollisionEnter2D() 호출
```

---

## 5. 실제 사용 예제

### 예제 1: 양(플레이어) 설정

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

        // Player 태그 설정
        if (!gameObject.CompareTag("Player"))
        {
            gameObject.tag = "Player";
        }
    }
}
```

### 예제 2: 불덩어리 설정

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
        // MovePosition으로 이동
        Vector3 newPosition = transform.position + Vector3.down * fallSpeed * Time.deltaTime;
        rb.MovePosition(newPosition);
    }
}
```

---

## 6. 주의사항

### 1. Rigidbody2D 필수

```csharp
// ✅ 충돌 감지가 되려면 최소한 한쪽에 Rigidbody2D가 있어야 함
// 둘 다 없으면 충돌 감지 안 됨
```

### 2. Kinematic vs Dynamic

```csharp
// Kinematic: 코드로 직접 이동, 물리 영향 없음
rb.bodyType = RigidbodyType2D.Kinematic;
transform.position += movement; // 또는 rb.MovePosition()

// Dynamic: 물리 시뮬레이션에 참여
rb.bodyType = RigidbodyType2D.Dynamic;
rb.velocity = new Vector2(5f, 0); // 속도로 이동
```

### 3. Trigger 설정

```csharp
// Trigger 모드: OnTriggerEnter2D() 호출
collider.isTrigger = true;

// Collision 모드: OnCollisionEnter2D() 호출
collider.isTrigger = false;
```

### 4. 시뮬레이션 활성화

```csharp
// 충돌 감지를 위해 시뮬레이션 활성화 필요
rb.simulated = true;
```

---

## 7. 정리

### Rigidbody2D 타입 비교

| 타입 | 특징 | 사용 시기 |
|------|------|----------|
| **Dynamic** | 물리 시뮬레이션에 완전 참여 | 중력, 힘, 충돌 반응 필요 |
| **Kinematic** | 물리 영향 없이 코드로 이동 | 직접 제어하는 오브젝트 |
| **Static** | 정적 오브젝트 | 이동하지 않는 벽, 바닥 |

### Collider2D 종류

- **BoxCollider2D**: 사각형 충돌 영역 (플레이어, 벽 등)
- **CircleCollider2D**: 원형 충돌 영역 (총알, 코인 등)
- **CapsuleCollider2D**: 캡슐형 충돌 영역
- **PolygonCollider2D**: 다각형 충돌 영역

### 베스트 프랙티스

1. **Kinematic 사용**: 직접 제어하는 오브젝트는 Kinematic
2. **Trigger 설정**: 충돌 감지만 필요하면 Trigger 모드
3. **크기 조정**: 스프라이트 크기에 맞게 Collider 크기 조정
4. **시뮬레이션 활성화**: 충돌 감지를 위해 simulated = true

---

## 연습 문제

1. 플레이어 오브젝트에 Rigidbody2D(Kinematic)와 BoxCollider2D(Trigger)를 자동으로 추가하는 스크립트를 작성하세요.

2. 총알 오브젝트에 Rigidbody2D(Kinematic)와 CircleCollider2D(Trigger)를 자동으로 추가하는 스크립트를 작성하세요.

3. 오브젝트가 화면 밖으로 나가면 자동으로 삭제되도록 하는 스크립트를 작성하세요.
