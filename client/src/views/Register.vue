<template>
  <div class="register">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">在线后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          class="register-Form"
          label-width="80px"
          ref="rigisterForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" type="text" v-model="registerUser.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" type="email" v-model="registerUser.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" type="password" v-model="registerUser.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input placeholder="请确认密码" type="password" v-model="registerUser.password2"></el-input>
          </el-form-item>
          <el-form-item label="选择身份" prop="password2">
            <el-select placeholder="请选择身份" v-model="registerUser.identity">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('rigisterForm')" class="submit-btn" type="primary">注册</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>已经有账号?现在
              <router-link to="/login">登录</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'register',
  components: {},
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2~30个字符之间', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在2~30个字符之间', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在2~30个字符之间', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/register', this.registerUser).then(result => {
            // 注册成功
            this.$message({
              message: '账号注册成功',
              type: 'success'
            })
            this.$router.push('/login')
          }).catch(() => {
            // 注册失败
            this.$message.error('账号登注册失败')
            this.$router.push('/register')
          })
        } else {
          alert('错误的提交!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.register
  position relative
  width 100%
  height 100%
  background url('../assets/bg.jpg') no-repeat center center
  background-size 100% 100%
  .form-container
    width 370px
    height 210px
    position absolute
    top 10%
    left 34%
    padding 25px
    border-radius 5px
    text-align center
    .title
      font-family 'Microsoft YaHei'
      font-weight bold
      font-size 26px
      color #fff
    .register-Form
      margin-top 20px
      background-color #ffffff
      padding 20px 40px 20px 20px
      border-radius 5px
      box-shadow 0px 5px 10px #ccc
      .submit-btn
        width 100%
      .tiparea
        text-align right
        a
          color #409eff
</style>
