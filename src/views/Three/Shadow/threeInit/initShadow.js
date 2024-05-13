import * as THREE from 'three'

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.setSize(800, 400)

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const loader = new THREE.TextureLoader();

    {
        const planeSize = 40;

        const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        const repeats = planeSize / 2;

        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        planeMat.color.setRGB(1.5, 1.5, 1.5);
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    const shadowTexture = loader.load('https://threejs.org/manual/examples/resources/images/roundshadow.png');
    const sphereShadowBases = [];
    {
        const sphereRadius = 1;
        const sphereGeo = new THREE.SphereGeometry(1, 32, 16)

        const planeSize = 1;
        const shadowGeo = new THREE.PlaneGeometry(1, 1);

        const numSpheres = 15;
        for (let i = 0; i < numSpheres; ++i) {
            const base = new THREE.Object3D();
            scene.add(base);


            const shadowMat = new THREE.MeshBasicMaterial({
                map: shadowTexture,
                transparent: true,
                depthWrite: false,
            })

            const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
            shadowMesh.position.y = 0.001;
            shadowMesh.position.x = Math.PI * -.5;

            const shadowSize = sphereRadius * 4;
            shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
            base.add(shadowMesh);

            const u = i / numSpheres;
            const sphereMat = new THREE.MeshPhongMaterial();
            sphereMat.color.setHSL(u, 1, .75);
            const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
            sphereMesh.position.set(0, sphereRadius + 2, 0);
            base.add(sphereMesh);

            sphereShadowBases.push({ base, sphereMesh, shadowMesh, y: sphereMesh.position.y })
        }
    }

    {
        const skyColor = 0xb1e1ff;
        const groundColor = 0xb97a20;
        const intensity = 0.75;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xffffff;
        const intensity = 2.5;
        const light = new THREE.DirectionalLight(color, intensity);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
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

    const render = (time) => {
        time *= 0.001;

        resizeRendererToDisplaySize(renderer);

        {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix()
        }

        sphereShadowBases.forEach((sphereShadowBase, ndx) => {

            const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

            // u is a value that goes from 0 to 1 as we iterate the spheres
            const u = ndx / sphereShadowBases.length;

            // compute a position for there base. This will move
            // both the sphere and its shadow
            const speed = time * .2;
            const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : - 1);
            const radius = Math.sin(speed - ndx) * 10;
            base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

            // yOff is a value that goes from 0 to 1
            const yOff = Math.abs(Math.sin(time * 2 + ndx));
            // move the sphere up and down
            sphereMesh.position.y = y + THREE.MathUtils.lerp(- 2, 2, yOff);
            // fade the shadow as the sphere goes up
            shadowMesh.material.opacity = THREE.MathUtils.lerp(1, .25, yOff);

        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}