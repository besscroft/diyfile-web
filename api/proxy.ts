import { createProxyMiddleware } from 'http-proxy-middleware'

const apiProxy = createProxyMiddleware({
  target: 'https://api.besscroft.com/xanadu',
  changeOrigin: true,
  pathRewrite: {
    '^/xanadu/': '/',
  },
})

export default apiProxy
