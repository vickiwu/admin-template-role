<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.startTime"
              size="medium"
              type="date"
              value-format="timestamp"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formInline.endTime"
              size="medium"
              type="date"
              value-format="timestamp"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.level" size="medium" clearable placeholder="所有级别">
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
        <el-col :span="7" class="right-btn">
          <el-button type="primary" size="small" @click="query">检索</el-button>
          <el-button type="primary" size="small" @click="query">刷新</el-button>
          <!-- <el-button type="danger" size="small" @click="delelteFile()">删除</el-button> -->
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
        @selection-change="handleSelectionChange"
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
          prop="content"
          label="内容"
          min-width="60%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="级别"
          width="50"
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
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right:15px;"
              @click="showDetail(scope.$index, scope.row)"
            >
              查看
            </span>
            <span
              style="color: #f78989;cursor:pointer;"
              @click="delelteFile(scope.$index, scope.row)"
            >
              删除
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
      title="日志详情"
      :visible.sync="dialoglog"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="内容：">
          {{ currentLog.content }}
        </el-form-item>

        <div style="text-align:center;margin-top: 25px;">
          <el-button type="primary" @click="dialoglog = false">关 闭</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, logDelete } from '@/api/log'
import { clean, parseTime } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {

  data() {
    return {
      dialoglog: false,
      currentLog: {},
      formInline: {
        content: '',
        level: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      selected: [],
      dialogVisible: false,
      logData: null
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
        ...this.queryPageination,
        ...this.formInline
      }
      await getPage(clean(params)).then(res => {
        const { data } = res
        this.tableData = data.loglist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handleEdit(index, rowData) {
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
      this.pagination.index = val
      this.query()
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    // delelteFile() {
    //   if (this.selected.length === 0) {
    //     this.$alert('请选择要删除的日志!', '提示', {
    //       confirmButtonText: '确定',
    //       type: 'warning'

    //     })
    //     return
    //   }
    //   const ids = []
    //   this.selected.forEach(item => ids.push(item.id))
    //   this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     logDelete({ ids: JSON.stringify(ids) }).then(res => {
    //       if (res.state === 1) {
    //         this.$alert('删除成功！', '提示', {
    //           confirmButtonText: '确定',
    //           type: 'success',
    //           callback: () => {
    //             this.query()
    //           }
    //         })
    //       }
    //     }).catch(err => err)
    //   }).catch(err => err)
    // },
    delelteFile(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logDelete({ id: row.id }).then(res => {
          if (res.state === 1) {
            this.$alert('删除成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                this.query()
              }
            })
          }
        }).catch(err => err)
      }).catch(err => err)
    },
    showDetail(index, row) {
      // 查看log是模态框还是页面 todo
      console.log('%c 🍍 index,row: ', 'font-size:20px;background-color: #B03734;color:#fff;', index, row)
      this.currentLog = row
      this.dialoglog = true
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
