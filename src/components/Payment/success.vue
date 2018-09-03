<template>
  <div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { ajax, GetUserID } from '../../assets/js/user'

  export default {
    data () {},
    methods: {
      getDetailProduct () {
        const url = 'paimai/front/confirm_pay_result'
        const data = {
          userId: GetUserID(),
          orderId: this.$route.query.orderId
        }
        const ret = r => {
          if (r.busCode === 200) {
            this.$router.push({path: '/order', query: this.$route.query.orderId})
          } else {
            this.$message.error(r.data)
            this.$router.push({path: '/payment', query: this.$route.query.orderId})
          }
        }
        ajax(url, 'get', data, ret, 30000, false)
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
