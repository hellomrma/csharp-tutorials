---
title: "적 AI - 상태 머신과 Invoke"
titleEn: "Enemy AI – State Machine and Invoke"
category: "실전"
categoryEn: "Practice"
order: 54
description: "enum 기반 상태 머신으로 적 AI를 구현합니다. OverlapSphere로 주변 랩터를 탐지하고, MoveTowards로 추격하며, Invoke로 중복 타겟팅을 방지하는 패턴을 학습합니다"
descriptionEn: "Implement enemy AI with an enum-based state machine. Detect nearby raptors with OverlapSphere, chase them with MoveTowards, and prevent duplicate targeting with Invoke"
slugEn: "54-enemy-ai-state-machine-invoke"
tags: ["State Machine", "Invoke", "Vector3.MoveTowards", "Vector3.Distance", "OverlapSphere", "Animator", "Raptor"]
---

# 54. 적 AI - 상태 머신과 Invoke

수학 달리기 게임에는 맵에 배치된 적 랩터가 있습니다. 적은 처음에 가만히 서 있다가(`Idle`) 근처에 플레이어 랩터가 오면 달려가(`Run`) 잡습니다. 이 동작을 **enum 기반 상태 머신**으로 구현합니다. 여러 적이 동시에 같은 랩터를 쫓는 것을 `Invoke`로 방지하고, `Vector3.MoveTowards`로 부드럽게 이동합니다.

---

## 게임 구조

| 스크립트 | 역할 |
|----------|------|
| `Raptor` | 플레이어 랩터 - 타겟 지정 여부 관리 |
| `Enermy` | 적 AI - 탐지·추격·포획 상태 머신 |
| `EnermyRaptors` | 적 그룹 생성기 - 피보나치 나선으로 적 배치 |

---

## Raptor - 타겟 관리

```csharp
using UnityEngine;

public class Raptor : MonoBehaviour
{
    private bool isTarget;  // 이미 적에게 타겟으로 지정됐는지

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

`Raptor`는 단순한 데이터 클래스입니다. `isTarget` 하나로 "이미 다른 적이 쫓고 있는지"를 기록해 중복 타겟팅을 방지합니다.

---

## Enermy - 전체 코드

```csharp
using System.Collections;
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
        GetComponent<Animator>().speed = 0f;  // 처음엔 정지 애니메이션
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
        if (isTargetOn) return;  // 이미 타겟 지정됨

        Collider[] hitColliders = Physics.OverlapSphere(transform.position, detectRadius);
        foreach (Collider col in hitColliders)
        {
            Raptor raptor = col.GetComponent<Raptor>();
            if (raptor != null && !raptor.IsTarget())
            {
                Invoke("SetTargetDino", 0.1f);   // 0.1초 지연 후 타겟 확정
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
        GetComponent<Animator>().speed = 1f;  // 달리기 애니메이션 시작
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
            Destroy(targetRaptor.gameObject);  // 랩터 제거
            Destroy(this.gameObject);          // 자신도 제거
        }
    }
}
```

---

## EnermyRaptors - 적 그룹 생성

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

## 핵심 개념 설명

### 1. enum 상태 머신

```csharp
enum State { Idle, Run }

private State state;  // 현재 상태

private void SetState()
{
    switch (state)
    {
        case State.Idle: DetectDino(); break;
        case State.Run:  GoToDino();   break;
    }
}
```

**상태 머신(State Machine)** 은 오브젝트가 특정 상태 중 하나에만 있을 수 있고, 조건에 따라 상태가 전환되는 패턴입니다.

```
[Idle] → (랩터 감지) → [Run] → (포획) → (소멸)
```

- `Idle` 상태: `DetectDino()`를 매 프레임 호출해 주변 랩터를 탐색합니다.
- `Run` 상태: `GoToDino()`를 매 프레임 호출해 타겟을 향해 이동합니다.
- 상태 전환은 `StartGotoDino()`에서 `state = State.Run`으로 변경합니다.

`switch`문이 if-else보다 상태 머신에 적합한 이유: 상태가 늘어나도 각 케이스를 독립적으로 추가하면 됩니다.

---

### 2. Invoke - 지연 호출

```csharp
Invoke("SetTargetDino", 0.1f);  // 0.1초 후 SetTargetDino() 호출
```

`Invoke(메서드명, 지연시간)`은 지정한 초 후에 메서드를 한 번 호출합니다.

**왜 0.1초 지연이 필요한가?**

여러 적이 동시에 같은 랩터를 탐지할 수 있습니다. 만약 타겟 지정이 즉각 처리된다면 이렇게 됩니다:

```
적 A: 랩터1 감지 → 즉시 SetTarget() → isTarget=true
적 B: 랩터1 감지 (같은 프레임) → IsTarget()=false 읽음 (아직 업데이트 전) → 중복 타겟!
```

0.1초 지연으로 타겟이 확정되는 시점을 분리합니다:
```
적 A: 0.1초 예약 → SetTargetDino() → SetTarget()
적 B: DetectDino()에서 isTargetOn=true 확인 → return (중복 방지)
```

- `isTargetOn`: 이 적이 타겟 예약을 했는지 (`DetectDino`에서 중복 예약 방지)
- `raptor.IsTarget()`: 해당 랩터가 이미 다른 적에게 타겟됐는지 (`SetTargetDino`에서 확인)

---

### 3. Vector3.MoveTowards - 일정 속도로 이동

```csharp
transform.position = Vector3.MoveTowards(
    transform.position,      // 현재 위치
    targetRaptor.position,   // 목표 위치
    moveSpeed * Time.deltaTime  // 이번 프레임 최대 이동 거리
);
```

`Vector3.MoveTowards`는 현재 위치에서 목표 위치 방향으로 최대 `maxDistance`만큼 이동한 위치를 반환합니다. 목표에 정확히 도달하면 목표 위치를 반환해 오버슈팅이 없습니다.

`Vector3.Lerp`와 비교:

| 방법 | 속도 | 특징 |
|------|------|------|
| `MoveTowards` | 일정 | 끝까지 같은 속도, 오버슈팅 없음 |
| `Lerp` | 점점 느려짐 | 처음엔 빠르고 가까워질수록 느려짐 |

추격 AI에는 `MoveTowards`가 더 적합합니다.

---

### 4. Vector3.Distance - 거리 측정

```csharp
if (Vector3.Distance(transform.position, targetRaptor.position) < 0.1f)
{
    // 포획 성공
}
```

`Vector3.Distance(a, b)`는 두 점 사이의 거리를 반환합니다. 0.1 미만이면 "충분히 가까움"으로 판단해 포획 처리합니다.

```csharp
// 내부 계산:
// distance = Mathf.Sqrt((b.x-a.x)² + (b.y-a.y)² + (b.z-a.z)²)
```

자주 호출하는 경우 `Mathf.Sqrt`가 느릴 수 있어 `sqrMagnitude`를 쓰기도 합니다:
```csharp
// 최적화 버전 (제곱끼리 비교)
if ((transform.position - targetRaptor.position).sqrMagnitude < 0.01f)
```

이 프로젝트처럼 간단한 게임에서는 가독성이 좋은 `Vector3.Distance`를 사용합니다.

---

### 5. Animator.speed - 애니메이션 재생 속도

```csharp
GetComponent<Animator>().speed = 0f;  // 정지 (Start)
GetComponent<Animator>().speed = 1f;  // 정상 재생 (Run 상태 진입 시)
```

`Animator.speed`를 0으로 설정하면 애니메이션이 현재 프레임에 멈춥니다. 1로 복원하면 정상 재생됩니다. `SetActive(false)`를 쓰지 않고 애니메이션만 정지시킬 때 유용합니다.

---

### 6. null 체크 - targetRaptor 삭제 후 안전성

```csharp
private void GoToDino()
{
    if (targetRaptor == null) return;  // 이미 삭제됐으면 즉시 반환
    // ...
}
```

타겟 랩터가 다른 요인(다른 적, 뺄셈 문 등)으로 먼저 `Destroy`된 경우, `targetRaptor`는 null이 됩니다. null인 Transform에 접근하면 `NullReferenceException`이 발생하므로 반드시 null 체크가 필요합니다.

---

## Unity 씬 설정

| 항목 | 설정 |
|------|------|
| 적 랩터 프리팹 | `Enermy` + `Animator` + `Collider` 부착 |
| `detectRadius` | 2~3 정도로 시작 |
| `moveSpeed` | 2~4 정도 (플레이어 속도보다 약간 느리게) |
| `EnermyRaptors` | 맵 세그먼트에 배치, 부모 Transform 할당 |
| 플레이어 랩터 프리팹 | `Raptor` 컴포넌트 부착 |
