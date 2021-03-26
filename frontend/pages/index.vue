<template>
  <section class="section">
    <div>Frontend</div>
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
    }
  },
}
</script>
