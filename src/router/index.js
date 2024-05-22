import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // NProgress Configuration 刷新页面头部进度条

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView/index.vue'),
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/layout/transition/smallCat',
      children: [
        {
          path: '/layout/transition/smallCat',
          name: 'smallCat',
          component: () => import('@/views/Transition/SmallCat/index.vue')
        },
        {
          path: '/layout/three/threeTest3',
          name: 'threeTest3',//图元
          component: () => import('@/views/Three/test3/index.vue')
        },
        {
          path: '/layout/three/scene',
          name: 'threeScene',//场景
          component: () => import('@/views/Three/Scene/index.vue')
        },
        {
          path: '/layout/three/light',
          name: 'threeLight',//灯光
          component: () => import('@/views/Three/Light/index.vue')
        },
        {
          path: '/layout/three/camera',
          name: 'threeCamera',//相机
          component: () => import('@/views/Three/Camera/index.vue')
        },
        {
          path: '/layout/three/shadow',
          name: 'shadow',//阴影
          component: () => import('@/views/Three/Shadow/index.vue')
        },
        {
          path: '/layout/three/fog',
          name: 'fog',//雾
          component: () => import('@/views/Three/fog/index.vue')
        },
        {
          path: '/layout/three/gift',
          name: 'gift',//导入gift
          component: () => import('@/views/Three/Gift/index.vue')
        },
        {
          path: '/layout/three/starryNight',//星空
          name: 'starryNight',
          component: () => import('@/views/Three/StarryNight/index.vue')
        }
      ]
    },


  ],
  scrollBehavior() {
    return { top: 0 };
  },
})
NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(() => {
  NProgress.done();
})

export default router
