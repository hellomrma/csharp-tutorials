using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// 화살 오브젝트를 제어하는 클래스
// 화살의 이동, 화면 밖으로 나갔을 때의 삭제, 플레이어와의 충돌 감지를 담당합니다.
public class ArrowController : MonoBehaviour
{
    // 화살의 이동 속도 (매 프레임마다 아래로 이동하는 거리)
    // 값이 클수록 화살이 더 빠르게 이동합니다.
    public float arrowSpped = 0.1f;

    // 플레이어 오브젝트의 참조를 저장하는 변수
    // 충돌 감지를 위해 플레이어의 위치를 확인하는데 사용됩니다.
    GameObject player;

    // 게임 시작 시 한 번만 호출되는 초기화 메서드
    // 씬에서 "player"라는 이름을 가진 게임 오브젝트를 찾아 참조를 저장합니다.
    void Start()
    {
        // 씬에서 "player"라는 이름의 게임 오브젝트를 찾아 참조를 저장
        player = GameObject.Find("player");
    }

    // 매 프레임마다 호출되는 업데이트 메서드
    // 화살의 이동, 화면 밖으로 나갔는지 확인, 플레이어와의 충돌 감지를 수행합니다.
    void Update()
    {
        // 화살을 아래 방향으로 이동시킵니다
        // Translate(x, y, z): 현재 위치에서 지정된 벡터만큼 이동
        // y축을 음수 방향(-arrowSpped)으로 이동하여 화살이 아래로 떨어지도록 함
        transform.Translate(0, -arrowSpped, 0);

        // 화살이 화면 아래로 너무 멀리 나갔는지 확인
        // y 좌표가 -6보다 작으면 화살이 화면 밖으로 나간 것으로 판단
        if (transform.position.y < -6f)
        {
            // 화살 오브젝트를 메모리에서 제거하여 삭제
            Destroy(gameObject);
        }

        // 충돌 감지를 위한 원거리 계산 (원-원 충돌 감지 알고리즘 사용)
        
        // 화살의 현재 위치를 2D 벡터로 저장
        Vector2 p1 = transform.position;  // Arrow
        
        // 플레이어의 현재 위치를 2D 벡터로 저장
        Vector2 p2 = player.transform.position; // Player

        // 화살에서 플레이어로의 방향 벡터를 계산
        // p1 - p2는 화살 위치에서 플레이어 위치를 뺀 벡터 (화살에서 플레이어로의 방향)
        Vector2 direction = p1 - p2;
        
        // 두 오브젝트 사이의 거리를 계산 (벡터의 크기)
        float d = direction.magnitude;
        
        // 화살의 충돌 반경 (화살의 크기를 고려한 반지름)
        float r1 = 0.5f; // Arrow radius
        
        // 플레이어의 충돌 반경 (플레이어의 크기를 고려한 반지름)
        float r2 = 1.0f; // Player radius

        // 원-원 충돌 감지: 두 원의 중심 사이의 거리가 두 반지름의 합보다 작으면 충돌
        // d < r1 + r2: 두 오브젝트가 겹쳤다는 의미
        if (d < r1 + r2)
        {
            // 씬에서 "GameManager"라는 이름의 게임 오브젝트를 찾아 참조를 가져옵니다
            GameObject gm = GameObject.Find("GameManager");
            
            // GameManager 컴포넌트를 가져와서 DecreaseHp() 메서드를 호출
            // 플레이어가 화살에 맞았으므로 HP를 감소시킵니다
            gm.GetComponent<GameManager>().DecreaseHp();

            // 충돌이 감지되었으므로 화살 오브젝트를 삭제
            // (플레이어가 화살에 맞은 것으로 처리)
            Destroy(gameObject);
        }   
    }
}
