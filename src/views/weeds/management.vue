<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.startTime"
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
              v-model="formSearch.endTime"
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

          <el-select
            v-model="formSearch.reg"
            clearable
            size="medium"
            placeholder="所有区域"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="4">

          <el-select-tree
            v-model="selectId"
            style="width:100%"
            placeholder="请选择杂草所属种类"
            clearable
            :data="options"
            :props="treeProps"
            size="medium"
            @change="changeSpecy"
          />
        </el-col>
        <el-col :span="4">
          <el-select v-model="formSearch.jydw" size="medium" clearable placeholder="所有程度">
            <el-option label="未发现有害生物" :value="0" />
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <el-option label="非鉴定性有害生物" :value="3" />
          </el-select>
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="small" @click="handleSearch()">检索</el-button>
          <el-button type="primary" size="small" @click="handleAdd()">新增</el-button>
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
          prop="discReg"
          label="区域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="source"
          label="来源"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="nameCn"
          label="名称"
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
          prop="jydw"
          label="危害程度"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <div>
              {{ scope.row.jydw ==0?'未发现有害生物' :scope.row.jydw ==1?'非检疫性有害生物':scope.row.jydw ==2? '检疫性有害生物' :'非鉴定性有害生物' }}
            </div>

          </template>
        </el-table-column>

        <el-table-column
          prop="piclist"
          label="图片"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <el-image
              v-for="(item) in scope.row.piclist"
              :key="item.httpUrl"
              style="width: 40px; "
              :src="item.httpUrl"
              :preview-src-list="[item.httpUrl]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>

          </template>
        </el-table-column>
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
          width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer; margin-right:10px"
              @click="handleDetail(scope.$index, scope.row)"
            >
              查看
            </span>
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
import { getPage, getLbPage, zacaoDelete } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
import ElSelectTree from 'el-select-tree'
const cityJson = require('@/assets/json/cities.json')
import { pageCount } from '@/globalConfig'

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      cityJson: cityJson.cityies,
      formSearch: {
        reg: '',
        specy: null,
        jydw: '',
        startTime: '',
        endTime: ''
      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      options: [], // 处理后的杂草数据
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
    this.getLbPage()
    this.getPage()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    async getLbPage() {
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
      })
    },
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formSearch.specy = JSON.stringify(specy)
    },
    async getPage() {
      const searchParams = JSON.parse(JSON.stringify(this.formSearch))
      // searchParams.specy = JSON.parse(searchParams.specy)
      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams }
      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      })
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
            zacaoDelete({ id: ids[0] }).then((data) => {
              if (data.state) {
                this.$alert('删除成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    // 删除成功 执行查询更新
                    this.getPage()
                  }
                })
              }
            })
          } else {
            zacaoDelete({ ids: JSON.stringify(ids) }).then((data) => {
              if (data.state) {
                this.$alert('删除成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    // 删除成功 执行查询更新
                    this.getPage()
                  }
                })
              }
            })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      }
    },
    handleEdit(index, rowData) {
      // 修改杂草
      this.$router.push({
        name: 'AddWeeds',
        params: {
          index, rowData,
          isEdit: true
        }
      })
    },
    handleDetail(index, rowData) {
      console.log('%c 🍗 index, rowData: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', index, rowData)
      const routeUrl = this.$router.resolve({
        path: 'ShowWeeds',
        query: {
          rowData: JSON.stringify(rowData)
        }
      })
      window.open(routeUrl.href, '_blank')
      // this.$router.push({
      //   name: 'ShowWeeds',
      //   params: {
      //     index, rowData
      //   }
      // })
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddWeeds'

      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.getPage()
    },
    handleSearch() {
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
        // margin: 0 10px;
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
