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
          <el-input v-model="formWeed.nameCn" placeholder="请输入实蝇名称" />
        </el-form-item>
        <el-form-item label="拉丁名称" prop="nameLt">
          <el-input v-model="formWeed.nameLt" placeholder="请输入实蝇拉丁名称" />
        </el-form-item>
        <!-- <el-form-item label="来源国家/区域" prop="source" placeholder="请输入实蝇来源国家/区域">
          <el-select
            v-model="formWeed.source"
            clearable

            placeholder="请输入实蝇来源国家/区域"
          >
            <el-option
              v-for="item in countryJson"
              :key="item[1]"
              :label="item[1]"
              :value="item[1]"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="发现区域" prop="discReg">

          <el-row type="flex" justify="space-between">
            <!--  v-model="formWeed.discReg" -->
            <el-col :span="11">
              <el-select
                v-model="value1"
                placeholder="请选择省"
                clearable
                disabled
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
          <el-row type="flex" justify="space-between">
            <el-col :span="20">
              <el-select-tree
                v-model="selectId"
                style="width:100%"
                placeholder="请选择实蝇所属种类"
                clearable
                :props="treeProps"
                :load="loadNode"
                :data="treeData"
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
          <el-select v-model="formWeed.jydw" clearable placeholder="请选择实蝇危害程度">
            <!-- <el-option label="未发现有害生物" :value="0" /> -->
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <!-- <el-option label="非鉴定性有害生物" :value="3" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="formWeed.number" />
        </el-form-item>
        <el-form-item label="采集人" prop="caijiren">
          <el-input v-model="formWeed.caijiren" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <!-- 112.2222 -->
            <el-form-item label="经度" prop="lng" placeholder="请输入实蝇经度" style="margin-bottom:18px">
              <el-input v-model="formWeed.lng" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- 23.2222 -->
            <el-form-item label="纬度" label-width="50px" prop="lat" placeholder="请输入实蝇纬度">
              <el-input v-model="formWeed.lat" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4" style="text-align:right">
            <el-button type="primary" @click="chooseByMap">地图选择</el-button>
          </el-col> -->
        </el-row>
        <el-form-item label="发现时间" prop="discTime">
          <el-date-picker
            v-model="formWeed.discTime"
            style="width: 100%"
            type="datetime"
            value-format="timestamp"
            placeholder="请选择发现时间"
          />
        </el-form-item>

        <el-form-item label="特征描述">
          <el-input v-model="formWeed.desc" type="textarea" :rows="4" placeholder="请输入实蝇危害特征描述" />
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            action="string"
            multiple
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
          <el-button type="primary" style="padding:7px 25px;font-size: 13px;" @click="onSubmit">提 交</el-button>
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
        :zoom="15"
        :center="home"
        :map-click="false"
        :scroll-wheel-zoom="true"
        @click="handleMapClick"
      >
        <bm-marker :position="{lng: formWeed.lng, lat: formWeed.lat}" />
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />
        <!-- <bm-navigation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :enable-geolocation="false"
          :offset="{ width: 5, height: 105 }"
          :show-zoom-info="false"
        />
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :show-address-bar="false"
          :offset="{ width: 28, height: 70 }"
          :auto-location="true"
        />
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']"
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          type="BMAP_MAPTYPE_CONTROL_MAP"
          :offset="{ width: 15, height: 5 }"
        /> -->
      </baidu-map>
    </el-dialog>
    <el-dialog
      title="添加种类"
      :visible.sync="dialogVisibleTree"
      append-to-body
      width="60%"
      :before-close="handleCloseTree"
    >
      <category :has-class="false" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg, create, edit, getSpecLbPage } from '@/api/zacao'
import { clean } from '@/utils/index'
import category from '@/views/weeds/category'
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}
const countryJson = require('@/assets/json/country.json')
import ElSelectTree from 'el-select-tree'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { mapGetters } from 'vuex'
import { BmMarker,
  // BmNavigation,
  BmGeolocation,
  BmMapType } from 'vue-baidu-map'

export default {
  components: {
    ElSelectTree,
    category,
    BaiduMap,
    BmMarker,
    // BmNavigation,
    BmGeolocation,
    BmMapType
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
      dialogVisibleTree: false,
      treeData: [],
      countryJson: countryJson,
      provinceList: provinceList,
      value1: '广西省',
      value2: '',
      tempList: provinceJson['广西省'],
      isEdit: false,
      dialogImageUrl: '', // 预览图片地址
      dialogImageVisible: false, // 图片的预览模态框
      formWeed: {
        number: '',
        caijiren: '',
        nameCn: '',
        nameLt: '',
        source: '中国',
        discReg: ['广西省'],
        specy: '',
        jydw: '',
        desc: '',
        discTime: '',
        piclistJson: '',
        piclist: [],
        lng: '',
        lat: '',
        capType: 2, // 录入方式，
        cat: 1
      },
      fileList: [],
      rules: {
        discTime: [
          { required: true, message: '请选择发现时间', trigger: 'change' }
        ],
        nameCn: [
          { required: true, message: '请输入实蝇名称', trigger: 'blur' }
        ],
        nameLt: [
          { required: true, message: '请输入实蝇拉丁名称', trigger: 'blur' }
        ],
        lng: [{ validator: checkLong, length: 18, trigger: 'blur' }],
        lat: [{ validator: checkLat, length: 18, trigger: 'blur' }],
        source: [
          { required: true, message: '请输入实蝇来源', trigger: 'blur' }
        ],
        discReg: [
          { required: true, validator: validateReg, trigger: 'change' }
        ],
        specy: [
          { required: true, message: '请选择实蝇所属种类', trigger: 'change' }
        ],
        jydw: [
          { required: true, message: '请选择实蝇危害程度', trigger: 'change' }
        ]
      },
      selectId: '',
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb'
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
    this.loadTreeData()
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
          this.formWeed.lat = (this.formWeed.lat / 10000000).toFixed(7)
        }
        if (this.formWeed.lng) {
          this.formWeed.lng = (this.formWeed.lng / 10000000).toFixed(7)
        }
      }
    }
  },
  methods: {
    handleCloseTree() {
      this.loadTreeData()
      this.dialogVisibleTree = false
    },
    addSpecy() {
      this.dialogVisibleTree = true
      // this.$router.push({
      //   name: 'Category',
      //   params: {
      //     isAdd: true
      //   }
      // })
    },
    selectOne(params) {
      this.formWeed.discReg = []
      this.formWeed.discReg[0] = params
      this.value2 = ''
      this.tempList = provinceJson[params]
    },
    selectSecond(params) {
      this.formWeed.discReg[1] = params
      // this.formWeed.discReg.push(params)
    },

    changeSpecy(val, data) {
      if (data) {
        const specy = data.data
        this.formWeed.specy = JSON.stringify(specy)
      } else {
        this.formWeed.specy = ''
      }
    },
    async loadTreeData() {
      const params = { count: 1000, start: 0 }
      const arr = await getSpecLbPage(clean(params)).then((res) => {
        return res.data.lblist.map(item => {
          return { id: item.id, lb: item.lb1, data: item }
        })
      }).catch(err => err)
      this.treeData = arr
    },
    async loadNode(node, resolve) {
      const params = { count: 1000, start: 0 }
      // if (node.level === 0) { // 目
      //   const arr = await getSpecLbPage(clean(params)).then((res) => {
      //     return res.data.lblist.map(item => {
      //       return { id: item.id, lb: item.lb1, data: item }
      //     })
      //   }).catch(err => err)
      //   return resolve(arr)
      // }
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
                lat: '',
                capType: 2,
                cat: 1
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
      params.specy = JSON.parse(params.specy)
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
          // console.log('error submit!!')
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
::v-deep.el-dialog__body{
  padding:0 20px;
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

