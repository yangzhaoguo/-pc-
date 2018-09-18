<template>
  <div style="position: relative">
    <div class="title">我的收藏</div>
    <div id="goods" class="sf-item-list-narrow">
      <ul class="sf-pai-item-list" v-if="itemList.length>0">
        <li v-for="(item , index) in itemList" :key="index" class="pai-item" @click="goShopDetails(item)">
          <div class="header-section">
            <img v-if="item.showWay==1" class="pic"
                 :src="item.showUrls[0]"
                 :alt="item.productName">
            <video v-if="item.showWay==2" class="pic"
                   :src="item.showUrls[0]"
                   :alt="item.productName">
            </video>
            <p class="title">{{item.productName}}</p>
          </div>
          <div class="info-section">
            <div class="price price-current flex justify-between">
              <div>
                <span class="label">当前价</span>
                <span class="value"><em class="currency">¥</em><em
                  class="pai-xmpp-current-price price-font-small">{{item.money}}元</em></span>
              </div>
              <!--status//３竞拍中４已拍出５已下架７已删除8竞拍失败-->
              <span style="color: limegreen;" v-if="item.status===3" class="bid-tips"><em
                class="pai-xmpp-bid-count">竞拍中</em></span>
              <span style="color: limegreen;" v-if="item.status===4" class="bid-tips"><em
                class="pai-xmpp-bid-count">已拍出</em></span>
              <span style="color: gray;" v-if="item.status===5" class="bid-tips"><em class="pai-xmpp-bid-count">已下架</em></span>
              <span style="color: gray;" v-if="item.status===7" class="bid-tips"><em class="pai-xmpp-bid-count">已删除</em></span>
              <span style="color: red;" v-if="item.status===8" class="bid-tips"><em class="pai-xmpp-bid-count">竞拍失败</em></span>
            </div>
          </div>
          <div class="footer-section">
            <p class="num-auction"><em class="pai-xmpp-viewer-count">剩余时间：</em>
              <count-down :endTime="item.endSaleDatetime"></count-down>
            </p>
            <p class="num-apply" v-if="item.transferWay ===1"><em>快递</em></p>
            <p class="num-apply" v-if="item.transferWay ===2"><em>自提</em></p>
            <p class="num-apply" v-if="item.transferWay ===3"><em>送货上门</em></p>
          </div>
        </li>
      </ul>
      <div v-else class="none-good">
        —— 暂无收藏商品 ——
      </div>
    </div>
    <!--<div class="page-outer">-->
    <!--<el-pagination-->
    <!--layout="prev, pager, next"-->
    <!--:page-size="pageSize"-->
    <!--:current-page.sync=page-->
    <!--@current-change="handleCurrentChange"-->
    <!--:page-count="pageCount">-->
    <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { ajax } from '../../assets/js/user'
  import CountDown from '../../common/countDown/countDown.vue'

  export default {
    data () {
      return {
        itemList: [],
        page: 1,
        pageCount: 0,
        pageSize: 6
      }
    },
    methods: {
      getList () {
        const data = {
          userId: this.lycore.getUserId()
        }
        const url = 'paimai/front/list_my_collection'
        const ret = r => {
          console.log(r)
          if (r.busCode === 200) {
            this.itemList = r.data
            this.pageCount = r.data.pageCount
          } else {
            this.$alert(r.data)
          }
        }
        ajax(url, 'get', data, ret, 30000, false)
      },
      goShopDetails (data) {
        console.log(data)
        this.$router.push({path: '/shop_details', query: {productId: data.productId}})
      },
      handleCurrentChange () {
        this.getList()
      }
    },
    components: {
      CountDown
    },
    mounted () {
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  .title {
    font-size: 22px;
    margin-top: 14px;
  }

  .sf-item-list-narrow {
    .none-good {
      text-align: center;
      color: #999999;
    }
    margin: 20px auto;
    overflow: hidden;
    min-height: 320px;
    .sf-pai-item-list {
      clear: none !important;
      .pai-item {
        float: left;
        margin: 0 23px 20px 0;
        border: 1px solid #eaeaea;
        display: block;
        position: relative;
        width: 278px;
        height: 272px;
        .header-section {
          display: block;
          text-align: center;
          overflow: hidden;
          position: relative;
          width: 278px;
          height: 185px;
          line-height: 180px;
          .pic {
            width: 100%;
            height: 150px;
          }
          .title {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            background-color: #fff;
            background: rgba(255, 255, 255, .9);
            filter: alpha(opacity=90);
            color: #000;
            font-size: 14px;
            position: absolute;
            padding: 0 13px;
            left: 0;
            bottom: 0;
            height: 24px;
            line-height: 24px;
            width: 252px;
            text-align: left;
          }
        }
        .info-section {
          color: #999;
          display: block;
          font-size: 12px;
          padding-left: 13px;
          height: 42px;
          .price {
            padding-top: 10px;
            height: 30px;
            line-height: 30px;
            .value {
              color: #d91615;
              padding-left: 10px;
              font-weight: 700;
            }
            .price-font-small {
              font-size: 16px;
            }
            .bid-tips {
              padding-right: 22px;
            }
          }
        }
        .footer-section {
          zoom: 1;
          clear: none !important;
          border-top: 1px solid #eee;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 278px;
          height: 36px;
          line-height: 36px;
          .num-auction {
            border-right: 1px solid #eee;
            font-size: 12px;
            color: #999;
            float: left;
            padding-left: 12px;
            width: 186px;
          }
          .num-apply {
            font-size: 14px;
            color: #999;
            float: left;
            width: 78px;
            text-align: center;
          }
        }
      }
    }
  }

  .page-outer {
    text-align: center;
  }
</style>
