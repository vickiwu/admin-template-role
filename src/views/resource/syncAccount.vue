<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="8" style="text-align:left">
          <span class="row-title">
            <div class="sub-title">上次同步时间：2020-09-20 14:20:20</div>
            <div class="sub-title">上次同步数量：{{ sysConfig.h4aSynEnable ? sysConfig.h4aSynEnable : 0 }}个</div>
          </span>
        </el-col>
        <el-col :span="15" class="right-btn">
          <!-- <el-checkbox v-model="checked">显示密码</el-checkbox> -->
          <el-button type="primary" size="small" @click="sync">开始同步</el-button>
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
          prop=""
          label="序号"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>

              {{ scope.$index + 1 + queryPageination.start }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="区域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="realname"
          label="姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="cityName"
          label="地市"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="bumen"
          label="部门"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jobNo"
          label="工号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="utype"
          label="类型"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.utype === 1">系统管理员</span>
            <span v-else-if="scope.row.utype === 2">专家调度用户</span>
            <span v-else-if="scope.row.utype === 3">研判专家</span>
            <span v-else-if="scope.row.utype === 4">图像采集操作员</span>
            <span v-else />
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

  </div>
</template>

<script>
import { clean } from '@/utils/index'
import { getUserPage, synH4a } from '@/api/admin'
import { getSysConfig } from '@/utils/auth'
import { pageCount } from '@/globalConfig'

export default {

  data() {
    return {
      form: {
        name: '',
        img: '',
        desc: ''
      },
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        date2: ''
      },
      checked: false,
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      selected: [],
      sysConfig: {}
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
    this.sysConfig = getSysConfig()
  },
  methods: {
    query() {
      const params = { ... this.queryPageination }
      getUserPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.userlist
        this.totalCount = data.totalCount
      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    sync() {
      synH4a().then((data) => {
        if (data.state === 1) {
          this.$alert('同步成功', {
            confirmButtonText: '确定'
          })
        }
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
