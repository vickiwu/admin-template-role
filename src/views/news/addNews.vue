<template>
  <div class="app-container">
    <div class="news-title">新闻中心 <span class="news-sub">/</span> <span class="news-sub-title">{{ !isEdit ? '新闻发布' : '新闻编辑' }}</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="formNews"
        :model="formNews"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formNews.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="formNews.content" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="可见性" prop="state">
          <el-radio-group v-model="formNews.state">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">可见</el-radio>
            <el-radio :label="-1">不可见</el-radio>
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
import { create, edit } from '@/api/xinwen'
import { clean } from '@/utils/index'
export default {

  data() {
    return {
      isEdit: false,
      formNews: {
        title: '',
        state: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) {
      this.formNews = this.$route.params.rowData
    }
  },
  methods: {
    async edit() {
      await edit({ json: JSON.stringify(this.formNews) }).then((data) => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
    },
    async create() {
      await create({ json: JSON.stringify(clean(this.formNews)) }).then((data) => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
        }
      })
    },
    onSubmit() {
      if (this.isEdit) {
        this.edit()
      } else {
        this.create()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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
