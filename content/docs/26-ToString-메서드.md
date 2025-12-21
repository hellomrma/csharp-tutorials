---
title: ToString 메서드
titleEn: ToString Method
slugEn: 26-tostring-method
description: C#의 ToString() 메서드를 학습합니다. 숫자, 객체를 문자열로 변환하고, 포맷 지정자를 사용하여 원하는 형식으로 출력하는 방법을 이해합니다.
descriptionEn: Learn about the ToString() method in C#. Understand how to convert numbers and objects to strings, and use format specifiers to output in desired formats.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 26
---

# 26. ToString 메서드

## ToString이란?

ToString()은 모든 객체가 가지고 있는 메서드로, 객체를 **문자열(string)로 변환**하는 기능입니다. 숫자를 문자열로 바꾸거나, 객체의 정보를 텍스트로 표현할 때 사용합니다.

## 기본 개념

- **ToString()**: 객체를 문자열로 변환하는 메서드
- **기본 제공**: 모든 클래스는 Object에서 상속받아 ToString()을 가지고 있음
- **오버라이드**: 클래스에 맞게 ToString()을 재정의할 수 있음
- **포맷 지정자**: 숫자를 원하는 형식으로 변환할 수 있음

## 기본 사용법

### 숫자를 문자열로 변환

```csharp
using UnityEngine;

public class BasicToString : MonoBehaviour
{
    void Start()
    {
        int number = 100;
        string text = number.ToString();
        Debug.Log("숫자: " + text);  // "숫자: 100"
        
        float pi = 3.14f;
        string piText = pi.ToString();
        Debug.Log("원주율: " + piText);  // "원주율: 3.14"
        
        bool isTrue = true;
        string boolText = isTrue.ToString();
        Debug.Log("불린: " + boolText);  // "불린: True"
    }
}
```

### 문자열 보간과 함께 사용

```csharp
using UnityEngine;

public class StringInterpolation : MonoBehaviour
{
    void Start()
    {
        int score = 1500;
        int level = 5;
        
        // 문자열 보간 사용
        string message = $"점수: {score.ToString()}, 레벨: {level.ToString()}";
        Debug.Log(message);  // "점수: 1500, 레벨: 5"
        
        // ToString() 생략 가능 (자동 변환)
        string message2 = $"점수: {score}, 레벨: {level}";
        Debug.Log(message2);  // "점수: 1500, 레벨: 5"
    }
}
```

## 숫자 포맷 지정자

### 정수 포맷

```csharp
using UnityEngine;

public class IntegerFormat : MonoBehaviour
{
    void Start()
    {
        int number = 12345;
        
        // 기본 형식
        Debug.Log(number.ToString());  // "12345"
        
        // 10진수 (기본값)
        Debug.Log(number.ToString("D"));  // "12345"
        
        // 10진수 (자릿수 지정)
        Debug.Log(number.ToString("D8"));  // "00012345" (8자리, 앞에 0 추가)
        
        // 16진수 (소문자)
        Debug.Log(number.ToString("x"));  // "3039"
        
        // 16진수 (대문자)
        Debug.Log(number.ToString("X"));  // "3039"
        
        // 16진수 (자릿수 지정)
        Debug.Log(number.ToString("X8"));  // "00003039"
    }
}
```

### 실수 포맷

```csharp
using UnityEngine;

public class FloatFormat : MonoBehaviour
{
    void Start()
    {
        float number = 1234.5678f;
        
        // 기본 형식
        Debug.Log(number.ToString());  // "1234.568" (반올림)
        
        // 고정 소수점 (F)
        Debug.Log(number.ToString("F"));  // "1234.57" (소수점 2자리)
        Debug.Log(number.ToString("F2"));  // "1234.57"
        Debug.Log(number.ToString("F4"));  // "1234.5678"
        
        // 지수 표기법 (E)
        Debug.Log(number.ToString("E"));  // "1.234568E+003"
        Debug.Log(number.ToString("e"));  // "1.234568e+003"
        
        // 일반 형식 (G)
        Debug.Log(number.ToString("G"));  // "1234.568"
        
        // 숫자 형식 (N) - 천 단위 구분자 포함
        Debug.Log(number.ToString("N"));  // "1,234.57"
        Debug.Log(number.ToString("N2"));  // "1,234.57"
        
        // 통화 형식 (C)
        Debug.Log(number.ToString("C"));  // "₩1,235" (한국 로케일)
        Debug.Log(number.ToString("C2"));  // "₩1,234.57"
    }
}
```

### 퍼센트 형식

```csharp
using UnityEngine;

public class PercentFormat : MonoBehaviour
{
    void Start()
    {
        float ratio = 0.75f;
        
        // 퍼센트 형식 (P)
        Debug.Log(ratio.ToString("P"));  // "75.00 %"
        Debug.Log(ratio.ToString("P0"));  // "75 %" (소수점 없음)
        Debug.Log(ratio.ToString("P2"));  // "75.00 %"
    }
}
```

## 날짜/시간 포맷

### DateTime ToString

```csharp
using System;
using UnityEngine;

public class DateTimeFormat : MonoBehaviour
{
    void Start()
    {
        DateTime now = DateTime.Now;
        
        // 기본 형식
        Debug.Log(now.ToString());  // "2024-01-15 오후 3:30:45"
        
        // 짧은 날짜
        Debug.Log(now.ToString("d"));  // "2024-01-15"
        
        // 긴 날짜
        Debug.Log(now.ToString("D"));  // "2024년 1월 15일"
        
        // 시간
        Debug.Log(now.ToString("t"));  // "오후 3:30"
        Debug.Log(now.ToString("T"));  // "오후 3:30:45"
        
        // 커스텀 포맷
        Debug.Log(now.ToString("yyyy-MM-dd HH:mm:ss"));  // "2024-01-15 15:30:45"
        Debug.Log(now.ToString("MM/dd/yyyy"));  // "01/15/2024"
    }
}
```

## 클래스에서 ToString() 오버라이드

### 기본 ToString()

```csharp
using UnityEngine;

public class Player
{
    public string name;
    public int level;
    public int hp;
    
    // ToString()을 오버라이드하지 않으면 클래스 이름만 반환
    // 예: "Player"
}

public class ToStringOverride : MonoBehaviour
{
    void Start()
    {
        Player player = new Player();
        player.name = "용사";
        player.level = 10;
        player.hp = 100;
        
        Debug.Log(player.ToString());  // "Player" (클래스 이름만)
    }
}
```

### ToString() 오버라이드

```csharp
using UnityEngine;

public class Player
{
    public string name;
    public int level;
    public int hp;
    
    // ToString() 오버라이드
    public override string ToString()
    {
        return $"이름: {name}, 레벨: {level}, HP: {hp}";
    }
}

public class ToStringOverride : MonoBehaviour
{
    void Start()
    {
        Player player = new Player();
        player.name = "용사";
        player.level = 10;
        player.hp = 100;
        
        Debug.Log(player.ToString());  // "이름: 용사, 레벨: 10, HP: 100"
    }
}
```

### Unity MonoBehaviour에서 ToString()

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public string enemyName;
    public int hp;
    public int maxHp;
    
    public override string ToString()
    {
        return $"{enemyName} (HP: {hp}/{maxHp})";
    }
    
    void Start()
    {
        enemyName = "고블린";
        hp = 50;
        maxHp = 50;
        
        Debug.Log(this.ToString());  // "고블린 (HP: 50/50)"
    }
}
```

## 실전 활용 예시

### 예시 1: 점수 표시

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ScoreDisplay : MonoBehaviour
{
    public Text scoreText;
    private int score = 0;
    
    void Update()
    {
        // 점수를 문자열로 변환하여 UI에 표시
        scoreText.text = "점수: " + score.ToString();
        
        // 또는 문자열 보간 사용
        scoreText.text = $"점수: {score}";
    }
    
    void AddScore(int points)
    {
        score += points;
    }
}
```

### 예시 2: 시간 표시

```csharp
using System;
using UnityEngine;
using UnityEngine.UI;

public class TimeDisplay : MonoBehaviour
{
    public Text timeText;
    
    void Update()
    {
        float time = Time.time;
        
        // 초를 분:초 형식으로 변환
        int minutes = (int)(time / 60);
        int seconds = (int)(time % 60);
        
        // ToString("D2")로 2자리 숫자로 표시 (예: "05:03")
        timeText.text = $"{minutes.ToString("D2")}:{seconds.ToString("D2")}";
    }
}
```

### 예시 3: 퍼센트 표시

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    public Text healthText;
    public int currentHp = 75;
    public int maxHp = 100;
    
    void Update()
    {
        float percentage = (float)currentHp / maxHp;
        
        // 퍼센트 형식으로 표시
        healthText.text = $"체력: {percentage.ToString("P0")} ({currentHp}/{maxHp})";
        // 출력: "체력: 75 % (75/100)"
    }
}
```

### 예시 4: 통화 표시

```csharp
using UnityEngine;
using UnityEngine.UI;

public class CurrencyDisplay : MonoBehaviour
{
    public Text goldText;
    private int gold = 1234567;
    
    void Update()
    {
        // 통화 형식으로 표시 (천 단위 구분자 포함)
        goldText.text = "골드: " + gold.ToString("N0");
        // 출력: "골드: 1,234,567"
        
        // 또는 통화 기호 포함
        goldText.text = gold.ToString("C0");
        // 출력: "₩1,234,567"
    }
}
```

### 예시 5: 디버그 정보 출력

```csharp
using UnityEngine;

public class DebugInfo : MonoBehaviour
{
    public Vector3 position;
    public float speed;
    public bool isMoving;
    
    public override string ToString()
    {
        return $"위치: {position}, 속도: {speed.ToString("F2")}, 이동 중: {isMoving}";
    }
    
    void Update()
    {
        // 디버그 정보 출력
        Debug.Log(this.ToString());
        // 출력: "위치: (1, 2, 3), 속도: 5.50, 이동 중: True"
    }
}
```

## 주요 포맷 지정자 요약

### 숫자 포맷

| 포맷 | 설명 | 예시 |
|------|------|------|
| `D` 또는 `d` | 10진수 | `123.ToString("D")` → "123" |
| `D5` | 10진수 (5자리) | `123.ToString("D5")` → "00123" |
| `X` | 16진수 (대문자) | `255.ToString("X")` → "FF" |
| `x` | 16진수 (소문자) | `255.ToString("x")` → "ff" |
| `F` 또는 `f` | 고정 소수점 | `3.14.ToString("F2")` → "3.14" |
| `E` 또는 `e` | 지수 표기법 | `1234.ToString("E")` → "1.234000E+003" |
| `N` 또는 `n` | 숫자 형식 (천 단위 구분) | `1234.ToString("N")` → "1,234.00" |
| `C` 또는 `c` | 통화 형식 | `1234.ToString("C")` → "₩1,234" |
| `P` 또는 `p` | 퍼센트 | `0.75.ToString("P")` → "75.00 %" |

### 날짜 포맷

| 포맷 | 설명 | 예시 |
|------|------|------|
| `d` | 짧은 날짜 | `DateTime.Now.ToString("d")` → "2024-01-15" |
| `D` | 긴 날짜 | `DateTime.Now.ToString("D")` → "2024년 1월 15일" |
| `t` | 짧은 시간 | `DateTime.Now.ToString("t")` → "오후 3:30" |
| `T` | 긴 시간 | `DateTime.Now.ToString("T")` → "오후 3:30:45" |
| `yyyy-MM-dd` | 커스텀 형식 | `DateTime.Now.ToString("yyyy-MM-dd")` → "2024-01-15" |

## 주의사항

1. **null 처리**: null 객체에서 ToString()을 호출하면 NullReferenceException 발생
2. **성능**: 문자열 보간(`$"..."`)이 ToString()을 자동으로 호출하므로 편리함
3. **로케일**: 통화(C)나 날짜 포맷은 시스템 로케일에 따라 달라질 수 있음
4. **오버라이드**: 클래스에 맞게 ToString()을 오버라이드하면 디버깅에 유용함

## 실전 활용 팁

### 팁 1: null 체크와 함께 사용

```csharp
using UnityEngine;

public class NullSafeToString : MonoBehaviour
{
    void Start()
    {
        object obj = null;
        
        // 안전한 ToString() 호출
        string result = obj?.ToString() ?? "null";
        Debug.Log(result);  // "null"
        
        // 또는
        if (obj != null)
        {
            Debug.Log(obj.ToString());
        }
    }
}
```

### 팁 2: 여러 값 조합

```csharp
using UnityEngine;

public class CombineValues : MonoBehaviour
{
    void Start()
    {
        int score = 1500;
        int level = 5;
        float time = 123.45f;
        
        // 여러 값을 조합하여 문자열 생성
        string info = $"점수: {score.ToString("N0")}, 레벨: {level}, 시간: {time.ToString("F2")}초";
        Debug.Log(info);
        // 출력: "점수: 1,500, 레벨: 5, 시간: 123.45초"
    }
}
```

### 팁 3: 조건부 포맷

```csharp
using UnityEngine;

public class ConditionalFormat : MonoBehaviour
{
    void Start()
    {
        float number = 1234.567f;
        
        // 소수점이 있으면 소수점 표시, 없으면 정수로 표시
        string formatted = number % 1 == 0 
            ? number.ToString("N0") 
            : number.ToString("F2");
        
        Debug.Log(formatted);
    }
}
```

### 팁 4: 리스트 요소 출력

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ListToString : MonoBehaviour
{
    void Start()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        // 리스트의 각 요소를 문자열로 변환
        string result = string.Join(", ", numbers.ConvertAll(x => x.ToString()));
        Debug.Log(result);  // "1, 2, 3, 4, 5"
        
        // 또는 LINQ 사용
        // string result = string.Join(", ", numbers.Select(x => x.ToString()));
    }
}
```

---

[← 목차로 돌아가기](../README.md)

