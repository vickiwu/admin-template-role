import request from '@/utils/request'

export function uploadFile(data) {
  // 文件上传
  return request({
    url: '/upload/file',
    method: 'POST',
    data
  })
}

export function create(data) {
  // 用户上传资料
  return request({
    url: '/ziliao/create',
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 资料信息修改
  return request({
    url: '/ziliao/edit',
    method: 'POST',
    data
  })
}

export function ziliaoDelete(data) {
  // 资料删除
  return request({
    url: '/ziliao/delete',
    method: 'POST',
    data
  })
}

export function getZiliao(data) {
  // 资料单个查询
  return request({
    url: '/ziliao/get',
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 资料批量查询
  return request({
    url: '/ziliao/getPage',
    method: 'POST',
    data
  })
}

