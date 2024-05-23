import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

export default (threeRef) => {

    const domWidth = threeRef.value.clientWidth
    const domHeight = threeRef.value.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, domWidth / domHeight, 1, 15000)
    camera.position.z = 3200;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 20, 20), new THREE.MeshNormalMaterial());
    scene.add(sphere);

    const geometry = new THREE.CylinderGeometry(0, 10, 100, 12)
    geometry.rotateX(Math.PI / 2);

    const material = new THREE.MeshNormalMaterial();

    for (let i = 0; i < 1000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 4000 - 2000;
        mesh.position.y = Math.random() * 4000 - 2000;
        mesh.position.z = Math.random() * 4000 - 2000;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2
        scene.add(mesh);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(domWidth, domHeight)
    threeRef.value.appendChild(renderer.domElement)

    const stats = new Stats();
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '60px';
    stats.dom.style.left = '200px';
    threeRef.value.appendChild(stats.dom)
    let mouseX = 0, mouseY = 0
    const onDomMouseMove = (event) => {
        mouseX = (event.clientX - domWidth / 2) * 10
        mouseY = (event.clientY - domHeight / 2) * 10
    }

    threeRef.value.addEventListener('mousemove', onDomMouseMove);


    const render = () => {

        stats.update()
        const time = Date.now() * 0.0005;

        sphere.position.x = Math.sin(time * 0.7) * 2000;
        sphere.position.y = Math.cos(time * 0.5) * 2000;
        sphere.position.z = Math.cos(time * 0.3) * 2000;

        for (let i = 1, l = scene.children.length; i < l; i++) {

            scene.children[i].lookAt(sphere.position);

        }

        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (- mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}