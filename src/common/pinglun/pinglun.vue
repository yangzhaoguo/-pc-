<template>
  <div id="">
    <el-dialog
      title="评论"
      :visible.sync="visible"
      @close="$emit('update:commentVisi', false)"
      width="500px">
      <el-input
        type="textarea"
        maxlength="200"
        placeholder="请输入内容"
        :rows="6"
        :clearable=true
        :autofocus=true
        resize="none"
        @blur="inputBlur"
        v-model="text">
      </el-input>
      <div class="max-200">剩余{{textLength}}字</div>
      <div>
        <el-button @click="postMessage" style="margin: 0 auto;display: block" type="primary">提交评论</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        visible: this.commentVisi,
        text: ''
      }
    },
    methods: {
      inputBlur() {
        this.text = this.trim(this.text)
      },
      postMessage() {
        if (this.text.length < 5) {
          this.$message.error('评论字数不低于五个字')
        } else {
          this.$emit('postMessage', this.text)
        }
      }
    },
    computed: {
      textLength() {
        return 200 - this.text.length
      }
    },
    props: ['commentVisi'],
    watch: {
      commentVisi() {
        this.visible = this.commentVisi
      }
    }
  }
</script>

<style scoped lang="less">
  .max-200 {
    line-height: 48px;
    text-align: right;
    color: #999999;
    font-size: 12px;
  }
</style>
