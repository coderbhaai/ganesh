import express from "express";
import React from "react";
import { renderToString } from "react-dom/server"
import "regenerator-runtime/runtime.js"

import { decode } from "jsonwebtoken"

const jwt = require('jsonwebtoken')
const router = express.Router()
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

var pool = require('./mysqlConnector');

router.use('/auth', require('./auth'))
router.use('/admin', require('./admin'))

const asyncMiddleware = require('./asyncMiddleware');
const func = require('./functions')

import Index from "../pages/index/Index"
import Contact from "../pages/index/Contact"
import Shop from "../pages/index/Shop"
import Product from "../pages/index/Product"
import Cart from "../pages/index/Cart"
import ThankYou from "../pages/index/ThankYou"
import FourOFour from "../pages/index/FourOFour"


import Auth from "../pages/index/Auth"
// import Register from "../pages/auth/Register"
// import Login from "../pages/auth/Login"
// import ForgotPassword from "../pages/auth/ForgotPassword"
// import ResetPassword from "../pages/auth/ResetPassword"

import Blog from "../pages/blog/Blog"
import Single from "../pages/blog/Single"

import AdminUser from "../pages/admin/User"
import AdminContacts from "../pages/admin/AdminContacts"
import AdminBlogMeta from "../pages/admin/AdminBlogMeta"
import AdminBlogs from "../pages/admin/AdminBlogs"
import AddBlog from "../pages/admin/AddBlog"
import UpdateBlog from "../pages/admin/UpdateBlog"
import AdminMeta from "../pages/admin/Meta"
import AdminComments from "../pages/admin/AdminComments"
import AdminBasics from "../pages/admin/Basic"
import AdminOrders from "../pages/admin/AdminOrders"
import Products from "../pages/admin/Products"
import AddProduct from "../pages/admin/AddProduct"
import EditProduct from "../pages/admin/EditProduct"

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

router.get('/', asyncMiddleware( async(req, res, next) => {
  const meta = await func.getMeta(req.url)
  const blogs     =   await func.suggestBlogs()
  const products  =   await func.suggestProducts()
  const reactComp = renderToString( <Index blog={blogs} products={products} meta={meta}/> )
  res.status(200).render('pages/Index', { reactApp: reactComp, meta: meta })
}))

router.get('/getHomeData', asyncMiddleware( async(req, res) => {
  const blogs     =   await func.suggestBlogs()
  const products  =   await func.suggestProducts()
  res.send({ 
    blogs:            blogs,
    products:         products
  })
}))

// // Auth Pages
  router.get('/sign-up', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Auth', { reactApp: renderToString(<Auth/>), meta: meta }) }))
  // router.get('/register', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('auth/Register', { reactApp: renderToString(<Register />), meta: meta }) }))
  // router.get('/login', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('auth/Login', { reactApp: renderToString(<Login />), meta: meta }) }))
  // router.get('/forgot-password', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('auth/ForgotPassword', { reactApp: renderToString(<ForgotPassword />), meta: meta }) }))
  // router.get('/reset-password/:token', asyncMiddleware( async(req, res, next) => { res.status(200).render('auth/ResetPassword', { reactApp: renderToString(<ResetPassword/>), meta: [] }) }))
// // Auth Pages

//Blog Pages
  router.get('/category/:url', asyncMiddleware( async(req, res, next) => {
    const meta = await func.getMeta(`/category/${req.params.url}`)
    var sql = `SELECT id FROM blog_metas WHERE url= '${req.params.url}' AND type='category'`;
    pool.query(sql, (err, results) => {
      try{
        if(err) throw err;
        if(results){
          if(results[0]){
            var sql2 = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE category LIKE '%${results[0].id}%' ORDER BY id DESC`;
            pool.query(sql2, (err2, results2) => {
                if(err2) throw err2;
                var title = `<h1 class="heading"><span>Blogs of Category:</span>${results[0].name}</h1>`
                const reactComp = renderToString(  <Blog blogs={results2} title={title}/>  )
                res.status(200).render('blog/Blog', { reactApp: reactComp, meta: meta, blogs: results2 })
            });        
          }else{ res.redirect('/blog'); } }
      }catch(e){ func.logError(e); res.status(403); return; }
    });
  }))

  router.get('/tag/:url', asyncMiddleware( async(req, res, next) => {
    const meta = await func.getMeta(`/tag/${req.params.url}`)
    var sql1 = `SELECT name FROM blog_metas WHERE url= '${req.params.url}'`;
    pool.query(sql1, (err, results) => {
      try{
        if(err) throw err;
        if(results[0]){
          var sql2 = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE tag LIKE '%${results[0].name}%' ORDER BY id DESC`;
          pool.query(sql2, (err, results2) => {
            if(err) throw err;
            var title = `<h1 class="heading"><span>Blogs of Tag:</span>${results[0].name}</h1>`
            const reactComp = renderToString(  <Blog blogs={results2} title={title}/> )
            res.status(200).render('blog/Blog', { reactApp: reactComp, meta: meta, blogs: results2 })
          });
        }else{
          res.redirect('/404');
        }
      }catch(e){ func.logError(e, req.url); res.status(403); return; }
    });
  }))

  router.get('/search/:url', asyncMiddleware( async(req, res, next) => {
    var sql = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE title LIKE '%${req.params.url}%' OR content LIKE '%${req.params.url}%' ORDER BY id DESC`;
    pool.query(sql, (err, results) => {
      try{
        if(err) throw err;
        const reactComp = renderToString(  <Blog blogs={results}/>  )
        res.status(200).render('blog/Blog', { reactApp: reactComp, meta: [] })
      }catch(e){ func.logError(e, req.url); res.status(403); return; }
    });
  }))

  router.get('/sidebar', asyncMiddleware( async (req, res, next) => {
    let sql = `SELECT title, url FROM blogs ORDER BY id DESC; SELECT name, url FROM blog_metas WHERE type = 'category'; SELECT name, url FROM blog_metas WHERE type = 'tag'`
    pool.query(sql, [1, 2, 3], (err, results) => {
      try{
        if(err) throw err;
        res.send({ blogList: results[0], cats: results[1], tags: results[2] })
      }catch(e){
        logError(e, req.url)
        res.status(403);
        return;
      }
    })
  }))

  router.get('/suggest', asyncMiddleware( async (req, res, next) => {
    let sql = `SELECT title, url, coverImg, created_at FROM blogs ORDER BY id DESC LIMIT 6`
    pool.query(sql, (err, results) => {
      try{
        if(err) throw err;
        res.send({ blogs: results });
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  }))

  router.post('/contactForm', (req, res, next) => {
    let post= {
        "name":         req.body.name,
        "email":        req.body.email,
        "phone":        req.body.phone,
        "message":      req.body.message,
        "created_at":   time,
        "updated_at":   time,
    }
    let sql = 'INSERT INTO contact_forms SET ?'
    pool.query(sql, post, (err, results) => {
      try{
        if(err) throw err;
        const mailBody =`
          <h2><strong>Dear ${req.body.name}</strong></h2>
          <p>Thanks for connecting with us.</p>
          <p>The details provided by you are:</p>
          <ul>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Message: ${req.body.message}</li>
          </ul>
          <p>We will reach back to you on priority. If anything urgent, you can call me on +91-84240 03840 / +91-93548 11331</p><br/>
          <p>Warm Regards</p>
          <p>Amit Kumar Khare</p>
          <a href="https://www.linkedin.com/in/amitkhare588/"><p>Connect on Linkedin</p></a>
          `
        let mailOptions = { to: req.body.email, from: '"AmitKK"<amit@amitkk.com>', cc: "amit.khare588@gmail.com", subject: "Form filled on website ✔ www.amitkk.com", html: mailBody }
        transporter.sendMail( mailOptions, (error, info)=>{
          if(error){ func.printError(err) }
          func.printError("Message sent: %s")
        });
        res.send({ success: true, message: "Mail Sent" }); 
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  })

  router.get('/blog', asyncMiddleware( async(req, res, next) => {
    const meta = await func.getMeta(req.url)
    let sql = `SELECT id, title, url, coverImg, updated_at FROM blogs ORDER BY id DESC`;
    pool.query(sql, (err, rows) => {
      try{
        if(err) throw(err);
        var title = `<h1 class="heading"><span>Interesting Reads </span> For you</h1>`
        const reactComp = renderToString( <Blog blogs={rows} title={title}/> )
        res.status(200).render('blog/Blog', { reactApp: reactComp, meta: meta })
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  }))

  router.get('/blog/list/:type/:url', asyncMiddleware( async(req, res, next) => {
    if(req.params.type == "All"){ 
      var sql = `SELECT id, title, url, coverImg, updated_at FROM blogs ORDER BY id DESC`;
      var title = `<h1 class="heading"><span>Interesting Reads </span> For you</h1>`
      pool.query(sql, (err, results) => {
        try{
          if(err) throw err;
          res.send({ blogs: results, title: title });   
        }catch(e){
          logError(e, req.url)
          res.status(403);
          return;
        }
      });
    }

    if(req.params.type == "category" ){
        var sql1 = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}'`;
        pool.query(sql1, (err, results) => {
          try{
            if(err) throw err;
            var sql2 = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE category LIKE '%${results[0].id}%' ORDER BY id DESC`;
            pool.query(sql2, (err, results2) => {
              try{
                if(err) throw err;
                var title = `<h1 class="heading"><span>Blogs of category: </span> ${results[0].name}</h1>`
                res.send({ blogs: results2, title: title });  
              }catch(e){
                logError(e, req.url)
                res.status(403);
                return;
              } 
            });
          }catch(e){
            logError(e, req.url)
            res.status(403);
            return;
          }
        });
    }

    if(req.params.type == "tag"  ){
        var sql1 = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}'`;
        pool.query(sql1, (err, results) => {
          try{
            if(err) throw err;
            var sql2 = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE tag LIKE '%${results[0].id}%' ORDER BY id DESC`;
            pool.query(sql2, (err, results2) => {
              try{
                if(err) throw err;
                var title = `<h1 class="heading"><span>Blogs of tag: </span> ${results[0].name}</h1>`
                res.send({ blogs: results2, title: title });  
              }catch(e){
                logError(e, req.url)
                res.status(403);
                return;
              } 
            });
          }catch(e){
            logError(e, req.url)
            res.status(403);
            return;
          }
        });
    }

    if(req.params.type == "search"  ){
      var sql = `SELECT id, title, url, coverImg, updated_at FROM blogs  WHERE title LIKE '%${req.params.url}%' OR content LIKE '%${req.params.url}%' ORDER BY id DESC`;
      pool.query(sql, (err, results) => {
        try{
          if(err) throw err;
          var title = `<h1 class="heading"><span>You searched for blogs containing : </span>${req.params.url}</h1>`
          res.send({ blogs: results, title: title });
        }catch(e){
          logError(e, req.url)
          res.status(403);
          return;
        }
      });
    }
  }))

  router.get('/blog/single/:url', asyncMiddleware( async(req, res, next) => {
    const blogs = await func.suggestBlogs()
    let sql = `SELECT id, title, url, coverImg, content, category, tag FROM blogs WHERE url = '${req.params.url}'`;
    pool.query(sql, async(err, results) => {
      try{
        if(err) throw err;
        const sidebar = await func.blogMetaData(results[0].id)
        res.send({ 
          data:         results[0],
          blogs:        blogs,
          blogList:     sidebar[0],
          cats:         sidebar[1],
          tags:         sidebar[2],
          comments:     sidebar[3],
          response:     sidebar[4],
        });
      }catch(e){ func.logError(e, req.url); res.status(403); return; }
    });
  }))
//Blog Pages
// // Regular Pages 
router.get('/404', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); const blogs = await func.suggestBlogs(); res.status(200).render('pages/FourOFour', { reactApp: renderToString(<FourOFour blogs={blogs} />), meta: meta }) }))
// router.get('/clients', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta('/clients','page'); const blogs = await func.suggestBlogs(); res.status(200).render('pages/Clients', { reactApp: renderToString( <Clients blogs={blogs}/> ), meta: meta}) }))
// router.get('/contact', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta('/contact','page'); const blogs = await func.suggestBlogs(); res.status(200).render('pages/Contact', { reactApp: renderToString( <Contact blogs={blogs}/> ), meta: meta}) }))
router.get('/thank-you', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); const blogs = await func.suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: meta}) }))
router.get('/privacy-policy', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); const blogs = await func.suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: meta}) }))
router.get('/terms-and-condition', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url); const blogs = await func.suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: meta}) }))
// // Regular Pages 

// // Admin Pages 
  router.get('/admin',[func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/User', { reactApp: renderToString(<AdminUser/>), meta: [] }) }))
  router.get('/admin/users',[func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/User', { reactApp: renderToString(<AdminUser/>), meta: [] }) }))
  router.get('/admin/meta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/Meta', { reactApp: renderToString(<AdminMeta/>), meta: [] }) }))
  router.get('/admin/blogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminBlogMeta', { reactApp: renderToString(<AdminBlogMeta/>), meta: [] }) }))
  router.get('/admin/blogs', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminBlogs', { reactApp: renderToString(<AdminBlogs/>), meta: [] }) }))
  router.get('/admin/addBlog', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AddBlog', { reactApp: renderToString(<AddBlog/>), meta: [] }) }))
  router.get('/admin/updateBlog/:id', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/UpdateBlog', { reactApp: renderToString(<UpdateBlog/>), meta: [] }) }))
  router.get('/admin/contacts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminContacts', { reactApp: renderToString(<AdminContacts/>), meta: [] }) }))
  router.get('/admin/comments', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminComments', { reactApp: renderToString(<AdminComments/>), meta: [] }) }))
  router.get('/admin/basics', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminBasics', { reactApp: renderToString(<AdminBasics/>), meta: [] }) }))
  router.get('/admin/adminOrders', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminOrders', { reactApp: renderToString(<AdminOrders/>), meta: [] }) }))
  router.get('/admin/adminProducts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/Products', { reactApp: renderToString(<Products/>), meta: [] }) }))
  router.get('/admin/addProduct', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AddProduct', { reactApp: renderToString(<AddProduct/>), meta: [] }) }))
  router.get('/admin/editProduct/:id', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/EditProduct', { reactApp: renderToString(<EditProduct/>), meta: [] }) }))
// // Admin Pages

// Shopping
router.get('/shop', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/category/:cat', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/subcategory/:subcat', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/product/:url', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Product', { reactApp: renderToString(<Product/>), meta: meta }) }))
router.get('/product-tag/:url', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/cart', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url); res.status(200).render('pages/Cart', { reactApp: renderToString(<Cart/>), meta: meta }) }))
// Shopping

router.get('/:url', asyncMiddleware( async(req, res, next) => {
  let sql = `SELECT * FROM blogs WHERE url = '${req.params.url}'`;
  const meta = await func.getMeta(req.url)
  const blogs = await func.suggestBlogs()
  pool.query(sql, async(err, results) => {
    try{
      if(err) throw err;
      if(results[0]){
          const sidebar = await func.blogMetaData(results[0].id)
          const reactComp = renderToString(<Single 
            data=         {results[0]} 
            blogs=        {blogs}
            blogList=     {sidebar[0]}
            cats=         {sidebar[1]}
            tags=         {sidebar[2]}
            comments=     {sidebar[3]}
            response=     {sidebar[4]}
          />)
          res.status(200).render('blog/Single', { reactApp: reactComp, meta: meta })
        }else{
          res.redirect('/404');
        }
    }catch(e){ func.logError(e, req.url); res.status(403); return; }
  });
}))

export default router;