<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">

        <el-col :span="4">
          <el-select v-model="formInline.specy" placeholder="请选择杂草所属种类">
            <el-option-group
              v-for="group in options"
              :key="group.lb"
              :label="group.lb"
            >
              <el-option
                v-for="item in group.option"
                :key="item.lb2"
                :label="item.lb2"
                :value="JSON.stringify(item)"
              />
            </el-option-group>
          </el-select>
        </el-col>

        <el-col :span="5">
          <el-input v-model="formInline.name" size="medium" clearable placeholder="资料名称" prefix-icon="el-icon-search" />

        </el-col>
        <el-col :span="14" class="right-btn">
          <el-button type="primary" size="small" @click="handleSearch()">检索</el-button>
          <el-button type="primary" size="small" @click="handleAdd()">新增</el-button>

          <el-button type="primary" size="small" @click="handleDownLoad()">下载</el-button>
          <el-button type="danger" size="small" @click="handleDel">删除</el-button>
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
          prop="name"
          label="资料名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="specy"
          label="涉及杂草种类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <div>
              <span style="margin-right:10px"> {{ scope.row.specy ? scope.row.specy.lb1 +'科' : '' }}</span>
              <span style="margin-left:10px;margin-right:10px">{{ scope.row.specy ? scope.row.specy.lb2 + '属' : "" }}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="摘要"
          :show-overflow-tooltip="true"
        />

        <el-table-column
          prop="create"
          label="发现时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop=""
          label="编辑"
          width="80"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
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
import { getPage, ziliaoDelete } from '@/api/ziliao'
import { getLbPage } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'

export default {

  data() {
    return {
      formInline: {
        specy: '',
        name: ''
      },
      tableData: [],

      pagination: {
        count: 10,
        index: 1
      },
      totalCount: 0,
      options: [],
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
    // 挂载后 获取数据
    this.getPage()
    this.getLbPage()
  },
  methods: {
    async getLbPage() {
      // 获取杂草类别
      const params = { cunt: 1000, start: 0 }
      await getLbPage(clean(params)).then((res) => {
        var all = new Map()
        const { data } = res
        data.lblist.map((item) => {
          const result = data.lblist.filter((item2) => {
            return item2.lb1 === item.lb1
          })
          all.set(item.lb1, result)
        })
        for (const [k, v] of all) {
          const obj = {}
          obj.lb = k
          obj.option = v
          this.options.push(obj)
        }
      })
    },
    parseTime(time) {
      // 时间戳处理
      return parseTime(time)
    },
    async getPage() {
      // 查询资料数据
      const searchParams = JSON.parse(JSON.stringify(this.formInline))
      const params = { ...this.queryPageination, ...searchParams }
      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.ziliaolist
        this.totalCount = data.totalCount
      })
    },
    handleSearch() {
      // 查询 检索
      this.getPage()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDel() {
      const ids = this.multipleSelection.map((item) => {
        return item.id
      })
      if (ids.length === 0) {
        this.$confirm('请选择删除对象', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (ids.length === 1) {
            ziliaoDelete({ id: ids[0] }).then((data) => {
              if (data.state) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 删除成功 执行查询更新
                this.getPage()
              }
            })
          } else {
            ziliaoDelete({ ids: JSON.stringify(ids) }).then((data) => {
              if (data.state) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 删除成功 执行查询更新
                this.getPage()
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleEdit(index, rowData) {
      // 跳转到修改页面
      this.$router.push({
        name: 'InformationAdd',
        params: {
          index, rowData,
          isEdit: true
        }
      })
    },
    handleDownLoad() {
      // 处理下载函数

    },
    handleAdd() {
      // 跳转到修改页面
      this.$router.push({
        name: 'InformationAdd'
      })
    },
    handleExport() {},
    handlePageChange(val) { // 点击分页查询
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
