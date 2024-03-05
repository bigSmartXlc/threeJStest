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
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

let composer,
  effectFXAA,
  outlinePass,
  selectedOnject,
  mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
initMesh();
function initMesh() {
  scene.clear();
  camera.position.set(10, 4, 6);
  const loader = new OBJLoader();
  loader.load("tree.obj", function (model) {
    model.scale.multiplyScalar(3);
    model.position.y = -1.5;
    scene.add(model);
  });
  //多个球
  const geometry = new THREE.SphereGeometry(3, 48, 24);
  for (let i = 0; i < 10; i++) {
    const material = new THREE.MeshLambertMaterial();
    material.color.setHSL(Math.random(), 1.0, 0.5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.random() * 6 - 2,
      Math.random() - 1,
      Math.random() * 6 - 2
    );
    mesh.name = `球${i + 1}`;
    mesh.castShadow = true;
    mesh.scale.multiplyScalar(Math.random() * 0.3 + 0.1);
    scene.add(mesh);
  }
  //地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshLambertMaterial({ side: THREE.DoubleSide })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.5;
  ground.receiveShadow = true;
  scene.add(ground);

  //圆环
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.3, 16, 100),
    new THREE.MeshPhongMaterial({ color: 0xffaaff })
  );
  torus.position.set(0, -1, -4);
  torus.castShadow = true;
  scene.add(torus);

  //outline
  composer = new EffectComposer(render);
  composer.addPass(new RenderPass(scene, camera));
  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  );
  composer.addPass(outlinePass);
  //替换贴图
  new THREE.TextureLoader().load('tri_pattern.jpg',function(texture){
    outlinePass.usePatternTexture = true
    outlinePass.patternTexture = texture
    texture.wrapS=texture.wrapT = THREE.RepeatWrapping
  })

  //effectFXAA
  effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms['resolution'].value.set(1/window.innerWidth,1/window.innerHeight)
  composer.addPass(effectFXAA)

}

render.domElement.style.touchAction = "none";
render.domElement.addEventListener('pointermove',pointerChange);

function pointerChange(event) {
  if (event.isPrimary === false) return;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y= -(event.clientY / window.innerHeight) * 2 + 1;
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 3);
// light.shadow = true
light.castShadow = true;
scene.add(light);

onMounted(() => {
  document.getElementById("my-three")?.appendChild(render.domElement);
});
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // render.render(scene, camera);
  composer.render()
  raycaster.setFromCamera(mouse,camera)
  const intersects = raycaster.intersectObject(scene,true)
  if(intersects.length>0){
    selectedOnject = intersects[0].object
    outlinePass.selectedObjects = []
    outlinePass.visibleEdgeColor =new THREE.Color(0xf404c7)
    outlinePass.selectedObjects.push(selectedOnject)
  }else{
    outlinePass.selectedObjects = []
  }
}
animate();
</script>

<template>
  <div id="my-three"></div>
</template>
