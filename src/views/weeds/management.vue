<template>
  <div class="app-container">
    <div class="news-title">杂草管理</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.date1"
              size="medium"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.date2"
              size="medium"
              type="date"
              placeholder="结束日期"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.region1" size="medium" placeholder="所有区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.region2" size="medium" placeholder="所有种类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.region3" size="medium" placeholder="所有程度">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <!-- <el-col :span="4">
          <el-input v-model="formInline.region2" size="medium" placeholder="标题" prefix-icon="el-icon-search">
            <template slot="append"> <span style="cursor: pointer;" @click="handleSearch()">检索</span></template>
          </el-input>

        </el-col> -->
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="small" @click="handleSearch()">检索</el-button>
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
          label="来源"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="address"
          label="名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="种类"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="危害程度"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="图片"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="发现时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="编辑"
          width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer; margin-right:10px"
              @click="handleDetail(scope.$index, scope.row)"
            >
              查看
            </span>
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
import { getPage } from '@/api/zacao'

export default {

  data() {
    return {
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
      }, {
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
    async getPage() {
      await getPage({ oldPass: this.formChangePassword.oldPass, newPass: this.formChangePassword.newPass })
    },
    handleEdit(index, rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', index, rowData)
      // 跳转页面
      this.$router.push({
        name: 'AddWeeds',
        params: {
          index, rowData
        }
      })
    },
    handleDetail(index, rowData) {
      this.$router.push({
        name: 'ShowWeeds',
        params: {
          index, rowData
        }
      })
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddWeeds'

      })
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.pageIndex = val
    },
    handleSearch() {
      // 跳转页面
      this.$router.push({
        name: 'Search'

      })
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
