---
title: 코루틴 (Coroutine)
titleEn: Coroutines
slugEn: 35-coroutines
description: Unity에서 코루틴을 사용하여 시간차 실행을 구현하는 방법을 학습합니다. IEnumerator, StartCoroutine, WaitForSeconds 등을 다룹니다.
descriptionEn: Learn how to implement delayed execution using coroutines in Unity. Covers IEnumerator, StartCoroutine, WaitForSeconds, and more.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 35
---

# 35. 코루틴 (Coroutine)

## 코루틴이란?

코루틴은 함수를 일시 중지하고 나중에 다시 실행할 수 있게 해주는 기능입니다. 시간차로 여러 작업을 수행하거나, 일정 시간 대기 후 실행하는 등의 상황에서 사용합니다.

## 기본 개념

- **IEnumerator**: 코루틴 함수의 반환 타입
- **StartCoroutine()**: 코루틴을 시작하는 함수
- **yield**: 코루틴을 일시 중지하는 키워드
- **WaitForSeconds**: 지정한 시간만큼 대기

---

## 1. 기본 코루틴 구조

### 코루틴 함수 만들기

```csharp
using UnityEngine;
using System.Collections;

public class Example : MonoBehaviour
{
    void Start()
    {
        // 코루틴 시작
        StartCoroutine(MyCoroutine());
    }

    // 코루틴 함수 (반환 타입: IEnumerator)
    IEnumerator MyCoroutine()
    {
        Debug.Log("코루틴 시작!");
        
        // 2초 대기
        yield return new WaitForSeconds(2f);
        
        Debug.Log("2초 후 실행!");
    }
}
```

### 코루틴의 특징

- **일시 중지 가능**: `yield`로 실행을 멈출 수 있음
- **나중에 재개**: Unity가 자동으로 다시 실행
- **Update()와 독립적**: Update()와 별개로 동작

---

## 2. WaitForSeconds - 시간 대기

`WaitForSeconds`는 지정한 시간(초)만큼 대기합니다.

### 기본 사용법

```csharp
using UnityEngine;
using System.Collections;

public class FireballSpawner : MonoBehaviour
{
    public GameObject fireballPrefab;

    void Start()
    {
        // 코루틴 시작
        StartCoroutine(SpawnFireballs());
    }

    IEnumerator SpawnFireballs()
    {
        for (int i = 0; i < 10; i++)
        {
            // 불덩어리 생성
            Instantiate(fireballPrefab);
            
            // 1초 대기
            yield return new WaitForSeconds(1f);
        }
    }
}
```

### 랜덤 시간 대기

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
            // 불덩어리 생성
            Instantiate(fireballPrefab);
            
            // 마지막 불덩어리가 아니면 대기
            if (i < 9)
            {
                // 랜덤한 시간 대기 (0.5초 ~ 2초)
                float delay = Random.Range(spawnDelayMin, spawnDelayMax);
                yield return new WaitForSeconds(delay);
            }
        }
    }
}
```

---

## 3. WaitForSecondsRealtime - 실제 시간 대기

`WaitForSecondsRealtime`는 `Time.timeScale`의 영향을 받지 않는 실제 시간으로 대기합니다.

### Time.timeScale과의 차이

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
        Debug.Log("시작!");
        
        // Time.timeScale의 영향을 받음 (게임이 일시정지되면 대기)
        yield return new WaitForSeconds(2f);
        Debug.Log("WaitForSeconds 완료!");
        
        // Time.timeScale의 영향을 받지 않음 (게임이 일시정지되어도 대기)
        yield return new WaitForSecondsRealtime(2f);
        Debug.Log("WaitForSecondsRealtime 완료!");
    }
}
```

### 실제 사용 예제

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
                // 게임이 일시정지되어도 실제 시간으로 대기
                float delay = Random.Range(spawnDelayMin, spawnDelayMax);
                yield return new WaitForSecondsRealtime(delay);
            }
        }
    }
}
```

---

## 4. WaitForEndOfFrame - 프레임 종료 대기

`WaitForEndOfFrame`는 현재 프레임이 완전히 끝날 때까지 대기합니다.

### 사용 예제

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
        // 현재 프레임이 완전히 렌더링될 때까지 대기
        yield return new WaitForEndOfFrame();
        
        // 스크린샷 찍기
        ScreenCapture.CaptureScreenshot("screenshot.png");
        Debug.Log("스크린샷 저장 완료!");
    }
}
```

---

## 5. 코루틴 중지하기

### StopCoroutine() - 특정 코루틴 중지

```csharp
using UnityEngine;
using System.Collections;

public class Example : MonoBehaviour
{
    Coroutine myCoroutine;

    void Start()
    {
        // 코루틴 시작하고 참조 저장
        myCoroutine = StartCoroutine(MyCoroutine());
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // 코루틴 중지
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
            Debug.Log("실행 중...");
            yield return new WaitForSeconds(1f);
        }
    }
}
```

### StopAllCoroutines() - 모든 코루틴 중지

```csharp
void OnDestroy()
{
    // 이 오브젝트의 모든 코루틴 중지
    StopAllCoroutines();
}
```

---

## 6. 실제 사용 예제

### 예제 1: 불덩어리 시간차 생성

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
        // 이미 생성된 불덩어리가 있으면 생성하지 않음
        if (spawnedFireballs.Count > 0)
        {
            yield break; // 코루틴 종료
        }

        // 지정된 개수만큼 불덩어리 생성
        for (int i = 0; i < fireballCount; i++)
        {
            // 불덩어리 하나 생성
            SpawnSingleFireball();

            // 마지막 불덩어리가 아니면 랜덤한 시간만큼 대기
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

### 예제 2: 페이드 인/아웃

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

    // 페이드 인 (검은 화면에서 점점 밝아짐)
    IEnumerator FadeIn()
    {
        float elapsed = 0f;
        Color color = fadeImage.color;

        while (elapsed < fadeDuration)
        {
            elapsed += Time.deltaTime;
            color.a = 1f - (elapsed / fadeDuration);
            fadeImage.color = color;
            yield return null; // 다음 프레임까지 대기
        }

        color.a = 0f;
        fadeImage.color = color;
    }

    // 페이드 아웃 (밝은 화면에서 점점 어두워짐)
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

### 예제 3: 반복 실행

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
            Debug.Log("1초마다 실행!");
            
            // 1초 대기
            yield return new WaitForSeconds(1f);
        }
    }
}
```

---

## 7. yield return null

`yield return null`은 다음 프레임까지 대기합니다.

### 사용 예제

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
            // 매 프레임마다 조금씩 이동
            transform.position = Vector3.MoveTowards(
                transform.position, 
                targetPosition, 
                speed * Time.deltaTime
            );
            
            // 다음 프레임까지 대기
            yield return null;
        }
    }
}
```

---

## 8. 주의사항

### 1. MonoBehaviour 필요

```csharp
// ✅ 코루틴은 MonoBehaviour를 상속받은 클래스에서만 사용 가능
public class Example : MonoBehaviour
{
    IEnumerator MyCoroutine() { }
}

// ❌ 일반 클래스에서는 사용 불가
public class Example
{
    IEnumerator MyCoroutine() { } // 에러!
}
```

### 2. StartCoroutine() 필수

```csharp
// ✅ 올바른 방법
StartCoroutine(MyCoroutine());

// ❌ 잘못된 방법 (코루틴이 실행되지 않음)
MyCoroutine();
```

### 3. 오브젝트 파괴 시 자동 중지

```csharp
// GameObject가 파괴되면 코루틴도 자동으로 중지됨
void OnDestroy()
{
    // 명시적으로 중지할 수도 있음
    StopAllCoroutines();
}
```

### 4. 중첩 코루틴

```csharp
IEnumerator OuterCoroutine()
{
    Debug.Log("외부 코루틴 시작");
    
    // 내부 코루틴 시작 (완료될 때까지 대기)
    yield return StartCoroutine(InnerCoroutine());
    
    Debug.Log("내부 코루틴 완료 후 실행");
}

IEnumerator InnerCoroutine()
{
    yield return new WaitForSeconds(2f);
    Debug.Log("내부 코루틴 완료");
}
```

---

## 9. 정리

### 코루틴 vs 일반 함수

| 특징 | 일반 함수 | 코루틴 |
|------|----------|--------|
| 실행 방식 | 즉시 실행 완료 | 일시 중지 후 재개 가능 |
| 시간 제어 | 불가능 | 가능 (yield 사용) |
| 반환 타입 | void, int 등 | IEnumerator |

### 주요 yield 타입

- `yield return new WaitForSeconds(시간)`: 지정한 시간 대기
- `yield return new WaitForSecondsRealtime(시간)`: 실제 시간 대기
- `yield return new WaitForEndOfFrame()`: 프레임 종료 대기
- `yield return null`: 다음 프레임 대기

### 베스트 프랙티스

1. **StartCoroutine() 사용**: 코루틴은 반드시 StartCoroutine()으로 시작
2. **적절한 yield 사용**: 용도에 맞는 yield 타입 선택
3. **중지 처리**: 필요시 StopCoroutine()으로 중지
4. **성능 고려**: 너무 많은 코루틴은 성능 저하 가능

---

## 연습 문제

1. 1초마다 "Hello"를 출력하는 코루틴을 작성하세요.

2. 플레이어가 스페이스바를 누르면 3초 후에 "3초 경과!"를 출력하는 코루틴을 작성하세요.

3. 오브젝트가 서서히 사라지도록 알파값을 0으로 만드는 코루틴을 작성하세요.
