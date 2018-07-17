<template>
  <div id="Address">
    <el-dialog
      title="新增地址"
      :visible.sync="AddressVisible"
      width="508px">
      <el-form label-width="80px">
        <el-form-item label="收货人:">
          <el-input v-model="addressData.fullName"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="addressData.telephone"></el-input>
        </el-form-item>
      </el-form>
      <vue-address
        :province="province"
        :city="city"
        :detail="detail"
        :district="district"
        @change="handlerChange"
      ></vue-address>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(false)">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClose(true)">保 存</el-button>
      </span>
      <el-form label-width="140px" style="margin-top: 6px">
        <el-form-item label="是否设为默认地址：">
          <el-switch v-model="addressData.defaultFlag"></el-switch>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable vue/require-valid-default-prop */

  import vueAddress from './selectRess.vue'
  import * as USER from '../../assets/js/user.js'

  export default {
    data () {
      return {
        province: '',
        city: '',
        district: '',
        detail: '',
        AddressVisible: false,
        addressData: {
          'detailAddress': '',
          'region': '',
          'defaultFlag': false,
          'fullName': '',
          'telephone': ''
        }
      }
    },
    components: {
      vueAddress
    },
    props: {},
    methods: {
      handlerChange: function (val) {
        this.addressData.detailAddress = val.detail
        this.addressData.region = val.province + val.district
      },
      dialogVisibleClose (b) {
        if (!b) {
          this.AddressVisible = false
          return false
        }
        const data = {
          'defaultFlag': this.addressData.defaultFlag ? 1 : 0,
          'detailAddress': this.addressData.detailAddress,
          'fullName': this.addressData.fullName,
          'region': this.addressData.region,
          'telephone': this.addressData.telephone,
          'userId': USER.GetUserID()
        }
        for (let key in data) {
          if (data[key] === '') {
            this.$message.error('请完整填写地址信息')
            return false
          }
        }
        const url = 'paimai/front/add_new_address'
        const ret = (r) => {
          console.log(r)
        }
        console.log(data)
        USER.ajax(url, 'POST', data, ret)
      }
    },
    mounted () {}
  }
</script>

<style>
  .el-form-item__label {
    text-align: left !important;
  }
</style>
