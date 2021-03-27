<template>
  <section class="section">
    <transition name="slide-fade">
      <home-screen v-if="currentScreen === 'HOME'" />
    </transition>
    <transition name="slide-fade">
      <user-screen v-if="currentScreen === 'USER'" />
    </transition>
  </section>
</template>

<script>
import HomeScreen from '~/components/screens/HomeScreen'
import UserScreen from '~/components/screens/UserScreen'

export default {
  name: 'HomePage',
  components: {
    HomeScreen,
    UserScreen,
  },
  computed: {
    currentScreen() {
      return this.$store.state.currentScreen
    },
  },
}
</script>
