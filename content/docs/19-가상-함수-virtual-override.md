---
title: 가상 함수 (Virtual, Override)
titleEn: Virtual Functions and Override
slugEn: 19-virtual-override
description: C#의 가상 함수와 override를 학습합니다. virtual과 override 키워드를 사용하여 다형성을 구현하는 방법을 이해합니다.
descriptionEn: Learn about virtual functions and override in C#. Understand how to implement polymorphism using virtual and override keywords.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 19
---

# 19. 가상 함수 (Virtual, Override)

## 가상 함수란?

가상 함수는 **자식 클래스에서 재정의(override)할 수 있는 함수**입니다. 부모 클래스에서 `virtual` 키워드를 사용하여 선언하고, 자식 클래스에서 `override` 키워드로 재정의합니다.

## 기본 개념

### virtual 키워드
- 부모 클래스에서 함수를 가상 함수로 선언
- 자식 클래스에서 재정의 가능하도록 허용

### override 키워드
- 자식 클래스에서 부모의 가상 함수를 재정의
- 부모 클래스의 함수를 완전히 대체

## 기본 예시: 동물 클래스

### 부모 클래스 (Animal)
```csharp
public class s01_animal : MonoBehaviour
{
    public string animalName;

    // 가상 함수
    public virtual void Speak()
    {
        Debug.Log("동물이 말하는 소리를 냅니다.");
    }
}
```

### 자식 클래스 (Cat)
```csharp
public class s02_cat : s01_animal
{
    // 가상 함수 재정의
    public override void Speak()
    {
        Debug.Log("고양이는 야옹~ 야옹~");
    }
}
```

### 자식 클래스 (Dog)
```csharp
public class s03_dog : s01_animal
{
    // 가상 함수 재정의
    public override void Speak()
    {
        Debug.Log("강아지는 멍멍~ 멍멍~");
    }
}
```

### 사용 예시
```csharp
public class s04 : MonoBehaviour
{
    void Start()
    {
        s01_animal myDog = new s03_dog();
        s01_animal myCat = new s02_cat();

        myDog.Speak(); // "강아지는 멍멍~ 멍멍~"    
        myCat.Speak(); // "고양이는 야옹~ 야옹~"    
    }
}
```

**핵심**: 부모 클래스 타입으로 선언했지만, 실제 객체의 타입에 따라 재정의된 함수가 호출됩니다!

## 실전 예시 1: 적(Enemy) 클래스

### 부모 클래스
```csharp
public class Enemy : MonoBehaviour
{
    public int hp = 50;
    public int damage = 10;
    
    public virtual void Die() 
    { 
        Debug.Log("적이 죽었습니다.");
        // 기본 동작: 아이템 드롭, 경험치 지급 등
        DropItem();
        GiveExperience(10);
    }
    
    protected virtual void DropItem()
    {
        Debug.Log("아이템을 드롭합니다.");
    }
    
    protected virtual void GiveExperience(int exp)
    {
        Debug.Log("경험치 " + exp + " 획득!");
    }
}
```

### 자식 클래스들
```csharp
// 고블린
public class Goblin : Enemy
{
    void Start()
    {
        hp = 30;
        damage = 5;
    }
    
    public override void Die()
    {
        Debug.Log("고블린이 비명을 지르며 쓰러집니다!");
        // 고블린만의 특별한 동작
        PlayDeathSound();
        DropItem();
        GiveExperience(5);  // 고블린은 경험치 적음
    }
    
    void PlayDeathSound()
    {
        Debug.Log("고블린 비명 소리!");
    }
}

// 슬라임
public class Slime : Enemy
{
    void Start()
    {
        hp = 20;
        damage = 3;
    }
    
    public override void Die()
    {
        Debug.Log("슬라임이 녹아내립니다!");
        // 슬라임은 아이템을 드롭하지 않음
        GiveExperience(3);
    }
    
    protected override void DropItem()
    {
        // 슬라임은 아이템을 드롭하지 않음 (빈 함수)
    }
}

// 오크
public class Orc : Enemy
{
    void Start()
    {
        hp = 100;
        damage = 20;
    }
    
    public override void Die()
    {
        Debug.Log("오크가 큰 소리를 내며 쓰러집니다!");
        // 오크는 더 많은 경험치와 아이템
        DropItem();
        DropItem();  // 아이템 2개 드롭
        GiveExperience(50);  // 많은 경험치
    }
}
```

### 사용 예시
```csharp
public class CombatSystem : MonoBehaviour
{
    void Start()
    {
        // 부모 클래스 타입으로 선언하지만 실제 객체는 자식 클래스
        Enemy enemy1 = new Goblin();
        Enemy enemy2 = new Slime();
        Enemy enemy3 = new Orc();

        enemy1.Die(); // "고블린이 비명을 지르며 쓰러집니다!"
        enemy2.Die(); // "슬라임이 녹아내립니다!"
        enemy3.Die(); // "오크가 큰 소리를 내며 쓰러집니다!"
        
        // 배열로 관리할 수도 있음
        Enemy[] enemies = { new Goblin(), new Slime(), new Orc() };
        foreach (Enemy enemy in enemies)
        {
            enemy.Die();  // 각각 다른 방식으로 죽음
        }
    }
}
```

## 실전 예시 2: 무기(Weapon) 클래스

### 부모 클래스
```csharp
public class Weapon : MonoBehaviour
{
    public int damage = 10;
    public float attackSpeed = 1.0f;
    
    // 가상 함수 - 기본 공격 동작
    public virtual void Attack()
    {
        Debug.Log("기본 공격! 데미지: " + damage);
    }
    
    // 가상 함수 - 특수 공격
    public virtual void SpecialAttack()
    {
        Debug.Log("특수 공격 사용!");
    }
}
```

### 자식 클래스들
```csharp
// 검
public class Sword : Weapon
{
    void Start()
    {
        damage = 20;
        attackSpeed = 1.0f;
    }
    
    public override void Attack()
    {
        Debug.Log("검으로 베기 공격! 데미지: " + damage);
    }
    
    public override void SpecialAttack()
    {
        Debug.Log("검의 연속 베기 공격!");
    }
}

// 활
public class Bow : Weapon
{
    void Start()
    {
        damage = 15;
        attackSpeed = 1.5f;
    }
    
    public override void Attack()
    {
        Debug.Log("활로 원거리 공격! 데미지: " + damage);
    }
    
    public override void SpecialAttack()
    {
        Debug.Log("활의 다중 발사!");
    }
}

// 지팡이
public class Staff : Weapon
{
    void Start()
    {
        damage = 25;
        attackSpeed = 0.8f;
    }
    
    public override void Attack()
    {
        Debug.Log("마법 공격! 데미지: " + damage);
    }
    
    public override void SpecialAttack()
    {
        Debug.Log("지팡이의 강력한 마법 폭발!");
    }
}
```

### 사용 예시
```csharp
public class Player : MonoBehaviour
{
    Weapon currentWeapon;
    
    void Start()
    {
        // 무기를 선택할 수 있음
        currentWeapon = new Sword();
        // 또는
        // currentWeapon = new Bow();
        // currentWeapon = new Staff();
    }
    
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            currentWeapon.Attack();  // 선택한 무기에 따라 다른 공격
        }
        
        if (Input.GetKeyDown(KeyCode.Q))
        {
            currentWeapon.SpecialAttack();  // 특수 공격
        }
    }
}
```

## 실전 예시 3: 캐릭터 타입

### 부모 클래스
```csharp
public class s07_girl : MonoBehaviour
{
    // 가상 함수
    public virtual void type()
    {
        Debug.Log("일반적인 캐릭터");
    }
}
```

### 자식 클래스들
```csharp
// 귀여운 타입
public class s07_girl_child01 : s07_girl
{
    public override void type()
    {
        Debug.Log("귀여운 캐릭터");
    }
}

// 쿨한 타입
public class s07_girl_child02 : s07_girl
{
    public override void type()
    {
        Debug.Log("쿨한 캐릭터");
    }
}
```

## virtual vs override 비교

| 키워드 | 사용 위치 | 역할 |
|-------|---------|------|
| `virtual` | 부모 클래스 | 자식 클래스에서 재정의 가능하도록 허용 |
| `override` | 자식 클래스 | 부모의 가상 함수를 재정의 |

## 가상 함수의 장점

1. **다형성(Polymorphism)**: 같은 타입으로 선언해도 실제 객체에 따라 다른 동작
2. **유연성**: 각 자식 클래스마다 다른 구현 가능
3. **코드 재사용**: 공통 인터페이스 제공하면서 개별 구현 허용

## 주의사항

1. **virtual과 override는 쌍으로 사용**: 부모에서 `virtual`, 자식에서 `override`
2. **override 없이는 재정의 불가**: `virtual` 함수를 재정의하려면 반드시 `override` 사용
3. **private 함수는 virtual 불가**: `virtual`은 `public` 또는 `protected`와 함께 사용

## abstract vs virtual

| 키워드 | 특징 | 사용 시기 |
|-------|------|---------|
| `virtual` | 기본 구현 제공, 선택적 재정의 | 기본 동작이 있는 경우 |
| `abstract` | 구현 없음, 반드시 재정의 필요 | 기본 동작이 없고 반드시 구현해야 하는 경우 |

## 실전 활용 팁

### 팁 1: 공통 인터페이스 제공
```csharp
// 모든 무기가 Attack() 함수를 가지지만, 각각 다른 방식으로 공격
public class Weapon
{
    public virtual void Attack() { }
}
```

### 팁 2: 기본 동작 제공
```csharp
// 기본 동작을 제공하되, 필요시 재정의 가능
public class Enemy
{
    public virtual void Die() 
    {
        Debug.Log("적이 죽었습니다."); // 기본 동작
    }
}
```

### 팁 3: 다형성 활용
```csharp
// 같은 타입으로 선언해도 실제 객체에 따라 다른 동작
Enemy[] enemies = { new Goblin(), new Slime(), new Orc() };
foreach (Enemy enemy in enemies)
{
    enemy.Die(); // 각각 다른 메시지 출력
}
```

---

[← 목차로 돌아가기](../README.md)

