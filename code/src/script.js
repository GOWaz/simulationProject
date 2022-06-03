import './style.css'
import Planet from './planet.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import sunImageSource from '/textures/sun.jpg'
import mercuryImageSource from '/textures/mercury.jpg'
import venusImageSource from '/textures/venus.jpg'
import earthImageSource from '/textures/earth.jpg'
import marsImageSource from '/textures/mars.jpg'
import jupiterImageSource from '/textures/jupiter.jpg'
import saturnImageSource from '/textures/saturn.png'
import uranusImageSource from '/textures/uranus.jpg'
import neptuneImageSource from '/textures/neptune.jpg'
import plutoImageSource from '/textures/pluto.jpg'


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
const solarStstem = new THREE.Group()
const texture = new THREE.TextureLoader()
const sunTexture = texture.load(sunImageSource)

//sun
const sunGeometry = new THREE.SphereGeometry(1,32,32)
const sunMaterial = new THREE.MeshBasicMaterial({map:sunTexture})
const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial)
solarStstem.add(sunMesh)
sunMesh.scale.set(8,8,8)
scene.add(solarStstem)
//Mercury
const mercury = new Planet(1.2,10,mercuryImageSource)
    const mercuryMesh = mercury.getMesh()
    let mercurySystem = new THREE.Group()
    mercurySystem.add(mercuryMesh)
    solarStstem.add(mercurySystem)
//Venus
const venus = new Planet(1.5, 15, venusImageSource)
    const venusMesh = venus.getMesh()
    let venusSystem = new THREE.Group()
    venusSystem.add(venusMesh)
    solarStstem.add(venusSystem)
//Earth
const earth = new Planet(1.5,20,earthImageSource)
    const earthMesh = earth.getMesh()
    let earthSystem = new THREE.Group()
    mercurySystem.add(earthMesh)
    solarStstem.add(earthSystem)
//Mars
const mars = new Planet(1,25,marsImageSource)
    const marsMesh = mars.getMesh()
    let marsSystem = new THREE.Group()
    marsSystem.add(marsMesh)
    solarStstem.add(marsSystem)
//Jupiter
const jupiter = new Planet(2.5,-30,jupiterImageSource)
    const jupiterMesh = jupiter.getMesh()
    let jupiterSystem = new THREE.Group()
    jupiterSystem.add(jupiterMesh)
    solarStstem.add(jupiterSystem)
//Saturn
const saturn = new Planet(2,-38,saturnImageSource)
    const saturnMesh = saturn.getMesh()
    let saturnSystem = new THREE.Group()
    saturnSystem.add(saturnMesh)
    solarStstem.add(saturnSystem)
//Uranus
const uranus = new Planet(1.4,-50,uranusImageSource)
    const uranusMesh = uranus.getMesh()
    let uranusSystem = new THREE.Group()
    uranusSystem.add(uranusMesh)
    solarStstem.add(uranusSystem)
//Neptune
const neptune = new Planet(1.4,-45,neptuneImageSource)
    const neptuneMesh = neptune.getMesh()
    let neptuneSystem = new THREE.Group()
    neptuneSystem.add(neptuneMesh)
    solarStstem.add(neptuneSystem)
//Pluto
const pluto = new Planet(0.8,55,plutoImageSource)
    const plutoMesh = pluto.getMesh()
    let plutoSystem = new THREE.Group()
    plutoSystem.add(plutoMesh)
    solarStstem.add(plutoSystem)


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
camera.position.z = 30
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