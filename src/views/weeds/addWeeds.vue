<template>
  <div class="app-container">
    <div class="news-title">杂草管理 <span class="news-sub">/</span> <span class="news-sub-title">

      {{ !isEdit ? '杂草录入' : '杂草编辑' }}
    </span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="formWeed"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="名称" prop="nameCn" placeholder="请输入杂草名称">
          <el-input v-model="formWeed.nameCn" />
        </el-form-item>
        <el-form-item label="拉丁名称" placeholder="请输入杂草拉丁名称">
          <el-input v-model="formWeed.nameLt" />
        </el-form-item>
        <el-form-item label="来源" prop="source" placeholder="请输入杂草来源">
          <el-input v-model="formWeed.source" />
        </el-form-item>
        <el-form-item label="区域" prop="discRegJson">
          <el-select v-model="formWeed.discRegJson" placeholder="请选择发现地域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="种类" prop="specyJson">
          <el-select v-model="formWeed.specyJson" placeholder="请选择杂草所属种类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="危害程度" prop="jydw">
          <el-select v-model="formWeed.jydw" placeholder="请选择杂草危害程度">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="特征描述" placeholder="请输入杂草危害特征描述">
          <el-input v-model="formWeed.desc" type="textarea" :rows="4" />
        </el-form-item>

        <el-form-item label="图片" prop="piclistJson">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
      isEdit: false,
      dialogImageUrl: '',
      dialogVisible: false,
      formWeed: {
        nameCn: '',
        nameLt: '',
        source: '',
        discRegJson: '',
        specyJson: '',
        jydw: '',
        desc: '',
        piclistJson: ''
      },
      rules: {
        nameCn: [
          { required: true, message: '请输入杂草名称', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入杂草来源', trigger: 'blur' }
        ],
        discRegJson: [
          { required: true, message: '请选择杂草区域', trigger: 'change' }
        ],
        specyJson: [
          { required: true, message: '请选择杂草所属种类', trigger: 'change' }
        ],
        jydw: [
          { required: true, message: '请选择杂草危害程度', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) {
      // this.formWeed = this.$route.params.rowData
    }
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
