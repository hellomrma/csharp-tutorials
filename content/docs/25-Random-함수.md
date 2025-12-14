---
title: Random 함수
titleEn: Random Function
slugEn: 25-random-function
description: C#의 Random 클래스를 학습합니다. 랜덤 숫자를 생성하고 게임에서 활용하는 방법을 이해합니다.
descriptionEn: Learn about the Random class in C#. Understand how to generate random numbers and use them in games.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 25
---

# 25. Random 함수

## Random이란?

Random은 **무작위 숫자를 생성**하는 클래스입니다. 게임에서 적의 위치를 랜덤하게 배치하거나, 아이템을 랜덤하게 드롭하거나, 데미지를 랜덤하게 계산할 때 사용합니다.

## 기본 개념

- **시드(Seed)**: 랜덤 숫자 생성의 시작점 (같은 시드면 같은 결과)
- **범위 지정**: 최소값과 최대값 사이의 숫자 생성
- **Unity Random**: Unity는 자체 Random 클래스를 제공 (UnityEngine.Random)

## Random 클래스 사용하기

### System.Random 사용

```csharp
using System;

// Random 인스턴스 생성
Random random = new Random();

// 0 이상 10 미만의 정수 생성 (0~9)
int number = random.Next(10);
Debug.Log($"랜덤 숫자: {number}");

// 1 이상 11 미만의 정수 생성 (1~10)
int dice = random.Next(1, 11);
Debug.Log($"주사위: {dice}");

// 0.0 이상 1.0 미만의 실수 생성
double value = random.NextDouble();
Debug.Log($"실수: {value}");
```

### UnityEngine.Random 사용 (Unity 전용)

```csharp
using UnityEngine;

// 0 이상 10 미만의 정수 생성 (0~9)
int number = Random.Range(0, 10);
Debug.Log($"랜덤 숫자: {number}");

// 1 이상 11 미만의 정수 생성 (1~10)
int dice = Random.Range(1, 11);
Debug.Log($"주사위: {dice}");

// 0.0 이상 1.0 미만의 실수 생성
float value = Random.value;
Debug.Log($"실수: {value}");

// 0.0 이상 10.0 미만의 실수 생성
float floatValue = Random.Range(0f, 10f);
Debug.Log($"실수 범위: {floatValue}");
```

## 주요 메서드

### Next() - 정수 생성

```csharp
using System;
Random random = new Random();

// 0 이상 지정값 미만의 정수
int num1 = random.Next(10);  // 0~9

// 최소값 이상 최대값 미만의 정수
int num2 = random.Next(1, 11);  // 1~10

// 음수도 가능
int num3 = random.Next(-10, 10);  // -10~9
```

### NextDouble() - 실수 생성

```csharp
using System;
Random random = new Random();

// 0.0 이상 1.0 미만의 실수
double value = random.NextDouble();
Debug.Log($"0~1 사이 값: {value}");

// 범위 변환 (예: 0~100)
double scaled = value * 100;
Debug.Log($"0~100 사이 값: {scaled}");
```

### Random.Range() - Unity 전용

```csharp
using UnityEngine;

// 정수 범위 (최대값 제외)
int intValue = Random.Range(0, 10);  // 0~9

// 실수 범위 (최대값 포함)
float floatValue = Random.Range(0f, 10f);  // 0.0~10.0

// 음수 범위
int negative = Random.Range(-5, 5);  // -5~4
```

### Random.value - 0~1 실수

```csharp
using UnityEngine;

// 0.0 이상 1.0 미만의 실수
float value = Random.value;
Debug.Log($"랜덤 값: {value}");
```

## Random 사용 예시

### 예시 1: 주사위 굴리기

```csharp
using UnityEngine;

public class DiceRoller : MonoBehaviour
{
    void Start()
    {
        // 6면 주사위 굴리기
        int dice = Random.Range(1, 7);
        Debug.Log($"주사위 결과: {dice}");
        
        // 여러 번 굴리기
        for (int i = 0; i < 5; i++)
        {
            int result = Random.Range(1, 7);
            Debug.Log($"{i + 1}번째: {result}");
        }
    }
}
```

### 예시 2: 랜덤 위치에 오브젝트 생성

```csharp
using UnityEngine;

public class RandomSpawner : MonoBehaviour
{
    public GameObject prefab;
    
    void Start()
    {
        // 랜덤 위치 생성
        for (int i = 0; i < 10; i++)
        {
            float x = Random.Range(-10f, 10f);
            float y = Random.Range(0f, 5f);
            float z = Random.Range(-10f, 10f);
            
            Vector3 position = new Vector3(x, y, z);
            Instantiate(prefab, position, Quaternion.identity);
        }
    }
}
```

### 예시 3: 랜덤 데미지 계산

```csharp
using UnityEngine;

public class CombatSystem : MonoBehaviour
{
    public int baseDamage = 50;
    public float damageVariation = 0.2f;  // 20% 변동
    
    int CalculateDamage()
    {
        // 기본 데미지의 80%~120% 사이
        float minDamage = baseDamage * (1f - damageVariation);
        float maxDamage = baseDamage * (1f + damageVariation);
        
        int damage = Mathf.RoundToInt(Random.Range(minDamage, maxDamage));
        return damage;
    }
    
    void Attack()
    {
        int damage = CalculateDamage();
        Debug.Log($"데미지: {damage}");
    }
}
```

### 예시 4: 랜덤 색상 생성

```csharp
using UnityEngine;

public class RandomColor : MonoBehaviour
{
    void Start()
    {
        // 랜덤 색상 생성
        Color randomColor = new Color(
            Random.value,
            Random.value,
            Random.value,
            1f
        );
        
        GetComponent<Renderer>().material.color = randomColor;
    }
}
```

### 예시 5: 랜덤 아이템 드롭

```csharp
using UnityEngine;
using System.Collections.Generic;

public class ItemDrop : MonoBehaviour
{
    public List<GameObject> items = new List<GameObject>();
    public float dropChance = 0.3f;  // 30% 확률
    
    void OnDestroy()
    {
        // 30% 확률로 아이템 드롭
        if (Random.value < dropChance)
        {
            // 랜덤 아이템 선택
            int randomIndex = Random.Range(0, items.Count);
            GameObject item = items[randomIndex];
            
            Instantiate(item, transform.position, Quaternion.identity);
            Debug.Log("아이템 드롭!");
        }
    }
}
```

## 시드(Seed) 사용하기

### 같은 시드로 재현 가능한 랜덤

```csharp
using System;
using UnityEngine;

public class SeededRandom : MonoBehaviour
{
    void Start()
    {
        // 시드 설정 (같은 시드면 같은 결과)
        Random.InitState(12345);
        
        // 항상 같은 순서로 랜덤 숫자 생성
        Debug.Log(Random.Range(0, 100));  // 항상 같은 값
        Debug.Log(Random.Range(0, 100));  // 항상 같은 값
        
        // 시드를 시간으로 설정 (매번 다름)
        Random.InitState((int)System.DateTime.Now.Ticks);
    }
}
```

### System.Random 시드 사용

```csharp
using System;

// 시드 지정
Random random1 = new Random(12345);
Random random2 = new Random(12345);

// 같은 시드면 같은 결과
int num1 = random1.Next(100);
int num2 = random2.Next(100);
// num1과 num2는 같은 값
```

## 랜덤 배열/리스트 요소 선택

### 배열에서 랜덤 선택

```csharp
using UnityEngine;

public class RandomArray : MonoBehaviour
{
    public string[] names = { "홍길동", "김철수", "이영희", "박민수" };
    
    void Start()
    {
        // 랜덤 인덱스
        int randomIndex = Random.Range(0, names.Length);
        string randomName = names[randomIndex];
        
        Debug.Log($"선택된 이름: {randomName}");
    }
}
```

### 리스트에서 랜덤 선택

```csharp
using UnityEngine;
using System.Collections.Generic;

public class RandomList : MonoBehaviour
{
    public List<GameObject> enemies = new List<GameObject>();
    
    void SpawnRandomEnemy()
    {
        if (enemies.Count > 0)
        {
            int randomIndex = Random.Range(0, enemies.Count);
            GameObject enemy = enemies[randomIndex];
            Instantiate(enemy, transform.position, Quaternion.identity);
        }
    }
}
```

## 확률 기반 선택

### 확률에 따른 선택

```csharp
using UnityEngine;

public class ProbabilitySystem : MonoBehaviour
{
    void Start()
    {
        float randomValue = Random.value;
        
        if (randomValue < 0.5f)  // 50% 확률
        {
            Debug.Log("일반 아이템");
        }
        else if (randomValue < 0.8f)  // 30% 확률
        {
            Debug.Log("레어 아이템");
        }
        else  // 20% 확률
        {
            Debug.Log("전설 아이템");
        }
    }
}
```

### 가중치 기반 선택

```csharp
using UnityEngine;
using System.Collections.Generic;

public class WeightedRandom : MonoBehaviour
{
    void Start()
    {
        // 아이템과 확률
        Dictionary<string, float> items = new Dictionary<string, float>
        {
            { "일반", 50f },
            { "레어", 30f },
            { "전설", 20f }
        };
        
        string selected = SelectWeightedItem(items);
        Debug.Log($"선택된 아이템: {selected}");
    }
    
    string SelectWeightedItem(Dictionary<string, float> items)
    {
        float totalWeight = 0f;
        foreach (float weight in items.Values)
        {
            totalWeight += weight;
        }
        
        float randomValue = Random.Range(0f, totalWeight);
        float currentWeight = 0f;
        
        foreach (var item in items)
        {
            currentWeight += item.Value;
            if (randomValue <= currentWeight)
            {
                return item.Key;
            }
        }
        
        return "";
    }
}
```

## 실전 활용 예시

### 예시 1: 랜덤 적 스폰

```csharp
using UnityEngine;
using System.Collections.Generic;

public class EnemySpawner : MonoBehaviour
{
    public List<GameObject> enemyPrefabs = new List<GameObject>();
    public float spawnInterval = 2f;
    public float spawnRadius = 10f;
    
    void Start()
    {
        InvokeRepeating("SpawnEnemy", 0f, spawnInterval);
    }
    
    void SpawnEnemy()
    {
        // 랜덤 적 선택
        int randomIndex = Random.Range(0, enemyPrefabs.Count);
        GameObject enemy = enemyPrefabs[randomIndex];
        
        // 랜덤 위치 계산
        Vector2 randomCircle = Random.insideUnitCircle * spawnRadius;
        Vector3 spawnPosition = transform.position + new Vector3(randomCircle.x, 0f, randomCircle.y);
        
        Instantiate(enemy, spawnPosition, Quaternion.identity);
    }
}
```

### 예시 2: 랜덤 퀘스트 생성

```csharp
using UnityEngine;
using System.Collections.Generic;

public class QuestGenerator : MonoBehaviour
{
    public List<string> questTypes = new List<string> { "사냥", "수집", "탐험" };
    public List<string> targets = new List<string> { "고블린", "늑대", "곰" };
    
    string GenerateQuest()
    {
        string type = questTypes[Random.Range(0, questTypes.Count)];
        string target = targets[Random.Range(0, targets.Count)];
        int count = Random.Range(5, 15);
        
        return $"{type} 퀘스트: {target} {count}마리 처치";
    }
}
```

### 예시 3: 랜덤 보상 시스템

```csharp
using UnityEngine;

public class RewardSystem : MonoBehaviour
{
    public int minGold = 10;
    public int maxGold = 100;
    public float itemDropChance = 0.3f;
    
    void GiveReward()
    {
        // 골드 보상
        int gold = Random.Range(minGold, maxGold + 1);
        Debug.Log($"골드 획득: {gold}");
        
        // 아이템 드롭 확률
        if (Random.value < itemDropChance)
        {
            Debug.Log("아이템 획득!");
            // 아이템 드롭 로직...
        }
    }
}
```

## 주의사항

1. **범위 차이**: `Random.Range(0, 10)`은 0~9 (최대값 제외), `Random.Range(0f, 10f)`는 0.0~10.0 (최대값 포함)
2. **시드 재사용**: 같은 시드를 사용하면 같은 결과가 나옴 (디버깅에는 유용, 게임에는 부적합)
3. **성능**: UnityEngine.Random이 System.Random보다 Unity에서 더 최적화됨
4. **스레드 안전성**: UnityEngine.Random은 메인 스레드에서만 사용 가능

## 실전 활용 팁

### 팁 1: 범위 기억하기

```csharp
// 정수: 최대값 제외
int intValue = Random.Range(0, 10);  // 0~9

// 실수: 최대값 포함
float floatValue = Random.Range(0f, 10f);  // 0.0~10.0
```

### 팁 2: 확률 계산

```csharp
// 30% 확률
if (Random.value < 0.3f)
{
    // 실행
}

// 1% 확률
if (Random.value < 0.01f)
{
    // 실행
}
```

### 팁 3: 랜덤 방향 벡터

```csharp
// 2D 랜덤 방향
Vector2 randomDirection2D = Random.insideUnitCircle;

// 3D 랜덤 방향
Vector3 randomDirection3D = Random.onUnitSphere;

// 랜덤 회전
Quaternion randomRotation = Random.rotation;
```

### 팁 4: 중복 제거

```csharp
using UnityEngine;
using System.Collections.Generic;

public class UniqueRandom : MonoBehaviour
{
    List<int> usedNumbers = new List<int>();
    
    int GetUniqueRandom(int min, int max)
    {
        if (usedNumbers.Count >= (max - min))
        {
            usedNumbers.Clear();  // 모두 사용했으면 초기화
        }
        
        int randomNum;
        do
        {
            randomNum = Random.Range(min, max);
        } while (usedNumbers.Contains(randomNum));
        
        usedNumbers.Add(randomNum);
        return randomNum;
    }
}
```

---

[← 목차로 돌아가기](../README.md)
