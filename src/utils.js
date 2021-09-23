import jwt from 'jsonwebtoken';

export const isAuth =(req,res,next) =>{
    const authorization =req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(tken, process.env.JWT_SECRET || 'somethingsecret',(err,decode) =>{
            if(err){
                req.status(401).send({message:'invalid Token !!'});

            }else {
                req.user =decode;
                next();
            }
        })
    }
}