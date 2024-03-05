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

let mesh,uniforms
initMesh()
function initMesh(){
    scene.clear()
    camera.position.set(0,0,4)
    const geometry = new THREE.TorusGeometry(0.5,0.2,80,80)
    const texturesLoader = new THREE.TextureLoader()
    const texture1=texturesLoader.load('cloud.png')
    const texture2=texturesLoader.load('lavatile.jpg')
    texture2.wrapS = texture2.wrapT =THREE.RepeatWrapping
    uniforms={
        'time':{value:1.0},
        'texture1':{value:texture1},
        'texture2':{value:texture2},
    }
    const material = new THREE.ShaderMaterial({
        uniforms:uniforms,
        vertexShader:`
            varying vec2 vUv;
            void main(){
                vUv = uv;
                vec4 mvPosition = modelViewMatrix * vec4( position , 1.0);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader:`
            uniform float time;
            uniform sampler2D texture2;
            varying vec2 vUv;
            void main(){
                vec2 T1 = vUv + vec2(-0.5,2) *time *0.01;
                vec4 color = texture2D(texture2,T1);
                gl_FragColor = color;
            }
        `
    })
    mesh=new THREE.Mesh(geometry,material)
    scene.add(mesh)
}

const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})

 function animate() {
     controls.update()
     uniforms.time.value+=0.01
     requestAnimationFrame(animate);
     render.render(scene, camera)
}
animate()
</script>
<template>
    <div id='my-three'>
    </div>
</template>