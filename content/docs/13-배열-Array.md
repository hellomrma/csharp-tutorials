---
title: 배열 (Array)
titleEn: Array
slugEn: 13-array
description: C#의 배열을 학습합니다. 배열을 선언하고 사용하며 인덱스로 요소에 접근하는 방법을 이해합니다.
descriptionEn: Learn about arrays in C#. Understand how to declare, use, and access array elements by index.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 13
---

# 13. 배열 (Array)

## 배열이란?

같은 타입의 데이터를 여러 개 저장할 수 있는 변수입니다. 번호(인덱스)로 각 데이터에 접근할 수 있습니다.

## 배열 선언하기

```csharp
// 방법 1: 크기를 먼저 정하고 나중에 값 넣기
int[] myArray = new int[3];  // 크기가 3인 배열 생성

myArray[0] = 8;   // 첫 번째 칸에 8 저장
myArray[1] = 16;  // 두 번째 칸에 16 저장
myArray[2] = 32;  // 세 번째 칸에 32 저장

// 방법 2: 선언과 동시에 값 넣기
int[] myArray2 = {3, 6, 9};  // 바로 값 넣기
```

## 배열 사용하기

```csharp
void Start()
{
    Debug.Log(myArray[0]);   // 8 출력 (첫 번째 값)
    Debug.Log(myArray[1]);   // 16 출력 (두 번째 값)
    Debug.Log(myArray2[2]);  // 9 출력 (세 번째 값)
}
```

## 배열의 특징

- **인덱스는 0부터 시작**: 첫 번째 값은 `[0]`, 두 번째 값은 `[1]`
- **크기가 고정**: 한 번 만들면 크기를 바꿀 수 없음
- **같은 타입만 저장**: `int[]` 배열에는 정수만 저장 가능

## 배열의 장단점

### 장점
- **빠른 접근**: 인덱스로 바로 접근 가능
- **메모리 효율**: 연속된 메모리에 저장되어 효율적

### 단점
- **크기 고정**: 나중에 크기를 늘리거나 줄일 수 없음
- **삽입/삭제 어려움**: 중간에 값을 넣거나 빼기 어려움

## 실전 활용 예시

**예시 1: 플레이어 점수 배열**
```csharp
public class ScoreManager : MonoBehaviour
{
    // 최고 점수 5개 저장
    int[] topScores = new int[5];
    
    void Start()
    {
        topScores[0] = 1000;
        topScores[1] = 850;
        topScores[2] = 720;
        topScores[3] = 600;
        topScores[4] = 500;
    }
}
```

**예시 2: 아이템 이름 배열**
```csharp
public class Inventory : MonoBehaviour
{
    // 인벤토리 슬롯 (최대 10개)
    string[] inventory = new string[10];
    
    void Start()
    {
        inventory[0] = "검";
        inventory[1] = "방패";
        inventory[2] = "물약";
        
        Debug.Log("첫 번째 아이템: " + inventory[0]);  // "검" 출력
    }
}
```

**예시 3: 적 스폰 위치 배열**
```csharp
public class EnemySpawner : MonoBehaviour
{
    // 적이 스폰될 위치들 (고정된 5개 위치)
    Vector3[] spawnPoints = new Vector3[5];
    
    void Start()
    {
        spawnPoints[0] = new Vector3(0, 0, 0);
        spawnPoints[1] = new Vector3(10, 0, 0);
        spawnPoints[2] = new Vector3(20, 0, 0);
        spawnPoints[3] = new Vector3(0, 0, 10);
        spawnPoints[4] = new Vector3(10, 0, 10);
        
        // 또는 선언과 동시에 초기화
        Vector3[] quickSpawnPoints = {
            new Vector3(0, 0, 0),
            new Vector3(10, 0, 0),
            new Vector3(20, 0, 0)
        };
    }
}
```

**예시 4: 무기 데미지 배열**
```csharp
public class WeaponManager : MonoBehaviour
{
    // 각 무기 타입별 데미지 (고정된 값)
    int[] weaponDamages = { 10, 15, 20, 25, 30 };
    
    // 무기 타입: 0=검, 1=활, 2=지팡이, 3=도끼, 4=창
    int GetWeaponDamage(int weaponType)
    {
        if (weaponType >= 0 && weaponType < weaponDamages.Length)
        {
            return weaponDamages[weaponType];
        }
        return 0;
    }
}
```

---

[← 목차로 돌아가기](../README.md)

