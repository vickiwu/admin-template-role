<template>
  <div class="app-container">
    <div class="news-title">类别管理</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="23" class="right-btn">
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
          <el-button type="danger" size="small" @click="handleDel">删除</el-button>
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
        <el-table-column
          type="selection"
          label="选择"
          width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          type="index"
          label="序号"
          width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="lb1"
          label="科"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="lb2"
          label="属"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop=""
          label="编辑"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;"
              @click="handleEdit( scope.row)"
            >
              修改
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
      :title="!isEdit ? '新增类别' : '修改类别'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        label-width="60px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="科" prop="lb1">
          <el-input v-model="formAdd.lb1" placeholder="请填写科" />

        </el-form-item>
        <el-form-item label="属" prop="lb2">
          <el-input v-model="formAdd.lb2" placeholder="请填写属" />

        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getLbPage, addLb, editLb, delLb } from '@/api/zacao'
import { clean } from '@/utils/index'

export default {

  data() {
    return {
      dialogVisible: false,
      formAdd: {
        lb1: '',
        lb2: ''
      },
      rules: {
        lb1: [
          { required: true, message: '请选择杂草所属科', trigger: 'blur' }
        ],
        lb2: [
          { required: true, message: '请选择杂草所属', trigger: 'blur' }
        ]
      },
      tableData: [],
      pagination: {
        count: 10,
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
    this.getLbPage()
  },
  methods: {
    async getLbPage() {
      const params = { ...this.queryPageination }
      await getLbPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.lblist
        this.totalCount = data.totalCount
      })
    },
    handleDel() {
      const ids = this.multipleSelection.map((item) => {
        return item.id
      })
      if (ids.length === 0) {
        this.$confirm('请选择删除对象', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delLb({ id: ids[0] }).then((res) => {
            if (res.state === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            // 新增完成 更新列表
            this.getLbPage()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(rowData) {
      // 跳转页面
      this.dialogVisible = true
      this.isEdit = true
      this.formAdd = { ...rowData }
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
    handleClick() {
      const params = { ...JSON.parse(JSON.stringify(this.formAdd)) }
      if (this.isEdit) {
        // 修改逻辑
        editLb({ json: JSON.stringify(params) }).then((res) => {
          if (res.state === 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          // 新增完成 更新列表
          this.getLbPage()
        })
      } else {
        // 新增
        addLb({ json: JSON.stringify(params) }).then((res) => {
          if (res.state === 1) {
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
          // 新增完成 更新列表
          this.getLbPage()
        })
      }
      this.dialogVisible = false
    },

    handlePageChange(val) {
      this.pagination.index = val
      this.getLbPage()
    }
  }
}
</script>

<style lang="scss" scoped>

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
      line-height: 36px;
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
