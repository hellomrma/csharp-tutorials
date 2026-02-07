using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ItemGenerator : MonoBehaviour
{


    public GameObject applePrefab;
    public GameObject bombPrefab;
    float spawn = 1.0f;
    float delta = 0f;

    public int ratio = 2;
    float speed = -0.03f;

    public void SetParameter(float spawn, int ratio, float speed)
    {
        this.spawn = spawn;
        this.ratio = ratio;
        this.speed = speed;
    }
    
    // Update is called once per frame
    void Update()
    {
        delta += Time.deltaTime;
        if (delta > spawn)
        {
            delta = 0;
            GameObject item;
            int dice = Random.Range(1, 11);
            if (dice <= ratio)
            {
                item = Instantiate(bombPrefab);
            }
            else
            {
                item = Instantiate(applePrefab);
            }
            int x = Random.Range(-1, 2);
            int z = Random.Range(-7, -5);
            item.transform.position = new Vector3(x, 7, z);
            item.GetComponent<ItemController>().speed = speed;
        }
    }
}
