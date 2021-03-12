module.exports = [
  // 文件上传
  {
    url: '/upload/file',
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

  // 用户上传资料
  {
    url: '/ziliao/create',
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
  // 资料信息修改
  {
    url: '/ziliao/edit',
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
  // 资料删除
  {
    url: '/ziliao/delete',
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
  // 资料单个查询
  {
    url: '/ziliao/get',
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
  },
  // 资料批量查询
  {
    url: '/ziliao/getPage',
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
