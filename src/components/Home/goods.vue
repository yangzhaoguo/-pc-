<template>
  <div style="position: relative">
    <div id="goods" class="sf-item-list-narrow">
      <ul class="sf-pai-item-list" v-if="itemList.length>0">
        <li v-for="(item , index) in itemList" :key="index" class="pai-item" @click="goShopDetails(item)">
          <div class="header-section">
            <img v-if="item.showWay==1" class="pic"
                 :src="item.showUrl"
                 :alt="item.productName">
            <video v-if="item.showWay==2" class="vid"
                   :src="item.showUrl"
                   :alt="item.productName">
            </video>
            <p class="title">{{item.productName}}</p>
          </div>
          <div class="info-section">
            <p class="price price-current">
              <span class="label">当前价</span>
              <span class="value"><em class="currency">¥</em><em
                class="pai-xmpp-current-price price-font-small">{{item.topPrice}} 元</em></span>
              <span class="bid-tips ">（<em class="pai-xmpp-bid-count">{{item.goPriceNums}}</em>次出价）</span>
            </p>
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
      <div v-else class="none-good" ref="err_goods">
        —— 暂无商品 ——
      </div>
    </div>
    <div class="page-outer">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page.sync=page
        @current-change="handleCurrentChange"
        :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as USER from '../../assets/js/user'
  import CountDown from '../../common/countDown/countDown.vue'

  export default {
    data () {
      return {
        itemList: [],
        baseUrl: USER.baseUrl,
        page: 1,
        pageCount: 0,
        pageSize: 6
      }
    },
    methods: {
      getItemList () {
        const data = {
          typeId: this.typeId || null,
          pageSize: this.pageSize,
          pageNo: this.page
        }
        console.log(data)
        const url = 'paimai/front/list_products'
        const ret = (r) => {
          console.log(r)
          if (r.busCode === 200) {
            this.itemList = []
            setTimeout(() => {
              this.itemList = r.data.list
              this.pageCount = r.data.pageCount
            }, 100)
          } else {
            this.$alert(r.data)
            console.log(this.$reg)
          }
        }
        USER.ajax(url, 'get', data, ret, 30000, false)
      },
      goShopDetails (data) {
        this.$router.push({path: '/shop_details', query: {productId: data.productId}})
      },
      handleCurrentChange () {
        this.getItemList()
      }
    },
    components: {
      CountDown
    },
    props: ['typeId'],
    created () {
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
    overflow: hidden;
    min-height: 320px;
    .sf-pai-item-list {
      clear: none !important;
      .pai-item {
        float: left;
        margin: 0 12px 20px 12px;
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
