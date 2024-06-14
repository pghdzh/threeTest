<template>
    <div class="orbitDom" ref="orbitRef">

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import initOrbit from './threeInit/orbitInit'
const orbitRef = ref()

onMounted(() => {
    initOrbit(orbitRef)
})

</script>
<style scoped lang='scss'>
.orbitDom {
    width: 100%;
    height: calc(100vh - 60px);
}
</style>