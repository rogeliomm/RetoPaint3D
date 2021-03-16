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
                -1, 0, 1,  // 0
                -1, 2, 1,   // 1
                1, 2, 1,    // 2
                1, 0, 1,   // 3
                1, 2, -1,   // 4
                1, 0, -1,  // 5
                -1, 2, -1,  // 6
                -1, 0, -1, // 7
                0, 3, 1,    // 9
                0, 3, -1,   // 10
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
                -1, 1, 1,   //0
                -1, 1, -1,  //1
                1, 1, -1,   //2
                1, 1, 1,    //3
                0, 2, 0,    // 4
                0, -0, 0,   // 5
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
                -0.5, 0, -Math.sqrt(3.0)/6.0,
                0.5, 0, -Math.sqrt(3.0)/6.0,
                0, 0, Math.sqrt(1.0/3.0),
                0, Math.sqrt(8.0/12.0), 0,
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
        else if(name === "L"){
            vertices = [
                -0.5, -1, 0.5,  // 0
                1, -1, 0.5,   // 1
                -0.5, -1, 0,    // 2
                1, -1, 0,   // 3
                -0.5, -0.5, 0.5,   // 4
                0, -0.5, 0.5,  // 5
                1, -0.5, 0.5,  // 6
                -0.5, -0.5, 0,  // 7
                0, -0.5, 0, // 8
                1, -0.5, 0, // 9

                -0.5, 0.5, 0.5,  // 10
                0, 0.5, 0.5,   // 11
                -0.5, 0.5, 0,  // 12
                0, 0.5, 0,   // 13
            ];

            indices = [
                0,2,3, 0,3,1, // bottom
                0,1,4, 4,1,6, // front
                0,2,4, 4,2,7, // left
                1,3,6, 6,3,9, // right
                2,7,3, 3,7,9, // back
                5,8,9, 5,9,6, // top

                // Top part
                4,5,11, 4,11,10, // front
                5,11,8, 8,11,13, // right
                7,8,13, 7,13,12, // back
                4,7,10, 10,7,12, // left
                10,12,13, 10,13,11, // top
            ];
        }
        else if(name === "triangular prism"){
            vertices = [
                0, 0, 0, // base
                -0.6, 0, -0.8,
                0.6, 0, -0.8,

                0, 1, 0, // top
                -0.6, 1, -0.8,
                0.6, 1, -0.8,
            ]; 
    
            indices = [
                0,1,3, 3,1,4,
                2,5,0, 0,5,3,
                1,4,2, 2,4,5,
                0,2,1, 3,5,4];
        }
        else if(name === "bridge"){
            vertices = [
                -1.3, 0, 0,  // 0
                -1, 0, 0,   // 1
                1, 0, 0,    // 2
                1.3, 0, 0,   // 3
                -1.3, 0, -0.6,  // 4
                -1, 0, -0.6,   // 5
                1, 0, -0.6,    // 6
                1.3, 0, -0.6,   // 7

                -2, 0.7, 0, // 8
                -1.3, 0.7, 0, // 9
                -1, 0.7, 0,  // 10
                0, 0.7, 0,   // 11
                1, 0.7, 0,  // 12
                1.3, 0.7, 0,   // 13
                2, 0.7, 0,  // 14
                -2, 0.7, -0.6, // 15
                -1.3, 0.7, -0.6, // 16
                -1, 0.7, -0.6,  // 17
                0, 0.7, -0.6,   // 18
                1, 0.7, -0.6,  // 19
                1.3, 0.7, -0.6,   // 20
                2, 0.7, -0.6,  // 21

                -2, 1, 0, // 22
                -1.3, 1, 0, // 23
                -1, 1, 0,  // 24
                0, 1, 0,   // 25
                1, 1, 0,  // 26
                1.3, 1, 0,   // 27
                2, 1, 0,  // 28
                -2, 1, -0.6,   // 29
                -1.3, 1, -0.6,    // 30
                -1, 1, -0.6,   // 31
                0, 1, -0.6,   // 32
                1, 1, -0.6,  // 33
                1.3, 1, -0.6,  // 34
                2, 1, -0.6,  // 35

                -1.3, 2, 0,  // 36
                -1, 2, 0,   // 37
                1, 2, 0,    // 38
                1.3, 2, 0,   // 39
                -1.3, 2, -0.6,  // 40
                -1, 2, -0.6,   // 41
                1, 2, -0.6,    // 42
                1.3, 2, -0.6,   // 43
            ];

            indices = [
                // Base
                0,5,1,  0,4,5,   0,4,1,// bottom
                1,10,5, 5,10,17, 1,17,5, // right
                4,0,9,  4,9,16,  4,0,16, // left
                2,7,3,  2,6,7,   2,6,3,// bottom
                3,13,7, 7,13,20, 3,20,7, // right
                6,2,12, 6,12,19, 6,2,19, // left

                // Floor
                8,23,9,   8,22,23,  8,22,9, // front
                10,25,11, 10,24,25, 10,24,11, // front
                11,26,12, 11,25,26, 11,25,12, // front
                13,28,14, 13,27,28, 13,27,14, // front
                8,9,16,   8,16,15,  8,9,15, // bottom
                10,11,18, 10,18,17, 10,11,17, // bottom
                11,12,19, 11,19,18, 11,12,18, // bottom
                13,14,21, 13,21,20, 13,14,20, // bottom
                15,30,16, 15,29,30, 15,29,16, // back
                17,32,18, 17,31,32, 17,31,18, // back
                18,33,19, 18,32,33, 18,32,19, // back
                20,35,21, 20,34,35, 20,34,21, // back
                15,8,22,  15,22,29, 15,8,29, //left
                21,14,28, 21,28,35, 21,14,35, // right
                29,28,22, 29,35,28, 29,35,22,// top

                //Cables
                23,22,36, 29,30,40,
                25,24,37, 32,31,41,
                26,25,38, 33,32,42,
                28,27,39, 35,34,43, 

                // Columns
                0,37,1,  0,36,37, 0,36,1, //front
                2,39,3,  2,38,39, 2,38,3, //front
                4,41,5,  4,40,41, 4,40,5, //back
                6,43,7,  6,42,43, 6,42,7, //back
                36,41,37, 36,40,41, 36,40,37, // top
                38,43,39, 38,42,43, 38,42,39, // top
            ];
        }
        
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({
            color: "white", 
            wireframe: false, 
            side: THREE.DoubleSide
        });
    }
}

export {Figure};