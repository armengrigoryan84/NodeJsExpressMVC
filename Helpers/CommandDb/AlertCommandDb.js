/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.eports = (app)=>{
    
    class AlerpoitnCommandDb {
        
        permitParams(req){
            const alertData = {
                accountId: req.body.accountId,
                type:      req.body.type,
                name:      req.body.name,
                index:     req.body.index
            }
            if (req.method === 'POST') alertData.createdBy = req.userSession.id;
            if (req.method === 'PUT') alertData.updatedBy = req.userSession.id;
            return alertData;
        }
    }
    
    return new AlerpoitnCommandDb;
}