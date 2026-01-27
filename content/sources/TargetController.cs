using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TargetController : MonoBehaviour
{
    // 속도는 변수로 관리
    float speed = 3.0f;

    // 현재 x 위치와 방향을 추적
    float currentX = 0f;
    float direction = 1f; // 1: 오른쪽, -1: 왼쪽

    void Update()
    {
        // 증감 연산자를 활용해서 x 위치 업데이트
        currentX += speed * direction * Time.deltaTime;
        
        // 경계에 도달하면 방향 반전
        if (currentX >= 20f)
        {
            currentX = 20f;
            direction = -1f; // 왼쪽으로 방향 전환
        }
        else if (currentX <= -20f)
        {
            currentX = -20f;
            direction = 1f; // 오른쪽으로 방향 전환
        }
        
        // target 오브젝트의 x 축이 +20 -20 으로 반복되게 움직이기
        transform.position = new Vector3(currentX, transform.position.y, transform.position.z);
    }
}
