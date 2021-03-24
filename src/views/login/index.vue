<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">生物信息处理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password" class="last-form">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <div class="tips">
        <span>
          <el-checkbox v-model="markPassword">记住密码</el-checkbox>
        </span>
        <span> 忘记密码？</span>
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px; padding: 15px 0;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    // 用户名的验证规则
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4 || value.length > 32) {
        callback(new Error('用户名的长度在4-32位！'))
      } else {
        callback()
      }
    }
    // 密码的验证规则
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4 || value.length > 32) {
        callback(new Error('密码的长度在4-32位！'))
      } else {
        callback()
      }
    }
    return {
      markPassword: false, // 是否记住密码
      loginForm: { // 登录表单
        username: '',
        password: ''
      },
      loginRules: { // 登录验证规则
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
    }
  },

  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 验证通过提交登录信息
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' }) // 跳转至首页
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('用户名密码验证未通过!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景 和光标变色 */

$bg: #fff;
$light_gray: #283443;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* login页面的样式 */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b; // 深色背景
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url('../../assets/login.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
    justify-content: center;
    align-items: center;

  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    overflow: hidden;
    ::v-deep.el-button--primary:focus,
    .el-button--primary:hover {
      background: #368ce6;
    }
    .last-form{
      margin-bottom: 10px;
    }
  }

  .tips {
    font-size: 14px;
    color: #7882A2;
    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    ::v-deep.el-checkbox__input.is-checked+.el-checkbox__label{
      color: #7882A2;
    }
    ::v-deep.el-checkbox{
      color: #7882A2;
    }

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      // color: $light_gray;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
