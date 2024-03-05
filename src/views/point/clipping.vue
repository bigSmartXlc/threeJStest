<script setup>
import * as THREE from 'three';
import gui from '../sceneMoudles/gui'
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import '../sceneMoudles/init'
import { onMounted } from 'vue'

initMesh()

function initMesh() {
    scene.clear()
    scene.background = new THREE.Color(0xbfe3dd)
    const geometry = new THREE.TorusKnotGeometry(10, 2, 100, 16);

     // 切面
     const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
    const globalPlane = new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0.1);

    const material = new THREE.MeshPhongMaterial({
        color: 0x049ef4,
        shininess: 100,
        side: THREE.Doubleside,
        // ***** Clipping setup(material):
        clippingPlanes: [localPlane],
        //剪切阴影
        clipShadows: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.castShadow = true
    scene.add(torusKnot);

    // 添加地面
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(90, 90, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 150 })
    );
    ground.position.y = -17
    ground.rotation.x = - Math.PI / 2; 
    ground.receiveShadow = true;
    scene.add(ground);
    //允许剪切
    render.localClippingEnabled = true
    //全局剪切
    render.clippingPlanes = [globalPlane]
}

const dirLight = new THREE.DirectionalLight(0x55505a, 10);
dirLight.position.set(0, 40, 30);
dirLight.castShadow = true;
dirLight.shadow.camera.right = 100;
dirLight.shadow.camera.left = - 100;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = - 100;

dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);
scene.add(axesHelper)

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
    controls.update()
    requestAnimationFrame(animate);
    render.render(scene, camera)
}
animate()
</script>

<template>
    <div id='my-three'>
    </div>
</template>