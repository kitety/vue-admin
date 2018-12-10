<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftNav></LeftNav>
    <router-view></router-view>
  </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
import LeftNav from '../components/LeftNav'
export default {
  name: 'index',
  components: {
    HeadNav,
    LeftNav
  }
}
</script>
<style lang="stylus" scoped>
.index
  height 100%
  overflow hidden
</style>
