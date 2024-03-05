<script setup>

//导入
import * as THREE from 'three';
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import nx from '../assets/negx.jpg'
import ny from '../assets/negy.jpg'
import nz from '../assets/negz.jpg'
import px from '../assets/posx.jpg'
import py from '../assets/posy.jpg'
import pz from '../assets/posz.jpg'
import { onMounted } from 'vue'


//场景
const scene = new THREE.Scene();

//相机
const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
// 渲染器
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})

const geometry = new THREE.SphereGeometry(1, 20, 20)

// 导入环境纹理
const cubetextureloader = new THREE.CubeTextureLoader()
const envMapTexture = cubetextureloader.load([
    px,
    nx,
    py,
    ny,
    pz,
    nz
])

//创建材质
const material = new THREE.MeshStandardMaterial({
    metalness:1,
    roughness:0.1,
    envMap:envMapTexture
})

//创建网格物体

const cube = new THREE.Mesh(geometry, material)


scene.add(cube)
// 添加背景
scene.background=envMapTexture
scene.environment=envMapTexture
// 环境光
const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
const lineLinght= new THREE.DirectionalLight(0xffffff,0.5)
lineLinght.position.set(3,3,3)
scene.add(lineLinght)
camera.position.z = 5
camera.position.y = 3
camera.position.x = 2

camera.lookAt(0, 0, 0)


//坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
//添加轨道控制器
const controls = new OrbitControls(camera, render.domElement)
//设置带阻尼的控制器
controls.enableDamping = true
controls.dampingFactor = 0.05

//自动旋转
// controls.autoRotate= true
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
window.addEventListener(
    'resize', () => {
        render.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    }
)

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
