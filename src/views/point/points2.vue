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
import texturesVue from '../components/textures.vue';
let pointMaterial
let point
initMesh()

function initMesh() {
  scene.clear()
  camera.position.set(0,0,5)
  const particlesGeo = new THREE.BufferGeometry()
  const count = 5000
  const position = new Float32Array(count * 3)
  for (let index = 0; index < count * 3; index++) {
    position[index] = (Math.random() - 0.5) * 100
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(position, 3))
  //材质贴图
  const textures = new THREE.TextureLoader().load('snowflake2.png')
  pointMaterial = new THREE.PointsMaterial({
    size:1,
    color: 0xffffff,
    transparent:true,
    alphaTest:0.1,
    map:textures
  })
  // 大小衰减
  // pointMaterial.sizeAttenuation = false
  // 设置点材质纹理
  point = new THREE.Points(particlesGeo, pointMaterial)
  scene.add(point)
}
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
scene.add(axesHelper)


let mouseX =0
let mouseY =0
document.body.addEventListener('pointermove',function(event){
    mouseX = (event.clientX-window.innerWidth/2)/(window.innerWidth/2)
    mouseY = (event.clientY-window.innerHeight/2)/(window.innerHeight/2)
  })
onMounted(() => {
  document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
  const time = Date.now()*0.00005
  const h = (360*(1.0+time)%360)/260
  pointMaterial.color.setHSL(h,0.5,0.5)
  controls.update()
  point.rotation.y+=mouseX*0.005
  point.rotation.x+=mouseY*0.005
  requestAnimationFrame(animate);
  render.render(scene, camera)
}
animate()
</script>

<template>
  <div id='my-three'>
  </div>
</template>