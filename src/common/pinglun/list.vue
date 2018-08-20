<template>
  <div id="list">
    <ul v-if="list.length>0">
      <li class="item" v-for="(item,index) in list" :key="index">
        <div class="itme-header flex">
          <div class="itme-header-img">
            <img :src="item.userImage" alt="">
          </div>
          <div class="name">
            {{item.nickName}}
          </div>
        </div>
        <div class="contentText">{{item.commentContent}}</div>
      </li>
    </ul>
    <div v-else style="text-align: center;line-height: 60px;color: #999999;">
      暂无评论
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: ['list'],
    methods: {},
    mounted () {}
  }
</script>

<style scoped lang="less">
  #list {
    .item {
      padding: 12px;
      border-bottom: 1px solid #f1f1f1;
      .itme-header {
        .itme-header-img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          overflow: hidden;
          .itme-header-img img {
            width: 100%;
            height: auto;
          }
        }
        .name {
          line-height: 40px;
          margin-left: 12px;
        }
      }
      .contentText {
        padding: 12px;
      }
    }
  }
</style>
