module.exports = {
  // 服务器ip地址
  serverIP: '106.13.217.53',
  // 服务器端口
  serverPort: '19000',
  // 每页查询数量
  pageCount: 13,
  // 接口地址
  admin: { // 用户相关接口
    createUser: '/admin/createUser', // 系统管理员创建账户
    editUser: '/admin/editUser', // 系统管理员修改下属账户资料
    deleteUser: '/admin/deleteUser', // 删除账户
    getUserPage: '/admin/getUserPage', // 查询账户
    userEdit: '/user/edit', // 用户自身资料修改
    getInfo: '/user/getInfo', // 用户信息查询
    login: '/user/login', // 用户登陆
    logout: '/user/logout', // 用户登出
    sendsms: '/user/sendsms', // 发送验证码
    changePassword: '/user/changePassword', // 密码修改
    resetPassword: '/user/resetPassword', // 密码重置
    setAvatar: '/user/setAvatar', // 头像设置
    uploadAvatar: '/upload/avatar', // 头像上传
    getH4aUserPage: 'admin/getH4aUserPage',
    synH4a: '/admin/synH4a', // h4a 账户同步
    setPrivGroup: '/admin/setPrivGroup'// 权限设置
  },
  log: { // 日志相关接口
    logDelete: '/log/delete', // 日志删除
    getLog: '/log/get', // 日志单个查询
    getPage: '/log/getPage' // 日志批量查询
  },
  sys: { // sys相关接口
    setScheduleMode: '/sys/setScheduleMode', //  管理员设置专家调度模式为人工模式或自动模式
    setH4aUrl: '/sys/setH4aUrl', // 管理员设置海关 H4A 具体地址
    setSpecies: '/sys/setSpecies', // 杂草全部种类设置
    getFilePage: '/sys/getFilePage', // 查询全局文件
    getServerList: '/sys/getServerList'// 查询全局空间
  },
  xinwen: { // 新闻相关接口
    create: '/xinwen/create', // 新闻录入
    edit: '/xinwen/edit', // 新闻修改
    xinwenDelete: '/xinwen/delete', // 新闻删除
    getXinwen: '/xinwen/get', // 新闻单个查询
    getPage: '/xinwen/getPage', // 新闻批量查询
    getHotNews: '/xinwen/getHotNews' // 热点新闻查询
  },
  yanpan: { // 研判相关接口
    create: '/yanpan/schedule', // 人工调度
    getTaskPage: '/yanpan/getTaskPage', //  研判任务查询
    commit: '/yanpan/commit' // 杂草研判
  },
  zaocao: { // 杂草相关接口
    uploadImg: '/upload/img', // 用户向平台上传一张图片
    create: '/zacao/create', // 杂草录入
    edit: '/zacao/edit', // 杂草信息修改
    zacaoDelete: '/zacao/delete', // 杂草删除
    getZacao: '/zacao/get', // 杂草单个查询
    getPage: '/zacao/getPage', // 杂草批量查询
    getTaskPage: '/yanpan/getTaskPage', // 研判任务查询
    commit: '/yanpan/commit', // 杂草研判
    getLbPage: '/zacao/getLbPage', // 杂草类别查询
    addLb: '/zacao/addLb', // 杂草类别新增
    editLb: '/zacao/editLb', // 杂草类别修改
    delLb: '/zacao/delLb', // 杂草类别删除
    heatmapTotal: '/zacao/heatmapTotal', // 杂草热力图总数
    heatmap: '/zacao/heatmap', // 杂草热力图-分页获取
    totalCount: '/zacao/totalCount', // 杂草总数量-地图
    getDistPage: '/zacao/getDistPage', // 分页获取杂草分布-地图
    tongji: '/zacao/tongji', // 杂草统计表
    export: '/zacao/export' // 杂草导出
  },
  zhuanjia: { // 专家相关接口
    create: '/zhuanjia/create', // 专家录入
    edit: '/zhuanjia/edit', // 专家信息修改
    zhuanjiaDelete: '/zhuanjia/delete', // 专家删除
    getZhuanjia: '/zhuanjia/get', // 专家单个查询
    getPage: '/zhuanjia/getPage'// 专家批量查询
  },
  ziliao: { // 资料相关接口
    uploadFile: '/upload/file', // 文件上传
    create: '/ziliao/create', // 用户上传资料
    edit: '/ziliao/edit', // 资料信息修改
    ziliaoDelete: '/ziliao/delete', // 资料删除
    getZiliao: '/ziliao/get', // 资料单个查询
    getPage: '/ziliao/getPage'// 资料批量查询
  }

}
