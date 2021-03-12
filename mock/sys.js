module.exports = [
  // 管理员设置专家调度模式为人工模式或自动模式
  {
    url: '/sys/setScheduleMode',
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

  // 管理员设置海关 H4A 具体地址
  {
    url: '/sys/setH4aUrl',
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
  // 杂草全部种类设置
  {
    url: '/sys/setSpecies',
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
  // 查询全局文件
  {
    url: '/sys/getFilePage',
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
  // 查询全局空间
  {
    url: '/sys/getServerList',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        'state': 1, // 1->成功, 0->失败
        data: {
          'user': {
            username
          },
          'msg': '........' // 如果失败, 这个字段给出失败原因
        }
      }
    }
  }
]
