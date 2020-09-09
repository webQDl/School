import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sq from '../views/Sq.vue'
import Sp from '../views/Sp.vue'
import Kc from '../views/Kc.vue'
import Pd from '../views/Pd.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import SpSd from '../views/SpSd.vue'
import Zc_jx_rk from '../views/Zc_jx_rk.vue'
import Zc_jx_jh from '../views/Zc_jx_jh.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Sq',
    name: 'Sq',
    component: Sq
  },
  {
    path: '/Sp',
    name: 'Sp',
    component: Sp
  },
  {
    path: '/Kc',
    name: 'Kc',
    component: Kc
  },
  {
    path: '/Pd',
    name: 'Pd',
    component: Pd
  },
  {
    path: '/Role',
    name: 'Role',
    component: Role
  },
  {
    path: '/User',
    name: 'User',
    component: User
  },
  {
    path: '/SpSd',
    name: 'SpSd',
    component: SpSd
  },
  {
    path: '/Zc_jx_rk',
    name: 'Zc_jx_rk',
    component: Zc_jx_rk
  },
  {
    path: '/Zc_jx_jh',
    name: 'Zc_jx_jh',
    component: Zc_jx_jh
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
