using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 떨어지는 아이템(사과, 폭탄 등)을 제어하는 스크립트.
/// 아이템을 아래로 이동시키고, 일정 Y 이하가 되면 오브젝트를 제거합니다.
/// </summary>
public class ItemController : MonoBehaviour
{
    /// <summary>아래로 떨어지는 속도 (음수 = 아래 방향)</summary>
    public float speed = -0.03f;

    /// <summary>이 Y 좌표 이하가 되면 오브젝트를 삭제합니다.</summary>
    public float minY = -1.0f;

    /// <summary>
    /// 매 프레임 호출. 아이템을 아래로 이동시키고, minY 이하이면 제거합니다.
    /// </summary>
    void Update()
    {
        transform.Translate(0f, speed, 0f);

        if (transform.position.y < minY)
        {
            Destroy(gameObject);
        }
    }
}
