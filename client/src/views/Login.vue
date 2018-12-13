<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">登录后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          class="login-Form"
          label-width="60px"
          ref="loginFrom"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" type="email" v-model="loginUser.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('loginFrom')" class="submit-btn" type="primary">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号?现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {

        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在2~30个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/login', this.loginUser).then(result => {
            // 注册成功
            this.$message({
              message: '账号登录成功',
              type: 'success'
            })
            // 存储token
            const { token } = result.data
            localStorage.setItem('eleToken', token)
            // 解析token
            const decoded = jwtDecode(token)
            // token存储
            this.$store.dispatch('setAuthenticated', !isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)
            this.$router.push('/index')
          }).catch((err) => {
            console.dir(err)
            // 注册失败
            this.$message.error('账号登录失败')
            this.$router.push('/login')
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
.login
  position relative
  width 100%
  height 100%
  background url('../assets/bg.jpg') no-repeat center center
  background-size 100% 100%
  .form-container
    box-width = 420px
    width 370px
    height 210px
    position absolute
    top 130px
    left "calc(50% - %s)" % (box-width/2)
    padding 25px
    border-radius 5px
    text-align center
  .title
    font-family 'Microsoft YaHei'
    font-weight bold
    font-size 26px
    color #fff
  .login-Form
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
