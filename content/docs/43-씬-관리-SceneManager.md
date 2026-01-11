---
title: 씬 관리 (SceneManager)
titleEn: Scene Management (SceneManager)
slugEn: 43-scene-management-scenemanager
description: Unity에서 씬을 로드하고 관리하는 방법을 학습합니다. SceneManager.LoadScene(), 씬 전환, 씬 재시작 등을 다룹니다.
descriptionEn: Learn how to load and manage scenes in Unity. Covers SceneManager.LoadScene(), scene transitions, scene restart, and more.
category: Unity C# 응용
categoryEn: Unity C# Application
order: 43
---

# 43. 씬 관리 (SceneManager)

## SceneManager란?

SceneManager는 Unity에서 씬을 로드하고 관리하는 클래스입니다. 게임 재시작, 씬 전환, 씬 추가 로드 등의 기능을 제공합니다.

## 기본 개념

- **씬(Scene)**: 게임의 한 화면 또는 레벨
- **씬 로드**: 씬을 불러와서 활성화
- **씬 전환**: 현재 씬에서 다른 씬으로 이동
- **씬 재시작**: 현재 씬을 다시 로드

---

## 1. 기본 씬 로드

### LoadScene() - 씬 로드

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public void RestartGame()
    {
        // 현재 씬을 다시 로드
        SceneManager.LoadScene("SampleScene");
    }
}
```

### 씬 이름으로 로드

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadMainMenu()
    {
        // "MainMenu" 씬으로 전환
        SceneManager.LoadScene("MainMenu");
    }
    
    public void LoadGameScene()
    {
        // "GameScene" 씬으로 전환
        SceneManager.LoadScene("GameScene");
    }
}
```

### 씬 인덱스로 로드

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadSceneByIndex(int sceneIndex)
    {
        // 씬 인덱스로 로드 (0부터 시작)
        SceneManager.LoadScene(0);  // 첫 번째 씬
        SceneManager.LoadScene(1);  // 두 번째 씬
    }
}
```

---

## 2. 현재 씬 재시작

### GetActiveScene() - 현재 씬 가져오기

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public void RestartGame()
    {
        // 게임 오버 상태 초기화
        isGameOver = false;
        
        // 현재 활성 씬의 이름으로 다시 로드
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

### 실제 사용 예제

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
        // 게임 오버 상태 초기화
        isGameOver = false;
        
        // 현재 씬 재로드
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

---

## 3. 씬 전환 모드

### LoadSceneMode.Single - 단일 씬 로드

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    void Start()
    {
        // 현재 씬을 언로드하고 새 씬 로드 (기본값)
        SceneManager.LoadScene("NewScene", LoadSceneMode.Single);
    }
}
```

### LoadSceneMode.Additive - 씬 추가 로드

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    void Start()
    {
        // 현재 씬을 유지하고 새 씬 추가 로드
        SceneManager.LoadScene("UI", LoadSceneMode.Additive);
    }
}
```

---

## 4. 씬 정보 가져오기

### GetActiveScene() - 현재 활성 씬

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneInfo : MonoBehaviour
{
    void Start()
    {
        // 현재 활성 씬 정보 가져오기
        Scene currentScene = SceneManager.GetActiveScene();
        
        Debug.Log("씬 이름: " + currentScene.name);
        Debug.Log("씬 인덱스: " + currentScene.buildIndex);
        Debug.Log("씬 경로: " + currentScene.path);
    }
}
```

### GetSceneByName() - 이름으로 씬 찾기

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneFinder : MonoBehaviour
{
    void Start()
    {
        // 이름으로 씬 찾기
        Scene scene = SceneManager.GetSceneByName("GameScene");
        
        if (scene.IsValid())
        {
            Debug.Log("씬을 찾았습니다: " + scene.name);
        }
    }
}
```

---

## 5. 실제 사용 예제

### 예제 1: 게임 재시작 버튼

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
        // 게임 오버 상태 초기화
        isGameOver = false;
        
        // 현재 씬 재로드
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().name
        );
    }
}
```

**Unity 설정:**
1. UI Button 생성
2. Button의 OnClick 이벤트에 GameManager 할당
3. RestartGame() 메서드 선택

### 예제 2: 메인 메뉴로 돌아가기

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public void LoadMainMenu()
    {
        // 메인 메뉴 씬으로 전환
        SceneManager.LoadScene("MainMenu");
    }
    
    public void LoadGame()
    {
        // 게임 씬으로 전환
        SceneManager.LoadScene("GameScene");
    }
}
```

### 예제 3: 다음 레벨로 이동

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelManager : MonoBehaviour
{
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // 다음 레벨로 이동
            LoadNextLevel();
        }
    }
    
    void LoadNextLevel()
    {
        // 현재 씬 인덱스 가져오기
        int currentSceneIndex = SceneManager.GetActiveScene().buildIndex;
        
        // 다음 씬으로 이동
        SceneManager.LoadScene(currentSceneIndex + 1);
    }
}
```

---

## 6. 씬 빌드 설정

씬을 로드하려면 먼저 Build Settings에 추가해야 합니다.

### Build Settings에 씬 추가

1. **File > Build Settings** 열기
2. **Add Open Scenes** 클릭 (현재 열린 씬 추가)
3. 또는 씬을 드래그 앤 드롭
4. 씬 순서 조정 (인덱스는 0부터 시작)

### 씬 이름 확인

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneChecker : MonoBehaviour
{
    void Start()
    {
        // 현재 씬 이름 확인
        string sceneName = SceneManager.GetActiveScene().name;
        Debug.Log("현재 씬: " + sceneName);
    }
}
```

---

## 7. 주의사항

### 1. 씬 이름 정확히 입력

```csharp
// ❌ 문제: 씬 이름이 정확하지 않으면 에러 발생
SceneManager.LoadScene("Game");  // "GameScene"이 실제 이름인 경우 에러

// ✅ 해결: 정확한 씬 이름 사용
SceneManager.LoadScene("GameScene");
```

### 2. Build Settings에 씬 추가

```csharp
// Build Settings에 추가되지 않은 씬은 로드할 수 없음
// File > Build Settings에서 씬 추가 필요
```

### 3. 씬 전환 시 오브젝트 파괴

```csharp
// LoadSceneMode.Single 사용 시 현재 씬의 모든 오브젝트가 파괴됨
// 유지하고 싶은 오브젝트는 DontDestroyOnLoad() 사용
```

### 4. 비동기 로드

```csharp
// 큰 씬을 로드할 때는 비동기 로드 사용 권장
// SceneManager.LoadSceneAsync() 사용
```

---

## 8. 정리

### 주요 SceneManager 함수

| 함수 | 용도 | 예제 |
|------|------|------|
| `LoadScene(name)` | 씬 로드 | `LoadScene("GameScene")` |
| `LoadScene(index)` | 인덱스로 씬 로드 | `LoadScene(0)` |
| `GetActiveScene()` | 현재 씬 가져오기 | `GetActiveScene().name` |
| `GetSceneByName(name)` | 이름으로 씬 찾기 | `GetSceneByName("Game")` |

### 씬 전환 모드

- **LoadSceneMode.Single**: 현재 씬 언로드 후 새 씬 로드
- **LoadSceneMode.Additive**: 현재 씬 유지하고 새 씬 추가

### 베스트 프랙티스

1. **씬 이름 상수화**: 씬 이름을 상수로 관리
2. **Build Settings 확인**: 씬이 추가되어 있는지 확인
3. **비동기 로드**: 큰 씬은 LoadSceneAsync() 사용
4. **씬 전환 효과**: 페이드 인/아웃 등 효과 추가

---

## 연습 문제

1. 게임 오버 시 현재 씬을 재시작하는 버튼을 만드세요.

2. 메인 메뉴에서 게임 씬으로 전환하는 버튼을 만드세요.

3. 다음 레벨로 자동으로 이동하는 시스템을 만드세요.

4. 씬 이름을 상수로 관리하는 클래스를 만드세요.
