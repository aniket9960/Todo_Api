const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');


exports.create_user = (req,res,next)=>{
    const body = req.body;
    User.find({emailid:body.emailid})
        .exec()
        .then((user) => {
            if(user.length>=1)
            {   
                console.log("mailExists");
                return res.status(409).json({
                    mailExists:true
                });
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        res.status(500).json({
                            err:err
                        });
                    }else{
                        const userData = new User({
                            _id : new mongoose.Types.ObjectId(),
                            firstName : body.fname,
                            lastName : body.lname,
                            mobile : body.mobileN,
                            emailid : body.emailid,
                            password : hash
                        });
                        userData.save()
                            .then((result) => {
                                res.status(201).json({
                                    data_saved:true
                                });
                            }).catch((err) => {
                                res.status(500).json({
                                    err : err
                                });
                            });
                    }
                });
            }
        });
};  

exports.login_user = (req,res,next)=>{
    User.find({emailid : req.body.username})
        .exec()
        .then((user) => {
            if(user.length<1){
                res.status(401).json({
                    message : 'Authentication Failed \n Check Username or Password'
                });
            }else{
                bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
                    if(err){
                        res.status(401).json({
                            message : 'Authentication Failed \n Check Username or Password'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            emailid : user[0].emailid,
                            userid : user[0]._id
                            },
                            process.env.JWT_KEY,
                            {expiresIn: '1h'}
                        );
                        return res.status(200).json({
                            message: 'Login Successful',
                            token : token
                        });
                    }
                    res.status(401).json({
                        message: 'Authentication Failed'
                    });
                });
            }
            
        })
};