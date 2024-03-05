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

initMesh()
function initMesh() {
    scene.clear()
    const closedSpline = new THREE.CatmullRomCurve3(
        [
            new THREE.Vector3(-6, 16, 6),
            new THREE.Vector3(-4, 6, 10),
            new THREE.Vector3(-6, -6, 6),
            new THREE.Vector3(-6, -7, -12),
            new THREE.Vector3(-6, 11, -12),
        ]
    )
    closedSpline.curveType = 'catmullrom'
    closedSpline.closed = true
    const extrudeSettings = {
        steps: 350,
        bevelEnabled: false,
        extrudePath: closedSpline,
    };

    //1
    // shape
    const r = 2, pts1 = [], count = 3;
    for (let index = 0; index < count; index++) {
        const a = index / count * 2 * Math.PI
        pts1.push(new THREE.Vector2(r * Math.cos(a), r * Math.sin(a)))
    }
    const shape1 = new THREE.Shape(pts1)
    const geometry1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings)
    const material1 = new THREE.MeshLambertMaterial({
        color: 0xb00000
    })
    const mesh1 = new THREE.Mesh(geometry1, material1)
    scene.add(mesh1)

    // 2
    //path
    const randomPoints = []
    for (let index = 0; index < 10; index++) {
        randomPoints.push(
            new THREE.Vector3(
                (index-4.5)*10,
                THREE.MathUtils.randFloat(-5,5),
                THREE.MathUtils.randFloat(-5,5)
            )
        )
    }
    const randomSpline = new THREE.CatmullRomCurve3(randomPoints)
    const extrudeSettings2 = {
        steps: 200,
        bevelEnabled: false,
        extrudePath: randomSpline,
    }
    const pts2 = [],numPts = 5
    for (let i = 0; i < numPts*2; i++) {
        const l =i%2==1?2:4
        const a = i/numPts *Math.PI
        pts2.push(new THREE.Vector2(l * Math.cos(a), l * Math.sin(a)))
    }
    const shape2 =  new THREE.Shape(pts2)
    const geometry2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings2)
    const material2 = new THREE.MeshLambertMaterial({
        color: 0xff8000
    })
    const mesh2 = new THREE.Mesh(geometry2, material2)
    scene.add(mesh2)

    const material3 = [material1,material2]
    const extrudeSettings3 = {
        depth:1,
        steps:2,
        //对挤出的形状应用是否斜角
        bevelEnabled: true,
        bevelThickness:1,
        bevelSize:1,
        bevelSegments:1
    }
    const geometry3 = new THREE.ExtrudeGeometry(shape2, extrudeSettings3)
    const mesh3 = new THREE.Mesh(geometry3, material3)
    mesh3.position.set(5,12,-3)
    scene.add(mesh3)
}

// 环境光
const light = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(5, 3, 3)
scene.add(dirLight)
scene.add(axesHelper)

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
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