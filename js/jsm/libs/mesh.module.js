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
                0, 1, 0 // 4
            ]; 
    
            indices = [0,1,2, 0,2,3, 0,1,4, 0,3,4, 2,1,4, 2,3,4];
        } else if (name === "pentagonalPrism") {
            vertices = [

            ];

            indices = [];
        } else if (name === "house") {
            console.log("here");
            vertices = [
                -1, -1, 1,  // 0
                -1, 1, 1,   // 1
                1, 1, 1,    // 2
                1, -1, 1,   // 3
                1, 1, -1,   // 4
                1, -1, -1,  // 5
                -1, 1, -1,  // 6
                -1, -1, -1, // 7
                0, 2, 1,    // 9
                0, 2, -1,   // 10
            ];

            indices = [
                0,2,1, 0,3,2, // front
                3,4,2, 3,5,4, // right
                5,6,4, 5,6,7, // back
                7,1,6, 7,0,1, // left
                0,7,5, 0,5,3, // bottom
                1,2,8,        // roof front
                6,9,4,        // roof back
                2,9,8, 2,4,9, // roof right
                1,8,6, 6,8,9  // roof left
            ];
        } else if (name === "diamond") {
            vertices = [
                -1, 0, 1,   //0
                -1, 0, -1,  //1
                1, 0, -1,   //2
                1, 0, 1,    //3
                0, 1, 0,    // 4
                0, -1, 0,   // 5
            ]; 
    
            indices = [
                0,1,2, 0,2,3,   // middle
                0,1,4,          // left top
                0,3,4,          // front top
                2,1,4,          // back top
                2,3,4,          // right top
                0,1,5,          // left bottom
                0,3,5,          // front bottom
                2,1,5,          // back bottom
                2,3,5,          // right bottom
            ];
        }
        
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

export {Figure};