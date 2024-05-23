<template>
    <div>
        <div class="threeDom" ref="lookAtRef"></div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue';
import initLookAt from './threeInit/initLookAt'
const lookAtRef = ref()

onMounted(() => {
    initLookAt(lookAtRef)
})
</script>
<style scoped lang='scss'>
.threeDom {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #fff;
    color: #444;
}
</style>