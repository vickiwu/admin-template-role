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
            v-model="formInline.region1"
            size="medium"
            placeholder="所有区域"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="formInline.region2"
            size="medium"
            placeholder="所有种类"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input
            v-model="formInline.region2"
            size="medium"
            placeholder="搜索关键字"
            prefix-icon="el-icon-search"
          >
            <template slot="append">检索</template>
          </el-input>
        </el-col>
        <el-col :span="5" class="right-btn">
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
          prop="date"
          label="区域"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="来源"
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
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="危害程度"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="图片"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="name"
          label="发现时间"
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
        layout="prev, pager, next"
        style="margin-top: 15px"
        @current-change="handlePageChange"
      />
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

export default {

  data() {
    return {
      form: {
        name: '',
        img: '',
        desc: ''
      },
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        date2: ''
      },
      formInline2: {
        region1: ''
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
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      pagination: {
        pageSize: 10,
        total: 100,
        pageIndex: 1
      }
    }
  },
  created() {
  },
  methods: {
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
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
