const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/facebook', { 
        target: 'https://emailyx-backend.herokuapp.com/',
        changeOrigin: true,
    }));
    app.use(proxy('/api/**', { 
        target: 'https://emailyx-backend.herokuapp.com/',
        changeOrigin: true,
    }));
};