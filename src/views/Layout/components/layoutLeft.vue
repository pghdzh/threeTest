<template>
    <div class="contentLeft">
        <div v-for="i in leftNavData">
            <div class="bigTitle">
                <span> {{ i.titleName }}</span>
                <el-icon v-show="i.isExpand" @click="i.isExpand = !i.isExpand">
                    <ArrowUp />
                </el-icon>
                <el-icon v-show="!i.isExpand" @click="i.isExpand = !i.isExpand">
                    <ArrowDown />
                </el-icon>
            </div>
            <div class="routeList" :class="{ 'listClose': i.isExpand }">
                <div class="routerView" v-for="j in i.RouterPath" @click="changeRouterFun(j)"
                    :class="{ routerViewSelected: selectedName == j.name }">
                    {{ j.name }}
                </div>
            </div>
        </div>


    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedName = ref('图元')


const leftNavData = ref(
    [{
        titleName: 'three.js',
        isExpand: true,
        RouterPath: [
            { path: '/three/threeTest3', name: '图元' },
            { path: '/three/scene', name: '场景图' },
            { path: '/three/light', name: '灯光' },
            { path: '/three/camera', name: '相机' },
            { path: '/three/shadow', name: '阴影' },
            { path: '/three/fog', name: '雾' },
            { path: '/three/gift', name: '导入gift' },
            { path: '/three/starryNight', name: '粒子随机移动' },
            { path: '/three/BuffergInstacing', name: '大量实例化缓冲几何体' },
            { path: '/three/snowflake', name: '雪花' },
            { path: '/three/misc_lookAt', name: '视线追踪' },
            { path: '/three/fantasticalCube', name: '奇幻正方体' },
            { path: '/three/orbit', name: '轨道控制器', },
            { path: '/three/css3d_periodictable', name: '元素周期表' },
        ]
    },
    {
        titleName: 'echarts',
        isExpand: false,
        RouterPath: [
            { name: '3D地图', path: '/echarts/3dMap' },
            { name: '词云', path: '/echarts/wordCloud' }
        ]

    },
    {
        titleName: 'css动画',
        isExpand: false,
        RouterPath: [
            { name: '猫', path: '/transition/smallCat' },
        ]

    },]
)


const changeRouterFun = (item) => {
    selectedName.value = item.name
    router.push(item.path)
}

onMounted(() => {
    router.push('/three/threeTest3')
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
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .routeList {
        transition: max-height 1s ease;
        overflow: hidden;
        max-height: 200vh;

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

    .listClose {
        max-height: 0;
    }

}
</style>