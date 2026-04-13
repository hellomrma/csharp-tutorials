---
title: "GameManager 완성 - Time.timeScale과 게임 상태 흐름"
titleEn: "Completing GameManager – Time.timeScale and Game State Flow"
category: "실전"
categoryEn: "Practice"
order: 56
description: "Time.timeScale로 게임을 일시 정지하고, 타이틀·게임·게임오버·클리어 패널을 전환하는 GameManager를 완성합니다. Slider로 진행도를 표시하고 SoundManager로 효과음을 관리합니다"
descriptionEn: "Pause the game with Time.timeScale and build a complete GameManager that switches between title, game, game-over, and clear panels. Display progress with a Slider and manage sound effects with SoundManager"
slugEn: "56-gamemanager-timescale-game-state-flow"
tags: ["Time.timeScale", "Slider", "GameManager", "SoundManager", "AudioSource", "UI Panel", "SceneManager"]
---

# 56. GameManager 완성 - Time.timeScale과 게임 상태 흐름

수학 달리기 게임의 `GameManager`는 타이틀→게임→게임오버/클리어 흐름 전체를 조율합니다. `Time.timeScale`로 게임을 일시 정지하고, UI 패널을 전환하며, Slider로 진행도를 실시간으로 표시합니다. `SoundManager`는 네 가지 이벤트 사운드를 싱글톤으로 관리합니다.

---

## 게임 구조

| 스크립트 | 역할 |
|----------|------|
| `GameManager` | 게임 상태 관리 (시작/종료/클리어), UI 패널 전환, 진행도 바 |
| `SoundManager` | 문 충돌, 랩터 사망, 게임 클리어, 게임오버 효과음 |

---

## GameManager - 전체 코드

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
        Time.timeScale = 0f;           // 타이틀에서 게임 일시 정지
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
        Time.timeScale = 1f;           // 게임 시작
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

## SoundManager - 전체 코드

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

## 핵심 개념 설명

### 1. Time.timeScale - 게임 시간 제어

```csharp
Time.timeScale = 0f;  // 게임 일시 정지
Time.timeScale = 1f;  // 정상 속도
Time.timeScale = 2f;  // 2배속
```

`Time.timeScale`은 Unity 물리 엔진과 `Time.deltaTime`에 곱해지는 배율입니다.

| 값 | 효과 |
|----|------|
| 0 | 모든 움직임, 물리, 애니메이션 정지 |
| 1 | 정상 속도 |
| 0.5 | 슬로우 모션 (절반 속도) |
| 2 | 2배속 |

`Time.timeScale = 0`이 되면:
- `Time.deltaTime`이 0이 됩니다.
- Rigidbody 물리가 멈춥니다.
- `Animator`의 애니메이션이 멈춥니다.
- **단, `Update()`는 계속 호출됩니다.** UI 클릭은 작동합니다.

이 특성을 이용해 타이틀 화면에서 게임은 멈추고 시작 버튼은 동작하게 합니다.

```csharp
// 타이틀 화면: 게임 정지 상태로 시작
Time.timeScale = 0f;

// 시작 버튼 클릭 → GameStart() 호출
public void GameStart()
{
    isGameStart = true;
    Time.timeScale = 1f;  // 게임 재개
}
```

---

### 2. 다중 UI 패널 전환

```csharp
titlePanel.SetActive(true);
gamePanel.SetActive(false);
gameOverPanel.SetActive(false);
clearPanel.SetActive(false);
```

게임 상태에 따라 하나의 패널만 켜고 나머지는 끄는 방식입니다.

| 상태 | titlePanel | gamePanel | gameOverPanel | clearPanel |
|------|-----------|-----------|--------------|-----------|
| 시작 전 | ✅ | ❌ | ❌ | ❌ |
| 게임 중 | ❌ | ✅ | ❌ | ❌ |
| 게임오버 | ❌ | ❌ | ✅ | ❌ |
| 클리어 | ❌ | ❌ | ❌ | ✅ |

각 패널은 Canvas 아래에 배치된 빈 GameObject로, 하위에 버튼·텍스트 등 UI 요소를 포함합니다.

---

### 3. Slider - 진행도 바

```csharp
public Slider progressBar;

// 초기화
progressBar.value = 0f;  // 0 ~ 1 사이 값

// 매 프레임 갱신
float goalDistance = DinoController.instance.transform.position.z
                   / MapManager.instance.GetGoalDistance();
progressBar.value = goalDistance;
```

`Slider.value`는 0~1 사이의 float입니다. 공룡의 Z 위치를 골 지점 Z 위치로 나누면 0~1 사이의 진행도가 됩니다:

```
진행도 = 현재 Z 위치 / 골 지점 Z 위치

출발(Z=0): 0/100 = 0.0 → Slider 0%
절반(Z=50): 50/100 = 0.5 → Slider 50%
도착(Z=100): 100/100 = 1.0 → Slider 100%
```

Slider Inspector 설정:
- `Min Value`: 0
- `Max Value`: 1
- `Whole Numbers`: 체크 해제

---

### 4. AudioSource - 효과음 관리

```csharp
public AudioSource doorHit;

public void DoorHitSoundPlay()
{
    doorHit.Play();
}
```

Unity에서 소리를 재생하는 기본 방법은 `AudioSource.Play()`입니다.

```csharp
audioSource.Play();             // 처음부터 재생
audioSource.PlayOneShot(clip);  // 중복 재생 허용 (짧은 효과음에 적합)
audioSource.Stop();             // 정지
audioSource.Pause();            // 일시 정지
```

**`Play()`와 `PlayOneShot()`의 차이:**
- `Play()`: 이미 재생 중이면 처음부터 다시 재생합니다.
- `PlayOneShot()`: 겹쳐서 여러 번 동시에 재생 가능합니다.

이 게임에서는 각 이벤트당 별도 `AudioSource`를 사용해 간단하게 구현했습니다. `AudioClip`을 `PlayOneShot`으로 재생하는 방식도 널리 쓰입니다.

---

### 5. isGameStart 플래그 - 게임 로직 게이트

```csharp
// DinoController
void Update()
{
    if (GameManager.instance.isGameStart)  // 게임 중일 때만 동작
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

`isGameStart` 하나로 여러 스크립트의 동작을 동시에 켜고 끕니다. `Time.timeScale = 0`과 함께 사용하면:
- `Time.timeScale = 0`: 물리·애니메이션 정지
- `isGameStart = false`: Update 내 로직 정지

게임오버나 클리어 시 두 조건을 모두 설정합니다.

---

### 6. SceneManager.LoadScene - 씬 재시작

```csharp
public void RestartGame()
{
    SceneManager.LoadScene(0);  // 인덱스 0번 씬 로드
}
```

`SceneManager.LoadScene`은 지정한 씬으로 이동합니다. 인덱스 대신 씬 이름으로도 호출할 수 있습니다:

```csharp
SceneManager.LoadScene(0);           // 빌드 설정의 0번 씬
SceneManager.LoadScene("GameScene"); // 이름으로 지정
```

씬을 다시 로드하면 모든 오브젝트가 초기화되므로 PlayerPrefs로 저장한 스테이지 번호는 유지되고 게임 상태만 초기화됩니다.

---

## 게임 전체 흐름 요약

```
[앱 시작]
  ↓  MapManager.Start(): 스테이지 맵 생성
  ↓  GameManager.Start(): Time.timeScale=0, 타이틀 패널 표시

[시작 버튼 클릭]
  ↓  GameManager.GameStart(): isGameStart=true, Time.timeScale=1

[게임 중]
  ↓  DinoController: 자동 전진, 좌우 이동, 문/골 충돌 감지
  ↓  DinoPositionController: 랩터 수 조절, 피보나치 배치
  ↓  Enermy: 랩터 탐지·추격·포획
  ↓  GameManager.Update: 진행도 바 갱신

[랩터 0마리]
  ↓  DinoPositionController → GameManager.GameOver()
  ↓  Time.timeScale=0, 게임오버 패널

[골 도달]
  ↓  DinoController → PlayerPrefs 저장 → GameManager.StageClear()
  ↓  Time.timeScale=0, 클리어 패널

[재시작 버튼]
  ↓  SceneManager.LoadScene(0): 씬 초기화, 다음 스테이지 맵 생성
```

---

## Unity 씬 설정

| 항목 | 설정 |
|------|------|
| `GameManager` | 빈 GameObject에 부착, UI 참조 할당 |
| `SoundManager` | 별도 GameObject에 부착, 각 `AudioSource` 자식으로 생성 후 할당 |
| `titlePanel` | 시작 버튼 포함, 버튼 `OnClick`에 `GameManager.GameStart` 연결 |
| `gameOverPanel` | 재시작 버튼, `OnClick`에 `GameManager.RestartGame` 연결 |
| `clearPanel` | 다음 스테이지 버튼, `OnClick`에 `GameManager.RestartGame` 연결 |
| `progressBar` | Canvas에 Slider 추가, Min=0, Max=1 |
