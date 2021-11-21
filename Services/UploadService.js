/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = (app)=>{
    class Upload{
        profilePicture(settings){
            let storage = settings.multer.diskStorage({
                destination: function(req,file,cb){
                    cb(null,'uploads/profile/');
                },
                filename:function(req, file, cb){
                    let ext = settings.pathLib.extname(file.originalname);
                    cb(null, file.fieldname + '-' + Date.now() + ext);
                }
            });
            return settings.multer({ storage: storage }).single('avatar');
        }
    }
    return new Upload;
}