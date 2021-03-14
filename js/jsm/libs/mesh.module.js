import * as THREE from '/build/three.module.js';

class Mesh extends THREE.Mesh {
    constructor() {
        super();
    }
    setWireframe(value) {
        this.material.wireframe = value;
    }
}

class Figure extends Mesh {
    constructor(name) {
        super();
        let vertices, indices;
        
        if (name === "pyramid"){
            vertices = [
                -1, 0, 1, //0
                -1, 0, -1, //1
                1, 0, -1, //2
                1, 0, 1,  //3
                0, 1, 0]; 
    
            indices = [0,1,2, 0,2,3, 0,1,4, 0,3,4, 2,1,4, 2,3,4];
        }
        
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

export {Figure};