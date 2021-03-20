<template>
  <div class="app-container">
    <div class="news-title">专家管理 <span class="news-sub">/</span> <span class="news-sub-title">专家录入</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="专家姓名" prop="realname" placeholder="请输入专家姓名">
          <el-input v-model="form.realname" />
        </el-form-item>
        <el-form-item label="专家工号" prop="jobNo" placeholder="请输入专家工号">
          <el-input v-model="form.jobNo" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" placeholder="请输入手机号码">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="专业领域" prop="cat">
          <el-select v-model="form.cat" placeholder="请选择专业领域">
            <el-option label="杂草研判" :value="1" />
            <el-option label="杂草危害分析" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" prop="desc" placeholder="请输入资料内容摘要">
          <el-input v-model="form.desc" type="textarea" :rows="3" />
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

export default {

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
      isEdit: false,
      form: {
        realname: '',
        cat: '',
        desc: '',
        jobNo: '',
        phone: '',
        schedule: '',
        from: '',
        avatar: null
      },
      imageUrl: '',
      rules: {
        realname: [
          { required: true, message: '请输入专家姓名', trigger: 'blur' }
        ],
        jobNo: [
          { required: true, message: '请输入工号', trigger: 'blur' }
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
          console.log('error submit!!')
          return false
        } else {
          create({ json: JSON.stringify(clean(this.form)) }).then((data) => {
            if (data.state === 1) {
              this.$message({
                type: 'success',
                message: '新增成功!'
              })
            }
            if (this.isEdit !== undefined) {
              // 路由跳转
              this.$router.push({
                name: 'ExpertManagement'
              })
            }
          })
        }
      })
    },
    edit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        } else {
          edit({ json: JSON.stringify(clean(this.form)) }).then((data) => {
            if (data.state === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              // 路由跳转
              this.$router.push({
                name: 'ExpertManagement'
              })
            }
          })
        }
      })
    },
    async uploadImg(file) {
      const params = new FormData()
      params.append('file', file.file)
      uploadImg(params).then((res) => {
        const { data } = res
        this.form.avatar = data.result
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
