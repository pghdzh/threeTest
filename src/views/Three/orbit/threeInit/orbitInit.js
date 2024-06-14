import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export default (threeRef) => {
    let camera, controls, scene, renderer;

    const domWidth = threeRef.value.clientWidth
    const domHeight = threeRef.value.clientHeight

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);


    renderer = new THREE.WebGLRenderer({ antialias: true });//抗锯齿
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(domWidth, domHeight)

    threeRef.value.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(60, domWidth / domHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    controls = new OrbitControls(camera, renderer.domElement);
   
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

    for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);
    }

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00288, 3);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    const render = () => {
        controls.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);//代替requestAnimationFrame的
}