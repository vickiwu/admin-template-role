module.exports = [
  // 系统管理员创建账户
  {
    url: '/admin/createUser',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },

  // 系统管理员修改下属账户资料
  {
    url: '/admin/editUser',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 删除账户
  {
    url: '/admin/deleteUser',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 查询账户
  {
    url: '/admin/getUserPage',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 用户自身资料修改
  {
    url: '/user/edit',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 用户信息查询
  {
    url: '/user/getInfo',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 用户登陆
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 用户登出
  {
    url: '/user/logout',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 发送验证码
  {
    url: '/user/sendsms',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 密码修改
  {
    url: '/user/changePassword',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 密码重置
  {
    url: '/user/resetPassword',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 头像设置
  {
    url: '/user/setAvatar',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 头像上传
  {
    url: '/upload/avatar',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // h4a 账户同步
  {
    url: '/admin/synH4a',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  },
  // 权限设置
  {
    url: '/admin/setPrivGroup',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因 }
        }
      }
    }
  }

]
