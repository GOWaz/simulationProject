import './style.css'
import Planet from './planet.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import sunImageSource from '/textures/sun1.jpg'
import earthImageSource from '/textures/earth.jpg'
import mercuryImageSource from '/textures/mercury.jpg'
import jupiterImageSource from '/textures/jupiter.jpg'
import venusImageSource from '/textures/venus.jpg'
import marsImageSource from '/textures/mars.jpg'


/**
 * class
 */
// classes


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxBufferGeometry(1, 1 ,1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)


const solarStstem = new THREE.Group()
const texture = new THREE.TextureLoader()
const sunTexture = texture.load(sunImageSource)

//sun
const sunGeometry = new THREE.SphereGeometry(1,32,32)
const sunMaterial = new THREE.MeshBasicMaterial({map:sunTexture})
const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial)
solarStstem.add(sunMesh)
sunMesh.scale.set(4,4,4)

const venus = new Planet(1, 15, venusImageSource);
    const venusMesh = venus.getMesh();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);
const jupiter = new Planet(2,-13,jupiterImageSource)
    const jupiterMesh = jupiter.getMesh()
    let jupiterSystem = new THREE.Group()
    jupiterSystem.add(jupiterMesh)
const mercury = new Planet(2,-8,mercuryImageSource)
    const mercuryMesh = mercury.getMesh()
    let mercurySystem = new THREE.Group()
    mercurySystem.add(mercuryMesh)
const earth = new Planet(1,6,earthImageSource)
    const earthMesh = earth.getMesh()
    let earthSystem = new THREE.Group()
    mercurySystem.add(earthMesh)
const mars = new Planet(3,20,marsImageSource)
    const marsMesh = mars.getMesh()
    let marsSystem = new THREE.Group()
    marsSystem.add(marsMesh)

solarStstem.add(earthSystem)
solarStstem.add(venusSystem)
solarStstem.add(jupiterSystem)
solarStstem.add(mercurySystem)
solarStstem.add(marsSystem)
scene.add(solarStstem)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 40
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const earthYear = 2 * Math.PI * (1/60) * (1/60)

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sunMesh.rotation.y+=0.001

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()