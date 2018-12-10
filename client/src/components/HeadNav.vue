<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img class="logo" src="../assets/logo.png">
        <span class="title">在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            alt
            class="avatar"
            src="https://user-gold-cdn.xitu.io/2018/9/16/165e132647eca15f?w=1132&h=559&f=png&s=205082"
          >
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown @command="setDialogInfo" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'head-nav',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo (command) {
      switch (command) {
        case 'info':
          this.showInfoList()
          break
        default:
          this.logout()
          break
      }
    },
    showInfoList () {
      console.log('showInfoList')
    },
    logout () {
      // 清除token
      localStorage.removeItem('eleToken')
      // 设置vuex
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
      this.$message({
        message: '账号退出成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.head-nav
  height 60px
  min-width 600px
  padding 5px
  background #324057
  color #ffffff
  border-bottom 1px solid #1f2d3d
  .logo-container
    line-height 60px
    min-width 400px
    .logo
      height 50px
      width 50px
      margin-right 5px
      vertical-align middle
      display inline-block
    .title
      vertical-align middle
      font-size 22px
      font-family 'Microsoft YaHei'
      letter-spacing 3px
  .user
    line-height 60px
    text-align right
    float right
    padding-right 10px
    .userinfo
      .avatar
        width 40px
        height 40px
        border-radius 50%
        vertical-align middle
        padding 0 5px
      .welcome
        display inline-block
        vertical-align middle
        padding 0 5px
        .name
          line-height 20px
          text-align center
          font-size 14px
        .comename
          font-size 12px
        .avatarname
          color #409eff
          font-weight 700
      .username
        cursor pointer
        margin-right 5px
        .el-icon-arrow-down
          color #fff
</style>
