import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
import Stats from '/js/jsm/libs/stats.module.js';
import * as Mesh from '/js/jsm/libs/mesh.module.js';
import dat from '/js/jsm/libs/dat.gui.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats, plane;

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
    camera.position.set(0, 3, 6);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    // MODELS
    mesh = new Mesh.Figure("bridge");
    mesh.setWireframe(true);

    // Plane
    let geometry = new THREE.PlaneGeometry(20, 20);
    let material = new THREE.MeshBasicMaterial({color: "grey", wireframe: false}); 
    plane = new THREE.Mesh(geometry, material);
    plane.name = "Plane";
    plane.rotation.x = -Math.PI/2;

    // SCENE GRAPH
    scene.add(mesh);

    scene.add(plane);
            
    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // DAT GUI

    // Renderer model
    let rendererModel = {
        background: [0,0,0],
    }

    // Plane Model
    let planeModel = {
        visible: true,
    }

    // Stats Model 
    let statsModel = {
        visible: true,
    }

    // Model
    let model = {
        rotX: mesh.rotation.x * 180 / Math.PI,
        rotY: mesh.rotation.y * 180 / Math.PI,
        rotZ: mesh.rotation.z * 180 / Math.PI,
        colorPalette: [255, 255, 255],
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
    generalMenu.add(planeModel, "visible").setValue(true).name("Piso").onChange(function(value) {
        plane.visible = value;
    });

    // Visualizar y ocultar panel de estadisticas    
    generalMenu.add(statsModel, "visible").setValue(true).name("Stats").onChange(function(value) {
        if (value){
            stats.showPanel(0);
        } else {
            stats.showPanel(-1);
        }
    });

    let figureMenu = generalMenu.addFolder("Menu Figura");

    // Ubicacion y orientación
    let posMenu = figureMenu.addFolder("Posicion");
    let sliderPosX = posMenu.add(mesh.position, "x").min(-5).max(5).step(0.5).name("X").listen().onChange(function(value) {

    });
    let sliderPosY = posMenu.add(mesh.position, "y").min(-5).max(5).step(0.5).name("Y").listen().onChange(function(value) {

    });
    let sliderPosZ = posMenu.add(mesh.position, "z").min(-5).max(5).step(0.5).name("Z").listen().onChange(function(value) {

    });
    let rotMenu = figureMenu.addFolder("Rotacion");
    // Model Orientation
    let sliderRotX = rotMenu.add(model, "rotX").min(-180).max(180).step(5).name("X (deg)").listen().onChange(function(value) {
        mesh.rotation.x = value * Math.PI / 180;
    });

    let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(5).name("Y (deg)").listen().onChange(function(value) {
        mesh.rotation.y = value * Math.PI / 180;
    });

    let sliderRotZ = rotMenu.add(model, "rotZ").min(-180).max(180).step(5).name("Z (deg)").listen().onChange(function(value) {
        mesh.rotation.z = value * Math.PI / 180;
    });

    // Wireframe o solido
    // Color
    // Transparencia

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