import request from '@/utils/request'

export function create(data) {
  // 新闻录入
  return request({
    url: '/xinwen/create',
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 新闻修改
  return request({
    url: '/xinwen/edit',
    method: 'POST',
    data
  })
}

export function xinwenDelete(data) {
  // 新闻删除
  return request({
    url: '/xinwen/delete',
    method: 'POST',
    data
  })
}

export function getXinwen(data) {
  // 新闻单个查询
  return request({
    url: '/xinwen/get',
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 新闻批量查询
  return request({
    url: '/xinwen/getPage',
    method: 'POST',
    data
  })
}
export function getHotNews(data) {
  // 热点新闻查询
  return request({
    url: '/xinwen/getHotNews',
    method: 'POST',
    data
  })
}

