'use strict';

module.exports = (app) => {
    let settings  = app.locals.settings;
    let propertis = settings.config.propertis;

    class AccountController{
        accessRules(req, res, next) {
            return {
                // POST /account account#create
                create: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // PUT /account/:id account#update
                update: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // GET /account/:id account#show
                show: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // DELETE /account/:id account#destroy
                destroy: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                }
            }
        }

        // POST /account account#create
        create(req, res, next) {
            settings.MDB.accounts.create(
                permitParams(req)
            ).then(result=>{
                res.ap_res({
                    data: result
                });
                return;
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Account didn't created!")
                });
                return;
            });

        }

        // PUT /account/:id account#update
        update(req, res, next) {
            settings.MDB.accounts.update(permitParams(req), {
                where: {
                    id: req.params.id,
                    status: propertis.STATUS.ACTIVE
                }
            }).then(account=>{
                res.ap_res({
                    data: account
                });
                return;
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Account didn't updated!")
                });
                return;
            });
        }

        // GET /account/:id account#show
        show(req, res, next) {
            settings.MDB.accounts.findOne({
                where: {
                    id: req.params.id,
                    status: propertis.STATUS.ACTIVE
                }
            }).then(account=>{
                res.ap_res({
                    data: account
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Account didn't found!")
                });
            });
        }

        // DELETE /account/:id account#destroy
        destroy(req, res, next) {
            settings.MDB.accounts.destroy({
                where: {
                    id:req.params.id,
                    status: propertis.STATUS.ACTIVE
                }
            }).then(result=>{
                res.ap_res({
                    data: result
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Account didn't found!")
                });
            });
        }
    }

    // private
    var permitParams = function() { return {
        name:   req.body.name,
        status: req.body.status,
        port:   req.body.port
    }}

    return new AccountController;
}
