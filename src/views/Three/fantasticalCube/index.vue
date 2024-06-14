<template>
    <div>
        <div class="fantasticalCubeDom" ref="fantasticalCubeRef"></div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue'
import fantasticalCubeInit from './threeInit/fantasticalCubeInit.js'
const fantasticalCubeRef = ref()

onMounted(() => {
    fantasticalCubeInit(fantasticalCubeRef)
})
</script>
<style scoped lang='scss'>
.fantasticalCubeDom {
    width: 100%;
    height: calc(100vh - 60px);
}
</style>