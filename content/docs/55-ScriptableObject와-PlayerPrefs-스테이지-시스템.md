---
title: "ScriptableObject와 PlayerPrefs - 스테이지 시스템"
titleEn: "ScriptableObject and PlayerPrefs – Stage System"
category: "실전"
categoryEn: "Practice"
order: 55
description: "ScriptableObject로 스테이지 데이터를 에셋으로 관리하고, PlayerPrefs로 앱 재시작 후에도 스테이지 진행 상황을 저장하는 방법을 학습합니다"
descriptionEn: "Manage stage data as assets with ScriptableObject and persist stage progress across app restarts with PlayerPrefs"
slugEn: "55-scriptableobject-playerprefs-stage-system"
tags: ["ScriptableObject", "CreateAssetMenu", "PlayerPrefs", "FindWithTag", "Modulo", "Singleton"]
---

# 55. ScriptableObject와 PlayerPrefs - 스테이지 시스템

게임에 스테이지를 추가할 때 각 스테이지의 맵 구성을 코드 안에 하드코딩하면 변경이 어렵습니다. `ScriptableObject`는 데이터를 Unity 에셋(.asset 파일)으로 분리해 Inspector에서 편집할 수 있게 합니다. `PlayerPrefs`는 앱을 껐다 켜도 유지되는 간단한 저장소로, 현재 스테이지 번호를 보존합니다.

---

## 게임 구조

| 스크립트 | 역할 |
|----------|------|
| `StageScriptableObject` | 스테이지 하나의 맵 목록을 담는 에셋 |
| `MapManager` | PlayerPrefs로 스테이지 번호 읽기, ScriptableObject로 맵 생성 |

---

## StageScriptableObject - 전체 코드

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "Stage", menuName = "Stage Objects/Stage", order = 0)]
public class StageScriptableObject : ScriptableObject
{
    public Map[] maps;  // 이 스테이지를 구성하는 맵 프리팹 배열
}
```

---

## MapManager - 전체 코드

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
        return PlayerPrefs.GetInt("Stage", 1);  // 없으면 기본값 1
    }

    void Start()
    {
        CreateStage();
        goalObject = GameObject.FindWithTag("Goal");
        GetGoalDistance();
    }

    private void CreateStage()
    {
        int currentStageIndex = GetStage() % stages.Length;  // 배열 범위 초과 방지
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

## 핵심 개념 설명

### 1. ScriptableObject - 데이터 에셋

`ScriptableObject`는 `MonoBehaviour`가 아닌 독립적인 데이터 컨테이너입니다. GameObject에 부착하지 않고 프로젝트 에셋으로 저장됩니다.

| 비교 | MonoBehaviour | ScriptableObject |
|------|--------------|-----------------|
| 부착 위치 | GameObject에 컴포넌트로 | 프로젝트 에셋 파일 |
| 인스턴스 | 씬마다 생성 | 에셋 하나가 여러 곳에서 공유 |
| 용도 | 게임 로직, 동작 | 설정 데이터, 게임 밸런스 |
| 씬 의존 | 있음 | 없음 |

```csharp
// MonoBehaviour: GameObject에 부착, Update/Start 포함 가능
public class GameManager : MonoBehaviour { }

// ScriptableObject: 에셋 파일, Update 없음, 데이터만
public class StageScriptableObject : ScriptableObject
{
    public Map[] maps;
}
```

---

### 2. CreateAssetMenu - 에셋 생성 메뉴 등록

```csharp
[CreateAssetMenu(fileName = "Stage", menuName = "Stage Objects/Stage", order = 0)]
public class StageScriptableObject : ScriptableObject { }
```

이 어트리뷰트 하나로 Unity 에디터 메뉴에 에셋 생성 항목이 추가됩니다:

```
Unity 메뉴 → Assets → Create → Stage Objects → Stage
```

- `fileName`: 생성 시 기본 파일명 (`Stage.asset`)
- `menuName`: 메뉴 경로 (슬래시로 서브메뉴 구분)
- `order`: 메뉴 내 정렬 순서

생성된 `.asset` 파일을 Inspector에서 열면 `maps` 배열을 직접 편집할 수 있습니다.

---

### 3. PlayerPrefs - 앱 재시작 후에도 유지되는 저장소

```csharp
// 저장
PlayerPrefs.SetInt("Stage", currentStage + 1);

// 읽기 (두 번째 인자는 키가 없을 때의 기본값)
int stage = PlayerPrefs.GetInt("Stage", 1);

// 삭제 (테스트용)
PlayerPrefs.DeleteAll();
PlayerPrefs.DeleteKey("Stage");
```

`PlayerPrefs`는 앱이 종료된 후에도 데이터를 유지하는 간단한 키-값 저장소입니다.

| 메서드 | 타입 |
|--------|------|
| `SetInt` / `GetInt` | 정수 |
| `SetFloat` / `GetFloat` | 실수 |
| `SetString` / `GetString` | 문자열 |

**저장 위치 (Windows)**: `HKCU\Software\[회사명]\[게임명]` 레지스트리  
**저장 위치 (macOS/Linux)**: `~/.config/unity3d/[회사명]/[게임명]/`

주의사항:
- 비밀번호나 중요한 정보는 저장하지 않습니다 (암호화 없음).
- 복잡한 데이터에는 JSON + 파일 저장을 사용합니다.

---

### 4. % (모듈로 연산) - 배열 인덱스 순환

```csharp
int currentStageIndex = GetStage() % stages.Length;
```

스테이지 번호가 배열 크기를 초과해도 나머지 연산으로 유효한 인덱스를 얻습니다:

```
stages.Length = 5 (Stage0~Stage4)

스테이지 1 → 1 % 5 = 1 → stages[1]
스테이지 5 → 5 % 5 = 0 → stages[0] (다시 처음부터)
스테이지 7 → 7 % 5 = 2 → stages[2]
```

플레이어가 마지막 스테이지를 클리어해도 게임이 처음 스테이지부터 반복됩니다.

---

### 5. FindWithTag vs Find

```csharp
// FindWithTag: 태그로 검색 (더 빠름)
goalObject = GameObject.FindWithTag("Goal");

// Find: 이름으로 검색 (느림)
GameObject.Find("GoalObject");
```

`FindWithTag`는 태그 해시로 빠르게 검색하므로 `Find`보다 효율적입니다. 두 방법 모두 `Start`나 `Awake`에서 한 번만 호출하고 캐싱해 사용합니다. `Update`에서 매 프레임 호출하면 성능에 영향을 줍니다.

---

### 6. 스테이지 시스템 전체 흐름

```
PlayerPrefs.GetInt("Stage", 1)  →  스테이지 번호
          ↓
stages[번호 % stages.Length]  →  StageScriptableObject
          ↓
stage.maps  →  Map[] 배열
          ↓
CreateMap()  →  맵 프리팹을 Z축으로 이어 붙임
          ↓
FindWithTag("Goal")  →  골 지점 오브젝트 캐싱
```

골 도달 시 (`DinoController.DoorCheck` 참고):
```csharp
PlayerPrefs.SetInt("Stage", MapManager.instance.GetStage() + 1);
GameManager.instance.StageClear();
```

씬 재시작 후 `MapManager.Start`에서 새 번호를 읽어 다음 스테이지 맵을 생성합니다.

---

## Unity 에디터에서 스테이지 설정하기

1. 프로젝트 창에서 우클릭 → `Create > Stage Objects > Stage`로 에셋 생성
2. 에셋 이름을 `Stage1`, `Stage2`, ... 로 지정
3. Inspector에서 `maps` 배열에 맵 프리팹 순서대로 할당
4. `MapManager` Inspector의 `stages` 배열에 에셋을 순서대로 등록

| 항목 | 설정 |
|------|------|
| `stages` 배열 | Stage0.asset ~ Stage4.asset 순서로 할당 |
| `goalObject` | 자동으로 `FindWithTag("Goal")`에서 설정됨 |
| 맵 프리팹 | 각 맵에 `Map` 컴포넌트 부착, `mapSize.z` 설정 필수 |
