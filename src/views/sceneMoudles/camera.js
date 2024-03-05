import * as THREE from 'three';
//相机
const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 50
camera.position.y = 30
camera.position.x = 20

camera.lookAt(0, 0, 0)

export default camera