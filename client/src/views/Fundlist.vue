<template>
  <div class="fill-container">
    <div>
      <el-form :inline="true" :model="searchData" ref="add_data">
        <el-form-item label="按照时间筛选:">
          <el-date-picker placeholder="选择开始时间" type="datetime" v-model="searchData.beginTime"></el-date-picker>--
          <el-date-picker placeholder="选择结束时间" type="datetime" v-model="searchData.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" icon="search" size="small" type="primary">筛选</el-button>
        </el-form-item>
        <el-form-item class="btn-right" v-if="user.identity==='manager'">
          <el-button @click="handleAdd" icon="view" size="small" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="teble-container">
      <el-table
        :data="tableData"
        border
        max-height="350"
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
        <el-table-column align="center" label="操作" prop="operation" v-if="user.identity==='manager'">
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
      searchData: {
        beginTime: '',
        endTime: ''
      },
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
      tableFilterData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: '',
        option: ''
      },
      paginations: {
        pageIndex: 1,
        total: 0,
        pageSize: 5, // 初始
        pageSizes: [5, 10, 20, 40], // 修改
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  created () {
    this.getProfile()
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    getProfile () {
      // 获取表格数据
      this.$axios.get('/api/profile').then(res => {
        this.allTableData = res.data
        // 设置分页数据
        this.setPagination()
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
      this.tableData = this.allTableData.filter((item, index) => {
        return (index >= this.paginations.pageSize * (page - 1)) && (index < this.paginations.pageSize * page)
      })
    },
    handleSizeChange (page) {
      this.paginations.pageIndex = 1
      this.paginations.pageSize = page
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pageSize
      })
    },
    setPagination () {
      // 分页属性
      this.paginations.total = this.allTableData.length
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pageSize
      })
    },
    handleSearch () {
      if (this.searchData.beginTime && this.searchData.endTime) {
        let beginTime = this.searchData.beginTime.getTime()
        let endTime = this.searchData.endTime.getTime()
        this.allTableData = this.tableFilterData.filter(item => {
          let itemTime = new Date(item.date).getTime()
          return itemTime >= beginTime && endTime >= itemTime
        })
        this.setPagination()
      } else {
        this.getProfile()
        this.$message.error('请先选择正确的时间！')
      }
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
