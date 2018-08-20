<template>
  <div id="">
    <el-dialog
      title="竞拍出价"
      :visible.sync="visible"
      @close="$emit('update:AuctionDidVisi', false)"
      width="500px">
      <el-row>
        <el-col :span="5">
          <div>
            商品标价：
          </div>
        </el-col>
        <el-col :span="18">
          <div class="text-red">
            {{priceOfStart}}元
          </div>
        </el-col>
      </el-row>
      <div style="height: 22px"></div>
      <el-row>
        <el-col :span="5">
          <div>
            当前价：
          </div>
        </el-col>
        <el-col :span="18">
          <div class="text-red">
            {{topPrice}}元
          </div>
        </el-col>
      </el-row>
      <div style="height: 22px"></div>
      <el-row>
        <el-col :span="5">
          <div>
            出价金额:
          </div>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="12">
              <el-select v-model="price"
                         size="mini"
                         placeholder="请选择">
                <el-option
                  v-for="item in incrementAmount"
                  :key="item"
                  :label="item+topPrice"
                  :value="item+topPrice">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" style="margin-left: 12px">元</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="height: 62px"></div>
      <div>
        <el-button @click="postPrice" style="margin: 0 auto;display: block" type="primary">提交竞价</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        visible: this.AuctionDidVisi,
        price: ''
      }
    },
    methods: {
      inputBlur () {
        if (isNaN(this.price)) {
          this.$message.error('请输入数字')
          this.price = '0.00'
        }
      },
      postPrice () {
        if (this.price < this.topPrice) {
          this.$message('请选择出价')
        } else {
          this.$emit('postPrice', this.price)
        }
      }
    },
    props: ['AuctionDidVisi', 'topPrice', 'priceOfStart', 'incrementAmount'],
    watch: {
      AuctionDidVisi () {
        this.visible = this.AuctionDidVisi
      }
    }
  }
</script>

<style scoped>
</style>
