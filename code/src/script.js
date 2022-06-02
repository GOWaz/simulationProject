import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import sunImageSource from '/textures/1.jpg'
import earthImageSource from '/textures/2.jpg'
import mercuryImageSource from '/textures/mercury.jpg'
import jupiterImageSource from '/textures/jupiter.jpg'
import venusImageSource from '/textures/venus.jpg'


/**
 * class
 */
// classes
export default class Planet {
    constructor(radius, positionX, textureFile) {
      this.radius = radius;
      this.positionX = positionX;
      this.textureFile = textureFile;
    }
  
    getMesh() {
      if (this.mesh === undefined || this.mesh === null) {
        const geometry = new THREE.SphereGeometry(this.radius,32,32);
        const texture = new THREE.TextureLoader().load(this.textureFile);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x += this.positionX;
      }
      return this.mesh;
    }
  }

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

    solarStstem.add(earthSystem)
solarStstem.add(venusSystem)
solarStstem.add(jupiterSystem)
solarStstem.add(mercurySystem)
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
camera.position.z = 20
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