<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="调度模式：" prop="profScheMode">
          <el-radio-group v-model="form.profScheMode">
            <el-radio :label="1">人工调度</el-radio>
            <el-radio :label="2">自动调度</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="padding:7px 25px;font-size: 13px;" @click="onSubmit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSysConfig } from '@/utils/auth'
import { setScheduleMode } from '@/api/sys'

export default {
  data() {
    return {
      sysConfig: '',
      form: {
        profScheMode: ''
      },
      rules: {
        profScheMode: [
          { required: true, message: '请选择调度模式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

    profScheModeTxt() {
      if (this.sysConfig.profScheMode === 1) {
        return '人工调度' // 1
      } else {
        return '系统自动调度' // 2
      }
    }
  },
  mounted() {
    this.sysConfig = JSON.parse(getSysConfig())
    this.form.profScheMode = this.sysConfig.profScheMode
  },
  methods: {
    onSubmit() {
      setScheduleMode({ mode: this.form.profScheMode }).then((res) => {
        if (res.state === 1) {
          this.$alert('设置成功', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: async() => {
              await this.$store.dispatch('user/getInfo')
            }

          }).catch(err => err)
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>

.news-card {
.news-form{
  width: 50%;
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
