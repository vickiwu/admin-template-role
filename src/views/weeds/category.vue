<template>
  <div :class="hasClass?'app-container' : ''">
    <el-button v-if="isAdd" type="primary" class="go-back-btn" @click="goBack">返回上一级</el-button>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="4">
          <el-input v-if="false" v-model="searchname" prefix-icon="el-icon-search" placeholder="搜索关键字" clearable />
        </el-col>
        <el-col :span="20" class="right-btn">
          <el-button type="primary" @click="handleAdd">新增目</el-button>
          <el-button type="primary" @click="handleSearch">检索</el-button>
          <el-button type="primary" @click="handleSearch">刷新</el-button>
          <!-- <el-button type="danger"   @click="handleDel">删除</el-button> -->
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        class="report-table"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :load="load"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop=""
          label="序号"
          width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.level===1">

              {{ scope.row.index + 1 + queryPageination.start }}
            </span>
            <span v-else>
              {{ scope.row.index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lb"
          label="类别"
        />
        <!-- <el-table-column
          prop="lbLt"
          label="拉丁名称"
        /> -->

        <el-table-column
          prop=""
          label="编辑"
          width="400"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right:15px;"
              @click="handleAddChild( scope.row)"
            >
              {{ scope.row.level===1?'添加科' : scope.row.level===2 ? '添加属' :'' }}
            </span>
            <span
              style="color: #409EFF;cursor:pointer;margin-right:15px;"
              @click="handleEdit( scope.row)"
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
      :title="!isEdit ? '新增目' : '修改目'"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        label-width="100px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item label="目  中文名 " prop="lb1">
          <el-input v-model="formAdd.lb1" placeholder="请填写中文名" />
        </el-form-item>
        <el-form-item label="目  拉丁名 " prop="lb1Lt">
          <el-input v-model="formAdd.lb1Lt" placeholder="请填写拉丁名称" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick(1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="!isEdit ? '新增科' : '修改科'"
      :visible.sync="dialogVisible2"
      width="40%"
      append-to-body
    >
      <el-form
        ref="formAdd2"
        :model="formAdd2"
        label-width="100px"
        label-position="right"
        :rules="rules2"
      >
        <el-form-item v-if="false" label="目  中文名 " prop="lb1">
          <el-input v-model="formAdd2.lb1" disabled />
        </el-form-item>
        <el-form-item v-if="false" label="目  拉丁名 " prop="lb1Lt">
          <el-input v-model="formAdd2.lb1Lt" disabled />
        </el-form-item>

        <el-form-item label="目">
          <el-input :value="formAdd2.lb1 + '     '+ (formAdd2.lb1Lt ? formAdd2.lb1Lt :'')" disabled />
        </el-form-item>
        <el-form-item label="科  中文名 " prop="lb2">
          <el-input v-model="formAdd2.lb2" placeholder="请填写中文名" />
        </el-form-item>
        <el-form-item label="科  拉丁名 " prop="lb2Lt">
          <el-input v-model="formAdd2.lb2Lt" placeholder="请填写拉丁名称" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleClick(2)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="!isEdit ? '新增属' : '修改属'"
      :visible.sync="dialogVisible3"
      width="40%"
      append-to-body
    >
      <el-form
        ref="formAdd3"
        :model="formAdd3"
        label-width="100px"
        label-position="right"
        :rules="rules3"
      >
        <el-form-item v-if="false" label="目  中文名 " prop="lb1">
          <el-input v-model="formAdd3.lb1" disabled />
        </el-form-item>
        <el-form-item v-if="false" label="目  拉丁名 " prop="lb1Lt">
          <el-input v-model="formAdd3.lb1Lt" disabled />
        </el-form-item>
        <el-form-item v-if="false" label="科  中文名 " prop="lb2">
          <el-input v-model="formAdd3.lb2" disabled />
        </el-form-item>
        <el-form-item v-if="false" label="科  拉丁名 " prop="lb2Lt">
          <el-input v-model="formAdd3.lb2Lt" disabled />
        </el-form-item>

        <el-form-item label="目">
          <el-input :value="formAdd3.lb1 + '     '+(formAdd3.lb1Lt ? formAdd3.lb1Lt :'')" disabled />
        </el-form-item>
        <el-form-item label="科">
          <el-input :value="formAdd3.lb2 + '     '+(formAdd3.lb2Lt ? formAdd3.lb2Lt :'' )" disabled />
        </el-form-item>
        <el-form-item label="属  中文名 " prop="lb3">
          <el-input v-model="formAdd3.lb3" placeholder="请填写中文名" />
        </el-form-item>
        <el-form-item label="属  拉丁名 " prop="lb3Lt">
          <el-input v-model="formAdd3.lb3Lt" placeholder="请填写拉丁名称" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="handleClick(3)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getSpecLbPage, addLb, editLb, delLb } from '@/api/zacao'
import { clean } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {
  props: {

    hasClass: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isAdd: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      formAdd: { // 目添加
        lb1: '',
        lb1Lt: ''
      },
      searchname: '',
      rules: {
        lb1: [
          { required: true, message: '请填写目', trigger: 'blur' }
        ],
        lb1Lt: [
          { required: true, message: '请填写目拉丁名称', trigger: 'blur' }
        ]
      },
      formAdd2: { // 科添加--已知目
        lb1: '',
        lb2: '',
        lb1Lt: '',
        lb2Lt: ''
      },
      rules2: {
        lb2: [
          { required: true, message: '请填写科', trigger: 'blur' }
        ],
        lb2Lt: [
          { required: true, message: '请填写科拉丁名称', trigger: 'blur' }
        ]
      },
      formAdd3: { // 属添加--已知目-科
        lb1: '',
        lb2: '',
        lb3: '',
        lb1Lt: '',
        lb2Lt: '',
        lb3Lt: ''
      },
      rules3: {
        lb3: [
          { required: true, message: '请填写属', trigger: 'blur' }
        ],
        lb3Lt: [
          { required: true, message: '请填写属拉丁名称', trigger: 'blur' }
        ]
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      isEdit: false,
      multipleSelection: []
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
    this.$route.params.isAdd ? (this.isAdd = true) : this.isAdd = false
    this.getSpecLbPage()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.level === 2) {
        return 'warning-row'
      } else if (row.level === 3) {
        return 'success-row'
      }
      return ''
    },
    goBack() {
      this.$router.go('-1')
    },
    async load(tree, treeNode, resolve) {
      const params = { count: 1000, start: 0 }
      // return
      params.lb1 = tree.data.lb1
      if (tree.level === 1) { // 点击目 获取科
        let arr
        await getSpecLbPage(clean(params)).then((res) => {
          arr = res.data.lblist.map((item, index) => {
            return { id: item.id, index: index, lb: item.lb2, lbLt: item.lb2Lt, level: 2, data: item, hasChildren: true }
          })
        }).catch(err => err)
        return resolve(arr)
      } else if (tree.level === 2) {
        params.lb2 = tree.data.lb2
        let arr2
        await getSpecLbPage(clean(params)).then((res) => {
          arr2 = res.data.lblist.map((item, index) => {
            return { id: item.id, index: index, lb: item.lb3, lbLt: item.lb3Lt, level: 3, data: item, hasChildren: false }
          })
        }).catch(err => err)
        return resolve(arr2)
      } else {
        return resolve([])
      }

      // if (tree.data.lb2) { // 请求属
      //   params.lb2 = tree.data.lb2
      //   let arr2
      //   await getSpecLbPage(clean(params)).then((res) => {
      //     arr2 = res.data.lblist.map((item, index) => {
      //       return { id: item.id, index: index, lb: item.lb3, lbLt: item.lb3Lt, level: 3, data: item, hasChildren: false }
      //     })
      //   }).catch(err => err)
      //   return resolve(arr2)
      // } else { // 请求科
      //   let arr
      //   await getSpecLbPage(clean(params)).then((res) => {
      //     arr = res.data.lblist.map((item, index) => {
      //       return { id: item.id, index: index, lb: item.lb2, lbLt: item.lb2Lt, level: 2, data: item, hasChildren: true }
      //     })
      //   }).catch(err => err)
      //   console.log('%c 🎂 arr: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', arr)
      //   return resolve(arr)
      // }
    },
    async getSpecLbPage() {
      this.tableData = []
      const params = { ...this.queryPageination, name: this.searchname }

      await getSpecLbPage(clean(params)).then((res) => {
        const { data } = res
        this.totalCount = data.totalCount
        this.tableData = res.data.lblist.map((item, index) => {
          return { id: item.id, index: index, lb: item.lb1, lbLt: item.lb1Lt, level: 1, data: item, hasChildren: true }
        })
      }).catch(err => err)
    },

    handleDel(id) {
      this.$confirm('数据删除后将无法恢复，请确认是否执行删除？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLb({ id: id }).then((res) => {
          if (res.state === 1) {
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                // 新增完成 更新列表
                this.getSpecLbPage()
              }
            })
          }
        }).catch(err => err)
      }).catch(err => err)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(rowData) {
      if (rowData.level === 1) {
        this.dialogVisible = true
        this.isEdit = true
        this.formAdd = { ...rowData.data }
      } else if (rowData.level === 2) {
        this.dialogVisible2 = true
        this.isEdit = true
        this.formAdd2 = { ...rowData.data }
      } else if (rowData.level === 3) {
        this.dialogVisible3 = true
        this.isEdit = true
        this.formAdd3 = { ...rowData.data }
      }
    },
    handleAddChild(rowData) {
      if (rowData.level === 1) {
        this.dialogVisible2 = true
        this.isEdit = false
        this.formAdd2 = { ...rowData.data }
      } else if (rowData.level === 2) {
        this.dialogVisible3 = true
        this.isEdit = false
        this.formAdd3 = { ...rowData.data }
      }
    },
    handleSearch() {
      this.getSpecLbPage()
    },
    handleAdd() {
      // 新增类别
      this.isEdit = false
      this.formAdd = {
        lb1: '',
        lb2: ''
      }
      this.dialogVisible = true
    },
    handleClick(level) {
      let params
      if (level === 1) {
        params = { ...JSON.parse(JSON.stringify(this.formAdd)) }
      } else if (level === 2) {
        params = { ...JSON.parse(JSON.stringify(this.formAdd2)) }
      } else if (level === 3) {
        params = { ...JSON.parse(JSON.stringify(this.formAdd3)) }
      }
      if (this.isEdit) {
        // 修改逻辑
        editLb({ json: JSON.stringify(params) }).then((res) => {
          if (res.state === 1) {
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                this.dialogVisible = false
                this.dialogVisible2 = false
                this.dialogVisible3 = false
                // 新增完成 更新列表
                this.getSpecLbPage()
              }
            })
          }
        }).catch(err => err)
      } else {
        // 新增
        addLb({ json: JSON.stringify(params) }).then((res) => {
          if (res.state === 1) {
            this.$alert('新增成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                // 新增完成 更新列表
                this.dialogVisible = false
                this.dialogVisible2 = false
                this.dialogVisible3 = false
                this.getSpecLbPage()
              }
            })
          }
        }).catch(err => err)
      }
    },

    handlePageChange(val) {
      this.pagination.index = val
      this.getSpecLbPage()
    }
  }
}
</script>
<style>
  .report-table .warning-row {
    background: #fff0d4;
  }

  .report-table .success-row {
    background: #e2ffd2;
  }
</style>
<style lang="scss" scoped>
.go-back-btn{
  margin-left: 20px ;
  margin-bottom: 15px;
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
