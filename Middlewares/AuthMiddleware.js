'use strict';

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = (app)=>{

    let settings        = app.locals.settings;
    let httpCodes       = settings.config.propertis.HTTP;

    class AuthMiddleware{
        checkAccess(req,res,next, cntrlSubName, actionName){

            if(!settings.contAccessRules[cntrlSubName] || typeof settings.contAccessRules[cntrlSubName] != 'function'){
                this.accessForbidden(res);
                return
            }

            let accessRules = settings.contAccessRules[cntrlSubName](req,res,next);

            if(
                    typeof accessRules[actionName] != 'function' &&
                    (accessRules[actionName]).trim() === '*'
                    ){
                next();
                return;
            }else if(
                        !req.userSession ||
                        ((typeof accessRules[actionName] === 'function' &&
                        !accessRules[actionName](req,res,next)) ||
                        !accessRules[actionName])
                    ){

                this.accessForbidden(res);
                return;
            }
            next();
        }

        //access forbidden response
        accessForbidden(res) {
            res.ap_res({
                httpStatus:'UNAVAILABLE_FOR_LEGAL_REASONES',
                error : "Access Forbidden!"
            });
        }

        getUserSession(req,res,next){
            if(req.headers.authorization){
                let bearerToken = req.headers.authorization;

                bearerToken = bearerToken.split(" ");
                let bearer = bearerToken[0] || null;
                let token  = bearerToken[1] || null;

                if(bearer){
                    bearer = bearer.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                }

                if(token){
                    token = token.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                }

                if(bearer == "Bearer" && token){
                    req.redis.get('users:session:'+token, function (err, reply) {
                        if (err) {

                            res.ap_res({
                                httpStatus:'UNAUTHORIZED',
                                error : "Invalid access token!"
                                    });
                        }
                        req.userSession = JSON.parse(reply);
                        next();
                    });

                }else{
                    next();
                }
            }else{
                next();
            }
        }
    }

    return new AuthMiddleware;
}