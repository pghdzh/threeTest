<template>
    <div>
        <div class="threeDom" ref="nightRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import initNight from "./threeInit/initNight"
const nightRef = ref()

onMounted(() => {
    initNight(nightRef)
})
</script>
<style scoped lang='scss'>
.threeDom {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #fff;
}
</style>