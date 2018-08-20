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
        switch (tab.index) {
          case '0':
            this.$router.push({path: '/my/bidding'})
            break
          case '1':
            this.$router.push({path: '/my/pass'})
            break
          case '2':
            this.$router.push({path: '/my/fail'})
            break
          case '3':
            this.$router.push({path: '/my/success'})
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
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
