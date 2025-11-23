---
title: Array
titleEn: Array
description: Learn about arrays in C#. Understand how to declare, use, and access array elements by index.
descriptionEn: Learn about arrays in C#. Understand how to declare, use, and access array elements by index.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 13
---

# 13. Array

## What is an Array?

A variable that can store multiple data of the same type. You can access each data by number (index).

## Declaring an Array

```csharp
// Method 1: Set size first, add values later
int[] myArray = new int[3];  // Create array of size 3

myArray[0] = 8;   // Store 8 in first slot
myArray[1] = 16;  // Store 16 in second slot
myArray[2] = 32;  // Store 32 in third slot

// Method 2: Declare and assign values at once
int[] myArray2 = {3, 6, 9};  // Assign values directly
```

## Using Arrays

```csharp
void Start()
{
    Debug.Log(myArray[0]);   // Outputs 8 (first value)
    Debug.Log(myArray[1]);   // Outputs 16 (second value)
    Debug.Log(myArray2[2]);  // Outputs 9 (third value)
}
```

## Array Characteristics

- **Index starts at 0**: First value is `[0]`, second value is `[1]`
- **Fixed size**: Cannot change size once created
- **Same type only**: `int[]` array can only store integers

## Array Pros and Cons

### Advantages
- **Fast access**: Can access directly by index
- **Memory efficient**: Stored in contiguous memory

### Disadvantages
- **Fixed size**: Cannot increase or decrease size later
- **Difficult insertion/deletion**: Hard to insert or remove values in the middle

## Practical Usage Examples

```csharp
// Player score array
int[] playerScores = new int[5];
playerScores[0] = 100;
playerScores[1] = 200;
playerScores[2] = 150;

// Item name array
string[] itemNames = {"Sword", "Shield", "Potion", "Armor"};
Debug.Log(itemNames[0]);  // Outputs "Sword"
```

---

[← Back to Table of Contents](../README.md)

