import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'aplayer/dist/APlayer.min.css'
import { ResultEnum } from '~/enums/httpEnum'
import { getInfo } from '~/api/modules/user'
import { setupNaiveDiscreteApi } from '~/plugins/naiveDiscreteApi'
import { getDownloadFile, getDownloadUrl } from '~/api/modules/file'
import { getFileNameFromPath } from '~/utils/FileUtil'
import { getBaseUrl } from '~/utils/WindowUtil'

/* global */
console.log(`${'\n'} %c DiyFile v0.8.3 %c https://github.com/besscroft/diyfile ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')

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
    ctx.app.use(pinia).use(setupNaiveDiscreteApi)
    if (ctx.isClient) {
      ctx.router.beforeEach(async (to, from, next) => {
        const user = useUserStore()
        if (to.path.startsWith('/api/')) {
          const pathArr = to.query?.path.toString()
          const firstIndex = pathArr.indexOf('/')
          const secondIndex = pathArr.indexOf('/', firstIndex + 1)
          const storageKey = pathArr.substring(firstIndex + 1, secondIndex)
          const path = pathArr.substring(secondIndex + 1)
          const fullPath = `${getBaseUrl()}/api/raw/?path=${pathArr}`
          if (to.path.startsWith('/api/raw/')) {
            await getDownloadUrl(storageKey, path, fullPath).then((res) => {
              if (res.code === ResultEnum.SUCCESS && typeof res.data === 'string') {
                window.location.href = res.data
              } else {
                window.location.href = 'localhost'
              }
            }).catch(() => {
              window.location.href = 'localhost'
            })
            return next(false)
          }
          if (to.path.startsWith('/api/proxy/')) {
            await getDownloadFile(storageKey, path).then((res) => {
              const url = window.URL.createObjectURL(new Blob([res]))
              const a = document.createElement('a')
              a.href = url
              a.download = getFileNameFromPath(path)
              document.body.appendChild(a)
              a.click()
              a.remove()
              window.URL.revokeObjectURL(url)
            })
            return next(false)
          }
        }
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
