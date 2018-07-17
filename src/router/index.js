import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import My from '@/components/My/My'
import ShippingAddress from '@/components/ShippingAddress/ShippingAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/shipping_address',
      component: ShippingAddress
    }
  ]
})
