<script setup>

  //导入
import * as THREE from 'three';
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import grass from '../assets/grass.png'
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

const geometry = new THREE.BoxGeometry(1,1,1)

// 导入纹理
const textureloader =new THREE.TextureLoader()
const floorTextures=textureloader.load(grass)

// 纹理显示设置(小像素纹理优化)
// floorTextures.minFilter=THREE.NearestFilter
// floorTextures.magFilter=THREE.NearestFilter
// floorTextures.minFilter=THREE.LinearFilter
// floorTextures.magFilter=THREE.LinearFilter
//创建材质
const material = new THREE.MeshBasicMaterial({color:"#ffffff",map:floorTextures})
//创建网格物体

const cube = new THREE.Mesh(geometry,material)


scene.add(cube)

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
gui.add(eventObj,"Fullscreen").name("全屏")
gui.add(eventObj,"ExitFullscreen").name("退出全屏")
const folder = gui.addFolder('立方体轴向移动')
folder.add(cube.position,'x',-5,5).name("x轴移动").onChange((val)=>{
  console.log(val);
})
folder.add(cube.position,'y',-5,5).name("y轴移动").onFinishChange((val)=>{
  console.log(val);
})
folder.add(cube.position,'z',-5,5).name("z轴移动")
//开启线框模式
gui.add(material,"wireframe").name('开启线框模式')
//gui颜色
let colorParams={
  cubeClolor:'0x00ff00'
}
gui.addColor(colorParams,"cubeClolor").name('物体颜色').onChange((val)=>{
  cube.material.color.set(val)
})
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
