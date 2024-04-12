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
      component: () => import('@/views/Layout/index.vue')
    },

  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
