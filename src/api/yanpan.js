import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function create(data) {
  // 人工调度
  return request({
    url: WeedGlobalConfig.yanpan.create,
    method: 'POST',
    data
  })
}

export function getTaskPage(data) {
  //  研判任务查询
  return request({
    url: WeedGlobalConfig.yanpan.getTaskPage,
    method: 'POST',
    data
  })
}

export function commit(data) {
  // 杂草研判
  return request({
    url: WeedGlobalConfig.yanpan.commit,
    method: 'POST',
    data
  })
}

