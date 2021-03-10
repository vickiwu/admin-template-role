<template>
  <div class="app-container">
    <div class="news-title">文件管理</div>

    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="10" style="text-align:left">
          <span class="row-title">
            当前文件总数量：1024个，占用磁盘空间：1020.56GB
          </span>
        </el-col>
        <el-col :span="13" class="right-btn">
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
          label="文件路径"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="访问链接"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="平台位置"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="大小（kb）"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="创建时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="创建账户"
          :show-overflow-tooltip="true"
        />

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
      checked: false,
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
    jumpManageMent() {
      this.$router.push({
        name: 'ExpertManagement'
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
.news-card{
  min-height: calc(100% - 35px);
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
    ::v-deep.el-checkbox{
      margin-right: 10px;
    }
  }
  .row-title {
    display: inline-block;
    line-height: 36px;
    font-size: 13px;
    color: #181C28;
    .sub-title{
      font-size: 13px;
      line-height: 18px;
    }
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
</style>
