import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
import Stats from '/js/jsm/libs/stats.module.js';
import * as Mesh from '/js/jsm/libs/mesh.module.js';
import dat from '/js/jsm/libs/dat.gui.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats;

function init() {
    // RENDERER
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("black");
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    let fov = 60;
    let aspect = window.innerWidth / window.innerHeight;
    let near = 0.1; 
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 6);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    // MODELS
    mesh = new Mesh.Figure("pentagonal prism");
    mesh.setWireframe(true);

    // SCENE GRAPH
    scene.add(mesh);
            
    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // DAT GUI

    // Renderer model
    let rendererModel = {
        background: [0,0,0],
    }

    let gui = new dat.GUI();
    // Funcionalidad para toda la escena
    let generalMenu = gui.addFolder("Menu General");
    
    // Todos los modelos en wireframe o solido

    // Cambiar color de fondo
    generalMenu.addColor(rendererModel, "background").name("Color de fondo").listen().onChange(function(color) {
        renderer.setClearColor(new THREE.Color(color[0]/255, color[1]/255, color[2]/255));
    });

    // Ocultar y mostrar piso

    // Visualizar y ocultar panel de estadisticas    

    // RENDER LOOP
    renderLoop();
}

function renderLoop() {
    stats.begin();
    renderer.render(scene, camera); // DRAW SCENE
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
}

function updateScene() {
    
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});