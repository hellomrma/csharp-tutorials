---
title: 인터페이스 (Interface)
titleEn: Interface
slugEn: 20-interface
description: C#의 인터페이스를 학습합니다. 인터페이스를 정의하고 구현하여 코드의 유연성과 재사용성을 높이는 방법을 이해합니다.
descriptionEn: Learn about interfaces in C#. Understand how to define and implement interfaces to increase code flexibility and reusability.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 20
---

# 20. 인터페이스 (Interface)

## 인터페이스란?

인터페이스는 **클래스가 반드시 구현해야 하는 함수들을 정의**하는 계약서입니다. 클래스가 특정 기능을 가져야 한다는 것을 보장합니다.

## 기본 개념

### 인터페이스의 특징
1. **구현 강제성**: 인터페이스에 정의된 함수는 반드시 구현해야 함
2. **다중 구현 가능**: 하나의 클래스가 여러 인터페이스를 구현할 수 있음
3. **유연성**: 상속과 함께 사용하여 더 유연한 구조 생성

## 기본 예시: IWalkable 인터페이스

### 인터페이스 정의
```csharp
public interface IWalkable
{
    void Walk(); // 함수 본문 없이 선언만
}
```

### 클래스에서 인터페이스 구현
```csharp
public class s08_animal : MonoBehaviour
{
    public string animalName;

    // 가상 함수
    public virtual void Speak()
    {
        Debug.Log("동물이 말하는 소리를 냅니다.");
    }
}

// 고양이 클래스: 상속 + 인터페이스 구현
public class s08_cat : s08_animal, IWalkable
{
    // 인터페이스 함수 구현 (반드시 필요)
    public void Walk()
    {
        Debug.Log("고양이가 살금살금 걸어갑니다");
    }

    // 가상 함수 재정의
    public override void Speak()
    {
        Debug.Log("고양이는 야옹~ 야옹~");
    }
}

// 강아지 클래스: 상속 + 인터페이스 구현
public class s08_dog : s08_animal, IWalkable
{
    // 인터페이스 함수 구현 (반드시 필요)
    public void Walk()
    {
        Debug.Log("강아지가 뛰어뛰어 걸어갑니다");
    }

    // 가상 함수 재정의
    public override void Speak()
    {
        Debug.Log("강아지는 멍멍~ 멍멍~");
    }
}
```

## 인터페이스의 규칙

### 1. 함수 본문 없음
```csharp
public interface IWalkable
{
    void Walk(); // 본문 없이 선언만
    // void Walk() { } // ❌ 에러! 본문 작성 불가
}
```

### 2. 반드시 public
```csharp
public class Cat : IWalkable
{
    public void Walk() // ✅ public 필수
    {
        // 구현
    }
    
    // private void Walk() // ❌ 에러!
}
```

### 3. 모든 함수 구현 필수
```csharp
public interface IWalkable
{
    void Walk();
    void Run();
}

public class Cat : IWalkable
{
    public void Walk() { } // ✅ 구현
    
    // Run()을 구현하지 않으면 ❌ 에러!
    public void Run() { } // ✅ 반드시 구현 필요
}
```

## 상속과 인터페이스의 차이

### 상속 (Inheritance)
- **하나만 가능**: 클래스는 하나의 부모 클래스만 상속 가능
- **기본 동작 제공**: 부모 클래스의 함수와 변수를 물려받음
- **is-a 관계**: "~이다" 관계 (고양이는 동물이다)

### 인터페이스 (Interface)
- **여러 개 가능**: 클래스는 여러 인터페이스를 구현 가능
- **구현 강제**: 함수를 반드시 구현해야 함
- **has-a 관계**: "~할 수 있다" 관계 (고양이는 걸을 수 있다)

## 다중 인터페이스 구현

하나의 클래스가 여러 인터페이스를 구현할 수 있습니다.

```csharp
// 인터페이스 1
public interface IWalkable
{
    void Walk();
}

// 인터페이스 2
public interface IFlyable
{
    void Fly();
}

// 인터페이스 3
public interface ISwimmable
{
    void Swim();
}

// 여러 인터페이스 구현
public class Duck : IWalkable, IFlyable, ISwimmable
{
    public void Walk()
    {
        Debug.Log("오리가 걷습니다");
    }
    
    public void Fly()
    {
        Debug.Log("오리가 날아갑니다");
    }
    
    public void Swim()
    {
        Debug.Log("오리가 수영합니다");
    }
}
```

## 상속과 인터페이스 함께 사용

상속과 인터페이스를 동시에 사용할 수 있습니다.

```csharp
// 부모 클래스
public class Animal
{
    public virtual void Speak() { }
}

// 인터페이스
public interface IWalkable
{
    void Walk();
}

// 상속 + 인터페이스
public class Cat : Animal, IWalkable
{
    public override void Speak()
    {
        Debug.Log("야옹");
    }
    
    public void Walk()
    {
        Debug.Log("걷기");
    }
}
```

## 인터페이스의 장점

### 1. 구현 강제성
```csharp
// 모든 무기가 반드시 Attack() 함수를 가져야 함을 보장
public interface IWeapon
{
    void Attack();
}

public class Sword : IWeapon
{
    public void Attack() // 반드시 구현해야 함
    {
        Debug.Log("검으로 공격");
    }
}
```

### 2. 다중 구현 가능
```csharp
// 하나의 클래스가 여러 기능을 가질 수 있음
public class Robot : IWalkable, IFlyable, IAttackable
{
    public void Walk() { }
    public void Fly() { }
    public void Attack() { }
}
```

### 3. 유연성
```csharp
// 상속으로 기본 동작 제공, 인터페이스로 추가 기능
public class Enemy : MonoBehaviour
{
    // 기본 동작
}

public class FlyingEnemy : Enemy, IFlyable
{
    public void Fly() { } // 추가 기능
}
```

## 실전 활용 예시

### 예시 1: 무기 시스템
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
        Debug.Log("검으로 베기");
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
        Debug.Log("활로 쏘기");
    }
    
    public int GetDamage()
    {
        return 30;
    }
}
```

### 예시 2: 상호작용 시스템
```csharp
public interface IInteractable
{
    void Interact();
}

public class Door : MonoBehaviour, IInteractable
{
    public void Interact()
    {
        Debug.Log("문이 열렸습니다");
    }
}

public class Chest : MonoBehaviour, IInteractable
{
    public void Interact()
    {
        Debug.Log("상자가 열렸습니다");
    }
}
```

### 예시 3: 다형성 활용
```csharp
// 인터페이스 타입으로 배열 생성
IWalkable[] walkables = { new Cat(), new Dog(), new Duck() };

foreach (IWalkable walkable in walkables)
{
    walkable.Walk(); // 각각 다른 방식으로 걷기
}
```

## 인터페이스 vs 추상 클래스

| 특징 | 인터페이스 | 추상 클래스 |
|------|----------|-----------|
| 다중 상속 | ✅ 가능 | ❌ 불가능 |
| 변수 포함 | ❌ 불가능 | ✅ 가능 |
| 함수 구현 | ❌ 불가능 | ✅ 가능 (일부) |
| 접근 제한자 | public만 | 모든 접근 제한자 |
| 사용 목적 | 계약 정의 | 기본 구현 제공 |

## 주의사항

1. **함수 본문 작성 불가**: 인터페이스의 함수는 선언만 가능
2. **public 필수**: 인터페이스 함수는 반드시 public
3. **모든 함수 구현 필수**: 인터페이스의 모든 함수를 구현해야 함
4. **변수 선언 불가**: 인터페이스에는 변수를 선언할 수 없음

## 실전 활용 팁

### 팁 1: 기능별 인터페이스 분리
```csharp
// 기능별로 인터페이스를 나누면 유연함
public interface IWalkable { void Walk(); }
public interface IFlyable { void Fly(); }
public interface ISwimmable { void Swim(); }
```

### 팁 2: 상속과 인터페이스 조합
```csharp
// 상속으로 기본 동작, 인터페이스로 추가 기능
public class Enemy : MonoBehaviour { }
public class FlyingEnemy : Enemy, IFlyable { }
```

### 팁 3: 다형성 활용
```csharp
// 인터페이스 타입으로 다양한 객체 관리
IWeapon[] weapons = { new Sword(), new Bow(), new Staff() };
```

---

[← 목차로 돌아가기](../README.md)

