<template>
    <div class="content">
        <div ref="shadowRef"></div>
        <div ref="SpotLightShadowRef"></div>
        <div ref="PointLightShadowRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import initShadow from './threeInit/initShadow';
import initSpotLightShadow from './threeInit/initSpotLightShadow'
import initPointShadow from './threeInit/initPointShadow';
const shadowRef = ref()
const SpotLightShadowRef = ref()
const PointLightShadowRef = ref()
let gui1, gui2;
onMounted(() => {
    initShadow(shadowRef)
    gui1 = initSpotLightShadow(SpotLightShadowRef).gui
    gui2 = initPointShadow(PointLightShadowRef).gui
})

onUnmounted(() => {
    if(gui1){
        gui1.destroy();
        gui1 = null;
    }
    if(gui2){
        gui2.destroy();
        gui2 = null;
    }
})
</script>
<style scoped lang='scss'>
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>