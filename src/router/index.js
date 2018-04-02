import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/components/Init'
import Game from '@/components/Game/Game'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production' ? '/shutTheCube/' : '/',
  routes: [
    {
      path: '*',
      redirect: '/init'
    },
    {
      path: '/init',
      name: 'Init',
      component: Init
    },
    {
      path: '/game/:level?',
      name: 'Game',
      component: Game,
      props: true
    },
  ]
})
