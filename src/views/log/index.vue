<template>
  <div class="app-container">
    <div class="news-title">系统日志</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="7">
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.startTime"
              size="medium"
              type="date"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.endTime"
              size="medium"
              type="date"
              placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.level" size="medium" placeholder="所有级别">
            <el-option label="通知" :value="0" />
            <el-option label="消息" :value="1" />
            <el-option label="错误" :value="2" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="formInline.content" size="medium" placeholder="请输入关键词" prefix-icon="el-icon-search">
            <!-- <template slot="append">检索</template> -->
          </el-input>
        </el-col>
        <el-col :span="8" class="right-btn">
          <el-button type="primary" size="small" @click="query">检索</el-button>
          <el-button type="danger" size="small" @click="delelteFile()">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          label="选择"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          type="index"
          label="序号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="content"
          label="内容"
          min-width="60%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="级别"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.level === 0">通知</span>
            <span v-else-if="scope.row.level === 1">消息</span>
            <span v-else-if="scope.row.level === 2">错误</span>
            <span v-else>通知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="记录时间"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="delelteFile(scope.row)">删除文件</el-button>
            <el-button type="text" @click="deleteZacao(scope.row)">删除杂草</el-button>
          </template>
        </el-table-column> -->

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
import { getPage, logDelete } from '@/api/log'
import { clean, parseTime } from '@/utils/index'

export default {

  data() {
    return {
      formInline: {
        content: '',
        level: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      pagination: {
        count: 10,
        start: 0
      },
      totalCount: 0,
      selected: []
    }
  },
  mounted() {
    this.queryLogs()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      this.queryLogs()
    },
    async queryLogs() {
      const params = {
        ...this.pagination,
        ...this.formInline

      }
      await getPage(clean(params)).then(res => {
        const { data } = res
        this.tableData = data.loglist
        this.totalCount = data.totalCount
      })
    },
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
      this.pagination.start = (val - 1) * this.pagination.count
      this.query()
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    delelteFile() {
      if (this.selected.length === 0) {
        this.$message.error('请选择要删除的日志！')
        return
      }
      const ids = []
      this.selected.forEach(item => ids.push(item.id))
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logDelete({ ids: JSON.stringify(ids) }).then(res => {
          if (res.state === 1) {
            this.$message.success('删除成功！')
          }
          this.query()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
