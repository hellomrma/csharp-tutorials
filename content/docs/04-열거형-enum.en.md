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

Enum is a way to group related constants together for management. Very useful in games for defining item types, character classes, game states, etc.

```csharp
// Define item types
public enum ItemType { 
    Weapon,    // Weapon
    Armor,     // Armor
    Potion,    // Potion
    Key,       // Key
    Consumable // Consumable item
}

// Define character classes
public enum CharacterClass
{
    Warrior,   // Warrior
    Mage,      // Mage
    Archer,    // Archer
    Rogue      // Rogue
}
```

- **Why use it?**
  - Group related values in one place (cleaner code)
  - Prevent typos (use `ItemType.Weapon` instead of string "Weapon")
  - Selectable in Unity Inspector as a dropdown menu (intuitive)
  - Auto-completion support (IDE shows all options)
  - Type safety (prevents invalid value input)

## Using enum

```csharp
public class Item : MonoBehaviour
{
    public ItemType itemType;  // Selectable as dropdown in Inspector
    
    void Start()
    {
        // Apply different effects based on item type
        switch (itemType)
        {
            case ItemType.Weapon:
                Debug.Log("Obtained a weapon!");
                IncreaseAttackPower(10);
                break;
            case ItemType.Armor:
                Debug.Log("Obtained armor!");
                IncreaseDefense(5);
                break;
            case ItemType.Potion:
                Debug.Log("Drank a potion!");
                RestoreHealth(50);
                break;
        }
    }
    
    void IncreaseAttackPower(int amount) { }
    void IncreaseDefense(int amount) { }
    void RestoreHealth(int amount) { }
}
```

- **Game development practical usage examples**

**Example 1: Item types**
```csharp
public enum ItemType { Weapon, Armor, Potion, Key, Consumable }

public class InventoryItem
{
    public ItemType type;
    public string name;
}
```

**Example 2: Game states**
```csharp
public enum GameState { Menu, Playing, Paused, GameOver, Victory }

public class GameManager : MonoBehaviour
{
    public GameState currentState = GameState.Menu;
    
    void Update()
    {
        if (currentState == GameState.Playing)
        {
            // Gameplay logic
        }
    }
}
```

**Example 3: Character classes**
```csharp
public enum CharacterClass { Warrior, Mage, Archer, Rogue }

public class Player : MonoBehaviour
{
    public CharacterClass playerClass;
    
    void Start()
    {
        switch (playerClass)
        {
            case CharacterClass.Warrior:
                baseAttack = 20;
                baseDefense = 15;
                break;
            case CharacterClass.Mage:
                baseAttack = 15;
                baseMana = 100;
                break;
        }
    }
}
```

**Example 4: Enemy AI states**
```csharp
public enum EnemyState { Idle, Patrol, Chase, Attack, Dead }

public class Enemy : MonoBehaviour
{
    public EnemyState currentState = EnemyState.Idle;
}
```

## Using in Unity Inspector

When you declare an enum as a public variable, it appears as a dropdown menu in the Unity Inspector.

**How to use:**
1. Declare `public ItemType itemType;` in script
2. Add script to GameObject in Unity editor
3. Select ItemType from dropdown menu in Inspector window
4. Can change value during gameplay (useful for debugging)

**Actual example:**
```csharp
public class ItemPickup : MonoBehaviour
{
    public ItemType itemType = ItemType.Potion;  // Selectable in Inspector
    public int value = 10;
    
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            ApplyItemEffect(itemType, value);
        }
    }
    
    void ApplyItemEffect(ItemType type, int val)
    {
        switch (type)
        {
            case ItemType.Potion:
                // Restore health
                break;
            case ItemType.Weapon:
                // Obtain weapon
                break;
        }
    }
}
```

**Advantages:**
- Can change values in Inspector without modifying code
- Prevents inputting wrong values
- Easy for game designers to use

---

[← Back to Table of Contents](../README.md)

