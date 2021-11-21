'use strict';

module.exports = (app)=> {
    let settings = app.locals.settings;
    let sequelizeObj = require(settings.basePath + '/models/index.js');

    //deprecated class
    class SystemLib{
        bootstrap(){
            app.set('MDB', sequelizeObj);
            this.bootHelper();
        }
        
        // loading helpers
        bootHelper(){
            app.use(function(req,res,next){
                req.helper = function(type, helper){
                    
                    let helperSpliting  = helper.split('::');
                    let HelperClassName = helperSpliting[0] || null;
                    let HelperMethod    = helperSpliting[1] || null;
                    
                    if(HelperClassName && HelperMethod){
                        return require (settings.basePath + '/helper/' + type + '/' + HelperClassName + type + '.js')(app).HelperMethod(req,res,next);
                    }
                }
            });
        }
    }
    return new SystemLib;
}
