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
        
        if (name === "pyramid4"){
            vertices = [
                -1, 0, 1, //0
                -1, 0, -1, //1
                1, 0, -1, //2
                1, 0, 1,  //3
                0, 1, 0 // 4
            ]; 
    
            indices = [0,1,2, 0,2,3, 0,1,4, 0,3,4, 2,1,4, 2,3,4];
        } else if (name === "T") {
            vertices = [
                -0.5, -1, 0.5,  // 0
                -0.5, 1, 0.5,   // 1
                0.5, 1, 0.5,    // 2
                0.5, -1, 0.5,   // 3
                0.5, 1, -0.5,   // 4
                0.5, -1, -0.5,  // 5
                -0.5, 1, -0.5,  // 6
                -0.5, -1, -0.5, // 7

                -1.5, 1, 0.5,  // 8
                -1.5, 2, 0.5,   // 9
                1.5, 2, 0.5,    // 10
                1.5, 1, 0.5,   // 11
                1.5, 2, -0.5,   // 12
                1.5, 1, -0.5,  // 13
                -1.5, 2, -0.5,  // 14
                -1.5, 1, -0.5, // 15
            ];

            indices = [
                0,2,1, 0,3,2, // front
                3,4,2, 3,5,4, // right
                5,6,4, 5,6,7, // back
                7,1,6, 7,0,1, // left
                0,7,5, 0,5,3, // bottom

                // Top part
                8,10,9, 8,11,10, // front
                11,12,10, 11,13,12, // right
                13,14,12, 13,14,15, // back
                15,9,14, 15,8,9, // left
                8,15,13, 8,13,11, // bottom
            ];
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
        } else if (name === "tetrahedron"){
            vertices = [
                -0.5, -Math.sqrt(3.0)/6.0, 0,
                0.5, -Math.sqrt(3.0)/6.0, 0,
                0, Math.sqrt(1.0/3.0), 0,
                0, 0, Math.sqrt(8.0/12.0),
            ]; 
    
            indices = [0,1,2, 0,1,3, 1,2,3, 0,2,3];
        }
        else if (name === "box"){
            vertices = [
                -0.5, 0, -0.5, // base
                -0.5, 0, 0.5,
                0.5, 0, 0.5,
                0.5, 0, -0.5,

                -0.5, 1, -0.5, // ceil
                -0.5, 1, 0.5,
                0.5, 1, 0.5,
                0.5, 1, -0.5,
            ]; 
    
            indices = [
                0,1,3, 2,1,3,
                0,4,3, 7,4,3,
                3,7,2, 6,7,2,
                2,6,1, 5,6,1,
                1,5,0, 4,5,0];
        }
        else if (name === "pentagonal prism"){
            let h = 2* Math.sin(Math.PI/5)
            vertices = [
                0, 0, 1,
                Math.cos(1*2*Math.PI/5 + Math.PI/2), 0, Math.sin(1*2*Math.PI/5 + Math.PI/2),
                Math.cos(2*2*Math.PI/5 + Math.PI/2), 0, Math.sin(2*2*Math.PI/5 + Math.PI/2),
                Math.cos(3*2*Math.PI/5 + Math.PI/2), 0, Math.sin(3*2*Math.PI/5 + Math.PI/2),
                Math.cos(4*2*Math.PI/5 + Math.PI/2), 0, Math.sin(4*2*Math.PI/5 + Math.PI/2),
                0, h, 1,
                Math.cos(1*2*Math.PI/5 + Math.PI/2), h, Math.sin(1*2*Math.PI/5 + Math.PI/2),
                Math.cos(2*2*Math.PI/5 + Math.PI/2), h, Math.sin(2*2*Math.PI/5 + Math.PI/2),
                Math.cos(3*2*Math.PI/5 + Math.PI/2), h, Math.sin(3*2*Math.PI/5 + Math.PI/2),
                Math.cos(4*2*Math.PI/5 + Math.PI/2), h, Math.sin(4*2*Math.PI/5 + Math.PI/2),
            ]; 
    
            indices = [
                0,2,1, 0,3,2, 0,4,3,
                5,7,6, 5,8,7, 5,9,8,
                7,3,2, 7,3,8,
                8,4,3, 8,4,9,
                9,0,4, 9,0,5,
                5,1,0, 5,1,6,
                6,2,1, 6,2,7]
        }
        
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

export {Figure};