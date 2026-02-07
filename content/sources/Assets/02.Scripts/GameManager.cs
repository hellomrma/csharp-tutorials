using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Text timerText;
    public Text pointText;
    float time = 30.0f;
    int point = 0;

    public void GetApple() {
        point += 100;
    }

    public void GetBomb() {
        point /= 2;
    }

    // Update is called once per frame
    void Update()
    {
        // 시간 관리
        time -= Time.deltaTime;
        if (timerText != null)
            timerText.text = time.ToString();
        // 점수 관리
        if (pointText != null)
            pointText.text = point.ToString() + " Point";
    }
}
