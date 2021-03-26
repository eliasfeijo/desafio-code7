<template>
  <section class="section">
    <h1 class="is-size-3">Selecione um Usuário</h1>
    <section class="section">
      <b-table
        class="cursor-pointer"
        :data="listUser"
        :columns="tableColumns"
        hoverable
        @click="onUserSelect"
      ></b-table>
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
      tableColumns: [
        {
          field: 'name',
          label: 'Nome',
        },
        {
          field: 'username',
          label: 'Username',
        },
        {
          field: 'email',
          label: 'E-mail',
        },
        {
          field: 'formattedDebtTotal',
          label: 'Dívida',
        },
      ],
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
