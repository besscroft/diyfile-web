import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import type { UserModule } from './types'
import { AxiosCanceler } from '~/api/helper/axiosCancel'
import generatedRoutes from '~pages'
import { getInfo } from '~/api/modules/user'

// 樱花粉皮肤
// import '@arco-themes/vue-sakura/css/arco.css'
// 默认皮肤
import '@arco-design/web-vue/dist/arco.css'
import 'aplayer/dist/APlayer.min.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

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
    ctx.app.use(ArcoVue).use(ArcoVueIcon).use(Previewer).use(pinia)
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
            if (res.code !== 200) {
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
