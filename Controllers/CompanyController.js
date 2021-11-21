'use strict';

module.exports = (app)=>{
    let settings = app.locals.settings;
    let propertis = settings.config.propertis;

    class CompanyController{
        accessRules(req, res, next) {
            return {
                // POST /company company#create
                create: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // PUT /company/:id company#update
                update: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // GET /company/:id company#show
                show: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // DELETE /company/:id company#destroy
                destroy: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },
            }
        }

        // POST /company company#create
        create(req, res, next) {
            settings.MDB.companies.create(
                permitParams(req)
            ).then(result=>{
                res.ap_res({
                    data: result
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Company didn't created!")
                });
            });
        }

        // PUT /company/:id company#update
        update(req, res, next) {
            settings.MDB.companies.update(permitParams(req), {
                where: {
                    id: req.params.id
                }
            }).then(result=>{
                res.ap_res({
                    data: result
                });

            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Company didn't updated!")
                });

            });
        }

        // GET /company/:id company#show
        show(req, res, next) {
            settings.MDB.companies.findOne({
                where: {
                    id: req.params.id
                }
            }).then(result=>{
                res.ap_res({
                    data: result
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error: (error.errors ? error.errors : "Company didn't found!")
                });
            });
        }

        // DELETE /company/:id company#destroy
        destroy(req, res, next) {
            settings.MDB.companies.destroy({
                where: {id: req.params.id},
                status: propertis.STATUS.DELETED
            }).then(result=>{
                res.ap_res({
                    data: result
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: "BAD_REQUEST",
                    error:(error.errors ? error.errors : "Company didn't found!")
                });
            });
        }

    }

    // private
    var permitParams = function(req) { return {
        name:       req.body.name      || null,
        phone:      req.body.phone     || null,
        address:    req.body.address   || null,
        status:     req.body.status    || null,
        timeZone:   req.body.timeZone  || null,
        accountId:  req.body.accountId || null,
        modifiedBy: req.userSession.id || null
    }}

    return new CompanyController;
}

