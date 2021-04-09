const jwt = require("jsonwebtoken");

class authJwt {
  static authentication (req,res,next){
    const {access_token} = req.headers;
    if (!access_token){
        throw ({name: "Missing_Token"})
    }
    jwt.verify(access_token, process.env.secretKey, (err, decoded)=>{
        if (err){
            res.status(401).json({success:false, message:"Invalid token"})
        }
        req.UserId = decoded.id;
        next();
    })  
}
}

module.exports = authJwt;