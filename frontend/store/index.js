export const state = () => ({
  currentScreen: 'HOME',
  listUser: [],
  selectedUser: null,
})

export const mutations = {
  setCurrentScreen(state, screen) {
    state.currentScreen = screen
  },
  setListUser(state, listUser) {
    state.listUser = listUser
  },
  setSelectedUser(state, user) {
    state.selectedUser = user
  },
}

export const actions = {
  setCurrentScreen(context, screen) {
    context.commit('setCurrentScreen', screen)
  },
  setListUser(context, listUser) {
    context.commit('setListUser', listUser)
  },
  setSelectedUser(context, user) {
    context.commit('setSelectedUser', user)
  },
}
