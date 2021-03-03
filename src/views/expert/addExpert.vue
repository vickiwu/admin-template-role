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
        <el-form-item label="专家姓名" prop="name" placeholder="请输入专家姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="专家工号" prop="name" placeholder="请输入专家工号">
          <el-input v-model="form.from" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name" placeholder="请输入手机号码">
          <el-input v-model="form.region1" />
        </el-form-item>
        <el-form-item label="专业领域" prop="region2">
          <el-select v-model="form.region2" placeholder="请选择专业领域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" prop="desc" placeholder="请输入资料内容摘要">
          <el-input v-model="form.desc" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="专家头像" prop="resource">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="是否参与调度">
          <el-radio-group v-model="form.region3">
            <el-radio label="是" />
            <el-radio label="否" />
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

export default {

  data() {
    return {
      form: {
        name: '',
        desc: '',
        region1: '',
        region2: '',
        region3: '',
        from: ''
      },
      imageUrl: '',
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        from: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        region1: [
          { required: true, message: '请选择杂草所属种类', trigger: 'change' }
        ],
        region2: [
          { required: true, message: '请选择杂草所属种类', trigger: 'change' }
        ],
        region3: [
          { required: true, message: '请选择杂草危害程度', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    console.log(this.$route.params, 'sss')
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
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
