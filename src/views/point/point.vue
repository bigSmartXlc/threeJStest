<script setup>

  //导入
import * as THREE from 'three';
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { onMounted  } from 'vue'


//场景
const scene =new THREE.Scene();

//相机
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

// 渲染器
const render=new THREE.WebGLRenderer()
render.setSize(window.innerWidth,window.innerHeight)

onMounted(()=>{
        document.getElementById('my-three')?.appendChild(render.domElement)
    })

const geometry = new THREE.SphereGeometry(2,20,20)

//创建材质
// const material = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true})
// 设置点材质纹理
const texturesloader = new THREE.TextureLoader()
const textures=texturesloader.load('./kenney_particle-pack/PNG (Transparent)/star_02.png')
// const textures=texturesloader.load('ball.png')
const pointMaterial = new THREE.PointsMaterial({
  size:0.5,
  alphaTest:0,
  transparent:false,
  map:textures
})
const point  = new THREE.Points(geometry,pointMaterial)
console.log(textures,point);
scene.add(point)

camera.position.z=5
camera.position.y=3
camera.position.x=2

camera.lookAt(0,0,0)

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
//坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
//添加轨道控制器
const controls = new OrbitControls(camera,render.domElement)
//设置带阻尼的控制器
controls.enableDamping=true
controls.dampingFactor=0.05


//自动旋转
// controls.autoRotate= true
//渲染
function animate(){
  controls.update()
  requestAnimationFrame(animate);
  // cube.rotation.x+=0.01
  // cube.rotation.y+=0.01
  render.render(scene,camera)
}
animate()
//自适应
window.addEventListener(
  'resize',()=>{
    render.setSize(window.innerWidth,window.innerHeight)
    camera.aspect=window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
  }
)

//
const gui = new GUI()
</script>

<template>
  <div id="my-three">

  </div>
</template>

<style scoped>
canvas{
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

*{
  margin: 0;
  padding: 0;
}
</style>
