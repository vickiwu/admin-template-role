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
export function getLbPage(data) {
  // 杂草类别查询
  return request({
    url: '/zacao/getLbPage',
    method: 'POST',
    data
  })
}
export function addLb(data) {
  // 杂草类别新增
  return request({
    url: '/zacao/addLb',
    method: 'POST',
    data
  })
}
export function editLb(data) {
  // 杂草类别修改
  return request({
    url: '/zacao/editLb',
    method: 'POST',
    data
  })
}
export function delLb(data) {
  // 杂草类别删除
  return request({
    url: '/zacao/delLb',
    method: 'POST',
    data
  })
}
export function heatmapTotal(data) {
  // 杂草热力图总数
  return request({
    url: '/zacao/heatmapTotal',
    method: 'POST',
    data
  })
}
export function heatmap(data) {
  // 杂草热力图-分页获取
  return request({
    url: '/zacao/heatmap',
    method: 'POST',
    data
  })
}
export function totalCount(data) {
  // 杂草总数量-地图
  return request({
    url: '/zacao/totalCount',
    method: 'POST',
    data
  })
}
export function getDistPage(data) {
  // 分页获取杂草分布-地图
  return request({
    url: '/zacao/getDistPage',
    method: 'POST',
    data
  })
}

export function tongji(data) {
  // 杂草统计表
  return request({
    url: '/zacao/tongji',
    method: 'POST',
    data
  })
}
