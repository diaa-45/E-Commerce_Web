const jwt=require("jsonwebtoken");

// verify Token
function VerfiyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try {
            const decode= jwt.verify(token , process.env.JWT_SECRET_KEY);
            req.user=decode;
            next();

        } catch (error) {
            res.status(401).json({message:"invalied token"})
        }
    }else{
        res.status(401).json({message: "no Token provided"})
    }
};
// verify token & Authorize user

function VerifyTokenAndAuthorization(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json({message:"you are not allwoed"});
          }
    });
}

function VerifyTokenAndToAddOeder(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user._id == req.params.id){
        }else{
            res.status(403).json({message:"you are not allwoed"});
            next();
          }
    });
}

// verify token & Authorize Admin

function VerifyTokenAndAdmin(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
          }else{
            res.status(403).json({message:"you are not allwoed , only admin can accses this"});
          }
    });
}

module.exports={
    VerfiyToken,
    VerifyTokenAndAuthorization,
    VerifyTokenAndAdmin,
    VerifyTokenAndToAddOeder
};