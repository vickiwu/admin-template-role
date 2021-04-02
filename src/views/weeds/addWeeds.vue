<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="formWeed"
        label-width="120px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="名称" prop="nameCn">
          <el-input v-model="formWeed.nameCn" placeholder="请输入杂草名称" />
        </el-form-item>
        <el-form-item label="拉丁名称" prop="nameLt">
          <el-input v-model="formWeed.nameLt" placeholder="请输入杂草拉丁名称" />
        </el-form-item>
        <el-form-item label="来源国家/区域" prop="source" placeholder="请输入杂草来源国家/区域">
          <!-- <el-input v-model="formWeed.source" /> -->
          <el-select
            v-model="formWeed.source"
            clearable

            placeholder="请输入杂草来源国家/区域"
          >
            <el-option
              v-for="item in countryJson"
              :key="item[1]"
              :label="item[1]"
              :value="item[1]"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发现区域" prop="discReg">

          <el-row type="flex" justify="space-between">
            <!--  v-model="formWeed.discReg" -->
            <el-col :span="11">
              <el-select
                v-model="value1"
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
                v-model="value2"
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
          <el-select-tree
            v-model="selectId"
            style="width:100%"
            placeholder="请选择杂草所属种类"
            clearable
            :data="options"
            :props="treeProps"

            @change="changeSpecy"
          />

        </el-form-item>
        <el-form-item label="检疫地位" prop="jydw">
          <el-select v-model="formWeed.jydw" clearable placeholder="请选择杂草危害程度">
            <!-- <el-option label="未发现有害生物" :value="0" /> -->
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <!-- <el-option label="非鉴定性有害生物" :value="3" /> -->
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <!-- 112.2222 -->
            <el-form-item label="经度" prop="lng" placeholder="请输入杂草经度" style="margin-bottom:18px">
              <el-input v-model="formWeed.lng" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- 23.2222 -->
            <el-form-item label="纬度" prop="lat" placeholder="请输入杂草纬度">
              <el-input v-model="formWeed.lat" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- 23.2222 -->
            <el-button type="primary" @click="chooseByMap">地图选择</el-button>
          </el-col>
        </el-row>

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
        <el-form-item class="btn-center">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      title="地图"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <baidu-map
        ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
        class="bm-view"
        :zoom="10"
        :center="home"
        :map-click="false"
        :scroll-wheel-zoom="true"
        @click="handleMapClick"
      >
        <bm-marker :position="{lng: formWeed.lng, lat: formWeed.lat}" />
      </baidu-map>
    </el-dialog>

  </div>
</template>

<script>
import { uploadImg, create, edit, getLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}
const countryJson = require('@/assets/json/country.json')
import ElSelectTree from 'el-select-tree'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { mapGetters } from 'vuex'
import { BmMarker } from 'vue-baidu-map'

export default {
  components: {
    ElSelectTree,
    BaiduMap,
    BmMarker
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    // 验证经度输入范围在-180-180之间，且小数可7位
    const checkLong = (rule, value, callback) => {
      if (value) {
        value += ''
        if (value.match(/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,7})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/)) {
          callback()
        } else {
          callback(new Error('经度为-180~180,小数7位!'))
        }
      } else {
        callback()
      }
    }
    // 验证纬度输入范围在-180-180之间，且小数可7位
    const checkLat = (rule, value, callback) => {
      if (value) {
        value += ''
        if (value.match(/^(\-|\+)?([0-8]?\d{1}\.\d{0,7}|90\.0{0,6}|[0-8]?\d{1}|90)$/)) {
          callback()
        } else {
          callback(new Error('纬度为-90~90,小数7位'))
        }
      } else {
        callback()
      }
    }
    const validateReg = (rule, value, callback) => {
      if (this.value1 === '' || this.value2 === '') {
        callback(new Error('请选择发现区域'))
      }
      callback()
    }
    return {
      countryJson: countryJson,
      provinceList: provinceList,
      value1: '广西省',
      value2: '',
      tempList: provinceJson['广西省'],
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
        lng: '',
        lat: ''
      },
      options: [],
      fileList: [],
      rules: {
        nameCn: [
          { required: true, message: '请输入杂草名称', trigger: 'blur' }
        ],
        nameLt: [
          { required: true, message: '请输入杂草拉丁名称', trigger: 'blur' }
        ],
        lng: [{ validator: checkLong, length: 18, trigger: 'blur' }],
        lat: [{ validator: checkLat, length: 18, trigger: 'blur' }],
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
          { required: true, message: '请选择杂草危害程度', trigger: 'change' }
        ]
      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'home'
    ])
  },
  mounted() {
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false

    if (this.$route.params.rowData) { // 跳转页面的时候携带id及数据元进入
      this.formWeed = this.$route.params.rowData
      if (this.isEdit && this.formWeed.specy) {
        this.selectId = this.formWeed.specy.id
      }
      if (this.isEdit) {
        if (this.formWeed.piclist && this.formWeed.piclist !== 0) {
          this.formWeed.piclist.map((item) => {
            const file = {}
            file.name = item.create
            file.url = item.httpUrl
            this.fileList.push(file)
          })
        }
        if (this.formWeed.lat) {
          this.formWeed.lat = this.formWeed.lat / 10000000
        }
        if (this.formWeed.lng) {
          this.formWeed.lng = this.formWeed.lng / 10000000
        }
      }
    }
    this.getLbPage()
  },
  methods: {
    selectOne(params) {
      this.formWeed.discReg = []
      this.formWeed.discReg.push(params)
      this.value2 = ''
      this.tempList = provinceJson[params]
    },
    selectSecond(params) {
      this.formWeed.discReg.push(params)
    },
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formWeed.specy = JSON.stringify(specy)
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
      }).catch(err => err)
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
    async create() {
      const params = JSON.parse(JSON.stringify(this.formWeed))
      params.specy = JSON.parse(params.specy)
      params.lat = params.lat * Math.pow(10, 7)
      params.lng = params.lng * Math.pow(10, 7)
      await create({ json: JSON.stringify(clean(params)) }).then((data) => {
        if (data.state === 1) {
          this.$alert('新增成功', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              // 清空表单
              this.formWeed = {
                nameCn: '',
                nameLt: '',
                source: '',
                discReg: [],
                specy: '',
                jydw: '',
                desc: '',
                piclistJson: '',
                piclist: [],
                lng: '',
                lat: ''
              }
              this.fileList = []
              this.selectId = ''
            }
          })
        }
      }).catch(err => err)
    },
    async edit() { // id 必须存在
      const params = JSON.parse(JSON.stringify(this.formWeed))
      params.lat = params.lat * Math.pow(10, 7)
      params.lng = params.lng * Math.pow(10, 7)
      await edit({ json: JSON.stringify(params) }).then((data) => {
        if (data.state === 1) {
          this.$alert('修改成功', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              // 修改成功后跳转回管理页面
              this.$router.push({
                name: 'Weeds'
              })
            }
          })
        }
      }).catch(err => err)
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.edit()
          } else {
            this.create()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    chooseByMap() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleMapClick({ point }) {
      this.formWeed = {
        ...this.formWeed,
        ...point
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 500px;
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
<style>
.BMap_cpyCtrl {
    display:none;
}

.anchorBL{
    display:none;
}
</style>

