<script setup>
import * as THREE from 'three';
import gui from '../sceneMoudles/gui'
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import '../sceneMoudles/init'
import { onMounted } from 'vue'
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js'
import {CSS2DRenderer , CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const url = './pdb/caffeine.pdb'
let css2DRenderer
initMesh()
initCSS2DRenderer()
function initMesh() {
    scene.clear()
    camera.position.set(10, 4, 10)
    const loader = new PDBLoader()
    loader.load(url, (pdb) => {
        let positions = pdb.geometryAtoms.getAttribute('position')
        const colors = pdb.geometryAtoms.getAttribute('color')
        const position = new THREE.Vector3()
        const color = new THREE.Color()
        //原子
        for (let i = 0; i < positions.count; i++) {
            position.x = positions.getX(i)
            position.y = positions.getY(i)
            position.z = positions.getZ(i)
            color.r = colors.getX(i)
            color.g = colors.getY(i)
            color.b = colors.getZ(i)
            // 创建mesh
            const geometry = new THREE.IcosahedronGeometry(0.23, 3)
            const material = new THREE.MeshPhongMaterial({ color: color })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(position.x, position.y, position.z)
            scene.add(mesh)
        }
        let bondPosition= pdb.geometryBonds.getAttribute('position')
        const start = new THREE.Vector3()
        const end = new THREE.Vector3()
        //链接腱
        for (let i = 0; i < bondPosition.count; i+=2) {
            start.x = bondPosition.getX(i)
            start.y = bondPosition.getY(i)
            start.z = bondPosition.getZ(i)
            end.x = bondPosition.getX(i+1)
            end.y = bondPosition.getY(i+1)
            end.z = bondPosition.getZ(i+1)
            // 创建mesh
            const geometry = new THREE.BoxGeometry(0.05,0.05, 0.05)
            const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.copy(start)
            mesh.position.lerp(end,0.5)
            mesh.scale.z = start.distanceTo(end)*15
            mesh.lookAt(end)
            scene.add(mesh)
        }
        //label
        const info = pdb.json.atoms
        for (let i = 0; i < info.length; i++) {
            const item= info[i]
            position.x = item[0]+0.3
            position.y = item[1]+0.2
            position.z = item[2]
            const text = document.createElement('div')
            text.style.color = `rgb(${item[3][0]},${item[3][1]},${item[3][2]})`
            text.textContent=item[4]
            const Label = new CSS2DObject( text );
			Label.position.copy(position);
            scene.add(Label)
        }
    })
}

function initCSS2DRenderer(){
    css2DRenderer=new CSS2DRenderer()
    css2DRenderer.setSize(window.innerWidth,window.innerHeight)
    css2DRenderer.domElement.style.position = 'absolute'
    css2DRenderer.domElement.style.top='0px'
    css2DRenderer.domElement.style.left='0px'
    css2DRenderer.domElement.style.zIndex=100
    document.body.appendChild(css2DRenderer.domElement)
}

// 灯光
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(5, 2, 3)
scene.add(dirLight)
const light = new THREE.HemisphereLight()
light.intensity = 0.3
scene.add(light)
scene.add(axesHelper)

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})

const controls = new OrbitControls(camera, css2DRenderer.domElement)
//设置带阻尼的控制器
controls.enableDamping = true
controls.dampingFactor = 0.05

function animate() {
    controls.update()
    requestAnimationFrame(animate);
    css2DRenderer.render(scene, camera)
    render.render(scene, camera)
}
animate()
</script>

<template>
    <div id='my-three'>
    </div>
</template>