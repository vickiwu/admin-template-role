<template>
  <div class="app-container">
    <div class="news-title">专家管理</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="4">
          <el-input v-model="formInline.name" size="medium" placeholder="姓名" prefix-icon="el-icon-search" />
        </el-col>

        <el-col :span="4">
          <el-input v-model="formInline.region2" size="medium" placeholder="工号" prefix-icon="el-icon-search">
            <!-- <template slot="append">检索</template> -->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.region1" size="medium" placeholder="专业领域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col :span="11" class="right-btn">

          <el-button type="primary" size="small">检索</el-button>
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
          label="专家姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="专家工号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="手机号码"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="专业领域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="参与调度"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="简介"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="头像"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="录入时间"
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
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        name: ''
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
    handleEdit(index, rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', index, rowData)
      // 跳转页面
      this.$router.push({
        name: 'AddExpert',
        params: {
          index, rowData
        }
      })
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddExpert'

      })
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
        margin: 0 10px;
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
