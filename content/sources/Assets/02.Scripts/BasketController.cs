using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 바구니(플레이어)를 제어하는 스크립트.
/// 마우스 클릭 위치로 바구니를 이동시키고, 사과/폭탄과의 충돌을 처리합니다.
/// </summary>
public class BasketController : MonoBehaviour
{

    public AudioClip appleSound;
    public AudioClip bombSound;
    AudioSource audioSource;
    public GameObject gameManager;
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    /// <summary>
    /// 매 프레임 호출. 마우스 왼쪽 클릭 시 레이캐스트로 바닥 위치를 구해 바구니를 해당 위치로 이동시킵니다.
    /// </summary>
    void Update()
    {
        // 화면의 마우스 위치에서 발사되는 레이
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if (Input.GetMouseButtonDown(0))
        {
            if (Physics.Raycast(ray, out hit, Mathf.Infinity))
            {
                // 충돌 지점을 정수로 반올림하여 그리드처럼 이동
                float x = Mathf.RoundToInt(hit.point.x);
                float z = Mathf.RoundToInt(hit.point.z);
                transform.position = new Vector3(x, 0, z);
            }
        }
    }

    /// <summary>
    /// 트리거에 다른 콜라이더가 들어오면 호출됩니다.
    /// 사과(Apple) 또는 폭탄과 충돌 시 로그를 남기고, 충돌한 오브젝트를 제거합니다.
    /// </summary>
    /// <param name="other">충돌한 오브젝트의 콜라이더</param>
    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("Apple"))
        {
            audioSource.PlayOneShot(appleSound);
            gameManager.GetComponent<GameManager>().GetApple();
            
        }
        else
        {
            audioSource.PlayOneShot(bombSound);
            gameManager.GetComponent<GameManager>().GetBomb();
        }
        Destroy(other.gameObject);
    }
}
