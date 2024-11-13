import { createRouter, createWebHistory } from 'vue-router';
import Activities from '~/pages/activities/index.vue';
import ActivityDetail from '@/pages/activities/_id.vue';

const routes = [
  {
    path: '/activities',
    name: 'activities',
    component: Activities,
  },
  {
    path: '/activities/:id',
    name: 'activity-detail',
    component: ActivityDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
