<template>
  <div class="app-container">
    <div class="blue-bg" @click="jumpManageMent()">
      <svg-icon icon-class="zhuanjiaguanli" class="bg-icon" />
      专家管理
    </div>
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">待研判杂草列表：</span>
        </el-col>
        <!-- <el-col :span="4">
          <el-select
            v-model="formInline.reg"
            clearable
            placeholder="所有区域"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col> -->
        <el-col :span="3">
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
        <el-col :span="3">
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
        <el-col :span="4">
          <el-select-tree
            v-model="selectId"
            width="120px"
            placeholder="所有种类"
            clearable
            :props="treeProps"
            :load="loadNode"
            lazy
            :check-strictly="true"
            @change="changeSpecy"
          />

        </el-col>
        <el-col :span="5">
          <el-input
            v-model="formInline.name"

            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" @click="query">检索</el-button>
          <el-button type="primary" @click="query">刷新</el-button>
          <!-- <el-button type="danger"  >忽略</el-button> -->
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
      >

        <el-table-column label="选择" align="center" width="50">
          <template slot-scope="scope">
            <el-radio
              v-model="radio"
              :label="scope.$index"
              @change.native="getCurrentRow(scope.row)"
            >
              <span />
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="序号"
          width="50"
        >
          <template slot-scope="scope">
            <div>

              {{ scope.$index + 1 + queryPageination.start }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="discReg"
          label="区域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="source"
          label="来源"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="nameCn"
          label="名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="specy"
          label="种类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>
              <span style="margin-right:5px"> {{ scope.row.specy && scope.row.specy.lb1 }}</span>
              <span style="margin-right:5px">{{ scope.row.specy && scope.row.specy.lb2 }}</span>
              <span style="">{{ scope.row.specy && scope.row.specy.lb3 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="危害程度"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.jydw ==0?'未发现有害生物' :scope.row.jydw ==1?'非检疫性有害生物':scope.row.jydw ==2? '检疫性有害生物' :'非鉴定性有害生物' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-image
              v-for="(item) in scope.row.piclist"
              :key="item.httpUrl"
              style="width: 40px; "
              :src="item.httpUrl"
              :preview-src-list="[item.httpUrl]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="realname"
          label="采集人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="上传时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 新 -->
      <el-pagination
        background
        :current-page="pagination.index"
        :page-size="pagination.count"
        :total="totalCount"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ (pagination.index -1 ) * pagination.count + 1 }}至第{{ totalCount > pagination.index * pagination.count ? pagination.index * pagination.count : totalCount }}项结果，共{{ totalCount }}项</span>
        </template>
      </el-pagination>
    </el-card>
    <el-card shadow="always" class="bottom-card">
      <el-row class="report-row" type="flex" justify="space-between">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">专家调度</span>
        </el-col>

        <!-- <el-col :span="10" class="right-btn">
          <el-row :gutter="10">
            <el-col :span="11">
              <span class="row-title">当前调度模式：</span>
            </el-col>
            <el-col :span="11" />
          </el-row>

        </el-col> -->
      </el-row>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
      >
        <el-row :gutter="30">
          <el-col :span="13">
            <el-form-item label="选择专家" prop="name">
              <el-select
                v-model="form.id"
                clearable

                placeholder="请选择一位专家"
                style="width: 100%"
                @change="setZhuanjiaInfo"
              >
                <el-option
                  v-for="item in zhuanjialist"
                  :key="item.id+ item.create"
                  :label="item.realname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="当前调度模式">
              <el-input
                v-model="profScheModeTxt"
                disabled
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="13">
            <el-form-item label="专家介绍" prop="desc">
              <el-input v-model="form.desc" disabled type="textarea" :rows="3" placeholder="该专家详细情况：" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="专家头像" prop="img">
              <el-avatar shape="square" :size="80" :src="form.img" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="btn-center">
            <el-button type="primary" @click="onSubmit">派发</el-button>
          </el-form-item>
        </el-row>

      </el-form>

    </el-card>
  </div>
</template>

<script>
import { getPage, getSpecLbPage } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
import { getSysConfig } from '@/utils/auth'
import { getPage as getZhuanjia } from '@/api/zhuanjia'
import { create } from '@/api/yanpan'
import ElSelectTree from 'el-select-tree'
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}
// import { pageCount } from '@/globalConfig'

// const cityJson = require('@/assets/json/cities.json')

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      // cityJson: cityJson.cityies,
      provinceList: provinceList,
      value1: '', // 广西省
      value2: '',
      tempList: [], // provinceJson['广西省']
      sysConfig: '',
      form: {
        id: '',
        name: '',
        img: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        desc: ''
      },
      formInline: {
        reg: '',
        specy: '',
        name: ''
      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb'
      },
      tableData: [],
      pagination: {
        count: 5,
        index: 1
      },
      totalCount: 0,
      zhuanjialist: [],
      // selected: [],
      multipleSelection: {},
      radio: ''
    }
  },
  computed: {

    queryPageination() {
      return {
        count: this.pagination.count,
        start: (this.pagination.index - 1) * this.pagination.count
      }
    },
    profScheModeTxt() {
      if (this.sysConfig.profScheMode === 1) {
        return '人工调度'
      } else {
        return '系统自动调度'
      }
    }
  },
  mounted() {
    this.sysConfig = JSON.parse(getSysConfig())

    this.query()
    this.queryZhuanjia()
  },
  methods: {
    selectOne(params) {
      this.formInline.reg = ''
      this.formInline.reg = params
      this.tempList = provinceJson[params]
      // this.value2 = provinceJson[params][0]
    },
    selectSecond(params) {
      this.formInline.reg = params
    },
    getCurrentRow(row) {
      this.multipleSelection = row
    },
    changeSpecy(val, data) {
      if (data) {
        const specy = data.data
        this.formInline.specy = JSON.stringify(specy)
      } else {
        this.formInline.specy = ''
      }
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
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const searchParams = JSON.parse(JSON.stringify(this.formInline))
      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams, state: 0 }
      getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    queryZhuanjia() {
      getZhuanjia().then((res) => {
        const { data } = res
        this.zhuanjialist = data.zhuanjialist
      }).catch(err => err)
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    // handleSelectionChange(val) {
    //   this.selected = val
    // },
    setZhuanjiaInfo(val) {
      const zhuanjia = this.zhuanjialist.find(item => item.id === val)
      this.form.desc = zhuanjia.desc
      this.form.img = zhuanjia.avatar && zhuanjia.avatar.httpUrl
    },
    onSubmit() {
      if (JSON.stringify(this.multipleSelection) === '{}') {
        this.$alert('请选择至少一个杂草', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).catch(err => err)
        return
      } else {
        if (!this.form.id) {
          this.$alert('请选择一个专家', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).catch(err => err)
          return
        }
        create({ zhuanjiaId: this.form.id, zacaoId: this.multipleSelection.id }).then((data) => {
          if (data.state === 1) {
            this.$alert('派发成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                this.multipleSelection = {}
                this.radio = ''
                // this.form = {
                //   id: '',
                //   name: '',
                //   img: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                //   desc: ''
                // }
                // 重新查询表格
                this.query()
              }
            })
          }
        }).catch(err => err)
      }
      // if (this.selected.length > 1) {
      //   this.$alert('请选择一个杂草', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   }).catch(err => err)
      //   return
      // }
    },
    jumpManageMent() {
      this.$router.push({
        name: 'ExpertManagement'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.report-row {
  ::v-deep.el-select {
    width: 100%;
  }

}
 .right-btn {
    text-align: right;
    ::v-deep.el-button {
      margin: 0 10px;
    }
  }
  .row-title {
    display: inline-block;
    line-height: 28px;
    color: #0040a2;
  }
.report-table {
  margin: 10px 0;
}
::v-deep.el-pagination {
  text-align: right;
  .slot-span {
    float: left;
  }
}
.bottom-card{
  margin-top: 15px;
  .news-form{
  margin: 15px auto;
  ::v-deep.el-select{
    width: 50%;
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
