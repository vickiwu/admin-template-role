import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function uploadImg(data) {
  // 用户向平台上传一张图片
  return request({
    url: WeedGlobalConfig.zaocao.uploadImg,
    method: 'POST',
    data
  })
}

export function create(data) {
  // 杂草录入
  return request({
    url: WeedGlobalConfig.zaocao.create,
    method: 'POST',
    data
  })
}

export function edit(data) {
  // 杂草信息修改
  return request({
    url: WeedGlobalConfig.zaocao.edit,
    method: 'POST',
    data
  })
}

export function zacaoDelete(data) {
  // 杂草删除
  return request({
    url: WeedGlobalConfig.zaocao.zacaoDelete,
    method: 'POST',
    data
  })
}

export function getZacao(data) {
  // 杂草单个查询
  return request({
    url: WeedGlobalConfig.zaocao.getZacao,
    method: 'POST',
    data
  })
}
export function getPage(data) {
  // 杂草批量查询
  return request({
    url: WeedGlobalConfig.zaocao.getPage,
    method: 'POST',
    data
  })
}
export function getTaskPage(data) {
  // 研判任务查询
  return request({
    url: WeedGlobalConfig.zaocao.getTaskPage,
    method: 'POST',
    data
  })
}
export function commit(data) {
  // 杂草研判
  return request({
    url: WeedGlobalConfig.zaocao.commit,
    method: 'POST',
    data
  })
}
export function getLbPage(data) {
  // 杂草类别查询
  return request({
    url: WeedGlobalConfig.zaocao.getLbPage,
    method: 'POST',
    data
  })
}
export function addLb(data) {
  // 杂草类别新增
  return request({
    url: WeedGlobalConfig.zaocao.addLb,
    method: 'POST',
    data
  })
}
export function editLb(data) {
  // 杂草类别修改
  return request({
    url: WeedGlobalConfig.zaocao.editLb,
    method: 'POST',
    data
  })
}
export function delLb(data) {
  // 杂草类别删除
  return request({
    url: WeedGlobalConfig.zaocao.delLb,
    method: 'POST',
    data
  })
}
export function heatmapTotal(data) {
  // 杂草热力图总数
  return request({
    url: WeedGlobalConfig.zaocao.heatmapTotal,
    method: 'POST',
    data
  })
}
export function heatmap(data) {
  // 杂草热力图-分页获取
  return request({
    url: WeedGlobalConfig.zaocao.heatmap,
    method: 'POST',
    data
  })
}
export function totalCount(data) {
  // 杂草总数量-地图
  return request({
    url: WeedGlobalConfig.zaocao.totalCount,
    method: 'POST',
    data
  })
}
export function getDistPage(data) {
  // 分页获取杂草分布-地图
  return request({
    url: WeedGlobalConfig.zaocao.getDistPage,
    method: 'POST',
    data
  })
}

export function tongji(data) {
  // 杂草统计表
  return request({
    url: WeedGlobalConfig.zaocao.tongji,
    method: 'POST',
    data
  })
}
