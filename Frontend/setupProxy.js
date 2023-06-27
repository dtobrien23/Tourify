const fs = require('fs');
const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');

const credentials = { key: privateKey, cert: certificate };

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Replace with your API server URL
      changeOrigin: true,
    })
  );
};

module.exports = function (app, server) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3000', // Replace with your API server URL
      changeOrigin: true,
    })
  );

  server.listen(3000, function () {
    console.log('Development server listening on port 3000!');
  });
};

https.createServer(credentials, app).listen(3000, function () {
  console.log('Development server listening on port 3000!');
});
