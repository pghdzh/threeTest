<template>
    <div class="three-canvas" ref="threeTarget"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const threeTarget = ref()
const initThreeModel = () => {
    //创建三维场景
    const scene = new THREE.Scene()
    //创建物体
    const geometry = new THREE.SphereGeometry(120, 80, 80);
    //创建材质
    const material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.9,
    })

    //创建一个网格模型对象
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //添加光源
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const light = new THREE.PointLight(0xffffff, 1)

    scene.add(ambient)
    light.position.set(200, 300, 400);
    scene.add(light);

    //创建一个透视相机
    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    console.log('width1', width, height)
    camera.position.set(300, 300, 300);
    camera.lookAt(0, 0, 0);

    //辅助坐标
    const axesHelper = new THREE.AxesHelper(200)
    scene.add(axesHelper);

    //渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.render(scene, camera)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
        renderer.render(scene, camera)
    })
    threeTarget.value.appendChild(renderer.domElement)
}

onMounted(() => {
    initThreeModel()
})
</script>
<style scoped lang='scss'></style>