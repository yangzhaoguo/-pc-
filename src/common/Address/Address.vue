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
      <div v-if="AddressVisible">
        <vue-address
          :province.sync="provinces[0]"
          :city.sync="provinces[1]"
          :district.sync="provinces[2]"
          :detail.sync="addressData.detailAddress"
          @change="handlerChange"
        ></vue-address>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(false)">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClose(true)">保 存</el-button>
      </span>
      <el-form label-width="140px" style="margin-top: 6px">
        <el-form-item label="是否设为默认地址：">
          <el-switch :active-value=1 :inactive-value=0 v-model="addressData.defaultFlag"></el-switch>
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
        AddressVisible: false
      }
    },
    components: {
      vueAddress
    },
    computed: {
      provinces () {
        return this.addressData.region.split(' ')
      }
    },
    props: ['addressData'],
    methods: {
      handlerChange: function (val) {
        this.provinces[0] = val.province
        this.provinces[1] = val.city
        this.provinces[2] = val.district
        this.addressData.detailAddress = val.detail
      },
      dialogVisibleClose (b) {
        if (!b) {
          this.AddressVisible = false
          return false
        }
        const data = {
          'defaultFlag': this.addressData.defaultFlag,
          'detailAddress': this.addressData.detailAddress,
          'fullName': this.addressData.fullName,
          'region': `${this.provinces[0]} ${this.provinces[1]} ${this.provinces[2]}`,
          'telephone': this.addressData.telephone,
          'userId': USER.GetUserID()
        }
        for (let key in data) {
          if (data[key] === '' || data[key] === undefined) {
            this.$message.error('请完整填写地址信息')
            return false
          }
        }
        data._id = this.addressData._id
        this.$emit('postAddress', data)
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
