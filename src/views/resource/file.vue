<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="10" style="text-align:left">
          <span class="row-title">
            当前文件总数量：{{ totalCount }}个， 当前磁盘空间总量：{{ diskTotal }}GB，已用空间：{{ diskUsed }}GB，剩余空间：{{ diskLeft }}GB
          </span>
        </el-col>
        <el-col :span="13" class="right-btn">
          <el-button type="primary" @click="query()">刷新</el-button>
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
          prop="filePath"
          label="文件路径"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="httpUrl"
          label="访问链接"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="platform"
          label="平台位置"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.platform === 0">本地主机</span>
            <span v-if="scope.row.platform === 0">平台云主机</span>
            <span v-else>本地主机</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fsize"
          label="大小（kb）"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="create"
          label="创建时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="创建账户"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          width="100"
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
      title="文件详情"
      :visible.sync="dialoglog"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="文件路径：">
          {{ currentFile.filePath }}
        </el-form-item>
        <el-form-item label="访问链接：">
          {{ currentFile.httpUrl }}
        </el-form-item>
        <el-form-item label="平台位置：">
          {{ currentFile.platform }}
        </el-form-item>
        <el-form-item label="大小(kb)：">
          {{ currentFile.fsize }}
        </el-form-item>
        <el-form-item label="创建时间：">
          {{ parseTime(currentFile.create) }}
        </el-form-item>
        <el-form-item label="创建账户：">
          {{ currentFile.username }}
        </el-form-item>

        <div style="text-align:center;margin-top: 25px;">
          <el-button type="primary" @click="dialoglog = false">关 闭</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { clean, parseTime } from '@/utils/index'
import { getFilePage, getServerList } from '@/api/sys'
import { pageCount } from '@/globalConfig'
export default {

  data() {
    return {
      dialoglog: false,
      currentFile: {},
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      selected: [],
      diskTotal: '',
      diskUsed: '',
      diskLeft: ''
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
    showDetail(index, row) {
      // 查看log是模态框还是页面 todo
      this.currentFile = row
      this.dialoglog = true
    },
    delelteFile(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // logDelete({ id: row.id }).then(res => {
        //   if (res.state === 1) {
        //     this.$alert('删除成功！', '提示', {
        //       confirmButtonText: '确定',
        //       type: 'success',
        //       callback: () => {
        //         this.query()
        //       }
        //     })
        //   }
        // }).catch(err => err)
      }).catch(err => err)
    },
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const params = { ... this.queryPageination }
      getFilePage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.filelist
        this.totalCount = data.totalCount
      }).catch(err => err)
      getServerList(clean(params)).then((res) => {
        const { data } = res
        this.diskTotal = data.serverlist[0].diskTotal
        this.diskUsed = data.serverlist[0].diskUsed
        this.diskLeft = data.serverlist[0].diskLeft
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
    line-height: 28px;
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
