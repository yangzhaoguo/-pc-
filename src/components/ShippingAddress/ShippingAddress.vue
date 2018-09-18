<template>
  <div id="ShippingAddress">
    <select-address :showHeader=true></select-address>
  </div>
</template>

<script type="text/ecmascript-6">
  import selectAddress from '../../common/Address/selectAddress.vue'

  export default {
    components: {
      selectAddress
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/public.less';

  #ShippingAddress {
    width: 960px;
    margin: 0 auto;
  }
</style>
