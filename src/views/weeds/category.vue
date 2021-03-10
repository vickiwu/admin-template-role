<template>
  <div class="app-container">
    <div class="news-title">类别管理</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="23" class="right-btn">
          <el-button type="primary" size="small" @click="handleAdd()">新增</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
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
          prop="date"
          label="科"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="date"
          label="属"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="编辑"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="pagination.total > pagination.pageSize"
        background
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ (pagination.pageIndex - 1) * pagination.pageSize + 1 }}至第{{ pagination.pageIndex * pagination.pageSize }}项结果，共{{ pagination.total }}项</span>
        </template>
      </el-pagination>
    </el-card>
    <el-dialog
      title="新增类别"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="60px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="科" prop="name">
          <el-input v-model="form.name" placeholder="请填写科" />

        </el-form-item>
        <el-form-item label="属" prop="desc">
          <el-input v-model="form.desc" placeholder="请填写属" />

        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {

  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择杂草所属科', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请选择杂草所属', trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      pagination: {
        pageSize: 10,
        total: 100,
        pageIndex: 1
      }
    }
  },
  created() {
  },
  methods: {
    handleEdit(index, rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', index, rowData)
      // 跳转页面
      this.dialogVisible = true
      // this.$router.push({
      //   name: 'AddCategory',
      //   params: {
      //     index, rowData
      //   }
      // })
    },
    handleAdd() {
      // 跳转页面
      this.dialogVisible = true
      // this.$router.push({
      //   name: 'AddCategory'

      // })
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.pageIndex = val
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
