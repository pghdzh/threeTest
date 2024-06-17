export default [
    {
        path: '/three/threeTest3',
        name: 'threeTest3',//图元
        component: () => import('@/views/Three/test3/index.vue')
    },
    {
        path: '/three/scene',
        name: 'threeScene',//场景
        component: () => import('@/views/Three/Scene/index.vue')
    },
    {
        path: '/three/light',
        name: 'threeLight',//灯光
        component: () => import('@/views/Three/Light/index.vue')
    },
    {
        path: '/three/camera',
        name: 'threeCamera',//相机
        component: () => import('@/views/Three/Camera/index.vue')
    },
    {
        path: '/three/shadow',
        name: 'shadow',//阴影
        component: () => import('@/views/Three/Shadow/index.vue')
    },
    {
        path: '/three/fog',
        name: 'fog',//雾
        component: () => import('@/views/Three/fog/index.vue')
    },
    {
        path: '/three/gift',
        name: 'gift',//导入gift
        component: () => import('@/views/Three/Gift/index.vue')
    },
    {
        path: '/three/starryNight',//粒子
        name: 'starryNight',
        component: () => import('@/views/Three/StarryNight/index.vue')
    },
    {
        path: '/three/BuffergInstacing',//大量实例化缓冲几何体
        name: 'BuffergInstacing',
        component: () => import('@/views/Three/BuffergeometryInstancing/index.vue')
    },
    {
        path: '/three/snowflake',//雪花
        name: 'snowflake',
        component: () => import('@/views/Three/snowflake/index.vue')
    },
    {
        path: '/three/misc_lookAt',//视线追踪
        name: 'lookAt',
        component: () => import("@/views/Three/misc_lookAt/index.vue")
    },
    {
        path: '/three/fantasticalCube',//奇幻正方体
        name: 'fantasticalCube',
        component: () => import("@/views/Three/fantasticalCube/index.vue")
    },
    {
        path: '/three/orbit',//轨道控制器
        name: 'orbit',
        component: () => import("@/views/Three/orbit/index.vue")
    },
    {
        path: '/three/css3d_periodictable',//元素周期表
        name: 'periodictable',
        component: () => import('@/views/Three/css3d_periodictable/index.vue')
    },
]