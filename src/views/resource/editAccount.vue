<template>
  <div class="app-container">
    <el-button type="primary" class="go-back-btn" @click="goBack">返回上一级</el-button>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="this.$route.params.isEdit? rulesEdit:rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!this.$route.params.isEdit" label="登陆密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入登陆密码" />
        </el-form-item>
        <el-form-item v-if="!this.$route.params.isEdit" label="确认密码" prop="password1">
          <el-input v-model="form.password1" type="password" placeholder="请再次输入登陆密码" />
        </el-form-item>
        <el-form-item label="地市" prop="cityName">
          <el-select
            v-model="form.cityName"
            clearable

            placeholder="请选择地市"
            @change="getBumenList"
          >
            <el-option
              v-for="item in bumenJson"
              :key="item.city"
              :label="item.city"
              :value="item.city"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单位" prop="bumen">
          <el-select
            v-model="form.bumen"
            clearable

            placeholder="请选择单位"
          >
            <el-option
              v-for="item in bumenList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="jobNo">
          <el-input v-model="form.jobNo" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="form.phone" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item label="类型" prop="utype">
          <el-select v-model="form.utype" clearable placeholder="请选择类型">
            <el-option label="专家调度用户" :value="2" />
            <el-option label="研判专家" :value="3" />
            <el-option label="图像采集操作员" :value="4" />
          </el-select>
        </el-form-item>

        <el-form-item label="验证码" prop="validate">
          <div class="yzm">
            <div class="yzm-box">
              <ValidCode
                v-if="code"
                :value.sync="ValidCode"
                :width="width"
                :height="height"
                :data="code"
                @refresh="refresh"
              />
            </div>
            <el-input v-model="form.validate" class="yzm-input" placeholder="请输入验证码" />
          </div>
        </el-form-item>
        <el-form-item class="btn-center">
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode/index'
import sha256 from 'sha256'
import { sendsms } from '@/api/admin'
import { mapGetters } from 'vuex'
import { clean } from '@/utils/index'
import { createUser, editUser } from '@/api/admin'
const bumenJson = require('@/assets/json/bumen.json')

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
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkValidate = (rule, value, callback) => {
      if (value !== this.code) {
        callback(new Error('请输入正确的验证码！'))
      } else {
        callback()
      }
    }
    return {
      bumenJson: bumenJson.bumenlist,
      bumenList: [],
      ValidCode: '33',
      width: '150px',
      height: '45px',
      form: {
        username: '',
        realname: '',
        password: '',
        password1: '',
        cityName: '',
        bumen: '',
        jobNo: '',
        phone: '',
        utype: '',
        validate: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 32, message: '用户名长度在 2 到 32 个字', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' }
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        cityName: [
          { required: true, message: '请输入地市', trigger: 'blur' }
        ],
        bumen: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        jobNo: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        validate: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkValidate, trigger: 'blur' }
        ]
      },
      rulesEdit: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        cityName: [
          { required: true, message: '请输入地市', trigger: 'blur' }
        ],
        bumen: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        jobNo: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        validate: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkValidate, trigger: 'blur' }
        ]
      },
      code: null
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'privilege',
      'phone'
    ])
  },
  mounted() {
    this.queryValidate()
    if (this.$route.params.isEdit) {
      // 编辑
      this.form = {
        ...this.$route.params.rowData
      }
      this.form.bumen = this.form.bumen.length === 2 ? this.form.bumen[1] : ''
      const filter = this.bumenJson.find(item => item.city === this.form.cityName)
      this.bumenList = filter.bumenlist2
    }
  },
  methods: {
    goBack() {
      this.$router.go('-1')
    },
    getBumenList(value) {
      const filter = this.bumenJson.find(item => item.city === value)
      this.bumenList = filter.bumenlist2
    },
    refresh() {
      this.queryValidate()
    },
    queryValidate() {
      sendsms({ phone: this.phone || '13952031666' }).then((res) => {
        const { data } = res
        this.code = data.code
      }).catch(err => err)
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        } else {
          if (this.privilege > 128) {
            this.$alert('权限不足！', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).catch(err => err)
            return
          }
          if (this.$route.params.isEdit) {
            const params = { ...this.form }
            params.bumen = [params.cityName, params.bumen]
            delete params.validate

            // 编辑
            editUser({ json: JSON.stringify(clean(params)) }).then((data) => {
              if (data.state === 1) {
                this.$alert('修改成功', '提示', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: () => {
                    this.$router.push({
                      name: 'Account'
                    })
                  }
                })
              }
            }).catch(err => err)
          } else {
            const params = { ...this.form }
            delete params.password1
            delete params.validate
            params.password = sha256(this.form.password)
            params.bumen = [params.cityName, params.bumen]

            // 新增
            createUser({ json: JSON.stringify(clean(params)) }).then((data) => {
              if (data.state === 1) {
                this.$alert('新增成功', '提示', {
                  type: 'success',
                  confirmButtonText: '确定',
                  callback: () => {
                    // for (const key in this.form) {
                    //   this.form[key] = ''
                    // }
                  }
                })
              }
              if (this.$route.params.isEdit !== undefined) {
                this.$router.push({
                  name: 'Account'
                })
              } else {
                this.form = {
                  username: '',
                  realname: '',
                  password: '',
                  password1: '',
                  cityName: '',
                  bumen: '',
                  jobNo: '',
                  phone: '',
                  utype: '',
                  validate: ''
                }
              }
            }).catch(err => err)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back-btn{
  margin-left: 20px ;
  margin-bottom: 15px;
}
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
    cursor: pointer;
    .yzm-box{
      border: 1px solid #D0D0D0;
      border-radius: 3px;
      text-align: center;
      height: 45px;
      line-height: 45px;
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
