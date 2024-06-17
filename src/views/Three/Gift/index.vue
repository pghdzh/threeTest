<template>
    <div class="content">
        <div ref="giftRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import initGift from './threeInit/initGift';
const giftRef = ref()
let gui;
onMounted(() => {
    gui = initGift(giftRef).gui
})

onUnmounted(() => {
    if (gui) {
        gui.destroy();
        gui = null;
    }
})
</script>
<style scoped lang='scss'>
.content {
    display: flex;
    justify-content: center;
}
</style>