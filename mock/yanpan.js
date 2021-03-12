module.exports = [
  // 人工调度
  {
    url: '/yanpan/schedule',
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
  //  研判任务查询
  {
    url: '/yanpan/getTaskPage',
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
  // 杂草研判
  {
    url: '/yanpan/commit',
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
