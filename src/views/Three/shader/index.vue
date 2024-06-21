<template>
    <div>
        <div class="threeDom" ref="threeRef"></div>
    </div>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import initShader from './initShader';
const threeRef = ref()

onMounted(() => {
    initShader(threeRef)
})
</script>
<style scoped lang='scss'>
.threeDom {
    width: 100%;
    height: calc(100vh - 60px)
}
</style>