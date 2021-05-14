<template>
  <div class="app-container">
    <el-button type="primary" class="go-back-btn" @click="goBack">返回上一级</el-button>
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="用户" prop="userId">
          <el-select v-model="form.userId" clearable placeholder="请选择下属账户" @change="setRoles">
            <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问控制" prop="name" placeholder="请输入杂草来源">
          <el-checkbox-group v-model="checkList">
            <div>
              <el-checkbox label="有害生物录入" />
            </div>
            <div>
              <el-checkbox label="资料中心" />
            </div>
            <div>
              <el-checkbox label="调度中心" />
              <el-checkbox label="专家研判" />
            </div>

            <!-- <div>
              <el-checkbox label="新闻管理" />
            </div> -->

            <div>
              <el-checkbox label="系统日志" />
            </div>

            <div>
              <el-checkbox label="账户管理" />
              <!-- <el-checkbox label="账户同步" /> -->
            </div>

            <div>
              <el-checkbox label="文件管理" />
              <el-checkbox label="空间管理" />
            </div>

          </el-checkbox-group>
        </el-form-item>

        <el-form-item class="btn-center">
          <el-button @click="goBack">取消</el-button>
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
      defaultAll: ['有害生物录入', '资料中心', '专家中心', '专家研判', '新闻管理', '系统日志', '账户管理', '文件管理', '空间管理']
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mounted() {
    this.queryUserList()
  },
  methods: {
    goBack() {
      this.$router.go('-1')
    },
    queryUserList() {
      getUserPage().then((res) => {
        const { data } = res
        this.options = data.userlist
      }).catch(err => err)
    },
    setRoles() {
      const user = this.options.find(item => item.id === this.form.userId)
      const { privGroup } = user
      if (privGroup && privGroup.length > 0) {
        if (privGroup[0].pageName === '*' && privGroup[0].visible === 1) {
          // 设置权限
          this.checkList = this.defaultAll
        } else {
          const arr = []
          privGroup.forEach(item => {
            arr.push(item.pageName)
          })
          this.checkList = arr
        }
      }
    },
    onSubmit() {
      const arr = []
      this.checkList.forEach(item => {
        arr.push({
          pageName: item,
          visible: 1
        })
      })
      const params = {
        userId: this.form.userId,
        privGroup: JSON.stringify(arr)
      }
      setPrivGroup(params).then(data => {
        if (data.state === 1) {
          this.$alert('设置成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back-btn{
  margin-left: 20px ;
  margin-bottom: 15px;
}
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
