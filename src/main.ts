import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import type { UserModule } from './types'
import vuetify from '~/plugins/vuetify'
import generatedRoutes from '~pages'
import 'vuetify/styles'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { AxiosCanceler } from '~/api/helper/axiosCancel'
import { ResultEnum } from '~/enums/httpEnum'
import { getInfo } from '~/api/modules/user'

/* global */
console.log(`${'\n'} %c DiyFile v0.4.0 %c https://github.com/besscroft/diyfile ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')

generatedRoutes.push({
  path: '/',
  meta: {
    layout: 'default',
  },
  component: () => import('~/pages/index.vue'),
}, {
  path: '/:storageKey/:path(.*)*',
  meta: {
    layout: 'default',
  },
  props: true,
  component: () => import('~/pages/path.vue'),
})

const routes = setupLayouts(generatedRoutes)
const axiosCanceler = new AxiosCanceler()

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, history: createWebHistory(), base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    ctx.app.use(pinia).use(vuetify)
    if (ctx.isClient) {
      ctx.router.beforeEach(async (to, from, next) => {
        axiosCanceler.removeAllPending()
        const user = useUserStore()
        if (to.path === '/' || to.path === '/@login' || to.path === '/@about' || !to.path.startsWith('/@')) {
          return next()
        }
        if (!user.token) {
          return next({ path: '/@login', replace: true })
        }
        if (!user.userName) {
          await getInfo().then((res) => {
            if (res.code !== ResultEnum.SUCCESS) {
              return next({ path: '/@login', replace: true })
            }
            user.setUserName(res.data.userName)
            user.setAvatar(res.data.avatar)
            user.setRoleCode(res.data.role)
          })
        }
        next()
      })
    }
  },
)
