import Vue from 'vue'
import VueRouter from 'vue-router'

import DatasetList from '../modules/DatasetList'

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
      import(/* webpackChunkName: "dataset" */ '../modules/Dataset'),
  },
  {
    path: '/styles',
    name: 'Styles',
    component: () =>
      import(
        /* webpackChunkName: "style-overview" */ '../modules/StyleOverview'
      ),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../modules/NotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
