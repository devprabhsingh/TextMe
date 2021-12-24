const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now
    },
    profilePic:{
        type:String
    },
    about:{
        type:String
    }

})

module.exports = User = mongoose.model('user', UserSchema);