<template>
  <div class="app-container">
    <div class="news-title">新闻管理</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-around">
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.createTimeStart"
              size="medium"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.createTimeEnd"
              size="medium"
              type="date"
              placeholder="结束日期"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-select v-model="formSearch.ntype" size="medium" placeholder="类别">
            <el-option label="区域一" :value="0" />
            <el-option label="区域二" :value="1" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="formSearch.title" size="medium" placeholder="标题" prefix-icon="el-icon-search" />

        </el-col>
        <el-col :span="7" class="right-btn">
          <el-button type="primary" size="small" @click="searchHandle">检索</el-button>
          <el-button type="primary" size="small" @click="handleAdd()">新增</el-button>
          <!-- <el-button type="danger" size="small">删除</el-button> -->
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
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="content"
          label="内容"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="specyJson"
          label="涉及杂草种类"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="username"
          label="发布人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="group"
          label="归属组"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="create"
          label="发布时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="update"
          label="更新时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="state"
          label="状态"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop=""
          label="编辑"
          width="80"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;"
              @click="handleEdit(scope.row)"
            >
              修改
            </span>
            <span
              style="color: #f78989;cursor:pointer;"
              @click="handleDel(scope.row.id)"
            >
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="pagination.total > pagination.count"
        background
        :current-page="pagination.start"
        :page-size="pagination.count"
        :total="pagination.total"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ (pagination.start ) * pagination.count + 1 }}至第{{ (pagination.start+1) * pagination.count }}项结果，共{{ pagination.total }}项</span>
        </template>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getPage, xinwenDelete } from '@/api/xinwen'
import { clean } from '@/utils/index'

export default {
  data() {
    return {
      formSearch: {
        ntype: '',
        title: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      tableData: [{ id: 2, title: 'ddd', a: 'ss' }],
      pagination: {
        count: 10,
        total: '',
        start: 0
      }
    }
  },
  created() {
  },
  methods: {
    searchHandle() {
      this.getPage()
    },
    handleDel(id) {
      this.$confirm('确认删除这条记录吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        xinwenDelete({ id }).then((data) => {
          if (data.state) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功 执行查询更新
            this.getPage() // 未测试
          }
        })
      }).catch((e) => {
        console.log(e, 'ee')
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getPage() {
      const params = { ...this.pagination, ...this.formSearch }
      await getPage(clean(params))
      alert('接口报错')
    },
    handleEdit(rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', rowData)
      // 跳转页面
      this.$router.push({
        name: 'AddNews',
        params: {
          isEdit: true,
          rowData
        }
      })
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddNews'
      })
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.start = val
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
