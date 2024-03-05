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

// 创建平面
const geometryPlane = new THREE.PlaneGeometry(800,400)
const material = new THREE.MeshPhongMaterial({
    color:0x808080
})
const mesh =new THREE.Mesh(geometryPlane,material)
mesh.receiveShadow = true
mesh.rotation.x = -Math.PI/2
mesh.position.set(0,-2,0)
scene.add(mesh)

// 创建物体
const geometryCyliner = new THREE.CylinderGeometry(5, 5, 2, 32)
const materialCyliner = new THREE.MeshPhongMaterial({
    color:0x4080ff
})
const mesh1 =new THREE.Mesh(geometryCyliner,materialCyliner)
mesh1.castShadow = true
mesh1.position.set(0,2,0)
scene.add(mesh1)

// 创建光源
const spotlight = new THREE.SpotLight(0xffffff,1)
spotlight.castShadow = true
// 衰减
spotlight.decay = 0
spotlight.position.set(-5,14,4)
spotlight.angle = Math.PI/4
spotlight.penumbra = 0.1
scene.add(spotlight)

//helper
const spotlightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotlightHelper)

//添加辅助坐标轴
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