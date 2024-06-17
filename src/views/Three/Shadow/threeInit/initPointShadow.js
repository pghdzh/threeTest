import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.shadowMap.enabled = true;
    renderer.setSize(800, 400)

    const camera = new THREE.PerspectiveCamera(45, 2, .1, 100)
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0)
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
        })

        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    {
        const cubeGeo = new THREE.BoxGeometry(4, 4, 4);
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(5, 2, 0);
        scene.add(mesh)
    }

    {
        const cubeGeo = new THREE.BoxGeometry(30, 30, 30);
        const cubeMat = new THREE.MeshPhongMaterial({
            color: '#ccc',
            side: THREE.BackSide,
        })
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.receiveShadow = true;
        mesh.position.set(0, 14.9, 0)
        scene.add(mesh)
    }


    {
        const sphereGeo = new THREE.SphereGeometry(3, 32, 16);
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat)
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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

    const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
        const folder = gui.addFolder(name)
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);

    }
    const gui = new GUI();
    {
        const light = new THREE.PointLight(0xffffff, 100);
        light.castShadow = true;
        light.position.set(0, 10, 0);
        scene.add(light);

        const helper = new THREE.PointLightHelper(light);
        scene.add(helper);

        function updateCamera() {
            light.shadow.camera.updateProjectionMatrix();
        }

        class MinMaxGUIHelper {

            constructor(obj, minProp, maxProp, minDif) {

                this.obj = obj;
                this.minProp = minProp;
                this.maxProp = maxProp;
                this.minDif = minDif;

            }
            get min() {

                return this.obj[this.minProp];

            }
            set min(v) {

                this.obj[this.minProp] = v;
                this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);

            }
            get max() {

                return this.obj[this.maxProp];

            }
            set max(v) {
                this.obj[this.maxProp] = v;
                this.min = this.min; //这个会调用min的setter确保max大于min
            }
        }



        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('颜色');
        gui.add(light, 'intensity', 0, 200).name('光的强度')
        gui.add(light, 'distance', 0, 40).name('距离').onChange(updateCamera);
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '600px';
        gui.domElement.style.right = '10px';
        {
            const folder = gui.addFolder('阴影相机');
            folder.open();
            const minMaxGUIHelper = new MinMaxGUIHelper(light.shadow.camera, 'near', 'far', 0.1);
            folder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('近裁剪面').onChange(updateCamera)
            folder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('远裁剪面').onChange(updateCamera)
        }

        makeXYZGUI(gui, light.position, '位置', updateCamera);

    }

    const render = () => {
        {
            const canvas = renderer.domElement;
            camera.updateProjectionMatrix()
        }
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    return { gui }
}
