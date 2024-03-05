import camera from './camera'
import render from './renderer'
window.addEventListener(
    'resize', () => {
        render.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    }
)