<template>
  <div class="app-container">
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
            clearable
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
          <el-select-tree
            v-model="selectId"
            width="120px"
            placeholder="所有种类"
            clearable
            :data="options"
            :props="treeProps"
            size="medium"
            @change="changeSpecy"
          />

        </el-col>
        <el-col :span="5">
          <el-input
            v-model="formInline.name"
            size="medium"
            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="5" class="right-btn">
          <el-button type="primary" size="small" @click="query">检索</el-button>
          <!-- <el-button type="danger" size="small">忽略</el-button> -->
        </el-col>
      </el-row>
      <el-table
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
    <el-card shadow="always" class="bottom-card">
      <el-row class="report-row" type="flex" justify="space-between">
        <el-col :span="4" style="text-align:left">
          <span class="row-title">专家调度</span>
        </el-col>

        <!-- <el-col :span="10" class="right-btn">
          <el-row :gutter="10">
            <el-col :span="11">
              <span class="row-title">当前调度模式：</span>
            </el-col>
            <el-col :span="11" />
          </el-row>

        </el-col> -->
      </el-row>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
      >
        <el-row :gutter="30">
          <el-col :span="13">
            <el-form-item label="选择专家" prop="name">
              <el-select
                v-model="form.id"
                clearable
                size="medium"
                placeholder="请选择一位专家"
                style="width: 100%"
                @change="setZhuanjiaInfo"
              >
                <el-option
                  v-for="item in zhuanjialist"
                  :key="item.id+ item.create"
                  :label="item.realname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="当前调度模式">
              <el-input
                v-model="formInline2.region1"
                disabled
                style="width: 100%"
                size="medium"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="13">
            <el-form-item label="专家介绍" prop="desc">
              <el-input v-model="form.desc" disabled type="textarea" :rows="3" placeholder="该专家详细情况：" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="专家头像" prop="img">
              <el-avatar shape="square" :size="80" :src="form.img" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="btn-center">
            <el-button type="primary" @click="onSubmit">派发</el-button>
          </el-form-item>
        </el-row>

      </el-form>

    </el-card>
  </div>
</template>

<script>
import { getPage, getLbPage } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
import { getPage as getZhuanjia } from '@/api/zhuanjia'
import { create } from '@/api/yanpan'
import ElSelectTree from 'el-select-tree'

const cityJson = require('@/assets/json/cities.json')

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      cityJson: cityJson.cityies,
      form: {
        id: '',
        name: '',
        img: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        desc: ''
      },
      formInline: {
        reg: '',
        specy: '',
        name: ''
      },
      selectId: '',
      specyList: [],
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb2'
      },
      formInline2: {
        region1: '人工调度'
      },
      options: [], // 处理后的杂草数据
      tableData: [],
      pagination: {
        count: 5,
        index: 1
      },
      totalCount: 0,
      zhuanjialist: [],
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
    this.getLbPage()
    this.queryZhuanjia()
  },
  methods: {
    changeSpecy(val) {
      const specy = this.specyList.find((obj) => obj.id === val)
      this.formInline.specy = JSON.stringify(specy)
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
    parseTime(time) {
      return parseTime(time)
    },
    query() {
      const searchParams = JSON.parse(JSON.stringify(this.formInline))
      if (searchParams.reg.length !== 0) {
        searchParams.reg = JSON.stringify(searchParams.reg)
      }
      const params = { ...this.queryPageination, ...searchParams }
      getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zacaolist
        this.totalCount = data.totalCount
      })
    },
    queryZhuanjia() {
      getZhuanjia().then((res) => {
        const { data } = res
        this.zhuanjialist = data.zhuanjialist
      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    setZhuanjiaInfo(val) {
      const zhuanjia = this.zhuanjialist.find(item => item.id === val)
      this.form.desc = zhuanjia.desc
      this.form.img = zhuanjia.avatar && zhuanjia.avatar.httpUrl
    },
    onSubmit() {
      if (this.selected.length === 0) {
        this.$alert('请选择至少一个杂草', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.selected.length > 1) {
        this.$alert('请选择一个杂草', {
          confirmButtonText: '确定'
        })
        return
      }
      if (!this.form.id) {
        this.$alert('请选择一个专家', {
          confirmButtonText: '确定'
        })
        return
      }
      create({ zhuanjiaId: this.form.id, zacaoId: this.selected[0].id }).then((data) => {
        if (data.state === 1) {
          this.$alert('派发成功', {
            confirmButtonText: '确定'
          })
          this.selected = []
          this.form = {
            id: '',
            name: '',
            img: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            desc: ''
          }
        }
      })
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
