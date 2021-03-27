<template>
  <div>
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
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'HomeScreen',
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
      this.$store.dispatch('setSelectedUser', user)
      this.$store.dispatch('setCurrentScreen', 'USER')
    },
    fetchListUser: async (vm) => {
      vm.isLoading = true
      const listUser = await vm.$axios.$get('/api/users')
      vm.$store.dispatch('setListUser', listUser)
      vm.isLoading = false
    },
  },
}
</script>
