const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://emvnh9buoh.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }, // Strips /api from the request URL
        })
    );
};