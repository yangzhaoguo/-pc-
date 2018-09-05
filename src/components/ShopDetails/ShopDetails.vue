<template>
  <div id="shop_details">
    <el-row class="header-section">
      <el-col :span="24">
        <el-col :span="12">
          <div class="banner">
            <el-carousel height="250px" v-if="detailData.showWay===1">
              <el-carousel-item v-for="item in detailData.showUrls" :key="item">
                <a :href="item" target="view_window"><img style="width: 100%;height: 250px" :src="item" alt=""></a>
              </el-carousel-item>
            </el-carousel>
            <div v-if="detailData.showWay===2" style="text-align: center">
              <video controls style="height: 250px;margin: auto;" :src="detailData.showUrls[0]">
              </video>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="banner-right">
            <div class="pro_box_top_rzi">
              <h3>{{detailData.productName}}</h3>
            </div>
            <div class="pro_box_top_rjs">
              <table border="0" cellpadding="0" cellspacing="0" width="350">
                <tbody>
                <!--<tr>-->
                <!--<td class="title" valign="top" width="127">-->
                <!--<p>商品编码</p>-->
                <!--</td>-->
                <!--<td class="text">-->
                <!--<p>{{detailData.productId}}</p>-->
                <!--</td>-->
                <!--</tr>-->
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>当前价:</p>
                  </td>
                  <td class="text" style="color: darkred;">
                    <p>{{detailData.topPrice}}元</p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>出价次数:</p>
                  </td>
                  <td class="text">
                    <p>{{detailData.goPriceNums}}次</p>
                  </td>
                </tr>
                <tr>
                  <td class="title" valign="top" width="127">
                    <p>剩余时间:</p>
                  </td>
                  <td class="text">
                    <p v-if="detailData.endSaleDatetime">
                      <count-down :endTime="detailData.endSaleDatetime"></count-down>
                    </p>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <el-row style="margin-top: 58px;padding-left: 45px">
            <el-button type="primary" size="small"><i class="el-icon-edit"> </i> 聊天</el-button>
            <el-button type="primary" @click="addCollection" size="small"><i class="el-icon-star-off"></i> 收藏
            </el-button>
            <el-button type="warning" @click="commentVisi=true" size="small">&nbsp;&nbsp;评论&nbsp;&nbsp;</el-button>
            <el-button type="danger" @click="openActionDid" size="small">出价竞拍</el-button>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品介绍" name="0" v-html="detailData.description"></el-tab-pane>
      <el-tab-pane label="出价记录" name="1">
        <jing-pai-chu-jia-list :list="priceList"></jing-pai-chu-jia-list>
      </el-tab-pane>
      <el-tab-pane label="商品评论" name="2">
        <!--<div>评论({{commentCount}})</div>-->
        <ping-lun-list :list="commentList"></ping-lun-list>
      </el-tab-pane>
    </el-tabs>
    <!--提交评论组件-->
    <ping-lun :commentVisi.sync="commentVisi" @postMessage="postComment"></ping-lun>
    <!--竞拍出价组件-->
    <jing-pai-chu-jia
      :AuctionDidVisi.sync="AuctionDidVisi"
      :priceOfStart="detailData.priceOfStart"
      :topPrice="detailData.topPrice"
      :incrementAmount="detailData.incrementAmount"
      @postPrice="postPrice">
    </jing-pai-chu-jia>
    <ScrollSole @sole="soleDown"></ScrollSole>
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
        detailData: {}          //单品详情
      }
    },
    methods: {
      handleClick (tab, event) {
//        console.log(tab, event)
      },
      init () {
        this.getDetailProduct()
        setTimeout(() => {
          this.getPriceList()
        }, 500)
        setTimeout(() => {
          this.getCommentList()
        }, 1000)
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
      getPriceList () {
        const data = {
          productId: this.$route.query.productId,
          pageNo: this.priceListPageNo,
          pageSize: 15
        }
        const url = 'paimai/front/list_go_price'
        const ret = r => {
          console.log('出价列表----------------')
          console.log(r)
          if (r.busCode === 200) {
            this.priceListCount = r.data.pageCount
            this.priceListPageNo++
            this.priceList.push.apply(this.priceList, r.data.list)
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'get', data, ret, 30000, false)
      },
      getCommentList () {
        if (this.commentPageNo > this.commentCount) {
          this.$message('没有更多了')
          return
        }
        const data = {
          pageNo: this.commentPageNo,
          pageSize: 10,
          ProductId: this.$route.query.productId
        }
        console.log(data)
        const url = 'paimai/front/list_product_comment'
        const ret = r => {
          console.log(`评价列表---------------`)
          console.log(r)
          if (r.busCode === 200) {
            this.commentCount = r.data.pageCount
            this.commentPageNo++
            this.commentList.push.apply(this.commentList, r.data.list)
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'get', data, ret, 30000, false)
      },
      postComment (text) {
        console.log(text)
        const data = {
          'addUserId': GetUserID(),
          'commentContent': text,
          'productId': this.$route.query.productId
        }
        console.log(data)
        const url = 'paimai/front/add_product_comment'
        const ret = r => {
          console.log(r)
          if (r.busCode === 200) {
            this.commentList = []
            this.commentPageNo = 1
            this.commentCount = 10
            this.commentVisi = false
            this.getCommentList()
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'post', data, ret)
      },
      postPrice (num) {
        console.log(num)
        const data = {
          'userId': GetUserID(),
          'price': num,
          'productId': this.$route.query.productId
        }
        console.log(data)
        const url = 'paimai/front/add_go_price'
        const ret = r => {
          if (r.busCode === 200) {
            this.$alert(r.data, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'post', data, ret)
      },
      soleDown () {
        if (this.activeName === '2') {
          this.getCommentList()
        }
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
      JingPaiChuJiaList
    },
    created () {
      this.init()
    }
  }
</script>
<style lang="less">
  #shop_details {
    width: 900px;
    margin: 0 auto;
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
      .banner {
        padding: 30px;
      }
      .banner-right {
        padding-left: 45px;
        .pro_box_top_rzi {
          padding-top: 38px;
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
            border: solid windowtext 0.0pt;
            mso-border-alt: solid windowtext .5pt;
            padding: 0cm 5.4pt 2pt 5.4pt;
          }
          .text {
            width: 225.0pt;
            border: solid windowtext 0.0pt;
            border-left: none;
            mso-border-left-alt: solid windowtext .5pt;
            mso-border-alt: solid windowtext .5pt;
            padding: 0cm 5.4pt 2pt 5.4pt;
          }
        }
      }
    }
  }
</style>
