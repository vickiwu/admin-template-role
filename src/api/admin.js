import request from '@/utils/request'
const defaultSettings = require('@/settings')
// 系统管理员创建账户
export function createUser(data) {
  return request({
    url: '/admin/createUser',
    method: 'POST',
    data
  })
}

// 系统管理员修改下属账户资料
export function editUser(data) {
  return request({
    url: '/admin/editUser',
    method: 'POST',
    data
  })
}
// 删除账户
export function deleteUser(data) {
  return request({
    url: '/admin/deleteUser',
    method: 'POST',
    data
  })
}
// 查询账户
export function getUserPage(data) {
  return request({
    url: '/admin/getUserPage',
    method: 'POST',
    data
  })
}
// 用户自身资料修改
export function userEdit(data) {
  return request({
    url: '/user/edit',
    method: 'POST',
    data
  })
}
// 用户信息查询
export function getInfo(data) {
  return request({
    url: '/user/getInfo',
    method: 'POST',
    // params: { ...data }
    data
  })
}
// 用户登陆
export function login(data) {
  return request({
    url: defaultSettings.loginUrl,
    method: 'POST',
    data
  })
}
// 用户登出
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'POST',
    data
  })
}
// 发送验证码
export function sendsms(data) {
  return request({
    url: '/user/sendsms',
    method: 'POST',
    data
  })
}
// 密码修改
export function changePassword(data) {
  return request({
    url: '/user/changePassword',
    method: 'POST',
    data
  })
}
// 密码重置
export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'POST',
    data
  })
}
// 头像设置
export function setAvatar(data) {
  return request({
    url: '/user/setAvatar',
    method: 'POST',
    data
  })
}
// 头像上传
export function uploadAvatar(data) {
  return request({
    url: '/upload/avatar',
    method: 'POST',
    data
  })
}
// h4a 账户同步
export function synH4a(data) {
  return request({
    url: '/admin/synH4a',
    method: 'POST',
    data
  })
}
// 权限设置
export function setPrivGroup(data) {
  return request({
    url: '/admin/setPrivGroup',
    method: 'POST',
    data
  })
}
