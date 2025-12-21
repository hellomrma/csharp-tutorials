---
title: Rect Transform
titleEn: Rect Transform
slugEn: 29-rect-transform
description: Learn about Rect Transform used in Unity UI system. Covers core concepts related to UI placement including Anchors, Pivot, Rotation, and more.
descriptionEn: Learn about Rect Transform used in Unity UI system. Covers core concepts related to UI placement including Anchors, Pivot, Rotation, and more.
category: Unity C# Applications
categoryEn: Unity C# Applications
order: 29
---

# 29. Rect Transform

## What is Rect Transform?

Rect Transform is a special Transform used in Unity's UI system. Unlike regular Transform, it manages UI element position, size, and anchors based on a **2D rectangle**. All UI elements within a Canvas use Rect Transform.

## Basic Concepts

- **Rect Transform**: Component that manages UI element position and size
- **Anchors**: Fixed points of UI elements relative to parent
- **Pivot**: Reference point for rotation and size adjustment of UI elements
- **Rotation**: Rotation angle of UI elements

## Rect Transform vs Transform

### Regular Transform

```csharp
using UnityEngine;

public class NormalTransform : MonoBehaviour
{
    void Start()
    {
        // Transform of regular 3D object
        Transform normalTransform = transform;
        
        // Set position (3D coordinates)
        normalTransform.position = new Vector3(0, 0, 0);
        
        // Set size (3D scale)
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
        // Rect Transform of UI element
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Set position (2D coordinates, Z is usually 0)
        rectTransform.anchoredPosition = new Vector2(100, 50);
        
        // Set size (2D size)
        rectTransform.sizeDelta = new Vector2(200, 100);
    }
}
```

### Differences

| Item | Transform | Rect Transform |
|------|-----------|----------------|
| Usage | 3D objects | UI elements |
| Coordinate System | 3D (X, Y, Z) | 2D (X, Y) |
| Position | `position` | `anchoredPosition` |
| Size | `localScale` | `sizeDelta` |
| Anchors | None | Yes (Anchors) |

## Anchors

### What are Anchors?

Anchors determine **where UI elements are fixed** relative to their parent. Even when screen size changes, UI elements maintain their relative position based on anchors.

### Setting Anchors

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorExample : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Set anchor to top-left corner
        // anchorMin: bottom-left (0, 0)
        // anchorMax: top-right (1, 1)
        rectTransform.anchorMin = new Vector2(0, 1);  // Top-left
        rectTransform.anchorMax = new Vector2(0, 1);  // Top-left (point)
        
        // Set offset relative to anchor position
        rectTransform.anchoredPosition = new Vector2(10, -10);
    }
}
```

### Anchor Presets

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
    
    // Top-left
    void SetAnchorTopLeft()
    {
        rectTransform.anchorMin = new Vector2(0, 1);
        rectTransform.anchorMax = new Vector2(0, 1);
    }
    
    // Top-right
    void SetAnchorTopRight()
    {
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
    }
    
    // Bottom-left
    void SetAnchorBottomLeft()
    {
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);
    }
    
    // Bottom-right
    void SetAnchorBottomRight()
    {
        rectTransform.anchorMin = new Vector2(1, 0);
        rectTransform.anchorMax = new Vector2(1, 0);
    }
    
    // Center
    void SetAnchorCenter()
    {
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
    }
    
    // Full area (stretch)
    void SetAnchorStretch()
    {
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(1, 1);
        rectTransform.sizeDelta = Vector2.zero;  // Fit to anchor area
    }
}
```

### Anchor Area

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorArea : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Set anchor area (20%~80% of parent)
        rectTransform.anchorMin = new Vector2(0.2f, 0.2f);  // Bottom-left 20%
        rectTransform.anchorMax = new Vector2(0.8f, 0.8f);  // Top-right 80%
        
        // Set offset to 0 to fit anchor area
        rectTransform.offsetMin = Vector2.zero;  // Bottom-left offset
        rectTransform.offsetMax = Vector2.zero;  // Top-right offset
    }
}
```

## Pivot

### What is Pivot?

Pivot is the **reference point for rotation and size adjustment** of UI elements. The rotation center and size adjustment reference change based on pivot position.

### Setting Pivot

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotExample : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Set pivot to center (0.5, 0.5)
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        
        // Set pivot to top-left (0, 1)
        rectTransform.pivot = new Vector2(0, 1);
        
        // Set pivot to bottom-right (1, 0)
        rectTransform.pivot = new Vector2(1, 0);
    }
}
```

### Pivot Presets

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
    
    // Center (default)
    void SetPivotCenter()
    {
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
    
    // Top-left
    void SetPivotTopLeft()
    {
        rectTransform.pivot = new Vector2(0, 1);
    }
    
    // Top-right
    void SetPivotTopRight()
    {
        rectTransform.pivot = new Vector2(1, 1);
    }
    
    // Bottom-left
    void SetPivotBottomLeft()
    {
        rectTransform.pivot = new Vector2(0, 0);
    }
    
    // Bottom-right
    void SetPivotBottomRight()
    {
        rectTransform.pivot = new Vector2(1, 0);
    }
}
```

### Pivot and Rotation

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
        // Set pivot to top-left and rotate
        rectTransform.pivot = new Vector2(0, 1);
        rectTransform.Rotate(0, 0, 45);  // Rotate around top-left
        
        // Set pivot to center and rotate
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        rectTransform.Rotate(0, 0, 45);  // Rotate around center
    }
}
```

## Rotation

### Basic Rotation

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
        // Rotate around Z-axis (2D UI)
        rectTransform.Rotate(0, 0, 90 * Time.deltaTime);
        
        // Or set angle directly
        rectTransform.rotation = Quaternion.Euler(0, 0, 45);
    }
}
```

### Pivot-based Rotation

```csharp
using UnityEngine;
using UnityEngine.UI;

public class PivotBasedRotation : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // Set pivot to top-left
        rectTransform.pivot = new Vector2(0, 1);
        
        // Rotate 45 degrees around pivot
        rectTransform.rotation = Quaternion.Euler(0, 0, 45);
    }
}
```

### Rotation Animation

```csharp
using UnityEngine;
using UnityEngine.UI;

public class RotationAnimation : MonoBehaviour
{
    RectTransform rectTransform;
    public float rotationSpeed = 90f;  // Rotation angle per second
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }
    
    void Update()
    {
        // Continuous rotation
        rectTransform.Rotate(0, 0, rotationSpeed * Time.deltaTime);
    }
}
```

## Key Properties

### anchoredPosition

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchoredPosition : MonoBehaviour
{
    void Start()
    {
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Set relative position to anchor
        rectTransform.anchoredPosition = new Vector2(100, 50);
        
        // Get current anchor position
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
        
        // Set size (only meaningful when anchor is a point)
        rectTransform.sizeDelta = new Vector2(200, 100);
        
        // Get current size
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
        
        // Bottom-left offset
        rectTransform.offsetMin = new Vector2(10, 10);
        
        // Top-right offset
        rectTransform.offsetMax = new Vector2(-10, -10);
        
        // Fit to anchor area (offset 0)
        rectTransform.offsetMin = Vector2.zero;
        rectTransform.offsetMax = Vector2.zero;
    }
}
```

## Practical Usage Examples

### Example 1: UI Placement Responsive to Screen Size

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ResponsiveUI : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // Fixed to top-right of screen
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
        rectTransform.anchoredPosition = new Vector2(-50, -50);
        
        // Stays at top-right even when screen size changes
    }
}
```

### Example 2: Center-aligned UI

```csharp
using UnityEngine;
using UnityEngine.UI;

public class CenterAlignedUI : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // Place at center
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
        rectTransform.anchoredPosition = Vector2.zero;
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
}
```

### Example 3: Full Screen Background

```csharp
using UnityEngine;
using UnityEngine.UI;

public class FullScreenBackground : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // Fit to full screen
        rectTransform.anchorMin = Vector2.zero;
        rectTransform.anchorMax = Vector2.one;
        rectTransform.offsetMin = Vector2.zero;
        rectTransform.offsetMax = Vector2.zero;
    }
}
```

### Example 4: Rotating Button with Pivot

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
        
        // Set pivot to center
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
    }
    
    void Update()
    {
        // Rotate around pivot
        rectTransform.rotation = Quaternion.Euler(0, 0, rotationAngle);
        rotationAngle += 90f * Time.deltaTime;
    }
}
```

### Example 5: Dynamic UI Size Adjustment

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
        // Adjust size (when anchor is a point)
        if (rectTransform.anchorMin == rectTransform.anchorMax)
        {
            rectTransform.sizeDelta = new Vector2(targetWidth, targetHeight);
        }
    }
}
```

## Notes

1. **Anchors and Size**: `sizeDelta` is only meaningful when anchor is a point (anchorMin == anchorMax)
2. **Anchor Area**: Use `offsetMin/offsetMax` when anchor is an area (anchorMin != anchorMax)
3. **Pivot and Position**: Changing pivot may make `anchoredPosition` appear different
4. **Rotation**: UI usually only rotates around Z-axis (2D UI)

## Practical Tips

### Tip 1: Combining Anchors and Pivot

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorPivotCombination : MonoBehaviour
{
    RectTransform rectTransform;
    
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        
        // Anchor: top-right
        rectTransform.anchorMin = new Vector2(1, 1);
        rectTransform.anchorMax = new Vector2(1, 1);
        
        // Pivot: top-left (button's top-left aligns with anchor)
        rectTransform.pivot = new Vector2(0, 1);
        
        // Set offset
        rectTransform.anchoredPosition = new Vector2(-10, -10);
    }
}
```

### Tip 2: Applying Anchor Presets via Code

```csharp
using UnityEngine;
using UnityEngine.UI;

public class AnchorPresetHelper : MonoBehaviour
{
    public static void SetAnchorPreset(RectTransform rectTransform, int preset)
    {
        // 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right
        // 4: center, 5: full area
        
        switch (preset)
        {
            case 0: // Top-left
                rectTransform.anchorMin = new Vector2(0, 1);
                rectTransform.anchorMax = new Vector2(0, 1);
                rectTransform.pivot = new Vector2(0, 1);
                break;
            case 1: // Top-right
                rectTransform.anchorMin = new Vector2(1, 1);
                rectTransform.anchorMax = new Vector2(1, 1);
                rectTransform.pivot = new Vector2(1, 1);
                break;
            case 4: // Center
                rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
                rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                rectTransform.pivot = new Vector2(0.5f, 0.5f);
                break;
        }
    }
}
```

### Tip 3: Finding UI Elements

```csharp
using UnityEngine;
using UnityEngine.UI;

public class FindUIElement : MonoBehaviour
{
    void Start()
    {
        // Get RectTransform
        RectTransform rectTransform = GetComponent<RectTransform>();
        
        // Or get from UI component
        Button button = GetComponent<Button>();
        if (button != null)
        {
            RectTransform buttonRect = button.GetComponent<RectTransform>();
        }
    }
}
```

---

[← Back to Table of Contents](../README.md)

