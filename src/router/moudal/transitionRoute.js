export default [
    {
        path: '/transition/smallCat',
        name: 'smallCat',//猫
        component: () => import('@/views/Transition/SmallCat/index.vue')
    },
    {
        path: '/transition/rabbit',
        name: 'rabbit',//兔子
        component: () => import("@/views/Transition/rabbit/index.vue")
    },
]