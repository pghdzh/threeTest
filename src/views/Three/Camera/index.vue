<template>
    <div>
        <div ref="cameraRef" class="canvasArea">
            <div class="split">
                <div ref="view1"></div>
                <div ref="view2"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import initCamera from './threeInit/initCamera'

const cameraRef = ref()
const view1 = ref()
const view2 = ref()

onMounted(() => {
    initCamera(cameraRef, view1, view2)
})
</script>
<style scoped lang='scss'>
.canvasArea {
    position: relative;
    width: 100%;
    height: 100%;
}

.split {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.split>div {
    width: 100%;
    height: 100%;
}
</style>