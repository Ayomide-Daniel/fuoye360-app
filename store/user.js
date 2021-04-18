import User from '@/assets/js/api/User'

const state = () => ({
  user: {},
  authenticated: false,
})

const getters = {
  user: (state) => state.user,
}

const actions = {
  async getCurrentUser({ commit }) {
    const response = await User.current()
    commit('setCurrentUser', response.data)
    return true
  },
}
const mutations = {
  setCurrentUser: (state, user) => {
    if (![null, undefined].includes(user)) {
      state.user = user
      state.authenticated = true
      return true
    }
    return false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
