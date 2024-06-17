import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.setSize(600, 300)//设置渲染区尺寸

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20);


    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * - .5;
        scene.add(mesh);
    }

    {

        const cubeSize = 4;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);

    }

    {

        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(- sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);

    }


    class ColorGUIHelper {

        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }

        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }


        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    const makeXYZGUI = (gui, Vector3, name, onChangeFn) => {
        const folder = gui.addFolder(name);
        folder.add(Vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(Vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(Vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.open();
    }
    const gui = new GUI();
    {
        const color = 0xFFFFF;
        const intensity = 150;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(0, 10, 0);
        scene.add(light);

        const helper = new THREE.PointLightHelper(light);
        scene.add(helper);

        function updateLight() {
            helper.update();
        }


        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0, 250, 1);
        gui.add(light, 'distance', 0, 40).onChange(updateLight);

        makeXYZGUI(gui, light.position, 'position');
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '560px';
        gui.domElement.style.right = '10px';
    }

    function resizeRendererToDisplaySize(renderer) {

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {

            renderer.setSize(width, height, false);

        }

        return needResize;

    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);

    }

    requestAnimationFrame(render);
    return { gui }
}