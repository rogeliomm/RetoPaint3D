import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
import Stats from '/js/jsm/libs/stats.module.js';
import * as Mesh from '/js/jsm/libs/mesh.module.js';
import dat from '/js/jsm/libs/dat.gui.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats, plane;

function create_model(name, scene, generalMenu, modelsDictionary){
    // MODELS
    mesh = new Mesh.Figure(name);
    mesh.setWireframe(true);
    scene.add(mesh);

    // Model
    let model = {
        rotX: mesh.rotation.x * 180 / Math.PI,
        rotY: mesh.rotation.y * 180 / Math.PI,
        rotZ: mesh.rotation.z * 180 / Math.PI,
        colorPalette: [255, 255, 255],
        transparent: 1,
        mesh: mesh,
    }

    if(!(name in modelsDictionary)) modelsDictionary[name] = [];
    modelsDictionary[name].push(model);
    let figureMenu = generalMenu.addFolder(name + " " + modelsDictionary[name].length);

    // Ubicacion y orientación
    let posMenu = figureMenu.addFolder("Posicion");
    let sliderPosX = posMenu.add(model.mesh.position, "x").min(-5).max(5).step(0.5).name("X").listen().onChange(function(value) {});
    let sliderPosY = posMenu.add(model.mesh.position, "y").min(-5).max(5).step(0.5).name("Y").listen().onChange(function(value) {});
    let sliderPosZ = posMenu.add(model.mesh.position, "z").min(-5).max(5).step(0.5).name("Z").listen().onChange(function(value) {});
    let rotMenu = figureMenu.addFolder("Rotacion");
    let sliderRotX = rotMenu.add(model, "rotX").min(-180).max(180).step(5).name("X (deg)").listen().onChange(function(value) {
        model.mesh.rotation.x = value * Math.PI / 180;
    });

    let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(5).name("Y (deg)").listen().onChange(function(value) {
        model.mesh.rotation.y = value * Math.PI / 180;
    });

    let sliderRotZ = rotMenu.add(model, "rotZ").min(-180).max(180).step(5).name("Z (deg)").listen().onChange(function(value) {
        model.mesh.rotation.z = value * Math.PI / 180;
    });

    // Aparencia
    let appearMenu = figureMenu.addFolder("Apariencia");
    // Wireframe
    appearMenu.add(model.mesh.material, "wireframe").setValue(true).name("Wireframe").onChange(function(value) {}).listen();
    // Color
    appearMenu.addColor(model, "colorPalette").name("Color").listen().onChange(function(color) {
        model.mesh.material.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
    });

    // Transparencia
    appearMenu.add(model, "transparent").min(0).max(1).step(0.1).name("Transparencia").listen().onChange(function(value) {
        model.mesh.material.transparent = true;
        model.mesh.material.opacity = value;
    });
}

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
    // Plane
    let geometry = new THREE.PlaneGeometry(20, 20);
    let material = new THREE.MeshBasicMaterial({color: "grey", wireframe: false, side: THREE.DoubleSide}); 
    plane = new THREE.Mesh(geometry, material);
    
    plane.name = "Plane";
    plane.rotation.x = -Math.PI/2;

    // SCENE GRAPH
    scene.add(plane);
            
    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // DAT GUI

    // Renderer model
    let rendererModel = {
        background: [0,0,0],
        plane: [0,0,0],
        wireframe: false,
    }

    // Plane Model
    let planeModel = {
        visible: true,
    }

    // Stats Model 
    let statsModel = {
        visible: true,
    }

    let gui = new dat.GUI();

    let left_gui = new dat.GUI({autoPlace: false});
    left_gui.domElement.id="gui";
    let gui_container = document.getElementById("gui_container");
    gui_container.appendChild(left_gui.domElement);
    
    let modelsDict = {};
    let figuresModel = {
        modelsList: ["pyramid", "T", "house", "diamond", "pentagonal prism", 
                           "box", "tetrahedron", "L", "bridge", "triangular prism" ],
        defaultItem: "box",
        addItem: function() {
            create_model(figuresModel.defaultItem, scene, generalMenu, modelsDict); 
        },
    }; 
    left_gui.open();
    let selectMenu = left_gui.addFolder("Menu Añadir Figuras");
    let figureList = selectMenu.add(figuresModel, "defaultItem", figuresModel.modelsList).name("Figures List");

    let btnAddFigure = selectMenu.add(figuresModel, "addItem").name("Add Figure");

    // Funcionalidad para toda la escena
    let generalMenu = gui.addFolder("Menu General");
    
    // Todos los modelos en wireframe o solido
    generalMenu.add(rendererModel, "wireframe").setValue(true).name("Escena Wireframe").onChange(function(valueParam) {
        for (const [key, value] of Object.entries(modelsDict)){
            value.forEach(subModel =>{
                subModel.mesh.material.wireframe = valueParam;
            })
        };
    });

    // Cambiar color de fondo
    generalMenu.addColor(rendererModel, "background").name("Color de fondo").listen().onChange(function(color) {
        renderer.setClearColor(new THREE.Color(color[0]/255, color[1]/255, color[2]/255));
    });

    // Ocultar y mostrar piso
    generalMenu.add(planeModel, "visible").setValue(true).name("Piso").onChange(function(value) {
        plane.visible = value;
    });
    
    // Cambiar color del piso
    generalMenu.addColor(rendererModel, "plane").name("Color del piso").listen().onChange(function(color) {
        plane.material.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
    });

    // Visualizar y ocultar panel de estadisticas    
    generalMenu.add(statsModel, "visible").setValue(true).name("Stats").onChange(function(value) {
        if (value){
            stats.showPanel(0);
        } else {
            stats.showPanel(-1);
        }
    });

    
    
    create_model("house", scene, generalMenu, modelsDict);   

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