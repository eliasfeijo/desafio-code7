export const state = () => ({
  currentScreen: 'HOME',
  listUser: [],
})

export const mutations = {
  setCurrentScreen(state, screen) {
    state.currentScreen = screen
  },
  setListUser(state, listUser) {
    state.listUser = listUser
  },
}

export const actions = {
  setCurrentScreen(context, screen) {
    context.commit('setCurrentScreen', screen)
  },
  setListUser(context, listUser) {
    context.commit('setListUser', listUser)
  },
}
