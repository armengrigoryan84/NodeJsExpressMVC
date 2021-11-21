"use strict";

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'production';
}

const express   = require('express');
const logger    = require('morgan');
const env       = process.env.NODE_ENV || 'development';
const config    = require('./config/config.js')[env];
const Propertis = require('./config/propertis.js');
const bodyParser= require('body-parser');
const bcrypt    = require('bcrypt');
const uuidv4    = require('uuid/v4');
const multer    = require('multer');
const path      = require('path');
const fs        = require('fs');
const route     = require('./config/routes.js');
config.propertis = Propertis;

const app = express();

/**
 *
 * @param {object} arg
 * @return {void}
 * @description Creating custom responce method to avoit duplications.
 */
express.response.ap_res = function(arg) {
    let output = {};

    output.httpStatus       = "OK";
    output.httpStatusCode   = 200;
    if(arg.httpStatus){
        output.httpStatus   = arg.httpStatus;
    }

    if(arg.data){
        output.data = arg.data;
    }
    if(config.propertis.HTTP[output.httpStatus].CODE){
        output.httpStatusCode = config.propertis.HTTP[output.httpStatus].CODE
    }
    if(config.propertis.HTTP[output.httpStatus].MESSAGE){
        output.message = config.propertis.HTTP[output.httpStatus].MESSAGE;
    }
    if(arg.error){
        output.error = arg.error;
    }

    this.status(output.httpStatusCode).setHeader('Content-Type', 'application/json')
    this.json(output);
};

//set running service
app.set('service', process.env.SERVICE?process.env.SERVICE:null);

//for image upload helper lib  to extract file extencion
app.set('pathLib',path);

//helper function for file upload
app.set('multer',multer);

//environment variable //
app.set('env', process.env.NODE_ENV);
app.set('config',config);
app.set('basePath',__dirname);

//define app variable
app.set('contAccessRules',{});

app.set('fs',fs);

//set uploads directory
app.use('/static',express.static(__dirname + '/uploads'));


app.use( bodyParser.json({limit: '50mb'}) );        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({                     // to support URL-encoded bodies
  extended: false,
  limit: '50mb'
}));
app.use(bodyParser.text());

//set redis configs
app.use(require('express-redis')(config.redis.port, config.redis.host, config.redis.options, config.redis.name));


app.use(logger('dev'));
app.use(express.json());

//lib injection
app.use(function(req, res, next){
    req.model               = {}; //TO DO
    req.bcrypt              = bcrypt;
    req.appConfig           = app.locals.settings.config;
    req.appConfig.basePath  = __dirname;
    req.uuid                = uuidv4;
    next();
});

//run route
route(app);

//default no route response
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

module.exports = app;