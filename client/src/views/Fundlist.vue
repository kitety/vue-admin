<template>
  <el-table :data="tableData" style="width: 100%" v-if="tableData.length>0" max-height="400px" border>
    <el-table-column align="center" label="序号" type="index" width="70"></el-table-column>
    <el-table-column align="center" label="创建时间" prop="date" width="250"></el-table-column>
    <el-table-column align="center" label="收支类型" prop="type" width="100"></el-table-column>
    <el-table-column align="center" label="收支描述" prop="describe" width="180"></el-table-column>
    <el-table-column align="center" label="收入" prop="income" width="120"></el-table-column>
    <el-table-column align="center" label="支出" prop="expend" width="120"></el-table-column>
    <el-table-column align="center" label="账户现金" prop="cash" width="120"></el-table-column>
    <el-table-column align="center" label="备注" prop="remark" width="220"></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'Fundlist',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      // 获取表格数据
      this.$axios.get('/api/profile').then(res => {
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
