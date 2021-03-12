import request from '@/utils/request'

export function logDelete(data) {
  // 日志删除
  return request({
    url: '/log/delete',
    method: 'POST',
    data
  })
}

export function getLog(data) {
  // 日志单个查询
  return request({
    url: '/log/get',
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 日志批量查询
  return request({
    url: '/log/getPage',
    method: 'POST',
    data
  })
}

