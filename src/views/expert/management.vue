<template>
  <div class="app-container">
    <div class="news-title">专家管理</div>
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
          <el-select v-model="formInline.cat" size="medium" placeholder="专业领域">
            <el-option label="杂草研判" :value="1" />
            <el-option label="杂草危害分析" :value="2" />
          </el-select>
        </el-col>
        <el-col :span="11" class="right-btn">

          <el-button type="primary" size="small" @click="query">检索</el-button>
          <el-button type="primary" size="small" @click="handleAdd()">新增</el-button>
          <el-button type="danger" size="small" @click="deleteZhuanjia">删除</el-button>
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
              style="width: 40px; "
              :src="scope.row.avatar && scope.row.avatar.httpUrl"
              :preview-src-list="[scope.row.avatar && scope.row.avatar.httpUrl]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
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
          width="80"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color: #409EFF;cursor:pointer;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              修改
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
        count: 10,
        index: 1
      },
      totalCount: 0,
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
      })
    },
    handleEdit(index, rowData) {
      console.log('%c 🌮 index,rowData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', index, rowData)
      // 跳转页面
      this.$router.push({
        name: 'AddExpert',
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
    handleSelectionChange(val) {
      this.selected = val
    },
    deleteZhuanjia() {
      if (this.selected.length === 0) {
        this.$message.error('请选择要删除的专家！')
        return
      }
      if (this.selected.length > 1) {
        this.$message.error('请单独选择一个专家进行删除！')
        return
      }
      const ids = []
      this.selected.forEach(item => ids.push(item.id))
      this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        zhuanjiaDelete({ id: ids[0] }).then(res => {
          if (res.state === 1) {
            this.$message.success('删除成功！')
          }
          this.query()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
