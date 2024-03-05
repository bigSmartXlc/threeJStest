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
    camera.position.set(1,0,1)
    controls.enableZoom = false
    const textures = loadTexture('sun_temple_stripe.jpg',6)
    console.log(textures);
    const materials = []
    for (let i = 0; i < textures.length; i++) {
        materials.push(
            new THREE.MeshBasicMaterial(
                {map:textures[i]}
            )
        )
    }
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    geometry.scale(1,1,-1)
    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
}

//加载贴图函数
function loadTexture(File,num) {
    const textures = []
    for (let i = 0; i < num; i++) {
        textures[i] = new THREE.Texture()
    }
    new THREE.ImageLoader().load(File,(file)=>{
        const width = file.height
        let canvas,context
        for (let i = 0; i < 6; i++) {
            canvas = document.createElement('canvas')
            context = canvas.getContext('2d')
            canvas.width = width
            canvas.height =  width
            context.drawImage(file,width*i,0,width,width,0,0,width,width)
            textures[i].image = canvas
            textures[i].needsUpdate = true
        }
    });
    return textures
}

const light = new THREE.AmbientLight(0xffffff,1)
scene.add(light)
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