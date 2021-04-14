<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.startTime"

              type="date"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.endTime"

              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <!-- <el-col :span="3">

          <el-select
            v-model="formSearch.reg"
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
        <el-col :span="2" style="margin-left:2px">
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
        <el-col :span="2" style="margin-left:2px">
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
        <el-col :span="2" style="margin-left:2px">
          <el-select v-model="formSearch.state" clearable placeholder="状态">
            <el-option label="未研判" :value="0" />
            <el-option label="研判中" :value="1" />
            <el-option label="已入库" :value="16" />
            <el-option label="已驳回" :value="-1" />
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-left:2px">

          <el-select-tree
            v-model="selectId"
            style="width:100%"
            placeholder="请选择杂草种类"
            clearable
            :props="treeProps"

            width="120px"
            :load="loadNode"
            lazy
            :check-strictly="true"
            @change="changeSpecy"
          />
        </el-col>
        <el-col :span="3" style="margin-left:2px">
          <el-select v-model="formSearch.jydw" clearable placeholder="检疫地位">
            <!-- <el-option label="未发现有害生物" :value="0" /> -->
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <!-- <el-option label="非鉴定性有害生物" :value="3" /> -->
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-left:2px;">
          <el-input
            v-model="formSearch.name"

            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="3" class="right-btn" style="margin-left:2px;text-align: right;">
          <el-button type="primary" @click="handleSearch()">检索</el-button>
          <el-button type="primary" @click="handleSearch()">刷新</el-button>
          <!-- <el-button type="primary"   @click="handleAdd()">新增</el-button> -->
          <!-- <el-button type="danger"   @click="handleDel">删除</el-button> -->
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
          type="selection"
          label="选择"
          width="50"
        /> -->
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
          label="发现区域"
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
        <!-- 字段inputMethod 值app采集 或手动输入 -->
        <el-table-column
          prop="capType"
          label="采集方式"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <div>
              <span> {{ scope.row.capType===1 ? 'APP采集' : '人工录入' }}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="specy"
          label="涉及杂草种类"
          width="130"
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
          prop="jydw"
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
          prop="piclist"
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
          prop="state"
          label="状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.state == 0 ? '未研判' : scope.row.state == 1 ? '研判中': scope.row.state == -1 ? '驳回':'已入库' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="discTime"
          label="发现时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.discTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create"
          label="上传时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="编辑"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <!-- <span
              style="color: #409EFF;cursor:pointer; margin-right:10px"
              @click="handleDetail(scope.$index, scope.row)"
            >
              查看
            </span> -->
            <span
              style="color: #409EFF;cursor:pointer; margin-right:10px;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
            <span
              style="color: #f78989;cursor:pointer;"
              @click="handleDel( scope.row.id)"
            >
              删除
            </span>
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
    <el-dialog
      title="杂草详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <showWeeds :data="zacaoData" />
    </el-dialog>
    <el-dialog
      title="编辑杂草"
      class="edit-weed-dialog"
      :visible.sync="editDialogVisible"
      width="60%"
      :before-close="handleEditClose"
      top="5vh"
    >
      <editWeed
        v-if="editDialogVisible"
        :data="editZacaoData"
        :is-create="false"
        @close="handleEditClose"
        @update="handleUpdateClose"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getPage, getSpecLbPage, zacaoDelete } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
import ElSelectTree from 'el-select-tree'
// const cityJson = require('@/assets/json/cities.json')
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}
import { pageCount } from '@/globalConfig'
import showWeeds from './showWeeds'
import editWeed from './editWeed'

export default {
  components: {
    ElSelectTree,
    showWeeds,
    editWeed
  },
  data() {
    return {
      // cityJson: cityJson.cityies,
      provinceList: provinceList,
      value1: '', // 广西省
      value2: '',
      tempList: [], // provinceJson['广西省']
      formSearch: {
        reg: '',
        specy: null,
        jydw: '',
        state: '',
        startTime: '',
        endTime: '',
        name: ''
      },
      selectId: '',
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb'
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      multipleSelection: [],
      dialogVisible: false,
      zacaoData: null,
      editDialogVisible: false,
      editZacaoData: null
    }
  },
  computed: {
    queryPageination() {
      return {
        count: this.pagination.count,
        start: (this.pagination.index - 1) * this.pagination.count
      }
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    selectOne(params) {
      this.formSearch.reg = ''
      this.formSearch.reg = params
      this.tempList = provinceJson[params]
      this.value2 = ''
    },
    selectSecond(params) {
      this.formSearch.reg = params
    },
    parseTime(time) {
      return parseTime(time)
    },

    changeSpecy(val, data) {
      if (data) {
        const specy = data.data
        this.formSearch.specy = JSON.stringify(specy)
      } else {
        this.formSearch.specy = ''
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
    async getPage() {
      const searchParams = JSON.parse(JSON.stringify(this.formSearch))
      // searchParams.specy = JSON.parse(searchParams.specy)
      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams }
      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // handleDel() {
    //   const ids = this.multipleSelection.map((item) => {
    //     return item.id
    //   })
    //   if (ids.length === 0) {
    //     this.$confirm('请选择删除对象', '提示', {
    //       confirmButtonText: '确定',
    //       type: 'warning'
    //     }).catch(err => err)
    //   } else {
    //     this.$confirm('数据删除后将无法恢复，请确认是否执行删除？', '删除', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       if (ids.length === 1) {
    //         zacaoDelete({ id: ids[0] }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功', '提示', {
    //               confirmButtonText: '确定',
    //               type: 'success',
    //               callback: () => {
    //                 // 删除成功 执行查询更新
    //                 this.getPage()
    //               }
    //             })
    //           }
    //         }).catch(err => err)
    //       } else {
    //         zacaoDelete({ ids: JSON.stringify(ids) }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功', '提示', {
    //               confirmButtonText: '确定',
    //               type: 'success',
    //               callback: () => {
    //                 // 删除成功 执行查询更新
    //                 this.getPage()
    //               }
    //             })
    //           }
    //         }).catch(err => err)
    //       }
    //     }).catch(err => err)
    //   }
    // },
    handleDel(id) {
      this.$confirm('数据删除后将无法恢复，请确认是否执行删除？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        zacaoDelete({ id: id }).then((data) => {
          if (data.state) {
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                // 删除成功 执行查询更新
                this.getPage()
              }
            })
          }
        }).catch(err => err)
      }).catch(err => err)
    },
    handleEditClose() {
      this.editDialogVisible = false
    },
    handleUpdateClose() {
      this.editDialogVisible = false
      this.getPage()
    },
    handleEdit(index, rowData) {
      this.editDialogVisible = true
      this.editZacaoData = JSON.parse(JSON.stringify(rowData))
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleDetail(index, rowData) {
      this.zacaoData = rowData
      this.dialogVisible = true
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddWeeds'

      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.getPage()
    },
    handleSearch() {
      this.getPage()
    }
  }
}
</script>
<style >

/* .report-table .el-image-viewer__img {
  max-width: 90%;
} */
</style>
<style lang="scss" scoped>
.edit-weed-dialog{
  ::v-deep.el-dialog__body{
    padding: 0 20px;
    padding-bottom: 10px;
  }
}
.news-card {
  min-height: calc(100% - 35px);
  ::v-deep.el-card__body {
    // padding: 20px 0;
    height: 100%;
    width: 100%;
  }

  .report-row {
    ::v-deep.el-select{
      width: 100%;
    }
    .line {
      text-align: center;
      line-height: 28px;
    }
    .right-btn{
      text-align: right;
      ::v-deep.el-button{
        // margin: 0 10px;
      }
    }
  }
  .report-table {
    margin: 10px 0;
  }
  ::v-deep.el-pagination {
    text-align: right;
    .slot-span{
      float: left;
    }
  }
}
</style>
