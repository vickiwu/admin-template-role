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
          <span class="user-name">用户名</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <div @click="dialogVisible = true">
            <el-dropdown-item><i class="el-icon-document" /> 基本资料
            </el-dropdown-item>
          </div>
          <div @click="dialogVisible2 = true">
            <el-dropdown-item><i class="el-icon-lock" /> 修改密码
            </el-dropdown-item>
          </div>
          <div @click="dialogVisible3 = true">
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
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="用户名" prop="name" placeholder="请输入用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="name2" placeholder="请输入真实姓名">
          <el-input v-model="form.name2" />
        </el-form-item>
        <el-form-item label="昵称" prop="name3" placeholder="请输入昵称">
          <el-input v-model="form.name3" />
        </el-form-item>

        <el-form-item label="地市" prop="name6" placeholder="请输入地市">
          <el-input v-model="form.name6" />
        </el-form-item>
        <el-form-item label="单位" prop="name7" placeholder="请输入单位">
          <el-input v-model="form.name7" />
        </el-form-item>
        <el-form-item label="工号" prop="name8" placeholder="请输入工号">
          <el-input v-model="form.name8" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name9" placeholder="请输入手机号码">
          <el-input v-model.number="form.name9" />
        </el-form-item>

        <el-form-item label="类型" prop="region1" placeholder="现场工作人员">
          <el-select v-model="form.region1" placeholder="请选择发现地域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible2"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        ref="form2"
        :model="form2"
        label-width="120px"
        label-position="left"
        class="news-form"
      >
        <el-form-item label="当前密码" prop="name" placeholder="请输入当前密码">
          <el-input v-model="form2.name" />
        </el-form-item>
        <el-form-item label="新密码" prop="name2" placeholder="请输入新密码">
          <el-input v-model="form2.name2" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="name3" placeholder="请输入确认新密码">
          <el-input v-model="form2.name3" />
        </el-form-item>

        <div style="text-align:center">
          <el-button type="primary" @click="dialogVisible2 = false">确认修改</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible3"
      :modal-append-to-body="false"
      width="35%"
    >
      <div style="text-align:center; ">
        <el-image class="img-info">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>

        <div style="text-align:center;">
          <el-button type="primary" style="margin-right:20px"> 长传图片</el-button>
          <el-button type="primary" @click="dialogVisible3 = false">确认更改</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      form: {
        name: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',
        region1: '',
        from: ''
      },
      form2: {
        name: '',
        name2: '',
        name3: ''
      }

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
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
          width: 40px;
          height: 40px;
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
  ::v-deep.el-select{
    width: 100%;
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

</style>
