<template>
    <div class="content">
        <div class="layout-box">
            <div class="layoutLeftArea">
                <layoutLeft />
            </div>
            <div class="layoutMidArea">
                <RouterView />
            </div>
        </div>
    </div>

   
</template>
<script  setup>

import { RouterView } from 'vue-router'
import layoutLeft from './components/layoutLeft.vue';

</script>
<style scoped lang='scss'>
.content {
    width: 100%;
    height: 100%;
    

    .layout-box {
        display: flex;
        width: 100%;
        height: 100%;

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


</style>