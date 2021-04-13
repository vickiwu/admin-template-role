<template>
  <div class="app-container">
    <el-button type="primary" class="go-back-btn" @click="goBack">返回上一级</el-button>
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
        <el-form-item label="发现区域" prop="discReg">
          <!-- <el-select
            v-model="formWeed.discReg"
            clearable
            collapse-tags

            placeholder="请选择发现地域"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select> -->
          <el-row type="flex" justify="space-between">
            <!--  v-model="formWeed.discReg" -->
            <el-col :span="11">
              <el-select
                v-model="formWeed.discReg[0]"
                placeholder="请选择省"
                clearable
                @change="selectOne"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"

                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-select
                v-model="formWeed.discReg[1]"
                clearable
                placeholder="请选择市"
                @change="selectSecond"
              >
                <el-option
                  v-for="item in tempList"
                  :key="item"
                  clearable
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>

          </el-row>
        </el-form-item>
        <el-form-item label="种类" prop="specy">

          <el-row type="flex" justify="space-between">
            <el-col :span="20">
              <el-select-tree
                v-model="selectId"
                style="width:100%"
                placeholder="请选择杂草所属种类"
                clearable
                :props="treeProps"
                :load="loadNode"
                lazy
                :check-strictly="true"
                @change="changeSpecy"
              />

            </el-col>
            <el-col :span="3" style="text-align:right">
              <el-button type="primary" @click="addSpecy">添加种类</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="检疫地位" prop="jydw">
          <el-select v-model="formWeed.jydw" clearable placeholder="请选择杂草检疫地位">
            <!-- <el-option label="未发现有害生物" :value="0" /> -->
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <!-- <el-option label="非鉴定性有害生物" :value="3" /> -->
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
        <!-- <el-form-item label="检疫地位" prop="jydw">
          <el-select v-model="formWeed.jydw" clearable placeholder="请选择检疫地位">
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
          </el-select>
        </el-form-item> -->
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
import ElSelectTree from 'el-select-tree'
import { uploadImg, getSpecLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'
import { commit } from '@/api/yanpan'
// const cityJson = require('@/assets/json/cities.json')
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}

export default {
  components: {
    ElSelectTree
  },
  data() {
    const validateReg = (rule, value, callback) => {
      if (this.formWeed.discReg[0] === '' || this.formWeed.discReg[1] === '') {
        callback(new Error('请选择发现区域'))
      }
      callback()
    }
    return {
      // cityJson: cityJson.cityies,
      provinceList: provinceList,
      // value1: '广西省',
      // value2: '',
      tempList: provinceJson['广西省'],
      isEdit: true,
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
      selectId: '',
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb'
      },
      fileList: [],
      rules: {
        nameCn: [
          { required: true, message: '请输入杂草名称', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入杂草来源', trigger: 'blur' }
        ],
        discReg: [
          { required: true, validator: validateReg, trigger: 'change' }
        ],
        specy: [
          { required: true, message: '请选择杂草所属种类', trigger: 'change' }
        ],
        jydw: [
          { required: true, message: '请选择杂草检疫地位', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    // this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formWeed = this.$route.params.rowData
      if (this.isEdit && this.formWeed.specy) {
        // this.selectId = this.formWeed.specy.id
        if (this.formWeed.specy.lb1) {
          if (this.formWeed.specy.lb2) {
            if (this.formWeed.specy.lb3) {
              this.selectId = this.formWeed.specy.lb3
            } else {
              this.selectId = this.formWeed.specy.lb2
            }
          } else {
            this.selectId = this.formWeed.specy.lb1
          }
        }
      }
      if (this.isEdit && this.formWeed.piclist && this.formWeed.piclist !== 0) {
        this.formWeed.piclist.map((item) => {
          const file = {}
          file.name = item.create
          file.url = item.httpUrl
          this.fileList.push(file)
        })
      }
    }
  },
  methods: {
    addSpecy() {
      this.$router.push({
        name: 'Category',
        params: {
          isAdd: true
        }
      })
    },
    goBack() {
      this.$router.go('-1')
    },
    selectOne(params) {
      this.formWeed.discReg = []
      this.formWeed.discReg = [params]
      this.tempList = provinceJson[params]
    },
    selectSecond(params) {
      this.formWeed.discReg[1] = params
    },
    changeSpecy(val, data) {
      if (data) {
        const specy = data.data
        this.formWeed.specy = JSON.stringify(specy)
      } else {
        this.formWeed.specy = ''
      }
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
    async loadNode(node, resolve) {
      const params = { count: 1000, start: 0 }
      if (node.level === 0) { // 目
        const arr = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb1, data: item }
          })
        }).catch(err => err)
        return resolve(arr)
      }
      if (node.level === 1) { // 科 lb1
        params.lb1 = node.data.lb
        const arr2 = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb2, data: item }
          })
        }).catch(err => err)
        return resolve(arr2)
      }
      if (node.level === 2) { // 属 lb1 lb2
        params.lb1 = node.data.data.lb1
        params.lb2 = node.data.data.lb2
        const arr3 = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb3, data: item }
          })
        }).catch(err => err)
        return resolve(arr3)
      }
      if (node.level > 2) {
        return resolve([])
      }
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
      }).catch(err => err)
    },
    reject() {
      // 驳回
      const params = {
        taskId: this.$route.params.taskId,
        bohui: 1,
        jydw: this.formWeed.jydw,
        comment: this.formWeed.comment,
        zacaoJson: JSON.stringify(this.formWeed)
      }
      commit(params).then(data => {
        if (data.state === 1) {
          this.$alert('研判成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        }
        this.$router.push({
          name: 'ExpertJudge'
        })
      }).catch(err => err)
    },
    onSubmit() {
      // 提交
      const params = {
        taskId: this.$route.params.taskId,
        bohui: 0,
        jydw: this.formWeed.jydw,
        comment: this.formWeed.comment,
        zacaoJson: JSON.stringify(this.formWeed)
      }
      commit(params).then(data => {
        if (data.state === 1) {
          this.$alert('研判成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        }
        this.$router.push({
          name: 'ExpertJudge'
        })
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back-btn{
  margin-left: 20px ;
  margin-bottom: 15px;
}
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
