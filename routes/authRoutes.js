const router = require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/register',(req,res)=>{

    const {username,email,password} = req.body

    //validation
    if(!username || !email || !password){
        return res.status(400).json({msg:"please enter all fields"})
    }
    
    //check for existing user
    User.findOne({email:convertedEmail})
    .then(user=>{
        if(user){
        return res.status(400).json({msg:"user already exists"})}

        const newUser = new User({
            username,email,password,
        })

        // create salt and hash
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) throw err
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err
                newUser.password=hash
                newUser.save()
                .then(user=>{

                    jwt.sign(
                        {id:user.id},
                        process.env.jwtsecret,
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err
                            return res.json({
                                token,user:{
                                    id:user._id,
                                    username:user.username,
                                    email:user.email,
                                    about:user.about,
                                    profilePic:user.profilePic
                            }            
                        })
                    })

                })
            })
        })

    })
})

router.post('/login',(req,res)=>{

    const {email,password} = req.body

    let convertedEmail = email.toLowerCase()
    User.findOne({email:convertedEmail})
    .then((user)=>{
        if(!user) return res.status(400).json({msg:"unable to find user with provided email"})

        //validate password
        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg:"wrong password"})

           jwt.sign(
               {id:user.id},
               process.env.jwtsecret,
               {expiresIn:3600},
               (err,token)=>{
                   if(err) throw err
                   return res.json({
                       token,user:{
                           id:user._id,
                           username:user.username,
                           email:user.email,
                           about:user.about,
                           profilePic:user.profilePic
                       }
                   })
               }
           )
        })
        
    })
})

module.exports = router