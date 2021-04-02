<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="10" style="text-align:left">
          <span class="row-title">
            当前磁盘空间总量：1024GB，已用空间：120GB，剩余空间：904GB
          </span>
        </el-col>
        <el-col :span="13" class="right-btn">
          <el-button type="primary" size="mini" @click="query()">刷新</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
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
          prop="name"
          label="服务器"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="lanIp"
          label="局域网IP"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="wanIp"
          label="公网IP"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="diskTotal"
          label="总空间（GB）"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="diskUsed"
          label="已用空间（GB）"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="diskLeft"
          label="剩余空间（GB）"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="update"
          label="更新时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.update) }}</span>
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
          <span class="slot-span">显示第{{ (pagination.index -1 ) * pagination.count + 1 }}至第{{ totalCount > (pagination.index * pagination.count) ? pagination.index * pagination.count : totalCount }}项结果，共{{ totalCount }}项</span>
        </template>
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getServerList } from '@/api/sys'
import { clean, parseTime } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {

  data() {
    return {
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      selected: []
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
    this.query()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const params = { ... this.queryPageination }
      getServerList(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.serverlist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
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
