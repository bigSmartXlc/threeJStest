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
import { Water } from 'three/examples/jsm/objects/Water.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
let water, sun, sky, cube
let sunParams ={
        elevation: 2,//极角 维度
        azimuth: 180 //方位角 经度
    }
initMesh()

function initMesh() {
    scene.clear()
    sun = new THREE.Vector3(0, 1, -100)
    // 水面
    water = new Water(
        new THREE.PlaneGeometry(5000, 5000),
        {
            waterNormals: new THREE.TextureLoader().load('./waternormals.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            }),
            sunDirection: sun,
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            // fog: scene.fog !== undefined
        }
    )
    water.rotation.x = -Math.PI / 2
    scene.add(water)
    // 天空
    sky = new Sky()
    
    sky.scale.setScalar(10000)
    scene.add(sky)

    //色调映射
    render.toneMapping = THREE.ACESFilmicToneMapping
    //添加盒子
    cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshStandardMaterial())
    
    scene.add(cube)
}
scene.add(axesHelper)

const sunFloder = gui.addFolder('太阳')
sunFloder.add(sunParams,'elevation',0,90,0.05).onChange(updateSun)
sunFloder.add(sunParams,'azimuth',0,360,0.5).onChange(updateSun)

function updateSun(){
    const theta = THREE.MathUtils.degToRad (90-sunParams.elevation)
    const phi = THREE.MathUtils.degToRad(sunParams.azimuth)
    sun.setFromSphericalCoords(1,theta,phi)
    sky.material.uniforms['sunPosition'].value.copy(sun)
    // 获取天空材质作为环境纹理
    scene.environment = new THREE.PMREMGenerator(render).fromScene(sky).texture
}
updateSun()
onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
    water.material.uniforms['time'].value += 1 / 60
    const time = window.performance.now() * 0.003
    cube.position.y = Math.sin(time) * 3 + 1
    cube.rotation.x = time * 0.3
    cube.rotation.z = time * 0.3
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