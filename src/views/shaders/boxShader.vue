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
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
let material
let points
let PARTICLE = 10
let current
let pointer=new THREE.Vector2(),intersected
let raycaster=new THREE.Raycaster(),intersects
initMesh()

function initMesh() {
    scene.clear()
    camera.position.set(250,150,100)
    let boxGeometry = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16)
    //去重叠点，先删除normal和uv
    boxGeometry.deleteAttribute('normal')
    boxGeometry.deleteAttribute('uv')
    const mergedBox = mergeVertices(boxGeometry)
    const position = mergedBox.getAttribute('position')
    const colors = [], sizes = [], color = new THREE.Color()
    for (let i = 0; i < position.count; i++) {
        color.setHSL(0.1 + 0.2 * (i / position.count), 1.0, 0.5)
        color.toArray(colors, i*3)
        sizes[i] = PARTICLE
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', position)
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))


    material = new THREE.ShaderMaterial(
        {
            uniforms: {
                color: {value:new THREE.Color(0xff0000)},
                pointTexture:{value: new THREE.TextureLoader().load('ball.png')}
            },
            vertexShader:`
            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;
            void main(){
                vColor = customColor;
                vec4 mvPosition = modelViewMatrix * vec4( position , 1.0);
                gl_PointSize = size * (300.0/-mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
            `,
            fragmentShader:`
                uniform vec3 color;
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main(){
                    gl_FragColor = vec4 (color * vColor, 1);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                    if(gl_FragColor.a<0.9) discard;
                }
            `
            
        }
    )
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

//交互
document.addEventListener('pointermove',onPointMove)
function onPointMove(event){
    pointer.x = (event.clientX/window.innerWidth)*2-1
    pointer.y = -(event.clientY/window.innerHeight)*2+1
}
// const light = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(light)
scene.add(axesHelper)

onMounted(() => {
    document.getElementById('my-three')?.appendChild(render.domElement)
})
function animate() {
    controls.update()
    points.rotation.x +=0.001
    points.rotation.y +=0.001

    raycaster.setFromCamera(pointer,camera)
    intersects = raycaster.intersectObject(points)
    if(intersects.length>0){
        intersected = intersects[0].index
        if(intersected !=current){
            points.geometry.attributes.size.array[intersected] = PARTICLE*1.5
            points.geometry.attributes.size.needsUpdate = true
            current=intersected
        }
    }else if(intersected!==null){
            points.geometry.attributes.size.array[intersected] = PARTICLE
            points.geometry.attributes.size.needsUpdate = true
            intersected=null
    }
    requestAnimationFrame(animate);
    render.render(scene, camera)
}
animate()
</script>

<template>
    <div id='my-three'>
    </div>
</template>