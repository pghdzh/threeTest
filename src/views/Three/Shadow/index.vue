<template>
    <div class="content">
        <div ref="shadowRef"></div>
        <div ref="SpotLightShadowRef"></div>
        <div ref="PointLightShadowRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import initShadow from './threeInit/initShadow';
import initSpotLightShadow from './threeInit/initSpotLightShadow'
import initPointShadow from './threeInit/initPointShadow';
const shadowRef = ref()
const SpotLightShadowRef = ref()
const PointLightShadowRef = ref()
onMounted(() => {
    initShadow(shadowRef)
    initSpotLightShadow(SpotLightShadowRef)
    initPointShadow(PointLightShadowRef)
})
</script>
<style scoped lang='scss'>
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>