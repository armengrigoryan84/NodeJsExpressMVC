module.exports = {
  "development": {
    "username": "root",
    "password": 'root',
    "database": "alertpoint_new",
    "host": "127.0.0.1",
    "dialect": "mysql",
    redis:{
        options:{
//            return_buffers: true,
//            auth_pass: ''
        },
        port:6379,
        host:'localhost',
        name:'redis'
    },
    bcrypt:{
        saltRounds:10
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    redis:{
        options:{
            return_buffers: true,
            auth_pass: 'superSecretPassword'
        },
        port:6379,
        host:'127.0.0.1',
        name:'redis'
    },
    bcrypt:{
        saltRounds:10
    }
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "alertpoint_new",
    "host": "127.0.0.1",
    "dialect": "mysql",
    redis:{
        options:{
            return_buffers: true,
            auth_pass: 'superSecretPassword'
        },
        port:6379,
        host:'127.0.0.1',
        name:'redis'
    },
    bcrypt:{
        saltRounds:10
    }
  }

}
