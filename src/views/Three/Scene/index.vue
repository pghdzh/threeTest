<template>
    <div id="three-scene" ref="threeRef">

    </div>
</template>
<script  setup>
import * as THREE from 'three'
import { MeshPhongMaterial } from 'three';
import { onMounted, ref } from 'vue';

const threeRef = ref()

const initThreeScene = () => {
    const scene = new THREE.Scene()
    //要更新旋转角度的对象数组
    const objects = [];

    //一球多用
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments,
    )
    //太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);

    //地球
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
    })
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 5;
    sunMesh.add(earthMesh);
    objects.push(earthMesh)


    scene.add(sunMesh);
    objects.push(sunMesh);

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
    renderer.setSize(1200, 600)//设置渲染区尺寸
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

onMounted(() => {
    initThreeScene()
})
</script>
<style scoped lang='scss'></style>