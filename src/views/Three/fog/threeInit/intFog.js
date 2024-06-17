import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer();
    const canvas = renderer.domElement;
    threeRef.value.appendChild(canvas)
    const gui = new GUI()
    renderer.setSize(800, 400)

    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    class FogGUIHelper {
        constructor(fog, backgroundColor) {
            this.fog = fog;
            this.backgroundColor = backgroundColor;
        }

        get near() {
            return this.fog.near;
        }

        set near(v) {
            this.fog.near = v;
            this.fog.far = Math.max(this.fog.far, v);

        }

        get far() {
            return this.fog.far;
        }

        set far(v) {
            this.fog.far = v;
            this.fog.near = Math.min(this.fog.near, v)
        }

        get color() {
            return `#${this.fog.color.getHexString()}`;
        }

        set color(hexString) {
            this.fog.color.set(hexString);
            this.backgroundColor.set(hexString);
        }
    }

    {
        scene.fog = new THREE.Fog('lightblue', 1, 2);
        scene.background = new THREE.Color('lightblue');

        const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
        gui.add(fogGUIHelper, 'near', 1, 2).listen();
        gui.add(fogGUIHelper, 'far', 1, 2).listen();
        gui.addColor(fogGUIHelper, 'color');
    }

    {
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(-1, 2, 4)
        scene.add(light);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const makeInstance = (geometry, color, x) => {
        const material = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    const render = (time) => {
        time *= 0.001;
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        })

        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
    return { gui }
}