const jwt = require('jsonwebtoken')

const auth =(req,res,next)=>{
    const token = req.header('x-auth-token')

    if(!token) res.status(401).json({msg:'you are not authorized,please login or signup'})

    try{
        const decoded = jwt.verify(token,process.env.jwtsecret)

        req.user = decoded
        next()
    }catch(e){
        res.status(400).json({msg:"Please authorize"})
    }
}

module.exports = auth