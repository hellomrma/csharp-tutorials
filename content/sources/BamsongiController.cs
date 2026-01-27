using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class BamsongiController : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // Shoot(new Vector3(0, 250, 2000));
    }

    public void Shoot(Vector3 dir)
    {
        GetComponent<Rigidbody>().AddForce(dir);
    }

    private void OnCollisionEnter(Collision collision)
    {
        GetComponent<Rigidbody>().isKinematic = true;
        GetComponent<ParticleSystem>().Play();

        transform.parent = collision.transform;

        // transform.parent = null;

        GetComponent<SphereCollider>().enabled = false;

        // 밤송이 오브젝트 삭제
        Destroy(gameObject, 5.0f);
    }
}
