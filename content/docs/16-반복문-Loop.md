# 16. 반복문 (Loop)

## 반복문이란?

같은 코드를 여러 번 실행하고 싶을 때 사용하는 문법입니다. Unity에서 몬스터를 여러 마리 소환하거나, 배열의 모든 값을 확인할 때 유용합니다.

## 증감 연산자

### 증가 연산자 (++)
```csharp
int count = 0;
count++;  // count = count + 1과 같음 (결과: 1)
++count;  // count = count + 1과 같음 (결과: 2)
```

### 감소 연산자 (--)
```csharp
int count = 10;
count--;  // count = count - 1과 같음 (결과: 9)
--count;  // count = count - 1과 같음 (결과: 8)
```

## 복합 대입 연산자

변수에 값을 더하거나 빼는 간단한 방법입니다.

```csharp
int score = 100;

score += 10;  // score = score + 10 (결과: 110)
score -= 5;   // score = score - 5 (결과: 105)
score *= 2;   // score = score * 2 (결과: 210)
score /= 3;   // score = score / 3 (결과: 70)
score %= 4;   // score = score % 4 (결과: 2)
```

## while 문

조건이 **true인 동안** 계속 반복합니다.

### 기본 문법
```csharp
while (조건)
{
    // 실행할 코드
}
```

### 예시
```csharp
int count = 0;

while (count < 10)
{
    Debug.Log("미니언 소환");
    count++;  // count를 1씩 증가
}
// "미니언 소환"이 10번 출력됨
```

### 주의사항
- 조건이 항상 true이면 **무한 루프**가 발생할 수 있음
- 반드시 조건을 false로 만드는 코드가 필요함

## for 문

초기값, 조건, 증가값을 한 줄에 작성하는 반복문입니다.

### 기본 문법
```csharp
for (초기값; 조건; 증가값)
{
    // 실행할 코드
}
```

### 예시
```csharp
for (int i = 0; i < 10; i++)
{
    Debug.Log("미니언 소환 " + i);
}
// "미니언 소환 0"부터 "미니언 소환 9"까지 출력
```

### 동작 순서
1. `int i = 0` - 초기값 설정 (1번만 실행)
2. `i < 10` - 조건 확인
3. 조건이 true이면 코드 실행
4. `i++` - i를 1 증가
5. 2번으로 돌아가서 반복

## 배열과 함께 사용하기

### Array의 Length 사용
```csharp
int[] myArray = { 0, 3, 6, 9, 12, 15, 18, 21, 24, 27 };

for (int i = 0; i < myArray.Length; i++)
{
    Debug.Log(myArray[i]);  // 배열의 모든 값 출력
}
```

**중요**: 배열은 `Length`로 개수를 확인합니다.

### List의 Count 사용
```csharp
List<int> myList = new List<int>() { 4, 6, 9 };

for (int i = 0; i < myList.Count; i++)
{
    Debug.Log(myList[i]);  // 리스트의 모든 값 출력
}
```

**중요**: 리스트는 `Count`로 개수를 확인합니다. (`Length`가 아님!)

## foreach 문

배열이나 리스트의 **모든 요소를 순회**할 때 사용합니다. 인덱스가 필요 없을 때 유용합니다.

### 기본 문법
```csharp
foreach (타입 변수명 in 컬렉션)
{
    // 실행할 코드
}
```

### 예시
```csharp
List<string> names = new List<string>() { "Alice", "Bob", "Charlie" };

foreach (string name in names)
{
    Debug.Log(name);  // "Alice", "Bob", "Charlie" 순서로 출력
}
```

### foreach의 장점
- 인덱스 관리 불필요
- 코드가 간결함
- 배열 범위를 벗어날 걱정 없음

## 반복문 비교

| 반복문 | 사용 시기 | 특징 |
|-------|---------|------|
| `while` | 조건만 있을 때 | 조건이 false가 될 때까지 반복 |
| `for` | 횟수를 알고 있을 때 | 초기값, 조건, 증가값을 한 줄에 |
| `foreach` | 모든 요소를 순회할 때 | 인덱스 없이 간단하게 |

## 실전 활용 예시

### 몬스터 소환
```csharp
void Start()
{
    for (int i = 0; i < 10; i++)
    {
        Debug.Log("미니언 " + i + " 소환!");
    }
}
```

### 점수 배열 확인
```csharp
int[] scores = { 100, 200, 150, 300 };

for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] > 200)
    {
        Debug.Log("높은 점수: " + scores[i]);
    }
}
```

### 인벤토리 아이템 출력
```csharp
List<string> inventory = new List<string>() { "검", "방패", "물약" };

foreach (string item in inventory)
{
    Debug.Log("인벤토리: " + item);
}
```

## 주의사항

1. **무한 루프 주의**: while 문에서 조건이 항상 true가 되지 않도록 주의
2. **배열 범위**: for 문에서 `i < array.Length`를 사용하여 범위를 벗어나지 않도록
3. **Array는 Length, List는 Count**: 혼동하지 않도록 주의

---

[← 목차로 돌아가기](../README.md)

