<template>
  <section class="section">
    <home-screen v-if="currentScreen === 'HOME'" />
  </section>
</template>

<script>
import HomeScreen from '~/components/screens/HomeScreen'

export default {
  name: 'HomePage',
  components: {
    HomeScreen,
  },
  computed: {
    currentScreen() {
      return this.$store.state.currentScreen
    },
  },
}
</script>
