<template>
    <div ref="threeRef">
    </div>
    <div ref="threeTankRef">
    </div>
    <div ref="tankInfoRef" id="info"></div>
</template>
<script  setup>
import initThreeScene from './threeInit/solarSys'
import initTank from './threeInit/tank'
import { onMounted, ref } from 'vue';

const threeRef = ref()
const threeTankRef = ref()
const tankInfoRef = ref()
onMounted(() => {
    initThreeScene(threeRef)
    initTank(threeTankRef,tankInfoRef)
})
</script>
<style scoped lang='scss'>
#info {
    position: fixed;
    left: 40%;
    top: 1em;
    background: rgba(0, 0, 0, .8);
    padding: .5em;
    color: white;
    font-family: monospace;
}
</style>