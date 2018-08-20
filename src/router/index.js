import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import My from '@/components/MyStatus/MyStatus'
import ShippingAddress from '@/components/ShippingAddress/ShippingAddress'
import ShopDetails from '@/components/ShopDetails/ShopDetails'
import MyIndent from '@/components/MyIndent/MyIndent'
import CashDeposit from '@/components/CashDeposit/CashDeposit'
import Collection from '@/components/Collection/Collection'
import Bidding from '@/components/MyStatus/bidding'
import Fali from '@/components/MyStatus/fail'
import Pass from '@/components/MyStatus/pass'
import Success from '@/components/MyStatus/success'
import Payment from '@/components/Payment/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/my/:type',
      component: My,
      children: [
        {
          path: '/my/bidding',
          component: Bidding
        },
        {
          path: '/my/fail',
          component: Fali
        },
        {
          path: '/my/pass',
          component: Pass
        },
        {
          path: '/my/success',
          component: Success
        }
      ]
    },
    {
      path: '/shipping_address',
      component: ShippingAddress
    },
    {
      path: '/shop_details',
      component: ShopDetails
    },
    {
      path: '/my_indext',
      component: MyIndent
    },
    {
      path: '/cash_deposit',
      component: CashDeposit
    },
    {
      path: '/collection',
      component: Collection
    },
    {
      path: '/payment',
      component: Payment
    }
  ]
})
