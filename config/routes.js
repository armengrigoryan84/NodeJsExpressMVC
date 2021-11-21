'use strict';

module.exports = (app) => {
    let settings        = app.locals.settings;
    let UploadService   = require(settings.basePath + '/Services/UploadService.js')(app);
    let systemLib       = require(settings.basePath + '/core/SystemLib.js')(app);
    let Routes          = require(settings.basePath + '/core/Routes.js')(app);

    systemLib.bootstrap();

    let multerMiddleware = UploadService.profilePicture(settings);

    /* User Controller routes */
    Routes.post(  '/users/auth',                  'User::auth'   );
    Routes.post(  '/users',     multerMiddleware, 'User::create' );
    Routes.put(   '/users/:id', multerMiddleware, 'User::update' );
    Routes.get(   '/users/:id',                   'User::show'   );
    Routes.delete('/users/:id',                   'User::destroy');

    /* Account Controller routes */
    Routes.post(  '/account',     multerMiddleware, 'Account::create' );
    Routes.put(   '/account/:id', multerMiddleware, 'Account::update' );
    Routes.get(   '/account/:id',                   'Account::show'   );
    Routes.delete('/account/:id',                   'Account::destroy');

    /* Company Controller routes */
    Routes.post(  '/company',     multerMiddleware, 'Company::create' );
    Routes.put(   '/company/:id', multerMiddleware, 'Company::update' );
    Routes.get(   '/company/:id',                   'Company::show'   );
    Routes.delete('/company/:id',                   'Company::destroy');
}
