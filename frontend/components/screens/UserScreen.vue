<template>
  <div>
    <h1 class="is-size-3">{{ selectedUser.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'UserScreen',
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser
    },
  },
}
</script>
