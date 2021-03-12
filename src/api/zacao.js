import request from '@/utils/request'

export function uploadImg(data) {
  // 用户向平台上传一张图片
  return request({
    url: '/upload/img',
    method: 'POST',
    data
  })
}

export function create(data) {
  // 杂草录入
  return request({
    url: '/zacao/create',
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 杂草信息修改
  return request({
    url: '/zacao/edit',
    method: 'POST',
    data
  })
}

export function zacaoDelete(data) {
  // 杂草删除
  return request({
    url: '/zacao/delete',
    method: 'POST',
    data
  })
}

export function getZacao(data) {
  // 杂草单个查询
  return request({
    url: '/zacao/get',
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 杂草批量查询
  return request({
    url: '/zacao/getPage',
    method: 'POST',
    data
  })
}
export function getTaskPage(data) {
  // 研判任务查询
  return request({
    url: '/yanpan/getTaskPage',
    method: 'POST',
    data
  })
}
export function commit(data) {
  // 杂草研判
  return request({
    url: '/yanpan/commit',
    method: 'POST',
    data
  })
}
