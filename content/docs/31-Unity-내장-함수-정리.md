---
title: Unity 내장 함수 정리
titleEn: Unity Built-in Functions Reference
slugEn: 31-unity-built-in-functions-reference
description: Unity에서 자주 사용하는 내장 함수들을 체계적으로 정리한 참고 문서입니다. Input, Transform, Time, Vector3, GameObject 등 주요 클래스의 함수들을 학습합니다.
descriptionEn: A comprehensive reference guide for commonly used Unity built-in functions. Learn about functions from Input, Transform, Time, Vector3, GameObject, and other essential classes.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 31
---

# 31. Unity 내장 함수 정리

## Unity 내장 함수란?

Unity 내장 함수는 Unity 엔진에서 제공하는 미리 만들어진 함수들입니다. 게임 오브젝트를 이동시키고, 회전시키고, 사용자 입력을 받고, 시간을 관리하는 등 게임 개발에 필요한 다양한 기능을 제공합니다.

## 기본 개념

- **클래스**: 관련된 함수들을 묶어놓은 그룹 (예: Input, Transform, Time)
- **정적 함수**: 클래스 이름으로 직접 호출 (예: `Input.GetKeyDown()`)
- **인스턴스 함수**: 객체를 통해 호출 (예: `transform.Rotate()`)
- **프레임 독립성**: `Time.deltaTime`을 사용하여 프레임률과 무관하게 일정한 속도 유지

---

## 1. Input 클래스 - 입력 처리

Input 클래스는 키보드, 마우스, 조이스틱 등 사용자 입력을 처리합니다.

### 키보드 입력

#### Input.GetKeyDown() - 키를 누른 순간

```csharp
using UnityEngine;

public class KeyInput : MonoBehaviour
{
    void Update()
    {
        // 특정 키를 누른 순간 한 번만 true 반환
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("스페이스바를 눌렀습니다!");
        }
        
        if (Input.GetKeyDown(KeyCode.W))
        {
            Debug.Log("W 키를 눌렀습니다!");
        }
    }
}
```

**특징:**
- 키를 누른 순간 **한 번만** true 반환
- 키를 계속 누르고 있어도 한 번만 true
- 키 입력 시작을 감지할 때 사용

#### Input.GetKey() - 키를 누르고 있는 동안

```csharp
using UnityEngine;

public class KeyHold : MonoBehaviour
{
    void Update()
    {
        // 키를 누르고 있는 동안 계속 true 반환
        if (Input.GetKey(KeyCode.W))
        {
            Debug.Log("W 키를 누르고 있습니다!");
            // 이동 등의 연속 동작에 사용
        }
    }
}
```

**특징:**
- 키를 누르고 있는 동안 **계속** true 반환
- 연속적인 동작 (이동, 회전 등)에 사용

#### Input.GetKeyUp() - 키를 뗀 순간

```csharp
using UnityEngine;

public class KeyRelease : MonoBehaviour
{
    void Update()
    {
        // 키를 뗀 순간 한 번만 true 반환
        if (Input.GetKeyUp(KeyCode.Space))
        {
            Debug.Log("스페이스바를 뗐습니다!");
        }
    }
}
```

**특징:**
- 키를 뗀 순간 **한 번만** true 반환
- 키 입력 종료를 감지할 때 사용

#### 주요 KeyCode 목록

```csharp
// 알파벳
KeyCode.A, KeyCode.B, KeyCode.C, ..., KeyCode.Z

// 숫자
KeyCode.Alpha0, KeyCode.Alpha1, ..., KeyCode.Alpha9

// 특수 키
KeyCode.Space        // 스페이스바
KeyCode.Return       // 엔터
KeyCode.Escape       // ESC
KeyCode.LeftShift    // 왼쪽 Shift
KeyCode.RightShift   // 오른쪽 Shift
KeyCode.LeftControl  // 왼쪽 Ctrl
KeyCode.RightControl // 오른쪽 Ctrl

// 방향키
KeyCode.UpArrow      // 위쪽 화살표
KeyCode.DownArrow    // 아래쪽 화살표
KeyCode.LeftArrow    // 왼쪽 화살표
KeyCode.RightArrow   // 오른쪽 화살표

// 마우스 버튼
KeyCode.Mouse0       // 왼쪽 버튼
KeyCode.Mouse1       // 오른쪽 버튼
KeyCode.Mouse2       // 가운데 버튼
```

### 마우스 입력

#### Input.GetMouseButtonDown() - 마우스 버튼을 누른 순간

```csharp
using UnityEngine;

public class MouseClick : MonoBehaviour
{
    void Update()
    {
        // 왼쪽 버튼 클릭 (한 번만)
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("왼쪽 클릭!");
        }
        
        // 오른쪽 버튼 클릭
        if (Input.GetMouseButtonDown(1))
        {
            Debug.Log("오른쪽 클릭!");
        }
        
        // 가운데 버튼 클릭
        if (Input.GetMouseButtonDown(2))
        {
            Debug.Log("가운데 클릭!");
        }
    }
}
```

**마우스 버튼 번호:**
- **0**: 왼쪽 버튼
- **1**: 오른쪽 버튼
- **2**: 가운데 버튼 (휠 클릭)

#### Input.GetMouseButton() - 마우스 버튼을 누르고 있는 동안

```csharp
using UnityEngine;

public class MouseDrag : MonoBehaviour
{
    void Update()
    {
        // 왼쪽 버튼을 누르고 있는 동안
        if (Input.GetMouseButton(0))
        {
            Debug.Log("드래그 중!");
        }
    }
}
```

#### Input.GetMouseButtonUp() - 마우스 버튼을 뗀 순간

```csharp
using UnityEngine;

public class MouseRelease : MonoBehaviour
{
    void Update()
    {
        // 왼쪽 버튼을 뗀 순간
        if (Input.GetMouseButtonUp(0))
        {
            Debug.Log("드래그 종료!");
        }
    }
}
```

#### Input.mousePosition - 마우스 위치

```csharp
using UnityEngine;

public class MousePosition : MonoBehaviour
{
    void Update()
    {
        // 현재 마우스 위치 (화면 좌표계)
        Vector3 mousePos = Input.mousePosition;
        
        // X, Y 좌표 출력
        Debug.Log($"마우스 X: {mousePos.x}, Y: {mousePos.y}");
        
        // 화면 크기 정보
        float screenWidth = Screen.width;   // 화면 너비 (픽셀)
        float screenHeight = Screen.height; // 화면 높이 (픽셀)
        
        // 정규화된 위치 (0~1)
        float normalizedX = mousePos.x / screenWidth;
        float normalizedY = mousePos.y / screenHeight;
    }
}
```

**특징:**
- **화면 좌표계**: 왼쪽 아래가 (0, 0), 오른쪽 위가 (Screen.width, Screen.height)
- **픽셀 단위**: 화면 해상도에 따라 값이 달라짐
- **Z 값**: 항상 0 (카메라와의 거리)

#### Input.GetAxis() - 가상 입력 축

```csharp
using UnityEngine;

public class AxisInput : MonoBehaviour
{
    void Update()
    {
        // 수평 입력 (A/D, 왼쪽/오른쪽 화살표)
        float horizontal = Input.GetAxis("Horizontal");
        
        // 수직 입력 (W/S, 위/아래 화살표)
        float vertical = Input.GetAxis("Vertical");
        
        // -1.0 ~ 1.0 사이의 부드러운 값 반환
        Debug.Log($"Horizontal: {horizontal}, Vertical: {vertical}");
    }
}
```

**특징:**
- **부드러운 값**: -1.0 ~ 1.0 사이의 부드러운 값 반환 (가속/감속 포함)
- **기본 축**: "Horizontal", "Vertical", "Mouse X", "Mouse Y", "Fire1", "Fire2", "Fire3"
- **설정**: Edit > Project Settings > Input Manager에서 축 설정 가능

#### Input.GetAxisRaw() - 가상 입력 축 (부드러움 없음)

```csharp
using UnityEngine;

public class RawAxisInput : MonoBehaviour
{
    void Update()
    {
        // 즉시 -1, 0, 1 중 하나의 값 반환 (부드러움 없음)
        float horizontal = Input.GetAxisRaw("Horizontal");
        float vertical = Input.GetAxisRaw("Vertical");
    }
}
```

**특징:**
- **즉시 반응**: -1, 0, 1 중 하나의 값만 반환
- **부드러움 없음**: 가속/감속 효과 없이 즉시 반응

---

## 2. Transform 클래스 - 변환 (이동, 회전, 크기)

Transform 클래스는 게임 오브젝트의 위치, 회전, 크기를 관리합니다.

### 위치 (Position)

#### transform.position - 월드 좌표계 위치

```csharp
using UnityEngine;

public class PositionControl : MonoBehaviour
{
    void Update()
    {
        // 현재 위치 가져오기
        Vector3 currentPos = transform.position;
        
        // 위치 설정
        transform.position = new Vector3(0, 0, 0);
        
        // X 좌표만 변경
        transform.position = new Vector3(5, transform.position.y, transform.position.z);
        
        // 간단한 방법
        transform.position = new Vector3(5, 0, 0);
    }
}
```

#### transform.localPosition - 로컬 좌표계 위치

```csharp
using UnityEngine;

public class LocalPosition : MonoBehaviour
{
    void Update()
    {
        // 부모 기준 상대 위치
        transform.localPosition = new Vector3(1, 0, 0);
    }
}
```

**차이점:**
- **position**: 월드 좌표계 (절대 위치)
- **localPosition**: 로컬 좌표계 (부모 기준 상대 위치)

### 회전 (Rotation)

#### transform.Rotate() - 회전 적용

```csharp
using UnityEngine;

public class RotateObject : MonoBehaviour
{
    void Update()
    {
        // Z축 기준으로 90도 회전 (프레임마다)
        transform.Rotate(0, 0, 90);
        
        // 초당 90도 회전 (프레임 독립적)
        transform.Rotate(0, 0, 90 * Time.deltaTime);
        
        // X축 기준으로 회전
        transform.Rotate(90 * Time.deltaTime, 0, 0);
        
        // Y축 기준으로 회전
        transform.Rotate(0, 90 * Time.deltaTime, 0);
    }
}
```

**파라미터:**
- **첫 번째**: X축 회전 각도 (도 단위)
- **두 번째**: Y축 회전 각도 (도 단위)
- **세 번째**: Z축 회전 각도 (도 단위)

#### transform.rotation - 회전 값 설정

```csharp
using UnityEngine;

public class SetRotation : MonoBehaviour
{
    void Update()
    {
        // Quaternion으로 회전 설정
        transform.rotation = Quaternion.Euler(0, 90, 0);
        
        // 현재 회전 값 가져오기
        Quaternion currentRot = transform.rotation;
    }
}
```

#### transform.localRotation - 로컬 회전

```csharp
using UnityEngine;

public class LocalRotation : MonoBehaviour
{
    void Update()
    {
        // 부모 기준 상대 회전
        transform.localRotation = Quaternion.Euler(0, 45, 0);
    }
}
```

#### transform.LookAt() - 특정 방향 바라보기

```csharp
using UnityEngine;

public class LookAtTarget : MonoBehaviour
{
    public Transform target;  // 바라볼 대상
    
    void Update()
    {
        // target을 바라보도록 회전
        transform.LookAt(target);
        
        // 특정 위치를 바라보기
        transform.LookAt(new Vector3(0, 0, 0));
    }
}
```

### 이동 (Translation)

#### transform.Translate() - 이동 적용

```csharp
using UnityEngine;

public class MoveObject : MonoBehaviour
{
    public float speed = 5f;
    
    void Update()
    {
        // 앞으로 이동 (로컬 좌표계 기준)
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        
        // 오른쪽으로 이동
        transform.Translate(Vector3.right * speed * Time.deltaTime);
        
        // 위로 이동
        transform.Translate(Vector3.up * speed * Time.deltaTime);
        
        // 월드 좌표계 기준으로 이동
        transform.Translate(Vector3.forward * speed * Time.deltaTime, Space.World);
    }
}
```

**Space 파라미터:**
- **Space.Self** (기본값): 로컬 좌표계 기준
- **Space.World**: 월드 좌표계 기준

### 크기 (Scale)

#### transform.localScale - 크기 설정

```csharp
using UnityEngine;

public class ScaleObject : MonoBehaviour
{
    void Update()
    {
        // 크기 설정 (1 = 원래 크기)
        transform.localScale = new Vector3(2, 2, 2);  // 2배 확대
        
        // X축만 확대
        transform.localScale = new Vector3(2, 1, 1);
        
        // 크기 가져오기
        Vector3 currentScale = transform.localScale;
    }
}
```

---

## 3. Time 클래스 - 시간 관리

Time 클래스는 시간과 관련된 정보를 제공합니다.

### Time.deltaTime - 프레임 간 시간

```csharp
using UnityEngine;

public class TimeBasedMovement : MonoBehaviour
{
    public float speed = 5f;
    
    void Update()
    {
        // 프레임 독립적인 이동
        // deltaTime: 이전 프레임과 현재 프레임 사이의 시간 (초 단위)
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        
        // 회전도 프레임 독립적으로
        transform.Rotate(0, 90 * Time.deltaTime, 0);
    }
}
```

**특징:**
- **프레임 독립성**: 프레임률과 무관하게 일정한 속도 유지
- **단위**: 초 단위 (예: 60fps면 약 0.016초)
- **필수 사용**: 이동, 회전 등 연속적인 동작에 반드시 사용

### Time.time - 게임 시작 후 경과 시간

```csharp
using UnityEngine;

public class GameTime : MonoBehaviour
{
    void Update()
    {
        // 게임 시작 후 경과 시간 (초 단위)
        float elapsedTime = Time.time;
        Debug.Log($"경과 시간: {elapsedTime}초");
        
        // 5초마다 실행
        if (Mathf.FloorToInt(Time.time) % 5 == 0)
        {
            Debug.Log("5초 경과!");
        }
    }
}
```

### Time.timeScale - 시간 배율

```csharp
using UnityEngine;

public class TimeScale : MonoBehaviour
{
    void Update()
    {
        // 시간 배율 설정
        Time.timeScale = 1.0f;   // 정상 속도
        Time.timeScale = 0.5f;  // 절반 속도 (슬로우 모션)
        Time.timeScale = 2.0f;  // 2배 속도 (빠른 모션)
        Time.timeScale = 0f;    // 시간 정지 (일시정지)
    }
}
```

**주의사항:**
- `Time.timeScale = 0`일 때 `Time.deltaTime`도 0이 됨
- 일시정지 시 `Time.unscaledDeltaTime` 사용

### Time.unscaledDeltaTime - 시간 배율 무시

```csharp
using UnityEngine;

public class UnscaledTime : MonoBehaviour
{
    void Update()
    {
        // timeScale의 영향을 받지 않는 deltaTime
        // UI 애니메이션 등에 사용
        float delta = Time.unscaledDeltaTime;
    }
}
```

---

## 4. Vector3, Vector2 - 벡터 연산

Vector3와 Vector2는 3D/2D 공간의 위치, 방향, 크기를 나타냅니다.

### Vector3 기본 사용

```csharp
using UnityEngine;

public class VectorExample : MonoBehaviour
{
    void Start()
    {
        // Vector3 생성
        Vector3 position = new Vector3(1, 2, 3);
        Vector3 direction = new Vector3(0, 1, 0);
        
        // 미리 정의된 벡터
        Vector3 forward = Vector3.forward;  // (0, 0, 1)
        Vector3 up = Vector3.up;            // (0, 1, 0)
        Vector3 right = Vector3.right;      // (1, 0, 0)
        Vector3 zero = Vector3.zero;       // (0, 0, 0)
        Vector3 one = Vector3.one;         // (1, 1, 1)
    }
}
```

### 벡터 연산

```csharp
using UnityEngine;

public class VectorOperations : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(1, 2, 3);
        Vector3 b = new Vector3(4, 5, 6);
        
        // 덧셈
        Vector3 sum = a + b;  // (5, 7, 9)
        
        // 뺄셈
        Vector3 diff = b - a;  // (3, 3, 3)
        
        // 스칼라 곱셈
        Vector3 scaled = a * 2;  // (2, 4, 6)
        
        // 내적 (Dot Product)
        float dot = Vector3.Dot(a, b);
        
        // 외적 (Cross Product)
        Vector3 cross = Vector3.Cross(a, b);
        
        // 거리
        float distance = Vector3.Distance(a, b);
        
        // 정규화 (단위 벡터)
        Vector3 normalized = a.normalized;
        
        // 크기 (길이)
        float magnitude = a.magnitude;
    }
}
```

### Vector3.Lerp() - 선형 보간

```csharp
using UnityEngine;

public class LerpExample : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // 현재 위치에서 target 위치로 부드럽게 이동
        // t 값: 0 (시작) ~ 1 (끝)
        float t = Time.deltaTime * 2f;  // 이동 속도
        transform.position = Vector3.Lerp(transform.position, target.position, t);
    }
}
```

### Vector3.Slerp() - 구면 선형 보간

```csharp
using UnityEngine;

public class SlerpExample : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // 구면 선형 보간 (회전에 유용)
        float t = Time.deltaTime * 2f;
        transform.position = Vector3.Slerp(transform.position, target.position, t);
    }
}
```

---

## 5. GameObject 클래스 - 게임 오브젝트 관리

GameObject 클래스는 게임 오브젝트를 생성, 찾기, 관리합니다.

### GameObject.Find() - 이름으로 찾기

```csharp
using UnityEngine;

public class FindObject : MonoBehaviour
{
    void Start()
    {
        // 이름으로 게임 오브젝트 찾기
        GameObject player = GameObject.Find("Player");
        
        if (player != null)
        {
            Debug.Log("플레이어를 찾았습니다!");
        }
    }
}
```

**주의사항:**
- 비활성화된 오브젝트는 찾을 수 없음
- 성능이 느릴 수 있음 (가능하면 다른 방법 사용)

### GameObject.FindWithTag() - 태그로 찾기

```csharp
using UnityEngine;

public class FindByTag : MonoBehaviour
{
    void Start()
    {
        // 태그로 게임 오브젝트 찾기
        GameObject player = GameObject.FindWithTag("Player");
        
        // 태그가 같은 모든 오브젝트 찾기
        GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
    }
}
```

### GameObject.FindObjectOfType() - 타입으로 찾기

```csharp
using UnityEngine;

public class FindByType : MonoBehaviour
{
    void Start()
    {
        // 특정 컴포넌트를 가진 오브젝트 찾기
        PlayerController player = FindObjectOfType<PlayerController>();
        
        // 모든 오브젝트 찾기
        Enemy[] allEnemies = FindObjectsOfType<Enemy>();
    }
}
```

### GetComponent() - 컴포넌트 가져오기

```csharp
using UnityEngine;

public class GetComponentExample : MonoBehaviour
{
    void Start()
    {
        // 같은 게임 오브젝트의 컴포넌트 가져오기
        Rigidbody rb = GetComponent<Rigidbody>();
        
        // 다른 게임 오브젝트의 컴포넌트 가져오기
        GameObject player = GameObject.Find("Player");
        if (player != null)
        {
            PlayerController controller = player.GetComponent<PlayerController>();
        }
    }
}
```

### SetActive() - 활성화/비활성화

```csharp
using UnityEngine;

public class ActivateObject : MonoBehaviour
{
    public GameObject target;
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // 활성화
            target.SetActive(true);
        }
        
        if (Input.GetKeyDown(KeyCode.H))
        {
            // 비활성화
            target.SetActive(false);
        }
    }
}
```

---

## 6. Mathf 클래스 - 수학 함수

Mathf 클래스는 수학 연산을 위한 유틸리티 함수들을 제공합니다.

### Mathf.Abs() - 절댓값

```csharp
using UnityEngine;

public class MathExample : MonoBehaviour
{
    void Start()
    {
        float value = -5.5f;
        float abs = Mathf.Abs(value);  // 5.5
    }
}
```

### Mathf.Clamp() - 값 제한

```csharp
using UnityEngine;

public class ClampExample : MonoBehaviour
{
    public float health = 100f;
    
    void Update()
    {
        // health를 0~100 사이로 제한
        health = Mathf.Clamp(health, 0f, 100f);
        
        // 또는
        health = Mathf.Clamp01(health);  // 0~1 사이로 제한
    }
}
```

### Mathf.Lerp() - 선형 보간

```csharp
using UnityEngine;

public class LerpMath : MonoBehaviour
{
    public float startValue = 0f;
    public float endValue = 10f;
    
    void Update()
    {
        // 0에서 10으로 부드럽게 보간
        float t = Time.time % 1f;  // 0~1 사이 반복
        float value = Mathf.Lerp(startValue, endValue, t);
    }
}
```

### Mathf.MoveTowards() - 목표값으로 이동

```csharp
using UnityEngine;

public class MoveTowards : MonoBehaviour
{
    public float current = 0f;
    public float target = 10f;
    public float speed = 2f;
    
    void Update()
    {
        // target으로 일정 속도로 이동
        current = Mathf.MoveTowards(current, target, speed * Time.deltaTime);
    }
}
```

### 기타 유용한 Mathf 함수

```csharp
using UnityEngine;

public class MoreMath : MonoBehaviour
{
    void Start()
    {
        // 최소값
        float min = Mathf.Min(5, 10, 3);  // 3
        
        // 최대값
        float max = Mathf.Max(5, 10, 3);  // 10
        
        // 반올림
        float rounded = Mathf.Round(5.7f);  // 6
        
        // 내림
        float floor = Mathf.Floor(5.7f);  // 5
        
        // 올림
        float ceil = Mathf.Ceil(5.2f);  // 6
        
        // 제곱근
        float sqrt = Mathf.Sqrt(16f);  // 4
        
        // 거듭제곱
        float power = Mathf.Pow(2f, 3f);  // 8
        
        // 사인, 코사인
        float sin = Mathf.Sin(90f * Mathf.Deg2Rad);
        float cos = Mathf.Cos(90f * Mathf.Deg2Rad);
    }
}
```

---

## 7. Quaternion 클래스 - 회전 표현

Quaternion은 3D 회전을 표현하는 클래스입니다.

### Quaternion.Euler() - 오일러 각도 변환

```csharp
using UnityEngine;

public class QuaternionExample : MonoBehaviour
{
    void Update()
    {
        // 오일러 각도 (도 단위)를 Quaternion으로 변환
        Quaternion rotation = Quaternion.Euler(0, 90, 0);
        transform.rotation = rotation;
        
        // 또는 직접
        transform.rotation = Quaternion.Euler(0, 90, 0);
    }
}
```

### Quaternion.Lerp() - 회전 보간

```csharp
using UnityEngine;

public class RotateLerp : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // 현재 회전에서 target 회전으로 부드럽게 보간
        float t = Time.deltaTime * 2f;
        transform.rotation = Quaternion.Lerp(
            transform.rotation, 
            target.rotation, 
            t
        );
    }
}
```

### Quaternion.Slerp() - 구면 선형 보간

```csharp
using UnityEngine;

public class RotateSlerp : MonoBehaviour
{
    public Transform target;
    
    void Update()
    {
        // 구면 선형 보간 (회전에 더 자연스러움)
        float t = Time.deltaTime * 2f;
        transform.rotation = Quaternion.Slerp(
            transform.rotation, 
            target.rotation, 
            t
        );
    }
}
```

---

## 8. Debug 클래스 - 디버깅

Debug 클래스는 콘솔에 메시지를 출력하고 디버깅을 도와줍니다.

### Debug.Log() - 메시지 출력

```csharp
using UnityEngine;

public class DebugExample : MonoBehaviour
{
    void Start()
    {
        // 일반 메시지
        Debug.Log("게임 시작!");
        
        // 변수 값 출력
        int score = 100;
        Debug.Log($"점수: {score}");
        
        // 경고 메시지
        Debug.LogWarning("경고 메시지입니다!");
        
        // 에러 메시지
        Debug.LogError("에러가 발생했습니다!");
    }
}
```

---

## 실전 활용 예시

### 예시 1: 키보드로 이동하는 플레이어

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float moveSpeed = 5f;
    
    void Update()
    {
        // 입력 받기
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // 이동 방향 계산
        Vector3 direction = new Vector3(horizontal, 0, vertical);
        
        // 이동 적용
        transform.Translate(direction * moveSpeed * Time.deltaTime);
    }
}
```

### 예시 2: 마우스로 오브젝트 회전

```csharp
using UnityEngine;

public class MouseRotate : MonoBehaviour
{
    public float rotateSpeed = 100f;
    
    void Update()
    {
        // 마우스 X축 입력
        float mouseX = Input.GetAxis("Mouse X");
        
        // Y축 기준으로 회전
        transform.Rotate(0, mouseX * rotateSpeed * Time.deltaTime, 0);
    }
}
```

### 예시 3: 부드러운 카메라 추적

```csharp
using UnityEngine;

public class SmoothFollow : MonoBehaviour
{
    public Transform target;
    public float smoothSpeed = 0.125f;
    public Vector3 offset = new Vector3(0, 5, -10);
    
    void LateUpdate()
    {
        // 목표 위치 계산
        Vector3 desiredPosition = target.position + offset;
        
        // 부드럽게 이동
        Vector3 smoothedPosition = Vector3.Lerp(
            transform.position, 
            desiredPosition, 
            smoothSpeed
        );
        
        transform.position = smoothedPosition;
        
        // 타겟을 바라보기
        transform.LookAt(target);
    }
}
```

### 예시 4: 체력 시스템

```csharp
using UnityEngine;

public class HealthSystem : MonoBehaviour
{
    public float maxHealth = 100f;
    private float currentHealth;
    
    void Start()
    {
        currentHealth = maxHealth;
    }
    
    void Update()
    {
        // 데미지 받기 (테스트용)
        if (Input.GetKeyDown(KeyCode.Space))
        {
            TakeDamage(10f);
        }
        
        // 체력 회복
        if (Input.GetKeyDown(KeyCode.H))
        {
            Heal(5f);
        }
    }
    
    void TakeDamage(float damage)
    {
        currentHealth -= damage;
        currentHealth = Mathf.Clamp(currentHealth, 0f, maxHealth);
        
        Debug.Log($"체력: {currentHealth}/{maxHealth}");
        
        if (currentHealth <= 0)
        {
            Die();
        }
    }
    
    void Heal(float amount)
    {
        currentHealth += amount;
        currentHealth = Mathf.Clamp(currentHealth, 0f, maxHealth);
    }
    
    void Die()
    {
        Debug.Log("사망!");
        gameObject.SetActive(false);
    }
}
```

---

## 주의사항

1. **Time.deltaTime 사용**: 이동, 회전 등 연속적인 동작에는 반드시 `Time.deltaTime`을 곱해야 합니다
2. **Find() 성능**: `GameObject.Find()`는 느릴 수 있으므로 가능하면 다른 방법 사용
3. **GetComponent() 캐싱**: 매 프레임 `GetComponent()`를 호출하지 말고 변수에 저장
4. **좌표계 구분**: `position`과 `localPosition`, `rotation`과 `localRotation`의 차이를 이해
5. **Quaternion 사용**: 회전은 오일러 각도보다 Quaternion 사용 권장

---

## 요약

- **Input**: 사용자 입력 처리 (키보드, 마우스)
- **Transform**: 오브젝트 위치, 회전, 크기 관리
- **Time**: 시간 관리 및 프레임 독립성
- **Vector3/Vector2**: 벡터 연산 및 공간 계산
- **GameObject**: 오브젝트 찾기 및 관리
- **Mathf**: 수학 연산 유틸리티
- **Quaternion**: 회전 표현 및 보간
- **Debug**: 디버깅 메시지 출력

이 함수들을 잘 활용하면 Unity 게임 개발이 훨씬 수월해집니다!

