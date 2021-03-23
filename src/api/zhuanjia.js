import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function create(data) {
  // 专家录入
  return request({
    url: WeedGlobalConfig.zhuanjia.create,
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 专家信息修改
  return request({
    url: WeedGlobalConfig.zhuanjia.edit,
    method: 'POST',
    data
  })
}

export function zhuanjiaDelete(data) {
  // 专家删除
  return request({
    url: WeedGlobalConfig.zhuanjia.zhuanjiaDelete,
    method: 'POST',
    data
  })
}

export function getZhuanjia(data) {
  // 专家单个查询
  return request({
    url: WeedGlobalConfig.zhuanjia.getZhuanjia,
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 专家批量查询
  return request({
    url: WeedGlobalConfig.zhuanjia.getPage,
    method: 'POST',
    data
  })
}

