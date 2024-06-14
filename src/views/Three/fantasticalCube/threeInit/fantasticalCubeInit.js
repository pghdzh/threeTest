import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

export default (threeRef) => {

    const domWidth = threeRef.value.clientWidth
    const domHeight = threeRef.value.clientHeight

    const camera = new THREE.PerspectiveCamera(27, domWidth / domHeight, 1, 3500);
    camera.position.z = 2750

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    scene.add(new THREE.AmbientLight(0x444444, 3));

    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 4.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    const triangles = 5000;

    let geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(triangles * 3 * 3)
    const normals = new Float32Array(triangles * 3 * 3)
    const colors = new Float32Array(triangles * 3 * 3)

    const color = new THREE.Color()

    const n = 800, n2 = 400;
    const d = 120, d2 = 60;

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();

    for (let i = 0; i < positions.length; i += 9) {
        const x = Math.random() * n - n2
        const y = Math.random() * n - n2
        const z = Math.random() * n - n2

        const ax = x + Math.random() * d - d2
        const ay = y + Math.random() * d - d2
        const az = z + Math.random() * d - d2

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;

        positions[i + 3] = bx;
        positions[i + 4] = by;
        positions[i + 5] = bz;

        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;

        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);

        cb.normalize();

        const nx = cb.x
        const ny = cb.y
        const nz = cb.z;

        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;

        normals[i + 3] = nx;
        normals[i + 4] = ny;
        normals[i + 5] = nz;

        normals[i + 6] = nx;
        normals[i + 7] = ny;
        normals[i + 8] = nz;


        const vx = (x / n) + 0.5;
        const vy = (y / n) + 0.5;
        const vz = (z / n) + 0.5;
        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;

        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();

    let material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: true
    })

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);



    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3))

    material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true });

    let line = new THREE.Line(geometry, material);
    scene.add(line);

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(domWidth, domHeight)
    threeRef.value.append(renderer.domElement)

    const stats = new Stats();
    stats.dom.style.position = 'absolute'
    stats.dom.style.top = '60px'
    stats.dom.style.left = '200px'

    const pointer = new THREE.Vector2();
    const onPointerMove = (event) => {
        pointer.x = (event.clientX / domWidth) * 2 - 1
        pointer.y = (event.clientY / domHeight) * 2 + 1
    }

    const raycaster = new THREE.Raycaster();

    const render = () => {
        const time = Date.now() * 0.001;

        mesh.rotation.x = time * 0.15;
        mesh.rotation.y = time * 0.25;

        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const face = intersect.face;

            const linePosition = line.geometry.attributes.position;
            const meshPosition = mesh.geometry.attributes.position;

            linePosition.copyAt(0, meshPosition, face.a);
            linePosition.copyAt(1, meshPosition, face.b);
            linePosition.copyAt(2, meshPosition, face.a);
            linePosition.copyAt(3, meshPosition, face.b);

            mesh.updateMatrix();

            line.geometry.applyMatrix4(mesh.matrix);

            line.visible = true;
        }
        else {
            line.visible = false
        }

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}   