

<template>
    <div id="my-three" ref="threeTarget"></div>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'


const threeTarget = ref()
const initThreeModel = () => {
    //相机
    const fov = 75;

    const camera = new THREE.PerspectiveCamera(fov, 1, 1, 100)
    camera.position.z = 20;

    //场景
    const scene = new THREE.Scene()
    //几何体
    const shape = new THREE.Shape()
    const x = -2.5
    const y = -5
    shape.moveTo(x + 2.5, y + 2.5)
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y + 2, x, y)
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 2,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    //材质
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    //网格
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube)

    //灯光
    const color = 0xffffff;
    const light = new THREE.DirectionalLight(color, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(200, 200)//设置渲染区尺寸
    renderer.render(scene, camera)//执行渲染操作、指定场景、相机作为参数
    threeTarget.value.appendChild(renderer.domElement)


    const render = (time) => {
        time *= 0.001;
        cube.rotation.x = time
        cube.rotation.y = time
        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}


onMounted(() => {
    initThreeModel()
})
</script>
​
<style lang='scss'></style>

