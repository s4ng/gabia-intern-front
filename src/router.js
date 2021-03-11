import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router =  new Router({
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
          path: 'present',
          component: () => import('@/views/pages/ShareBoard'),
        },
        {
          name: '거래 내역',
          path: 'history',
          component: () => import('@/views/pages/DealHistory'),
          meta: { auth: true}
        },
        {
          name: '프로필',
          path: 'profile',
          component: () => import('@/views/pages/UserProfile'),
          meta: { auth: true}
        },
        {
          name: '게시판',
          path: 'post/:boardId',
          component: () => import('@/views/pages/PostPage'),
          props: true
        },
        {
          name: '글쓰기',
          path: 'write',
          component: () => import('@/views/pages/WritePost'),
          meta: { auth: true }
        },
        {
          name: '로그인',
          path: 'signin',
          component: () => import('@/views/pages/SigninPage'),
          meta: { noNeedAuth: true }
        },
        {
          name: '회원가입',
          path: 'signup',
          component: () => import('@/views/pages/SignupPage'),
          meta: { noNeedAuth: true }
        }
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.getters.isSignedIn) {
    alert('로그인 해주세요.')
    next('/signin')
  } 
  if(to.meta.noNeedAuth && store.getters.isSignedIn) {
    next('/')
  }
  return next();
})

export default router