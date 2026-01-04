using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// 화살을 주기적으로 생성하는 클래스
// 일정한 시간 간격으로 화살 프리팹을 랜덤한 X 위치에 생성합니다.
public class ArrowGenerator : MonoBehaviour
{
    // 화살 프리팹 오브젝트
    // Unity 인스페이터에서 할당해야 하며, 생성할 화살의 원본 오브젝트입니다.
    public GameObject arrowPrefab;
    
    // 화살 생성 간격 (초 단위)
    // 이 시간이 지나면 새로운 화살이 생성됩니다.
    // 값이 작을수록 화살이 더 자주 생성됩니다. (현재 0.3초마다 생성)
    float spawnTime = 0.3f;
    
    // 경과 시간을 누적하는 변수
    // 마지막 화살 생성 이후 경과한 시간을 추적합니다.
    float delta = 0f;

    // 매 프레임마다 호출되는 업데이트 메서드
    // 시간을 누적하고, 일정 시간이 지나면 새로운 화살을 생성합니다.
    void Update()
    {
        // 이전 프레임과 현재 프레임 사이의 시간 간격을 누적
        // Time.deltaTime은 프레임레이트와 무관하게 일정한 시간 간격을 제공합니다.
        delta += Time.deltaTime;
        
        // 누적된 시간이 생성 간격을 초과했는지 확인
        if (delta > spawnTime)
        {
            // 타이머를 초기화하여 다음 생성 시간을 측정할 준비
            delta = 0f;
            
            // 화살 프리팹을 복제하여 새로운 화살 오브젝트를 생성
            // Instantiate는 프리팹을 기반으로 씬에 새로운 게임 오브젝트를 만듭니다.
            GameObject ar = Instantiate(arrowPrefab);
            
            // 화살이 생성될 X 좌표를 랜덤하게 결정
            // -8.4f부터 8.4f 사이의 랜덤한 값을 생성하여 화면 상단의 다양한 위치에 화살이 나타나도록 함
            float px = Random.Range(-8.4f, 8.4f);
            
            // 생성된 화살의 위치를 설정
            // X 좌표는 랜덤 값, Y 좌표는 6f (화면 상단), Z 좌표는 0 (2D 게임이므로)
            ar.transform.position = new Vector3(px, 6f, 0);
        }
    }
}

// 유니티에서 시간 관련 속성들
// 
// Time.time
// - 게임이 시작된 이후 경과한 시간(초 단위)을 반환합니다.
// - 게임이 일시정지되거나 Time.timeScale이 변경되면 영향을 받습니다.
// - 예: 5초가 지나면 5.0을 반환합니다.
// - 사용 예: 타이머, 게임 시작 후 경과 시간 측정
//
// Time.deltaTime
// - 이전 프레임과 현재 프레임 사이의 시간 간격(초 단위)을 반환합니다.
// - 프레임레이트와 무관하게 일정한 속도로 이동하거나 회전할 때 사용합니다.
// - 예: 60fps일 때 약 0.016초, 30fps일 때 약 0.033초를 반환합니다.
// - 사용 예: transform.position += Vector3.forward * speed * Time.deltaTime;
//
// Time.fixedDeltaTime
// - FixedUpdate()가 호출되는 고정된 시간 간격(초 단위)을 반환합니다.
// - 기본값은 0.02초(50Hz)이며, Edit > Project Settings > Time에서 변경 가능합니다.
// - 물리 계산과 관련된 코드에서 사용합니다.
// - 사용 예: Rigidbody를 사용한 물리 기반 이동
//
// Time.timeScale
// - 게임 시간의 흐름 속도를 제어하는 배율입니다.
// - 1.0 = 정상 속도, 0.0 = 일시정지, 2.0 = 2배 빠른 속도
// - Time.time과 Time.deltaTime에 영향을 주지만, Time.realtimeSinceStartup에는 영향 없음
// - 사용 예: 슬로우 모션, 일시정지 기능 구현
//
// Time.realtimeSinceStartup
// - 게임이 시작된 이후 경과한 실제 시간(초 단위)을 반환합니다.
// - Time.timeScale이나 게임 일시정지의 영향을 받지 않습니다.
// - 시스템의 실제 시간을 기준으로 측정됩니다.
// - 사용 예: 네트워크 동기화, 실제 시간 기반 타이머, 일시정지와 무관한 시간 측정
