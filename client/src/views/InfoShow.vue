<template>
  <div class="info-show">
    <el-row class="row-bg" justify="center" type="flex">
      <el-col :span="8">
        <div class="user">
          <img
            class="avatar"
            src="https://user-gold-cdn.xitu.io/2018/9/16/165e132647eca15f?w=1132&h=559&f=png&s=205082"
          >
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{user.identity==='employee'?'员工':'管理员'}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'infoShow',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
<style lang="stylus" scoped>
.info-show
  height 100%
  box-sizing border-box
  .row-bg
    height 100%
    width 100%
    .user
      text-align center
      position relative
      top 30%
      img
        width 150px
        height 150px
        border-radius 50%
    .userinfo
      height 100%
      width 100%
      background-color #eeeeee
      .user-item
        position relative
        top 30%
        padding 26px
        font-size 28px
        color #333
        i
          margin-right 10px
</style>
