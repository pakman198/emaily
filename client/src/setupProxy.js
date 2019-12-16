const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/facebook', { 
        // target: 'https://emailyx-backend.herokuapp.com/',
        target: 'http://localhost:5000',
        // changeOrigin: true,
    }));
    app.use(proxy('/api/**', { 
        // target: 'https://emailyx-backend.herokuapp.com/',
        target: 'http://localhost:5000',
        // changeOrigin: true,
    }));
};