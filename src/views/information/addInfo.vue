<template>
  <div class="app-container">
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

          <el-select-tree
            v-model="selectId"
            style="width:100%"
            placeholder="请选择杂草所属种类"
            clearable
            :data="options"
            :props="treeProps"
            size="medium"
            @change="changeSpecy"
          />
        </el-form-item>
        <el-form-item label="资料介绍" prop="desc">
          <el-input v-model="formZilao.desc" type="textarea" :rows="4" placeholder="请输入资料内容摘要" />
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            class="avatar-uploader"
            action="string"
            :http-request="uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar">
              <!-- :src="formZilao.cover" -->
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <div v-else class="avatar-uploader-icon">
              <i class="el-icon-plus " />
            </div>

          </el-upload>

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
            :on-preview="handlePreview"
            :file-list="fileList"
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
import { uploadAvatar } from '@/api/admin'
import ElSelectTree from 'el-select-tree'

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      isEdit: false,
      fileData: null,
      imageUrl: '',
      fileList: [],
      formZilao: {
        name: '', // 资料名称
        desc: '', // 资料介绍
        specy: '', // 杂草种类对象字符串
        cover: '', // 封面图片 文件对象
        filelist: [] // 文件对象数组
      },
      rules: {
        name: [
          { required: true, message: '请输入资料名称', trigger: 'blur' }
        ],

        specy: [
          { required: true, message: '请选择资料涉及的杂草种类', trigger: 'change' }
        ]

      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      options: [] // 格式化后的杂草类别
    }
  },
  mounted() {
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formZilao = this.$route.params.rowData
      this.imageUrl = this.$route.params.rowData.cover && this.$route.params.rowData.cover.httpUrl
      this.filelist = this.formZilao.filelist
      if (this.isEdit && this.formZilao.specy) {
        this.selectId = this.formZilao.specy.id
      }
      const arr = []
      this.formZilao.filelist.forEach((element, idx) => {
        arr.push({
          ...element,
          name: `文件${idx + 1}`,
          url: element['httpUrl']
        })
      })
      this.fileList = arr
    }
    this.getLbPage()
  },
  methods: {
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formZilao.specy = JSON.stringify(specy)
    },
    async getLbPage() {
      // 获取杂草类别
      const params = { cunt: 1000, start: 0 }
      await getLbPage(clean(params)).then((res) => {
        var all = new Map()
        const { data } = res
        this.specyList = data.lblist
        data.lblist.map((item) => {
          const result = data.lblist.filter((item2) => {
            return item2.lb1 === item.lb1
          })
          all.set(item.lb1, result)
        })
        for (const [k, v] of all) {
          const obj = {}
          obj.lb2 = k
          obj.option = v
          this.options.push(obj)
        }
      })
    },
    async create() {
      const params = JSON.parse(JSON.stringify(this.formZilao))
      params.specy = JSON.parse(params.specy)
      // if (params.filelist.length !== 0) {
      //   params.filelist = JSON.stringify(params.filelist)
      // }
      await create({ json: JSON.stringify(clean(params)) }).then((data) => {
        if (data.state === 1) {
          this.$alert('新增成功！', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    async edit() { // id 必须存在
      const params = JSON.parse(JSON.stringify(this.formZilao))
      // if (params.filelist.length !== 0) {
      //   params.filelist = JSON.stringify(params.filelist)
      // }
      await edit({ json: JSON.stringify(params) }).then((data) => {
        if (data.state === 1) {
          this.$alert('修改成功！', {
            confirmButtonText: '确定'
          })
          // 修改成功后返回上一页面
          this.$router.go(-1)
        }
      })
    },
    async uploadFile(file) { // 资料文件上传
      const params = new FormData()
      params.append('file', file.file)
      uploadFile(params).then((res) => {
        const { data } = res
        // 存入表单数据中
        this.formZilao.filelist.push(data.result)
      })
    },
    async uploadAvatar(file) { // 封面图片上传
      const params = new FormData()
      params.append('file', file.file)
      const { data } = await uploadAvatar(params)
      this.fileData = data.result // 返回的是表单格式
      this.formZilao.cover = data.result // 存入表单数据中
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handlePreview(file) {
      if (file.raw) {
        const url = URL.createObjectURL(file.raw)
        window.open(url)
      } else {
        window.open(file.httpUrl)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$alert('上传图片只能是 JPG 或者PNG 格式!', {
          confirmButtonText: '确定'
        })
      }
      if (!isLt2M) {
        this.$alert('上传图片大小不能超过 2MB!', {
          confirmButtonText: '确定'
        })
      }
      return isJPG && isLt2M
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
        this.$alert('上传文件只能是 PDF 格式!', {
          confirmButtonText: '确定'
        })
      }

      return isPDF
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.formZilao.filelist = fileList
    }
  }
}
</script>
<style>

.upload-demo .el-upload__tip {
  color: #999
}
.upload-demo .el-upload-list__item-name {
  font-size: 16px;
}
</style>
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
  .avatar {
    width: 178px;
    height: 178px;
  }
  .avatar-uploader-icon{
    width: 138px;
    height: 138px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    font-size: 18px;
  }
}
}
</style>
