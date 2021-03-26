<template>
  <section class="section">
    <transition name="slide-fade">
      <home-screen v-if="currentScreen === 'HOME'" />
    </transition>
    <transition name="slide-fade">
      <div>test</div>
    </transition>
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
