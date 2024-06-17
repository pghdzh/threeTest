<template>
    <div>
        <div ref="fogRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import initFog from './threeInit/intFog'
const fogRef = ref()
let gui;
onMounted(() => {
    gui = initFog(fogRef).gui
})
onUnmounted(() => {
    if (gui) {
        gui.destroy();
        gui = null;
    }
})
</script>
<style scoped lang='scss'></style>