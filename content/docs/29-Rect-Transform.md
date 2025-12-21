---
title: Rect Transform
titleEn: Rect Transform
slugEn: 29-rect-transform
description: Unity UI 시스템에서 사용되는 Rect Transform을 학습합니다. Anchors, Pivot, Rotation 등 UI 배치와 관련된 핵심 개념을 다룹니다.
descriptionEn: Learn about Rect Transform used in Unity UI system. Covers core concepts related to UI placement including Anchors, Pivot, Rotation, and more.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 29
---

# 29. Rect Transform

## Rect Transform이란?

Rect Transform은 Unity UI 시스템에서 사용되는 특수한 Transform입니다. 일반 Transform과 달리 **2D 직사각형 기반**으로 UI 요소의 위치, 크기, 앵커를 관리합니다. Canvas 내의 모든 UI 요소는 Rect Transform을 사용합니다.

## 기본 개념

- **Rect Transform**: UI 요소의 위치와 크기를 관리하는 컴포넌트
- **Anchors (앵커)**: 부모를 기준으로 한 UI 요소의 고정점
- **Pivot (피벗)**: UI 요소 자체의 회전/크기 조절 기준점
- **Rotation**: UI 요소의 회전 각도

## Rect Transform vs Transform

### 일반 Transform

```csharp
using UnityEngine;

public class NormalTransform : MonoBehaviour
{
    void Start()
    {
        // 일반 3D 오브젝트의 Transform
        Transform normalTransform = transform;
        
        // 위치 설정 (3D 좌표)
        normalTransform.position = new Vector3(0, 0, 0);
        
        // 크기 설정 (3D 스케일)
        normalTransform.localScale = new Vector3(1, 1, 1);
    }
}
```

### Rect Transform

```csharp
using UnityEngine;
using UnityEngine.UI;

public class RectTransformExample : MonoBehaviour
{
    void Start()
    {
        // UI 요소의 Rect Transform
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 위치 설정 (2D 좌표, Z는 보통 0)
        rectTransform.anchoredPosition = new Vector2(100, 50);
        
        // 크기 설정 (2D 크기)
        rectTransform.sizeDelta = new Vector2(200, 100);
    }
}
```

### 차이점

| 항목 | Transform | Rect Transform |
|------|-----------|----------------|
| 용도 | 3D 오브젝트 | UI 요소 |
| 좌표계 | 3D (X, Y, Z) | 2D (X, Y) |
| 위치 | `position` | `anchoredPosition` |
| 크기 | `localScale` | `sizeDelta` |
| 앵커 | 없음 | 있음 (Anchors) |

## Anchors (앵커)

### 앵커란?

앵커는 UI 요소가 부모를 기준으로 **어디에 고정될지**를 결정하는 점입니다. 화면 크기가 변경되어도 앵커를 기준으로 UI 요소의 상대적 위치가 유지됩니다.

### 앵커 설정

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorExample : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 앵커를 왼쪽 위 모서리에 설정
        // anchorMin: 왼쪽 아래 (0, 0)
        // anchorMax: 오른쪽 위 (1, 1)
        rectTransform.anchorMin = new Vector2(0, 1);  // 왼쪽 위
        rectTransform.anchorMax = new Vector2(0, 1);  // 왼쪽 위 (점)
        
        // 앵커 위치 기준으로 오프셋 설정
        rectTransform.anchoredPosition = new Vector2(10, -10);
    }
}
```

### 앵커 프리셋

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorPresets : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    // 왼쪽 위
    void SetAnchorTopLeft()
    {
        rectTransform.anchorMin = new Vector2(0, 1);
        rectTransform.anchorMax = new Vector2(0, 1);
    }
    
    // 오른쪽 위
    void SetAnchorTopRight()
    {
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
    }
    
    // 왼쪽 아래
    void SetAnchorBottomLeft()
    {
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);
    }
    
    // 오른쪽 아래
    void SetAnchorBottomRight()
    {
        rectTransform.anchorMin = new Vector2(1, 0);
        rectTransform.anchorMax = new Vector2(1, 0);
    }
    
    // 중앙
    void SetAnchorCenter()
    {
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
    }
    
    // 전체 영역 (스트레치)
    void SetAnchorStretch()
    {
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(1, 1);
        rectTransform.sizeDelta = Vector2.zero;  // 앵커 영역에 맞춤
    }
}
```

### 앵커 영역 (Anchor 영역)

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorArea : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 앵커 영역 설정 (부모의 20%~80% 영역)
        rectTransform.anchorMin = new Vector2(0.2f, 0.2f);  // 왼쪽 아래 20%
        rectTransform.anchorMax = new Vector2(0.8f, 0.8f);  // 오른쪽 위 80%
        
        // 오프셋을 0으로 설정하면 앵커 영역에 맞춤
        rectTransform.offsetMin = Vector2.zero;  // 왼쪽 아래 오프셋
        rectTransform.offsetMax = Vector2.zero;  // 오른쪽 위 오프셋
    }
}
```

## Pivot (피벗)

### 피벗이란?

피벗은 UI 요소의 **회전과 크기 조절의 기준점**입니다. 피벗 위치에 따라 회전 중심과 크기 조절 기준이 달라집니다.

### 피벗 설정

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotExample : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 피벗을 중앙에 설정 (0.5, 0.5)
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        
        // 피벗을 왼쪽 위에 설정 (0, 1)
        rectTransform.pivot = new Vector2(0, 1);
        
        // 피벗을 오른쪽 아래에 설정 (1, 0)
        rectTransform.pivot = new Vector2(1, 0);
    }
}
```

### 피벗 프리셋

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotPresets : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    // 중앙 (기본값)
    void SetPivotCenter()
    {
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
    
    // 왼쪽 위
    void SetPivotTopLeft()
    {
        rectTransform.pivot = new Vector2(0, 1);
    }
    
    // 오른쪽 위
    void SetPivotTopRight()
    {
        rectTransform.pivot = new Vector2(1, 1);
    }
    
    // 왼쪽 아래
    void SetPivotBottomLeft()
    {
        rectTransform.pivot = new Vector2(0, 0);
    }
    
    // 오른쪽 아래
    void SetPivotBottomRight()
    {
        rectTransform.pivot = new Vector2(1, 0);
    }
}
```

### 피벗과 회전

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotRotation : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    void Update()
    {
        // 피벗을 왼쪽 위로 설정하고 회전
        rectTransform.pivot = new Vector2(0, 1);
        rectTransform.Rotate(0, 0, 45);  // 왼쪽 위를 기준으로 회전
        
        // 피벗을 중앙으로 설정하고 회전
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        rectTransform.Rotate(0, 0, 45);  // 중앙을 기준으로 회전
    }
}
```

## Rotation (회전)

### 기본 회전

```csharp
using UnityEngine;
using UnityEngine.UI;

public class UIRotation : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    void Update()
    {
        // Z축 기준으로 회전 (2D UI)
        rectTransform.Rotate(0, 0, 90 * Time.deltaTime);
        
        // 또는 직접 각도 설정
        rectTransform.rotation = Quaternion.Euler(0, 0, 45);
    }
}
```

### 피벗 기준 회전

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotBasedRotation : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 피벗을 왼쪽 위로 설정
        rectTransform.pivot = new Vector2(0, 1);
        
        // 피벗 기준으로 45도 회전
        rectTransform.rotation = Quaternion.Euler(0, 0, 45);
    }
}
```

### 회전 애니메이션

```csharp
using UnityEngine;
using UnityEngine.UI;

public class RotationAnimation : MonoBehaviour
{
    RectTransform rectTransform;
    public float rotationSpeed = 90f;  // 초당 회전 각도
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    void Update()
    {
        // 지속적으로 회전
        rectTransform.Rotate(0, 0, rotationSpeed * Time.deltaTime);
    }
}
```

## 주요 속성

### anchoredPosition

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchoredPosition : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 앵커 기준 상대 위치 설정
        rectTransform.anchoredPosition = new Vector2(100, 50);
        
        // 현재 앵커 위치 가져오기
        Vector2 currentPos = rectTransform.anchoredPosition;
    }
}
```

### sizeDelta

```csharp
using UnityEngine;
using UnityEngine.UI;

public class SizeDelta : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 크기 설정 (앵커가 점일 때만 의미 있음)
        rectTransform.sizeDelta = new Vector2(200, 100);
        
        // 현재 크기 가져오기
        Vector2 currentSize = rectTransform.sizeDelta;
    }
}
```

### offsetMin / offsetMax

```csharp
using UnityEngine;
using UnityEngine.UI;

public class OffsetExample : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 왼쪽 아래 오프셋
        rectTransform.offsetMin = new Vector2(10, 10);
        
        // 오른쪽 위 오프셋
        rectTransform.offsetMax = new Vector2(-10, -10);
        
        // 앵커 영역에 맞춤 (오프셋 0)
        rectTransform.offsetMin = Vector2.zero;
        rectTransform.offsetMax = Vector2.zero;
    }
}
```

## 실전 활용 예시

### 예시 1: 화면 크기에 맞춘 UI 배치

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ResponsiveUI : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 화면 오른쪽 위에 고정
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
        rectTransform.anchoredPosition = new Vector2(-50, -50);
        
        // 화면 크기가 변경되어도 오른쪽 위에 유지됨
    }
}
```

### 예시 2: 중앙 정렬 UI

```csharp
using UnityEngine;
using UnityEngine.UI;

public class CenterAlignedUI : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 중앙에 배치
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
        rectTransform.anchoredPosition = Vector2.zero;
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
}
```

### 예시 3: 전체 화면 배경

```csharp
using UnityEngine;
using UnityEngine.UI;

public class FullScreenBackground : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 전체 화면에 맞춤
        rectTransform.anchorMin = Vector2.zero;
        rectTransform.anchorMax = Vector2.one;
        rectTransform.offsetMin = Vector2.zero;
        rectTransform.offsetMax = Vector2.zero;
    }
}
```

### 예시 4: 피벗 기준 회전 버튼

```csharp
using UnityEngine;
using UnityEngine.UI;

public class RotatingButton : MonoBehaviour
{
    RectTransform rectTransform;
    public float rotationAngle = 0f;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 피벗을 중앙으로 설정
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
    
    void Update()
    {
        // 피벗 기준으로 회전
        rectTransform.rotation = Quaternion.Euler(0, 0, rotationAngle);
        rotationAngle += 90f * Time.deltaTime;
    }
}
```

### 예시 5: 동적 UI 크기 조절

```csharp
using UnityEngine;
using UnityEngine.UI;

public class DynamicUISize : MonoBehaviour
{
    RectTransform rectTransform;
    public float targetWidth = 200f;
    public float targetHeight = 100f;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    void Update()
    {
        // 크기 조절 (앵커가 점일 때)
        if (rectTransform.anchorMin == rectTransform.anchorMax)
        {
            rectTransform.sizeDelta = new Vector2(targetWidth, targetHeight);
        }
    }
}
```

## 주의사항

1. **앵커와 크기**: 앵커가 점(anchorMin == anchorMax)일 때만 `sizeDelta`가 의미 있음
2. **앵커 영역**: 앵커가 영역(anchorMin != anchorMax)일 때는 `offsetMin/offsetMax` 사용
3. **피벗과 위치**: 피벗을 변경하면 `anchoredPosition`이 달라 보일 수 있음
4. **회전**: UI는 보통 Z축만 회전 (2D UI이므로)

## 실전 활용 팁

### 팁 1: 앵커와 피벗 조합

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorPivotCombination : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // 앵커: 오른쪽 위
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
        
        // 피벗: 왼쪽 위 (버튼의 왼쪽 위가 앵커에 맞춤)
        rectTransform.pivot = new Vector2(0, 1);
        
        // 오프셋 설정
        rectTransform.anchoredPosition = new Vector2(-10, -10);
    }
}
```

### 팁 2: 코드로 앵커 프리셋 적용

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorPresetHelper : MonoBehaviour
{
    public static void SetAnchorPreset(RectTransform rectTransform, int preset)
    {
        // 0: 왼쪽 위, 1: 오른쪽 위, 2: 왼쪽 아래, 3: 오른쪽 아래
        // 4: 중앙, 5: 전체 영역
        
        switch (preset)
        {
            case 0: // 왼쪽 위
                rectTransform.anchorMin = new Vector2(0, 1);
                rectTransform.anchorMax = new Vector2(0, 1);
                rectTransform.pivot = new Vector2(0, 1);
                break;
            case 1: // 오른쪽 위
                rectTransform.anchorMin = new Vector2(1, 1);
                rectTransform.anchorMax = new Vector2(1, 1);
                rectTransform.pivot = new Vector2(1, 1);
                break;
            case 4: // 중앙
                rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
                rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                rectTransform.pivot = new Vector2(0.5f, 0.5f);
                break;
        }
    }
}
```

### 팁 3: UI 요소 찾기

```csharp
using UnityEngine;
using UnityEngine.UI;

public class FindUIElement : MonoBehaviour
{
    void Start()
    {
        // RectTransform 가져오기
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // 또는 UI 컴포넌트에서 가져오기
        Button button = GetComponent<Button>();
        if (button != null)
        {
            RectTransform buttonRect = button.GetComponent<RectTransform>();
        }
    }
}
```

---

[← 목차로 돌아가기](../README.md)

