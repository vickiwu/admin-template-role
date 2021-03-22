<template>
  <div class="app-container">
    <div class="news-title">杂草管理 <span class="news-sub">/</span> <span class="news-sub-title">杂草详情</span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="名称 ：">
          {{ form.nameCn }}
        </el-form-item>
        <el-form-item label="拉丁名称 ：" placeholder="请输入杂草拉丁名称">

          {{ form.nameLt }}
        </el-form-item>
        <el-form-item label="来源 ：" placeholder="请输入杂草来源">
          {{ form.source }}
        </el-form-item>
        <el-form-item label="区域 ：">
          <span v-for="(item,index) in form.discReg" :key="index" style="margin-right:15px">

            <el-tag>{{ item }}</el-tag>
          </span>

        </el-form-item>
        <el-form-item label="种类 ：">

          <div>
            <span style="margin-right:10px"> {{ form.specy ? form.specy.lb1 +'科' : '' }}</span>
            <span style="margin-left:10px;margin-right:10px">{{ form.specy ? form.specy.lb2 + '属' : "" }}</span>
          </div>

        </el-form-item>
        <el-form-item label="危害程度 ：" prop="jydw">
          {{ form.jydw ==0?'未发现有害生物' :form.jydw ==1?'非检疫性有害生物':form.jydw ==2? '检疫性有害生物' :'非鉴定性有害生物' }}
        </el-form-item>
        <el-form-item label="特征描述 ：" placeholder="请输入杂草危害特征描述">
          {{ form.desc }}
        </el-form-item>

        <el-form-item label="图片 ：" prop="resource">
          <el-image
            v-for="(item) in form.piclist"
            :key="item.httpUrl"
            style="width: 300px; height: 200px"
            :src="item.httpUrl"
            :preview-src-list="[item.httpUrl]"
          />

        </el-form-item>
        <el-form-item label="区域 ：">
          <el-col :span="17">
            <span v-for="(item,index) in form.discReg" :key="index" style="margin-right:15px">
              <el-tag>{{ item }}</el-tag>
            </span>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left ：20px" type="primary">  地图查看</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="状态 ：">
          {{ form.state ==0?'未研判' :form.state ==1?'待进一步确认':'研判完成,入库' }}
        </el-form-item>
        <el-form-item label="研判意见 ：">
          {{ form.comment }}
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
      form: {}

    }
  },
  mounted() {
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
