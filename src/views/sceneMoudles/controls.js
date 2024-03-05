import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import camera from './camera'
import render from './renderer'
const controls = new OrbitControls(camera, render.domElement)
//设置带阻尼的控制器
controls.enableDamping = true
controls.dampingFactor = 0.05

export default controls