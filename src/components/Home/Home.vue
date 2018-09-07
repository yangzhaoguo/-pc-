<template>
  <div id="home">
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="全部" name="0" active="false">
      </el-tab-pane>
      <el-tab-pane v-for="(item , index) in typeList"
                   active="false"
                   :name="item.typeId"
                   :label="item.typeName"
                   :key="index">
      </el-tab-pane>
    </el-tabs>
    <div class="el-tabs--border-card" style="margin-top: -32px">
      <div class="el-tabs__content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import * as USER from '../../assets/js/user'
  import Goods from './goods.vue'

  export default {
    data () {
      return {
        activeName: this.$route.params.id,
        typeList: []
      }
    },
    methods: {
      handleClick (tab) {
        this.$router.push({path: `/home/${tab.name}`})
      },
      getTypeList () {
        const url = 'paimai/front/list_product_type'
        const ret = (r) => {
          if (r.busCode === 200) {
            this.typeList = r.data
          } else {
            this.$alert(r.data)
          }
        }
        USER.ajax(url, 'get', {}, ret)
      }
    },
    components: {
      Goods
    },
    mounted () {
      this.getTypeList()
    },
    created () {
      localStorage.setItem('url', location.href)
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
