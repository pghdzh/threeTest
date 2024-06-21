<template>
    <div>
        <div class="threeDom" ref="seaRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import initSea from './threeInit/initSea'
const seaRef = ref()
let gui;
onMounted(() => {
    gui = initSea(seaRef).gui
})

onUnmounted(() => {
    if (gui) {
        gui.destroy();
        gui = null;
    }
})
</script>
<style scoped lang='scss'>
.threeDom {
    width: 100%;
    height: calc(100vh - 60px);
}
</style>