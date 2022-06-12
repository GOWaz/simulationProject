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
const sunGeometry = new THREE.SphereGeometry(1, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
})
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
solarStstem.add(sunMesh)
sunMesh.scale.set(8, 8, 8)
sunMesh.castShadow = true
sunMesh.receiveShadow = false
scene.add(solarStstem)
//Mercury
const mercury = new Planet(1.2, 10, mercuryImageSource)
const mercuryMesh = mercury.getMesh()
let mercurySystem = new THREE.Group()
mercuryMesh.receiveShadow = true
mercurySystem.add(mercuryMesh)
solarStstem.add(mercurySystem)
//Venus
const venus = new Planet(1.5, 15, venusImageSource)
const venusMesh = venus.getMesh()
let venusSystem = new THREE.Group()
venusMesh.receiveShadow = true
venusSystem.add(venusMesh)

solarStstem.add(venusSystem)
//Earth
const earth = new Planet(1.5, 20, earthImageSource)
const earthMesh = earth.getMesh()
let earthSystem = new THREE.Group()
earthMesh.receiveShadow = true
earthSystem.add(earthMesh)
solarStstem.add(earthSystem)
//Mars
const mars = new Planet(1, 25, marsImageSource)
const marsMesh = mars.getMesh()
let marsSystem = new THREE.Group()
marsMesh.receiveShadow = true
marsSystem.add(marsMesh)

solarStstem.add(marsSystem)
//Jupiter
const jupiter = new Planet(2.5, -30, jupiterImageSource)
const jupiterMesh = jupiter.getMesh()
let jupiterSystem = new THREE.Group()
jupiterMesh.receiveShadow = true
jupiterSystem.add(jupiterMesh)

solarStstem.add(jupiterSystem)
//Saturn
const saturn = new Planet(2, -38, saturnImageSource)
const saturnMesh = saturn.getMesh()
let saturnSystem = new THREE.Group()
saturnMesh.receiveShadow = true
saturnSystem.add(saturnMesh)

solarStstem.add(saturnSystem)
//Uranus
const uranus = new Planet(1.4, -50, uranusImageSource)
const uranusMesh = uranus.getMesh()
let uranusSystem = new THREE.Group()
uranusMesh.receiveShadow = true
uranusSystem.add(uranusMesh)

solarStstem.add(uranusSystem)
//Neptune
const neptune = new Planet(1.4, -45, neptuneImageSource)
const neptuneMesh = neptune.getMesh()
let neptuneSystem = new THREE.Group()
neptuneMesh.receiveShadow = true
neptuneSystem.add(neptuneMesh)

solarStstem.add(neptuneSystem)
//Pluto
const pluto = new Planet(0.8, 55, plutoImageSource)
const plutoMesh = pluto.getMesh()
let plutoSystem = new THREE.Group()
plutoMesh.receiveShadow = true
plutoSystem.add(plutoMesh)

console.log(solarStstem)

solarStstem.add(plutoSystem)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap



//light 
const light = new THREE.SpotLight(0xffffff);
light.position.set(1, 0, 0);
light.castShadow = true; // default false
scene.add(light);


light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 500; // default
light.shadow.camera.far = 4000; // default
light.shadow.focus = 1; // default

const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);


//light 1
const light1 = new THREE.SpotLight(0xffffff);
light1.position.set(-1, 0, 0);
light1.castShadow = true; // default false
scene.add(light1);


light1.shadow.mapSize.width = 1024; // default
light1.shadow.mapSize.height = 1024; // default
light1.shadow.camera.near = 500; // default
light1.shadow.camera.far = 4000; // default
light1.shadow.focus = 1; // default

const helper1 = new THREE.CameraHelper(light1.shadow.camera);
scene.add(helper1);
/**
 * Animate
 */
const clock = new THREE.Clock()
const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60)

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sunMesh.rotation.y += 0.001

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Galaxy 
 */

const parameters = {}
parameters.count = 40000
parameters.size = 0.05
let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 500)
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        positions[i3 + 0] = (Math.random() - 0.5) * 800
        positions[i3 + 1] = (Math.random() - 0.5) * 800
        positions[i3 + 2] = (Math.random() - 0.5) * 800
    }
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })
    points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateGalaxy()

/**
 * Galaxy 1
 */
const parameters1 = {}
parameters1.count = 100000
parameters1.size = 0.01
parameters1.radius = 5
parameters1.branches = 3
parameters1.spin = 1
parameters1.randomness = 0.2
parameters1.randomnessPower = 3
parameters1.insideColor = '#ff6030'
parameters1.outsideColor = '#1b3984'

let geometry1 = null
let material1 = null
let points1 = null

const generateGalaxy1 = () => {
    // Destroy old galaxy
    if (points1 !== null) {
        geometry1.dispose()
        material1.dispose()
        scene.remove(points1)
    }

    /**
     * Geometry
     */
    geometry1 = new THREE.BufferGeometry()

    const positions1 = new Float32Array(parameters1.count * 3)
    const colors = new Float32Array(parameters1.count * 3)

    const colorInside = new THREE.Color(parameters1.insideColor)
    const colorOutside = new THREE.Color(parameters1.outsideColor)

    for (let i = 0; i < parameters1.count; i++) {
        // Position
        const i3 = i * 3

        const radius = Math.random() * parameters1.radius

        const spinAngle = radius * parameters1.spin
        const branchAngle = (i % parameters1.branches) / parameters1.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters1.randomness * radius
        const randomY = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters1.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters1.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters1.randomness * radius

        positions1[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions1[i3 + 1] = randomY
        positions1[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters1.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3))
    geometry1.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    material1 = new THREE.PointsMaterial({
        size: parameters1.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    /**
     * Points
     */
    points1 = new THREE.Points(geometry1, material1)
    points1.position.x = 50
    points1.position.y = -10
    points1.position.z = 25
    scene.add(points1)

}

generateGalaxy1()

