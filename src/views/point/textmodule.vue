<script setup lang="js">
import * as THREE from 'three';
import gui from '../sceneMoudles/gui'
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import '../sceneMoudles/init'
import { onMounted } from 'vue'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
console.log(THREE);
initMeshes()
function initMeshes(){
    scene.clear()
    const materials = [
        new THREE.MeshPhongMaterial({
            color:0xffffff,
            flatShading:true
        }),
        new THREE.MeshPhongMaterial({
            color:0xffffff
        })
    ]
    const loader = new FontLoader()
    loader.load('./helvetiker_bold.typeface.json',(font)=>{
        const geometry = new TextGeometry('Hello',{
            font:font,
            size:5,
            height:2,
            curveSegments: 20,
            bevelEnabled:true,
            bevelThickness:1,
            bevelSize:0.2,
            bevelOffset:0,
            bevelSegments:2
        })
        const mesh = new THREE.Mesh(geometry,materials)
        mesh.position.set(0,0,0)
        scene.add(mesh)
    })
}
// 环境光
const light = new THREE.AmbientLight(0xffffff,0.2)
scene.add(light)
const dirLight = new THREE.DirectionalLight(0xffffff, 2)
dirLight.position.set(5, 3, 3)
scene.add(dirLight)
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