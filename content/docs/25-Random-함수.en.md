---
title: Random Function
titleEn: Random Function
slugEn: 25-random-function
description: Learn about the Random class in C#. Understand how to generate random numbers and use them in games.
descriptionEn: Learn about the Random class in C#. Understand how to generate random numbers and use them in games.
category: Unity C# Basics
categoryEn: Unity C# Basics
order: 25
---

# 25. Random Function

## What is Random?

Random is a class that **generates random numbers**. It's used in games to randomly place enemies, drop items randomly, or calculate random damage.

## Basic Concepts

- **Seed**: Starting point for random number generation (same seed produces same results)
- **Range Specification**: Generate numbers between minimum and maximum values
- **Unity Random**: Unity provides its own Random class (UnityEngine.Random)

## Using the Random Class

### Using System.Random

```csharp
using System;

// Create Random instance
Random random = new Random();

// Generate integer from 0 to 9 (0 inclusive, 10 exclusive)
int number = random.Next(10);
Debug.Log($"Random number: {number}");

// Generate integer from 1 to 10 (1 inclusive, 11 exclusive)
int dice = random.Next(1, 11);
Debug.Log($"Dice: {dice}");

// Generate float from 0.0 to 1.0 (0.0 inclusive, 1.0 exclusive)
double value = random.NextDouble();
Debug.Log($"Float: {value}");
```

### Using UnityEngine.Random (Unity-specific)

```csharp
using UnityEngine;

// Generate integer from 0 to 9 (0 inclusive, 10 exclusive)
int number = Random.Range(0, 10);
Debug.Log($"Random number: {number}");

// Generate integer from 1 to 10 (1 inclusive, 11 exclusive)
int dice = Random.Range(1, 11);
Debug.Log($"Dice: {dice}");

// Generate float from 0.0 to 1.0 (0.0 inclusive, 1.0 exclusive)
float value = Random.value;
Debug.Log($"Float: {value}");

// Generate float from 0.0 to 10.0 (0.0 inclusive, 10.0 inclusive)
float floatValue = Random.Range(0f, 10f);
Debug.Log($"Float range: {floatValue}");
```

## Main Methods

### Next() - Generate Integer

```csharp
using System;
Random random = new Random();

// Integer from 0 to specified value (exclusive)
int num1 = random.Next(10);  // 0~9

// Integer from min (inclusive) to max (exclusive)
int num2 = random.Next(1, 11);  // 1~10

// Negative numbers also possible
int num3 = random.Next(-10, 10);  // -10~9
```

### NextDouble() - Generate Float

```csharp
using System;
Random random = new Random();

// Float from 0.0 to 1.0 (0.0 inclusive, 1.0 exclusive)
double value = random.NextDouble();
Debug.Log($"Value between 0~1: {value}");

// Scale to range (e.g., 0~100)
double scaled = value * 100;
Debug.Log($"Value between 0~100: {scaled}");
```

### Random.Range() - Unity-specific

```csharp
using UnityEngine;

// Integer range (max exclusive)
int intValue = Random.Range(0, 10);  // 0~9

// Float range (max inclusive)
float floatValue = Random.Range(0f, 10f);  // 0.0~10.0

// Negative range
int negative = Random.Range(-5, 5);  // -5~4
```

### Random.value - 0~1 Float

```csharp
using UnityEngine;

// Float from 0.0 to 1.0 (0.0 inclusive, 1.0 exclusive)
float value = Random.value;
Debug.Log($"Random value: {value}");
```

## Random Usage Examples

### Example 1: Rolling Dice

```csharp
using UnityEngine;

public class DiceRoller : MonoBehaviour
{
    void Start()
    {
        // Roll 6-sided dice
        int dice = Random.Range(1, 7);
        Debug.Log($"Dice result: {dice}");
        
        // Roll multiple times
        for (int i = 0; i < 5; i++)
        {
            int result = Random.Range(1, 7);
            Debug.Log($"{i + 1}th: {result}");
        }
    }
}
```

### Example 2: Spawning Objects at Random Positions

```csharp
using UnityEngine;

public class RandomSpawner : MonoBehaviour
{
    public GameObject prefab;
    
    void Start()
    {
        // Spawn at random positions
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

### Example 3: Calculating Random Damage

```csharp
using UnityEngine;

public class CombatSystem : MonoBehaviour
{
    public int baseDamage = 50;
    public float damageVariation = 0.2f;  // 20% variation
    
    int CalculateDamage()
    {
        // Between 80%~120% of base damage
        float minDamage = baseDamage * (1f - damageVariation);
        float maxDamage = baseDamage * (1f + damageVariation);
        
        int damage = Mathf.RoundToInt(Random.Range(minDamage, maxDamage));
        return damage;
    }
    
    void Attack()
    {
        int damage = CalculateDamage();
        Debug.Log($"Damage: {damage}");
    }
}
```

### Example 4: Generating Random Colors

```csharp
using UnityEngine;

public class RandomColor : MonoBehaviour
{
    void Start()
    {
        // Generate random color
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

### Example 5: Random Item Drop

```csharp
using UnityEngine;
using System.Collections.Generic;

public class ItemDrop : MonoBehaviour
{
    public List<GameObject> items = new List<GameObject>();
    public float dropChance = 0.3f;  // 30% chance
    
    void OnDestroy()
    {
        // 30% chance to drop item
        if (Random.value < dropChance)
        {
            // Select random item
            int randomIndex = Random.Range(0, items.Count);
            GameObject item = items[randomIndex];
            
            Instantiate(item, transform.position, Quaternion.identity);
            Debug.Log("Item dropped!");
        }
    }
}
```

## Using Seeds

### Reproducible Random with Same Seed

```csharp
using System;
using UnityEngine;

public class SeededRandom : MonoBehaviour
{
    void Start()
    {
        // Set seed (same seed produces same results)
        Random.InitState(12345);
        
        // Always generates same sequence of random numbers
        Debug.Log(Random.Range(0, 100));  // Always same value
        Debug.Log(Random.Range(0, 100));  // Always same value
        
        // Set seed to time (different each time)
        Random.InitState((int)System.DateTime.Now.Ticks);
    }
}
```

### Using System.Random Seed

```csharp
using System;

// Specify seed
Random random1 = new Random(12345);
Random random2 = new Random(12345);

// Same seed produces same results
int num1 = random1.Next(100);
int num2 = random2.Next(100);
// num1 and num2 are the same value
```

## Selecting Random Array/List Elements

### Random Selection from Array

```csharp
using UnityEngine;

public class RandomArray : MonoBehaviour
{
    public string[] names = { "John", "Jane", "Bob", "Alice" };
    
    void Start()
    {
        // Random index
        int randomIndex = Random.Range(0, names.Length);
        string randomName = names[randomIndex];
        
        Debug.Log($"Selected name: {randomName}");
    }
}
```

### Random Selection from List

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

## Probability-based Selection

### Selection Based on Probability

```csharp
using UnityEngine;

public class ProbabilitySystem : MonoBehaviour
{
    void Start()
    {
        float randomValue = Random.value;
        
        if (randomValue < 0.5f)  // 50% chance
        {
            Debug.Log("Common item");
        }
        else if (randomValue < 0.8f)  // 30% chance
        {
            Debug.Log("Rare item");
        }
        else  // 20% chance
        {
            Debug.Log("Legendary item");
        }
    }
}
```

### Weighted Selection

```csharp
using UnityEngine;
using System.Collections.Generic;

public class WeightedRandom : MonoBehaviour
{
    void Start()
    {
        // Items and probabilities
        Dictionary<string, float> items = new Dictionary<string, float>
        {
            { "Common", 50f },
            { "Rare", 30f },
            { "Legendary", 20f }
        };
        
        string selected = SelectWeightedItem(items);
        Debug.Log($"Selected item: {selected}");
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

## Practical Usage Examples

### Example 1: Random Enemy Spawn

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
        // Select random enemy
        int randomIndex = Random.Range(0, enemyPrefabs.Count);
        GameObject enemy = enemyPrefabs[randomIndex];
        
        // Calculate random position
        Vector2 randomCircle = Random.insideUnitCircle * spawnRadius;
        Vector3 spawnPosition = transform.position + new Vector3(randomCircle.x, 0f, randomCircle.y);
        
        Instantiate(enemy, spawnPosition, Quaternion.identity);
    }
}
```

### Example 2: Random Quest Generation

```csharp
using UnityEngine;
using System.Collections.Generic;

public class QuestGenerator : MonoBehaviour
{
    public List<string> questTypes = new List<string> { "Hunt", "Collect", "Explore" };
    public List<string> targets = new List<string> { "Goblin", "Wolf", "Bear" };
    
    string GenerateQuest()
    {
        string type = questTypes[Random.Range(0, questTypes.Count)];
        string target = targets[Random.Range(0, targets.Count)];
        int count = Random.Range(5, 15);
        
        return $"{type} Quest: Defeat {count} {target}s";
    }
}
```

### Example 3: Random Reward System

```csharp
using UnityEngine;

public class RewardSystem : MonoBehaviour
{
    public int minGold = 10;
    public int maxGold = 100;
    public float itemDropChance = 0.3f;
    
    void GiveReward()
    {
        // Gold reward
        int gold = Random.Range(minGold, maxGold + 1);
        Debug.Log($"Gold earned: {gold}");
        
        // Item drop chance
        if (Random.value < itemDropChance)
        {
            Debug.Log("Item obtained!");
            // Item drop logic...
        }
    }
}
```

## Notes

1. **Range Difference**: `Random.Range(0, 10)` is 0~9 (max exclusive), `Random.Range(0f, 10f)` is 0.0~10.0 (max inclusive)
2. **Seed Reuse**: Using the same seed produces the same results (useful for debugging, not suitable for games)
3. **Performance**: UnityEngine.Random is more optimized for Unity than System.Random
4. **Thread Safety**: UnityEngine.Random can only be used on the main thread

## Practical Tips

### Tip 1: Remember Ranges

```csharp
// Integer: max exclusive
int intValue = Random.Range(0, 10);  // 0~9

// Float: max inclusive
float floatValue = Random.Range(0f, 10f);  // 0.0~10.0
```

### Tip 2: Probability Calculation

```csharp
// 30% chance
if (Random.value < 0.3f)
{
    // Execute
}

// 1% chance
if (Random.value < 0.01f)
{
    // Execute
}
```

### Tip 3: Random Direction Vector

```csharp
// 2D random direction
Vector2 randomDirection2D = Random.insideUnitCircle;

// 3D random direction
Vector3 randomDirection3D = Random.onUnitSphere;

// Random rotation
Quaternion randomRotation = Random.rotation;
```

### Tip 4: Remove Duplicates

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
            usedNumbers.Clear();  // Reset if all used
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

[← Back to Table of Contents](../README.md)
