<template>
  <div id="cashDeposit">
    <div class="top">
      <el-row>
        <el-col :span="12">
          <div>
            <span>保证金金额： ￥{{self_vip_data.mongy ? self_vip_data.mongy : '0.00'}}</span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <div>
            <span>当前等级： {{self_vip_data.grade ? self_vip_data.grade : '0'}}级</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="title">
        <el-row class="vip-list">
          <el-col :span="6">
            <div>
              <span>等级</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <span>保证金</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <span>竞拍额度</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <span>可投竞标数</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row v-for="(item,index) in vip_list" :key="index" class="vip-list">
        <el-col :span="6">
          <div>
            <el-radio v-model="vip_type" :label="item._id" :disable="self_vip_data.grade>item.grade">
              {{item.grade}}
            </el-radio>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <span>￥{{item.placeMoney}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <span>￥{{item.holdinMoney}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <span>{{item.targetNum}}个</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="line-height: 60px">
      <el-row>
        <el-col :span="12">
          <div>
            <span>所需保证金： ￥{{money}} 元</span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <div>
            <span class='text-red'>v5等级说明</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="button">
      <el-button type="primary" @click.native="setVipType">确认升级</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ajax, GetUserID, Payment } from '../../assets/js/user'

  export default {
    data () {
      return {
        vip_type: '',
        vip_list: [],
        self_vip_data: {},
        money: 0
      }
    },
    methods: {
      getList () {
        const url = 'paimai/front/list_gurantee_money'
        const ret = (r) => {
          console.log(r)
          if (r.busCode === 200) {
            this.vip_list = r.data
          } else {
            this.$message.error(r.data)
          }
        }
        ajax(url, 'get', {}, ret)
      },
      get_self_vip_data () {
        const data = {
          userId: GetUserID
        }
        const url = 'paimai/front/get_user_gurantee_rule'
        const ret = (r) => {
          if (r.busCode === 200) {
            if (r.busCode !== 420) {
              this.self_vip_data = r.data
            }
          } else {
            this.$message.error(r.data)
          }
          ajax(url, 'get', data, ret)
        }
      },
      setVipType () {
        if (this.vip_type === '') {
          this.$message.error('请选择vip等级')
          return false
        }
        const data = {
          guranteeId: this.vip_type,
          userId: GetUserID()
        }
        console.log(data)
        const url = 'paimai/front/pre_pay'
        const ret = r => {
          console.log(r)
          Payment(r)
        }
        ajax(url, 'post', data, ret)
      }
    },
    created () {
      this.getList()
      this.get_self_vip_data()
    },
    watch: {
      vip_type () {
        this.vip_list.find((item) => {
          if (item.typeId === this.vip_type) {
            this.money = item.holdinMoney
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .top {
    padding: 30px 0 30px 0;
  }

  .content {
    text-align: center;
    border: 1px solid #f1f1f1;
    .title span {
      color: #5a6288;
      font-weight: 500;
    }
    .vip-list {
      border-bottom: 1px solid #f1f1f1;
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .vip-list:last-child {
      border-bottom: none;
    }
  }

  .button {
    margin-top: 60px;
    button {
      display: block;
      width: 140px;
      margin: 0 auto;
    }
  }
</style>
