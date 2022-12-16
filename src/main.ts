import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createPinia } from 'pinia'
import App from './App.vue'
import type { UserModule } from './types'
import { AxiosCanceler } from '~/api/helper/axiosCancel'
import generatedRoutes from '~pages'

import '@arco-design/web-vue/dist/arco.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
const axiosCanceler = new AxiosCanceler()
const pinia = createPinia()
const user = useUserStore(pinia)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.router.beforeEach(async (to, from, next) => {
      // 在跳转路由之前，清除所有的请求
      axiosCanceler.removeAllPending()

      // 如果是访问首页直接放行
      if (to.path === '/') {
        return next()
      }

      // 如果是访问登陆页，直接放行
      if (to.path === '/@login') {
        return next()
      }

      // 判断是否有 Token，没有重定向到 login
      if (!user.token) {
        return next({ path: '/@login', replace: true })
      }

      // 正常访问页面
      next()
    })
    ctx.app.use(ArcoVue).use(ArcoVueIcon).use(Previewer).use(pinia)
  },
)
