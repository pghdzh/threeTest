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
import { ref, onMounted, onUnmounted } from 'vue'
import initCamera from './threeInit/initCamera'

const cameraRef = ref()
const view1 = ref()
const view2 = ref()
let controls, controls2, renderer, gui;
onMounted(() => {
    const res = initCamera(cameraRef, view1, view2)
    controls = res.controls
    controls2 = res.controls2
    renderer = res.renderer
    gui = res.gui
})
onUnmounted(() => {
    // 销毁 OrbitControls
    if (controls) {
        controls.dispose();
        controls = null;
    }
    if (controls2) {
        controls2.dispose();
        controls2 = null;
    }
    if (gui) {
        gui.destroy();
        gui = null;
    }

    // 销毁 Three.js 场景
    if (renderer) {
        renderer.dispose();
        renderer = null;
    }
});
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