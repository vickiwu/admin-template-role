const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => {
    return state.user.user.avatar
  },
  name: state => {
    return state.user.user.realname
  },
  userId: state => {
    return state.user.userId
  },
  hasSetPermission: state => state.permission.hasSetPermission,
  privGroup: state => state.user.privGroup
}
export default getters
