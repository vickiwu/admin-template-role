import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function logDelete(data) {
  // 日志删除
  return request({
    url: WeedGlobalConfig.log.logDelete,
    method: 'POST',
    data
  })
}

export function getLog(data) {
  // 日志单个查询
  return request({
    url: WeedGlobalConfig.log.getLog,
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 日志批量查询
  return request({
    url: WeedGlobalConfig.log.getPage,
    method: 'POST',
    data
  })
}

