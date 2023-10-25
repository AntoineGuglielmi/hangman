const modules = [
  '@nuxtjs/tailwindcss',
  '@pinia/nuxt',
]

const tailwindcss = {
  cssPath: './assets/css/main.css',
}

const css = [
  '@fontsource-variable/nunito'
]

const pinia = {
  autoImports: [
    'defineStore',
    'storeToRefs'
  ],
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  modules,

  tailwindcss,

  css,

  pinia,

})
