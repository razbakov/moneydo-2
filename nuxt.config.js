const meta = {
  name: 'MoneyDo',
  description: 'Budget Planner and Expense Tracker',
  twitterSite: '@MoneyDoApp',
  ogHost: 'https://moneydo.netlify.app',
  ogImage: '/cover/wide.png',
  viewport:
    'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1'
}

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    bodyAttrs: {
      class: 'bg-primary-light'
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2a1b3c' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/vendors.scss',
    '@/assets/css/animation.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/firebase',
    '~/plugins/router',
    '~/plugins/directives'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sentry',
    'portal-vue/nuxt'
  ],
  pwa: {
    meta
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'

      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      })
    }
  },
  generate: {
    routes: ['/', '/signup/']
  },
  env: {
    firebase: {
      config: {
        apiKey: 'AIzaSyDBOZ-MPQsPDG4TDe6b1PAE14hTy2iV5k8',
        authDomain: 'moneydoapp.firebaseapp.com',
        databaseURL: 'https://moneydoapp.firebaseio.com',
        projectId: 'moneydoapp',
        storageBucket: 'moneydoapp.appspot.com',
        messagingSenderId: '687452920764',
        appId: '1:687452920764:web:99b42040bc72377fbee9b9',
        measurementId: 'G-1QCSPF9TYG'
      },
      services: {
        auth: true,
        firestore: true,
        analytics: true
      }
    }
  },
  sentry: {
    dsn:
      'https://3f700818152d4dc1b6e915dbac40cb36@o340470.ingest.sentry.io/1878655'
  }
}
