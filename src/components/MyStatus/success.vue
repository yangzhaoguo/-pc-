<template>
  <div>
    <div id="goods" class="sf-item-list-narrow">
      <ul class="sf-pai-item-list" v-if="itemList.length>0">
        <li v-for="(item , index) in itemList" :key="index" class="pai-item">
          <div class="header-section" @click="goShopDetails(item)">
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
            <p class="price price-current">
              <span class="label">我出价</span>
              <span class="value"><em class="currency">¥</em><em
                class="pai-xmpp-current-price price-font-small">{{item.money}} 元</em></span>
            </p>
          </div>
          <div class="footer-section">
            <p class="num-auction"><em>竞拍成功</em>
            </p>
            <p class="num-apply" @click="goShopDetails(item)"><em>去支付</em></p>
          </div>
        </li>
      </ul>
      <div v-else class="none-good">
        —— 暂无商品 ——
      </div>
    </div>
    <!--<div class="page-outer" v-if="itemList.length>6">-->
    <!--<el-pagination-->
    <!--layout="prev, pager, next"-->
    <!--:page-size="pageSize"-->
    <!--:page-count="pageCount">-->
    <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import * as USER from '../../assets/js/user'
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
      getItemList () {
        const data = {
          userId: USER.GetUserID()
        }
        const url = 'paimai/front/list_bid_success'
        const ret = (r) => {
          console.log(r)
          if (r.busCode === 200) {
            this.itemList = r.data
            this.pageCount = r.data.pageCount
          } else {
            this.$alert(r.data)
          }
        }
        USER.ajax(url, 'get', data, ret)
      },
      goShopDetails (data) {
        console.log(data)
        this.$router.push({path: '/payment', query: {orderId: data.orderId}})
      }
    },
    components: {
      CountDown
    },
    props: ['typeId'],
    mounted () {
      this.getItemList()
    }
  }
</script>

<style scoped lang="less">
  .sf-item-list-narrow {
    .none-good {
      text-align: center;
      color: #999999;
    }
    margin: 20px 0 0;
    overflow: visible;
    min-height: 320px;
    .sf-pai-item-list {
      clear: none !important;
      .pai-item {
        float: left;
        margin: 0 26px 20px 0;
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
            height: 156px;
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
              font-weight: 700;
            }
            .price-font-small {
              font-size: 16px;
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
            color: limegreen;
            text-align: center;
            font-size: 12px;
            float: left;
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
