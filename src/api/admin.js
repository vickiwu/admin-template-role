import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')
// 系统管理员创建账户
export function createUser(data) {
  return request({
    url: WeedGlobalConfig.admin.createUser,
    method: 'POST',
    data
  })
}

// 系统管理员修改下属账户资料
export function editUser(data) {
  return request({
    url: WeedGlobalConfig.admin.editUser,
    method: 'POST',
    data
  })
}
// 删除账户
export function deleteUser(data) {
  return request({
    url: WeedGlobalConfig.admin.deleteUser,
    method: 'POST',
    data
  })
}
// 查询账户
export function getUserPage(data) {
  return request({
    url: WeedGlobalConfig.admin.getUserPage,
    method: 'POST',
    data
  })
}
// 用户自身资料修改
export function userEdit(data) {
  return request({
    url: WeedGlobalConfig.admin.userEdit,
    method: 'POST',
    data
  })
}
// 用户信息查询
export function getInfo(data) {
  return request({
    url: WeedGlobalConfig.admin.getInfo,
    method: 'POST',
    data
  })
}

export function getH4aUserPage(data) {
  return request({
    url: WeedGlobalConfig.admin.getH4aUserPage,
    method: 'POST',
    data
  })
}

// 用户登陆
export function login(data) {
  return request({
    url: WeedGlobalConfig.admin.login,
    method: 'POST',
    data
  })
}
// 用户登出
export function logout(data) {
  return request({
    url: WeedGlobalConfig.admin.logout,
    method: 'POST',
    data
  })
}
// 发送验证码
export function sendsms(data) {
  return request({
    url: WeedGlobalConfig.admin.sendsms,
    method: 'POST',
    data
  })
}
// 密码修改
export function changePassword(data) {
  return request({
    url: WeedGlobalConfig.admin.changePassword,
    method: 'POST',
    data
  })
}
// 密码重置
export function resetPassword(data) {
  return request({
    url: WeedGlobalConfig.admin.resetPassword,
    method: 'POST',
    data
  })
}
// 头像设置
export function setAvatar(data) {
  return request({
    url: WeedGlobalConfig.admin.setAvatar,
    method: 'POST',
    data
  })
}
// 头像上传
export function uploadAvatar(data) {
  return request({
    url: WeedGlobalConfig.admin.uploadAvatar,
    method: 'POST',
    data
  })
}
// h4a 账户同步
export function synH4a(data) {
  return request({
    url: WeedGlobalConfig.admin.synH4a,
    method: 'POST',
    data
  })
}
// 权限设置
export function setPrivGroup(data) {
  return request({
    url: WeedGlobalConfig.admin.setPrivGroup,
    method: 'POST',
    data
  })
}
// 单位列表查询
export function getCompanyList(data) {
  return request({
    url: WeedGlobalConfig.admin.getCompanyList,
    method: 'POST',
    data
  })
}
// 单位列表修改
export function setCompanyList(data) {
  return request({
    url: WeedGlobalConfig.admin.setCompanyList,
    method: 'POST',
    data
  })
}
