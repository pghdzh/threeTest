<template>
    <div class="contentLeft">

        <div class="bigTitle">
            three.js
        </div>
        <div class="routerView" v-for="i in threeRouterPath" @click="changeRouterFun(i)"
            :class="{ routerViewSelected: selectedName == i.name }">
            {{ i.name }}
        </div>
        <div class="bigTitle">
            css过渡
        </div>
        <div class="routerView" v-for="i in transitionRouterPath" @click="changeRouterFun(i)"
            :class="{ routerViewSelected: selectedName == i.name }">
            {{ i.name }}
        </div>
    </div>
</template>
<script  setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedName = ref('图元')

const transitionRouterPath = ref([
    { name: '猫', path: '/layout/transition/smallCat' }
])

const threeRouterPath = ref([
    { path: '/layout/three/threeTest3', name: '图元' },
    { path: '/layout/three/scene', name: '场景图' },
    { path: '/layout/three/light', name: '灯光' },
    { path: '/layout/three/camera', name: '相机' },
    { path: '/layout/three/shadow', name: '阴影' },
    { path: '/layout/three/fog', name: '雾' },
    { path: '/layout/three/gift', name: '导入gift' },
    { path: '/layout/three/starryNight', name: '粒子随机移动' }
])

const changeRouterFun = (item) => {
    selectedName.value = item.name
    router.push(item.path)
}

onMounted(() => {
    router.push('/layout/three/threeTest3')
})
</script>
<style scoped lang='scss'>
.contentLeft {
    width: 100%;
    height: 100%;
    border-right: 1px solid gainsboro;
    z-index: 8;
    box-sizing: border-box;
    overflow: auto;
    padding: 0 10px;

    .bigTitle {
        font-size: 20px;
        font-weight: 700;
        margin-top: 16px;
    }

    .routerView {
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        padding-left: 5px;
        margin-bottom: 8px 0;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-weight: 600;
        margin: 10px 0;
    }

    .routerViewSelected {
        background-color: #ECF5FF;
        border-radius: 12px;
        color: #409EFF;
    }

    .routerView:hover {
        color: #409EFF;
    }

}
</style>