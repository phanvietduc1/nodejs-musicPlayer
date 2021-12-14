const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { getUser, register, login, loginByHash, logout, confirmOtp, resetPassword, changePassword, resendOTP } = require('../controllers/userController');
router.use(bodyParser.json());

router.get('/api/user', getUser);
router.post('/api/user/register', register);
router.post('/api/user/login', login);
router.post('/api/user/loginByHash', loginByHash);
router.post('/api/user/logout', logout);
router.post('/api/user/changePassword', changePassword);
router.post('/api/user/confirmOtp', confirmOtp);
router.post('/api/user/resetPassword', resetPassword);
router.post('/api/user/resendOTP', resendOTP);

module.exports = router;