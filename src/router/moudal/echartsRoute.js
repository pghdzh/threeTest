export default [
    {
        path: '/echarts/3dMap',
        name: '3dMap',//3d地图
        component: () => import('@/views/Echarts/3dMap/index.vue')
    },
    {
        path: '/echarts/wordCloud',
        name: 'wordCloud',//词云
        component: () => import('@/views/Echarts/wordCloud/index.vue')
    },
]
