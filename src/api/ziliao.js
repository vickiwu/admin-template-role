import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function uploadFile(data) {
  // 文件上传
  return request({
    url: WeedGlobalConfig.ziliao.uploadFile,
    method: 'POST',
    data
  })
}

export function create(data) {
  // 用户上传资料
  return request({
    url: WeedGlobalConfig.ziliao.create,
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 资料信息修改
  return request({
    url: WeedGlobalConfig.ziliao.edit,
    method: 'POST',
    data
  })
}

export function ziliaoDelete(data) {
  // 资料删除
  return request({
    url: WeedGlobalConfig.ziliao.ziliaoDelete,
    method: 'POST',
    data
  })
}

export function getZiliao(data) {
  // 资料单个查询
  return request({
    url: WeedGlobalConfig.ziliao.getZiliao,
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 资料批量查询
  return request({
    url: WeedGlobalConfig.ziliao.getPage,
    method: 'POST',
    data
  })
}

