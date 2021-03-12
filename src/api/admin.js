import request from '@/utils/request'

export function createUser(data) {
  // 系统管理员创建账户
  return request({
    url: '/admin/createUser',
    method: 'POST',
    data
  })
}

export function editUser(data) {
  // 系统管理员修改下属账户资料
  return request({
    url: '/admin/editUser',
    method: 'POST',
    data
  })
}

export function deleteUser(data) {
  // 删除账户
  return request({
    url: '/admin/deleteUser',
    method: 'POST',
    data
  })
}

export function getUserPage(data) {
  // 查询账户
  return request({
    url: '/admin/getUserPage',
    method: 'POST',
    data
  })
}

export function userEdit(data) {
  // 用户自身资料修改
  return request({
    url: '/user/edit',
    method: 'POST',
    data
  })
}

export function getInfo(data) {
  // 用户信息查询
  return request({
    url: '/user/getInfo',
    method: 'POST',
    data
  })
}
export function login(data) {
  // 用户登陆
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
export function logout(data) {
  // 用户登出
  return request({
    url: '/user/logout',
    method: 'POST',
    data
  })
}
export function sendsms(data) {
  // 发送验证码
  return request({
    url: '/user/sendsms',
    method: 'POST',
    data
  })
}
export function changePassword(data) {
  // 密码修改
  return request({
    url: '/user/changePassword',
    method: 'POST',
    data
  })
}
export function resetPassword(data) {
  // 密码重置
  return request({
    url: '/user/resetPassword',
    method: 'POST',
    data
  })
}
export function setAvatar(data) {
  // 头像设置
  return request({
    url: '/user/setAvatar',
    method: 'POST',
    data
  })
}
export function uploadAvatar(data) {
  // 头像上传
  return request({
    url: '/upload/avatar',
    method: 'POST',
    data
  })
}
export function synH4a(data) {
  // h4a 账户同步
  return request({
    url: '/admin/synH4a',
    method: 'POST',
    data
  })
}
export function setPrivGroup(data) {
  // 权限设置
  return request({
    url: '/admin/setPrivGroup',
    method: 'POST',
    data
  })
}
