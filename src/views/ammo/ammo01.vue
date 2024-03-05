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
import {AmmoPhysics} from 'three/examples/jsm/physics/AmmoPhysics'

let boxMesh
let spheres
let floor
let physics
// 添加物体
function addObject() {
    // 地面
    floor=new THREE.Mesh(
        new THREE.BoxGeometry(25,1,25),
        new THREE.MeshLambertMaterial({color:0xffffff})
        )
    floor.position.set(0,-1,0)
    floor.receiveShadow=true

    // 方块
    boxMesh = new THREE.InstancedMesh(
        new THREE.BoxGeometry(),
        new THREE.MeshLambertMaterial(),
        100
     )
    boxMesh.castShadow = true
    const matrix = new THREE.Matrix4()
    const color = new THREE.Color()
    for (let index = 0; index < boxMesh.count; index++) {
        matrix.setPosition((Math.random()-0.5)*20,(Math.random())*20,(Math.random()-0.5)*20)
        boxMesh.setMatrixAt(index,matrix)
        boxMesh.setColorAt(index,color.setHex(Math.random()*0xffffff))
    }
     scene.add(boxMesh)

      // 球
    spheres = new THREE.InstancedMesh(
        new THREE.IcosahedronGeometry(0.7,3),
        new THREE.MeshLambertMaterial(),
        100
     )
     spheres.castShadow = true
    for (let index = 0; index < spheres.count; index++) {
        matrix.setPosition((Math.random()-0.5)*20,(Math.random())*20,(Math.random()-0.5)*20)
        spheres.setMatrixAt(index,matrix)
        spheres.setColorAt(index,color.setHex(Math.random()*0xffffff))
    }
     scene.add(spheres)
     scene.add(floor)
}
addObject()
// 灯光
function initLight(){
    const dirllight = new THREE.DirectionalLight()
    dirllight.position.set(0,50,0)
    dirllight.castShadow = true
    const light = new THREE.HemisphereLight()
    light.intensity = 0.3
    scene.add(light)
    scene.add(dirllight)
}
initLight()
scene.add(axesHelper)

async function initPhysics(){
    physics= await AmmoPhysics()
    physics.addMesh(boxMesh,1)
    physics.addMesh(spheres,1)
    physics.addMesh(floor)
}
await initPhysics()



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