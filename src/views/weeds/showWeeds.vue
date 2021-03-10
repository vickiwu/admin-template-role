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
        <el-form-item label="名称" prop="name" placeholder="请输入杂草名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="拉丁名称" placeholder="请输入杂草拉丁名称">
          <el-input v-model="form.name2" />
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
        <el-form-item label="特征描述" placeholder="请输入杂草危害特征描述">
          <el-input v-model="form.desc2" type="textarea" :rows="4" />
        </el-form-item>

        <el-form-item label="图片" prop="resource">
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
        <el-form-item label="区域" prop="region1">
          <el-col :span="17">
            <el-input v-model="form.region1" placeholder="" />
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left:20px" type="primary">  地图查看</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="状态" placeholder="请输入杂草状态">
          <el-input v-model="form.desc2" :rows="4" />
        </el-form-item>
        <el-form-item label="研判意见" placeholder="请输入杂草研判意见">
          <el-input v-model="form.desc2" />
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
        name: '',
        name2: '',
        desc: '',
        desc2: '',
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
