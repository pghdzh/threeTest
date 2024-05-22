<template>
    <div class="content">
        <div ref="giftRef"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import initGift from './threeInit/initGift';
const giftRef = ref()

onMounted(() => {
    initGift(giftRef)
})

</script>
<style scoped lang='scss'>
.content {
    display: flex;
    justify-content: center;
}
</style>