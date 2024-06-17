<template>
    <div class="content">
        <div ref="threeAmbientLightRef">
        </div>
        <div ref="threeHemisphereLightRef">
        </div>
        <div ref="threeDirectionalLightRef"></div>
        <div ref="threePointLightRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted,onUnmounted } from 'vue'
import initAmbientLight from './threeInit/initAmbientLight'
import initHemisphereLight from './threeInit/initHemisphereLight';
import initDirectionalLight from './threeInit/initDirectionalLight';
import initthreePointLight from './threeInit/initthreePointLight';
const threeAmbientLightRef = ref()//环境光
const threeHemisphereLightRef = ref()//半球光
const threeDirectionalLightRef = ref()//方向光
const threePointLightRef = ref()//点光源
let gui1, gui2, gui3, gui4
onMounted(() => {
    gui1 = initAmbientLight(threeAmbientLightRef).gui
    gui2 = initHemisphereLight(threeHemisphereLightRef).gui
    gui3 = initDirectionalLight(threeDirectionalLightRef).gui
    gui4 = initthreePointLight(threePointLightRef).gui
})

onUnmounted(() => {
    if (gui1) {
        gui1.destroy();
        gui1 = null;
    }
    if (gui2) {
        gui2.destroy();
        gui2 = null;
    }
    if (gui2) {
        gui2.destroy();
        gui2 = null;
    }
    if (gui2) {
        gui2.destroy();
        gui2 = null;
    }
})
</script>
<style scoped lang='scss'>
.content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>