<template>
  <el-row class="menu-page">
    <el-col>
      <el-menu
        active-text-color="#409eff"
        background-color="#324057"
        class="el-menu-vertical-demo"
        mode="vertical"
        text-color="#fff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="(item,index) in items">
          <el-submenu :index="item.path" :key="index" v-if="item.children">
            <template slot="title">
              <i :calss="'fa fa-margin '+ item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
          </el-submenu>
          <router-link :key="cIndex" :to="cItem.path" v-for="(cItem,cIndex) in item.children">
            <el-menu-item :index="cItem.path">
              <span slot="title">{{cItem.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'left-menu',
  data () {
    return {
      items: [
        {
          v: 'fa-money',
          name: '资金管理',
          path: 'fund',
          children: [
            {
              path: 'fondList',
              name: '资金流水'
            }
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [
            {
              path: 'infoShow',
              name: '个人信息'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.menu-page
  position fixed
  header-height = 71px
  top 71px
  left 0
  height 'calc(100% - %s)' % header-height
  background-color #324057
  z-index 99
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width 180px
    min-height 400px
  .el-menu-vertical-demo
    width 35px
    .el-menu
      border none
    .el-submenu .el-menu-item
      min-width 180px
      .fa-margin
        margin-right 5px
      .hiddenDropdown, .hiddenDropname
        display none
      a
        text-decoration none
</style>
