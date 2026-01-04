// Unity의 기본 컬렉션 클래스들을 사용하기 위한 네임스페이스
using System.Collections;
// 제네릭 컬렉션 클래스들을 사용하기 위한 네임스페이스
using System.Collections.Generic;
// Unity 엔진의 핵심 기능들을 사용하기 위한 네임스페이스 (GameObject, Transform, MonoBehaviour 등)
using UnityEngine;

// 플레이어 캐릭터의 이동을 제어하는 클래스
// 좌우 화살표 키 입력을 받아 플레이어를 이동시킵니다.
public class PlayerController : MonoBehaviour
{
    // 플레이어의 이동 속도를 결정하는 공개 변수
    // Unity 인스페이터에서 직접 조정 가능하며, 기본값은 0.2f입니다.
    // 값이 클수록 더 빠르게 이동합니다.
    public float moveSpeed = 0.2f;

    // 게임이 시작될 때 한 번만 호출되는 Unity 생명주기 메서드
    // 초기화 작업이나 시작 시 필요한 설정을 여기서 수행합니다.
    // 현재는 사용하지 않지만, 나중에 초기화 코드를 추가할 수 있습니다.
    void Start()
    {
        // 초기화 코드가 필요하면 여기에 작성합니다
    }

    // 매 프레임마다 호출되는 Unity 생명주기 메서드
    // 사용자 입력을 지속적으로 감지하고 플레이어를 이동시킵니다.
    void Update()
    {
        // 왼쪽 화살표 키가 눌려있는지 확인
        // GetKey는 키가 눌려있는 동안 계속 true를 반환합니다
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            // 왼쪽으로 이동: X축 방향으로 -moveSpeed만큼 이동
            // Translate는 현재 위치를 기준으로 상대적으로 이동시킵니다
            // (-moveSpeed, 0, 0)은 X축으로 음수 방향(왼쪽), Y축과 Z축은 변화 없음
            transform.Translate(-moveSpeed, 0, 0);
        }
        
        // 오른쪽 화살표 키가 눌려있는지 확인
        if (Input.GetKey(KeyCode.RightArrow))
        {
            // 오른쪽으로 이동: X축 방향으로 +moveSpeed만큼 이동
            // (moveSpeed, 0, 0)은 X축으로 양수 방향(오른쪽), Y축과 Z축은 변화 없음
            transform.Translate(moveSpeed, 0, 0);
        }
    }
}
