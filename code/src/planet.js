import * as THREE from 'three'

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
        const material = new THREE.MeshStandardMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x += this.positionX;
      }
      return this.mesh;
    }
  }