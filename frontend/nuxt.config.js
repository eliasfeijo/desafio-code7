export default {
  ssr: false,

  head: {
    title: 'Desafio Code7',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, width=device-width, initial-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/scss/main.scss'],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['nuxt-buefy', '@nuxtjs/axios'],

  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': {
      target: `http://${process.env.SERVER_URL}:3001`,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
  },

  build: {},
}
