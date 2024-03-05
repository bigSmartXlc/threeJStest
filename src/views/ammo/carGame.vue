<script setup>
import * as THREE from "three";
import gui from "../sceneMoudles/gui";
import scene from "../sceneMoudles/scene";
import axesHelper from "../sceneMoudles/axesHelper";
import camera from "../sceneMoudles/camera";
import render from "../sceneMoudles/renderer";
import controls from "../sceneMoudles/controls";
import "../sceneMoudles/init";
import { onMounted } from "vue";
import { AmmoPhysics } from "three/examples/jsm/physics/AmmoPhysics";

let boxMesh;
let spheres;
let floor;
let slope;
let wallGroup = new THREE.Group();
let test;
let physics;
addObject();
// 添加物体
function addObject() {
  scene.clear();
  // 地面
  floor = new THREE.Mesh(
    new THREE.BoxGeometry(50, 1, 100),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  floor.position.set(0, 0, 0);
  floor.receiveShadow = true;
  //斜坡
  const quaternion = new THREE.Quaternion(0, 0, 0, 1);
  quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 12);
  slope = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1.5, 6),
    new THREE.MeshLambertMaterial({ color: 0xf77b00 })
  );
  slope.position.set(0, 0, 0);
  slope.quaternion.copy(quaternion);
  slope.castShadow = true;
  //墙面
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0xff5500 });
  test =new THREE.Mesh(geometry,material)
  test.position.set(2,10,4)
  let width = 10
  let height = 8
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const wall= new THREE.Mesh(geometry,material)
      wall.position.z = -8
      wall.position.x=i-width/2+0.1*i
      wall.position.y=j+0.01*j+1
      wallGroup.add(wall)
    }
  }
  scene.add(test)
  scene.add(wallGroup)
  scene.add(slope);
  scene.add(floor);
}

// 灯光
function initLight() {
  const dirllight = new THREE.DirectionalLight();
  dirllight.position.set(0, 50, 0);
  dirllight.castShadow = true;
  const light = new THREE.HemisphereLight();
  light.intensity = 0.3;
  scene.add(light);
  scene.add(dirllight);
}
initLight();
scene.add(axesHelper);


async function initPhysics() {
  physics = await AmmoPhysics();
    physics.addMesh(wallGroup, 1);
    physics.addMesh(slope);
    physics.addMesh(floor);
    physics.addMesh(test,1);
}


onMounted(() => {
  document.getElementById("my-three")?.appendChild(render.domElement);
  initPhysics();
});
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  render.render(scene, camera);
}
animate();
</script>
<template>
  <div id="my-three"></div>
</template>
