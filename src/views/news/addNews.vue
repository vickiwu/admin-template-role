<template>
  <div class="app-container">
    <div class="news-title">新闻中心 <span class="news-sub">/</span> <span class="news-sub-title">新闻发布</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="标题" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="可见性" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="可见" />
            <el-radio label="不可见" />
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
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
.news-title {
  height: 35px;
  // line-height: 35px;
  .news-sub{
    display: inline-block;
    margin: 0 5px;

  }
  .news-sub-title{
    display: inline-block;
    color: #97a8be;
  }
}
.news-card {
.news-form{
  width: 80%;
  margin: 15px auto;
  .btn-center{
    text-align: center;
    ::v-deep.el-button{
      margin: 0 15px;
    }
  }
}
}
</style>
