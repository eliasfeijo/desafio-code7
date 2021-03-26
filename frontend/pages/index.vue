<template>
  <section class="section">
    <h1 class="is-size-3">Selecione um Usuário</h1>
    <section class="section">
      <b-table
        :data="listUser"
        :columns="tableColumns"
        hoverable
        @select="onUserSelect"
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

export default {
  name: 'HomePage',
  components: {
    ClipLoader,
  },
  data() {
    return {
      isLoading: true,
      listUser: [],
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
          label: 'Email',
        },
      ],
    }
  },
  async mounted() {
    const listUser = await this.$axios.$get('/api/users')
    this.listUser = listUser
    this.isLoading = false
  },
  methods: {
    onUserSelect(user) {
      console.log('user:', user)
    },
  },
}
</script>
