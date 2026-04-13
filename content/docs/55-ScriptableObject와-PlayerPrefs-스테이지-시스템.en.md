---
title: "ScriptableObject and PlayerPrefs – Stage System"
titleEn: "ScriptableObject and PlayerPrefs – Stage System"
category: "Practice"
categoryEn: "Practice"
order: 55
description: "Manage stage data as assets with ScriptableObject and persist stage progress across app restarts with PlayerPrefs"
descriptionEn: "Manage stage data as assets with ScriptableObject and persist stage progress across app restarts with PlayerPrefs"
slugEn: "55-scriptableobject-playerprefs-stage-system"
tags: ["ScriptableObject", "CreateAssetMenu", "PlayerPrefs", "FindWithTag", "Modulo", "Singleton"]
---

# 55. ScriptableObject and PlayerPrefs – Stage System

Hard-coding each stage's map layout inside scripts makes the game hard to tweak. `ScriptableObject` separates data into Unity asset files (`.asset`) that you can edit right in the Inspector. `PlayerPrefs` is a simple persistent store that keeps the current stage number even after the app is closed and reopened.

---

## Game Structure

| Script | Role |
|--------|------|
| `StageScriptableObject` | Asset that holds the list of maps for one stage |
| `MapManager` | Reads the stage number from PlayerPrefs; generates maps from the ScriptableObject |

---

## StageScriptableObject – Full Code

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "Stage", menuName = "Stage Objects/Stage", order = 0)]
public class StageScriptableObject : ScriptableObject
{
    public Map[] maps;  // map prefabs that make up this stage, in order
}
```

---

## MapManager – Full Code

```csharp
using UnityEngine;

public class MapManager : MonoBehaviour
{
    public static MapManager instance;

    public GameObject goalObject;
    public StageScriptableObject[] stages;

    private void Awake()
    {
        if (instance != null)
        {
            Destroy(gameObject);
        }
        else
        {
            instance = this;
        }
    }

    public int GetStage()
    {
        return PlayerPrefs.GetInt("Stage", 1);  // default 1 if key absent
    }

    void Start()
    {
        CreateStage();
        goalObject = GameObject.FindWithTag("Goal");
        GetGoalDistance();
    }

    private void CreateStage()
    {
        int currentStageIndex = GetStage() % stages.Length;  // stay in bounds
        StageScriptableObject stage = stages[currentStageIndex];
        CreateMap(stage.maps);
    }

    private void CreateMap(Map[] stageMaps)
    {
        Vector3 mapPosition = Vector3.zero;

        for (int i = 0; i < stageMaps.Length; i++)
        {
            Map selectedMap = stageMaps[i];

            if (i > 0)
            {
                mapPosition.z += selectedMap.GetComponent<Map>().GetMapSize() / 2f;
            }

            Map nowMap = Instantiate(selectedMap, mapPosition, Quaternion.identity, transform);
            mapPosition.z += nowMap.GetComponent<Map>().GetMapSize() / 2f;
        }
    }

    public float GetGoalDistance()
    {
        return goalObject.transform.position.z;
    }
}
```

---

## Key Concept Explanations

### 1. ScriptableObject – Data Assets

A `ScriptableObject` is a standalone data container, not a `MonoBehaviour`. It lives as a project asset file rather than being attached to a GameObject.

| Comparison | MonoBehaviour | ScriptableObject |
|------------|--------------|-----------------|
| Lives on | GameObject (component) | Project asset file |
| Instances | One per scene object | One asset shared everywhere |
| Purpose | Game logic, behavior | Configuration data, balance |
| Scene dependency | Yes | No |

```csharp
// MonoBehaviour: attached to a GameObject, can have Update/Start
public class GameManager : MonoBehaviour { }

// ScriptableObject: asset file, no Update, data only
public class StageScriptableObject : ScriptableObject
{
    public Map[] maps;
}
```

---

### 2. CreateAssetMenu – Registering an Asset Creation Menu

```csharp
[CreateAssetMenu(fileName = "Stage", menuName = "Stage Objects/Stage", order = 0)]
public class StageScriptableObject : ScriptableObject { }
```

This single attribute adds an entry to the Unity Editor's asset creation menu:

```
Unity menu → Assets → Create → Stage Objects → Stage
```

- `fileName`: default filename when the asset is created (`Stage.asset`)
- `menuName`: menu path (slashes create submenus)
- `order`: sort position within the menu

Open the generated `.asset` file in the Inspector to edit the `maps` array directly.

---

### 3. PlayerPrefs – Persistent Key-Value Storage

```csharp
// Save
PlayerPrefs.SetInt("Stage", currentStage + 1);

// Load (second argument is the default value when the key is absent)
int stage = PlayerPrefs.GetInt("Stage", 1);

// Delete (useful for testing)
PlayerPrefs.DeleteAll();
PlayerPrefs.DeleteKey("Stage");
```

`PlayerPrefs` stores data that survives app restarts using a simple key-value interface.

| Methods | Type |
|---------|------|
| `SetInt` / `GetInt` | Integer |
| `SetFloat` / `GetFloat` | Float |
| `SetString` / `GetString` | String |

**Storage location (Windows):** `HKCU\Software\[CompanyName]\[ProductName]` registry  
**Storage location (macOS/Linux):** `~/.config/unity3d/[CompanyName]/[ProductName]/`

Caveats:
- Do not store passwords or sensitive data (no encryption).
- For complex data structures, use JSON serialized to a file instead.

---

### 4. % (Modulo) – Cycling Through Array Indices

```csharp
int currentStageIndex = GetStage() % stages.Length;
```

The modulo operator keeps the index within the valid range even when the stage number exceeds the array size:

```
stages.Length = 5 (Stage0 – Stage4)

Stage 1 → 1 % 5 = 1 → stages[1]
Stage 5 → 5 % 5 = 0 → stages[0]  (wraps back to start)
Stage 7 → 7 % 5 = 2 → stages[2]
```

This lets the game loop back to the first stage automatically when the player finishes the last one.

---

### 5. FindWithTag vs Find

```csharp
// FindWithTag: searches by tag hash (faster)
goalObject = GameObject.FindWithTag("Goal");

// Find: searches by name (slower)
GameObject.Find("GoalObject");
```

`FindWithTag` uses a hash lookup internally and is more efficient than name-based `Find`. Both methods should be called once in `Start` or `Awake` and cached. Calling either in `Update` every frame hurts performance.

---

### 6. Stage System Flow

```
PlayerPrefs.GetInt("Stage", 1)   →   stage number
          ↓
stages[number % stages.Length]   →   StageScriptableObject
          ↓
stage.maps                       →   Map[] array
          ↓
CreateMap()                      →   chain map prefabs along Z-axis
          ↓
FindWithTag("Goal")              →   cache goal object
```

When the goal is reached (see `DinoController.DoorCheck`):
```csharp
PlayerPrefs.SetInt("Stage", MapManager.instance.GetStage() + 1);
GameManager.instance.StageClear();
```

After the scene restarts, `MapManager.Start` reads the new number and builds the next stage's map.

---

## Setting Up Stages in the Unity Editor

1. In the Project window, right-click → `Create > Stage Objects > Stage` to create an asset.
2. Name the assets `Stage1`, `Stage2`, …
3. In the Inspector, assign map prefabs to the `maps` array in the desired order.
4. In the `MapManager` Inspector, assign the stage assets to the `stages` array in order.

| Item | Setting |
|------|---------|
| `stages` array | Assign Stage0.asset through Stage4.asset in order |
| `goalObject` | Set automatically by `FindWithTag("Goal")` in Start |
| Map prefabs | Each map must have a `Map` component with `mapSize.z` set correctly |
