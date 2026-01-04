---
title: GameObject 찾기와 컴포넌트 가져오기
titleEn: Finding GameObjects and Getting Components
slugEn: 32-finding-gameobjects-and-getting-components
description: Unity에서 GameObject를 찾고 컴포넌트를 가져오는 방법을 학습합니다. GameObject.Find(), GetComponent(), FindObjectOfType() 등의 함수를 다룹니다.
descriptionEn: Learn how to find GameObjects and get components in Unity. Covers GameObject.Find(), GetComponent(), FindObjectOfType(), and other functions.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 32
---

# 32. GameObject 찾기와 컴포넌트 가져오기

## GameObject 찾기란?

Unity 게임 개발에서 다른 오브젝트를 찾아서 참조하거나, 그 오브젝트의 컴포넌트를 가져와서 사용하는 것은 매우 중요한 작업입니다. 예를 들어, 플레이어가 적을 찾아서 공격하거나, 게임 매니저가 플레이어의 체력을 확인하는 등의 상황에서 필요합니다.

## 기본 개념

- **GameObject**: Unity 씬에 있는 모든 오브젝트
- **컴포넌트**: GameObject에 붙어있는 기능 단위 (예: Transform, Rigidbody, Script 등)
- **참조**: 다른 오브젝트나 컴포넌트를 가리키는 변수

---

## 1. GameObject.Find() - 이름으로 찾기

`GameObject.Find()`는 씬에서 특정 이름을 가진 GameObject를 찾아서 반환합니다.

### 기본 사용법

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    GameObject player;

    void Start()
    {
        // 씬에서 "player"라는 이름의 GameObject를 찾아서 저장
        player = GameObject.Find("player");
        
        if (player != null)
        {
            Debug.Log("플레이어를 찾았습니다!");
        }
        else
        {
            Debug.Log("플레이어를 찾을 수 없습니다.");
        }
    }
}
```

### 특징

- **이름으로 찾기**: GameObject의 이름이 정확히 일치해야 함
- **비활성화된 오브젝트는 못 찾음**: 활성화된 오브젝트만 찾을 수 있음
- **성능 주의**: 매 프레임마다 호출하면 성능 저하 가능
- **null 체크 필수**: 찾지 못하면 `null`을 반환

### 주의사항

```csharp
void Update()
{
    // ❌ 나쁜 예: 매 프레임마다 찾기 (성능 저하)
    GameObject player = GameObject.Find("player");
    
    // ✅ 좋은 예: Start()에서 한 번만 찾아서 저장
    // (위의 예제처럼)
}
```

---

## 2. GetComponent() - 컴포넌트 가져오기

`GetComponent<T>()`는 GameObject에 붙어있는 특정 타입의 컴포넌트를 가져옵니다.

### 기본 사용법

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    void Start()
    {
        // "GameManager"라는 이름의 GameObject를 찾기
        GameObject gm = GameObject.Find("GameManager");
        
        if (gm != null)
        {
            // GameManager 컴포넌트 가져오기
            GameManager gameManager = gm.GetComponent<GameManager>();
            
            if (gameManager != null)
            {
                // GameManager의 메서드 호출
                gameManager.DecreaseHp();
            }
        }
    }
}
```

### 자신의 컴포넌트 가져오기

```csharp
public class PlayerController : MonoBehaviour
{
    void Start()
    {
        // 자신의 Transform 컴포넌트 가져오기
        Transform myTransform = GetComponent<Transform>();
        
        // 자신의 Rigidbody2D 컴포넌트 가져오기
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        
        // 자신의 SpriteRenderer 컴포넌트 가져오기
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
    }
}
```

### 다른 오브젝트의 컴포넌트 가져오기

```csharp
public class EnemyController : MonoBehaviour
{
    GameObject player;
    PlayerController playerController;

    void Start()
    {
        // 플레이어 찾기
        player = GameObject.Find("player");
        
        if (player != null)
        {
            // 플레이어의 PlayerController 컴포넌트 가져오기
            playerController = player.GetComponent<PlayerController>();
        }
    }
}
```

### null 체크

```csharp
void Start()
{
    GameObject player = GameObject.Find("player");
    
    // null 체크 없이 사용하면 에러 발생 가능
    // player.GetComponent<PlayerController>(); // ❌ 위험
    
    // ✅ 안전한 방법
    if (player != null)
    {
        PlayerController pc = player.GetComponent<PlayerController>();
        if (pc != null)
        {
            // 컴포넌트 사용
        }
    }
}
```

---

## 3. FindObjectOfType() - 타입으로 찾기

`FindObjectOfType<T>()`는 씬에서 특정 타입의 컴포넌트를 가진 GameObject를 찾습니다.

### 기본 사용법

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private Camera mainCamera;

    void Start()
    {
        // Camera 컴포넌트를 가진 GameObject 찾기
        mainCamera = Camera.main;
        
        // Camera.main이 없으면 FindObjectOfType 사용
        if (mainCamera == null)
        {
            mainCamera = FindObjectOfType<Camera>();
        }
    }
}
```

### 여러 개 찾기

```csharp
using UnityEngine;

public class FireballSpawner : MonoBehaviour
{
    void Start()
    {
        // 씬에 있는 모든 FallingFireball 컴포넌트 찾기
        FallingFireball[] allFireballs = FindObjectsOfType<FallingFireball>();
        
        foreach (var fireball in allFireballs)
        {
            Debug.Log("불덩어리 발견: " + fireball.name);
        }
    }
}
```

### 비활성화된 오브젝트도 찾기

```csharp
// 비활성화된 오브젝트도 포함하여 찾기
FallingFireball[] allFireballs = FindObjectsOfType<FallingFireball>(true);
```

---

## 4. 실제 사용 예제

### 예제 1: 플레이어 찾아서 충돌 감지

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    GameObject player;
    public float arrowSpeed = 0.1f;

    void Start()
    {
        // 플레이어 찾기
        player = GameObject.Find("player");
    }

    void Update()
    {
        // 화살 이동
        transform.Translate(0, -arrowSpeed, 0);

        // 플레이어와 충돌 감지
        if (player != null)
        {
            Vector2 arrowPos = transform.position;
            Vector2 playerPos = player.transform.position;
            Vector2 direction = arrowPos - playerPos;
            float distance = direction.magnitude;

            if (distance < 1.5f) // 충돌 거리
            {
                // GameManager 찾아서 HP 감소
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

### 예제 2: 카메라 찾아서 경계 계산

```csharp
using UnityEngine;

public class SheepController : MonoBehaviour
{
    private Camera mainCamera;
    private float minX, maxX;

    void Start()
    {
        // 카메라 찾기
        mainCamera = Camera.main;
        if (mainCamera == null)
        {
            mainCamera = FindObjectOfType<Camera>();
        }

        // 카메라 경계 계산
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

## 5. 성능 최적화 팁

### 1. Start()에서 한 번만 찾기

```csharp
// ✅ 좋은 예
GameObject player;

void Start()
{
    player = GameObject.Find("player");
}

void Update()
{
    if (player != null)
    {
        // player 사용
    }
}
```

### 2. Inspector에서 직접 할당

```csharp
// ✅ 가장 좋은 방법: Inspector에서 직접 할당
public GameObject player; // Inspector에서 드래그 앤 드롭

void Start()
{
    // 이미 할당되어 있으므로 Find() 불필요
    if (player != null)
    {
        // player 사용
    }
}
```

### 3. 태그 사용하기

```csharp
// GameObject.Find() 대신 태그 사용
GameObject player = GameObject.FindGameObjectWithTag("Player");
```

---

## 6. 정리

### GameObject 찾기 방법 비교

| 방법 | 사용 시기 | 성능 | 비활성화 오브젝트 |
|------|----------|------|------------------|
| `GameObject.Find("이름")` | 이름을 정확히 알고 있을 때 | 느림 | ❌ |
| `FindObjectOfType<T>()` | 타입으로 찾을 때 | 보통 | ❌ |
| `FindObjectsOfType<T>()` | 여러 개 찾을 때 | 느림 | ❌ |
| Inspector 할당 | 가장 권장 | 빠름 | ✅ |

### 컴포넌트 가져오기

- `GetComponent<T>()`: 자신 또는 다른 GameObject의 컴포넌트 가져오기
- 항상 null 체크 필수
- Start()에서 미리 가져와서 변수에 저장하는 것이 효율적

### 베스트 프랙티스

1. **Inspector 할당 우선**: 가장 빠르고 안전
2. **Start()에서 찾기**: Find()는 Start()에서 한 번만
3. **null 체크 필수**: 항상 null 체크 후 사용
4. **캐싱**: 자주 사용하는 참조는 변수에 저장

---

## 연습 문제

1. 씬에서 "Enemy"라는 이름의 GameObject를 찾아서 그 위치를 출력하는 스크립트를 작성하세요.

2. 자신의 Rigidbody2D 컴포넌트를 가져와서 중력을 0으로 설정하는 스크립트를 작성하세요.

3. 씬에 있는 모든 "Coin" 태그를 가진 GameObject를 찾아서 개수를 출력하는 스크립트를 작성하세요.
