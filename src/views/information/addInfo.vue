<template>
  <div class="app-container">
    <div class="news-title">资料管理 <span class="news-sub">/</span> <span class="news-sub-title">
      {{ !isEdit ? '资料录入' : '资料编辑' }}
    </span> </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="formZilao"
        :model="formZilao"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="资料名称" prop="name" placeholder="请输入资料名称">
          <el-input v-model="formZilao.name" />
        </el-form-item>
        <el-form-item label="杂草种类" prop="specy">

          <el-select v-model="formZilao.specy" placeholder="请选择杂草所属种类">
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
        <el-form-item label="资料介绍" prop="desc">
          <el-input v-model="formZilao.desc" type="textarea" :rows="4" placeholder="请输入资料内容摘要" />
        </el-form-item>
        <el-form-item label="封面图片" placeholder="请输入资料内容摘要">
          <el-image class="img-info" :src="formZilao.cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="资料文件" prop="filelist">
          <!-- {{formZilao.filelist}} -->
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            action="string"
            :http-request="uploadFile"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
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
import { create, edit, uploadFile } from '@/api/ziliao'
import { getLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'

export default {

  data() {
    return {
      isEdit: false,
      formZilao: {
        name: '', // 资料名称
        desc: '', // 资料介绍
        specy: '', // 杂草种类对象字符串
        cover: '', // 封面图片 文件对象
        filelist: '' // 文件对象数组
      },
      rules: {
        name: [
          { required: true, message: '请输入资料名称', trigger: 'blur' }
        ],

        specy: [
          { required: true, message: '请选择资料涉及的杂草种类', trigger: 'change' }
        ]

      },
      options: [] // 格式化后的杂草类别
    }
  },
  mounted() {
    console.log(this.$route.params, 'sss')
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formWeed = this.$route.params.rowData
    }
    this.getLbPage()
  },
  methods: {
    async getLbPage() {
      // 获取杂草类别
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
    async create() {
      await create({ json: JSON.stringify(clean(this.formWeed)) }).then((data) => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
        }
      })
    },
    async edit() { // id 必须存在
      await edit({ json: JSON.stringify(this.formWeed) }).then((data) => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
    },
    async uploadFile(file) {
      const params = new FormData()
      params.append('file', file.file)
      uploadFile(params).then((res) => {
        const { data } = res
        this.formWeed.imgList.push(JSON.stringify(data.result))
      })
    },

    onSubmit() {
      if (this.isEdit) {
        this.edit()
      } else {
        this.create()
      }
    },
    // 上传之前验证上传文件 只许上传pdf格式
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf'

      if (!isPDF) {
        this.$message.error('上传文件只能是 PDF 格式!')
      }

      return isPDF
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
  .img-info{
    height: 200px;
    width: 300px;
    ::v-deep.image-slot{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 24px;
  }
  }

}
}
</style>
