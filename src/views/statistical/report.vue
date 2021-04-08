<template>
  <div class="app-container">
    <el-row type="flex" class="report-row" justify="space-around" :gutter="5">
      <el-col :span="18">
        <el-card class="left-card" shadow="always">
          <el-row type="flex" justify="space-between">
            <el-col :span="8" style="margin-left:2px">
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
            <!-- <el-col :span="3">
              <el-select
                v-model="formSearch.reg"
                clearable

                placeholder="所有区域"
              >
                <el-option
                  v-for="item in cityJson"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col> -->
            <el-col :span="3" style="margin-left:2px">
              <el-select
                v-model="value1"
                placeholder="请选择省"
                clearable
                @change="selectOne"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"

                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="3" style="margin-left:2px">
              <el-select
                v-model="value2"
                clearable
                placeholder="请选择市"
                @change="selectSecond"
              >
                <el-option
                  v-for="item in tempList"
                  :key="item"
                  clearable
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :span="4" style="margin-left:2px">
              <el-select-tree
                v-model="selectId"
                width="120px"
                placeholder="所有种类"
                clearable
                :props="treeProps"
                style="width:100%"
                :load="loadNode"
                lazy
                :check-strictly="true"
                @change="changeSpecy"
              />
            </el-col>
            <el-col :span="4" style="margin-left:2px">
              <el-select v-model="formSearch.jydw" clearable placeholder="检疫地位">
                <!-- <el-option label="未发现有害生物" :value="0" /> -->
                <el-option label="非检疫性有害生物" :value="1" />
                <el-option label="检疫性有害生物" :value="2" />
                <!-- <el-option label="非鉴定性有害生物" :value="3" /> -->
              </el-select>
            </el-col>
            <el-col :span="2" style="margin-left:2px;text-align: right;">
              <el-button type="primary" @click="handleSearch()">检索</el-button>
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
              width="130"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">

                <div>
                  <span style="margin-right:5px"> {{ scope.row.specy ? scope.row.specy.lb1: '' }}</span>
                  <span style="margin-right:5px">{{ scope.row.specy ? scope.row.specy.lb2: "" }}</span>
                  <span style="">{{ scope.row.specy && scope.row.specy.lb3 }}</span>
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
      </el-col>
      <el-col :span="6" class="right-col">
        <el-card class="right-card" shadow="always">
          <div class="body-card">
            <div class="title-card">杂草数量</div>
            <div class="chart-card">
              <div id="main1" style="height:100%;width:100%" />
            </div>
          </div>
        </el-card>
        <el-card class="right-card" shadow="always">
          <div class="body-card">
            <div class="title-card">区域分布</div>
            <div class="chart-card">
              <div id="main2" style="height:100%;width:100%" />
            </div>
          </div>
        </el-card>
        <el-card class="right-card" shadow="always">
          <div class="body-card">
            <div class="title-card">种类分布</div>
            <div class="chart-card">
              <div id="main3" style="height:100%;width:100%" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPage, getSpecLbPage, tongji } from '@/api/zacao'
import { clean, parseTime } from '@/utils/index'
// const cityJson = require('@/assets/json/cities.json')
const provinceJson = require('@/assets/json/province2city.json')
const provinceList = []
for (const item in provinceJson) {
  provinceList.push({ value: item, label: item })
}
import ElSelectTree from 'el-select-tree'
import { pageCount } from '@/globalConfig'

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      // cityJson: cityJson.cityies,
      provinceList: provinceList,
      value1: '', // 广西省
      value2: '',
      tempList: [], // provinceJson['广西省']
      formSearch: {
        reg: '',
        specy: '',
        jydw: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      selectId: '',
      treeProps: {
        value: 'id',
        children: 'option',
        label: 'lb'
      },
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0,
      countStatX: [],
      countStatY: [],
      regionStatX: [],
      regionStatY: [],
      specyStat: []
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
    this.tongji()
  },
  methods: {
    selectOne(params) {
      this.formSearch.reg = ''
      this.formSearch.reg = params
      this.tempList = provinceJson[params]
      this.value2 = ''
    },
    selectSecond(params) {
      this.formSearch.reg = params
    },
    parseTime(time) {
      // 时间戳处理
      return parseTime(time)
    },
    changeSpecy(val, data) {
      if (data) {
        const specy = data.data
        this.formSearch.specy = JSON.stringify(specy)
      } else {
        this.formSearch.specy = ''
      }
    },
    async loadNode(node, resolve) {
      const params = { count: 1000, start: 0 }
      if (node.level === 0) { // 目
        const arr = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb1, data: item }
          })
        }).catch(err => err)
        return resolve(arr)
      }
      if (node.level === 1) { // 科 lb1
        params.lb1 = node.data.lb
        const arr2 = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb2, data: item }
          })
        }).catch(err => err)
        return resolve(arr2)
      }
      if (node.level === 2) { // 属 lb1 lb2
        params.lb1 = node.data.data.lb1
        params.lb2 = node.data.data.lb2
        const arr3 = await getSpecLbPage(clean(params)).then((res) => {
          return res.data.lblist.map(item => {
            return { id: item.id, lb: item.lb3, data: item }
          })
        }).catch(err => err)
        return resolve(arr3)
      }
      if (node.level > 2) {
        return resolve([])
      }
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
    async tongji() {
      await tongji().then((res) => {
        const { data } = res
        for (const i in data.countStat) {
          this.countStatX.push(i)
          this.countStatY.push(data.countStat[i])
        }
        for (const i in data.regionStat) {
          this.regionStatX.push(i)
          this.regionStatY.push(data.regionStat[i])
        }
        for (const i in data.specyStat) {
          const item = {}
          item.name = i
          item.value = data.specyStat[i]
          this.specyStat.push(item)
        }
        this.loadChart1()
        this.loadChart2()
        this.loadChart3()
      }).catch(err => err)
    },

    handleSearch() {
      this.getPage()
    },
    loadChart1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'))
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '10%',
          right: '10px',
          top: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.countStatX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.countStatY,
          type: 'line',
          // smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: 'rgba(58,132,255,0)'
            }, {
              offset: 1,
              color: 'rgba(58,132,255,0.35)'
            }])
          }
        }]
      })
    },
    loadChart2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main2'))
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '10%',
          right: '10px',
          top: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: this.regionStatX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.regionStatY,
          type: 'bar'
        }]
      })
    },
    loadChart3() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main3'))
      // 绘制图表
      myChart.setOption({

        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '种类分布',
            type: 'pie',
            radius: ['30%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            labelLine: {
              show: false
            },
            data: this.specyStat
          }
        ]
      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.getPage()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.app-container{
  padding:20px 10px;
}
.report-row {
  min-height: 100%;
  .left-card {
    height: 100%;
    .line{
      text-align: center;
      line-height: 28px;
    }
  }
  .right-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .right-card {
      height: 32%;
      width: 100%;

      ::v-deep.el-card__body{
        padding: 5px 10px;
        height: 100%;
        width: 100%;
      }

      .body-card{
        height: 100%;
        width: 100%;

        .title-card{
          height: 30px;
          line-height: 30px;
        }

        .chart-card{
          height: calc(100% - 30px);
        }
      }

    }
  }
}
.report-table{
  margin: 10px 0;
}
::v-deep.el-pagination{
  text-align: right;
  .slot-span{
      float: left;
    }
}
</style>
