import request from '@/utils/request'
const WeedGlobalConfig = require('@/globalConfig')

export function setScheduleMode(data) {
  // 管理员设置专家调度模式为人工模式或自动模式
  return request({
    url: WeedGlobalConfig.sys.setScheduleMode,
    method: 'POST',
    data
  })
}

export function setH4aUrl(data) {
  // 管理员设置海关 H4A 具体地址
  return request({
    url: WeedGlobalConfig.sys.setScheduleMode,
    method: 'POST',
    data
  })
}

export function setSpecies(data) {
  // 杂草全部种类设置
  return request({
    url: WeedGlobalConfig.sys.setSpecies,
    method: 'POST',
    data
  })
}

export function getFilePage(data) {
  // 查询全局文件
  return request({
    url: WeedGlobalConfig.sys.getFilePage,
    method: 'POST',
    data
  })
}

export function getServerList(data) {
  // 查询全局空间
  return request({
    url: WeedGlobalConfig.sys.getServerList,
    method: 'POST',
    data
  })
}
