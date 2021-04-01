<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" class="report-row" justify="space-between">
        <el-col :span="4">
          <el-input v-model="formInline.name" size="medium" placeholder="姓名" prefix-icon="el-icon-search" />
        </el-col>

        <el-col :span="4">
          <el-input v-model="formInline.jobNo" size="medium" placeholder="工号" prefix-icon="el-icon-search">
            <!-- <template slot="append">检索</template> -->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formInline.cat" size="medium" clearable placeholder="专业领域">
            <el-option label="杂草研判" :value="1" />
            <el-option label="杂草危害分析" :value="2" />
          </el-select>
        </el-col>
        <el-col :span="11" class="right-btn">

          <el-button type="primary" size="small" @click="query">检索</el-button>
          <!-- <el-button type="primary" size="small" @click="handleAdd()">新增</el-button> -->
          <!-- <el-button type="danger" size="small" @click="deleteZhuanjia">删除</el-button> -->
        </el-col>
      </el-row>
      <el-table
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
          prop="realname"
          label="专家姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jobNo"
          label="专家工号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="phone"
          label="手机号码"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="cat"
          label="专业领域"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.cat === 1">杂草研判</span>
            <span v-else-if="scope.row.cat === 2">杂草危害分析</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="schedule"
          label="参与调度"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.schedule === 1">是</span>
            <span v-else-if="scope.row.schedule === 0">否</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="简介"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="avatarJson"
          label="头像"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">

            <el-image
              v-if="scope.row.avatar && scope.row.avatar.httpUrl"
              style="width: 40px; "
              :src="scope.row.avatar && scope.row.avatar.httpUrl"
              :preview-src-list="[scope.row.avatar && scope.row.avatar.httpUrl]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <i v-else class="el-icon-picture-outline" />
          </template>
        </el-table-column>
        <el-table-column
          prop="create"
          label="录入时间"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="编辑"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;margin-right:10px"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
            <span
              style="color: #F56C6C;cursor:pointer;"
              @click="deleteZhuanjia(scope.row)"
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
import { getPage, zhuanjiaDelete } from '@/api/zhuanjia'
import { clean, parseTime } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {

  data() {
    return {
      formInline: {
        cat: '',
        jobNo: '',
        name: ''
      },
      tableData: [],
      pagination: {
        count: pageCount,
        index: 1
      },
      totalCount: 0
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
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    async query() {
      const params = {
        ...this.queryPageination,
        ...this.formInline
      }
      await getPage(clean(params)).then((res) => {
        const { data } = res
        this.tableData = data.zhuanjialist
        this.totalCount = data.totalCount
      }).catch(err => err)
    },
    handleEdit(index, rowData) {
      // 跳转页面
      this.$router.push({
        name: 'EditExpert',
        params: {
          index,
          rowData,
          isEdit: true
        }
      })
    },
    handleAdd() {
      // 跳转页面
      this.$router.push({
        name: 'AddExpert',
        params: {
          isEdit: false
        }
      })
    },
    handlePageChange(val) {
      this.pagination.index = val
      this.query()
    },
    deleteZhuanjia(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        zhuanjiaDelete({ id: row.id }).then(res => {
          if (res.state === 1) {
            this.$alert('删除成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
          }
          this.query()
        }).catch(err => err)
      }).catch(err => err)
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
