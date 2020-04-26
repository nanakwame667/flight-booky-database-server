const User      = require('../models/user');
const Admin     = require('../models/admin');
const jwt       = require('jsonwebtoken');

const ADMIN_SECRET_KEY    = require('../utils/constants').ADMIN_SECRET_KEY;
const USER_SECRET_KEY     = require('../utils/constants').USER_SECRET_KEY;

function userAuthRequired(req, res, next) {
    let auth_token = req.headers.auth_token;

    jwt.verify(auth_token, USER_SECRET_KEY, function(err, decoded) {
        if (!err) {
            const id = decoded.id;
            User.findOne({ where: {id: id} }).then(function(user){
                if (user){
                    req.user = user.dataValues;
                    next();
                }
                else{
                    res.status(500).json({status: 'failed', result: {message: 'authentication failed please log in.', error: err}});
                }
            }).catch((err)=>{
                res.status(500).json({status: 'failed', result: {message: 'authentication failed!.', error: err}});
            });
        }
        else{
            res.status(500).json({status: 'failed', result: {message: 'authentication failed please log in.', error: err}});
        }
    });
}


function adminAuthRequired(req, res, next) {
    let auth_token = req.headers.auth_token;

    jwt.verify(auth_token, ADMIN_SECRET_KEY, function(err, decoded) {
        if (!err) {
            const id = decoded.id;
            Admin.findOne({ where: {id: id} }).then(function(admin){
                if (admin){
                    req.admin = admin.dataValues;
                    next();
                }
                else{
                    res.status(500).json({status: 'failed', result: {message: 'authentication failed please log in.', error: err}});
                }
            }).catch((err)=>{
                res.status(500).json({status: 'failed', result: {message: 'authentication failed!.', error: err}});
            });
        }
        else{
            res.status(500).json({status: 'failed', result: {message: 'authentication failed please log in.', error: err}});
        }
    });
}

module.exports = {
    userAuthRequired: userAuthRequired,
    adminAuthRequired: adminAuthRequired
};