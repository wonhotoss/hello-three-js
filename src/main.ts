import {sayHello} from './greet';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function showHello(divname: string, name: string){
    const elt = document.getElementById(divname);
    elt.innerText = sayHello(name);
}

showHello('greeting', 'typescript');

const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");
// const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight , 0.1, 1000);
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

let loader = new GLTFLoader();

loader.load("gltf_logo/scene.gltf", function (gltf) {
    scene.add(gltf.scene);

    function animate(){
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
});

// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
camera.position.set(0, 0, 5);
// camera.position.z = 5;

let light = new THREE.DirectionalLight(0xffff00, 0.7);
light.position.set(50, 50, 50);
scene.add(light);

