<template>
  <div id="shop_details">
    <el-row class="header-section">
      <el-col :span="24">
        <el-col :span="12">
          <div class="banner">
            <el-carousel height="250px">
              <el-carousel-item v-for="item in detailData.showUrls" :key="item">
                <img style="width: 100%;height: 250px" :src="item" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="banner-right">
            <div class="pro_box_top_rjs">
              <table border="1" cellpadding="0" cellspacing="0" width="350">
                <tbody>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>订单号</p>
                  </td>
                  <td class="text">
                    <p>{{detailData.productId}}</p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>商品名称</p>
                  </td>
                  <td class="text">
                    <p>{{detailData.productName}}</p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>成交价格</p>
                  </td>
                  <td class="text" style="color: darkred;">
                    <p>{{detailData.topPrice}}元</p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>运费</p>
                  </td>
                  <td class="text">
                    <p>{{detailData.goPriceNums}}次</p>
                  </td>
                </tr>
                <!--<tr>-->
                <!--<td class="title" valign="top" width="127">-->
                <!--<p>实际金额</p>-->
                <!--</td>-->
                <!--<td class="text">-->
                <!--<p>-->
                <!--123-->
                <!--</p>-->
                <!--</td>-->
                <!--</tr>-->
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>下单账号</p>
                  </td>
                  <td class="text">
                    <p>
                      123
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>下单时间</p>
                  </td>
                  <td class="text">
                    <p>
                      123
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>商品来源</p>
                  </td>
                  <td class="text">
                    <p>
                      123
                    </p>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <div class="select-address">
      <select-address :showHeader=false></select-address>
    </div>
    <div class="foot flex">
      <div>
        实付款：￥<span class="text">{{detailData.topPrice + detailData.goPriceNums}}</span>
      </div>
      <el-button type="primary">提交订单</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ajax, GetUserID } from '../../assets/js/user'
  import PingLun from '../../common/pinglun/pinglun.vue'
  import PingLunList from '../../common/pinglun/list.vue'
  import JingPaiChuJia from '../../common/jingpai/jingpai.vue'
  import JingPaiChuJiaList from '../../common/jingpai/jingPaiList.vue'
  import ScrollSole from '../../common/scroll/scrollSole.vue'
  import CountDown from '../../common/countDown/countDown.vue'
  import selectAddress from '../../common/Address/selectAddress.vue'

  export default {
    data () {
      return {
        activeName: '0',        //tab默认选中
        commentVisi: false,     //评论dialog
        commentList: [],        //评论列表
        commentPageNo: 1,        //评论当前页码
        commentCount: 10,        //评论总数
        AuctionDidVisi: false,  //出价dialog
        AuctionDidPrice: 0,     //拍卖价格
        priceListPageNo: 1,     //出价当前页码
        priceListCount: 10,     //出价当前页码
        priceList: [],          //出价列表
        detailData: {
          description: '方法',
          endSaleDatetime: 1535439983496,
          goPriceNums: 3,
          incrementAmount: [232],
          priceOfStart: 11,
          productId: '5b5ab5c51fd5ba0001548f51',
          productName: '上海之珠',
          showUrls: ['http://ope.lingyi365.com:5608/fs/group1/M00/7B/08/o4YBAFtatcGAcCUbAAJmkzxCpqg069.jpg'],
          showWay: 1,
          topPrice: 310,
          transferWay: 1
        }          //单品详情
      }
    },
    methods: {
      handleClick (tab, event) {
//        console.log(tab, event)
      },
      getDetailProduct () {
        const url = 'paimai/front/detail_product'
        const ret = r => {
          console.log('单品详情----------------')
          console.log(r)
          if (r.busCode === 200) {
            this.detailData = r.data
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'get', {productId: this.$route.query.productId}, ret, 30000, false)
      },
      openActionDid () {
        this.AuctionDidVisi = true
      },
      addCollection () {
        const data = {
          productId: this.$route.query.productId,
          userId: GetUserID()
        }
        const url = 'paimai/front/add_my_collection'
        const ret = r => {
          this.$message.success(r.data)
        }
        ajax(url, 'post', data, ret)
      }
    },
    components: {
      PingLun,
      PingLunList,
      JingPaiChuJia,
      ScrollSole,
      CountDown,
      JingPaiChuJiaList,
      selectAddress
    },
    created () {
//      this.init()
    }
  }
</script>
<style lang="less">
  #shop_details {
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 250px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
</style>
<style scoped lang="less">
  #shop_details {
    .header-section {
      border-bottom: 1px solid #eeeeee;
      .banner {
        padding: 30px;
      }
      .banner-right {
        margin-top: 30px;
        padding-left: 45px;
        .pro_box_top_rzi {
          padding-top: 12px;
          line-height: 26px;
          font-size: 18px;
          color: #AF0C00;
          padding-bottom: 10px;
        }
        table {
          line-height: 32px;
          font-size: 14px;
          .title {
            width: 95.4pt;
            border: solid windowtext 1.0pt;
            mso-border-alt: solid windowtext .5pt;
            padding: 0cm 5.4pt 2pt 5.4pt;
          }
          .text {
            width: 225.0pt;
            border: solid windowtext 1.0pt;
            border-left: none;
            mso-border-left-alt: solid windowtext .5pt;
            mso-border-alt: solid windowtext .5pt;
            padding: 0cm 5.4pt 2pt 5.4pt;
          }
        }
      }
    }
    .foot {
      justify-content: flex-end;
      padding-right: 12px;
      margin-top: 30px;
      .text {
        font-size: 22px;
        color: red;
        margin-right: 12px;
      }
    }
  }
</style>
