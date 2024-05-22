<template>
    <div class="content">
        <div ref="starRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import starInit from './threeInit/starInit';
const starRef = ref()

onMounted(() => {
    starInit(starRef)
})

</script>
<style scoped lang='scss'>
.content {
    display: flex;
    justify-content: center;
}
</style>