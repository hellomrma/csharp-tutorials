---
title: "Completing GameManager – Time.timeScale and Game State Flow"
titleEn: "Completing GameManager – Time.timeScale and Game State Flow"
category: "Practice"
categoryEn: "Practice"
order: 56
description: "Pause the game with Time.timeScale and build a complete GameManager that switches between title, game, game-over, and clear panels. Display progress with a Slider and manage sound effects with SoundManager"
descriptionEn: "Pause the game with Time.timeScale and build a complete GameManager that switches between title, game, game-over, and clear panels. Display progress with a Slider and manage sound effects with SoundManager"
slugEn: "56-gamemanager-timescale-game-state-flow"
tags: ["Time.timeScale", "Slider", "GameManager", "SoundManager", "AudioSource", "UI Panel", "SceneManager"]
---

# 56. Completing GameManager – Time.timeScale and Game State Flow

`GameManager` in the math runner game orchestrates the entire title → game → game-over/clear flow. It uses `Time.timeScale` to pause the game, switches between UI panels, and updates a Slider in real time to show progress. `SoundManager` manages four event sounds as a singleton.

---

## Game Structure

| Script | Role |
|--------|------|
| `GameManager` | Game state (start/over/clear), UI panel switching, progress bar |
| `SoundManager` | Door hit, raptor death, game clear, game-over sound effects |

---

## GameManager – Full Code

```csharp
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;

    public bool isGameStart;

    public GameObject titlePanel;
    public GameObject gamePanel;
    public GameObject gameOverPanel;
    public GameObject clearPanel;

    public Slider progressBar;

    public TextMeshProUGUI nowStageText;
    public TextMeshProUGUI nextStageText;

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

    public void Start()
    {
        Time.timeScale = 0f;           // pause on title screen
        progressBar.value = 0f;
        titlePanel.SetActive(true);
        gamePanel.SetActive(false);
        gameOverPanel.SetActive(false);
        clearPanel.SetActive(false);

        nowStageText.text  = MapManager.instance.GetStage().ToString();
        nextStageText.text = (MapManager.instance.GetStage() + 1).ToString();
    }

    public void GameStart()
    {
        isGameStart = true;
        titlePanel.SetActive(false);
        gamePanel.SetActive(true);
        Time.timeScale = 1f;           // resume game
    }

    void Update()
    {
        SetDistanceProgressBar();
    }

    public void SetDistanceProgressBar()
    {
        if (!isGameStart) return;

        float goalDistance = DinoController.instance.transform.position.z
                           / MapManager.instance.GetGoalDistance();
        progressBar.value = goalDistance;
    }

    public void GameOver()
    {
        SoundManager.instance.GameOverSoundPlay();
        isGameStart = false;
        Time.timeScale = 0f;
        gamePanel.SetActive(false);
        gameOverPanel.SetActive(true);
    }

    public void StageClear()
    {
        SoundManager.instance.GameClearSoundPlay();
        isGameStart = false;
        Time.timeScale = 0f;
        gamePanel.SetActive(false);
        clearPanel.SetActive(true);
    }

    public void RestartGame()
    {
        SceneManager.LoadScene(0);
    }
}
```

---

## SoundManager – Full Code

```csharp
using UnityEngine;

public class SoundManager : MonoBehaviour
{
    public static SoundManager instance;
    public AudioSource doorHit;
    public AudioSource dinoDie;
    public AudioSource gameClear;
    public AudioSource gameOver;

    private void Awake()
    {
        if (instance != null)
        {
            Destroy(this.gameObject);
        }
        else
        {
            instance = this;
        }
    }

    public void DoorHitSoundPlay()   { doorHit.Play(); }
    public void DinoDieSoundPlay()   { dinoDie.Play(); }
    public void GameClearSoundPlay() { gameClear.Play(); }
    public void GameOverSoundPlay()  { gameOver.Play(); }
}
```

---

## Key Concept Explanations

### 1. Time.timeScale – Controlling Game Time

```csharp
Time.timeScale = 0f;  // pause
Time.timeScale = 1f;  // normal speed
Time.timeScale = 2f;  // double speed
```

`Time.timeScale` is the multiplier applied to Unity's physics engine and `Time.deltaTime`.

| Value | Effect |
|-------|--------|
| 0 | All movement, physics, and animations freeze |
| 1 | Normal speed |
| 0.5 | Slow motion (half speed) |
| 2 | Double speed |

When `Time.timeScale = 0`:
- `Time.deltaTime` becomes 0.
- Rigidbody physics stops.
- `Animator` animations freeze.
- **`Update()` still runs.** UI clicks still work.

This lets the title screen pause the game while the Start button remains clickable.

```csharp
// Title screen: start with the game paused
Time.timeScale = 0f;

// Start button → GameStart() called
public void GameStart()
{
    isGameStart = true;
    Time.timeScale = 1f;  // resume
}
```

---

### 2. Multiple UI Panel Switching

```csharp
titlePanel.SetActive(true);
gamePanel.SetActive(false);
gameOverPanel.SetActive(false);
clearPanel.SetActive(false);
```

Only one panel is active at a time; the others are hidden.

| State | titlePanel | gamePanel | gameOverPanel | clearPanel |
|-------|-----------|-----------|--------------|-----------|
| Before start | ✅ | ❌ | ❌ | ❌ |
| Playing | ❌ | ✅ | ❌ | ❌ |
| Game over | ❌ | ❌ | ✅ | ❌ |
| Stage clear | ❌ | ❌ | ❌ | ✅ |

Each panel is an empty GameObject under the Canvas containing buttons, text, and other UI elements.

---

### 3. Slider – Progress Bar

```csharp
public Slider progressBar;

// Initialize
progressBar.value = 0f;  // 0 to 1

// Update every frame
float goalDistance = DinoController.instance.transform.position.z
                   / MapManager.instance.GetGoalDistance();
progressBar.value = goalDistance;
```

`Slider.value` is a float between 0 and 1. Dividing the dinosaur's current Z position by the goal's Z position yields a 0–1 progress ratio:

```
Progress = current Z / goal Z

Start  (Z = 0):   0/100 = 0.0  → Slider 0%
Halfway (Z = 50): 50/100 = 0.5 → Slider 50%
Goal   (Z = 100): 100/100 = 1.0 → Slider 100%
```

Slider Inspector settings:
- `Min Value`: 0
- `Max Value`: 1
- `Whole Numbers`: unchecked

---

### 4. AudioSource – Sound Effect Management

```csharp
public AudioSource doorHit;

public void DoorHitSoundPlay()
{
    doorHit.Play();
}
```

`AudioSource.Play()` is the basic way to play a sound in Unity.

```csharp
audioSource.Play();             // play from the beginning
audioSource.PlayOneShot(clip);  // allows overlapping playback (good for short effects)
audioSource.Stop();             // stop
audioSource.Pause();            // pause
```

**`Play()` vs `PlayOneShot()`:**
- `Play()`: If already playing, restarts from the beginning.
- `PlayOneShot()`: Multiple overlapping instances can play simultaneously.

This game uses one `AudioSource` per event for simplicity. Using a single `AudioSource` with `PlayOneShot` for multiple clips is also a common pattern.

---

### 5. isGameStart Flag – Gating Game Logic

```csharp
// DinoController
void Update()
{
    if (GameManager.instance.isGameStart)  // only run while playing
    {
        DinoMove();
        DoorCheck();
    }
}

// DinoPositionController
void Update()
{
    if (!GameManager.instance.isGameStart) return;
    SetDinoPosition();
    if (raptors.childCount <= 0)
        GameManager.instance.GameOver();
}
```

A single `isGameStart` flag gates the logic in multiple scripts at once. Combined with `Time.timeScale`:

- `Time.timeScale = 0`: freezes physics and animations.
- `isGameStart = false`: stops Update logic.

Both are set together during game-over and stage-clear.

---

### 6. SceneManager.LoadScene – Restarting the Scene

```csharp
public void RestartGame()
{
    SceneManager.LoadScene(0);  // load scene at build index 0
}
```

`SceneManager.LoadScene` navigates to the specified scene. You can use an index or a name:

```csharp
SceneManager.LoadScene(0);           // scene at index 0 in Build Settings
SceneManager.LoadScene("GameScene"); // by name
```

Reloading the scene reinitializes all GameObjects, while PlayerPrefs (which holds the stage number) is preserved — so the next stage loads automatically.

---

## Complete Game Flow Summary

```
[App starts]
  ↓  MapManager.Start(): build stage map
  ↓  GameManager.Start(): Time.timeScale=0, show title panel

[Start button clicked]
  ↓  GameManager.GameStart(): isGameStart=true, Time.timeScale=1

[Playing]
  ↓  DinoController: auto-advance, left/right movement, door/goal collision
  ↓  DinoPositionController: adjust raptor count, Fibonacci layout
  ↓  Enermy: detect, chase, capture raptors
  ↓  GameManager.Update: update progress bar

[Raptor count reaches 0]
  ↓  DinoPositionController → GameManager.GameOver()
  ↓  Time.timeScale=0, show game-over panel

[Goal reached]
  ↓  DinoController → save PlayerPrefs → GameManager.StageClear()
  ↓  Time.timeScale=0, show clear panel

[Restart button]
  ↓  SceneManager.LoadScene(0): reinitialize scene, load next stage map
```

---

## Unity Scene Setup

| Item | Setting |
|------|---------|
| `GameManager` | Attach to an empty GameObject; assign all UI references |
| `SoundManager` | Attach to a separate GameObject; create child AudioSources for each sound |
| `titlePanel` | Contains Start button; wire button `OnClick` to `GameManager.GameStart` |
| `gameOverPanel` | Contains Restart button; wire `OnClick` to `GameManager.RestartGame` |
| `clearPanel` | Contains Next Stage button; wire `OnClick` to `GameManager.RestartGame` |
| `progressBar` | Add a Slider to the Canvas; set Min=0, Max=1 |
