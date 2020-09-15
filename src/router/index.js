import Vue from 'vue'
import VueRouter from 'vue-router'
import DatasetList from '../modules/DatasetList/index.vue'
import StyleOverview from '../components/StyleOverview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DatasetList',
    component: DatasetList,
  },
  {
    path: '/dataset/:id',
    name: 'Datasett',
    component: () =>
      import(/* webpackChunkName: "dataset" */ '../modules/Dataset/index.vue'),
  },
  {
    path: '/styles',
    name: 'Styles',
    component: StyleOverview,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
