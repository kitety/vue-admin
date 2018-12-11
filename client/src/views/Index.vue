<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftNav></LeftNav>
    <div class="right-container">
      <router-view></router-view>
    </div>
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
  .right-container
    position relative
    left 181px
    top 0
    width-count=180px
    height-count=71px
    height 'calc(100% - %s)' % height-count
    width 'calc(100% - %s)' % width-count
</style>
