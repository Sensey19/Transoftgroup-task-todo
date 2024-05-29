// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: {
  //     enabled: true
  // },
  // @ts-ignore
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Transoftgroup-task'
    }
  },
  css: ['@/assets/scss/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/settings.scss" as *;'
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore'
    ]
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    baseURL: process.env.BASE_URL || ' https://jsonplaceholder.typicode.com',
    // Keys within public are also exposed client-side
    public: {
      baseURL: process.env.BASE_URL || ' https://jsonplaceholder.typicode.com'
    }
  },
  typescript: {
    typeCheck: true
  },
  imports: {
    dirs: ['composables/**']
  }
});
