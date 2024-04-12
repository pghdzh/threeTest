<template>
    
    <div class="content">
        <div class="layout-top">
            <layoutTop />
        </div>
        <div class="layout-box">
            <div class="layoutLeftArea">
                <layoutLeft />
            </div>
            <div class="layoutMidArea">
                <RouterView />
            </div>
        </div>
    </div>

    <!-- <canvas ref="liveCanvas" class="live2d" /> -->
</template>
<script  setup>
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display/cubism4';
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterView } from 'vue-router'
import layoutLeft from './components/layoutLeft.vue';
import layoutTop from './components/layoutTop.vue'
window.PIXI = PIXI; // 为了pixi-live2d-display内部调用

let app; // 为了存储pixi实例
let model; // 为了存储live2d实例
const liveCanvas = ref()

const init = async () => {
    app = new PIXI.Application({
        view: liveCanvas.value,
        autoStart: true,
        resizeTo: window,
        backgroundAlpha: 0,
    });

    // 打包后live2d资源会出现在dist/下，这里用相对路径就能引用到了
    model = await Live2DModel.from('./live2d/gy1024/Ganyu1024.model3.json');
    model.trackedPointers = [{ id: 1, type: 'pointerdown', flags: true }, { id: 2, type: 'mousemove', flags: true }]
    app.stage.addChild(model);
    model.scale.set(0.2); // 调整缩放比例，一般原始资源尺寸非常大，需要缩小

}

onMounted(() => {
    init()
})

onBeforeUnmount(() => {
    model?.destroy();
    app?.destroy();
})
</script>
<style scoped lang='scss'>
.content {
    width: 100%;
    height: 100vh;
    background: #FFFFFF;

    .layout-top {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        background: #FFFFFF;
        z-index: 9;
    }

    .layout-box {
        display: flex;
        width: 100%;
        height: calc(100% - 80px);
        .layoutLeftArea {
            width: 200px;
            height: 100%;
        }

        .layoutMidArea {
            width: calc(100% - 200px);
            background: #FFFFFF;
            height: 100%;
        }
    }
}

.live2d {
    position: fixed;
    bottom: 0;
    right: -300px;
    width: 500px;
    height: 300px;
}
</style>