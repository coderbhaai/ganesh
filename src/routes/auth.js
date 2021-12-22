import express from "express";
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const func = require('./functions')
const jwt = require('jsonwebtoken')
import bcrypt from 'bcryptjs';
const nodemailer = require("nodemailer");

const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'care@pujarambh.com', pass: 'Ganpati987',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

router.post('/register', asyncMiddleware( async(req, res, next) => {
    let sql = `SELECT id FROM users WHERE email='${req.body.email}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results[0]){
                const login = await initiateLogin(req.body.email, req.body.password)
                if(login[0]){
                    res.cookie('token', login[1].token, 2147483647)
                    res.send({ success: true, user: login[1], message: login[2] }) 
                }else{
                    res.send({ success: false, message: login[2] })
                }
            } else{
                let post= {
                    'name':                       req.body.name, 
                    'email':                      req.body.email,
                    'role':                       req.body.role,
                    'image':                      req.body.image,  
                    'provider':                   req.body.provider,  
                    "created_at":                 time,
                    "updated_at":                 time,
                }
                const user={
                    name:                       req.body.name, 
                    email:                      req.body.email,
                    role:                       req.body.role,
                }
                jwt.sign({ user }, 'secretkey', (err, token)=>{
                    if(err) throw err;
                    if(token){
                        post.token  = token
                        bcrypt.genSalt(10, (err2, salt)=>{
                            if(err2) throw err2;
                            bcrypt.hash(req.body.password, salt, (err3, hash)=>{
                                if(err3) throw err3;
                                post.password = hash
                                let sql2 = `INSERT INTO users SET ?`
                                pool.query(sql2, post, (err4, results2) => {
                                    try{
                                        if(err4){ throw err4 }
                                        if(results2){
                                            const mailBody =`
                                                <h2><strong>Dear ${req.body.name}</strong></h2>
                                                <p>Thanks for registering with us.</p>
                                                <p>The details provided by you are:</p>
                                                <ul>
                                                    <li>Name: ${req.body.name}</li>
                                                    <li>Email: ${req.body.email}</li>
                                                </ul>
                                                <p>We welcome you onboard.</p><br/>
                                                <p>Warm Regards</p>
                                                <p>Team pujarambh</p>
                                                `
                                            let mailOptions = { to: req.body.email, from: '"Care"<care@pujarambh.com>', cc: "care@pujarambh.com, sales@techsmartdevotions.com", subject: `${req.body.name} registered on website ✔ www.pujarambh.com`, html: mailBody }
                                            transporter.sendMail( mailOptions, (error, info)=>{
                                                if(error){ func.printError(err) }
                                                func.printError("Message sent: %s")
                                            });
                                            user.token = token
                                            user.auth = true
                                            user.id = results2.insertId
                                            res.cookie('token', token, 2147483647)
                                            res.send({ success: true, user: user, message: 'Registration successful, Welcome!!!' })
                                        }
                                    }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                                })
                            })
                        })
                    }
                })
            }
        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
    })
}))

router.post('/login', asyncMiddleware( async(req, res, next) => {
    const login = await initiateLogin(req.body.email, req.body.password)
    if(login[0]){
        res.cookie('token', login[1].token, 2147483647)
        res.send({ success: true, user: login[1], message: login[2] }) 
    }else{
        res.send({ success: false, message: login[2] })
    }
}))

router.post('/forgotPassword', asyncMiddleware( async(req, res, next) => {
    let sql =   `SELECT id, name FROM users WHERE email='${req.body.email}';
                SELECT token FROM password_resets WHERE email='${req.body.email}'`
    pool.query(sql, [1,2], (err, results) => {
        try{
            if(err){ throw err }
            if(!results[0][0]){ 
                res.send({ success: false, message: "No Account by this name" }) 
            } else{
                let post= {
                    "created_at":                   time,
                    "token":                        Math.random().toString(36).substr(2) +  Math.random().toString(36).substr(2)
                }
                var name = results[0][0].name
                if(results[1][0]){
                    var sql2 = `UPDATE password_resets SET ? WHERE email = '${req.body.email}'`;
                }else{
                    post.email = req.body.email
                    var sql2 = `INSERT INTO password_resets SET ?`
                }
                pool.query(sql2, post, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ 
                            const mailBody =`
                                <h2><strong>Dear ${name}</strong></h2>
                                <p>You requested for a password reset. Please click on the below link to reset the password.</p>
                                <a href="https://pujarambh.com/reset-password/${post.token}"><button>Reset Pasword</button></a>
            
                                <p>Connect with us if you have not requested this.</p><br/>
                                <p>Warm Regards</p>
                                <p>Team Pujarambh</p>
                            `
                            let mailOptions = { to: req.body.email, from: '"Care"<care@pujarambh.com>', cc: "care@pujarambh.com, sales@techsmartdevotions.com", subject: "Password reset request ✔ www.pujarambheagle.com", html: mailBody }
                            transporter.sendMail( mailOptions, (error, info)=>{
                                res.send({ success: true, message: "Please check your mail" })
                            })
                        }
                    }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
    })
}))

router.post('/resetPassword', asyncMiddleware( async(req, res, next) => {
    let sql =   `SELECT id, name, role FROM users WHERE email='${req.body.email}';
                SELECT token FROM password_resets WHERE email='${req.body.email}' AND token='${req.body.token}'`
    pool.query(sql, [1,2], (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                if(!results[0][0]){ 
                    res.send({ success: false, message: "No Account by this name" }) 
                }else if(req.body.password !== req.body.confirm_password){
                    res.send({ success: false, message: "Passwords Mismatch" }) 
                }else if(!results[1][0]){
                    res.send({ success: false, message: "You did not ask for password reset" }) 
                }else{
                    let post= {
                        "updated_at":                 time,
                    }
                    const user={
                        name:                       results[0][0].name, 
                        email:                      req.body.email,
                        role:                       results[0][0].role,
                    }
                    jwt.sign({ user }, 'secretkey', (err, token)=>{
                        if(token){
                            post.token  = token
                            bcrypt.genSalt(10, (err, salt)=>{
                                if(err) throw err;
                                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                                    if(err) throw err;
                                    post.password = hash
                                    var sql2 = `UPDATE users SET ? WHERE email = '${req.body.email}'`;
                                    pool.query(sql2, post, (err2, results2) => {
                                        try{
                                            if(err2){ throw err2 }
                                            if(results2){
                                                let sql3 = `DELETE FROM password_resets WHERE email='${req.body.email}' AND token='${req.body.token}'`
                                                pool.query(sql3, (err3, results3) => {
                                                    try{
                                                        if(err3){ throw err3 }
                                                        if(results3){ res.send({ success: true, message: 'Password reset, Please login!!!' }) }
                                                    }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                                                })
                                            }
                                        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                                    })
                                })
                            })
                        }
                    })
                }
            }
        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
    })
}))

router.post('/logOut', asyncMiddleware( async(req, res, next) => {
    res.clearCookie('token')
    let sql = `SELECT id, email, token from users WHERE email = '${req.body.email}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results[0]){
                var sql2 = `UPDATE users SET token = Null, updated_at = '${time}' WHERE id = '${results[0].id}';`
                pool.query(sql2, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ res.send({ success: true, message: "You are logged Out" }) }
                    }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
    })
}))

function initiateLogin(email, password){
    return new Promise((resolve, reject) => {
        let sql = `SELECT id, name, email, role, password from users WHERE email = '${email}'`
        pool.query(sql, async(err, results) => {
            try{
                if(err){ throw err }
                if(results && results.length){
                    if(results[0]){
                        bcrypt.compare(password, results[0].password)
                        .then(isMatch=>{
                            if(isMatch){
                                const user={ id: results[0].id, name: results[0].name, email: results[0].email, role: results[0].role }
                                jwt.sign({ user }, 'secretkey', (err, token)=>{
                                    if(err) throw err;
                                    user.token = token
                                    user.auth = true
                                    let sql2 = `UPDATE users SET token = '${token}', updated_at = '${time}' WHERE id = '${results[0].id}'`
                                    pool.query(sql2, (err2, results2) => {
                                        try{
                                            if(err2){ throw err2 }
                                            if(results2){ resolve([true, user, "Welcome to Pujarambh"]) }
                                        }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
                                    })
                                })
                            }else{ resolve([false, {}, "Password is Incorrect"]) }
                        })
                    }
                }else{ resolve([false, {}, "No Account by this name"]) }
            }catch(e){ res.send({ success: false, message: e.sqlMessage }); func.logError(e); res.status(500); return; }
        })
    });
}

module.exports = router;