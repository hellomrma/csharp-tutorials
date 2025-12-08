---
title: 델리게이트 (Delegate)
titleEn: Delegate
slugEn: 21-delegate
description: C#의 델리게이트를 학습합니다. 함수를 변수처럼 저장하고 전달하는 방법을 이해합니다.
descriptionEn: Learn about delegates in C#. Understand how to store and pass functions like variables.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 21
---

# 21. 델리게이트 (Delegate)

## 델리게이트란?

델리게이트는 **함수를 변수처럼 저장하고 전달할 수 있게 해주는 타입**입니다. 함수 포인터와 비슷한 개념으로, 나중에 호출할 함수를 저장해두고 필요할 때 실행할 수 있습니다.

## 기본 개념

- **함수 참조 저장**: 함수를 변수에 저장
- **나중에 호출**: 저장된 함수를 원하는 시점에 실행
- **다형성**: 같은 델리게이트 타입으로 다양한 함수 연결 가능

## 델리게이트 선언

```csharp
// 델리게이트 타입 선언
public delegate void MyDelegate();

// 매개변수가 있는 델리게이트
public delegate void MyDelegateWithParam(string message);

// 반환값이 있는 델리게이트
public delegate int MyDelegateWithReturn(int a, int b);
```

## 기본 예시

```csharp
using UnityEngine;

// 델리게이트 타입 선언
public delegate void SimpleDelegate();

public class DelegateExample : MonoBehaviour
{
    void Start()
    {
        // 델리게이트 변수 생성
        SimpleDelegate myDelegate;
        
        // 함수를 델리게이트에 할당
        myDelegate = SayHello;
        
        // 델리게이트 호출 (함수 실행)
        myDelegate(); // "안녕하세요!" 출력
    }
    
    void SayHello()
    {
        Debug.Log("안녕하세요!");
    }
}
```

## 매개변수가 있는 델리게이트

```csharp
public delegate void MessageDelegate(string message);

public class DelegateWithParam : MonoBehaviour
{
    void Start()
    {
        MessageDelegate myDelegate = PrintMessage;
        myDelegate("Unity 학습 중!"); // "Unity 학습 중!" 출력
    }
    
    void PrintMessage(string msg)
    {
        Debug.Log(msg);
    }
}
```

## 반환값이 있는 델리게이트

```csharp
public delegate int CalculateDelegate(int a, int b);

public class DelegateWithReturn : MonoBehaviour
{
    void Start()
    {
        CalculateDelegate calc = Add;
        int result = calc(5, 3); // 8 반환
        Debug.Log(result);
    }
    
    int Add(int a, int b)
    {
        return a + b;
    }
}
```

## 멀티캐스트 델리게이트 (Multicast Delegate)

### 멀티캐스트 델리게이트란?

하나의 델리게이트에 **여러 함수를 연결**하여 한 번의 호출로 여러 함수를 실행할 수 있습니다.

### 기본 사용법

```csharp
public delegate void MultiDelegate();

public class MulticastExample : MonoBehaviour
{
    void Start()
    {
        MultiDelegate myDelegate;
        
        // 첫 번째 함수 추가
        myDelegate = FirstFunction;
        
        // += 연산자로 추가 함수 연결
        myDelegate += SecondFunction;
        myDelegate += ThirdFunction;
        
        // 한 번 호출하면 모든 함수 실행
        myDelegate();
        // 출력:
        // "첫 번째 함수 실행"
        // "두 번째 함수 실행"
        // "세 번째 함수 실행"
    }
    
    void FirstFunction()
    {
        Debug.Log("첫 번째 함수 실행");
    }
    
    void SecondFunction()
    {
        Debug.Log("두 번째 함수 실행");
    }
    
    void ThirdFunction()
    {
        Debug.Log("세 번째 함수 실행");
    }
}
```

### 함수 제거하기

```csharp
void Start()
{
    MultiDelegate myDelegate = FirstFunction;
    myDelegate += SecondFunction;
    myDelegate += ThirdFunction;
    
    // -= 연산자로 함수 제거
    myDelegate -= SecondFunction;
    
    myDelegate(); // FirstFunction과 ThirdFunction만 실행
}
```

### null 체크

```csharp
void Start()
{
    MultiDelegate myDelegate = null;
    
    // null 체크 후 호출 (중요!)
    if (myDelegate != null)
    {
        myDelegate();
    }
    
    // 또는 간단하게
    myDelegate?.Invoke();
}
```

## 실전 활용 예시

### 예시 1: 콜백 함수

```csharp
public delegate void OnCompleteDelegate();

public class TaskManager : MonoBehaviour
{
    public OnCompleteDelegate OnTaskComplete;
    
    void Start()
    {
        OnTaskComplete += ShowMessage;
        OnTaskComplete += SaveProgress;
        
        // 작업 완료 시
        CompleteTask();
    }
    
    void CompleteTask()
    {
        // 작업 완료 로직...
        
        // 콜백 호출
        OnTaskComplete?.Invoke();
    }
    
    void ShowMessage()
    {
        Debug.Log("작업이 완료되었습니다!");
    }
    
    void SaveProgress()
    {
        Debug.Log("진행 상황 저장");
    }
}
```

### 예시 2: 조건부 함수 실행

```csharp
public delegate bool ConditionDelegate(int value);

public class ConditionalExample : MonoBehaviour
{
    void Start()
    {
        ConditionDelegate check = IsPositive;
        
        if (check(10))
        {
            Debug.Log("양수입니다");
        }
    }
    
    bool IsPositive(int value)
    {
        return value > 0;
    }
}
```

## 주의사항

1. **null 체크**: 델리게이트 호출 전 null 체크 필수
2. **메모리 누수**: 델리게이트에 연결된 함수는 참조를 유지하므로 필요 없을 때 제거
3. **멀티캐스트**: 여러 함수가 연결된 경우 모두 실행됨

## 실전 활용 팁

### 팁 1: null 체크 패턴

```csharp
// ✅ 안전한 호출
myDelegate?.Invoke();

// 또는
if (myDelegate != null)
{
    myDelegate();
}
```

### 팁 2: 델리게이트 초기화

```csharp
// 델리게이트를 빈 함수로 초기화하여 null 체크 불필요
public delegate void MyDelegate();
MyDelegate myDelegate = () => { }; // 빈 람다 함수로 초기화
```

### 팁 3: Action과 Func 사용

```csharp
using System;

// Action: 반환값이 없는 델리게이트
Action<string> printAction = Debug.Log;
printAction("Hello");

// Func: 반환값이 있는 델리게이트
Func<int, int, int> addFunc = (a, b) => a + b;
int result = addFunc(5, 3);
```

---

[← 목차로 돌아가기](../README.md)

