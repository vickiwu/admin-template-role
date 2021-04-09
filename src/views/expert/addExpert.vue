<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="专家姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入专家姓名" />
        </el-form-item>
        <el-form-item label="用户名" prop="profUser">
          <el-input v-model="form.profUser" placeholder="请输入账户名称" />
        </el-form-item>
        <el-form-item label="登录密码" prop="profPass">
          <el-input v-model="form.profPass" type="password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input v-model="form.password1" type="password" placeholder="请输入确认密码" />
        </el-form-item>
        <el-form-item label="单位名称" prop="company">
          <el-input v-model="form.company" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="专家工号" prop="jobNo">
          <el-input v-model="form.jobNo" placeholder="请输入专家工号" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="专业领域" prop="cat">
          <el-select v-model="form.cat" placeholder="请选择专业领域" clearable>
            <el-option label="杂草研判" :value="1" />
            <el-option label="杂草危害分析" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="请输入资料内容摘要" />
        </el-form-item>
        <el-form-item label="专家头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="string"
            :http-request="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="是否参与调度">
          <el-radio-group v-model="form.schedule">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
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
import { uploadImg } from '@/api/zacao'
import { create, edit } from '@/api/zhuanjia'
import { clean } from '@/utils/index'
// import sha256 from 'sha256'

export default {

  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
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
      } else if (value !== this.form.profPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isEdit: false,
      form: {
        realname: '',
        profUser: '',
        profPass: '',
        password1: '',
        cat: '',
        desc: '',
        jobNo: '',
        company: '',
        phone: '',
        schedule: 1,
        from: '',
        avatar: null
      },
      imageUrl: '',
      rules: {
        realname: [
          { required: true, message: '请输入专家姓名', trigger: 'blur' }
        ],
        profUser: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        profPass: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 32 个字符以内', trigger: 'blur' }
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        jobNo: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        cat: [
          { required: true, message: '请选择专业领域', trigger: 'change' }
        ],
        region3: [
          { required: true, message: '请选择杂草危害程度', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.isEdit = this.$route.params.isEdit
    if (this.isEdit) {
      this.form = {
        ... this.$route.params.rowData
      }
      this.imageUrl = this.form.avatar.httpUrl
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.edit()
      } else {
        this.create()
      }
    },
    async create() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        } else {
          const params = { ...this.form }
          delete params.password1
          // params.profPass = sha256(this.form.profPass)
          create({ json: JSON.stringify(clean(params)) }).then((data) => {
            if (data.state === 1) {
              this.$alert('新增成功', '提示', {
                confirmButtonText: '确定',
                type: 'success',
                callback: () => {
                  // for (const key in this.form) {
                  //   this.form[key] = ''
                  // }
                }
              })
            }
            if (this.isEdit !== undefined) {
              // 路由跳转
              this.$router.push({
                name: 'ExpertManagement'
              })
            } else {
              this.form = {
                realname: '',
                profUser: '',
                profPass: '',
                password1: '',
                cat: '',
                desc: '',
                jobNo: '',
                company: '',
                phone: '',
                schedule: 1,
                from: '',
                avatar: null
              }
              this.imageUrl = ''
            }
          }).catch(err => err)
        }
      })
    },
    edit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          // console.log('error submit!!')
          return false
        } else {
          edit({ json: JSON.stringify(clean(this.form)) }).then((data) => {
            if (data.state === 1) {
              this.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                type: 'success',
                callback: () => {
                  // 路由跳转
                  this.$router.push({
                    name: 'ExpertManagement'
                  })
                }
              })
            }
          }).catch(err => err)
        }
      })
    },
    async uploadImg(file) {
      const params = new FormData()
      params.append('file', file.file)
      uploadImg(params).then((res) => {
        const { data } = res
        this.form.avatar = data.result
      }).catch(err => err)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$alert('上传图片只能是 JPG 或者PNG 格式!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$alert('上传头像图片大小不能超过 2MB!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      return isJPG && isLt2M
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
  .avatar-uploader ::v-deep.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
}
</style>
