<!--评价-->
<template>
  <div id="evaluate">
    <div style="margin: 0 auto; height: 56px">
      <el-rate
        v-model="value"></el-rate>
    </div>
    <div class="flex" style="padding-left: 34px">
      <div tabindex="0" class="el-upload el-upload--picture-card">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <el-input style="width: 400px;margin:12px auto 24px;"
              type="textarea"
              v-model.trim="remark"
              resize="none"
              placeholder="输入评价">
    </el-input>
    <br>
    <el-button @click.native="postEvaluate" style="width: 400px" type="primary">提交</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        value: 5,
        remark: '',
        fileUrls: ''
      }
    },
    props: ['showEvaluate'],
    methods: {
      postEvaluate () {
        if (this.value === 0 || this.remark === '') {
          this.$message({
            message: '请评价',
            type: 'warning'
          })
          return false
        }
        this.$emit('postEvaluate', this.$data)
      }
    },
    mounted () {
      console.log(this)
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/public.less';

  #evaluate {
    .el-checkbox-group {
      width: 400px;
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
    }
    .el-checkbox-button {
      border-radius: 4px !important;
    }
    .el-checkbox-button__inner {
      margin-top: 12px;
      width: 190px;
      border-left: 1px solid #dcdfe6;
    }
    .el-checkbox-button .el-checkbox-button__inner {
      border-radius: 4px !important;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner, .is-focus .el-checkbox-button__inner {
      border-left: 1px solid #00a0e9;
    }
    .el-rate__item {
      i {
        font-size: 28px;
      }
    }
    .el-rate__text {
      display: block;
      margin-top: 6px;
      font-size: 16px;
    }
    .el-upload--picture-card {
      margin-left: 12px;
      width: 120px;
      height: 120px;
      line-height: 126px;
    }
  }
</style>
