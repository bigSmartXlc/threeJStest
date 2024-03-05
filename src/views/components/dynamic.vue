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
import water from '../assets/water.jpg'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
let geometryPlane
let materialPlane
let firstControls
const worldWidth = 128, worldDepth = 128;
initMesh()
initFirstPERsonControls()
function initFirstPERsonControls(){
    firstControls = new FirstPersonControls(camera, render.domElement)
    controls.moveSpeed = 20
    controls.lookSpeed = 0.1
}
function initMesh(){
    scene.clear()
    camera.position.set(200,100,500)
    scene.background = new THREE.Color(0xaaccff)
    scene.fog = new THREE.FogExp2(0xaaccff,0.002)
    geometryPlane = new THREE.PlaneGeometry(20000,20000, worldWidth - 1, worldDepth - 1 )
    geometryPlane.rotateX(-Math.PI/2)

    const textures = new THREE.TextureLoader().load(water)
    textures.wrapS = textures.wrapT = THREE.MirroredRepeatWrapping
    textures.repeat.set(50,50)
    textures.colorSpace = THREE.SRGBColorSpace;
    materialPlane = new THREE.MeshBasicMaterial({
        color:0x5499c3,
        map:textures
    })
    const mesh = new THREE.Mesh(geometryPlane, materialPlane)
    scene.add(mesh)
}

const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})
const clock = new THREE.Clock()
 function animate() {
    //  controls.update()
     const time =clock.getElapsedTime()*10
     const positions = geometryPlane.attributes.position
     positions.usage = THREE.DynamicDrawUsage;
     for (let index = 0; index < positions.count; index++) {
        const y = Math.sin(index/5 + (time+index)/7)*20
        positions.setY(index,y)
     }
     positions.needsUpdate = true

     const delta = clock.getDelta()
     firstControls.update(delta)

     requestAnimationFrame(animate);
     render.setPixelRatio(window.devicePixelRatio)
     render.render(scene, camera)
}
animate()
</script>
<template>
    <div id='my-three'>
    </div>
</template>