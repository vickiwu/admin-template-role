import Cookies from 'js-cookie'

const TokenKey = 'vue_token'
const UserIdKey = 'user_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(MyUserId) {
  return Cookies.set(UserIdKey, MyUserId)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}
