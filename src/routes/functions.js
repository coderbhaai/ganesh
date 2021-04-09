var mysql = require('mysql')
import { decode } from "jsonwebtoken"
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
import bcrypt from 'bcryptjs';
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

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

export function pendingMeta() {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT CONCAT('/', a.url) as url from blogs as a left join metas as b on b.url = CONCAT('/', a.url) WHERE b.url IS NULL;
        SELECT CONCAT('/category/', a.url) as url from blog_metas as a left join metas as b on b.url = CONCAT('/category/', a.url) WHERE b.url IS NULL AND a.type='category';
        SELECT CONCAT('/tag/', a.url) as url from blog_metas as a left join metas as b on b.url = CONCAT('/tag/', a.url) WHERE b.url IS NULL AND a.type='tag';
        SELECT CONCAT('/product/', a.url) as url from products as a left join metas as b on b.url = CONCAT('/product/', a.url) WHERE b.url IS NULL;`
        pool.query(sql,[1,2,3,4], (err, rows) => {
            try{
                if(err) throw err;
                if(rows){ resolve(rows) }
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

export function productCatName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name as text, id as value FROM basic Where type='Category' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == list.length){
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

// export function productTagName(data) {
//     var list = []
//     return new Promise((resolve, reject) => {
//         if(data.length>0){
//             for(var i = 0; i < data.length; i++){
//                 let sql = `SELECT name as text, id as value FROM basic Where type='Tag' AND id = '${data[i]}';`
//                 pool.query(sql, async (err, results) => {
//                     try{ if(err) throw err;
//                         await list.push(results[0])
//                         if(i == list.length){ resolve(list) }
//                     }catch(e){ logError(e); return; }
//                 });
//             }
//         }else{
//             resolve(list)
//         }
//     });
// }

export function productIncName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name as text, id as value, tab1 FROM basic Where type='Puja' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == list.length){
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

export function productExcName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name as text, id as value, tab1 FROM basic Where type='Puja' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == list.length){ resolve(list) }
                    }catch(e){ logError(e); return; }
                });
            }
        }else{
            resolve(list)
        }
    });
}

export function productRecomName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT id, name as text, id as value, images, rating, price, sale, url FROM products Where id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == list.length){ resolve(list) }
                    }catch(e){ logError(e); return; }
                });
            }
        }else{
            resolve(list)
        }
    });
}

export function productRelatedName(data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT id, name as text, id as value, images, rating, price, sale, url FROM products Where id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
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
      let sql = `SELECT id, title as heading, url, excerpt, coverImg, smallImg FROM blogs;`
      pool.query(sql, (err, rows) => {
        try{
            if(err){ throw err }
            if(rows){ resolve(rows ) }
        }catch(e){ logError(e); return; }
      });
    });
}

export function addCatChecks(products){
    return new Promise((resolve, reject) => {
        if(products){
            for(var i = 0; i < products.length; i++){ products[i]["isChecked"] = false }
            resolve(products)
        }
    })
}

export function checkSingleCoupon(coupon, userId){
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM couponapllied WHERE couponCode='${coupon}' AND userId='${userId}';`
        pool.query(sql, (err, rows) => {
            try{
                if(err){ throw err }
                if(rows.length){ resolve(true) }else{ resolve(false) }
            }catch(e){ logError(e); return; }
        });
    })
}

export function updateCouponApplied(userId, orderId, discount){
    return new Promise((resolve, reject) => {
        let post= {
            "userId":                       userId,
            "orderId":                      orderId,
            "type":                         JSON.parse(discount)[0].type,
            "couponId":                     JSON.parse(discount)[0].id,
            "couponCode":                   JSON.parse(discount)[0].code,
            "created_at":                   time,
            "updated_at":                   time
        }
        let sql = 'INSERT INTO couponapllied SET ?'
        pool.query(sql, post, (err, rows) => {
            try{
                if(err){ throw err }
                if(rows.length){ resolve(true) }else{ resolve(false) }
            }catch(e){ logError(e); return; }
        });
    })
}

export function getCatFilterProducts(data){
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name as text, id as value, tab1 FROM basic Where type='Puja' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ if(err) throw err;
                        list.push(results[0])
                        if(i == list.length){
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

export function getCoupon(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id, type, code, discount, dis_type, start, expiry, status, product, updated_at FROM coupon WHERE id='${id}'`
      pool.query(sql, (err, rows) => {
        try{
            if(err){ throw err }
            if(rows){ resolve(rows ) }
        }catch(e){ logError(e); return; }
      });
    });
}

export function suggestProducts() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id, name, type, url, images, price, sale, tagline, rating FROM products WHERE status = '1';`
      pool.query(sql, (err, rows) => {
        try{
            if(err){ throw err }
            if(rows){ resolve(rows ) }
        }catch(e){ logError(e); return; }
      });
    });
}

export function similarCatProducts(array, id){
    return new Promise((resolve, reject) => {
        var list = []
        const idList = [id]
        const lim = 3
        if(array.length>0){
            for(var i = 0; i < array.length || i<2; i++){
                if( i === 2 || list.length === lim ){
                    resolve(list)
                }else{
                    let sql = `SELECT id, name, url, images, price, rating FROM products WHERE status = '1' AND category LIKE '%${array[i]}%';`
                    pool.query(sql, async (err, results) => {
                        try{ 
                            if(err) throw err;
                            for(var j = 0; j < results.length; j++){
                                if(idList.indexOf(results[j].id) !== -1){
                                } else{
                                    await list.push(results[j])
                                    await idList.push(results[j].id)
                                }
                                if( i === array.length || i === 2 || list.length === lim ){ 
                                    resolve(list) }
                                    // break
                            }
                        }catch(e){ logError(e); return; }
                    });
                }
            }
        }else{
            resolve(list)
        }
    });
}

// export function similarTagProducts(array, id) {
//     return new Promise((resolve, reject) => {
//         var list = []
//         const idList = [id]
//         const lim = 3
//         if(array.length>0){
//             for(var i = 0; i < array.length || i<2; i++){
//                 if( i === 2 || list.length === lim ){
//                     resolve(list)
//                 }else{
//                     let sql = `SELECT id, name, url, images, price, rating FROM products WHERE status = '1' AND tags LIKE '%${array[i]}%';`
//                     pool.query(sql, async (err, results) => {
//                         try{ 
//                             if(err) throw err;
//                             for(var j = 0; j < results.length; j++){
//                                 if(idList.indexOf(results[j].id) !== -1){
//                                 } else{
//                                     await list.push(results[j])
//                                     await idList.push(results[j].id)
//                                 }
//                                 if( i === array.length || i === 2 || list.length === lim ){ 
//                                     resolve(list) }
//                             }
//                         }catch(e){ logError(e); return; }
//                     });
//                 }
//             }
//         }else{
//             resolve(list)
//         }
//     });
// }

export function productReview(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT a.id, a.productId, a.userId, a.review, a.rating, a.updated_at, b.name FROM rating as a 
                    left join users as b on b.id = a.userId WHERE productId = '${id}';`
        pool.query(sql, (err, rows) => {
            try{
                if(err){ throw err }
                if(rows){ resolve(rows ) }
            }catch(e){ logError(e); return; }
        });
    });
}

export function checkUser(name, email){
    return new Promise((resolve, reject) => {
        // let sql = `SELECT id FROM users WHERE email = '${email}'`
        let sql = `SELECT id, name, email, role, password from users WHERE email = '${email}'`
        pool.query(sql, async(err, results) => {
            try{  
                if(err){ throw err }  
                if(results){ 
                    if(results.length){
                        const user={ id: results[0].id, name: results[0].name, email: results[0].email, role: results[0].role, auth: true }
                        resolve(['Exists', results[0].id, user, '', 'Order placed succesfully'])
                    }else{
                        let post= {
                            'name':                       name, 
                            'email':                      email,
                            'role':                       'User',
                            "created_at":                 time
                        }
                        const user={
                            name:                       name, 
                            email:                      email,
                            role:                       'User'
                        }
                        jwt.sign({ user }, 'secretkey', { expiresIn: '24h'}, (err, token)=>{
                            if(token){
                                post.token  = token
                                bcrypt.genSalt(10, (err, salt)=>{
                                    if(err) logError(err);
                                    const password = Math.random().toString(36).substr(2)
                                    bcrypt.hash( password, salt, (err, hash)=>{
                                        if(err) logError(err)
                                        post.password = hash
                                        let sql2 = `INSERT INTO users SET ?`
                                        pool.query(sql2, post, (err2, results2) => {
                                            if(err2) logError(err2)
                                            if(results2){
                                                user.token = token
                                                user.auth = true
                                                user.id = results2.insertId
                                                resolve(['Created', results2.insertId, user, password, 'Order placed & Account created succesfully' ])
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    }
                }
            }catch(e){ logError(e); res.status(500); return; }
            
        })
    })
}

export function latestOrderNumber(){
    return new Promise((resolve, reject) => {
        let sql = `SELECT order_number FROM orders ORDER BY id DESC LIMIT 1`
        pool.query(sql, async(err, results) => {
            try{
                if(err){ throw err }   
                if(results){ 
                    if(results.length){
                        resolve(results[0].order_number+1)
                    }else{
                        resolve(1)
                    }
                }
            }catch(e){ logError(e); res.status(500); return; }
            
        })
    })
}

// export function mailOrderToBuyer(loggedIn, name, email, password, cart){
//     return new Promise((resolve, reject) => {
//         if(password){
//             var content = `<p>Your Account has also been created and the password is - <strong>${password}</strong>.</p><p>We are happy to serve you</p><br/>`
//         }else{
//             var content = `<p>We are happy to serve you</p><br/>`
//         }
//         const mailBody =`
//             <h2><strong>Dear ${name}</strong></h2>
//             <p>Your Order has been created and will be delivered soon.</p><br/>
//             <button style="background:red;border: none;border-radius: 5px;display: block;"><a href="http://localhost:3030/blog" style="color: #fff;text-decoration: none;padding: 10px;display: block;">Check Your Order</a></button><br/>
//             ${content}
//             <p>Warm Regards</p>
//             <p>Team Ecom</p>
//             `
//         let mailOptions = { to: email, from: 'amit@amitkk.com', cc: `amit@amitkk.com`, subject: "Order Submitted ✔ www.pujarambh.com", html: mailBody }
//         transporter.sendMail( mailOptions, (err, info)=>{ 
//             if(err){ logError(err) }
//             resolve( info )
//         })
//     })
// }

// export function mailOrderToSeller(){
//     return new Promise((resolve, reject) => {
//         const mailBody =`
//             <h2><strong>Dear Team,</strong></h2>
//             <p>Your have received an order on ECOM</p><br/>
//             <button style="background:red;border: none;border-radius: 5px;display: block;"><a href="http://localhost:3030/blog" style="color: #fff;text-decoration: none;padding: 10px;display: block;">Check Order Received</a></button><br/>
//             <p>Warm Regards</p>
//             <p>Team Ecom</p>
//             `
//         let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', cc: `amit@amitkk.com`, subject: "Order Received ✔ www.pujarambh.com", html: mailBody }
//         transporter.sendMail( mailOptions, (error, info)=>{ 
//             if(error){ logError(error) }
//             resolve( info )
//         })
//     })
// }

export function mailOrder(loggedIn, name, email, password, cart){
    return new Promise((resolve, reject) => {
        if(password){
            var content = `<p>Your Account has also been created and the password is - <strong>${password}</strong>.</p><p>We are happy to serve you</p><br/>`
        }else{
            var content = `<p>We are happy to serve you</p><br/>`
        }
        const mailBody1 =`
            <h2><strong>Dear ${name}</strong></h2>
            <p>Your Order has been created and will be delivered soon.</p><br/>
            <button style="background:red;border: none;border-radius: 5px;display: block;"><a href="https://pujarambh.com/user/admin" style="color: #fff;text-decoration: none;padding: 10px;display: block;">Check Your Order</a></button><br/>
            ${content}
            <p>Warm Regards</p>
            <p>Team Ecom</p>
            `
        let mailOptions1 = { to: email, from: 'amit@amitkk.com', cc: `amit@amitkk.com`, subject: "Order Submitted ✔ www.pujarambh.com", html: mailBody1 }
        transporter.sendMail( mailOptions1, (err, info)=>{ 
            if(err){ logError(err) }
            resolve( info )
        })

        const mailBody2 =`
        <h2><strong>Dear Team,</strong></h2>
        <p>Your have received an order on ECOM</p><br/>
        <button style="background:red;border: none;border-radius: 5px;display: block;"><a href="https://pujarambh.com/admin/adminOrders" style="color: #fff;text-decoration: none;padding: 10px;display: block;">Check Order Received</a></button><br/>
        <p>Warm Regards</p>
        <p>Team Ecom</p>
        `

        let mailOptions2 = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', cc: `amit@amitkk.com`, subject: "Order Received ✔ www.pujarambh.com", html: mailBody2 }
        transporter.sendMail( mailOptions2, (err, info)=>{ 
            if(err){ logError(err) }
            resolve( info )
        })
    })
}

export function verifyToken(req,res,next){
    if(req.cookies.token){
        const bearerHeader = req.cookies.token
        if(typeof bearerHeader !== 'undefined'){
            req.token = bearerHeader
            const { exp }  = decode(bearerHeader)
            if (Date.now() >= exp * 1000) { 
                res.redirect('/sign-up?e=' + encodeURIComponent('LoggedOut'));
                return;
            }
            next()
        }else{ res.sendStatus(403); return; }
    }else{
        res.redirect('/sign-up?e=' + encodeURIComponent('LoggedOut'));
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
        } catch(e){ logError(e); res.status(403); return; }
    }else{
        res.redirect('/sign-up?e=' + encodeURIComponent('LoggedOut'));
    }
}

export function verifyUser(req,res,next){
    if(req.cookies.token){
        const bearerHeader = req.cookies.token
        try{
            const user = jwt.verify(bearerHeader,'secretkey')
            if (user.user.role!=='User'){
                res.redirect('/blog')
                res.end()
                return;
            }
            next();
        } catch(e){ logError(e); res.status(403); return; }
    }else{
        res.redirect('/sign-up?e=' + encodeURIComponent('LoggedOut'));
    }
}

function sendMailOnError(e) {
    const mailBody =`
        <h2><strong>Hi</h2>
        <p>There has been error in Pujarambh. Please check if website is running or not.</p>
        <p>Then check the log</p>
        ${e}
        <p>Warm Regards</p>
        <p>Team AmitKK</p>
    `
    let transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai@2203',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
    let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.pujarambh.com", html: mailBody }
    transporter.sendMail( mailOptions, (error, info)=>{
        res.send({ success: true, message: "Please check your mail" })
    })
}
  
export function logError(e){
    sendMailOnError(e)
    printError(e)
}

export function printError(mesg){ console.log('mesg', mesg) }