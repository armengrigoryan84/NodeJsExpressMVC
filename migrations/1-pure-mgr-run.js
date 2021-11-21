'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "accounts", deps: []
 * createTable "roles", deps: []
 * createTable "companies", deps: [accounts]
 * createTable "locations", deps: [companies]
 * createTable "users", deps: [roles]
 * createTable "userLocations", deps: [users, locations]
 *
 **/

var info = {
    "revision": 1,
    "name": "pure-mgr-run",
    "created": "2018-11-28T18:31:53.527Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable", // accounts
        params: [
            "accounts",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('Active', 'Inactive', 'Expired'),
                    "defaultValue": "Active",
                    "allowNull": false
                },
                "port": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // roles
        params: [
            "roles",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // companies
        params: [
            "companies",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING(25),
                    "allowNull": true
                },
                "address": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "status": {
                    "type": Sequelize.ENUM('Active', 'Inactive', 'Deleted'),
                    "defaultValue": "Active",
                    "allowNull": true
                },
                "timeZone": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "modifiedBy": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "accountId": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "accounts",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // locations
        params: [
            "locations",
            {
                "id": {
                    "type": Sequelize.INTEGER(10),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING(25),
                    "allowNull": true
                },
                "address": {
                    "type": Sequelize.TEXT,
                    "allowNull": false
                },
                "lat": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "long": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "imge": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "companyId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "companies",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // users
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING(50),
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING(50),
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('active', 'blocked', 'deleted'),
                    "defaultValue": "active",
                    "allowNull": true
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "lastLoginDate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "profilePicture": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "modifiedBy": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "roleId": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "roles",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // userLocations
        params: [
            "userLocations",
            {
                "id": {
                    "type": Sequelize.INTEGER(10),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "locationId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "locations",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // alerts
        params: [
            "alerts",
            {
                "id": {
                    "type": Sequelize.INTEGER(10),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "accountId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "accounts",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "type": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "index": {
                    "type": Sequelize.INTEGER(10),
                    "allowNull": false
                },
                "codeColor": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "textColor": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "hubLedColor": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "hubBlink": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "hubAudioBeep": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "activatedMessage": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "closedMessage": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "createdDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedDate": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "createdBy": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                },
                "updatedBy": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // userGroups
        params: [
            "userGroups",
            {
                "id": {
                    "type": Sequelize.INTEGER(10),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "accountId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "accounts",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(25),
                    "allowNull": false
                },
                "createdBy": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // userGroupsToUser
        params: [
            "userGroupsToUser",
            {
                "userId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "userGroupId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "userGroups",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable", // alertManagment
        params: [
            "alertManagment",
            {
                "userGroupId": {
                    "type": Sequelize.INTEGER(10),
                    "references": {
                        "model": "userGroups",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "alertId": {
                    "type": Sequelize.INTEGER(10),
                    "allowNull": false,
                    "references": {
                        "model": "alerts",
                        "key": "id"
                    }
                },
                "canReceive": {
                    "type": Sequelize.BOOLEAN(),
                    "allowNull": false,
                    // "defaultValue": {
                    //     "value": "false"
                    // }
                },
                "canCreate": {
                    "type": Sequelize.BOOLEAN(),
                    "allowNull": false,
                    // "defaultValue": {
                    //     "value": "false"
                    // }
                },
                "canClose": {
                    "type": Sequelize.BOOLEAN(),
                    "allowNull": false,
                    // "defaultValue": {
                    //     "value": "false"
                    // }
                }
            },
            {}
        ]
    },
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
