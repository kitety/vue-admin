<template>
  <div id="app">
    <div id="nav"></div>
    <router-view/>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'app',
  components: {},
  created () {
    if (localStorage.eleToken) {
      // 解析token
      const decoded = jwtDecode(localStorage.eleToken)
      // token存储
      this.$store.dispatch('setAuthenticated', !isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  }
}
</script>
<style lang="stylus">
html, body, #app
  height 100%
</style>
