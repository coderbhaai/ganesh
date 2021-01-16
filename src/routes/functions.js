var mysql = require('mysql')
import { decode } from "jsonwebtoken"
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

export function getMeta(url) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT title, description, keyword FROM metas WHERE url='${url}';
                    SELECT title, description, keyword FROM metas WHERE url='default';
                    SELECT name FROM blog_metas WHERE type='page' AND url='${url}'`
        pool.query(sql, [1,2,3], (err, rows) => {
        try{ if(err) throw err;
            if(rows){ 
                if(rows[0].length){ 
                    rows[0][0].url = url
                    if(rows[2].length){ rows[0][0].image = 'cover/'+rows[2][0].name }
                    resolve(rows[0]) 
                }else if(rows[1].length){ 
                    rows[1][0].url = url
                    if(rows[2].length){ rows[1][0].image = 'cover/'+rows[2][0].name }
                    resolve(rows[1])
                }
            }else if(err){ throw err }
        }catch(e){ logError(e); return; }
        });
    })
}

export function catName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name, id, url FROM blog_metas WHERE type = 'category' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == data.length){
                            resolve(list)
                        }
                    }catch(e){ logError(e); return; }
                });
            }
        }else{
            resolve(list)
        }
    });
}

export function tagName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name, id, url FROM blog_metas WHERE type = 'tag' AND id = '${data[i]}';`
                pool.query(sql, async (err, results) => {
                    try{ if(err) throw err;
                        await list.push(results[0])
                        if(i == list.length){ resolve(list) }
                    }catch(e){ logError(e); return; }
                });
            }
        }else{
            resolve(list)
        }
    });
}

export function blogMetaData(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT title, url FROM blogs ORDER BY id DESC;
                    SELECT name, url FROM blog_metas WHERE type = 'category';
                    SELECT name, url FROM blog_metas WHERE type = 'tag';
                    SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '0' ORDER BY id DESC;
                    SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '1' ORDER BY id ASC
                    `
        pool.query(sql, [1, 2, 3, 4, 5], (err, results) => {
            try{ if(err) throw err;
                resolve(results)
            }catch(e){ logError(e); return; }
        });
    });
}

export function suggestBlogs() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id, title as heading, url, coverImg FROM blogs ORDER by RAND() LIMIT 10`
      pool.query(sql, (err, rows) => {
        try{
            if(rows){ resolve(rows ) }else if(err){ throw err }
        }catch(e){
            logError(e)
            return;
        }
      });
    });
}

export function verifyToken(req,res,next){
    if(req.cookies.token){
      const bearerHeader = req.cookies.token
      if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader
        const { exp }  = decode(bearerHeader)
        if (Date.now() >= exp * 1000) { 
          res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
          return;
        }
        next()
      }else{
        res.sendStatus(403)
        return
      }
    }else{
      res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
      return;
    }
}

export function verifyAdmin(req,res,next){
    if(req.cookies.token){
        const bearerHeader = req.cookies.token
        try{
            const user = jwt.verify(bearerHeader,'secretkey')
            if (user.user.role!=='Admin'){
            res.redirect('/blog')
            res.end()
            return;
            }
            next();
        } catch(e){  
            logError(e)        
            res.status(403);
            return;
        }
        }else{
            res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
        }
}

function sendMailOnError(e) {
    const mailBody =`
        <h2><strong>Hi</h2>
        <p>There has been error in India Enigma. Please check if website is running or not.</p>
        <p>Then check the log</p>
        ${e}<br/>
        // ${func}
        <p>Warm Regards</p>
        <p>Team AmitKK</p>
    `
    let transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai@2203',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
    let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.indiaenigma.com", html: mailBody }
    transporter.sendMail( mailOptions, (error, info)=>{
        res.send({ success: true, message: "Please check your mail" })
    })
}
  
export function logError(e){
    // sendMailOnError(e)
    console.log('e', e)
}