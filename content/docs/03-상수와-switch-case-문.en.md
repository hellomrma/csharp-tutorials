---
title: Constants and switch-case Statement
titleEn: Constants and switch-case Statement
description: Learn about constants (const) and the switch-case statement in C#. Understand how to use Input.GetKeyDown() for keyboard input detection.
descriptionEn: Learn about constants (const) and the switch-case statement in C#. Understand how to use Input.GetKeyDown() for keyboard input detection.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 3
---

# 3. Constants and switch-case Statement

## Constants (const)

Constants are values that never change once set.

```csharp
const int DEAD_HP = 0;
const int DANGER_HP = 40;
const int WARNING_HP = 60;
```

- **Why use them?**
  - Use meaningful names in code
  - Change values in one place when needed
  - Prevent accidental value changes

- **Difference from variables**
  - Variable: `int hp = 100;` (can change later with `hp = 50;`)
  - Constant: `const int MAX_HP = 100;` (cannot change later)

## Input.GetKeyDown()

A Unity function to detect keyboard input.

```csharp
if (Input.GetKeyDown(KeyCode.Space))
{
    // Code executed when spacebar is pressed
}
```

- **Common key codes**
  - `KeyCode.Space`: Spacebar
  - `KeyCode.Enter`: Enter key
  - `KeyCode.A`, `KeyCode.B`: Alphabet keys
  - `KeyCode.LeftArrow`, `KeyCode.RightArrow`: Arrow keys

- **GetKeyDown vs GetKey**
  - `GetKeyDown`: true only once when key is pressed
  - `GetKey`: true continuously while key is held

## switch-case Statement

A clean way to handle multiple cases.

```csharp
switch (hp)
{
    case 0:
        Debug.Log("Game Over!");
        break;
    case 40:
        Debug.Log("Danger!");
        break;
    case 60:
        Debug.Log("Warning!");
        break;
    default:
        Debug.Log("Default message.");
        break;
}
```

- **Comparison with if-else if**
  - if-else if: useful for complex conditions
  - switch-case: cleaner for comparing specific values

- **Keyword meanings**
  - `switch (variable)`: which variable to compare
  - `case value:`: if variable equals this value
  - `break;`: end here and exit (required!)
  - `default:`: if none of the above cases match

- **Practical examples**
  - Display different messages based on health
  - Give different rewards based on level
  - Apply different effects based on item type

---

[← Back to Table of Contents](../README.md)

