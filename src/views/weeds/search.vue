<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="5">
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.startTime"

              type="date"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="formSearch.endTime"

              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%"
            />
          </el-col>
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="formSearch.reg"
            clearable

            placeholder="省"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="formSearch.reg"
            clearable

            placeholder="市"
          >
            <el-option
              v-for="item in cityJson"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select-tree
            v-model="selectId"
            style="width:100%"
            placeholder="种类"
            clearable
            :data="options"
            :props="treeProps"

            @change="changeSpecy"
          />

        </el-col>
        <el-col :span="3">
          <el-select v-model="formSearch.jydw" clearable placeholder="检疫地位">
            <el-option label="未发现有害生物" :value="0" />
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <el-option label="非鉴定性有害生物" :value="3" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="formSearch.name"

            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" @click="handleSearch()">检索</el-button>

          <el-button type="primary" @click="handleSearch()">刷新</el-button>
          <el-button type="primary" :loading="downloadLoading" @click="handleExport()">导出</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        class="report-table"
      >

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
        <!-- 字段inputMethod 值app采集 或手动输入 -->
        <el-table-column
          prop="inputMethod"
          label="录入方式"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="specy"
          label="种类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <div>
              <span style="margin-right:5px"> {{ scope.row.specy ? scope.row.specy.lb1 : '' }}</span>
              <span style="">{{ scope.row.specy ? scope.row.specy.lb2: "" }}</span>
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
          prop="realname"
          label="采集人"
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
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right:10px"
              @click="handleDownLoad(scope.$index, scope.row)"
            >
              下载图片
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
import { getPage, getLbPage, zacaoExport } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
const cityJson = require('@/assets/json/cities.json')
import ElSelectTree from 'el-select-tree'
import { pageCount } from '@/globalConfig'

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      cityJson: cityJson.cityies,
      downloadLoading: false,
      radio: '',
      formSearch: {
        reg: '',
        specy: '',
        jydw: '',
        startTime: '',
        endTime: '',
        name: ''
      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      options: [], // 处理后的杂草数据
      multipleSelection: {}
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
      // 时间戳处理
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
      }).catch(err => err)
    },
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formSearch.specy = JSON.stringify(specy)
    },
    async getPage() {
      const searchParams = JSON.parse(JSON.stringify(this.formSearch))

      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams }

      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },

    handleDownLoad(index, row) {
      if (row.piclist && row.piclist.length !== 0) {
        this.downloadByBlob(row.piclist[0].httpUrl, row.piclist[0].create)
      } else {
        this.$alert('当前无图片可下载', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    downloadByBlob(url, name) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          this.download(url, name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
    download(href, name) {
      const eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },
    handleExport() {
      const searchParams = JSON.parse(JSON.stringify(this.formSearch))

      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams }
      zacaoExport(clean(params)).then((res) => {
        console.log('执行导出')
      }).catch(err => err)
      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['区域', '来源', '名称', '种类', '危害程度', '图片', '发现时间']
      //   const filterVal = ['discReg', 'source', 'nameCn', 'specy', 'jydw', 'piclist', 'create']
      //   const list = this.tableData
      //   const data = this.formatJson(filterVal, list)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: '杂草信息',
      //     autoWidth: true,
      //     bookType: 'xlsx'
      //   })
      //   this.downloadLoading = false
      // }).catch(err => err)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'create') {
          return parseTime(v[j])
        } else if (j === 'piclist' && v[j]) {
          const url = []
          for (let a = 0; a < v[j].length; a++) {
            url.push(v[j][a].httpUrl)
          }
          return url.join(',')
        } else if (j === 'specy') {
          return (v[j].lb1 + v[j].lb2)
        } else {
          return v[j]
        }
      }))
    },
    handleSearch() {
      this.getPage()
    },
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
