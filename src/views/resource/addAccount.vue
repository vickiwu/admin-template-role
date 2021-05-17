<template>
  <div class="app-container">
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
        <el-form-item label="省市" prop="city">
          <!-- <el-select
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
          </el-select> -->
          <el-row type="flex" justify="space-between">
            <!--  v-model="formWeed.discReg" -->
            <el-col :span="11">
              <el-select
                v-model="form.province"
                placeholder="请选择省"
                clearable
                @change="selectOne"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-select
                v-model="form.cityName"
                clearable
                placeholder="请选择市"
              >
                <el-option
                  v-for="item in tempList"
                  :key="item"
                  clearable
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>

          </el-row>
        </el-form-item>
        <el-form-item label="隶属海关" prop="bumen">
          <el-row>
            <el-col :span="22">
              <el-select
                v-model="form.bumen"
                clearable
                placeholder="请选择隶属海关"
              >
                <el-option
                  v-for="item in bumenList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :span="2" style="text-align:right">
              <el-button type="primary" @click="edit">编辑</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="工号" prop="jobNo">
          <el-input v-model="form.jobNo" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item label="类型" prop="utype">
          <el-select v-model="form.utype" clearable placeholder="请选择类型">
            <el-option label="调度专家" :value="2" />
            <el-option label="研判专家" :value="3" />
            <el-option label="信息录入员" :value="4" />
            <el-option label="应用审计员" :value="5" />
            <el-option label="统计查询员" :value="6" />
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
          <!-- <el-button>取消</el-button> -->
          <el-button type="primary" style="padding:7px 25px;font-size: 13px;" @click="onSubmit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="编辑隶属海关"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-row style="text-align: right;padding-bottom: 15px">
        <el-button type="primary" @click="addCompany">新增</el-button>
      </el-row>
      <div style="height: 300px; overflow-y: scroll">
        <el-row v-for="(item,idx) in bumenList" :key="item" class="company-row" style="cursor: pointer">
          <el-col :span="16">{{ item }}</el-col>
          <el-col :span="8" style="text-align: right;padding-right: 5px">
            <el-button type="text" style="color: #409EFF;cursor:pointer; margin-right:10px;" @click="editCompany(item, idx)"> 编辑</el-button>
            <el-button type="text" style="color: #f78989;cursor:pointer;" @click="delCompany(idx)"> 删除</el-button>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCompanyList">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加隶属海关"
      :visible.sync="dialogVisible1"
      width="30%"
      center
    >
      <el-input v-model="company" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="saveCompany">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode/index'
// import sha256 from 'sha256'
import { sendsms } from '@/api/admin'
import { mapGetters } from 'vuex'
import { clean } from '@/utils/index'
import { createUser, editUser, getCompanyList, setCompanyList } from '@/api/admin'

const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}

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
    const validateCity = (rule, value, callback) => {
      if (this.form.cityName === '' || this.form.province === '') {
        callback(new Error('请选择省市'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      dialogVisible1: false,
      mode: 1, // 1 新增  2 编辑
      company: '',
      companyIndex: 0,
      bumenList: [],
      ValidCode: '33',
      width: '150px',
      height: '45px',
      tempList: provinceJson['广西省'],
      provinceList: provinceList,
      form: {
        username: '',
        realname: '',
        password: '',
        password1: '',
        cityName: '',
        province: '广西省',
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
        // cityName: [
        //   { required: true, message: '请输入城市', trigger: 'blur' }
        // ],
        // province: [
        //   { required: true, message: '请输入省份', trigger: 'blur' }
        // ],
        city: [
          { required: true, validator: validateCity, trigger: 'change' }
        ],
        // bumen: [
        //   { required: true, message: '请输入单位', trigger: 'blur' }
        // ],
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
        province: [
          { required: true, message: '请输入省份', trigger: 'blur' }
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
      code: null,
      treeProps: {
        // value: 'id',
        children: 'option'
        // label: 'lb'
      }
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
    // 查询隶属海关
    this.getCompanyList()
    if (this.$route.params.isEdit) {
      // 编辑
      this.form = {
        ...this.$route.params.rowData
      }
    }
  },
  methods: {
    edit() {
      this.dialogVisible = true
    },
    editCompany(value, idx) {
      this.mode = 2
      this.companyIndex = idx
      this.company = value
      this.dialogVisible1 = true
    },
    delCompany(idx) {
      this.$confirm('数据删除后将无法恢复，请确认是否执行删除？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bumenList.splice(idx, 1)
      }).catch(err => err)
    },
    addCompany() {
      this.company = ''
      this.mode = 1
      this.dialogVisible1 = true
    },
    saveCompany() {
      if (this.mode === 1) {
        this.bumenList.push(this.company)
      } else {
        this.bumenList.splice(this.companyIndex, 1, this.company)
      }
      // this.form.bumen = this.company
      this.dialogVisible1 = false
    },
    saveCompanyList() {
      setCompanyList(clean({ comlist: JSON.stringify(this.bumenList) })).then((res) => {
        if (res.state === 1) {
          this.$alert('修改成功', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              // 修改成功后跳转回管理页面
              this.form.bumen = ''
              this.dialogVisible = false
            }
          })
        }
      }).catch(err => err)
    },
    getCompanyList() {
      getCompanyList(clean({})).then((res) => {
        const { data } = res
        this.bumenList = data && data.comlist
      }).catch(err => err)
    },
    selectOne(params) { // 省
      this.form.cityName = ''
      this.tempList = provinceJson[params]
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
            params.bumen = [params.bumen]
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
            // params.password = sha256(this.form.password)
            params.bumen = [params.bumen]

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
                  province: '广西省',
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
.company-row {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
}
.company-row:hover {
  cursor: pointer;
  background-color: #f5f7fa;
}
</style>
