<template>
    <div style="display: flex;justify-content: center;">
        <div ref="snowflakeRef" class="threeDom"></div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue'
import initSnowflake from './threeInit/initSnowflake';
const snowflakeRef = ref()

onMounted(() => {
    initSnowflake(snowflakeRef)
})
</script>
<style scoped lang='scss'>
.threeDom {
    width: 100%;
    height: calc(100vh - 60px);
 
}
</style>