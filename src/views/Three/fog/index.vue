<template>
    <div>
        <div ref="fogRef"></div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue'
import initFog from './threeInit/intFog'
const fogRef = ref()

onMounted(() => {
    initFog(fogRef)
})
</script>
<style scoped lang='scss'></style>