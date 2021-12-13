let mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    isConfirmed: {
        type:String,
        required:true
    }, 
    otp: {
        type:String,
        required:true
    }
});
module.exports = {User}
