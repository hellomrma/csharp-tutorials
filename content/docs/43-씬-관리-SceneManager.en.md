---
title: Scene Management (SceneManager)
titleEn: Scene Management (SceneManager)
slugEn: 43-scene-management-scenemanager
description: Learn how to load and manage scenes in Unity. Covers SceneManager.LoadScene(), scene transitions, scene restart, and more.
descriptionEn: Learn how to load and manage scenes in Unity. Covers SceneManager.LoadScene(), scene transitions, scene restart, and more.
category: Unity C# Application
categoryEn: Unity C# Application
order: 43
---

# 43. Scene Management (SceneManager)

## What is SceneManager?

SceneManager is a class in Unity for loading and managing scenes. It provides features such as game restart, scene transitions, and additive scene loading.

## Basic Concepts

- **Scene**: One screen or level of a game
- **Scene Load**: Load and activate a scene
- **Scene Transition**: Move from current scene to another scene
- **Scene Restart**: Reload current scene

---

## 1. Basic Scene Loading

### LoadScene() - Load Scene

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public void RestartGame()
    {
        // Reload current scene
        SceneManager.LoadScene("SampleScene");
    }
}
```

### Load by Scene Name

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadMainMenu()
    {
        // Switch to "MainMenu" scene
        SceneManager.LoadScene("MainMenu");
    }
    
    public void LoadGameScene()
    {
        // Switch to "GameScene" scene
        SceneManager.LoadScene("GameScene");
    }
}
```

### Load by Scene Index

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadSceneByIndex(int sceneIndex)
    {
        // Load by scene index (starts from 0)
        SceneManager.LoadScene(0);  // First scene
        SceneManager.LoadScene(1);  // Second scene
    }
}
```

---

## 2. Restart Current Scene

### GetActiveScene() - Get Current Scene

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public void RestartGame()
    {
        // Reset game over state
        isGameOver = false;
        
        // Reload with current active scene name
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

### Practical Example

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public static bool isGameOver = false;
    
    [Header("UI References")]
    public Image hpGauge;
    public GameObject restartButton;
    public GameObject gameOverText;
    
    public void DecreaseHp()
    {
        hpGauge.fillAmount -= 0.2f;
        hpGauge.fillAmount = Mathf.Clamp01(hpGauge.fillAmount);
        
        if (hpGauge.fillAmount <= 0f)
        {
            isGameOver = true;
            gameOverText.SetActive(true);
            restartButton.SetActive(true);
        }
    }
    
    public void RestartGame()
    {
        // Reset game over state
        isGameOver = false;
        
        // Reload current scene
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

---

## 3. Scene Loading Modes

### LoadSceneMode.Single - Load Single Scene

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    void Start()
    {
        // Unload current scene and load new scene (default)
        SceneManager.LoadScene("NewScene", LoadSceneMode.Single);
    }
}
```

### LoadSceneMode.Additive - Additive Scene Load

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    void Start()
    {
        // Keep current scene and additively load new scene
        SceneManager.LoadScene("UI", LoadSceneMode.Additive);
    }
}
```

---

## 4. Getting Scene Information

### GetActiveScene() - Get Current Active Scene

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneInfo : MonoBehaviour
{
    void Start()
    {
        // Get current active scene information
        Scene currentScene = SceneManager.GetActiveScene();
        
        Debug.Log("Scene name: " + currentScene.name);
        Debug.Log("Scene index: " + currentScene.buildIndex);
        Debug.Log("Scene path: " + currentScene.path);
    }
}
```

### GetSceneByName() - Find Scene by Name

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneFinder : MonoBehaviour
{
    void Start()
    {
        // Find scene by name
        Scene scene = SceneManager.GetSceneByName("GameScene");
        
        if (scene.IsValid())
        {
            Debug.Log("Found scene: " + scene.name);
        }
    }
}
```

---

## 5. Practical Examples

### Example 1: Game Restart Button

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public static bool isGameOver = false;
    
    [Header("UI References")]
    public GameObject restartButton;
    public GameObject gameOverText;
    
    public void RestartGame()
    {
        // Reset game over state
        isGameOver = false;
        
        // Reload current scene
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

**Unity Setup:**
1. Create UI Button
2. Assign GameManager to Button's OnClick event
3. Select RestartGame() method

### Example 2: Return to Main Menu

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public void LoadMainMenu()
    {
        // Switch to main menu scene
        SceneManager.LoadScene("MainMenu");
    }
    
    public void LoadGame()
    {
        // Switch to game scene
        SceneManager.LoadScene("GameScene");
    }
}
```

### Example 3: Move to Next Level

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelManager : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Move to next level
            LoadNextLevel();
        }
    }
    
    void LoadNextLevel()
    {
        // Get current scene index
        int currentSceneIndex = SceneManager.GetActiveScene().buildIndex;
        
        // Move to next scene
        SceneManager.LoadScene(currentSceneIndex + 1);
    }
}
```

---

## 6. Scene Build Settings

Scenes must be added to Build Settings before they can be loaded.

### Adding Scenes to Build Settings

1. Open **File > Build Settings**
2. Click **Add Open Scenes** (add currently open scene)
3. Or drag and drop scenes
4. Adjust scene order (index starts from 0)

### Checking Scene Name

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneChecker : MonoBehaviour
{
    void Start()
    {
        // Check current scene name
        string sceneName = SceneManager.GetActiveScene().name;
        Debug.Log("Current scene: " + sceneName);
    }
}
```

---

## 7. Precautions

### 1. Enter Scene Name Accurately

```csharp
// ❌ Problem: Error if scene name is not exact
SceneManager.LoadScene("Game");  // Error if actual name is "GameScene"

// ✅ Solution: Use exact scene name
SceneManager.LoadScene("GameScene");
```

### 2. Add Scene to Build Settings

```csharp
// Scenes not added to Build Settings cannot be loaded
// Need to add scene in File > Build Settings
```

### 3. Objects Destroyed on Scene Transition

```csharp
// Using LoadSceneMode.Single destroys all objects in current scene
// Use DontDestroyOnLoad() for objects to keep
```

### 4. Async Loading

```csharp
// Recommended to use async loading for large scenes
// Use SceneManager.LoadSceneAsync()
```

---

## 8. Summary

### Key SceneManager Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `LoadScene(name)` | Load scene | `LoadScene("GameScene")` |
| `LoadScene(index)` | Load scene by index | `LoadScene(0)` |
| `GetActiveScene()` | Get current scene | `GetActiveScene().name` |
| `GetSceneByName(name)` | Find scene by name | `GetSceneByName("Game")` |

### Scene Loading Modes

- **LoadSceneMode.Single**: Unload current scene and load new scene
- **LoadSceneMode.Additive**: Keep current scene and additively load new scene

### Best Practices

1. **Constant scene names**: Manage scene names as constants
2. **Check Build Settings**: Verify scenes are added
3. **Async loading**: Use LoadSceneAsync() for large scenes
4. **Scene transition effects**: Add fade in/out effects

---

## Practice Problems

1. Create a button that restarts the current scene when the game is over.

2. Create a button that transitions from main menu to game scene.

3. Create a system that automatically moves to the next level.

4. Create a class that manages scene names as constants.
