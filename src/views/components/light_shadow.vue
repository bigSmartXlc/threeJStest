<script setup>

//导入
import * as THREE from 'three';
import gui from '../sceneMoudles/gui'
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import '../sceneMoudles/init'
import { onMounted } from 'vue'

// 添加球
const geometry = new THREE.SphereGeometry(1, 20, 20)
// 添加平面
const planeGeometry = new THREE.PlaneGeometry(30,30)
//创建材质
const material = new THREE.MeshStandardMaterial()

//创建网格物体
const cube = new THREE.Mesh(geometry, material)
// 投射阴影-----------------------------------------------------------------
cube.castShadow = true
const cube1 = new THREE.Mesh(planeGeometry, material)
// 接收阴影-----------------------------------------------------------------
cube1.receiveShadow = true
cube1.position.set(0,-1,0)
cube1.rotation.x=-Math.PI/2
scene.add(cube)
scene.add(cube1)
// 添加背景
// 环境光
const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
//直线光
// const lineLinght= new THREE.DirectionalLight(0xffffff,0.8)
//聚光灯
const lineLinght = new THREE.SpotLight(0xffffff,1)
lineLinght.position.set(2,2,2)
lineLinght.distance=0
lineLinght.decay=0
// 光照阴影------------------------------------------------------------------
lineLinght.castShadow = true
// 阴影模糊度---------------------------------------------------------------
lineLinght.shadow.radius = 1
// 阴影分辨率---------------------------------------------------------------
lineLinght.shadow.mapSize.set(2048,2048)
scene.add(lineLinght)
//
gui.add(lineLinght,'angle').min(0).max(Math.PI/2).step(0.01)
gui.add(lineLinght,'decay').min(0).max(2).step(0.01)
camera.position.z = 5
camera.position.y = 3
camera.position.x = 2

camera.lookAt(0, 0, 0)


//添加辅助坐标轴
scene.add(axesHelper)
//添加轨道控制器

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
//渲染
function animate() {
    controls.update()
    requestAnimationFrame(animate);
    // cube.rotation.x+=0.01
    // cube.rotation.y+=0.01
    render.render(scene, camera)
}
animate()
//自适应


</script>

<template>
    <div id="my-three">

    </div>
</template>

<style scoped>
canvas {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}

* {
    margin: 0;
    padding: 0;
}
</style>
