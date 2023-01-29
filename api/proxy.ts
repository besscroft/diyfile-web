import { createProxyMiddleware } from 'http-proxy-middleware'

const apiProxy = createProxyMiddleware({
  target: 'https://api.besscroft.com/@api',
  changeOrigin: true,
  pathRewrite: {
    '^/@api/': '/',
  },
})

export default apiProxy
