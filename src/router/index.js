import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/DatasetList/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/datasetdetails',
    name: 'Datasetdetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/DatasetDetails/DatasetDetails.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
