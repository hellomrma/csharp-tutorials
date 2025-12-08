---
title: Dictionary
titleEn: Dictionary
description: Learn about dictionaries in C#. Understand how to store and manage data using key-value pairs.
descriptionEn: Learn about dictionaries in C#. Understand how to store and manage data using key-value pairs.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 24
---

# 24. Dictionary

## What is a Dictionary?

A dictionary is a data structure that **stores key-value pairs**. You can quickly find values using keys.

## Basic Concepts

- **Key-Value Pairs**: Each value is accessed by a unique key
- **Fast Search**: Find values in O(1) time using keys
- **Order Guaranteed**: C# Dictionary maintains insertion order

## Dictionary Declaration

```csharp
using System.Collections.Generic;

// Method 1: Create empty dictionary
Dictionary<string, int> myDict = new Dictionary<string, int>();

// Method 2: Create with initial values
Dictionary<string, string> playerNames = new Dictionary<string, string>()
{
    { "player1", "John" },
    { "player2", "Jane" }
};

// Method 3: Using var keyword
var scores = new Dictionary<string, int>();
```

## Dictionary Main Methods

### Add() - Add Value

```csharp
Dictionary<string, int> scores = new Dictionary<string, int>();

scores.Add("player1", 100);
scores.Add("player2", 200);
scores.Add("player3", 150);
```

### Access and Modify

```csharp
// Access value
int player1Score = scores["player1"]; // 100

// Modify value
scores["player1"] = 250;

// Add value (can use indexer instead of Add)
scores["player4"] = 300;
```

### ContainsKey() - Check Key Existence

```csharp
if (scores.ContainsKey("player1"))
{
    Debug.Log("player1 exists");
    int score = scores["player1"];
}
```

### Remove() - Remove Value

```csharp
scores.Remove("player1");
```

### TryGetValue() - Safely Get Value

```csharp
if (scores.TryGetValue("player1", out int score))
{
    Debug.Log($"player1's score: {score}");
}
else
{
    Debug.Log("player1 not found");
}
```

### Count - Item Count

```csharp
int itemCount = scores.Count;
Debug.Log($"Dictionary has {itemCount} items");
```

### Clear() - Remove All Items

```csharp
scores.Clear();
```

## Dictionary Usage Example

```csharp
using System.Collections.Generic;
using UnityEngine;

public class DictionaryExample : MonoBehaviour
{
    void Start()
    {
        // Player score dictionary
        Dictionary<string, int> playerScores = new Dictionary<string, int>();
        
        // Add values
        playerScores.Add("John", 100);
        playerScores.Add("Jane", 200);
        playerScores.Add("Bob", 150);
        
        // Access value
        Debug.Log($"John's score: {playerScores["John"]}");
        
        // Modify value
        playerScores["John"] = 250;
        
        // Iterate through all items
        foreach (KeyValuePair<string, int> pair in playerScores)
        {
            Debug.Log($"{pair.Key}: {pair.Value}");
        }
        
        // Iterate through keys only
        foreach (string key in playerScores.Keys)
        {
            Debug.Log($"Player: {key}");
        }
        
        // Iterate through values only
        foreach (int value in playerScores.Values)
        {
            Debug.Log($"Score: {value}");
        }
    }
}
```

## Dictionary vs List vs Array

| Feature | Array | List | Dictionary |
|---------|-------|------|------------|
| Index | Number (from 0) | Number (from 0) | Key (any type) |
| Search Speed | O(1) | O(n) | O(1) |
| Order | Guaranteed | Guaranteed | Guaranteed (C#) |
| Duplicates | Possible | Possible | Keys: No, Values: Yes |
| Size | Fixed | Dynamic | Dynamic |

## Practical Usage Examples

### Example 1: Item Management

```csharp
using System.Collections.Generic;
using UnityEngine;

public class Inventory : MonoBehaviour
{
    Dictionary<string, int> inventory = new Dictionary<string, int>();
    
    void Start()
    {
        AddItem("Sword", 1);
        AddItem("Shield", 1);
        AddItem("Potion", 5);
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
        
        Debug.Log($"{itemName} {quantity} added. Total: {inventory[itemName]}");
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
            Debug.Log($"{itemName} {quantity} used. Remaining: {inventory[itemName]}");
        }
        else
        {
            Debug.Log($"{itemName} is insufficient");
        }
    }
    
    void ShowInventory()
    {
        foreach (var item in inventory)
        {
            Debug.Log($"{item.Key}: {item.Value}");
        }
    }
}
```

### Example 2: Player Information Management

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
        // Add players
        AddPlayer(1, "John", 10, 100);
        AddPlayer(2, "Jane", 15, 150);
        AddPlayer(3, "Bob", 8, 80);
        
        // Get player information
        if (players.TryGetValue(1, out PlayerInfo player))
        {
            Debug.Log($"{player.name}'s level: {player.level}, HP: {player.hp}/{player.maxHp}");
        }
        
        // Handle player damage
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
            
            Debug.Log($"{player.name} took {damage} damage. HP: {player.hp}/{player.maxHp}");
        }
    }
}
```

### Example 3: Resource Management

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager : MonoBehaviour
{
    Dictionary<string, GameObject> prefabCache = new Dictionary<string, GameObject>();
    
    GameObject LoadPrefab(string prefabName)
    {
        // Return if cached
        if (prefabCache.TryGetValue(prefabName, out GameObject cachedPrefab))
        {
            return cachedPrefab;
        }
        
        // Load and cache if not found
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

## Notes

1. **Key Duplicates**: Adding the same key twice throws `ArgumentException`
2. **Non-existent Key**: Accessing a non-existent key throws `KeyNotFoundException` (use TryGetValue instead)
3. **Null Key**: Dictionary does not allow null keys
4. **Performance**: Hash calculation cost varies by key type (string is relatively slow)

## Practical Tips

### Tip 1: Safely Get Values

```csharp
// ❌ Bad example
int score = scores["player1"]; // Error if key doesn't exist!

// ✅ Good example
if (scores.TryGetValue("player1", out int score))
{
    Debug.Log(score);
}
else
{
    Debug.Log("Player not found");
}
```

### Tip 2: Add if Missing, Modify if Exists

```csharp
// Method 1: Using ContainsKey
if (dict.ContainsKey("key"))
{
    dict["key"] = newValue;
}
else
{
    dict.Add("key", newValue);
}

// Method 2: Using indexer (simpler)
dict["key"] = newValue; // Automatically adds if key doesn't exist
```

### Tip 3: Check Dictionary Initialization

```csharp
// Check if dictionary is empty
if (myDict.Count == 0)
{
    Debug.Log("Dictionary is empty");
}

// Or
if (myDict == null || myDict.Count == 0)
{
    // Initialization logic
}
```

### Tip 4: Using with LINQ

```csharp
using System.Linq;

// Sort by value
var sortedByValue = scores.OrderBy(x => x.Value);

// Filter by key
var filtered = scores.Where(x => x.Key.StartsWith("player"));

// Find maximum value
var maxScore = scores.Values.Max();
```

---

[← Back to Table of Contents](../README.md)

