import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/survey',
    },
    {
      path: '/survey',
      name: 'survey',
      component: () => import('@/views/SurveyView.vue'),
      meta: { title: '마음 독서 진단' },
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('@/views/LoadingView.vue'),
      meta: { title: '분석 중' },
    },
    {
      path: '/result/:type?',
      name: 'result',
      component: () => import('@/views/ResultView.vue'),
      meta: { title: '나의 퍼스널 북' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '페이지를 찾을 수 없음' },
    },
  ],
})

router.beforeEach((to) => {
  if (to.name === 'loading') {
    const hasResult = sessionStorage.getItem('personal-book-result-type')
    if (!hasResult) return { name: 'survey' }
  }
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} | 퍼스널 북` : '퍼스널 북 | Personal Book'
})

export default router
