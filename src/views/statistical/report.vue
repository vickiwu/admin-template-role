<template>
  <div class="app-container">
    <el-row type="flex" class="report-row" justify="space-around">
      <el-col :span="15">
        <el-card class="left-card" shadow="always">
          <el-row type="flex" class="report-row" justify="space-between">
            <el-col :span="11">
              <el-col :span="11">
                <el-date-picker v-model="formInline.date1" size="medium" type="date" placeholder="开始日期" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker v-model="formInline.date2" size="medium" type="date" placeholder="结束日期" style="width: 100%;" />
              </el-col>
            </el-col>
            <el-col :span="4">
              <el-select v-model="formInline.region1" size="medium" placeholder="所有区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="formInline.region2" size="medium" placeholder="所有种类">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="formInline.region3" size="medium" placeholder="所有程度">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="report-table"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="date"
              label="区域"
              width="80"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="name"
              label="来源"
              width="80"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="address"
              label="名称"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="name"
              label="种类"
              width="80"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="name"
              label="危害程度"
              width="80"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="name"
              label="图片"
              width="80"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="name"
              label="发现时间"
              width="80"
              :show-overflow-tooltip="true"
            />
          </el-table>
          <!-- 分页 -->
          <el-pagination
            v-if="pagination.total > pagination.pageSize"
            background
            :current-page="pagination.pageIndex"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="prev, pager, next,slot"
            style="margin-top: 15px"
            @current-change="handlePageChange"
          >
            <template>
              <span class="slot-span">显示第{{ (pagination.pageIndex - 1) * pagination.pageSize + 1 }}至第{{ pagination.pageIndex * pagination.pageSize }}项结果，共{{ pagination.total }}项</span>
            </template>
          </el-pagination>

        </el-card>
      </el-col>
      <el-col :span="8" class="right-col">
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

export default {

  data() {
    return {
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        date2: ''
      },
      tableData: [{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      pagination: {
        pageSize: 10,
        total: 100,
        pageIndex: 1
      }
    }
  },
  mounted() {
    this.loadChart1()
    this.loadChart2()
    this.loadChart3()
  },
  methods: {
    loadChart1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'))
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '10%',
          top: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [82, 92, 91, 94, 90, 83, 62, 72, 81, 54, 60, 70],
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
          top: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: ['鼓楼区', '江宁区', '栖霞区', '浦口区', '玄武区']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70],
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
            data: [
              { value: 1048, name: '种类一' },
              { value: 735, name: '种类二' },
              { value: 580, name: '种类三' },
              { value: 484, name: '种类四' },
              { value: 300, name: '种类五' }
            ]
          }
        ]
      })
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.pageIndex = val
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.app-container{
  padding:20px 10px;
}
.report-row {
  height: 100%;
  .left-card {
    height: 100%;
    .line{
      text-align: center;
      line-height: 36px;
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
