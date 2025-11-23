# 14. 리스트 (List)

## 리스트란?

배열과 비슷하지만 크기를 자유롭게 늘리거나 줄일 수 있는 동적 배열입니다. Unity에서 자주 사용하는 자료구조입니다.

## 리스트 선언하기

```csharp
using System.Collections.Generic;  // 필수!

// 방법 1: 빈 리스트 만들고 나중에 값 추가
public List<int> myList = new List<int>();

// 방법 2: 선언과 동시에 값 넣기
public List<int> myList2 = new List<int>() { 4, 6, 9 };
```

## 리스트 주요 메서드

### Add() - 값 추가

```csharp
myList.Add(5);   // 리스트 끝에 5 추가
myList.Add(10);  // 리스트 끝에 10 추가
myList.Add(15);  // 리스트 끝에 15 추가
// 결과: [5, 10, 15]
```

### Insert() - 특정 위치에 삽입

```csharp
myList.Insert(1, 7);  // 인덱스 1 위치에 7 삽입
// 결과: [5, 7, 10, 15] (기존 값들은 뒤로 밀림)
```

### Remove() - 값으로 제거

```csharp
myList.Remove(5);   // 값이 5인 항목 제거
myList.Remove(10);  // 값이 10인 항목 제거
// 결과: [7, 15]
```

### RemoveAt() - 인덱스로 제거

```csharp
myList.RemoveAt(2);  // 인덱스 2 위치의 값 제거
```

## 리스트 사용 예시

```csharp
void Start()
{
    // 리스트에 값 추가
    myList.Add(5);
    myList.Add(10);
    myList.Add(15);
    
    // 특정 위치에 삽입
    myList.Insert(1, 7);  // [5, 7, 10, 15]
    
    // 값 제거
    myList.Remove(5);     // [7, 10, 15]
    
    // 인덱스로 제거
    myList.RemoveAt(2); // [7, 10]
    
    // 값 접근 (배열과 동일)
    Debug.Log(myList[0]);  // 7 출력
}
```

## 배열 vs 리스트 비교

| 특징 | 배열 (Array) | 리스트 (List) |
|-----|------------|-------------|
| 크기 | 고정 (변경 불가) | 동적 (변경 가능) |
| 값 추가 | 어려움 | `Add()` 쉬움 |
| 값 삽입 | 어려움 | `Insert()` 쉬움 |
| 값 제거 | 어려움 | `Remove()` 쉬움 |
| 접근 속도 | 빠름 | 빠름 |
| 메모리 | 효율적 | 약간 더 사용 |

## 언제 무엇을 사용할까?

### 배열 사용
- 크기가 고정되어 있고 변하지 않을 때
- 성능이 매우 중요한 경우
- 간단한 데이터 저장

### 리스트 사용
- 크기가 변할 수 있을 때
- 값을 자주 추가/삭제할 때
- Unity에서 대부분의 경우 (더 유연함)

## 실전 활용 예시

```csharp
// 플레이어 인벤토리
List<string> inventory = new List<string>();
inventory.Add("검");
inventory.Add("방패");
inventory.Add("물약");

// 아이템 제거
inventory.Remove("물약");

// 점수 리스트
List<int> scores = new List<int>();
scores.Add(100);
scores.Add(200);
scores.Add(150);
```

---

[← 목차로 돌아가기](../README.md)

