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

        <el-form-item label="图片" prop="piclistJson">

          <el-upload
            class="upload-demo"
            drag
            :on-remove="handleRemove"
            action="string"
            :http-request="uploadImg"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>

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
import { uploadImg, create, edit, getLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'
const cityJson = require('@/assets/json/cities.json')

export default {

  data() {
    return {
      cityJson: cityJson.cityies,
      isEdit: false,
      dialogVisible: false,

      formWeed: {
        nameCn: '',
        nameLt: '',
        source: '',
        discReg: [],
        specy: '',
        jydw: '',
        desc: '',
        piclistJson: '',
        piclist: []
      },
      options: [],
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
    console.log('%c 🧀 this.$route.params.isEdit: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', this.$route.params.isEdit)
    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formWeed = this.$route.params.rowData
    }
    this.getLbPage()
  },
  methods: {
    changea(val) {
      // console.log('%c 🍔 val: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', val)
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
    async create() {
      const params = JSON.parse(JSON.stringify(this.formWeed))
      params.specy = JSON.parse(params.specy)
      await create({ json: JSON.stringify(clean(params)) }).then((data) => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
        }
      })
    },
    async edit() { // id 必须存在
      const params = JSON.parse(JSON.stringify(this.formWeed))
      await edit({ json: JSON.stringify(params) }).then((data) => {
        console.log('%c 🍼️ data: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', data)
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log('%c 🌮 file: ', 'font-size:20px;background-color: #FCA650;color:#fff;', file)
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
