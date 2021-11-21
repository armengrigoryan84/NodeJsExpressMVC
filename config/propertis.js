/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
        STATUS: {
            ACTIVE:  'active',
            BLOCKED: 'blocked',
            DELETED: 'deleted'
        },
        userRoles: {
            accountAdmin: 1,
            companyAdmin: 2,
            userStaff:    3,
            userStudents: 4
        },
        HTTP: {
            OK: {
                CODE:     200,
                MESSAGE : 'Request has been fulfilled.'
            },
            UNAUTHORIZED: {
               CODE:    401,
               MESSAGE: 'Request has not been applied because it lacks valid authentication credentials for the target resource!'
            },
            UNAVAILABLE_FOR_LEGAL_REASONES : {
              CODE:    451,
              MESSAGE: 'server is denying access to the resource in response to a legal demand.'
            }, //451
            BAD_REQUEST: {
                CODE:    400,
                MESSAGE: 'server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process'
            }
        }
    }