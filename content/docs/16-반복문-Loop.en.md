---
title: Loop
titleEn: Loop
description: Learn about loops in C# (while, for, foreach). Understand how to repeat code and iterate through arrays and lists.
descriptionEn: Learn about loops in C# (while, for, foreach). Understand how to repeat code and iterate through arrays and lists.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 16
---

# 16. Loop

## What is a Loop?

Syntax used when you want to execute the same code multiple times. Useful in Unity for spawning multiple monsters or checking all values in an array.

## Increment/Decrement Operators

### Increment Operator (++)
```csharp
int count = 0;
count++;  // Same as count = count + 1 (result: 1)
++count;  // Same as count = count + 1 (result: 2)
```

### Decrement Operator (--)
```csharp
int count = 10;
count--;  // Same as count = count - 1 (result: 9)
--count;  // Same as count = count - 1 (result: 8)
```

## Compound Assignment Operators

Simple way to add or subtract values from variables.

```csharp
int score = 100;

score += 10;  // score = score + 10 (result: 110)
score -= 5;   // score = score - 5 (result: 105)
score *= 2;   // score = score * 2 (result: 210)
score /= 3;   // score = score / 3 (result: 70)
score %= 4;   // score = score % 4 (result: 2)
```

## while Statement

Continues to loop **while condition is true**.

### Basic Syntax
```csharp
while (condition)
{
    // Code to execute
}
```

### Example
```csharp
int count = 0;

while (count < 10)
{
    Debug.Log("Spawn Minion");
    count++;  // Increase count by 1
}
// "Spawn Minion" is output 10 times
```

### Notes
- If condition is always true, **infinite loop** can occur
- Must have code that makes condition false

## for Statement

A loop that writes initial value, condition, and increment in one line.

### Basic Syntax
```csharp
for (initial value; condition; increment)
{
    // Code to execute
}
```

### Example
```csharp
for (int i = 0; i < 10; i++)
{
    Debug.Log("Spawn Minion " + i);
}
// Outputs "Spawn Minion 0" through "Spawn Minion 9"
```

### Execution Order
1. `int i = 0` - Set initial value (executes once)
2. `i < 10` - Check condition
3. If true, execute code
4. `i++` - Increase i by 1
5. Return to step 2 and repeat

## Using with Arrays

### Using Array's Length
```csharp
int[] myArray = { 0, 3, 6, 9, 12, 15, 18, 21, 24, 27 };

for (int i = 0; i < myArray.Length; i++)
{
    Debug.Log(myArray[i]);  // Output all array values
}
```

**Important**: Arrays use `Length` to check count.

### Using List's Count
```csharp
List<int> myList = new List<int>() { 4, 6, 9 };

for (int i = 0; i < myList.Count; i++)
{
    Debug.Log(myList[i]);  // Output all list values
}
```

**Important**: Lists use `Count` to check count. (Not `Length`!)

## foreach Statement

Used to **iterate through all elements** of arrays or lists. Useful when index is not needed.

### Basic Syntax
```csharp
foreach (type variableName in collection)
{
    // Code to execute
}
```

### Example
```csharp
List<string> names = new List<string>() { "Alice", "Bob", "Charlie" };

foreach (string name in names)
{
    Debug.Log(name);  // Outputs "Alice", "Bob", "Charlie" in order
}
```

### Advantages of foreach
- No need to manage index
- Code is concise
- No worry about going out of array bounds

## Loop Comparison

| Loop | When to Use | Features |
|------|------------|----------|
| `while` | When only condition exists | Repeats until condition becomes false |
| `for` | When number of iterations is known | Initial value, condition, increment in one line |
| `foreach` | When iterating through all elements | Simple without index |

## Practical Usage Examples

### Spawning Monsters
```csharp
void Start()
{
    for (int i = 0; i < 10; i++)
    {
        Debug.Log("Spawn Minion " + i + "!");
    }
}
```

### Checking Score Array
```csharp
int[] scores = { 100, 200, 150, 300 };

for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] > 200)
    {
        Debug.Log("High score: " + scores[i]);
    }
}
```

### Outputting Inventory Items
```csharp
List<string> inventory = new List<string>() { "Sword", "Shield", "Potion" };

foreach (string item in inventory)
{
    Debug.Log("Inventory: " + item);
}
```

## Notes

1. **Beware of infinite loops**: Be careful that while condition doesn't always stay true
2. **Array bounds**: Use `i < array.Length` in for loops to avoid going out of bounds
3. **Array uses Length, List uses Count**: Be careful not to confuse them

---

[← Back to Table of Contents](../README.md)

