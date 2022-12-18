import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/xanadu')) {
    target = 'https://api.besscroft.com/xanadu'
  }
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/xanadu/': '/',
    },
  })(req, res)
}
