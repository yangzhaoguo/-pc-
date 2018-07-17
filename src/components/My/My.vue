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
        {{index}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as USER from '../../assets/js/user'

  export default {
    data () {
      return {
        activeName: '0',
        typeList: [
          {typeName: '竞拍中'},
          {typeName: '出价被超越'},
          {typeName: '竞拍失败'},
          {typeName: '竞拍成功'}
        ]
      }
    },
    methods: {
      handleClick (tab) {
        if (tab.index > 0) {
//          this.$refs.tabRef[tab.index - 1].getItemList()
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
    components: {},
    mounted () {
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
