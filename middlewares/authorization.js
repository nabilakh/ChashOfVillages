const User = require("../models/User");

class authorization {
    static userAutho (req,res,next){
        const {id} = req.params;
        User.findById(req.UserId)
        .then((result)=>{
            if(result.id === id){ 
                next()
            } else {
                res.status(403).json({success:false, message:"Forbidden Access"})
            }

        })
        .catch(next) 
    }
}

module.exports = authorization;