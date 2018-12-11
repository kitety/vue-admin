<template>
  <div class="fill-container">
    <el-table
      :data="tableData"
      border
      max-height="400px"
      style="width: 100%"
      v-if="tableData.length>0"
    >
      <el-table-column align="center" label="序号" type="index" width="70"></el-table-column>
      <el-table-column align="center" label="创建时间" prop="date" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收支类型" prop="type" width="100"></el-table-column>
      <el-table-column align="center" label="收支描述" prop="describe" width="150"></el-table-column>
      <el-table-column align="center" label="收入" prop="income" width="120">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支出" prop="expend" width="120">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户现金" prop="cash" width="120">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark" width="220"></el-table-column>
      <el-table-column align="center" label="操作" prop="operation">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" icon="edit" size="mini">编辑</el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            icon="delete"
            size="mini"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    },
    handleEdit (index, row) {
      console.log('handleEdit')
    },
    handleDelete (index, row) {
      console.log('handleDelete')

    }
  }
}
</script>
<style lang="stylus" scoped>
.fill-container
  height 100%
  padding 16px
  box-sizing border-box
</style>
