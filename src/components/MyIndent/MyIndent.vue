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
        <Goods></Goods>
      </el-tab-pane>
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
          {typeName: '已评价', status: 5},
          {typeName: '退款', status: 6}
        ]
      }
    },
    methods: {
      handleClick (tab) {
        this.$refs.tabRef[tab.index - 1].getItemList()
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
    mounted () {
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
