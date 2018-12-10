<template>
  <div class="home">
    <div class="container">
      <h1 class="title">后台管理</h1>
      <p class="head">A Simple Background Management System</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {}
}
</script>
<style lang="stylus" scoped>
.home
  background url('../assets/showcase.png') no-repeat
  height 100%
  background-size 100% 100%
  .container
    height 100%
    box-sizing border-box
    padding-top 100px
    text-align center
    color #fff
    background-color rgba(0, 0, 0, 0.7)
    .title
      font-size 30px
    .head
      font-size 22px
      margin-top 50px
</style>
