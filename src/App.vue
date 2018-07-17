<template>
  <div id="app">
    <div class="header">

      <el-header>
        <el-menu
          :defaultActive="defaultActive"
          mode="horizontal"
          @select="handleSelect"
          activeTextColor="#00a0e9"
        >
          <div>
            <img class="logo" src="./logo.png" alt="">
          </div>
          <el-menu-item index="0" style="margin-left: 90px">
            <a href="javascript:;">自由市场</a>
          </el-menu-item>
          <el-menu-item index="1">
            <a href="javascript:;">品牌直销</a>
          </el-menu-item>
          <el-menu-item index="2">
            <a href="javascript:;">拍卖场</a>
          </el-menu-item>
          <el-menu-item index="3">
            <a href="javascript:;">灵铱商城</a>
          </el-menu-item>
          <el-submenu index="4" style="margin-left: 90px">
            <template slot="title"><span>更多</span></template>
            <el-menu-item index="4-1">我的竞拍</el-menu-item>
            <el-menu-item index="4-2">收货地址</el-menu-item>
            <el-menu-item index="4-3">保证金</el-menu-item>
            <el-menu-item index="4-4">我的订单</el-menu-item>
            <el-menu-item index="4-5">我的收藏</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        defaultActive: '2'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case '0':
            window.location.href = 'http://www.lingyi365.com/module/index.html'
            break
          case '1':
            window.location.href = 'http://www.lingyi365.com/module/index.html'
            break
          case '2':
            this.$router.push({path: '/'})
            break
          case '3':
            window.location.href = 'http://www.lingyi365.com/module/index.html'
            break
          case '4-1':
            this.$router.push({path: '/my'})
            break
          case '4-2':
            this.$router.push({path: '/shipping_address'})
            break
          default:
            return false
        }
      }
    },
    mounted () {
      switch (this.$route.path) {
        case '/home':
          this.defaultActive = '2'
          break
        case '/my':
          this.defaultActive = '4-1'
          break
        default:
          return false
      }
    }
  }
</script>

<style lang="less">
  @import './assets/css/reset.css';

  #app {
    .header {
      border-bottom: solid 1px #e6e6e6;
      .el-header {
        width: 990px;
        padding: 0;
        margin: 0 auto;
        border-bottom: none;
        .el-menu--horizontal {
          display: flex;
          justify-content: space-between;
          .el-menu-item {
            font-size: 18px;
            color: #666666;
          }
          .el-menu-item:hover{
            color: rgb(0, 160, 233);
          }
        }
      }
    }
    .el-button--primary, .el-button--danger {
      span {
        color: #ffffff !important;
      }
    }
  }
</style>
<style scoped lang="less">
  @import './assets/css/public.less';

  .content {
    width: 990px;
    margin: 0 auto;
  }

  .more {
    height: 60px;
    line-height: 60px;
    margin-left: 12px;
    color: #999999;
  }

  .logo {
    position: absolute;
    top: 16px;
    left: 10px;
  }
</style>
