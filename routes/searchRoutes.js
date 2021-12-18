const router = require('express').Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/',auth,(req,res)=>{
    const {username} = req.body
    User.findOne({username})
    .then(user=>{
        if(!user) return res.status(400).json({msg:`${username} has no account with TextMe`})

        return res.json({username:user.username,
                        email:user.email})
    })
})

module.exports = router