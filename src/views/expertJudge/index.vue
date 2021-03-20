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
          prop="realname"
          label="专家姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="zacaoNameCn"
          label="杂草名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jinji"
          label="紧急程度"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.jinji === 0">一般</span>
            <span v-else-if="scope.row.jinji === 1">紧急</span>
            <span v-else-if="scope.row.jinji === 2">非常紧急</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="senderRealname"
          label="派发人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="bumen"
          label="派发时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="jobNo"
          label="处理状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.state === -1">驳回</span>
            <span v-else-if="scope.row.state === 0">未处理</span>
            <span v-else-if="scope.row.state === 1">已处理</span>
            <span v-else />
          </template>
        </el-table-column>
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
import { clean, parseTime } from '@/utils/index'
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
  mounted() {
    this.query()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const params = { ... this.pagination }
      getTaskPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.tasklist
        this.totalCount = data.totalCount
      })
    },
    set() {
      // 路由跳转
      this.$router.push({
        name: 'Judge'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
    .right-btn {
        text-align: right;
    }
}

</style>
