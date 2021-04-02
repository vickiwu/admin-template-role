<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <div @click="getInfo()">
            <el-dropdown-item><i class="el-icon-document" /> 基本资料
            </el-dropdown-item>
          </div>
          <div @click="dialogChangePassword = true">
            <el-dropdown-item><i class="el-icon-lock" /> 修改密码
            </el-dropdown-item>
          </div>
          <div @click="dialogImg = true">
            <el-dropdown-item><i class="el-icon-user" /> 修改头像
            </el-dropdown-item>
          </div>
          <!-- 处理退出，删除token -->
          <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button" /> 退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="基本资料"
      :visible.sync="dialogUserInfo"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        ref="userInfoForm"
        :model="userInfoForm"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfoForm.username" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="userInfoForm.realname" disabled placeholder="" />
        </el-form-item>
        <!-- <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfoForm.nickname"    disabled placeholder="" />
        </el-form-item> -->
        <el-form-item label="地市" prop="cityName">
          <el-input v-model="userInfoForm.cityName" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="单位" prop="group">
          <el-input v-model="userInfoForm.group" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="工号" prop="jobNo">
          <el-input v-model="userInfoForm.jobNo" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="userInfoForm.phone" disabled placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="类型" prop="utype">
          <el-select v-model="userInfoForm.utype" disabled clearable placeholder="请选择类型">
            <el-option label="系统管理员" :value="1" />
            <el-option label="专家调度用户" :value="2" />
            <el-option label="研判专家" :value="3" />
            <el-option label="图像采集操作员" :value="4" />
          </el-select>

        </el-form-item>
        <div style="text-align:center;margin-top: 25px;">
          <el-button type="primary" @click="dialogUserInfo = false">关 闭</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogChangePassword"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        ref="formChangePassword"
        :model="formChangePassword"
        :rules="formChangePasswordRules"
        label-width="120px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="当前密码" prop="oldPass">
          <el-input v-model="formChangePassword.oldPass" type="password" placeholder="请输入当前密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="formChangePassword.newPass" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPass2">
          <el-input v-model="formChangePassword.newPass2" type="password" placeholder="请输入确认新密码" />
        </el-form-item>

        <div style="text-align:center">
          <el-button type="primary" @click="changePassword()">确认修改</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogImg"
      :modal-append-to-body="false"
      width="35%"
      @open="showAvatar"
    >
      <div style="text-align:center; ">
        <div class="avatar-wrapper">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
        </div>
        <div style="text-align:center;">
          <el-upload
            style="display: inline-block;"
            action="string"

            :http-request="uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary" style="margin-right:20px">
              上传图片
            </el-button>
          </el-upload>
          <el-button type="primary" @click="setAvatar">确认更改</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changePassword, uploadAvatar, setAvatar } from '@/api/admin'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePassNew = (rule, value, callback) => {
      if (value.length < 4 || value.length > 32) {
        callback(new Error('密码的长度在4-32位！请输入正确的新密码'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value !== this.formChangePassword.newPass) {
        callback(new Error('两次密码需要一致'))
      } else {
        callback()
      }
    }
    return {
      dialogUserInfo: false,
      dialogChangePassword: false,
      dialogImg: false,
      imageUrl: '',
      fileData: null,
      userInfoForm: {
        username: '', // 用户名
        realname: '', // 真实姓名
        nickname: '', // 昵称
        cityName: '', // 地市
        group: '', // 单位 todo 字段待定
        jobNo: '', // 工号
        phone: '', // 手机号
        utype: '' // 类型
      },
      formChangePassword: {
        oldPass: '',
        newPass: '',
        newPass2: ''
      },
      formChangePasswordRules: {
        oldPass: [{ required: true, message: '请输入原来的密码', trigger: 'blur' }],
        newPass: [{ required: true, message: '请输入新密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePassNew }
        ],
        newPass2: [{ required: true, message: '请重新输入新密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePass }]
      }

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    showAvatar() {
      this.imageUrl = this.avatar
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$alert('上传图片只能是 JPG 或者PNG 格式!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$alert('上传头像图片大小不能超过 2MB!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).catch(err => err)
      }
      return isJPG && isLt2M
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    async getInfo() {
      const data = await this.$store.dispatch('user/getInfo')
      this.userInfoForm = data.user
      this.dialogUserInfo = true
    },
    changePassword() {
      this.$refs.formChangePassword.validate(async valid => {
        if (valid) {
          // 验证通过
          await changePassword({ oldPass: this.formChangePassword.oldPass, newPass: this.formChangePassword.newPass })
          this.dialogChangePassword = false
        } else {
          // console.log('重置密码验证未通过!!')
          return false
        }
      })
    },
    async uploadAvatar(file) {
      const params = new FormData()
      params.append('file', file.file)
      const { data } = await uploadAvatar(params)
      this.fileData = data.result // 返回的是表单格式
    },
    async setAvatar() {
      await setAvatar({ json: JSON.stringify(this.fileData) }).then(() => {
        // 设置头像更新
        this.$store.dispatch('user/setUserAvatar', this.fileData.httpUrl)
        this.dialogImg = false
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        .user-name {
          font-size: 15px;
          display: inline-block;
          margin-left: 10px;
          font-weight: bold;
          cursor: pointer;
        }
        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 32px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.user-dropdown {
  ::v-deep .el-dropdown-menu__item i {
    font-size: 16px;
  }
}
.news-form {
  width: 50%;
  margin: 0 auto;
  ::v-deep.el-select{
    width: 100%;
  }
  ::v-deep.el-input.is-disabled .el-input__inner{
        background-color: #ffffff;
        color: #606266;
  }
}
.img-info{
    height: 240px;
    width: 350px;
    margin-bottom:20px;
    ::v-deep.image-slot{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 24px;
  }
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    width: 150px;
    height: 150px;
    display: block;
    margin: 0px auto;
    margin-bottom: 20px;
  }

</style>
