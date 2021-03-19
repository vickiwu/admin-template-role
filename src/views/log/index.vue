<template>
  <div class="app-container">
    <div class="news-title">系统日志</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="7">
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
import { getPage } from '@/api/log'
import { clean } from '@/utils/index'

export default {

  data() {
    return {
      formInline: {
        content: '',
        level: '',
        date1: '',
        date2: ''
      },
      tableData: [],
      pagination: {
        count: 10,
        start: 0
      },
      totalCount: 0
    }
  },
  mounted() {
    this.queryLogs()
  },
  methods: {
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
        console.log('data loglist', data.loglist)
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
