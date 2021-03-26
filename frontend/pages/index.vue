<template>
  <section class="section">
    <h1 class="is-size-3">Selecione um Usuário</h1>
    <section class="section">
      <table v-if="!isLoading" class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Username</th>
            <th>Email</th>
            <th>Dívida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listUser" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.formattedDebtTotal }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <b-loading v-model="isLoading" :is-full-page="true">
      <clip-loader
        :loading="isLoading"
        color="#6497b1"
        size="60px"
      ></clip-loader>
    </b-loading>
  </section>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import Numeral from 'numeral'
import 'numeral/locales/pt-br'

export default {
  name: 'HomePage',
  components: {
    ClipLoader,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    listUser() {
      return this.$store.state.listUser
    },
  },
  mounted() {
    this.fetchListUser(this)
  },
  methods: {
    onUserSelect(user) {
      console.log('user:', user)
    },
    fetchListUser: async (vm) => {
      vm.isLoading = true
      let listUser = await vm.$axios.$get('/api/users')
      listUser = listUser.map((user, index) => {
        Numeral.locale('pt-br')
        user.formattedDebtTotal =
          'R$ ' + Numeral(user.debtTotal).format('0,000.00')
        return user
      })
      vm.$store.dispatch('setListUser', listUser)
      vm.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
