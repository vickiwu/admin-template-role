<template>
  <div class="app-container">
    <div class="news-title">杂草管理 <span class="news-sub">/</span> <span class="news-sub-title">杂草录入</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name" placeholder="请输入杂草名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="来源" prop="name" placeholder="请输入杂草来源">
          <el-input v-model="form.from" />
        </el-form-item>
        <el-form-item label="区域" prop="region1">
          <el-select v-model="form.region1" placeholder="请选择发现地域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="种类" prop="region2">
          <el-select v-model="form.region2" placeholder="请选择杂草所属种类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="危害程度" prop="region3">
          <el-select v-model="form.region3" placeholder="请选择杂草危害程度">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="危害说明" prop="desc" placeholder="请输入杂草危害详细说明">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="图片" prop="resource">
          图片上传
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
}
}
</style>
