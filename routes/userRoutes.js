const router = require('express').Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

router.get('/user',auth,(req,res)=>{

    User.findById(req.user.id)
    .select('-password')
    .then(user=>{
        if(!user) return res.status(500).json({msg:'server unable to find you'})
        return res.json({user})
    })
})

router.get('/getAllUsers',auth,(req,res)=>{
    User.find()
    .select('-password')
    .then(usersList=>{
        return res.json(usersList)
    })
    .catch(err=> res.status(500).json({msg:'unable to fetch your contacts right now!'}))
})

router.post('/saveProfileChanges',auth,(req,res)=>{
    const {about,username,email,profilePhoto} = req.body

    User.findById(req.user.id)
    .then(user=>{
        user.about=about
        user.username=username
        user.email=email
        user.profilePic=profilePhoto

        const saved = user.save()
        if(saved) return res.json({msg:'Changes saved successfully!'})
    })
    .catch(e=>{
        return res.status(500).json({msg:'Changes not saved, please try later'})
    })

})
module.exports = router