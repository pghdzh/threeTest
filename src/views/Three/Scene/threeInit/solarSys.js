import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
export default (threeRef) => {
    const scene = new THREE.Scene()
    //要更新旋转角度的对象数组
    const objects = [];


    const gui = new GUI()
    //一球多用
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments,
    )


    //宇宙空间
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    //太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    //地球空间
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 20;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);


    //地球
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
    })
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.scale.set(2, 2, 2);
    earthOrbit.add(earthMesh)
    objects.push(earthMesh)

    //月亮空间
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 5;
    earthOrbit.add(moonOrbit);

    //月亮
    const moonMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888, emissive: 0x222222
    })

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    //坐标轴UI
    class AxisGridHelp {
        constructor(node, units = 10) {
            const axes = new THREE.AxesHelper();
            axes.material.depthTest = false
            axes.renderOrder = 2;
            node.add(axes);

            const grid = new THREE.GridHelper(units, units);
            grid.material.depthTest = false;
            grid.renderOrder = 1;
            node.add(grid);

            this.grid = grid;
            this.axes = axes;
            this.visible = false;
        }

        get visible() {
            return this._visible;
        }

        set visible(v) {
            this._visible = v;
            this.grid.visible = v;
            this.axes.visible = v;
        }
    }

    function makeAxisGrid(node, label, units) {
        const helper = new AxisGridHelp(node, units);
        gui.add(helper, 'visible').name(label);
    }

    makeAxisGrid(solarSystem, 'solarSystem', 25);
    makeAxisGrid(sunMesh, 'sunMesh');
    makeAxisGrid(earthOrbit, 'earthOrbit');
    makeAxisGrid(earthMesh, 'earthMesh');
    makeAxisGrid(moonOrbit, 'moonOrbit');
    makeAxisGrid(moonMesh, 'moonMesh');


    //点光源
    const color = 0xffffff
    const intensity = 3
    const light = new THREE.PointLight(color, intensity);
    scene.add(light)

    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);


    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(600, 300)//设置渲染区尺寸
    renderer.render(scene, camera)//执行渲染操作、指定场景、相机作为参数
    threeRef.value.appendChild(renderer.domElement)


    const render = (time) => {
        time *= 0.001;
        objects.forEach((obj) => {
            obj.rotation.y = time;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}
