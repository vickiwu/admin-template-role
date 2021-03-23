import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function create(data) {
  // 新闻录入
  return request({
    url: WeedGlobalConfig.xinwen.create,
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 新闻修改
  return request({
    url: WeedGlobalConfig.xinwen.edit,
    method: 'POST',
    data
  })
}

export function xinwenDelete(data) {
  // 新闻删除
  return request({
    url: WeedGlobalConfig.xinwen.xinwenDelete,
    method: 'POST',
    data
  })
}

export function getXinwen(data) {
  // 新闻单个查询
  return request({
    url: WeedGlobalConfig.xinwen.getXinwen,
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 新闻批量查询
  return request({
    url: WeedGlobalConfig.xinwen.getPage,
    method: 'POST',
    data
  })
}
export function getHotNews(data) {
  // 热点新闻查询
  return request({
    url: WeedGlobalConfig.xinwen.getHotNews,
    method: 'POST',
    data
  })
}

