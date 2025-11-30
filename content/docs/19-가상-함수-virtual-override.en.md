---
title: Virtual Functions and Override
titleEn: Virtual Functions and Override
description: Learn about virtual functions and override in C#. Understand how to implement polymorphism using virtual and override keywords.
descriptionEn: Learn about virtual functions and override in C#. Understand how to implement polymorphism using virtual and override keywords.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 19
---

# 19. Virtual Functions and Override

## What are Virtual Functions?

Virtual functions are **functions that can be overridden in child classes**. They are declared with the `virtual` keyword in the parent class and overridden with the `override` keyword in child classes.

## Basic Concepts

### virtual Keyword
- Declares a function as virtual in the parent class
- Allows the function to be overridden in child classes

### override Keyword
- Overrides the parent's virtual function in the child class
- Completely replaces the parent class's function

## Basic Example: Animal Class

### Parent Class (Animal)
```csharp
public class s01_animal : MonoBehaviour
{
    public string animalName;

    // Virtual function
    public virtual void Speak()
    {
        Debug.Log("The animal makes a sound.");
    }
}
```

### Child Class (Cat)
```csharp
public class s02_cat : s01_animal
{
    // Override virtual function
    public override void Speak()
    {
        Debug.Log("The cat meows: Meow~ Meow~");
    }
}
```

### Child Class (Dog)
```csharp
public class s03_dog : s01_animal
{
    // Override virtual function
    public override void Speak()
    {
        Debug.Log("The dog barks: Woof~ Woof~");
    }
}
```

### Usage Example
```csharp
public class s04 : MonoBehaviour
{
    void Start()
    {
        s01_animal myDog = new s03_dog();
        s01_animal myCat = new s02_cat();

        myDog.Speak(); // "The dog barks: Woof~ Woof~"    
        myCat.Speak(); // "The cat meows: Meow~ Meow~"    
    }
}
```

**Key Point**: Even though declared as the parent class type, the overridden function is called based on the actual object type!

## Practical Example 1: Enemy Class

### Parent Class
```csharp
public class s05_enermy : MonoBehaviour
{
    public virtual void Die() 
    { 
        Debug.Log("The enemy has died.");
    }
}
```

### Child Classes
```csharp
// Goblin
public class s05_enermy_child01 : s05_enermy
{
    public override void Die()
    {
        Debug.Log("The goblin has died.");
    }
}

// Slime
public class s05_enermy_child02 : s05_enermy
{
    public override void Die()
    {
        Debug.Log("The slime has melted away.");
    }
}

// Orc
public class s05_enermy_child03 : s05_enermy
{
    public override void Die()
    {
        Debug.Log("The orc has fallen.");
    }
}
```

### Usage Example
```csharp
public class s05_enermy_final : MonoBehaviour
{
    void Start()
    {
        s05_enermy enermyGoblin = new s05_enermy_child01();
        s05_enermy enermySlime = new s05_enermy_child02();
        s05_enermy enermyOrc = new s05_enermy_child03();

        enermyGoblin.Die(); // "The goblin has died."
        enermySlime.Die();  // "The slime has melted away."
        enermyOrc.Die();    // "The orc has fallen."
    }
}
```

## Practical Example 2: Weapon Class

### Parent Class
```csharp
public class s06_weapon : MonoBehaviour
{
    // Virtual function
    public virtual void Attack()
    {
        Debug.Log("Weapon Attacks");
    }
}
```

### Child Classes
```csharp
// Laser
public class s06_weapon_child01 : s06_weapon
{
    public override void Attack()
    {
        Debug.Log("Laser attacks");
    }
}

// UZI
public class s06_weapon_child02 : s06_weapon
{
    public override void Attack()
    {
        Debug.Log("UZI attacks");
    }
}
```

### Usage Example
```csharp
public class s06_weapon_final : MonoBehaviour
{
    void Start()
    {
        s06_weapon weaponLaser = new s06_weapon_child01();
        s06_weapon weaponUZI = new s06_weapon_child02();

        weaponLaser.Attack(); // "Laser attacks"    
        weaponUZI.Attack();   // "UZI attacks"
    }
}
```

## Practical Example 3: Character Type

### Parent Class
```csharp
public class s07_girl : MonoBehaviour
{
    // Virtual function
    public virtual void type()
    {
        Debug.Log("Normal character");
    }
}
```

### Child Classes
```csharp
// Cute type
public class s07_girl_child01 : s07_girl
{
    public override void type()
    {
        Debug.Log("Cute character");
    }
}

// Cool type
public class s07_girl_child02 : s07_girl
{
    public override void type()
    {
        Debug.Log("Cool character");
    }
}
```

## virtual vs override Comparison

| Keyword | Location | Role |
|---------|----------|------|
| `virtual` | Parent class | Allows function to be overridden in child classes |
| `override` | Child class | Overrides the parent's virtual function |

## Advantages of Virtual Functions

1. **Polymorphism**: Different behavior based on actual object type, even when declared as the same type
2. **Flexibility**: Each child class can have different implementation
3. **Code Reusability**: Provides common interface while allowing individual implementations

## Notes

1. **virtual and override are used together**: `virtual` in parent, `override` in child
2. **Cannot override without override**: Must use `override` to override a `virtual` function
3. **private functions cannot be virtual**: `virtual` must be used with `public` or `protected`

## abstract vs virtual

| Keyword | Features | When to Use |
|---------|----------|-------------|
| `virtual` | Provides default implementation, optional override | When there is default behavior |
| `abstract` | No implementation, must be overridden | When there is no default behavior and must be implemented |

## Practical Tips

### Tip 1: Provide Common Interface
```csharp
// All weapons have Attack() function but attack in different ways
public class Weapon
{
    public virtual void Attack() { }
}
```

### Tip 2: Provide Default Behavior
```csharp
// Provides default behavior but can be overridden if needed
public class Enemy
{
    public virtual void Die() 
    {
        Debug.Log("The enemy has died."); // Default behavior
    }
}
```

### Tip 3: Utilize Polymorphism
```csharp
// Different behavior based on actual object type, even when declared as same type
Enemy[] enemies = { new Goblin(), new Slime(), new Orc() };
foreach (Enemy enemy in enemies)
{
    enemy.Die(); // Each outputs different message
}
```

---

[← Back to Table of Contents](../README.md)

