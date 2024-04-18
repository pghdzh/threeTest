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
          path: '/layout/three/threeTest1',
          name: 'threeTest1',
          component: () => import('@/views/Three/test/index.vue')
        },
        {
          path: '/layout/three/threeTest2',
          name: 'threeTest2',
          component: () => import('@/views/Three/test2/index.vue')
        },
        {
          path: '/layout/transition/smallCat',
          name: 'smallCat',
          component: () => import('@/views/Transition/SmallCat/index.vue')
        },
      ]
    },


  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
