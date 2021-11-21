'use strict';

module.exports =  (app) =>{
    let settings        = app.locals.settings;
    return new Proxy(app, {
        get: function(target, name) {

            return function wrapper() {
                
                let args             = Array.prototype.slice.call(arguments);
                let callback         = args.pop();
                let path             = args[0];
                let middleware       = (typeof args[1] !== 'undefined')?args[1]:null;
                let handler          = callback.split('::');
                let cntrlSubName     = handler[0]; /** < string: short name of controller*/
                let action           = handler[1]; /** < string: name of controller method*/
                let controllerName   = cntrlSubName + 'Controller'; /** < string: controller full name*/
                
                let controller       = require( settings.basePath + '/Controllers/' + controllerName + '.js' )(app);
                let AuthMiddleware   = require(settings.basePath+'/Middlewares/AuthMiddleware.js')(app);
                
                // set controller access rules to global handler
                settings.contAccessRules[cntrlSubName] = controller.accessRules;
                
                // get user session
                app.use(AuthMiddleware.getUserSession);

                if( typeof controller[action] === 'function' ) {
                    
                    // running  middlewares
                    require(settings.basePath + '/config/middlewares.js')(app);
                    
                    // checking user access by contAccessRules
                    app.use(path, function(req, res, next){
                        AuthMiddleware.checkAccess(req, res, next, cntrlSubName, action);
                    });

                    if (multerMiddleware) {
                        app[name](path, multerMiddleware, function(req, res, next) {
                            controller[action](req,res,next);
                        });
                    }else{
                        app[name](path, function(req,res,next) {
                            controller[action](req, res, next);

                        });
                    }
                }
            }
        }
    });
}

