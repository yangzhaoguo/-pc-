<template>
  <div id="home">
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane v-for="(item , index) in typeList"
                   active="false"
                   :name="item.typeId"
                   :label="item.typeName"
                   :key="index">
      </el-tab-pane>
      <router-view/>
    </el-tabs>
  </div>
</template>

<script>
  import * as USER from '../../assets/js/user'
  import Goods from './goods.vue'

  export default {
    data () {
      return {
        activeName: '0',
        typeList: [
          {typeName: '待支付', status: 1},
          {typeName: '待发货', status: 2},
          {typeName: '待收货', status: 3},
          {typeName: '待评价', status: 4},
          {typeName: '已评价', status: 5}
        ]
      }
    },
    methods: {
      handleClick (tab) {
        switch (tab.index) {
          case '0':
            this.$router.push({path: '/my_indext/daizhifu'})
            break
          case '1':
            this.$router.push({path: '/my_indext/daifahuo'})
            break
          case '2':
            this.$router.push({path: '/my_indext/daishouhuo'})
            break
          case '3':
            this.$router.push({path: '/my_indext/daipingjia'})
            break
          case '4':
            this.$router.push({path: '/my_indext/yipingjia'})
            break
          default:
            return false
        }
      },
      getTypeList () {
        const url = 'paimai/front/list_product_type'
        const ret = (r) => {
          if (r.busCode === 200) {
            this.typeList = r.data
            this.$refs.allGood.getItemList()
          } else {
            this.$alert(r)
          }
        }
        USER.ajax(url, 'get', {}, ret)
      }
    },
    components: {
      Goods
    },
    created () {
      switch (this.$route.path) {
        case '/my/bidding':
          this.activeName = '0'
          break
        case '/my/pass':
          this.activeName = '1'
          break
        case '/my/fail':
          this.activeName = '2'
          break
        case '/my/success':
          this.activeName = '3'
          break
        default:
          return false
      }
    },
    mounted () {
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
