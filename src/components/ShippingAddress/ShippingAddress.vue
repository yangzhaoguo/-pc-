<template>
  <div id="ShippingAddress">
    <div class="title flex justify-between">
      <div>收货地址</div>
      <div class="add-address" @click="showAddress">新增收货地址</div>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="收货人"
          width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="送货地址">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.address }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="290">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini">
              <i class="el-icon-circle-check" style="color: #ffffff;"></i>
              默认地址
            </el-button>
            <el-button
              size="mini">
              <i class="el-icon-edit-outline"></i>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger">
              <i class="el-icon-delete" style="color: #ffffff;"></i>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-address ref="address"></add-address>
  </div>
</template>

<script type="text/ecmascript-6">
  import addAddress from '../../common/Address/Address'

  export default {
    data () {
      return {
        AddressVisible: false,
        tableData: [
          {
            phone: '18346864586',
            name: '王小虎',
            address: '北京市普陀区金沙江路 1518 弄'
          },
          {
            phone: '18377884015',
            name: '李小豹',
            address: '北京市酒仙桥 1518 弄'
          }
        ]
      }
    },
    components: {
      addAddress
    },
    methods: {
      showAddress () {
        this.$refs.address.AddressVisible = true
      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/public.less';

  #ShippingAddress {
    .title {
      height: 42px;
      line-height: 42px;
      overflow: hidden;
      padding:6px;
      .add-address {
        font-size: 14px;
        color: @mainColor;
        cursor: pointer;
      }
    }
  }
</style>
