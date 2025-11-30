---
title: Interface
titleEn: Interface
description: Learn about interfaces in C#. Understand how to define and implement interfaces to increase code flexibility and reusability.
descriptionEn: Learn about interfaces in C#. Understand how to define and implement interfaces to increase code flexibility and reusability.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 20
---

# 20. Interface

## What is an Interface?

An interface is a **contract that defines functions a class must implement**. It guarantees that a class has specific functionality.

## Basic Concepts

### Characteristics of Interfaces
1. **Implementation Requirement**: Functions defined in an interface must be implemented
2. **Multiple Implementation**: A class can implement multiple interfaces
3. **Flexibility**: Can be used with inheritance to create more flexible structures

## Basic Example: IWalkable Interface

### Interface Definition
```csharp
public interface IWalkable
{
    void Walk(); // Only declaration, no body
}
```

### Class Implementing Interface
```csharp
public class s08_animal : MonoBehaviour
{
    public string animalName;

    // Virtual function
    public virtual void Speak()
    {
        Debug.Log("The animal makes a sound.");
    }
}

// Cat class: Inheritance + Interface implementation
public class s08_cat : s08_animal, IWalkable
{
    // Interface function implementation (required)
    public void Walk()
    {
        Debug.Log("The cat walks stealthily");
    }

    // Override virtual function
    public override void Speak()
    {
        Debug.Log("The cat meows: Meow~ Meow~");
    }
}

// Dog class: Inheritance + Interface implementation
public class s08_dog : s08_animal, IWalkable
{
    // Interface function implementation (required)
    public void Walk()
    {
        Debug.Log("The dog walks with a bounce");
    }

    // Override virtual function
    public override void Speak()
    {
        Debug.Log("The dog barks: Woof~ Woof~");
    }
}
```

## Interface Rules

### 1. No Function Body
```csharp
public interface IWalkable
{
    void Walk(); // Only declaration, no body
    // void Walk() { } // ❌ Error! Cannot write body
}
```

### 2. Must be public
```csharp
public class Cat : IWalkable
{
    public void Walk() // ✅ public required
    {
        // Implementation
    }
    
    // private void Walk() // ❌ Error!
}
```

### 3. All Functions Must be Implemented
```csharp
public interface IWalkable
{
    void Walk();
    void Run();
}

public class Cat : IWalkable
{
    public void Walk() { } // ✅ Implemented
    
    // If Run() is not implemented, ❌ Error!
    public void Run() { } // ✅ Must be implemented
}
```

## Inheritance vs Interface

### Inheritance
- **Single Only**: A class can only inherit from one parent class
- **Provides Default Behavior**: Inherits functions and variables from parent class
- **is-a Relationship**: "is a" relationship (A cat is an animal)

### Interface
- **Multiple Allowed**: A class can implement multiple interfaces
- **Implementation Required**: Functions must be implemented
- **has-a Relationship**: "can do" relationship (A cat can walk)

## Multiple Interface Implementation

A class can implement multiple interfaces.

```csharp
// Interface 1
public interface IWalkable
{
    void Walk();
}

// Interface 2
public interface IFlyable
{
    void Fly();
}

// Interface 3
public interface ISwimmable
{
    void Swim();
}

// Implementing multiple interfaces
public class Duck : IWalkable, IFlyable, ISwimmable
{
    public void Walk()
    {
        Debug.Log("The duck walks");
    }
    
    public void Fly()
    {
        Debug.Log("The duck flies");
    }
    
    public void Swim()
    {
        Debug.Log("The duck swims");
    }
}
```

## Using Inheritance and Interface Together

Inheritance and interfaces can be used together.

```csharp
// Parent class
public class Animal
{
    public virtual void Speak() { }
}

// Interface
public interface IWalkable
{
    void Walk();
}

// Inheritance + Interface
public class Cat : Animal, IWalkable
{
    public override void Speak()
    {
        Debug.Log("Meow");
    }
    
    public void Walk()
    {
        Debug.Log("Walking");
    }
}
```

## Advantages of Interfaces

### 1. Implementation Requirement
```csharp
// Guarantees all weapons must have Attack() function
public interface IWeapon
{
    void Attack();
}

public class Sword : IWeapon
{
    public void Attack() // Must be implemented
    {
        Debug.Log("Sword slashes");
    }
}
```

### 2. Multiple Implementation
```csharp
// A class can have multiple functionalities
public class Robot : IWalkable, IFlyable, IAttackable
{
    public void Walk() { }
    public void Fly() { }
    public void Attack() { }
}
```

### 3. Flexibility
```csharp
// Inheritance provides default behavior, interface adds functionality
public class Enemy : MonoBehaviour
{
    // Default behavior
}

public class FlyingEnemy : Enemy, IFlyable
{
    public void Fly() { } // Additional functionality
}
```

## Practical Usage Examples

### Example 1: Weapon System
```csharp
public interface IWeapon
{
    void Attack();
    int GetDamage();
}

public class Sword : IWeapon
{
    public void Attack()
    {
        Debug.Log("Sword slashes");
    }
    
    public int GetDamage()
    {
        return 50;
    }
}

public class Bow : IWeapon
{
    public void Attack()
    {
        Debug.Log("Bow shoots");
    }
    
    public int GetDamage()
    {
        return 30;
    }
}
```

### Example 2: Interaction System
```csharp
public interface IInteractable
{
    void Interact();
}

public class Door : MonoBehaviour, IInteractable
{
    public void Interact()
    {
        Debug.Log("Door opened");
    }
}

public class Chest : MonoBehaviour, IInteractable
{
    public void Interact()
    {
        Debug.Log("Chest opened");
    }
}
```

### Example 3: Utilizing Polymorphism
```csharp
// Create array with interface type
IWalkable[] walkables = { new Cat(), new Dog(), new Duck() };

foreach (IWalkable walkable in walkables)
{
    walkable.Walk(); // Each walks in different way
}
```

## Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Multiple Inheritance | ✅ Possible | ❌ Not possible |
| Variables | ❌ Not possible | ✅ Possible |
| Function Implementation | ❌ Not possible | ✅ Possible (partial) |
| Access Modifiers | public only | All access modifiers |
| Purpose | Define contract | Provide default implementation |

## Notes

1. **Cannot write function body**: Interface functions can only be declared
2. **public required**: Interface functions must be public
3. **All functions must be implemented**: All functions in interface must be implemented
4. **Cannot declare variables**: Variables cannot be declared in interfaces

## Practical Tips

### Tip 1: Separate Interfaces by Functionality
```csharp
// Separating interfaces by functionality provides flexibility
public interface IWalkable { void Walk(); }
public interface IFlyable { void Fly(); }
public interface ISwimmable { void Swim(); }
```

### Tip 2: Combine Inheritance and Interface
```csharp
// Inheritance for default behavior, interface for additional functionality
public class Enemy : MonoBehaviour { }
public class FlyingEnemy : Enemy, IFlyable { }
```

### Tip 3: Utilize Polymorphism
```csharp
// Manage various objects with interface type
IWeapon[] weapons = { new Sword(), new Bow(), new Staff() };
```

---

[← Back to Table of Contents](../README.md)

