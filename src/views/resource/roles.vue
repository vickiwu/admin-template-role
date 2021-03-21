<template>
  <div class="app-container">
    <div class="news-title">权限设置 </div>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="用户" prop="userId">
          <el-select v-model="form.userId" placeholder="请选择下属账户" @change="setRoles">
            <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问控制" prop="name" placeholder="请输入杂草来源">
          <el-checkbox-group v-model="checkList">
            <div>
              <el-checkbox label="杂草管理" />
              <el-checkbox label="杂草检索" />
            </div>
            <div>
              <el-checkbox label="资料管理" />
              <el-checkbox label="资料检索" />
            </div>
            <div>
              <el-checkbox label="专家管理" />
              <el-checkbox label="专家检索" />
              <el-checkbox label="专家调度" />
            </div>

            <div>
              <el-checkbox label="新闻管理" />
            </div>

            <div>
              <el-checkbox label="日志管理" />
            </div>

            <div>
              <el-checkbox label="账户管理" />
              <el-checkbox label="账户同步" />
            </div>

            <div>
              <el-checkbox label="文件管理" />
              <el-checkbox label="空间管理" />
            </div>

          </el-checkbox-group>
        </el-form-item>

        <el-form-item class="btn-center">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserPage, setPrivGroup } from '@/api/admin'
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      form: {
        userId: '',
        desc: '',
        from: ''
      },
      options: [],
      checkList: [],
      privGroup: [
        { pageName: 'WeedsManagement', visible: 0, label: '杂草管理' },
        { pageName: 'Search', visible: 0, label: '杂草检索' },
        { pageName: 'Information', visible: 0, label: '资料管理' },
        { pageName: 'InformationSearch', visible: 0, label: '资料检索' },
        { pageName: 'ExpertManagement', visible: 0, label: '专家管理' },
        { pageName: 'Management', visible: 0, label: '新闻管理' },
        { pageName: 'Log', visible: 0, label: '日志管理' },
        { pageName: 'Account', visible: 0, label: '账户管理' },
        { pageName: 'SyncAccount', visible: 0, label: '账户同步' },
        { pageName: 'File', visible: 0, label: '文件管理' },
        { pageName: 'Space', visible: 0, label: '空间管理' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mounted() {
    console.log(this.$route.params, 'sss')
    this.queryUserList()
  },
  methods: {
    queryUserList() {
      getUserPage().then((res) => {
        const { data } = res
        this.options = data.userlist
      })
    },
    setRoles() {
      const user = this.options.find(item => item.id === this.form.userId)
      const { privGroup } = user
      if (privGroup && privGroup.length === 1 && privGroup[0].pageName === '*' && privGroup[0].visible === 1) {
        // 设置权限
        const arr = []
        this.privGroup.forEach(item => {
          arr.push(item.label)
        })
        this.checkList = arr
      }
    },
    onSubmit() {
      const arr = []
      this.privGroup.forEach(item => {
        if (this.checkList.includes(item.label)) {
          arr.push({
            pageName: item.pageName,
            visible: 1
          })
        }
      })
      const params = {
        userId: this.userId,
        privGroup: JSON.stringify(arr)
      }
      setPrivGroup(params).then(data => {
        if (data.state === 1) {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.news-card {
.news-form{
  width: 80%;
  margin: 15px auto;

  ::v-deep.el-select{
    width: 100%;
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
