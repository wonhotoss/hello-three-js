import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Clock, AmbientLight, DirectionalLight } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export class App {
    private readonly timer = new Clock();
    private readonly scene = new Scene();  
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });

    constructor() {
        this.camera.position.set(0, 0, 500);

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(0,0,0)'));

        let light = new AmbientLight(0xffffff);
        light.intensity = 1;

        let dlight = new DirectionalLight(0xffffff, 3);
        this.scene.add(light, dlight);

        let loader = new GLTFLoader();

        loader.load("gltf_logo/Rocket.gltf", (gltf) => {            
            console.log(this.scene.add(gltf.scene));

            this.scene.children[2].children[0].rotation.set(-1.57, 0, 0);

            this.render();
        });

        (window as any)['app'] = this;
    }

    private adjustCanvasSize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private render() {
        const delta = this.timer.getDelta();

        let r = this.scene.children[2].children[0].rotation;
        r.set(-1.57, r.y, (r.z + delta) % (2 * Math.PI));

        // this.scene.children[2].children[0].rotation.set(-1.57, 0, 0);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
        this.adjustCanvasSize();        
    }
}
