<template>

    <div ref="map3DEchartRef" class="map"></div>

</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import imageUrl from '/img/avator.jpeg';
import * as echarts from 'echarts';
import axios from 'axios'
import 'echarts-gl';
const map3DEchartRef = ref()
let map3DEchart = null
const init3DmapChart = () => {
    map3DEchart = echarts.init(map3DEchartRef.value);

    let option = {

        series: [
            {
                type: "map3D", // 加载series数据
                map: "centerMap",
                regionHeight: 10,

                label: {
                    show: true,
                    fontSize: 18,
                    color: "#fff", // 地图初始化区域字体颜色
                    fontWeight: "bold",
                },
                itemStyle: {
                    // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                    color: "#237ACC", // 地图板块的颜色
                    opacity: 1, // 图形的不透明度 [ default: 1 ]
                    borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
                    borderColor: "#333", // 图形描边的颜色。[ default: #333 ]
                },
                emphasis: {
                    label: {
                        show: true,
                        color: "#fff",
                    },
                    itemStyle: {
                        color: "#00D0D0",
                    },
                },

                shading: 'lambert',


                light: {
                    // 光照阴影
                    main: {
                        color: "#fff", // 光照颜色
                        intensity: 2, // 光照强度
                        shadowQuality: "light", // 阴影亮度
                        shadow: true, // 是否显示阴影
                        alpha: 40,
                        beta: 40,
                    },

                },
                viewControl: {
                    projection: "perspective",
                    distance: 130,
                    alpha: 50,
                    beta: 0,
                    // rotateSensitivity: 0,//禁止旋转
                    zoomSensitivity: 0,//禁止缩放
                    panSensitivity: 0,//禁止平移
                },

            },


        ],


    };

    axios.get('/map.json')
        .then(response => {
            let lintaoJson = response.data
            echarts.registerMap("centerMap", lintaoJson)
            map3DEchart.setOption(option);
            map3DEchart.on('click', params => {
                myModalRef.value.onOpen(params.name)
            })
        })

}

onMounted(() => {
    init3DmapChart()
})

onBeforeUnmount(() => {
    if (map3DEchart) {
        map3DEchart.dispose()
    }
})
</script>
<style scoped lang='scss'>
.map {
    width: 100%;
    height: calc(100vh - 60px);
}
</style>