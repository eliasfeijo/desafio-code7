export const state = () => ({
  listUser: [],
})

export const mutations = {
  setListUser(state, listUser) {
    state.listUser = listUser
  },
}

export const actions = {
  setListUser(context, listUser) {
    context.commit('setListUser', listUser)
  },
}
