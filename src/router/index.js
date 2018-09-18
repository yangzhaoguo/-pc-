import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import HomeGoods from '@/components/Home/goods'
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
import PaymentSuccess from '@/components/Payment/success'
import Order from '@/components/Payment/order'
import IndentDaiZhiFu from '@/components/MyIndent/daizhifu'
import IndentDaiFaHuo from '@/components/MyIndent/daifahuo'
import IndentDaiShouHuo from '@/components/MyIndent/daishouhuo'
import IndentDaiPingJia from '@/components/MyIndent/daipingjia'
import IndentYipingJia from '@/components/MyIndent/yipingjia'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home/0'
    },
    {
      path: '/home/:id',
      component: Home,
      children: [
        {
          path: '',
          component: HomeGoods
        }
      ]
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
      component: MyIndent,
      children: [
        {
          path: '/my_indext/daizhifu',
          component: IndentDaiZhiFu
        },
        {
          path: '/my_indext/daifahuo',
          component: IndentDaiFaHuo
        },
        {
          path: '/my_indext/daishouhuo',
          component: IndentDaiShouHuo
        },
        {
          path: '/my_indext/daipingjia',
          component: IndentDaiPingJia
        },
        {
          path: '/my_indext/yipingjia',
          component: IndentYipingJia
        }
      ]
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
      path: '/payment_success',
      component: PaymentSuccess
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/payment',
      component: Payment
    }
  ]
})
