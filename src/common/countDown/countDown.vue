<!--单独使用时需要增加异步渲染判断-->
<template>
    <span :endTime="endTime" :callback="callback" :endText="endText">
        <slot>
            {{content}}
        </slot>
    </span>
</template>
<script>
  export default {
    data () {
      return {
        content: '00:00:00',
        timer: null
      }
    },
    props: {
      endTime: {
        type: Number,
        default: 0
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      countdowm (timestamp) {
        let self = this
        self.timer = setInterval(function () {
          let nowTime = new Date()
          let endTime = new Date(timestamp)
          let t = endTime.getTime() - nowTime.getTime()
          if (t > 0) {
            let day = Math.floor(t / 86400000)
            let hour = Math.floor((t / 3600000) % 24)
            let min = Math.floor((t / 60000) % 60)
            let sec = Math.floor((t / 1000) % 60)
            hour = hour < 10 ? '0' + hour : hour
            min = min < 10 ? '0' + min : min
            sec = sec < 10 ? '0' + sec : sec
            let format = ''
            if (day > 0) {
              format = `${day}天${hour}小时${min}分${sec}秒`
            }
            if (day <= 0 && hour > 0) {
              format = `${hour}小时${min}分${sec}秒`
            }
            if (day <= 0 && hour <= 0) {
              format = `${min}分${sec}秒`
            }
            self.content = format
          } else {
            clearInterval(self.timer)
            self.content = self.endText
          }
        }, 1000)
      }
    },
    mounted () {
      this.countdowm(this.endTime)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>
<style></style>
