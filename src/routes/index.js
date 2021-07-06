import express from "express";
import React from "react";
import { renderToString } from "react-dom/server"
import "regenerator-runtime/runtime.js"
var crypto = require('crypto');
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
import PrivacyPolicy from "../pages/index/PrivacyPolicy"
import Terms from "../pages/index/Terms"
import About from "../pages/index/About"
import Astrology from "../pages/index/Astrology"
import ProductCategory from "../pages/index/ProductCategory"
import ProdCatItems from "../pages/index/ProdCatItems"

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
import AdminCoupon from "../pages/admin/AdminCoupon"
import RefSchema from "../pages/admin/RefSchema"
import RefSitemap from "../pages/admin/RefSitemap"

import UserAdmin from "../pages/user/UserAdmin"

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

router.get('/', asyncMiddleware( async(req, res, next) => {
  const meta = await func.getMeta(req.url, 'page')
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

router.get('/product/:url', asyncMiddleware( async (req, res, next) => { 
  const meta = await func.getMeta(req.url, 'product')
  let sql =    `SELECT a.id, a.vendor as vendorId, a.name, a.type, a.images, a.url, a.images, a.category, a.shortDesc, a.longDesc, a.price, a.sale, a.status, a.rating, a.inclusion, a.exclusion, a.recom, a.related, b.name as VendorName, b.tab1 as vendor
                FROM products as a
                left join basic as b on b.id = a.vendor WHERE a.url = '${req.params.url}';`
    pool.query(sql, async(err, results) => {
        try{    
            if(err){ throw err }
            if(results.length){
                const catProducts   = await func.similarCatProducts(JSON.parse(results[0].category), results[0].id )
                const incList       = await func.productIncName(JSON.parse(results[0].inclusion))
                const excList       = await func.productExcName(JSON.parse(results[0].exclusion))
                const recomList     = await func.productRecomName(JSON.parse(results[0].recom))
                const relatedList   = await func.productRelatedName(JSON.parse(results[0].related))
                const reviewList    = await func.productReview(JSON.parse( results[0].id ))
                res.status(200).render('pages/Product', { reactApp: renderToString(<Product product={results[0]} incList={incList} catProducts={catProducts} excList={excList} recomList={recomList} relatedList={relatedList} reviewList={reviewList} />), meta: meta })
            }else{ res.redirect('/shop'); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/product-category', asyncMiddleware( async (req, res, next) => { 
  const meta = await func.getMeta(req.url, 'page')
  let sql =    `SELECT name, tab1 from basic where type = 'Category';`
    pool.query(sql, async(err, results) => {
        try{    
            if(err){ throw err }
            if(results.length){
              res.status(200).render('pages/ProductCategory', { reactApp: renderToString(<ProductCategory category={results} />), meta: meta })
            }else{ res.redirect('/shop'); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/fetchProductCategory', asyncMiddleware( async (req, res, next) => {
  let sql =    `SELECT name, tab1 from basic where type = 'Category';`
  pool.query(sql, (err, results) => {
    try{
      if(err){ throw err }
      if(results){ res.send({ data: results }); }
    }catch(e){ func.logError(e); res.status(500); return; }
  })
}))

router.get('/product-category/:url', asyncMiddleware( async (req, res, next) => { 
  const meta = await func.getMeta(req.url, 'page')
  let sql =    ` SELECT id FROM basic WHERE tab1 = '${req.params.url}';`
    pool.query(sql, async(err, results) => {
        try{    
            if(err){ throw err }
            if(results.length){
              const products = await func.getProductsOfCat(results[0].id)
              res.status(200).render('pages/ProdCatItems', { reactApp: renderToString(<ProdCatItems products={products}/>), meta: meta })
            }else{ res.redirect('/shop'); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/fetchProdCatItems/:url', asyncMiddleware( async (req, res, next) => {
  let sql =    ` SELECT id, name FROM basic WHERE tab1 = '${req.params.url}';`
  pool.query(sql, async(err, results) => {
    try{
      if(err){ throw err }
      if(results){ 
        const data = await func.getProductsOfCat(results[0].id)
        res.send({ data: data, name: results[0].name }); 
      }
    }catch(e){ func.logError(e); res.status(500); return; }
  })
}))
// // Auth Pages
  router.get('/sign-up', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Auth', { reactApp: renderToString(<Auth/>), meta: meta }) }))
  router.get('/reset-password/:token', asyncMiddleware( async(req, res, next) => { res.status(200).render('pages/Auth', { reactApp: renderToString(<Auth/>), meta: [] }) }))
// // Auth Pages

//Blog Pages
  router.get('/category/:url', asyncMiddleware( async(req, res, next) => {
    const meta = await func.getMeta(`/category/${req.params.url}`, 'page')
    var sql = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}' AND type='category'`;
    pool.query(sql, (err, results) => {
      try{
        if(err) throw err;
        if(results){
          if(results[0]){
            var sql2 = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs WHERE JSON_CONTAINS(category, '${results[0].id}') = 1 ORDER BY id DESC`;
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
    const meta = await func.getMeta(`/tag/${req.params.url}`, 'page')
    var sql1 = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}'`;
    pool.query(sql1, (err, results) => {
      try{
        if(err) throw err;
        if(results[0]){
          var sql2 = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs WHERE JSON_CONTAINS(tag, '${results[0].id}') = 1 ORDER BY id DESC`;
          pool.query(sql2, (err, results2) => {
            if(err) throw err;
            var title = `<h1 class="heading"><span>Blogs of Tag:</span>${results[0].name}</h1>`
            const reactComp = renderToString(  <Blog blogs={results2} title={title}/> )
            res.status(200).render('blog/Blog', { reactApp: reactComp, meta: meta })
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
      }catch(e){ func.logError(e); res.status(403); return; }
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
          <p>We will reach back to you on priority.</p><br/>
          <p>Warm Regards</p>
          <p>Team Pujarambh</p>
          `
        let mailOptions = { to: req.body.email, from: '"AmitKK"<amit@amitkk.com>', cc: "amit.khare588@gmail.com", subject: "Form filled on website ✔ www.pujarambh.com", html: mailBody }
        transporter.sendMail( mailOptions, (error, info)=>{
          if(error){ func.printError(err) }
          func.printError("Message sent: %s")
        });
        res.send({ success: true, message: "Mail Sent" }); 
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  })

  router.post('/astroForm', (req, res, next) => {
    let post= {
        "name":             req.body.name,
        "email":            req.body.email,
        "phone":            req.body.phone,
        "gender":           req.body.gender,
        "dob":              req.body.dob,
        "tob":              req.body.tob,
        "place":            req.body.place,
        "created_at":       time,
        "updated_at":       time,
    }
    let sql = 'INSERT INTO astrology SET ?'
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
            <li>Gender: ${req.body.gender}</li>
            <li>Date of Birth: ${req.body.dob}</li>
            <li>Time of Birth: ${req.body.tob}</li>
            <li>Place of Birth: ${req.body.place}</li>
          </ul>
          <p>We will reach back to you on priority.</p><br/>
          <p>Warm Regards</p>
          <p>Team Pujarambh</p>
          `
        let mailOptions = { to: req.body.email, from: '"AmitKK"<amit@amitkk.com>', cc: "amit.khare588@gmail.com", subject: "Form filled on website ✔ www.pujarambh.com", html: mailBody }
        transporter.sendMail( mailOptions, (error, info)=>{
          if(error){ func.printError(err) }
          func.printError("Message sent: %s")
        });
        res.send({ success: true, message: "Mail Sent" }); 
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  })

  router.post('/askQuestion', (req, res, next) => {
    let post= {
        "name":         req.body.name,
        "email":        req.body.email,
        "phone":        req.body.phone,
        "question":     req.body.question,
        "product":      req.body.prodId,
        "created_at":   time,
    }
    let sql = 'INSERT INTO question SET ?'
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
            <li>Product: <a href="https://pujarambh.com/product/${req.body.prodUrl}">${req.body.prodName}</a></li>
            <li>Question: ${req.body.question}</li>
          </ul>
          <p>We will reach back to you on priority. If anything urgent, you can call me on +91-84240 03840 / +91-93548 11331</p><br/>
          <p>Warm Regards</p>
          <p>Amit Kumar Khare</p>
          <a href="https://www.linkedin.com/in/amitkhare588/"><p>Connect on Linkedin</p></a>
          `
        let mailOptions = { to: req.body.email, from: '"AmitKK"<amit@amitkk.com>', cc: "amit.khare588@gmail.com", subject: "Form filled on website ✔ www.pujarambh.com", html: mailBody }
        transporter.sendMail( mailOptions, (error, info)=>{
          if(error){ func.printError(err) }
          func.printError("Message sent: %s")
        });
        res.send({ success: true, message: "Mail Sent" }); 
      }catch(e){ func.logError(e); res.status(403); return; }
    })
  })

  router.get('/blog', asyncMiddleware( async(req, res, next) => {
    const meta = await func.getMeta(req.url, 'page')
    let sql = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs ORDER BY id DESC`;
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
      var sql = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs ORDER BY id DESC`;
      var title = `<h1 class="heading"><span>Interesting Reads </span> For you</h1>`
      pool.query(sql, (err, results) => {
        try{
          if(err) throw err;
          res.send({ blogs: results, title: title });   
        }catch(e){ func.logError(e); res.status(403); return; }
      });
    }

    if(req.params.type == "category" ){
        var sql1 = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}'`;
        pool.query(sql1, (err, results) => {
          try{
            if(err) throw err;
            var sql2 = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs WHERE JSON_CONTAINS(category, '${results[0].id}') = 1 ORDER BY id DESC`;
            pool.query(sql2, (err2, results2) => {
              try{
                if(err2) throw err2;
                var title = `<h1 class="heading"><span>Blogs of category: </span> ${results[0].name}</h1>`
                res.send({ blogs: results2, title: title });  
              }catch(e){ func.logError(e); res.status(403); return; }
            });
          }catch(e){ func.logError(e); res.status(403); return; }
        });
    }

    if(req.params.type == "tag"  ){
        var sql1 = `SELECT id, name FROM blog_metas WHERE url= '${req.params.url}'`;
        pool.query(sql1, (err, results) => {
          try{
            if(err) throw err;
            var sql2 = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs WHERE JSON_CONTAINS(tag, '${results[0].id}') = 1 ORDER BY id DESC`;
            pool.query(sql2, (err2, results2) => {
              try{
                if(err2) throw err2;
                var title = `<h1 class="heading"><span>Blogs of tag: </span> ${results[0].name}</h1>`
                res.send({ blogs: results2, title: title });  
              }catch(e){ func.logError(e); res.status(403); return; }
            });
          }catch(e){ func.logError(e); res.status(403); return; }
        });
    }
    
    if(req.params.type == "search"  ){
      var sql = `SELECT id, title, url, coverImg, smallImg, updated_at FROM blogs  WHERE title LIKE '%${req.params.url}%' OR content LIKE '%${req.params.url}%' ORDER BY id DESC`;
      pool.query(sql, (err, results) => {
        try{
          if(err) throw err;
          var title = `<h1 class="heading"><span>You searched for blogs containing : </span>${req.params.url}</h1>`
          res.send({ blogs: results, title: title });
        }catch(e){ func.logError(e); res.status(403); return; }
      });
    }
  }))

  router.get('/blog/single/:url', asyncMiddleware( async(req, res, next) => {
    const blogs = await func.suggestBlogs()
    let sql = `SELECT id, title, url, coverImg, smallImg, content, category, tag FROM blogs WHERE url = '${req.params.url}'`;
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
router.get('/404', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); const blogs = await func.suggestBlogs(); res.status(200).render('pages/FourOFour', { reactApp: renderToString(<FourOFour blogs={blogs} />), meta: meta }) }))
router.get('/about-us', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/About', { reactApp: renderToString(<About/>), meta: meta }) }))
router.get('/free-kundli', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Astrology', { reactApp: renderToString(<Astrology/>), meta: meta }) }))
router.get('/thank-you', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url, 'page'); const blogs = await func.suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: meta}) }))
router.get('/privacy-policy', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/PrivacyPolicy', { reactApp: renderToString( <PrivacyPolicy/> ), meta: meta}) }))
router.get('/terms-and-condition', asyncMiddleware( async(req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Terms', { reactApp: renderToString( <Terms/> ), meta: meta}) }))
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
  router.get('/admin/coupon', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/AdminCoupon', { reactApp: renderToString(<AdminCoupon/>), meta: [] }) }))
  router.get('/admin/refSchema', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/RefSchema', { reactApp: renderToString(<RefSchema/>), meta: [] }) }))
  router.get('/admin/refSitemap', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => { res.status(200).render('admin/RefSitemap', { reactApp: renderToString(<RefSitemap/>), meta: [] }) }))
  // // Admin Pages
  
  // User Pages
  router.get('/user/admin', [func.verifyToken, func.verifyUser], asyncMiddleware( async(req, res, next) => { res.status(200).render('user/UserAdmin', { reactApp: renderToString(<UserAdmin/>), meta: [] }) }))
  router.get('/user/user-admin', [func.verifyToken, func.verifyUser], asyncMiddleware( async(req, res, next) => { res.status(200).render('user/UserAdmin', { reactApp: renderToString(<UserAdmin/>), meta: [] }) }))

// User Pages

// Shopping
router.get('/shop', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/category/:cat', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/subcategory/:subcat', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/product-tag/:url', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Shop', { reactApp: renderToString(<Shop/>), meta: meta }) }))
router.get('/cart', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Cart', { reactApp: renderToString(<Cart/>), meta: meta }) }))
router.get('/payment-response', asyncMiddleware( async (req, res, next) => { const meta = await func.getMeta(req.url, 'page'); res.status(200).render('pages/Cart', { reactApp: renderToString(<Cart/>), meta: meta }) }))
// Shopping

router.get('/:url', asyncMiddleware( async(req, res, next) => {
  let sql = `SELECT * FROM blogs WHERE url = '${req.params.url}'`;
  const meta = await func.getMeta(req.url, 'blog')
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
          res.redirect('/shop');
        }
    }catch(e){ func.logError(e, req.url); res.status(403); return; }
  });
}))

// Payment Gateway
  router.post('/getHash',function(req, res, next){
    var postData = {
      "appId" : req.body.appId,
      "orderId" : req.body.orderId,
      "orderAmount" : req.body.orderAmount,
      "orderCurrency" : req.body.orderCurrency,
      "orderNote" : req.body.orderNote,
      'customerName' : req.body.customerName,
      "customerEmail" : req.body.customerEmail,
      "customerPhone" : req.body.customerPhone,
      "returnUrl" : req.body.returnUrl,
      // "notifyUrl" : req.body.notifyUrl
    },
    secretKey = req.body.secretKey,
    sortedkeys = Object.keys(postData),
    signatureData = "";
    sortedkeys.sort();
    for (var i = 0; i < sortedkeys.length; i++) {
      var k = sortedkeys[i];
      signatureData += k + postData[k];
    }
    var signature = crypto.createHmac('sha256',secretKey).update(signatureData).digest('base64');
      postData['signature'] = signature;
      res.send({ success: true, signature: signature });
  });

  router.post('/payment-response', asyncMiddleware( async(req, res, next) => { 
    if(req.body.txStatus =='SUCCESS'){
      const post ={
        orderId:              req.body.orderId,
        refId:                req.body.referenceId,
        invoice:              req.body.orderAmount,
        status:               1,
        "created_at":         time,
        "updated_at":         time,
      }
      let sql = `INSERT INTO orders SET ?`
      pool.query(sql, post, (err, results) => {
          try{
              if(err){ throw err }
              if(results){ res.redirect('/payment-response'); }
          }catch(e){ func.logError(e); res.status(500); return; }
      })
    }else{
      res.redirect('/cart');
    }
  }))

  router.post('/placeOrder', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id FROM orders WHERE orderId = '${req.body.orderId}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results.length){
              if(req.body.loggedIn){
                var account           = 'Exists'
                var buyer             = JSON.parse( req.body.user ).id
                var message           = "Order Placed Successfully"
                var name              = JSON.parse( req.body.user ).name
                var email             = JSON.parse( req.body.user ).email
                var user              = {}
                var password          = ''
              }else{
                var id                = await func.checkUser(JSON.parse(req.body.buyer)[0], JSON.parse(req.body.buyer)[1])
                var account           = 'Created'
                var buyer             = id[1]
                var message           = id[4]
                var name              = id[2].name
                var email             = id[2].email
                var user              = id[2]
                var password          = id[3]
              }
              let post= {
                  'buyer':                buyer,
                  'address':              req.body.address,
                  'cart':                 req.body.cart,
                  'status':               'Ordered',
                  'discount':             req.body.disAmount,
                  "updated_at":           time
              }
              let sql2 = `UPDATE orders SET ? WHERE orderId = '${req.body.orderId}'`
              pool.query(sql2, post, async(err2, results2) => {
                try{
                    if(err2){ throw err2 }
                    if(results2){
                      if(!req.body.loggedIn){
                        jwt.sign({ user }, 'secretkey', (err, token)=>{
                          if(err) throw err;
                          if(token){
                            user.token = token
                            res.cookie('token', token)
                          }
                        })
                      }
                      await func.mailOrder( req.body.loggedIn, name, email, password, req.body.cart )
                      if(req.body.discount){
                        await func.updateCouponApplied( buyer, req.body.orderId, req.body.discount )
                      }
                      res.send({ 
                          success:    true,
                          account:    account,
                          user:       user,
                          message:    message
                      })
                    }
                }catch(e){ func.logError(e); res.status(500); return; }
              })
            }else{
              res.send({ 
                success:    false,
                message:    "Order Not complete"
              })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
      });
  }))
// Payment Gateway

export default router;