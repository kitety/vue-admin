<template>
  <div class="dialog">
    <el-dialog :close-on-click-modal="false" :visible="dialogp.show" title="资金添加"></el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialogBox',
  props: {
    dialogp: Object
  }
}
</script>
<style lang="stylus" scoped>
</style>
