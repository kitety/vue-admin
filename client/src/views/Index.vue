<template>
  <div class="index">
    <HeadNav></HeadNav>
    <router-view></router-view>
  </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
export default {
  name: 'index',
  components: {
    HeadNav
  }
}
</script>
<style lang="stylus" scoped>
.index
  height 100%
  overflow hidden
</style>
