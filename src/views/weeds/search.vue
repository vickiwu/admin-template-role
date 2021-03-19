<template>
  <div class="app-container">
    <div class="news-title">杂草管理 <span class="news-sub">/</span> <span class="news-sub-title">杂草检索</span> </div>
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
            multiple
            collapse-tags
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
          <el-select v-model="formSearch.specy" size="medium" placeholder="所有种类">
            <el-option label="未研判" :value="0" />
            <el-option label="研判中" :value="1" />
            <el-option label="入库" :value="16" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formSearch.jydw" size="medium" placeholder="所有程度">
            <el-option label="未发现有害生物" :value="0" />
            <el-option label="非检疫性有害生物" :value="1" />
            <el-option label="检疫性有害生物" :value="2" />
            <el-option label="非鉴定性有害生物" :value="3" />
          </el-select>
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="small" @click="handleSearch()">检索</el-button>
          <el-button type="primary" size="small" @click="handleDownLoad()">下载图片</el-button>
          <el-button type="primary" size="small" @click="handleExport()">导出</el-button>
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
          prop="discRegJson"
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
          prop="specyJson"
          label="种类"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jydw"
          label="危害程度"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="piclistJson"
          label="图片"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="create"
          label="发现时间"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="totalCount > pagination.count"
        background
        :current-page="pagination.start"
        :page-size="pagination.count"
        :total="totalCount"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ pagination.start + 1 }}至第{{ pagination.start + pagination.count }}项结果，共{{ totalCount }}项</span>
        </template>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getPage } from '@/api/zacao'
import { clean } from '@/utils/index'
const cityJson = require('@/assets/json/cities.json')

export default {

  data() {
    return {
      cityJson: cityJson.cityies,
      formSearch: {
        reg: '',
        specy: '',
        jydw: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      pagination: {
        count: 10,
        start: 0
      },
      totalCount: 0
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    async getPage() {
      const searchParams = JSON.parse(JSON.stringify(this.formSearch))
      searchParams.reg = JSON.stringify(searchParams.reg)
      const params = { ...this.pagination, ...searchParams }

      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      })
    },
    handleEdit(index, rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', index, rowData)
      // 跳转到修改页面
      // this.$router.push({
      //   name: 'AddNews',
      //   params: {
      //     index, rowData
      //   }
      // })
    },
    handleDownLoad() {
      // 处理下载函数

    },
    handleExport() {},
    handleSearch() {
      this.getPage()
    },
    handlePageChange(val) {
      this.pagination.start = (val - 1) * this.pagination.count
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
