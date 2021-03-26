<template>
  <section class="section">
    <div>Usuários</div>
    <section class="section">
      <div v-for="user in listUser" :key="user._id">
        {{ user.name }}
      </div>
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
    }
  },
  async mounted() {
    const listUser = await this.$axios.$get('/api/users')
    this.listUser = listUser
    this.isLoading = false
  },
}
</script>
