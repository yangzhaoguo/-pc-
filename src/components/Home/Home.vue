<template>
  <div id="home">
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="全部" name="0" active="false">
        <goods ref="allGood"></goods>
      </el-tab-pane>
      <el-tab-pane v-for="(item , index) in typeList"
                   active="false"
                   :name="item.typeId"
                   :label="item.typeName"
                   :key="index">
        <goods ref="tabRef" :typeId="item.typeId"></goods>
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
        typeList: []
      }
    },
    methods: {
      handleClick (tab) {},
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
    }
  }
</script>
<style scoped lang="less">
  #home {
    margin-top: 12px;
  }
</style>
