<template>
  <div class="app-container">
    <div class="news-title">权限设置 </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="用户" prop="name" placeholder="请选择下属账户">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="访问控制" prop="name" placeholder="请输入杂草来源">
          <el-checkbox-group v-model="checkList">
            <div>
              <el-checkbox label="杂草管理" />
              <el-checkbox label="杂草检索" />
            </div>
            <div>
              <el-checkbox label="资料管理" />
              <el-checkbox label="资料检索" />
            </div>
            <div>
              <el-checkbox label="专家管理" />
              <el-checkbox label="专家检索" />
              <el-checkbox label="专家调度" />
            </div>

            <div>
              <el-checkbox label="新闻管理" />
            </div>

            <div>
              <el-checkbox label="日志管理" />
            </div>

            <div>
              <el-checkbox label="账户管理" />
              <el-checkbox label="账户同步" />
            </div>

            <div>
              <el-checkbox label="文件管理" />
              <el-checkbox label="空间管理" />
            </div>

          </el-checkbox-group>
        </el-form-item>

        <el-form-item class="btn-center">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
      checkList: []
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
