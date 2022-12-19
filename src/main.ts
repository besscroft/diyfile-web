import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import type { UserModule } from './types'
import { AxiosCanceler } from '~/api/helper/axiosCancel'
import generatedRoutes from '~pages'
import { getInfo } from '~/api/modules/user'

import '@arco-design/web-vue/dist/arco.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
const axiosCanceler = new AxiosCanceler()

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    ctx.app.use(ArcoVue).use(ArcoVueIcon).use(Previewer).use(pinia)
    if (ctx.isClient) {
      ctx.router.beforeEach(async (to, from, next) => {
        axiosCanceler.removeAllPending()
        const user = useUserStore()
        if (to.path === '/' || to.path === '/@login' || to.path === '/@about') {
          return next()
        }
        if (!user.token) {
          return next({ path: '/@login', replace: true })
        }
        if (!user.userName) {
          await getInfo().then((res) => {
            if (res.code !== 200) {
              return next({ path: '/@login', replace: true })
            }
            user.setUserName(res.data.userName)
            user.setAvatar(res.data.avatar)
          })
        }
        next()
      })
    }
  },
)
