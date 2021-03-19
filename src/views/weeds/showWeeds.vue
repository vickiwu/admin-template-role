<template>
  <div class="app-container">
    <div class="news-title">杂草管理 <span class="news-sub">/</span> <span class="news-sub-title">杂草详情</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="名称">
          {{ form.nameCn }}
        </el-form-item>
        <el-form-item label="拉丁名称" placeholder="请输入杂草拉丁名称">

          {{ form.nameLt }}
        </el-form-item>
        <el-form-item label="来源" prop="source" placeholder="请输入杂草来源">
          {{ form.source }}
        </el-form-item>
        <el-form-item label="区域" prop="discReg">
          {{ form.discReg }}
        </el-form-item>
        <el-form-item label="种类" prop="specyJson">
          {{ form.specyJson }}
        </el-form-item>
        <el-form-item label="危害程度" prop="state">
          {{ form.state }}
        </el-form-item>
        <el-form-item label="特征描述" placeholder="请输入杂草危害特征描述">
          {{ form.desc }}
        </el-form-item>

        <el-form-item label="图片" prop="resource">

          <img width="100%" :src="dialogImageUrl" alt="">
        </el-form-item>
        <el-form-item label="区域" prop="region1">
          <el-col :span="17">
            {{ form.discReg }}
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left:20px" type="primary">  地图查看</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="状态" placeholder="请输入杂草状态">
          {{ form.state }}
        </el-form-item>
        <el-form-item label="研判意见" placeholder="请输入杂草研判意见">
          {{ form.jydw }}
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {

  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {

      }

    }
  },
  mounted() {
    console.log(this.$route.params, 'sss')
    this.form = { ...this.$route.params.rowData }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
