<template>
  <div id="ShippingAddress">
    <div class="title flex justify-between">
      <div>收货地址</div>
      <div class="add-address" @click="openAddress('add')">新增收货地址</div>
    </div>
    <div>
      <el-table
        border
        :data="tableData"
        :show-header="showHeader"
        empty-text="请新增收货地址"
        style="width: 100%">
        <el-table-column
          label="收货人"
          align="center"
          :width="showHeader?96:120">
          <template slot-scope="scope">
            <div class="flex">
              <div slot="reference" class="name-wrapper" v-if="!showHeader">
                <el-radio v-model="addressId" :label="scope.row._id">&nbsp;</el-radio>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.fullName }}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.telephone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="送货地址">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.region }} {{ scope.row.detailAddress }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="210">
          <template slot-scope="scope">
            <el-button
              @click.native="setDefault(scope)"
              :type="scope.row.defaultFlag ? 'primary' : ''"
              size="mini">
              <i class="el-icon-success"></i>
              默认地址
            </el-button>
            <!--暂时隐藏编辑功能-->
            <!--<el-button-->
            <!--@click.native="openAddress('set',scope.row)"-->
            <!--size="mini">-->
            <!--<i class="el-icon-edit-outline"></i>-->
            <!--编辑-->
            <!--</el-button>-->
            <el-button
              @click.native="deleteAddress(scope)"
              size="mini"
              type="danger">
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <vue-add-address ref="address" :addressData="addressData" @postAddress="postAddress"></vue-add-address>
  </div>
</template>

<script type="text/ecmascript-6">
  import vueAddAddress from '../../common/Address/Address'
  export default {
    data () {
      return {
        addressId: '',
        tableData: [],
        addressData: {
          'detailAddress': '',
          'region': '',
          'defaultFlag': 0,
          'fullName': '',
          'telephone': '',
          '_id': ''
        }
      }
    },
    components: {
      vueAddAddress
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      }
    },
    computed: {},
    methods: {
      addressDataInit () {
        this.addressData = {
          'detailAddress': '',
          'region': '',
          'defaultFlag': 0,
          'fullName': '',
          'telephone': ''
        }
      },
      openAddress (type, data) {
        if (type === 'add') {
          this.addressDataInit()
        } else if (type === 'set') {
          this.addressData = Object.assign({}, data)
        }
        this.$refs.address.AddressVisible = true
      },
      getAddressList () {
        const data = {
          userId: this.lycore.getUserId()
        }
        try {
          const url = 'paimai/front/list_address'
          const ret = r => {
            if (r.busCode === 200) {
              if (r.data.length > 0) {
                this.tableData = r.data
                this.addressId = this.tableData.find(v => {
                  return v.defaultFlag === 1
                })._id
              }
            } else {
              this.$message.error(r.data)
            }
          }
          this.ajax(url, 'get', data, ret)
        } catch (err) {
        }
      },
      postAddress (data) {
        const url = 'paimai/front/add_new_address'
        const ret = (r) => {
          if (r.busCode === 200) {
            setTimeout(() => {
              window.location.reload()
            }, 500)
          } else {
            this.$message.error(r.data)
          }
        }
        this.ajax(url, 'POST', data, ret)
      },
      setDefault (scope) {
        if (scope.row.defaultFlag === 1) {
          return false
        }
        const data = {
          _id: scope.row._id
        }
        const url = 'paimai/front/set_default'
        const ret = r => {
          if (r.busCode === 200) {
            this.tableData.map(item => {
              item.defaultFlag = 0
            })
            this.tableData[scope.$index].defaultFlag = 1
          } else {
            this.$message.error(r.data)
          }
        }
        this.ajax(url, 'post', data, ret)
      },
      deleteAddress (scope) {
        if (this.tableData[scope.$index].defaultFlag === 1) {
          this.$message.error('默认地址不可删除')
          return false
        }
        this.$confirm('是否删除该地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            _id: scope.row._id
          }
          const url = 'paimai/front/delete'
          const ret = r => {
            if (r.busCode === 200) {
              setTimeout(() => {
                window.location.reload(false)
              }, 500)
            } else {
              this.$message.error(r.data)
            }
          }
          this.ajax(url, 'post', data, ret)
        })
      }
    },
    watch: {
      addressId () {
        var active = this.tableData.find((value, index, arr) => {
          return value._id === this.addressId
        })
        this.$emit('postAddressData', active)
      }
    },
    created () {
      this.getAddressList()
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/public.less';

  #ShippingAddress {
    .title {
      height: 42px;
      line-height: 42px;
      overflow: hidden;
      padding: 6px;
      .add-address {
        font-size: 14px;
        color: @mainColor;
        cursor: pointer;
      }
    }
  }
</style>
