# 4. 열거형 (enum)

## enum이란?

enum은 관련된 상수들을 그룹으로 묶어서 관리하는 방법입니다.

```csharp
public enum Fruit { 
    APPLE, 
    BANANA, 
    PEACH, 
    ORANGE 
}
```

- **왜 사용하나요?**
  - 관련된 값들을 한 곳에 모아서 관리
  - 오타를 방지 (APPLE을 APLE로 잘못 쓰는 실수 방지)
  - Unity Inspector에서 드롭다운 메뉴로 선택 가능

## enum 사용하기

```csharp
public Fruit myFruit;  // Inspector에서 선택 가능

switch (myFruit)
{
    case Fruit.APPLE:
        Debug.Log("사과를 먹었어!");
        break;
    case Fruit.BANANA:
        Debug.Log("바나나를 먹었어!");
        break;
}
```

- **실전 활용 예시**
  - 아이템 타입: WEAPON, ARMOR, POTION
  - 게임 상태: MENU, PLAYING, PAUSED, GAMEOVER
  - 캐릭터 직업: WARRIOR, MAGE, ARCHER

## Unity Inspector에서 사용

1. 스크립트에 `public Fruit myFruit;` 선언
2. Unity 에디터에서 GameObject에 스크립트 추가
3. Inspector 창에서 드롭다운 메뉴로 Fruit 선택 가능
4. 게임 실행 중에도 값을 바꿀 수 있음

---

[← 목차로 돌아가기](../README.md)

