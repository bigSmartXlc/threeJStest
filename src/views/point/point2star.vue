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

const particlesGeo=new THREE.BufferGeometry()
const count=5000
const position = new Float32Array(count*3)
const color = new Float32Array(count*3)
for (let index = 0; index < count*3; index++) {
  position[index]=(Math.random()-0.5)*100
  color[index]=Math.random()
}
particlesGeo.setAttribute('position',new THREE.BufferAttribute(position,3))
particlesGeo.setAttribute('color',new THREE.BufferAttribute(color,3))
const pointMaterial = new THREE.PointsMaterial()
pointMaterial.size=0.1
// 启用顶点颜色设置
pointMaterial.vertexColors = true
// 大小衰减
// pointMaterial.sizeAttenuation = false
// 设置点材质纹理
const point  = new THREE.Points(particlesGeo,pointMaterial)

scene.add(point)
//创建网格物体

// const cube = new THREE.Mesh(geometry,material)

// scene.add(cube)

camera.position.z=5
camera.position.y=3
camera.position.x=2

camera.lookAt(0,0,0)


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

//GUi
let eventObj={
  Fullscreen:function(){
    document.body.requestFullscreen()
  },
  ExitFullscreen:function(){
    document.exitFullscreen()
  }
}

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
