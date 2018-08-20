<template>
  <div id="list">
    <ul v-if="list.length>0">
      <li class="item flex" v-for="(item,index) in list" :key="index">
        <div>{{item.nickName}}:</div>
        <div>{{item.datetimeStr}}</div>
        <div>{{item.price}}元</div>
      </li>
    </ul>
    <div v-else style="text-align: center;line-height: 60px;color: #999999;">
      暂无出价
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    methods: {},
    props: ['list']
  }
</script>

<style scoped lang="less">
  #list {
    .item {
      border-bottom: 1px solid #f1f1f1;
      div {
        margin-left: 20px;
        padding: 6px 0 12px 0;
      }
      div:first-child {
        margin-left: 0;
      }
    }
  }
</style>
