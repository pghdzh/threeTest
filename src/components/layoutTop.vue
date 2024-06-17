<template>
    <div class="topContent">
        <div class="homeBtn" @click="goHome">首页</div>

        <div class="exampleBtn" @click="goExample">
            示例
        </div>
    </div>
</template>
<script  setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
    router.push('/')
}

const goExample = () => {
    router.push('/layout')
}
</script>
<style scoped lang='scss'>
.topContent {
    width: 100%;
    height: inherit;
    box-sizing: border-box;
    border-bottom: 1px solid gainsboro;
    z-index: 9;
    display: flex;
    align-items: center;
    .homeBtn {
        margin-left: 20px;
        cursor: pointer;
    }

    .homeBtn:hover {
        color: #409EFF;
    }

    .exampleBtn {
        margin-left: 20px;
        cursor: pointer;
    }

    .exampleBtn:hover {
        color: #409EFF;
    }
}
</style>
