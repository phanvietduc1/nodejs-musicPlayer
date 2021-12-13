const { User } = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const utility = require("../helpers/utility");

const getUser = async (req, res, next) => {
    User.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

/**
 * User registration.
 *
 * @param {string}      name
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
const register = async (req, res, next) => {
    User.findOne({email : req.body.email}).then(user => {
        if (user) {
            const emp = new User({
                email: "0"
            });
            return res.status(200).json(emp);
        } else {
            bcrypt.hash(req.body.password,10,function(err, hash) {
                let otp = utility.randomNumber(4);
        
                console.log(otp);
                const emp = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    isConfirmed: "0",
                    otp: otp
                });
        
                let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
                // Send confirmation email
                mailer.send(
                    '<testAPI1618@gmail.com> ', 
                    req.body.email,
                    "Confirm Account",
                    html
                ).then(function(){
                    emp.save((err, data) => {
                        if(!err) {
                            // res.send(data);
                            res.status(200).json(data);
                        } else {
                            console.log(err);
                        }
                    });
                }).catch(err => {
                    console.log(err);
                }) ;
            });
        }
    });
}

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
const login = async (req, res, next) => {
    try {
        User.findOne({email : req.body.email}).then(user => {
            if (user) {
                //Compare given password with db's hash.
                bcrypt.compare(req.body.password,user.password,function (err,same) {
                    if(same){
                        let userData = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            otp: user.otp,
                            isConfirmed: user.isConfirmed,
                            password: user.password
                        };
                        //Prepare JWT token for authentication
                        const jwtPayload = userData;
                        const jwtData = {
                            expiresIn: "2 hours",
                        };
                        const secret = "myscret";
                        //Generated JWT token with Payload and secret.
                        userData.token = jwt.sign(jwtPayload, secret, jwtData);
                        
                        console.log(userData);
                        return res.status(200).json(userData);
                    }else{
                        return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
                    }
                });
            }else{
                return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
            }
        });
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
}

const loginByHash = async (req, res, next) => {
    try {
        User.findOne({email : req.body.email, password: req.body.password}).then(user => {
            if (user) {
                let userData = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    otp: user.otp,
                    isConfirmed: user.isConfirmed,
                    password: user.password
                };
                return res.status(200).json(userData);
            }else{
                return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
            }
        });
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
}

// const logout = async (req, res) => {
//     try {
//         res.clearCookie("jwt");
//     } catch{
//         res.status(500).send(err);
//     }
// }
const logout = async(req, res) => {
    var sess = req.session.user;
    if(sess){
        req.session.user = null;
        res.status(200).json({code: 200, message: 'Logout Successfully'})
    }
    res.status(200).json({code: 200, message: 'Logout Unsccessful'})
}

const confirmOtp = async (req, res, next) => {
    try {
        var query = {email : req.body.email};
        User.findOne(query).then(user => {
            if (user) {
                //Check already confirm or not.
                if(user.isConfirmed == "0"){
                    //Check account confirmation.
                    if(user.otp == req.body.otp){
                        //Update user as confirmed
                        User.findOneAndUpdate(query, {
                            isConfirmed: "1",
                            confirmOTP: null 
                        }).catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                        return apiResponse.successResponse(res,"Account confirmed success.");
                    }else{
                        return apiResponse.unauthorizedResponse(res, "Otp does not match");
                    }
                }else{
                    return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
                }
            }else{
                return apiResponse.unauthorizedResponse(res, "Specified email not found.");
            }
        });
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        let newPassword = utility.randomNumber(6);
        bcrypt.hash(newPassword.toString(),10,function(err, hash) {
            console.log(hash);
            let html = "<p>Your new password:</p><p> "+newPassword+"</p>";
            // Send email
            mailer.send(
                '<testAPI1618@gmail.com> ', 
                req.body.keyword,
                "Reset password",
                html
            ).then(function(){
                var query = {email : req.body.keyword};

                User.findOneAndUpdate(query, {
                    password: hash,
                }).catch(err => {
                    return apiResponse.ErrorResponse(res, err);
                });

                return apiResponse.successResponse(res,"Reset password success.");
            }).catch(err => {
                console.log(err);
            }) ;
        });
    } catch {
        res.status(500).send(err);
    }
}

const changePassword = async (req, res, next) => {
    User.findOne({email : req.body.email}).then(user => {
        if (user) {
            bcrypt.compare(req.body.oldPassword, user.password,function (err,same) {
                
                if(same){
                    bcrypt.hash(req.body.password,10,function(err, hash) {
                        var query = {password : user.password};

                        console.log(hash);
                        console.log(req.body.password);
                        User.findOneAndUpdate(query, {
                            password: hash
                        }).catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                        return apiResponse.successResponse(res,"Reset password success.");
                    });
                } else {
                    return apiResponse.unauthorizedResponse(res, "Wrong password.");
                }
            });
        } else{
            return apiResponse.unauthorizedResponse(res, "Wrong email.");
        }
    });
}

const resendOTP = async (req, res) => {
    var query = {email : req.body.email};
        User.findOne(query).then(user => {
            if (user) {
                //Check already confirm or not.
                if(user.isConfirmed == "0"){
                    // Generate otp
                    let otp = utility.randomNumber(4);
                    // Html email body
                    let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
                    // Send confirmation email
                    mailer.send(
                        '<testAPI1618@gmail.com> ',
                        req.body.email,
                        "Confirm Account",
                        html
                    ).then(function(){
                        user.isConfirmed = 0;
                        user.otp = otp;
                        console.log(otp);
                        // Save user.
                        user.save(function (err) {
                            if (err) { return apiResponse.ErrorResponse(res, err); }
                            return apiResponse.successResponse(res,"Confirm otp sent.");
                        });
                    });
                }else{
                    return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
                }
            }else{
                return apiResponse.unauthorizedResponse(res, "Specified email not found.");
            }
        });
}

module.exports = {
    getUser,
    register,
    login,
    logout,
    confirmOtp,
    resetPassword,
    changePassword,
    resendOTP,
    loginByHash
}