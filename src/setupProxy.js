const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('setupProxy.js loaded');  // This prints in your terminal when dev server starts

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://nuroil.fortiddns.com:8880',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '/free/gcore/web'
    },
    onProxyReq: (proxyReq) => {
      console.log(`Proxying request to: ${proxyReq.path}`);
    }
  }));
};
