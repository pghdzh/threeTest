<template>
    <div class="threeTestContent">
        <div class="three-canvas" ref="threeTarget"></div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//创建三维场景
const scene = new THREE.Scene()
//创建物体
const geometry = new THREE.SphereGeometry(60, 40, 40);
//创建材质

onMounted(() => {

})
</script>
<style scoped lang='scss'>
.threeTestContent {
    width: 100%;
    height: 100%;

    .three-canvas {
        width: 200px;
        height: 200px;
    }
}
</style>