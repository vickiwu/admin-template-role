<template>
  <div class="app-container">
    <div class="news-title">账户管理</div>
    <div class="bg-container">
      <div class="blue-bg" @click="jumpSync()">
        <svg-icon icon-class="zhanghutngbu" class="bg-icon" />
        账户同步
      </div>
      <div class="blue-bg green-bg" @click="jumpRoles()">
        <svg-icon icon-class="quanxianshezhi" class="bg-icon" />
        权限设置
      </div>
    </div>

    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">下属账户总数量：10个</span>
        </el-col>
        <el-col :span="19" class="right-btn">
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
          width="80"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          type="index"
          label="序号"
          width="80"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="date"
          label="区域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="密码"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="地市"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="部门"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="工号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="手机号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="类型"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="编辑"
          width="80"
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

  </div>
</template>

<script>

export default {

  data() {
    return {
      form: {
        name: '',
        img: '',
        desc: ''
      },
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        date2: ''
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
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.pageIndex = val
    },
    onSubmit() {
      console.log('submit!')
    },
    jumpRoles() {
      this.$router.push({
        name: 'AccountRoles'
      })
    },
    jumpSync() {
      this.$router.push({
        name: 'SyncAccount'
      })
    },
    handleAdd() {
      this.$router.push({
        name: 'AddAccount'
      })
    },
    handleEdit() {
      this.$router.push({
        name: 'EditAccount'
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.bg-container{
  display: flex;
  .blue-bg{
    margin-right: 25px;
  }
}
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
    line-height: 36px;
    color: #181C28;
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
