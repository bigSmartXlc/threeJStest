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
let boxMesh
let positionoKF
let scaleKF
let rotationKF
let colorKF
let opacityKF
let clip
let mixer
let clock = new THREE.Clock()
// 添加物体
function addBox() {
    scene.clear()
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({color: 0xff0000})
    boxMesh = new THREE.Mesh(geometry, material)
    scene.add(boxMesh)
}
addBox()
initAnimation()
enableAnimation()
//关键帧动画
function initAnimation(){
    
    positionoKF = new THREE.VectorKeyframeTrack(
        ".position", [0, 1, 2, 3], [
            0,0,0,
            10,0,10,
            10,0,0,
            0,0,0
        ]
    );
    scaleKF = new THREE.VectorKeyframeTrack(
        ".scale", [0, 1, 2, 3], [
            1,1,1,
            2,2,2,
            0.5,2,1,
            1,1,1,
        ]
    );
    
    // 旋转
    const qInitial = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),0)
    const qFinal = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI)
    rotationKF = new THREE.QuaternionKeyframeTrack(
        ".quaternion", [0, 1, 2, 3], [
            qInitial.x,qInitial.y,qInitial.z,qInitial.w,
            qFinal.x,qFinal.y,qFinal.z,qFinal.w,
            qInitial.x,qInitial.y,qInitial.z,qInitial.w,
            qFinal.x,qFinal.y,qFinal.z,qFinal.w,
        ]
    );
    // 颜色
    colorKF = new THREE.ColorKeyframeTrack(
        ".material.color", [0, 1, 2, 3], [
            1,0,0,
            0,1,0,
            0,0,1,
            1,0,0,
        ]
    );
    //透明度
    opacityKF = new THREE.NumberKeyframeTrack(
        ".material.opacity", [0, 1, 2, 3], [
            0.2,
            0.5,
            1,
            0.3,
        ]
    );
    clip=new THREE.AnimationClip("myClip",4,[positionoKF,scaleKF,rotationKF,colorKF,opacityKF]);
}
function enableAnimation(){
    mixer = new THREE.AnimationMixer(boxMesh)
    mixer.clipAction(clip).play();
}

const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})
 function animate() {
     controls.update()
     const delate = clock.getDelta()
     mixer.update(delate)
     requestAnimationFrame(animate);
     render.render(scene, camera)
}
animate()
</script>
<template>
    <div id='my-three'>
    </div>
</template>