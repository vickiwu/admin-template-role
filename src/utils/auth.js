import Cookies from 'js-cookie'

const TokenKey = 'vue_token'
const UserIdKey = 'user_id'
const UserKey = 'user'
const SysConfigKey = 'sys_config'
const privKey = 'user_priv'

// token
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// userid
export function getUserId() {
  return Cookies.get(UserIdKey)
}
export function setUserId(MyUserId) {
  return Cookies.set(UserIdKey, MyUserId)
}
export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getUserPriv() {
  return Cookies.get(privKey)
}

export function setUserPriv(priv) {
  Cookies.set(privKey, priv)
}

export function removeUserPriv() {
  Cookies.remove(privKey)
}

// user
export function getUser() {
  return Cookies.get(UserKey)
}
export function setUser(MyUser) {
  return Cookies.set(UserKey, MyUser)
}
export function removeUser() {
  return Cookies.remove(UserKey)
}

// SysConfig
export function getSysConfig() {
  return Cookies.get(SysConfigKey)
}
export function setSysConfig(SysConfig) {
  return Cookies.set(SysConfigKey, SysConfig)
}
export function removeSysConfig() {
  return Cookies.remove(SysConfigKey)
}
