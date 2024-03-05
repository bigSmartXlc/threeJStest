<script setup>
import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../sceneMoudles/init'
import gui from '../sceneMoudles/gui'
import { onMounted } from 'vue'

let mixer
let actions = {}
let acitveAction
let previousAction
let acitveActionObject = { state: 'Walking' }
let clock = new THREE.Clock()
initMesh()

function initGui(model, clips, face) {
    const actionNames = []
    const loopMany = ['Walking', 'Running' , 'Idle', 'Dance']
    for (let i = 0; i < clips.length; i++) {
        const action = mixer.clipAction(clips[i])
        actions[clips[i].name] = action
        if(!loopMany.includes(clips[i].name)){
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
        }
        actionNames.push(clips[i].name)
    }
    const clipFolder = gui.addFolder('动画')
    clipFolder.add(acitveActionObject, 'state').options(actionNames).onChange((val) => {
        previousAction = acitveAction
        previousAction?previousAction.fadeOut(1):null
        acitveAction = actions[val]
        acitveAction.play()
    })

    const faceFolder = gui.addFolder('表情')
    const nameArray = Object.keys(face.morphTargetDictionary)
    for (let i = 0; i < nameArray.length; i++) {
        faceFolder.add(face.morphTargetInfluences, i, 0, 1,0.01).name(nameArray[i])
    }
}

function initMesh() {
    // 调整场景
    scene.clear()
    scene.background = new THREE.Color(0xffffff)
    scene.fog = new THREE.Fog(0xffffff, 0.03)
    camera.position.set(-12, 4, 12)
    // 创建地面
    const geometry = new THREE.PlaneGeometry(2000, 2000)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const ground = new THREE.Mesh(geometry, material)
    ground.rotation.x = -Math.PI * 0.5
    scene.add(ground)
    // 添加网格
    const grid = new THREE.GridHelper(100, 10, 0xcf1414, 0x000000)
    grid.material.transparent = true
    grid.material.opacity = 0.5
    scene.add(grid)
    // 加载模型
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./RobotExpressive.glb', (gltf) => {
        const model = gltf.scene
        scene.add(model)
        // 加载动画
        const clip = gltf.animations
        mixer = new THREE.AnimationMixer(model)
        // acitveAction = mixer.clipAction(clip[2])
        // acitveAction.play()

        // 加载表情
        const face = model.getObjectByName('Head_4')
        initGui(model, clip, face)
        // face.morphTargetInfluences[1] =3
        animate()
    })
}

// light
const light = new THREE.AmbientLight(0xffffff, 1.2); // 柔和的白光
scene.add(light);
const dirlight = new THREE.DirectionalLight(0xffffff, 10)
dirlight.position.set(0, 0, 3)
dirlight.castShadow = true
const helper = new THREE.DirectionalLightHelper(dirlight, 5);
scene.add(helper);
scene.add(dirlight)
scene.add(axesHelper)
onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
    const delate = clock.getDelta()
    if (mixer) {
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