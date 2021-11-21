'use strict';

module.exports = (app)=>{
    let settings        = app.locals.settings;
    let propertis       = settings.config.propertis;

    class UserController{
        accessRules(req, res, next) {
            return {
                // POST /user/auth user#auth
                auth: '*',

                // POST /user/create user#create
                create: function(req, res, next) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // PUT /user/:id user#update
                update: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // GET /user/:id user#show
                show: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                },

                // DELETE /user/:id user#destroy
                destroy: function(req) {
                    let roleId = req.userSession.roles.id || null;
                    return roleId == req.appConfig.propertis.userRoles.accountAdmin;
                }
            }
        }

        // POST /user/auth user#auth
        auth(req, res, next) {
            settings.MDB.users.find({
                where: {
                    email: req.body.email,
                    status: propertis.STATUS.ACTIVE
                },
                include: [{
                    model: settings.MDB.roles,
                    as: 'roles',
                    attributes: ['id', 'name'],
                    required: true
                }]
            }).then(user => {
                if(user && user.dataValues){
                    let checkPass = req.bcrypt.compareSync(req.body.password, user.dataValues.password);
                    if(checkPass===true){
                        user.password = null;
                        delete user.password;
                        let authToken = req.uuid();
                        req.redis.set('users:session:' + authToken,JSON.stringify(user), 'EX', 2592000);

                        settings.MDB.users.update({
                            lastLoginDate: (new Date().getTime())
                            }, {
                            where: {id: user.id}
                        }).then(result=>{
                            //log success
                        }).catch(error=>{
                            console.log(error);
                        });

                        res.ap_res({
                            data: {
                                AuthToken: authToken,
                                userData: user
                            }
                        });
                        return;
                    }
                }
                res.ap_res({
                    httpStatus: 'UNAUTHORIZED',
                    error: "Invalid email or password!"
                });
                return;
            }).catch(function(error){
                res.ap_res({
                    httpStatus: 'UNAUTHORIZED',
                    error: "Wrong request data!"
                });
                return;
            });
        }

        // POST /user/create user#create
        create(req, res, next){
            settings.MDB.users.create(
                permitParams(req)
            ).then(user=>{
                user.password = null;
                res.ap_res({data: user});
                return;
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: 'BAD_REQUEST',
                    error: (error.errors ? error.errors.message : "Create user request don't executed!")
                });
            });
        }

        // PUT /user/:id user#update
        update(req, res, next){
            settings.MDB.users.update(permitParams(req), {
                where: {
                    id: req.params.id,
                    status: propertis.STATUS.ACTIVE
                }
            }).then(user=>{
                 res.ap_res({
                     data: user
                });
                return;
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: 'BAD_REQUEST',
                    error: (error.errors ? error.errors : "Create user request don't executed!")
                });
                return;
            });
        }

        // GET /user/:id user#show
        show(req, res, next) {
            settings.MDB.users.findOne({
                where: {id: req.params.id}
            }).then(user=>{
                console.log('success')
                res.ap_res({
                    data: user
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus:'BAD_REQUEST',
                    error:(error.errors?error.errors:"Create user request don't executed!")
                });
            });
        }

        // DELETE /user/:id user#destroy
        destroy(req, res, next){
            settings.MDB.users.destroy({
                where: {id: req.params.id},
                status: propertis.STATUS.DELETED
            }).then(result=>{
                console.log('success')
                res.ap_res({
                    data: result
                });
            }).catch(error=>{
                console.log(error);
                res.ap_res({
                    httpStatus: 'BAD_REQUEST',
                    error: (error.errors ? error.errors : "Create user request don't executed!")
                });
            });
        }

        addUserIntoGroup(req, res, next){
        }
    }

    // private
    var permitParams = (req) => {
        let params = {
            firstName:  req.body.firstName || null,
            lastName:   req.body.lastName  || null,
            modifiedBy: req.userSession.id || null,
        };

        if (req.body.roleId)
            params.roleId = req.body.roleId

        if (req.body.email)
            params.email = req.body.email

        if(req.file && req.file.filename) {
            params.profilePicture = req.file.filename;
            settings.MDB.users.findOne({
                id: req.params.id
            }).then(user=>{
                settings.fs(settings.basePath + '/uploads/profile/' + user.profilePicture);
            });
        }

        if (req.body.password) {
            params.password = bcryptPassword(req);
        }

        return params;
    }

    var bcryptPassword = (req) => {
        let password = req.body.password || req.params.password;
        if(!password) { return null; }

        let salt = req.bcrypt.genSaltSync(req.appConfig.bcrypt.saltRounds);
        return req.bcrypt.hashSync(password, salt);
    }

    return new UserController;
}
