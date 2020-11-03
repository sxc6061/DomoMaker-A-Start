const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/login', controllers.Account.loginPage, mid.requiresSecure, mid.requiresLogout);
    app.post('/login', controllers.Account.login, mid.requiresSecure, mid.requiresLogout);
    app.get('/signup', controllers.Account.signupPage, mid.requiresSecure, mid.requiresLogout);
    app.post('/signup', controllers.Account.signup, mid.requiresSecure, mid.requiresLogout);
    app.get('/logout', controllers.Account.logout, mid.requiresLogin);
    app.get('/maker', controllers.Domo.makerPage, mid.requiresLogin);
    app.post('/maker', controllers.Domo.make, mid.requiresLogin);
    app.get('/', controllers.Account.loginPage, mid.requiresSecure, mid.requiresLogout);
};

module.exports = router;