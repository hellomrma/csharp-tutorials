---
title: 딕셔너리 (Dictionary)
titleEn: Dictionary
slugEn: 24-dictionary
description: C#의 딕셔너리를 학습합니다. 키-값 쌍으로 데이터를 저장하고 관리하는 방법을 이해합니다.
descriptionEn: Learn about dictionaries in C#. Understand how to store and manage data using key-value pairs.
category: Unity C# 기초
categoryEn: Unity C# Basics
order: 24
---

# 24. 딕셔너리 (Dictionary)

## 딕셔너리란?

딕셔너리는 **키(Key)와 값(Value)을 쌍으로 저장**하는 자료구조입니다. 키를 통해 값을 빠르게 찾을 수 있습니다.

## 기본 개념

- **키-값 쌍**: 각 값은 고유한 키로 접근
- **빠른 검색**: 키를 통해 O(1) 시간에 값 찾기
- **순서 보장**: C# Dictionary는 삽입 순서 유지

## 딕셔너리 선언

```csharp
using System.Collections.Generic;

// 방법 1: 빈 딕셔너리 생성
Dictionary<string, int> myDict = new Dictionary<string, int>();

// 방법 2: 초기값과 함께 생성
Dictionary<string, string> playerNames = new Dictionary<string, string>()
{
    { "player1", "홍길동" },
    { "player2", "김철수" }
};

// 방법 3: var 키워드 사용
var scores = new Dictionary<string, int>();
```

## 딕셔너리 주요 메서드

### Add() - 값 추가

```csharp
Dictionary<string, int> scores = new Dictionary<string, int>();

scores.Add("player1", 100);
scores.Add("player2", 200);
scores.Add("player3", 150);
```

### 접근 및 수정

```csharp
// 값 접근
int player1Score = scores["player1"]; // 100

// 값 수정
scores["player1"] = 250;

// 값 추가 (Add 대신 인덱서 사용 가능)
scores["player4"] = 300;
```

### ContainsKey() - 키 존재 확인

```csharp
if (scores.ContainsKey("player1"))
{
    Debug.Log("player1이 존재합니다");
    int score = scores["player1"];
}
```

### Remove() - 값 제거

```csharp
scores.Remove("player1");
```

### TryGetValue() - 안전하게 값 가져오기

```csharp
if (scores.TryGetValue("player1", out int score))
{
    Debug.Log($"player1의 점수: {score}");
}
else
{
    Debug.Log("player1을 찾을 수 없습니다");
}
```

### Count - 항목 개수

```csharp
int itemCount = scores.Count;
Debug.Log($"딕셔너리에 {itemCount}개의 항목이 있습니다");
```

### Clear() - 모든 항목 제거

```csharp
scores.Clear();
```

## 딕셔너리 사용 예시

```csharp
using System.Collections.Generic;
using UnityEngine;

public class DictionaryExample : MonoBehaviour
{
    void Start()
    {
        // 플레이어 점수 딕셔너리
        Dictionary<string, int> playerScores = new Dictionary<string, int>();
        
        // 값 추가
        playerScores.Add("홍길동", 100);
        playerScores.Add("김철수", 200);
        playerScores.Add("이영희", 150);
        
        // 값 접근
        Debug.Log($"홍길동의 점수: {playerScores["홍길동"]}");
        
        // 값 수정
        playerScores["홍길동"] = 250;
        
        // 모든 항목 순회
        foreach (KeyValuePair<string, int> pair in playerScores)
        {
            Debug.Log($"{pair.Key}: {pair.Value}");
        }
        
        // 키만 순회
        foreach (string key in playerScores.Keys)
        {
            Debug.Log($"플레이어: {key}");
        }
        
        // 값만 순회
        foreach (int value in playerScores.Values)
        {
            Debug.Log($"점수: {value}");
        }
    }
}
```

## 딕셔너리 vs 리스트 vs 배열

| 특징 | 배열 | 리스트 | 딕셔너리 |
|-----|------|--------|---------|
| 인덱스 | 숫자 (0부터) | 숫자 (0부터) | 키 (임의 타입) |
| 검색 속도 | O(1) | O(n) | O(1) |
| 순서 | 보장 | 보장 | 보장 (C#) |
| 중복 | 가능 | 가능 | 키는 불가, 값은 가능 |
| 크기 | 고정 | 동적 | 동적 |

## 실전 활용 예시

### 예시 1: 아이템 관리

```csharp
using System.Collections.Generic;
using UnityEngine;

public class Inventory : MonoBehaviour
{
    Dictionary<string, int> inventory = new Dictionary<string, int>();
    
    void Start()
    {
        AddItem("검", 1);
        AddItem("방패", 1);
        AddItem("물약", 5);
    }
    
    void AddItem(string itemName, int quantity)
    {
        if (inventory.ContainsKey(itemName))
        {
            inventory[itemName] += quantity;
        }
        else
        {
            inventory.Add(itemName, quantity);
        }
        
        Debug.Log($"{itemName} {quantity}개 추가. 총 {inventory[itemName]}개");
    }
    
    void UseItem(string itemName, int quantity)
    {
        if (inventory.ContainsKey(itemName) && inventory[itemName] >= quantity)
        {
            inventory[itemName] -= quantity;
            if (inventory[itemName] == 0)
            {
                inventory.Remove(itemName);
            }
            Debug.Log($"{itemName} {quantity}개 사용. 남은 개수: {inventory[itemName]}");
        }
        else
        {
            Debug.Log($"{itemName}이(가) 부족합니다");
        }
    }
    
    void ShowInventory()
    {
        foreach (var item in inventory)
        {
            Debug.Log($"{item.Key}: {item.Value}개");
        }
    }
}
```

### 예시 2: 플레이어 정보 관리

```csharp
using System.Collections.Generic;
using UnityEngine;

public class PlayerManager : MonoBehaviour
{
    Dictionary<int, PlayerInfo> players = new Dictionary<int, PlayerInfo>();
    
    public class PlayerInfo
    {
        public string name;
        public int level;
        public int hp;
        public int maxHp;
    }
    
    void Start()
    {
        // 플레이어 추가
        AddPlayer(1, "홍길동", 10, 100);
        AddPlayer(2, "김철수", 15, 150);
        AddPlayer(3, "이영희", 8, 80);
        
        // 플레이어 정보 조회
        if (players.TryGetValue(1, out PlayerInfo player))
        {
            Debug.Log($"{player.name}의 레벨: {player.level}, HP: {player.hp}/{player.maxHp}");
        }
        
        // 플레이어 데미지 처리
        TakeDamage(1, 30);
    }
    
    void AddPlayer(int id, string name, int level, int maxHp)
    {
        players[id] = new PlayerInfo
        {
            name = name,
            level = level,
            hp = maxHp,
            maxHp = maxHp
        };
    }
    
    void TakeDamage(int playerId, int damage)
    {
        if (players.TryGetValue(playerId, out PlayerInfo player))
        {
            player.hp -= damage;
            if (player.hp < 0) player.hp = 0;
            
            Debug.Log($"{player.name}이(가) {damage}의 데미지를 받았습니다. HP: {player.hp}/{player.maxHp}");
        }
    }
}
```

### 예시 3: 리소스 관리

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager : MonoBehaviour
{
    Dictionary<string, GameObject> prefabCache = new Dictionary<string, GameObject>();
    
    GameObject LoadPrefab(string prefabName)
    {
        // 캐시에 있으면 반환
        if (prefabCache.TryGetValue(prefabName, out GameObject cachedPrefab))
        {
            return cachedPrefab;
        }
        
        // 없으면 로드하고 캐시에 저장
        GameObject prefab = Resources.Load<GameObject>(prefabName);
        if (prefab != null)
        {
            prefabCache[prefabName] = prefab;
        }
        
        return prefab;
    }
    
    void ClearCache()
    {
        prefabCache.Clear();
    }
}
```

## 주의사항

1. **키 중복**: 같은 키를 두 번 추가하면 `ArgumentException` 발생
2. **존재하지 않는 키**: 없는 키로 접근하면 `KeyNotFoundException` 발생 (TryGetValue 사용 권장)
3. **null 키**: Dictionary는 null 키를 허용하지 않음
4. **성능**: 키 타입에 따라 해시 계산 비용이 다름 (string은 상대적으로 느림)

## 실전 활용 팁

### 팁 1: 안전하게 값 가져오기

```csharp
// ❌ 나쁜 예시
int score = scores["player1"]; // 키가 없으면 에러!

// ✅ 좋은 예시
if (scores.TryGetValue("player1", out int score))
{
    Debug.Log(score);
}
else
{
    Debug.Log("플레이어를 찾을 수 없습니다");
}
```

### 팁 2: 값이 없으면 추가, 있으면 수정

```csharp
// 방법 1: ContainsKey 사용
if (dict.ContainsKey("key"))
{
    dict["key"] = newValue;
}
else
{
    dict.Add("key", newValue);
}

// 방법 2: 인덱서 사용 (더 간단)
dict["key"] = newValue; // 키가 없으면 자동으로 추가됨
```

### 팁 3: 딕셔너리 초기화 확인

```csharp
// 딕셔너리가 비어있는지 확인
if (myDict.Count == 0)
{
    Debug.Log("딕셔너리가 비어있습니다");
}

// 또는
if (myDict == null || myDict.Count == 0)
{
    // 초기화 로직
}
```

### 팁 4: LINQ와 함께 사용

```csharp
using System.Linq;

// 값으로 정렬
var sortedByValue = scores.OrderBy(x => x.Value);

// 키로 필터링
var filtered = scores.Where(x => x.Key.StartsWith("player"));

// 최대값 찾기
var maxScore = scores.Values.Max();
```

---

[← 목차로 돌아가기](../README.md)

