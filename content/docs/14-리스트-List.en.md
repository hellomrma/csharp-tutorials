---
title: List
titleEn: List
description: Learn about Lists in C#. Understand how to use dynamic arrays that can grow or shrink in size, commonly used in Unity.
descriptionEn: Learn about Lists in C#. Understand how to use dynamic arrays that can grow or shrink in size, commonly used in Unity.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 14
---

# 14. List

## What is a List?

Similar to arrays but can freely increase or decrease in size. A dynamic array commonly used in Unity.

## Declaring a List

```csharp
using System.Collections.Generic;  // Required!

// Method 1: Create empty list and add values later
public List<int> myList = new List<int>();

// Method 2: Declare and assign values at once
public List<int> myList2 = new List<int>() { 4, 6, 9 };
```

## List Main Methods

### Add() - Add Value

```csharp
myList.Add(5);   // Add 5 to end of list
myList.Add(10);  // Add 10 to end of list
myList.Add(15);  // Add 15 to end of list
// Result: [5, 10, 15]
```

### Insert() - Insert at Specific Position

```csharp
myList.Insert(1, 7);  // Insert 7 at index 1
// Result: [5, 7, 10, 15] (existing values shift back)
```

### Remove() - Remove by Value

```csharp
myList.Remove(5);   // Remove item with value 5
myList.Remove(10);  // Remove item with value 10
// Result: [7, 15]
```

### RemoveAt() - Remove by Index

```csharp
myList.RemoveAt(2);  // Remove value at index 2
```

## List Usage Example

```csharp
void Start()
{
    // Add values to list
    myList.Add(5);
    myList.Add(10);
    myList.Add(15);
    
    // Insert at specific position
    myList.Insert(1, 7);  // [5, 7, 10, 15]
    
    // Remove by value
    myList.Remove(5);     // [7, 10, 15]
    
    // Remove by index
    myList.RemoveAt(2); // [7, 10]
    
    // Access value (same as array)
    Debug.Log(myList[0]);  // Outputs 7
}
```

## Array vs List Comparison

| Feature | Array | List |
|---------|-------|------|
| Size | Fixed (cannot change) | Dynamic (can change) |
| Add value | Difficult | Easy with `Add()` |
| Insert value | Difficult | Easy with `Insert()` |
| Remove value | Difficult | Easy with `Remove()` |
| Access speed | Fast | Fast |
| Memory | Efficient | Uses slightly more |

## When to Use What?

### Use Array
- When size is fixed and won't change
- When performance is very important
- For simple data storage

### Use List
- When size can change
- When frequently adding/removing values
- In most Unity cases (more flexible)

## Practical Usage Examples

```csharp
// Player inventory
List<string> inventory = new List<string>();
inventory.Add("Sword");
inventory.Add("Shield");
inventory.Add("Potion");

// Remove item
inventory.Remove("Potion");

// Score list
List<int> scores = new List<int>();
scores.Add(100);
scores.Add(200);
scores.Add(150);
```

---

[← Back to Table of Contents](../README.md)

