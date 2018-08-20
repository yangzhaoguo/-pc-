<template>
  <div ref="wrapper">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: ['data'],
    methods: {
      init () {
        window.onscroll = () => {
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          //变量windowHeight是可视区的高度
          let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
          //变量scrollHeight是滚动条的总高度
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
          //滚动条到底部的条件
          if (scrollTop + windowHeight === scrollHeight) {
            //写后台加载数据的函数
            this.$emit('sole')
          }
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    watch: {
      data () {
        setTimeout(() => {
          this.init()
        }, 20)
      }
    }
  }
</script>

<style scoped>
</style>
