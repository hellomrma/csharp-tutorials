---
title: 정적 변수 (static)
titleEn: Static Variables
slugEn: 40-static-variables
description: C#에서 정적 변수(static)를 사용하여 클래스 레벨에서 공유되는 변수를 만드는 방법을 학습합니다. 여러 오브젝트 간 상태 공유에 유용합니다.
descriptionEn: Learn how to use static variables in C# to create variables shared at the class level. Useful for sharing state between multiple objects.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 40
---

# 40. 정적 변수 (static)

## 정적 변수란?

정적 변수(static variable)는 클래스에 속한 변수로, 모든 인스턴스가 공유하는 변수입니다. 인스턴스를 생성하지 않아도 클래스 이름으로 직접 접근할 수 있습니다.

## 기본 개념

- **클래스 레벨 변수**: 인스턴스가 아닌 클래스에 속함
- **공유 변수**: 모든 인스턴스가 같은 값을 공유
- **직접 접근**: 인스턴스 없이 `클래스명.변수명`으로 접근
- **메모리 효율**: 하나의 메모리 공간만 사용

---

## 1. 기본 사용법

### 정적 변수 선언

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // 정적 변수 선언
    public static bool isGameOver = false;
    
    void Start()
    {
        // 정적 변수 초기화
        isGameOver = false;
    }
}
```

### 정적 변수 접근

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // 정적 변수에 직접 접근 (인스턴스 없이)
        if (!GameManager.isGameOver)
        {
            // 게임 오버가 아닐 때만 이동
            Move();
        }
    }
    
    void Move()
    {
        // 이동 로직
    }
}
```

### 다른 스크립트에서도 접근 가능

```csharp
using UnityEngine;

public class ArrowGenerator : MonoBehaviour
{
    void Update()
    {
        // GameManager 인스턴스 없이도 접근 가능
        if (GameManager.isGameOver)
        {
            return; // 게임 오버면 화살 생성 중지
        }
        
        // 화살 생성 로직
    }
}
```

---

## 2. 정적 변수 vs 인스턴스 변수

### 인스턴스 변수 (일반 변수)

```csharp
public class Player : MonoBehaviour
{
    // 인스턴스 변수: 각 오브젝트마다 별도의 값
    public int health = 100;
    
    void Start()
    {
        // 각 Player 오브젝트는 자신만의 health 값을 가짐
        Debug.Log(health); // 각각 다른 값
    }
}
```

**특징:**
- 각 인스턴스마다 별도의 메모리 공간
- 오브젝트마다 다른 값을 가질 수 있음
- 인스턴스를 통해 접근: `player.health`

### 정적 변수

```csharp
public class GameManager : MonoBehaviour
{
    // 정적 변수: 모든 인스턴스가 공유
    public static bool isGameOver = false;
    
    void Start()
    {
        // 모든 GameManager 인스턴스가 같은 값을 공유
        Debug.Log(isGameOver); // 모두 같은 값
    }
}
```

**특징:**
- 클래스 전체가 하나의 메모리 공간 공유
- 모든 인스턴스가 같은 값을 가짐
- 클래스 이름으로 직접 접근: `GameManager.isGameOver`

---

## 3. 실제 사용 예제

### 예제 1: 게임 상태 관리

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // 게임 오버 상태를 추적하는 정적 변수
    public static bool isGameOver = false;
    
    void Start()
    {
        // 게임 시작 시 초기화
        isGameOver = false;
    }
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        
        if (hpGauge.fillAmount <= 0f)
        {
            // 게임 오버 상태 설정
            isGameOver = true;
        }
    }
}
```

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // 정적 변수로 게임 상태 확인
        if (!GameManager.isGameOver)
        {
            Move();
        }
    }
    
    void Move()
    {
        // 이동 로직
    }
}
```

```csharp
using UnityEngine;

public class ArrowController : MonoBehaviour
{
    void Update()
    {
        // 게임 오버 상태면 화살 이동 중지
        if (GameManager.isGameOver)
        {
            return;
        }
        
        // 화살 이동 로직
    }
}
```

### 예제 2: 점수 관리

```csharp
using UnityEngine;

public class ScoreManager : MonoBehaviour
{
    // 정적 변수로 점수 관리
    public static int score = 0;
    public static int highScore = 0;
    
    public static void AddScore(int points)
    {
        score += points;
        
        // 최고 점수 업데이트
        if (score > highScore)
        {
            highScore = score;
        }
    }
    
    public static void ResetScore()
    {
        score = 0;
    }
}
```

```csharp
using UnityEngine;

public class Coin : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // 정적 메서드로 점수 추가
            ScoreManager.AddScore(10);
            Destroy(gameObject);
        }
    }
}
```

---

## 4. 정적 변수의 장단점

### 장점

1. **전역 접근**: 어디서든 클래스 이름으로 접근 가능
2. **메모리 효율**: 하나의 메모리 공간만 사용
3. **상태 공유**: 여러 오브젝트가 같은 상태를 공유
4. **편리성**: 인스턴스 생성 없이 접근 가능

### 단점

1. **전역 상태**: 전역 상태는 디버깅이 어려울 수 있음
2. **의존성**: 다른 클래스와 강하게 결합될 수 있음
3. **테스트 어려움**: 정적 변수는 테스트하기 어려울 수 있음
4. **초기화 순서**: 초기화 순서에 주의 필요

---

## 5. 주의사항

### 1. 초기화 순서

```csharp
// ❌ 문제: 정적 변수가 초기화되기 전에 접근
public class Player : MonoBehaviour
{
    void Start()
    {
        // GameManager가 아직 Start()를 실행하지 않았을 수 있음
        if (GameManager.isGameOver) { }
    }
}

// ✅ 해결: null 체크 또는 초기화 확인
public class Player : MonoBehaviour
{
    void Start()
    {
        // 안전한 접근
        if (GameManager.isGameOver) { }
    }
}
```

### 2. 멀티스레드 환경

```csharp
// 정적 변수는 멀티스레드 환경에서 주의 필요
public static int counter = 0;

// 여러 스레드에서 동시에 접근하면 문제 발생 가능
// lock이나 thread-safe 방법 사용 필요
```

### 3. 메모리 누수

```csharp
// 정적 변수는 게임이 끝날 때까지 메모리에 남아있음
// 필요 없을 때는 null로 설정
public static GameObject player;
void OnDestroy()
{
    player = null;
}
```

---

## 6. 정적 변수 vs 싱글톤 패턴

### 정적 변수 사용

```csharp
public class GameManager : MonoBehaviour
{
    public static bool isGameOver = false;
    public static int score = 0;
}
```

**장점:**
- 간단하고 직관적
- 인스턴스 생성 불필요

**단점:**
- MonoBehaviour 기능 사용 불가
- Unity 생명주기 메서드 사용 불가

### 싱글톤 패턴 사용

```csharp
public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }
    public bool isGameOver = false;
    public int score = 0;
}
```

**장점:**
- MonoBehaviour 기능 사용 가능
- Unity 생명주기 메서드 사용 가능
- Inspector에서 설정 가능

**단점:**
- 구현이 복잡
- 인스턴스 관리 필요

---

## 7. 정리

### 정적 변수 사용 시기

- **간단한 상태 공유**: 게임 오버, 일시정지 등
- **전역 설정**: 게임 설정, 난이도 등
- **유틸리티 값**: 상수, 설정값 등

### 정적 변수 사용 지양 시기

- **복잡한 상태 관리**: 싱글톤 패턴 고려
- **MonoBehaviour 기능 필요**: 싱글톤 패턴 사용
- **Inspector 설정 필요**: public 변수 사용

### 베스트 프랙티스

1. **명확한 네이밍**: `isGameOver`, `score` 등 명확한 이름
2. **초기화 확인**: Start()에서 초기화
3. **적절한 사용**: 간단한 상태 공유에만 사용
4. **문서화**: 정적 변수의 용도 명확히 문서화

---

## 연습 문제

1. 정적 변수를 사용하여 게임의 난이도(difficulty)를 관리하는 시스템을 만드세요.

2. 정적 변수로 플레이어의 생존 시간(survivalTime)을 추적하는 시스템을 만드세요.

3. 정적 변수와 일반 변수의 차이를 보여주는 예제 코드를 작성하세요.

4. 정적 변수를 사용하여 게임의 최고 점수를 저장하고 불러오는 시스템을 만드세요.
