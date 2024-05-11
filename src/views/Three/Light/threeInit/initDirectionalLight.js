import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.setSize(600, 300)//设置渲染区尺寸

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100)
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.repeat.set(20, 20)

        const planeGeo = new THREE.PlaneGeometry(40, 40);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5
        scene.add(mesh);
    }

    {
        const cubeSize = 4
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat)
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh)
    }

    {
        const sphereGeo = new THREE.SphereGeometry(3, 32, 16)
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-4, 5, 0);
        scene.add(mesh)
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

    const makeXYZGUI=(gui, vector3, name, onChangeFn)=>{
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.open()
    }

    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);

        const helper = new THREE.DirectionalLightHelper(light)
        scene.add(helper);
        const updateLight = () => {
            light.target.updateMatrixWorld()
            helper.update();
        }
        updateLight();

        const gui = new GUI();
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color')
        gui.add(light, 'intensity', 0, 5, 0.01);

        makeXYZGUI(gui, light.position, 'position', updateLight);
        makeXYZGUI(gui, light.target.position, 'target', updateLight);

        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '260px';
        gui.domElement.style.right = '10px';
    }

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    const render = () => {

        if (resizeRendererToDisplaySize(renderer)) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}