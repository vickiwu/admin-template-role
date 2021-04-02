<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-around">
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.createTimeStart"
              size="mini"
              type="date"
              placeholder="开始日期"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.createTimeEnd"
              size="mini"
              type="date"
              placeholder="结束日期"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-select v-model="formSearch.ntype" size="mini" clearable placeholder="类别">
            <el-option label="通用新闻" :value="1" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="formSearch.title" size="mini" placeholder="标题" prefix-icon="el-icon-search" />

        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="mini" @click="searchHandle">检索</el-button>
          <el-button type="primary" size="mini" @click="searchHandle">刷新</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleAdd()">新增</el-button> -->
          <!-- <el-button type="danger" size="mini" @click="handleDel">删除</el-button> -->
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
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
          :show-overflow-tooltip="true"
        /> -->

        <el-table-column
          prop=""
          label="序号"
          width="50"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>

              {{ scope.$index + 1 + queryPageination.start }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
        />
        <!-- <el-table-column
          prop="content"
          label="内容"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          prop="specy"
          label="涉及杂草种类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <div>
              <span style="margin-right:10px"> {{ scope.row.specy ? scope.row.specy.lb1 : '' }}</span>
              <span style="margin-left:10px;margin-right:10px">{{ scope.row.specy ? scope.row.specy.lb2 : "" }}</span>
            </div>

          </template>
        </el-table-column>
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
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update"
          label="更新时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.update) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.state == 0 ? '未审核' : scope.row.state == 1 ? '审核通过': '驳回' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="编辑"
          width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right:15px;"
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
import { getPage, xinwenDelete } from '@/api/xinwen'
import { clean, parseTime } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {
  data() {
    return {
      formSearch: {
        ntype: '',
        title: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      multipleSelection: []

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
    this.getPage()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    searchHandle() {
      this.getPage()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // handleDel() {
    //   const ids = this.multipleSelection.map((item) => {
    //     return item.id
    //   })
    //   if (ids.length === 0) {
    //     this.$confirm('请选择删除对象', '提示', {
    //       confirmButtonText: '确定',
    //       type: 'warning'
    //     }).catch(err => err)
    //   } else {
    //     this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       if (ids.length === 1) {
    //         xinwenDelete({ id: ids[0] }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功', '提示', {
    //               confirmButtonText: '确定',
    //               type: 'success',
    //               callback: () => {
    //                 // 删除成功 执行查询更新
    //                 this.getPage()
    //               }
    //             })
    //           }
    //         }).catch(err => err)
    //       } else {
    //         xinwenDelete({ ids: JSON.stringify(ids) }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功', '提示', {
    //               confirmButtonText: '确定',
    //               type: 'success',
    //               callback: () => {
    //                 // 删除成功 执行查询更新
    //                 this.getPage()
    //               }
    //             })
    //           }
    //         }).catch(err => err)
    //       }
    //     }).catch(err => err)
    //   }
    // },
    handleDel(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        xinwenDelete({ id: id }).then((data) => {
          if (data.state) {
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                // 删除成功 执行查询更新
                this.getPage()
              }
            })
          }
        }).catch(err => err)
      }).catch(err => err)
    },

    async getPage() {
      const params = { ...this.queryPageination, ...this.formSearch }
      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.xinwenlist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handleEdit(rowData) {
      // 跳转到编辑页面
      this.$router.push({
        name: 'AddNews',
        params: {
          isEdit: true,
          rowData
        }
      })
    },
    // handleAdd() {
    //   // 跳转页面
    //   this.$router.push({
    //     name: 'AddNews'
    //   })
    // },
    handlePageChange(val) {
      this.pagination.index = val
      this.getPage()
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
      line-height: 28px;
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
