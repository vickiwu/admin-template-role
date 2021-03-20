<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-col :span="24" class="right-btn">
        <el-button type="primary" size="small" @click="query">刷新</el-button>
        <el-button type="primary" size="small" @click="set">评判处理</el-button>
      </el-col>

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
          prop="username"
          label="专家姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="password"
          label="杂草名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="realname"
          label="紧急程度"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="cityName"
          label="派发人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="bumen"
          label="派发时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jobNo"
          label="处理状态"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="totalCount > pagination.count"
        background
        :current-page="pagination.start"
        :page-size="pagination.count"
        :total="totalCount"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ pagination.start + 1 }}至第{{ pagination.start + pagination.count }}项结果，共{{ totalCount }}项</span>
        </template>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { clean } from '@/utils/index'
import { getTaskPage } from '@/api/yanpan'

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        count: 10,
        start: 0
      },
      totalCount: 0
    }
  },
  methods: {
    query() {
      const params = { ... this.pagination }
      getTaskPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.userlist
        this.totalCount = data.totalCount
      })
    },
    set() {

    }
  }
}
</script>

<style>

</style>
