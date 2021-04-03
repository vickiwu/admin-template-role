<template>
  <div class="app-container">
    <div class="bg-container">
      <div class="blue-bg" @click="jumpSync()">
        <svg-icon icon-class="zhanghutngbu" class="bg-icon" />
        账户同步
      </div>
      <div class="blue-bg green-bg" @click="jumpRoles()">
        <svg-icon icon-class="quanxianshezhi" class="bg-icon" />
        权限设置
      </div>
    </div>

    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">下属账户总数量：{{ totalCount }}个</span>
        </el-col>
        <el-col :span="19" class="right-btn">
          <!-- <el-button type="primary" @click="handleAdd()">新增</el-button> -->
          <el-button type="primary" @click="query()">刷新</el-button>
          <!-- <el-button type="danger"   @click="del">删除</el-button> -->
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
          prop="username"
          label="用户名"
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
        <el-table-column
          prop="name"
          label="编辑"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right: 10px;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
            <span
              style="color: #F56C6C;cursor:pointer;"
              @click="del(scope.row)"
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

  </div>
</template>

<script>
import { clean } from '@/utils/index'
import { getUserPage, deleteUser } from '@/api/admin'
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
    query() {
      const params = { ... this.queryPageination }
      getUserPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.userlist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    jumpRoles() {
      this.$router.push({
        name: 'AccountRoles'
      })
    },
    jumpSync() {
      this.$router.push({
        name: 'SyncAccount'
      })
    },
    handleAdd() {
      this.$router.push({
        name: 'AddAccount',
        params: {
          isEdit: false
        }
      })
    },
    handleEdit(index, rowData) {
      this.$router.push({
        name: 'EditAccount',
        params: {
          rowData,
          isEdit: true
        }
      })
    },

    del(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(res => {
          if (res.state === 1) {
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                this.query()
              }
            })
          }
        }).catch(err => err)
      }).catch(err => err)
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
  }
  .row-title {
    display: inline-block;
    line-height: 28px;
    color: #181C28;
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
.bottom-card{
  margin-top: 15px;
  .news-form{
  margin: 15px auto;
  ::v-deep.el-select{
    width: 50%;
  }
  .btn-center{
    text-align: center;
    ::v-deep.el-button{
      margin: 0 15px;
    }
  }
}
}
</style>
