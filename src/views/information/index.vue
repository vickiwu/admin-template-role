<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">

        <el-col :span="4">
          <el-select-tree
            v-model="selectId"
            width="120px"
            placeholder="请选择杂草所属种类"
            clearable
            :data="options"
            :props="treeProps"
            size="medium"
            @change="changeSpecy"
          />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formInline.name" size="medium" clearable placeholder="资料名称" prefix-icon="el-icon-search" />

        </el-col>
        <el-col :span="15" class="right-btn">
          <el-button type="primary" size="small" @click="handleSearch()">检索</el-button>
          <el-button type="primary" size="small" @click="handleSearch()">刷新</el-button>
          <!-- <el-button type="primary" size="small" @click="handleAdd">新增</el-button> -->
          <!-- <el-button type="danger" size="small" @click="handleDel">删除</el-button> -->
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
              <span style="margin-right:10px"> {{ scope.row.specy ? scope.row.specy.lb1 : '' }}</span>
              <span style="margin-left:10px;margin-right:10px">{{ scope.row.specy ? scope.row.specy.lb2 : "" }}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="摘要"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="realname"
          label="上传人"
          :show-overflow-tooltip="true"
        />

        <el-table-column
          prop="create"
          label="上传时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
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
              @click="handleShow(scope.$index, scope.row)"
            >
              查看
            </span>
            <span
              style="color: #409EFF;cursor:pointer;margin-right:15px;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
            <span
              style="color: #f78989;cursor:pointer;"
              @click="handleDel(scope.$index, scope.row)"
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
import { getPage, ziliaoDelete } from '@/api/ziliao'
import { getLbPage } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
import ElSelectTree from 'el-select-tree'
import { pageCount } from '@/globalConfig'

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      formInline: {
        specy: '',
        name: ''
      },
      tableData: [],
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      pagination: {
        count: pageCount,
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
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formInline.specy = JSON.stringify(specy)
    },
    async getLbPage() {
      // 获取杂草类别
      const params = { cunt: 1000, start: 0 }
      await getLbPage(clean(params)).then((res) => {
        var all = new Map()
        const { data } = res
        this.specyList = data.lblist
        data.lblist.map((item) => {
          const result = data.lblist.filter((item2) => {
            return item2.lb1 === item.lb1
          })
          all.set(item.lb1, result)
        })
        for (const [k, v] of all) {
          const obj = {}
          obj.lb2 = k
          obj.option = v
          this.options.push(obj)
        }
      }).catch(err => err)
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
      }).catch(err => err)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // handleAdd() {
    //   // 跳转到修改页面
    //   this.$router.push({
    //     name: 'InformationAdd'
    //   })
    // },
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
    //         ziliaoDelete({ id: ids[0] }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功!', '提示', {
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
    //         ziliaoDelete({ ids: JSON.stringify(ids) }).then((data) => {
    //           if (data.state) {
    //             this.$alert('删除成功!', '提示', {
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
    handleDel(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ziliaoDelete({ id: row.id }).then((data) => {
          if (data.state) {
            this.$alert('删除成功!', '提示', {
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
    handleEdit(index, rowData) { // 编辑页面
      // 跳转到编辑页面
      this.$router.push({
        name: 'EditrmationAdd',
        params: {
          index, rowData
        }
      })
    },
    handleShow(index, rowData) { // 编辑页面
      if (rowData.filelist && rowData.filelist[0].httpUrl) {
        window.open(rowData.filelist[0].httpUrl)
      } else {
        this.$alert('当前无资料可预览', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },

    handleSearch() {
      // 查询 检索
      this.getPage()
    },
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
