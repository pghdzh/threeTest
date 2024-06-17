<template>
    <div style="display: flex;justify-content: center;">
        <div ref="BuffergInstacingRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import initBuffergInstacing from './threeInit/initBuffergInstacing';
const BuffergInstacingRef = ref()
let gui;
onMounted(() => {
    gui = initBuffergInstacing(BuffergInstacingRef).gui
})

onUnmounted(() => {
    if (gui) {
        gui.destroy();
        gui = null;
    }
})
</script>
<style scoped lang='scss'></style>