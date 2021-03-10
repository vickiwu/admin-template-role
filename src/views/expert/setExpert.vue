<template>
  <div class="app-container">
    <div class="news-title">专家中心 <span class="news-sub">/</span> <span class="news-sub-title">调度设置</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="调度模式：" prop="resource">
          <el-radio-group v-model="form.name">
            <el-radio label="人工调度" />
            <el-radio label="自动调度" />
          </el-radio-group>
        </el-form-item>

        <el-form-item>
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
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择杂草所属科', trigger: 'blur' }
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
  width: 50%;
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
