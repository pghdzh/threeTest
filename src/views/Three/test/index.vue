<template>
    <div class="threeTestContent">
        <div class="three-canvas" ref="threeTarget"></div>
    </div>
</template>
<script setup>
import { ThreeController } from './utils/ThreeController'
import { ModelListConfig } from './utils/ModelListConfig'
import { LightList } from './utils/LightListConfig'
import { allHelper } from './utils/AxesHelperConfig'
import { onMounted, ref } from 'vue'
const threeTarget = ref()
const NewThreeController = ref()
const init = () => {
    NewThreeController.value = new ThreeController(threeTarget.value);

    NewThreeController.value.addObject(...ModelListConfig);

    NewThreeController.value.addObject(...LightList);

    NewThreeController.value.addObject(...allHelper);
}

onMounted(() => {
    init()
})
</script>
<style scoped lang='scss'>
.threeTestContent {
    width: 100%;
    height: 100%;

    .three-canvas {
        width: 100%;
        height: 100%;
    }
}
</style>