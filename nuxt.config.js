const isProd = process.env.NODE_ENV === 'production'

const app = {
  name: 'MoneyDo',
  description: 'Budget Planner and Expense Tracker',
  social: {
    twitter: 'MoneyDoApp',
    instagram: 'moneydoapp',
    facebook: 'moneyDo-112938060395146',
    slack: ''
  },
  nav: [
    {
      name: 'kakeibo',
      link: '/kakeibo'
    },
    {
      name: 'pricing',
      link: '/pricing'
    },
    {
      name: 'terms',
      link: '/terms'
    },
    {
      name: 'privacy',
      link: '/privacy'
    },
    {
      name: 'support',
      link: '/support'
    }
  ],
  url: 'https://moneydo.netlify.app/',
  cover: '/cover/wide.png'
}

export default {
  components: true,
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: app.name,
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
  css: ['@/assets/css/vendors.scss'],
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
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'portal-vue/nuxt',
    '@nuxtjs/device',
    'nuxt-i18n',
    '@nuxt/content'
  ],
  purgeCSS: {
    enabled: false
  },
  pwa: {
    workbox: {
      offline: true,
      dev: false,
      pagesURLPattern: '/.*'
    },
    meta: {
      name: app.name,
      description: app.description,
      ogHost: app.url,
      ogImage: app.cover,
      nativeUI: true,
      twitterSite: '@' + app.social.twitter
    },
    manifest: {
      name: app.name,
      short_name: app.name,
      start_url: '/app/?standalone=true',
      background_color: '#ece3f7',
      lang: 'en'
    }
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

      config.module.rules.push({
        test: /\.yml$/,
        use: 'js-yaml-loader'
      })
    }
  },
  env: {
    app,
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
    disabled: !isProd,
    dsn:
      'https://3f700818152d4dc1b6e915dbac40cb36@o340470.ingest.sentry.io/1878655'
  },
  robots: [
    {
      UserAgent: '*',
      Allow: '/'
    },
    {
      UserAgent: '*',
      Disallow: '/app'
    }
  ],
  sitemap: {
    hostname: app.url,
    routes: ['/']
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content()
        .only(['path'])
        .fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    }
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.yml' },
      { code: 'de', name: 'Deutsch', file: 'de.yml' },
      { code: 'ru', name: 'Русский', file: 'ru.yml' },
      { code: 'es', name: 'Español', file: 'es.yml' }
    ],
    defaultLocale: 'en',
    langDir: 'langs/',
    lazy: true,
    vueI18n: {
      fallbackLocale: 'en'
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
      alwaysRedirect: true
    }
  }
}
