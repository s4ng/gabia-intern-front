import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
      children: [
        {
          name: '최근 게시물',
          path: '',
          component: () => import('@/views/pages/RecentPosts')
        },
        {
          name: '공지사항',
          path: 'notice',
          component: () => import('@/views/pages/NoticeBoard'),
        },
        {
          name: '중고 게시판',
          path: 'used',
          component: () => import('@/views/pages/UsedBoard'),
        },
        {
          name: '나눔 게시판',
          path: 'share',
          component: () => import('@/views/pages/ShareBoard'),
        },
        {
          name: '거래 내역',
          path: 'history',
          component: () => import('@/views/pages/DealHistory'),
        },
        {
          name: '프로필',
          path: 'profile',
          component: () => import('@/views/pages/UserProfile'),
        }
      ],
    },
  ],
})
