<script setup>
import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import '../sceneMoudles/init'
import { onMounted } from 'vue'

let mixer
let clock = new THREE.Clock()
initMesh()
initEnv()
animate()
function initMesh() {
    scene.clear()
    scene.background = new THREE.Color(0xbfe3dd)
    camera.position.set(10,4,6)
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load('./LittlestTokyo.glb',(gltf)=>{
        console.log(gltf);
        gltf.scene.scale.set(0.01,0.01,0.01)
        scene.add(gltf.scene)
        // gltf.scene.rotation.y = -Math.PI / 1.5
        // gltf.scene.traverse((item)=>{
        //     item.castShadow = true
        // })
        // scene.add(gltf.scene)
        const animation = gltf.animations[0]
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(animation)
        action.play()
    })
}

function initEnv(){
    const environments = new THREE.PMREMGenerator(render)
    scene.environment = environments.fromScene(new RoomEnvironment(),0.001).texture
}


// light
// const dirlight = new THREE.DirectionalLight(0xffffff,10)
// dirlight.position.set(5,2,3)
// dirlight.castShadow = true
// const helper = new THREE.DirectionalLightHelper( dirlight, 5 );
// scene.add( helper );
// scene.add(dirlight)
// scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})
 function animate() {
    const delate = clock.getDelta()
    if(mixer){
         mixer.update(delate)
    }
     controls.update()
     requestAnimationFrame(animate);
     render.render(scene, camera)
}

</script>
<template>
    <div id='my-three'>
    </div>
</template>