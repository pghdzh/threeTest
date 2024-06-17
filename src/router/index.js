import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import transitionRoute from './moudal/transitionRoute';
import threeRoute from './moudal/threeRoute';
import echartsRoute from './moudal/echartsRoute';
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
      redirect: '/three/threeTest3',
      children: [
        ...echartsRoute,
        ...threeRoute,
        ...transitionRoute,
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
