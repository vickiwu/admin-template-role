<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-col :span="24" class="right-btn">
        <el-button type="primary" @click="query">刷新</el-button>
      </el-col>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
      >
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
            <span v-else-if="scope.row.state === 0">待研判</span>
            <span v-else-if="scope.row.state === 1">已处理</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="jydw"
          label="检疫地位"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <!-- <span v-if="scope.row.jydw === 0">未发现有害生物</span> -->
            <span v-if="scope.row.jydw === 1">非检疫性有害生物</span>
            <span v-else-if="scope.row.jydw === 2">检疫性有害生物</span>
            <!-- <span v-else-if="scope.row.jydw === 3">非鉴定性有害生物</span> -->
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="研判意见"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;display: inline-block;padding: 4px 0px;"
              @click="details(scope.row)"
            >
              杂草详情
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
      title="杂草详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <showWeeds :mydata="zacaoData" :show-yj="false" />
    </el-dialog>
  </div>
</template>

<script>
import { clean, parseTime } from '@/utils/index'
import { getTaskPage } from '@/api/yanpan'
import { getZacao } from '@/api/zacao'
import { pageCount } from '@/globalConfig'
import showWeeds from '@/views/weeds/showWeeds'

export default {
  components: {
    showWeeds
  },
  data() {
    return {
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      dialogVisible: false,
      zacaoData: null
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
      const params = { ... this.queryPageination, stateJson: JSON.stringify([-1, 1]) }
      getTaskPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.tasklist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    details(row) {
      // 查询杂草记录
      getZacao(clean({ id: row.zacaoId })).then((res) => {
        const { data } = res
        if (data.zacao) {
          this.zacaoData = data.zacao
          this.dialogVisible = true
        } else {
          this.$alert('为查询到此杂草信息', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      }).catch(err => err)
    },
    handleClose() {
      this.dialogVisible = false
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
::v-deep.el-pagination {
  text-align: right;
  .slot-span {
    float: left;
  }
}
</style>
