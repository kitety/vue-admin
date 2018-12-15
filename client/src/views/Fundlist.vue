<template>
  <div class="fill-container">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btn-right">
          <el-button @click="handleAdd" icon="view" size="mini" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="teble-container">
      <el-table
        :data="tableData"
        border
        max-height="350px"
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
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              :current-page.sync="paginations.pageIndex"
              :layout="paginations.layout"
              :page-size="paginations.pageSize"
              :page-sizes="paginations.pageSizes"
              :total="paginations.total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog :dialogp="dialog" :formData="formData" @update="getProfile"/>
  </div>
</template>
<script>
import Dialog from '../components/Dialog'
export default {
  name: 'Fundlist',
  data () {
    return {
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      tableData: [],
      dialog: {
        show: false,
        title: '',
        option: ''
      },
      paginations: {
        pageIndex: 3,
        total: 10,
        pageSize: 5, // 初始
        pageSizes: [5, 10, 20, 40], // 修改
        layout: 'total, sizes, prev, pager, next, jumper'
      }
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
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit'
      }
    },
    handleDelete (index, row) {
      this.$axios.delete('/api/profile/delete/' + row._id).then((result) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getProfile()
      }).catch(() => {
        this.$message.error('删除失败')
      })
    },
    handleAdd () {
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add'
      }
    },
    handleCurrentChange (page) {
      console.log(page)
    },
    handleSizeChange (page) {
      console.log(page)
    }
  },
  components: {
    Dialog
  }
}
</script>
<style lang="stylus" scoped>
.fill-container
  height 100%
  padding 16px
  box-sizing border-box
  .btn-right
    float right
  .pagination
    text-align right
    margin 10px
</style>
