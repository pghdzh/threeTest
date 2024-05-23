<template>
    <div style="display: flex;justify-content: center;">
        <div ref="BuffergInstacingRef"></div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue'
import initBuffergInstacing from './threeInit/initBuffergInstacing';
const BuffergInstacingRef = ref()

onMounted(() => {
    initBuffergInstacing(BuffergInstacingRef)
})
</script>
<style scoped lang='scss'></style>