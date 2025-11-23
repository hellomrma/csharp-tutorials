---
title: Enumeration (enum)
titleEn: Enumeration (enum)
description: Learn about enums in C#. Understand how to group related constants together and use them in Unity Inspector.
descriptionEn: Learn about enums in C#. Understand how to group related constants together and use them in Unity Inspector.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 4
---

# 4. Enumeration (enum)

## What is enum?

Enum is a way to group related constants together for management.

```csharp
public enum Fruit { 
    APPLE, 
    BANANA, 
    PEACH, 
    ORANGE 
}
```

- **Why use it?**
  - Group related values in one place
  - Prevent typos (prevents writing APLE instead of APPLE)
  - Selectable in Unity Inspector as a dropdown menu

## Using enum

```csharp
public Fruit myFruit;  // Selectable in Inspector

switch (myFruit)
{
    case Fruit.APPLE:
        Debug.Log("Ate an apple!");
        break;
    case Fruit.BANANA:
        Debug.Log("Ate a banana!");
        break;
}
```

- **Practical usage examples**
  - Item types: WEAPON, ARMOR, POTION
  - Game states: MENU, PLAYING, PAUSED, GAMEOVER
  - Character classes: WARRIOR, MAGE, ARCHER

## Using in Unity Inspector

1. Declare `public Fruit myFruit;` in script
2. Add script to GameObject in Unity editor
3. Select Fruit from dropdown menu in Inspector window
4. Can change value during gameplay

---

[← Back to Table of Contents](../README.md)

