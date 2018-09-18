<template>
  <div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {}
    },
    methods: {
      getDetailProduct () {
        const url = 'paimai/front/confirm_pay_result'
        const data = {
          userId: this.lycore.getUserId(),
          orderId: this.$route.query.orderId
        }
        const ret = r => {
          console.log(r)
          if (r.busCode === 200) {
            this.$router.push({path: '/order', query: {orderId: this.$route.query.orderId}})
          } else {
            this.$message.error(r.data)
            this.$router.push({path: '/payment', query: {orderId: this.$route.query.orderId}})
          }
        }
        this.ajax(url, 'get', data, ret, 30000, false)
      }
    },
    components: {},
    created () {
      this.getDetailProduct()
    }
  }
</script>
<style scoped lang="less">
</style>
