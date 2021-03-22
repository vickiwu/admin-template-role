<template>
  <div class="app-container">
    <div class="news-title">专家调度</div>
    <div class="blue-bg" @click="jumpManageMent()">
      <svg-icon icon-class="zhuanjiaguanli" class="bg-icon" />
      专家管理
    </div>
    <el-card shadow="always" class="news-card">
      <el-row class="report-row" :gutter="20">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">待研判杂草列表：</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="formInline.reg"
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
          <el-select v-model="formInline.specy" size="medium" placeholder="所有种类">
            <el-option label="未研判" :value="0" />
            <el-option label="研判中" :value="1" />
            <el-option label="入库" :value="16" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input
            v-model="formInline.region2"
            size="medium"
            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="small" @click="query">检索</el-button>
          <el-button type="danger" size="small">忽略</el-button>
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
          label="种类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>
              <span style="margin-right:10px"> {{ scope.row.specy.lb1 }}</span>科
              <span style="margin-left:10px;margin-right:10px">{{ scope.row.specy.lb2 }}</span>属
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
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
          prop="name"
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
          prop="name"
          label="发现时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        :current-page="pagination.start"
        :page-size="pagination.count"
        :total="totalCount"
        layout="prev, pager, next,slot"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      >
        <template>
          <span class="slot-span">显示第{{ pagination.start + 1 }}至第{{ (pagination.start + pagination.count)>totalCount ? totalCount : (pagination.start + pagination.count) }}项结果，共{{ totalCount }}项</span>
        </template>
      </el-pagination>
    </el-card>
    <el-card shadow="always" class="bottom-card">
      <el-row class="report-row" type="flex" justify="space-between">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">专家调度</span>
        </el-col>

        <el-col :span="10" class="right-btn">
          <el-row :gutter="10">
            <el-col :span="11">
              <span class="row-title">当前调度模式：</span>
            </el-col>
            <el-col :span="11">
              <el-select
                v-model="formInline2.region1"
                size="medium"
                placeholder="人工调度"
              >
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="选择专家" prop="name">
          <el-select
            v-model="form.name"
            size="medium"
            placeholder="请选择一位专家"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-row type="flex" justify="space-between">
          <el-col :span="13">
            <el-form-item label="专家介绍" prop="desc">
              <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="该专家详细情况：" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专家头像：" prop="img">
              <el-avatar shape="square" :size="80" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="btn-center">
          <el-button type="primary" @click="onSubmit">派发</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import { getPage } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'

const cityJson = require('@/assets/json/cities.json')

export default {

  data() {
    return {
      cityJson: cityJson.cityies,
      form: {
        name: '',
        img: '',
        desc: ''
      },
      formInline: {
        reg: '',
        specy: '',
        region3: ''
      },
      formInline2: {
        region1: ''
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
    this.query()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const searchParams = JSON.parse(JSON.stringify(this.formInline))
      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.pagination, ...searchParams }
      getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      })
    },
    handlePageChange(val) {
      this.pagination.pageIndex = val
    },
    onSubmit() {
      console.log('submit!')
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
    line-height: 36px;
    color: #0040a2;
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
