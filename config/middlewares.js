/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = (app)=>{
    let settings            = app.locals.settings;

    //open origin access  for all servers
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(function(req,res,next){
        req.dump = function(arg){
            console.log(arg);
            res.send(JSON.stringify(arg));
        }
        next();
    });


}