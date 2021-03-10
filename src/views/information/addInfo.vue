<template>
  <div class="app-container">
    <div class="news-title">资料管理 <span class="news-sub">/</span> <span class="news-sub-title">资料录入</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="资料名称" prop="name" placeholder="请输入资料名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="杂草种类" prop="region1">
          <el-select v-model="form.region1" placeholder="请选择资料涉及的杂草种类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" placeholder="请输入资料内容摘要" />
        </el-form-item>
        <el-form-item label="封面图片" placeholder="请输入资料内容摘要">
          <el-image class="img-info">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="资料文件" prop="resource">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
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
      rules: {
        name: [
          { required: true, message: '请输入资料名称', trigger: 'blur' }
        ],

        region1: [
          { required: true, message: '请选择资料涉及的杂草种类', trigger: 'change' }
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
  .img-info{
    height: 200px;
    width: 300px;
    ::v-deep.image-slot{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 24px;
  }
  }

}
}
</style>
