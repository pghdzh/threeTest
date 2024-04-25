<template>
    <div class="threeTestContent">
        <div class="three-canvas" ref="threeTarget"></div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three';

const threeTarget = ref()

const initThreeModel = () => {

    //相机
    const fov = 75;
    const aspect = 1;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2;

    //场景
    const scene = new THREE.Scene()
    //几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
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
    renderer.setSize(400, 400)//设置渲染区尺寸
    renderer.render(scene, camera)//执行渲染操作、指定场景、相机作为参数
    threeTarget.value.appendChild(renderer.domElement)

    //调整画布大小
    const resizeRendererToDisplaySize = (renderer) => {

        const width = threeTarget.value.clientWidth;
        const height = threeTarget.value.clientHeight;
        const needResize = threeTarget.value.width !== width || threeTarget.value.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false)
        }
        return needResize
    }


    const render = (time) => {
        time *= 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = threeTarget.value.clientWidth / threeTarget.value.clientHeight
            camera.updateProjectionMatrix()
        }

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
<style scoped lang='scss'></style>

