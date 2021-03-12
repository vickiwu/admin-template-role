module.exports = [
  // 新闻录入
  {
    url: '/xinwen/create',
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
  // 新闻修改
  {
    url: '/xinwen/edit',
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
  // 新闻删除
  {
    url: '/xinwen/delete',
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
  // 新闻单个查询
  {
    url: '/xinwen/get',
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
  // 新闻批量查询
  {
    url: '/xinwen/getPage',
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
