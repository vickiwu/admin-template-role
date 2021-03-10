<template>
  <div class="app-container">
    <div class="news-title">账户管理 <span class="news-sub">/</span> <span class="news-sub-title">账户新增</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="name" placeholder="请输入用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="name2" placeholder="请输入真实姓名">
          <el-input v-model="form.name2" />
        </el-form-item>
        <el-form-item label="昵称" prop="name3" placeholder="请输入昵称">
          <el-input v-model="form.name3" suffix-icon="el-icon-refresh" />
        </el-form-item>
        <el-form-item label="登陆密码" prop="name4" placeholder="请输入登陆密码">
          <el-input v-model="form.name4" />
        </el-form-item>
        <el-form-item label="确认密码" prop="name5" placeholder="请再次输入登陆密码">
          <el-input v-model="form.name5" />
        </el-form-item>
        <el-form-item label="地市" prop="name6" placeholder="请输入地市">
          <el-input v-model="form.name6" />
        </el-form-item>
        <el-form-item label="单位" prop="name7" placeholder="请输入单位">
          <el-input v-model="form.name7" />
        </el-form-item>
        <el-form-item label="工号" prop="name8" placeholder="请输入工号">
          <el-input v-model="form.name8" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name9" placeholder="请输入手机号码">
          <el-input v-model.number="form.name9" />
        </el-form-item>

        <el-form-item label="类型" prop="region1" placeholder="现场工作人员">
          <el-select v-model="form.region1" placeholder="请选择发现地域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="验证码" prop="from">

          <div class="yzm">
            <div class="yzm-box">
              <ValidCode :value.sync="ValidCode" :width="width" :height="height" :refresh="refresh" @input="alert(ValidCode)" />

            </div>
            <el-input v-model="form.from" class="yzm-input" placeholder="请输入验证码" />
          </div>
        </el-form-item>
        <el-form-item class="btn-center">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode/index'

export default {
  components: {
    ValidCode
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      ValidCode: '33',
      width: '120px',
      height: '50px',
      refresh: '2',
      form: {
        name: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',

        region1: '',

        from: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        name4: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' }
        ],
        name5: [
          { required: true, message: '请再次输入登陆密码', trigger: 'blur' }
        ],
        name6: [
          { required: true, message: '请输入地市', trigger: 'blur' }
        ],
        name7: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name8: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        name9: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]

      }
    }
  },
  mounted() {
    console.log(this.$route.params, 'sss')
  },
  methods: {
    alert(msg) {
      console.log('%c 🍐 msg: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', msg)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>

.news-card {
.news-form{
  width: 80%;
  margin: 15px auto;

  ::v-deep.el-select{
    width: 100%;
  }
  .btn-center{
    text-align: center;
    ::v-deep.el-button{
      margin: 0 15px;
    }
  }
  .yzm{
    display: flex;
    .yzm-box{
      border: 1px solid #D0D0D0;
      border-radius: 3px;
      text-align: center;
      width: 120px;
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
      background-color: #fff3e4;
    }
    .yzm-input{
      width: 200px;
    }
  }
}
}
</style>
