<template>
  <div class="dialog">
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogp.show" title="资金添加">
      <div class="form">
        <el-form
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          ref="form"
          style="margin:10px;"
        >
          <el-form-item label="收支类型">
            <el-select placeholder="请选择收支类型" v-model="formData.type">
              <el-option
                :key="index"
                :label="formtype"
                :value="formtype"
                v-for="(formtype,index) in formatType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" prop="descript">
            <el-input type="text" v-model="formData.descript"></el-input>
          </el-form-item>
          <el-form-item label="收入" prop="income">
            <el-input type="number" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item label="支出" prop="expend">
            <el-input type="number" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item label="零钱" prop="cash">
            <el-input type="number" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text-right" size="large">
            <el-button @click="onSubmit('form')" type="primary">提交</el-button>
            <el-button @click="dialogp.show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialogBox',
  data () {
    return {
      formData: {
        type: '',
        descript: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      formatType: [
        '提现', '提现手续费', '充值'
      ],
      form_rules: {
        descript: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
        income: [{ required: true, message: '收入不能为空', trigger: 'blur' }],
        expend: [{ required: true, message: '支出不能为空', trigger: 'blur' }],
        cash: [{ required: true, message: '零钱不能为空', trigger: 'blur' }]
      }
    }
  },
  props: {
    dialogp: Object
  },
  methods: {
    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/api/profile/add', this.formData).then((result) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('update')
          }).catch(() => {
            this.$message({
              message: '添加失败',
              type: 'danger'
            })
          }).finally(() => {
            this.dialogp.show = false
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
