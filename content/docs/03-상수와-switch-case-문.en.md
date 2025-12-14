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

Constants are values that never change once set. Used in games to define fixed values like max health, max level, base speed, etc.

```csharp
public class Player : MonoBehaviour
{
    // Game configuration constants
    const int MAX_HP = 100;           // Max health
    const int MAX_LEVEL = 50;         // Max level
    const float BASE_MOVE_SPEED = 5f;  // Base movement speed
    const int STARTING_GOLD = 100;     // Starting gold
    
    public int currentHp = MAX_HP;
    public int currentLevel = 1;
}
```

- **Why use them?**
  - Use meaningful names in code (`hp > 0` is less clear than `hp > DEAD_HP`)
  - Change values in one place when needed (use MAX_HP constant instead of writing 100 everywhere)
  - Prevent accidental value changes (const cannot be modified)
  - Avoid magic numbers (meaningless numbers)

- **Difference from variables**
  - Variable: `int hp = 100;` (can change later with `hp = 50;`)
  - Constant: `const int MAX_HP = 100;` (cannot change later, `MAX_HP = 50;` causes error!)

## Input.GetKeyDown()

A Unity function to detect keyboard input. Used to receive player input and control the game.

```csharp
void Update()
{
    // Jump when spacebar is pressed
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Jump();
    }
    
    // Skip dialogue when Enter is pressed
    if (Input.GetKeyDown(KeyCode.Return))
    {
        SkipDialogue();
    }
}
```

- **Common key codes**
  - `KeyCode.Space`: Spacebar (jump, skip dialogue)
  - `KeyCode.Return` or `KeyCode.Enter`: Enter key (confirm, advance dialogue)
  - `KeyCode.A`, `KeyCode.B`, `KeyCode.C`: Alphabet keys (skill shortcuts)
  - `KeyCode.LeftArrow`, `KeyCode.RightArrow`: Arrow keys (movement)
  - `KeyCode.Alpha1`, `KeyCode.Alpha2`: Number keys 1, 2 (item use)

- **GetKeyDown vs GetKey vs GetKeyUp**
  - `GetKeyDown`: true only once when key is pressed (jump, attack, etc.)
  - `GetKey`: true continuously while key is held (movement, running, etc.)
  - `GetKeyUp`: true only once when key is released (special actions)

**Game usage example**:
```csharp
void Update()
{
    // Movement (while holding)
    if (Input.GetKey(KeyCode.W))
    {
        MoveForward();
    }
    
    // Jump (on press)
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Jump();
    }
    
    // Use skill (number key)
    if (Input.GetKeyDown(KeyCode.Alpha1))
    {
        UseSkill(1);
    }
}
```

## switch-case Statement

A clean way to handle multiple cases. Much more readable than using if-else if multiple times.

```csharp
public class Player : MonoBehaviour
{
    public int playerLevel = 1;
    
    void Start()
    {
        // Give different rewards based on level
        switch (playerLevel)
        {
            case 1:
                GiveReward("Beginner Weapon");
                break;
            case 5:
                GiveReward("Intermediate Armor");
                break;
            case 10:
                GiveReward("Advanced Ring");
                break;
            default:
                Debug.Log("No reward");
                break;
        }
    }
    
    void GiveReward(string itemName)
    {
        Debug.Log("Obtained " + itemName + "!");
    }
}
```

- **Comparison with if-else if**
  - if-else if: useful for complex conditions (`hp > 0 && hp < 50` - range comparison)
  - switch-case: cleaner for comparing specific values (exact value comparison)

- **Keyword meanings**
  - `switch (variable)`: which variable to compare
  - `case value:`: execute if variable equals this value
  - `break;`: end here and exit (required! without it, next case also executes)
  - `default:`: execute if none of the above cases match

- **Game development practical examples**

**Example 1: Different effects based on item type**
```csharp
public enum ItemType { Weapon, Armor, Potion, Key }

void UseItem(ItemType itemType)
{
    switch (itemType)
    {
        case ItemType.Weapon:
            EquipWeapon();
            break;
        case ItemType.Armor:
            EquipArmor();
            break;
        case ItemType.Potion:
            RestoreHealth();
            break;
        case ItemType.Key:
            UnlockDoor();
            break;
    }
}
```

**Example 2: Different actions based on game state**
```csharp
public enum GameState { Menu, Playing, Paused, GameOver }

void UpdateGameState(GameState state)
{
    switch (state)
    {
        case GameState.Menu:
            ShowMainMenu();
            break;
        case GameState.Playing:
            StartGameplay();
            break;
        case GameState.Paused:
            PauseGame();
            break;
        case GameState.GameOver:
            ShowGameOverScreen();
            break;
    }
}
```

---

[← Back to Table of Contents](../README.md)

