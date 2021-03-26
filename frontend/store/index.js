import Numeral from 'numeral'
import 'numeral/locales/pt-br'
import _ from 'lodash'
import { formatDate } from '~/helpers/DateHelper'

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
    listUser = listUser.map((user, index) => {
      Numeral.locale('pt-br')
      user.formattedDebtTotal =
        'R$ ' + Numeral(user.debtTotal).format('0,000.00')
      user.listDebt = setFormattedDebtFields(user)
      return user
    })
    context.commit('setListUser', listUser)
  },
  setSelectedUser(context, user) {
    context.commit('setSelectedUser', user)
  },
  addSelectedUserDebt(context, debt) {
    const selectedUser = _.cloneDeep(context.state.selectedUser)
    Numeral.locale('pt-br')
    const debtTotal = selectedUser.debtTotal + debt.value
    selectedUser.formattedDebtTotal =
      'R$ ' + Numeral(debtTotal).format('0,000.00')
    selectedUser.listDebt.push(debt)
    selectedUser.listDebt = setFormattedDebtFields(selectedUser)
    context.commit('setSelectedUser', selectedUser)
  },
}

function setFormattedDebtFields(context, user) {
  const listDebt = user.listDebt.map((debt, index) => {
    debt.formattedDueDate = formatDate(debt.dueDate)
    debt.formattedValue = 'R$ ' + Numeral(debt.value).format('0,000.00')
    return debt
  })
  return listDebt
}
