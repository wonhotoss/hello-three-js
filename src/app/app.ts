import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Clock } from 'three';
import { Brick } from './brick';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export class App {
  private readonly timer = new Clock();
  private readonly scene = new Scene();
  // private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private brick: Brick;

  constructor() {
    this.brick = new Brick(100, new Color('rgb(255,0,0)'));
    this.scene.add(this.brick);

    let loader = new GLTFLoader();

    loader.load("gltf_logo/Airplane.gltf", (gltf) => {
        console.log(gltf);
        console.log(this.scene.add(gltf.scene));
    });

    // this.camera.position.set(200, 200, 200);
    this.camera.position.set(0, 0, 15);
    // this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(0,0,0)'));

    this.render();

    (window as any)['app'] = this;
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    const delta = this.timer.getDelta();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    this.adjustCanvasSize();
    this.brick.rotateY(3 * delta);
  }
}
