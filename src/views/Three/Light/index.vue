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
<script  setup>
import { ref, onMounted } from 'vue'
import initAmbientLight from './threeInit/initAmbientLight'
import initHemisphereLight from './threeInit/initHemisphereLight';
import initDirectionalLight from './threeInit/initDirectionalLight';
import initthreePointLight from './threeInit/initthreePointLight';
const threeAmbientLightRef = ref()//环境光
const threeHemisphereLightRef = ref()//半球光
const threeDirectionalLightRef = ref()//方向光
const threePointLightRef = ref()//点光源
onMounted(() => {
    initAmbientLight(threeAmbientLightRef)
    initHemisphereLight(threeHemisphereLightRef)
    initDirectionalLight(threeDirectionalLightRef)
    initthreePointLight(threePointLightRef)
})
</script>
<style scoped lang='scss'>
.content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>