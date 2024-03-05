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

let initMesh
let num = 10;
let currentInstanceId
let count = Math.pow(num,3)
let white = new THREE.Color().setHex(0xffffff)

function initMeshes(){
    const geometry = new THREE.IcosahedronGeometry(0.5,1)
    const material =new THREE.MeshPhongMaterial({color:0xffffff})
    initMesh = new THREE.InstancedMesh(geometry,material,count)
    let index=0
    const offset = (num - 1)/2
    const matrix = new THREE.Matrix4()
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            for (let k = 0; k < num; k++) {
                matrix.setPosition(offset-i,offset-j,offset-k)
                initMesh.setMatrixAt(index, matrix)
                initMesh.setColorAt(index,white)
                index=index+1
            }
        }
    }
    scene.add(initMesh)
}
initMeshes()


// 交互
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
document.addEventListener("mousemove",(event)=>{
    mouse.x=(event.clientX/window.innerWidth)*2-1
    mouse.y=-(event.clientY/window.innerHeight)*2+1
})

const light = new THREE.HemisphereLight(0xffffff,0x888888)
light.position.set(0,20,0)
scene.add(light)
scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})
 function animate() {
     //  光线投射
     controls.update()
     raycaster.setFromCamera(mouse,camera)
     let raycasterMeshArray = raycaster.intersectObject(initMesh)
     if(raycasterMeshArray.length>0){
        const instanceId = raycasterMeshArray[0].instanceId
        if(currentInstanceId != instanceId){
            initMesh.setColorAt(instanceId,new THREE.Color().setHex(Math.random()*0xffffff))
            initMesh.instanceColor.needsUpdate=true
            currentInstanceId = instanceId
        }
     }
     render.render(scene, camera)
     requestAnimationFrame(animate);
    }
animate()
</script>
<template>
    <div id='my-three'>
    </div>
</template>