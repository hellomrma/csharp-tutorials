---
title: 리스트 (List)
titleEn: List
slugEn: 14-list
description: C#의 List를 학습합니다. 크기를 자유롭게 늘리거나 줄일 수 있는 동적 배열을 사용하는 방법을 이해하며, Unity에서 자주 사용하는 자료구조를 학습합니다.
descriptionEn: Learn about Lists in C#. Understand how to use dynamic arrays that can grow or shrink in size, commonly used in Unity.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 14
---

# 14. 리스트 (List)

## 리스트란?

배열과 비슷하지만 크기를 자유롭게 늘리거나 줄일 수 있는 동적 배열입니다. Unity에서 자주 사용하는 자료구조입니다.

## 리스트 선언하기

```csharp
using System.Collections.Generic;  // 필수!

// 방법 1: 빈 리스트 만들고 나중에 값 추가
public List<int> myList = new List<int>();

// 방법 2: 선언과 동시에 값 넣기
public List<int> myList2 = new List<int>() { 4, 6, 9 };
```

## 리스트 주요 메서드

### Add() - 값 추가

```csharp
myList.Add(5);   // 리스트 끝에 5 추가
myList.Add(10);  // 리스트 끝에 10 추가
myList.Add(15);  // 리스트 끝에 15 추가
// 결과: [5, 10, 15]
```

### Insert() - 특정 위치에 삽입

```csharp
myList.Insert(1, 7);  // 인덱스 1 위치에 7 삽입
// 결과: [5, 7, 10, 15] (기존 값들은 뒤로 밀림)
```

### Remove() - 값으로 제거

```csharp
myList.Remove(5);   // 값이 5인 항목 제거
myList.Remove(10);  // 값이 10인 항목 제거
// 결과: [7, 15]
```

### RemoveAt() - 인덱스로 제거

```csharp
myList.RemoveAt(2);  // 인덱스 2 위치의 값 제거
```

## 리스트 사용 예시

```csharp
void Start()
{
    // 리스트에 값 추가
    myList.Add(5);
    myList.Add(10);
    myList.Add(15);
    
    // 특정 위치에 삽입
    myList.Insert(1, 7);  // [5, 7, 10, 15]
    
    // 값 제거
    myList.Remove(5);     // [7, 10, 15]
    
    // 인덱스로 제거
    myList.RemoveAt(2); // [7, 10]
    
    // 값 접근 (배열과 동일)
    Debug.Log(myList[0]);  // 7 출력
}
```

## 배열 vs 리스트 비교

| 특징 | 배열 (Array) | 리스트 (List) |
|-----|------------|-------------|
| 크기 | 고정 (변경 불가) | 동적 (변경 가능) |
| 값 추가 | 어려움 | `Add()` 쉬움 |
| 값 삽입 | 어려움 | `Insert()` 쉬움 |
| 값 제거 | 어려움 | `Remove()` 쉬움 |
| 접근 속도 | 빠름 | 빠름 |
| 메모리 | 효율적 | 약간 더 사용 |

## 언제 무엇을 사용할까?

### 배열 사용
- 크기가 고정되어 있고 변하지 않을 때
- 성능이 매우 중요한 경우
- 간단한 데이터 저장

### 리스트 사용
- 크기가 변할 수 있을 때
- 값을 자주 추가/삭제할 때
- Unity에서 대부분의 경우 (더 유연함)

## 실전 활용 예시

**예시 1: 플레이어 인벤토리 (동적으로 아이템 추가/제거)**
```csharp
public class Inventory : MonoBehaviour
{
    List<string> inventory = new List<string>();
    
    void Start()
    {
        // 아이템 추가
        inventory.Add("검");
        inventory.Add("방패");
        inventory.Add("물약");
        inventory.Add("갑옷");
        
        Debug.Log("인벤토리 아이템 수: " + inventory.Count);  // 4
        
        // 아이템 제거
        inventory.Remove("물약");  // "물약" 제거
        Debug.Log("인벤토리 아이템 수: " + inventory.Count);  // 3
        
        // 모든 아이템 출력
        foreach (string item in inventory)
        {
            Debug.Log("아이템: " + item);
        }
    }
}
```

**예시 2: 적 리스트 관리 (동적으로 적 추가/제거)**
```csharp
public class EnemyManager : MonoBehaviour
{
    List<GameObject> enemies = new List<GameObject>();
    
    void SpawnEnemy(GameObject enemyPrefab)
    {
        GameObject newEnemy = Instantiate(enemyPrefab);
        enemies.Add(newEnemy);  // 리스트에 추가
    }
    
    void KillEnemy(GameObject enemy)
    {
        enemies.Remove(enemy);  // 리스트에서 제거
        Destroy(enemy);
    }
    
    void Update()
    {
        // 모든 적이 죽었는지 확인
        if (enemies.Count == 0)
        {
            Debug.Log("모든 적을 처치했습니다!");
        }
    }
}
```

**예시 3: 점수 리스트 (랭킹 시스템)**
```csharp
public class ScoreManager : MonoBehaviour
{
    List<int> scores = new List<int>();
    
    void AddScore(int newScore)
    {
        scores.Add(newScore);
        scores.Sort();  // 정렬
        scores.Reverse();  // 내림차순으로 변경
        
        // 최고 점수 10개만 유지
        if (scores.Count > 10)
        {
            scores.RemoveAt(10);  // 11번째부터 제거
        }
    }
}
```

**예시 4: 수집 아이템 리스트**
```csharp
public class ItemCollector : MonoBehaviour
{
    List<GameObject> collectedItems = new List<GameObject>();
    
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Item"))
        {
            collectedItems.Add(other.gameObject);  // 수집한 아이템 추가
            other.gameObject.SetActive(false);  // 아이템 숨기기
            
            Debug.Log("수집한 아이템 수: " + collectedItems.Count);
        }
    }
}
```

---

[← 목차로 돌아가기](../README.md)

