<template>
  <div class="app-container">
    <div class="news-title">专家评判 <span class="news-sub">/</span> <span class="news-sub-title">
      执行研判
    </span>
    </div>
    <el-card shadow="always" class="news-card">
      <el-row style="text-align:center"><h2>杂草研判</h2></el-row>
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
        <el-form-item label="区域" prop="discReg">
          <el-select
            v-model="formWeed.discReg"
            multiple
            collapse-tags
            size="medium"
            placeholder="请选择发现地域"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="种类" prop="specy">
          <el-select v-model="formWeed.specy" placeholder="请选择杂草所属种类" @change="changea">
            <el-option-group
              v-for="group in options"
              :key="group.lb"
              :label="group.lb"
            >
              <el-option
                v-for="item in group.option"
                :key="item.lb2"
                :label="item.lb2"
                :value="JSON.stringify(item)"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="危害程度" prop="jydw">
          <el-select v-model="formWeed.jydw" placeholder="请选择杂草危害程度">
            <el-option label="未发现有害生物" :value="0" />
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <el-option label="非鉴定性有害生物" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="特征描述" placeholder="请输入杂草危害特征描述">
          <el-input v-model="formWeed.desc" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="string"
            :http-request="uploadImg"
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或点击上传</div>
          </el-upload>
          <el-dialog :visible.sync="dialogImageVisible" width="30%">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-row style="text-align:center">
          <h2>专家研判</h2>
        </el-row>
        <el-form-item label="检疫地位" prop="jydw">
          <el-select v-model="formWeed.jydw" placeholder="请选择检疫地位">
            <el-option label="未发现有害生物" :value="0" />
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <el-option label="非鉴定性有害生物" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="研判意见" placeholder="请输入专家研判意见">
          <el-input v-model="formWeed.comment" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item class="btn-center">
          <el-button @click="reject">驳回</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadImg, getLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'
import { commit } from '@/api/yanpan'
const cityJson = require('@/assets/json/cities.json')

export default {

  data() {
    return {
      cityJson: cityJson.cityies,
      isEdit: false,
      dialogImageUrl: '', // 预览图片地址
      dialogImageVisible: false, // 图片的预览模态框
      formWeed: {
        nameCn: '',
        nameLt: '',
        source: '',
        discReg: [],
        specy: '',
        jydw: '',
        desc: '',
        piclistJson: '',
        piclist: [],
        comment: ''
      },
      options: [],
      fileList: [],
      rules: {
        nameCn: [
          { required: true, message: '请输入杂草名称', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入杂草来源', trigger: 'blur' }
        ],
        discReg: [
          { required: true, message: '请选择杂草区域', trigger: 'change' }
        ],
        specy: [
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

    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formWeed = this.$route.params.rowData
      if (this.isEdit && this.formWeed.piclist !== 0) {
        this.formWeed.piclist.map((item) => {
          const file = {}
          file.name = item.create
          file.url = item.httpUrl
          this.fileList.push(file)
        })
      }
    }
    this.getLbPage()
  },
  methods: {
    changea(val) {
    },
    handleRemove(file, fileList) { // 删除图片
      this.fileList = fileList
      // 删除表单中piclist
      this.formWeed.piclist = this.formWeed.piclist.filter(item => {
        return item.create !== file.name
      })
    },
    handlePictureCardPreview(file) { // 预览图片
      this.dialogImageUrl = file.url
      this.dialogImageVisible = true
    },
    async getLbPage() {
      const params = { cunt: 1000, start: 0 }
      await getLbPage(clean(params)).then((res) => {
        var all = new Map()
        const { data } = res
        data.lblist.map((item) => {
          const result = data.lblist.filter((item2) => {
            return item2.lb1 === item.lb1
          })
          all.set(item.lb1, result)
        })
        for (const [k, v] of all) {
          const obj = {}
          obj.lb = k
          obj.option = v
          this.options.push(obj)
        }
      })
    },
    async uploadImg(file) {
      const params = new FormData()
      params.append('file', file.file)
      uploadImg(params).then((res) => {
        const { data } = res
        if (!this.formWeed.piclist) {
          this.formWeed.piclist = []
        }
        this.formWeed.piclist.push(data.result)
      })
    },
    reject() {
      // 驳回
    },
    onSubmit() {
      // 提交
      const params = {
        taskId: this.$route.params.taskId,
        bohui: 0,
        jydw: this.formWeed.jydw,
        comment: this.formWeed.comment
      }
      commit(params).then(data => {
        if (data.state === 1) {
          this.$message.success('研判成功！')
        }
        this.$router.push({
          name: 'ExpertJudge'
        })
      })
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
  ::v-deep.el-upload--picture-card {

    width: 300px;
    height: 148px;

    display: flex;
    justify-content: center;
    align-items: center;
}
}
}

</style>
