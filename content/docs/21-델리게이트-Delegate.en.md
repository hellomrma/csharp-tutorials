---
title: Delegate
titleEn: Delegate
description: Learn about delegates in C#. Understand how to store and pass functions like variables.
descriptionEn: Learn about delegates in C#. Understand how to store and pass functions like variables.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 21
---

# 21. Delegate

## What is a Delegate?

A delegate is a **type that allows you to store and pass functions like variables**. Similar to function pointers, you can store a function to call later and execute it when needed.

## Basic Concepts

- **Function Reference Storage**: Store functions in variables
- **Call Later**: Execute stored functions at desired times
- **Polymorphism**: Connect various functions using the same delegate type

## Delegate Declaration

```csharp
// Delegate type declaration
public delegate void MyDelegate();

// Delegate with parameters
public delegate void MyDelegateWithParam(string message);

// Delegate with return value
public delegate int MyDelegateWithReturn(int a, int b);
```

## Basic Example

```csharp
using UnityEngine;

// Delegate type declaration
public delegate void SimpleDelegate();

public class DelegateExample : MonoBehaviour
{
    void Start()
    {
        // Create delegate variable
        SimpleDelegate myDelegate;
        
        // Assign function to delegate
        myDelegate = SayHello;
        
        // Invoke delegate (execute function)
        myDelegate(); // Outputs "Hello!"
    }
    
    void SayHello()
    {
        Debug.Log("Hello!");
    }
}
```

## Delegate with Parameters

```csharp
public delegate void MessageDelegate(string message);

public class DelegateWithParam : MonoBehaviour
{
    void Start()
    {
        MessageDelegate myDelegate = PrintMessage;
        myDelegate("Learning Unity!"); // Outputs "Learning Unity!"
    }
    
    void PrintMessage(string msg)
    {
        Debug.Log(msg);
    }
}
```

## Delegate with Return Value

```csharp
public delegate int CalculateDelegate(int a, int b);

public class DelegateWithReturn : MonoBehaviour
{
    void Start()
    {
        CalculateDelegate calc = Add;
        int result = calc(5, 3); // Returns 8
        Debug.Log(result);
    }
    
    int Add(int a, int b)
    {
        return a + b;
    }
}
```

## Multicast Delegate

### What is a Multicast Delegate?

You can **connect multiple functions** to a single delegate and execute all of them with one call.

### Basic Usage

```csharp
public delegate void MultiDelegate();

public class MulticastExample : MonoBehaviour
{
    void Start()
    {
        MultiDelegate myDelegate;
        
        // Add first function
        myDelegate = FirstFunction;
        
        // Connect additional functions with += operator
        myDelegate += SecondFunction;
        myDelegate += ThirdFunction;
        
        // One call executes all functions
        myDelegate();
        // Output:
        // "First function executed"
        // "Second function executed"
        // "Third function executed"
    }
    
    void FirstFunction()
    {
        Debug.Log("First function executed");
    }
    
    void SecondFunction()
    {
        Debug.Log("Second function executed");
    }
    
    void ThirdFunction()
    {
        Debug.Log("Third function executed");
    }
}
```

### Removing Functions

```csharp
void Start()
{
    MultiDelegate myDelegate = FirstFunction;
    myDelegate += SecondFunction;
    myDelegate += ThirdFunction;
    
    // Remove function with -= operator
    myDelegate -= SecondFunction;
    
    myDelegate(); // Only FirstFunction and ThirdFunction execute
}
```

### Null Check

```csharp
void Start()
{
    MultiDelegate myDelegate = null;
    
    // Check null before calling (important!)
    if (myDelegate != null)
    {
        myDelegate();
    }
    
    // Or simply
    myDelegate?.Invoke();
}
```

## Practical Usage Examples

### Example 1: Callback Function

```csharp
public delegate void OnCompleteDelegate();

public class TaskManager : MonoBehaviour
{
    public OnCompleteDelegate OnTaskComplete;
    
    void Start()
    {
        OnTaskComplete += ShowMessage;
        OnTaskComplete += SaveProgress;
        
        // When task completes
        CompleteTask();
    }
    
    void CompleteTask()
    {
        // Task completion logic...
        
        // Invoke callback
        OnTaskComplete?.Invoke();
    }
    
    void ShowMessage()
    {
        Debug.Log("Task completed!");
    }
    
    void SaveProgress()
    {
        Debug.Log("Saving progress");
    }
}
```

### Example 2: Conditional Function Execution

```csharp
public delegate bool ConditionDelegate(int value);

public class ConditionalExample : MonoBehaviour
{
    void Start()
    {
        ConditionDelegate check = IsPositive;
        
        if (check(10))
        {
            Debug.Log("Positive number");
        }
    }
    
    bool IsPositive(int value)
    {
        return value > 0;
    }
}
```

## Notes

1. **Null Check**: Always check for null before invoking delegates
2. **Memory Leaks**: Functions connected to delegates maintain references, so remove them when not needed
3. **Multicast**: All connected functions execute when multiple functions are connected

## Practical Tips

### Tip 1: Null Check Pattern

```csharp
// ✅ Safe invocation
myDelegate?.Invoke();

// Or
if (myDelegate != null)
{
    myDelegate();
}
```

### Tip 2: Delegate Initialization

```csharp
// Initialize delegate with empty function to avoid null checks
public delegate void MyDelegate();
MyDelegate myDelegate = () => { }; // Initialize with empty lambda function
```

### Tip 3: Using Action and Func

```csharp
using System;

// Action: Delegate without return value
Action<string> printAction = Debug.Log;
printAction("Hello");

// Func: Delegate with return value
Func<int, int, int> addFunc = (a, b) => a + b;
int result = addFunc(5, 3);
```

---

[← Back to Table of Contents](../README.md)

