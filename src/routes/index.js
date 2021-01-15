import express from "express";
import React from "react";
import { renderToString } from "react-dom/server"
import "regenerator-runtime/runtime.js"
import Index from "../pages/index/Index"
import Career from "../pages/index/Career"
import Clients from "../pages/index/Clients"
import Contact from "../pages/index/Contact"
import GraphicsDesign from "../pages/index/GraphicsDesign"
import GraphicsPortfolio from "../pages/index/GraphicsPortfolio"
import LaravelDeveloper from "../pages/index/LaravelDeveloper"
import ReactDeveloper from "../pages/index/ReactDeveloper"
import Sitemap from "../pages/index/Sitemap"
import WebPortfolio from "../pages/index/WebPortfolio"
import WebsiteDevelopment from "../pages/index/WebsiteDevelopment"
import WordpressDeveloper from "../pages/index/WordpressDeveloper"
import ThankYou from "../pages/index/ThankYou"
import FourOFour from "../pages/index/FourOFour"
import ContentWriting from "../pages/index/ContentWriting"
import SEO from "../pages/index/SEO"
import SMM from "../pages/index/SMM"
import OfflineMarketing from "../pages/index/OfflineMarketing"
import GuestBlogging from "../pages/index/GuestBlogging"
import DigitalMarketing from "../pages/index/DigitalMarketing"
import AboutUs from "../pages/index/AboutUs"
import AppDev from "../pages/index/AppDev"
import LeadGeneration from "../pages/index/LeadGeneration"

import Blog from "../pages/blog/Blog"
import Single from "../pages/blog/Single"

// import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ResetPassword from "../pages/auth/ResetPassword"

import AdminUsers from "../pages/admin/AdminUsers"
import AdminBlogMeta from "../pages/admin/AdminBlogMeta"
import AdminBlogs from "../pages/admin/AdminBlogs"
import AdminComments from "../pages/admin/AdminComments"
import AdminLead from "../pages/admin/AdminLead"
import AdminMeta from "../pages/admin/AdminMeta"
import RefSchema from "../pages/admin/RefSchema"

import { decode } from "jsonwebtoken"

const jwt = require('jsonwebtoken')
const router = express.Router()
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

var bodyParser = require('body-parser')

router.use(bodyParser.json())

var cookieParser = require('cookie-parser')
router.use(cookieParser())

router.use(bodyParser.urlencoded({ extended: true }))
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector');

router.use('/auth', require('./auth'))
router.use('/admin', require('./admin'))

const asyncMiddleware = require('./asyncMiddleware');

router.get('/', asyncMiddleware( async(req, res, next) => {
  const meta = await getMeta('/')
  const blogs = await suggestBlogs()
  const reactComp = renderToString( <Index blogs={blogs} /> )
  res.status(200).render('pages/Index', { reactApp: reactComp, meta: meta})
}))

router.get('/register', asyncMiddleware( async(req, res, next) => { const blogs = await suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: [] }) }))

// router.get('/register', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/Register', { reactApp: renderToString(<Register/>), meta: [] }) }))

router.get('/category/:url', asyncMiddleware( async(req, res, next) => {
  const meta = await getMeta(`/category/${req.params.url}`)
  var sql = `SELECT name FROM blog_metas WHERE url= '${req.params.url}'`;
  pool.query(sql, (err, results) => {
    try{
      if(results){ 
        if(results[0]){
          var sql2 = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE category LIKE '%${results[0].name}%' ORDER BY id DESC`;
          pool.query(sql2, (err2, results2) => {
              if(err) throw err;
              var title = `<h1 class="heading"><span>Blogs of Category:</span>${results[0].name}</h1>`
              const reactComp = renderToString(  <Blog blogs={results2} title={title}/>  )
              res.status(200).render('pages/Blog', { reactApp: reactComp, meta: meta, blogs: results2 })
          });        
        }else{ res.redirect('/404'); } }
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  });
}))

router.get('/tag/:url', asyncMiddleware( async(req, res, next) => {
  const meta = await getMeta(`/tag/${req.params.url}`)
  var sql1 = `SELECT name FROM blog_metas WHERE url= '${req.params.url}'`;
  pool.query(sql1, (err, results) => {
    try{
      if(err) throw err;
      if(results[0]){
        var sql2 = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE tag LIKE '%${results[0].name}%' ORDER BY id DESC`;
        pool.query(sql2, (err, results2) => {
          if(err) throw err;
          var title = `<h1 class="heading"><span>Blogs of Tag:</span>${results[0].name}</h1>`
          const reactComp = renderToString(  <Blog blogs={results2} title={title}/> )
          res.status(200).render('pages/Blog', { reactApp: reactComp, meta: meta, blogs: results2 })
        });
      }else{
        res.redirect('/404');
      }
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  });
}))

router.get('/search/:url', asyncMiddleware( async(req, res, next) => {
  var sql = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE title LIKE '%${req.params.url}%' OR content LIKE '%${req.params.url}%' ORDER BY id DESC`;
  pool.query(sql, (err, results) => {
    try{
      if(err) throw err;
      const reactComp = renderToString(  <Blog blogs={results}/>  )
      res.status(200).render('pages/Blog', { reactApp: reactComp, meta: [] })
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
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
  let sql = 'SELECT `title`, `url`, `cover_img`, `created_at` FROM blogs ORDER BY id DESC LIMIT 6'
  pool.query(sql, (err, results) => {
    try{
      if(err) throw err;
      res.send({ blogs: results });
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  })
}))

router.post('/contactForm', (req, res, next) => {
  let post= {
      "name":         req.body.name,
      "email":        req.body.email,
      "phone":        req.body.phone,
      "message":      req.body.message,
      "_token":       '22',
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
      let transporter = nodemailer.createTransport({ host: "sg3plcpnl0076.prod.sin3.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai588' }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
      let mailOptions = { to: req.body.email, from: '"AmitKK"<amit@amitkk.com>', cc: "amit.khare588@gmail.com", subject: "Form filled on website ✔ www.amitkk.com", html: mailBody }
      transporter.sendMail( mailOptions, (error, info)=>{
        if(error){ return console.log(error)}
        console.log("Message sent: %s");
      });
      // res.redirect('/thank-you');
      res.send({ success: true, message: "Mail Sent" }); 
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  })
})

router.get('/blog', asyncMiddleware( async(req, res, next) => {
  const meta = await getMeta('/blog')
  let sql = 'SELECT `id`, `title`, `url`, `cover_img`, `updated_at` FROM blogs ORDER BY id DESC';
  pool.query(sql, (err, rows) => {
    try{
      if(err) reject(err);
      var title = `<h1 class="heading"><span>Interesting Reads </span> For you</h1>`
      const reactComp = renderToString( <Blog blogs={rows} title={title}/> )
      res.status(200).render('pages/Blog', { reactApp: reactComp, meta: meta })
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  })
}))

router.get('/blog/list/:type/:url', asyncMiddleware( async(req, res, next) => {
  if(req.params.type == "All"){ 
    var sql = 'SELECT `id`, `title`, `url`, `cover_img`, `updated_at` FROM blogs ORDER BY id DESC';
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
      var sql1 = `SELECT name FROM blog_metas WHERE url= '${req.params.url}'`;
      pool.query(sql1, (err, results) => {
        try{
          if(err) throw err;
          var sql2 = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE category LIKE '%${results[0].name}%' ORDER BY id DESC`;
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
      var sql1 = `SELECT name FROM blog_metas WHERE url= '${req.params.url}'`;
      pool.query(sql1, (err, results) => {
        try{
          if(err) throw err;
          var sql2 = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE tag LIKE '%${results[0].name}%' ORDER BY id DESC`;
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
    var sql = `SELECT id, title, url, cover_img, updated_at FROM blogs  WHERE title LIKE '%${req.params.url}%' OR content LIKE '%${req.params.url}%' ORDER BY id DESC`;
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
  const blogs = await suggestBlogs()
  let sql = `SELECT id, title, url, cover_img, content, category, tag FROM blogs WHERE url = '${req.params.url}'`;
  pool.query(sql, async(err, results) => {
    try{
      if(err) throw err;
      const sidebar = await blogMetaData(results[0].id)
      res.send({ 
        data:         results[0],
        blogs:        blogs,
        blogList:     sidebar[0],
        cats:         sidebar[1],
        tags:         sidebar[2],
        comments:     sidebar[3],
        response:     sidebar[4],
      });
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  });
}))

router.get('/login', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/Login', { reactApp: renderToString(<Login/>), meta: [] }) }))
router.get('/forgotPassword', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/ForgotPassword', { reactApp: renderToString(<ForgotPassword/>), meta: [] }) }))
router.get('/resetPassword/:id', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/ResetPassword', { reactApp: renderToString(<ResetPassword/>), meta: [] }) }))
router.get('/404', asyncMiddleware( async (req, res, next) => { const meta = await getMeta('/404','page'); const blogs = await suggestBlogs(); res.status(200).render('pages/FourOFour', { reactApp: renderToString(<FourOFour blogs={blogs} />), meta: meta }) }))
router.get('/clients', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/clients','page'); const blogs = await suggestBlogs(); res.status(200).render('pages/Clients', { reactApp: renderToString( <Clients blogs={blogs}/> ), meta: meta}) }))
router.get('/contact', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/contact','page'); const blogs = await suggestBlogs(); res.status(200).render('pages/Contact', { reactApp: renderToString( <Contact blogs={blogs}/> ), meta: meta}) }))
router.get('/thank-you', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/thank-you','page'); const blogs = await suggestBlogs(); res.status(200).render('pages/ThankYou', { reactApp: renderToString( <ThankYou blogs={blogs}/> ), meta: meta}) }))
router.get('/career-in-digital-marketing', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/career-in-digital-marketing','page'); res.status(200).render('pages/Career', { reactApp: renderToString( <Career/> ), meta: meta}) }))
router.get('/laravel-development-company', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/laravel-development-company','page'); res.status(200).render('pages/LaravelDeveloper', { reactApp: renderToString(  <LaravelDeveloper/> ), meta: meta}) }))
router.get('/react-development-company', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/react-development-company','page'); res.status(200).render('pages/ReactDeveloper', { reactApp: renderToString( <ReactDeveloper/> ), meta: meta}) }))
router.get('/content-writing-services', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/content-writing-services','page'); res.status(200).render('pages/ContentWriting', { reactApp: renderToString( <ContentWriting/> ), meta: meta}) }))
router.get('/seo-services', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/seo-services','page');res.status(200).render('pages/SEO', { reactApp: renderToString( <SEO/> ), meta: meta}) }))
router.get('/social-media-marketing-services', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/social-media-marketing-services','page'); res.status(200).render('pages/SMM', { reactApp: renderToString( <SMM/> ), meta: meta}) }))
router.get('/offline-marketing-agency', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/offline-marketing-agency','page'); res.status(200).render('pages/OfflineMarketing', { reactApp: renderToString( <OfflineMarketing/> ), meta: meta}) }))
router.get('/sitemap', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/sitemap','page'); res.status(200).render('pages/Sitemap', { reactApp: renderToString( <Sitemap/> ), meta: meta}) }))
router.get('/website-development', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/website-development','page'); res.status(200).render('pages/WebsiteDevelopment', { reactApp: renderToString( <WebsiteDevelopment/> ), meta: meta}) }))
router.get('/wordpress-website-development', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/wordpress-website-development','page'); res.status(200).render('pages/WordpressDeveloper', { reactApp: renderToString( <WordpressDeveloper/> ), meta: meta}) }))
router.get('/graphics-designing', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/graphics-designing','page'); res.status(200).render('pages/GraphicsDesign', { reactApp: renderToString( <GraphicsDesign/> ), meta: meta}) }))
router.get('/web-portfolio', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/web-portfolio','page'); res.status(200).render('pages/WebPortfolio', { reactApp: renderToString( <WebPortfolio/> ), meta: meta}) }))
router.get('/graphics-portfolio', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/graphics-portfolio','page'); res.status(200).render('pages/GraphicsPortfolio', { reactApp: renderToString( <GraphicsPortfolio/> ), meta: meta}) }))
router.get('/submit-a-guest-post', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/submit-a-guest-post','page'); res.status(200).render('pages/GuestBlogging', { reactApp: renderToString( <GuestBlogging/> ), meta: meta}) }))
router.get('/digital-marketing', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/digital-marketing', 'page'); res.status(200).render('pages/DigitalMarketing', { reactApp: renderToString( <DigitalMarketing/> ), meta: meta}) }))
router.get('/about-us', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/about-us','page'); res.status(200).render('pages/AboutUs', { reactApp: renderToString( <AboutUs/> ), meta: meta}) }))
router.get('/mobile-app-development', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/mobile-app-development','page'); res.status(200).render('pages/AppDev', { reactApp: renderToString( <AppDev/> ), meta: meta}) }))
router.get('/lead-generation-services', asyncMiddleware( async(req, res, next) => { const meta = await getMeta('/lead-generation-services','page'); res.status(200).render('pages/LeadGeneration', { reactApp: renderToString( <LeadGeneration/> ), meta: meta}) }))

router.get('/adminUsers', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminUsers', { reactApp: renderToString(<AdminUsers/>), meta: [] }) }))
router.get('/adminLead', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminLead', { reactApp: renderToString(<AdminLead/>), meta: [] }) }))
router.get('/adminBlogMeta', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminBlogMeta', { reactApp: renderToString(<AdminBlogMeta/>), meta: [] }) }))
router.get('/adminBlogs', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminBlogs', { reactApp: renderToString(<AdminBlogs/>), meta: [] }) }))
router.get('/adminComments', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminComments', { reactApp: renderToString(<AdminComments/>), meta: [] }) }))
router.get('/adminMeta', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/AdminMeta', { reactApp: renderToString(<AdminMeta/>), meta: [] }) }))
router.get('/refSchema', [verifyToken, verifyAdmin], asyncMiddleware( async (req, res, next) => { res.status(200).render('admin/RefSchema', { reactApp: renderToString(<RefSchema/>), meta: [] }) }))

router.get('/:url', asyncMiddleware( async(req, res, next) => {
  let sql = `SELECT * FROM blogs WHERE url = '${req.params.url}'`;
  const meta = await getMeta(`/${req.params.url}`, 'single')
  const blogs = await suggestBlogs()
  pool.query(sql, async(err, results) => {
    try{
      if(err) throw err;
      if(results[0]){
          const sidebar = await blogMetaData(results[0].id)
          const reactComp = renderToString(<Single 
            data=         {results[0]} 
            blogs=        {blogs}
            blogList=     {sidebar[0]}
            cats=         {sidebar[1]}
            tags=         {sidebar[2]}
            comments=     {sidebar[3]}
            response=     {sidebar[4]}
          />)
          res.status(200).render('pages/Single', { reactApp: reactComp, meta: meta })
        }else{
          res.redirect('/404');
        }
    }catch(e){
      logError(e, req.url)
      res.status(403);
      return;
    }
  });
}))

function getMeta(url, type) {
  return new Promise((resolve, reject) => {
    let sql =   `SELECT title, description, keyword FROM metas WHERE url='${url}';
                SELECT title, description, keyword FROM metas WHERE url='default';
                SELECT cover_img FROM blogs WHERE url='${url.replace('/', "")}';
                SELECT name FROM blog_metas WHERE type='page' AND url='${url}'`
    pool.query(sql, [1,2,3,4], (err, rows) => {
      try{
        if(rows){
          if(rows[0].length){
            rows[0][0].url = url
            if(type =='single' && rows[2].length){ rows[0][0].image = '/images/blog/'+rows[2][0].cover_img }
            if(type =='page' && rows[3].length){ rows[0][0].image = '/images/static/'+rows[3][0].name }
            resolve(rows[0])
          }else if(rows[1].length){ 
            rows[1][0].url = url
            if(type =='single' && rows[2].length){ rows[1][0].image = '/images/blog/'+rows[2][0].cover_img }
            if(type =='page' && rows[3].length){ rows[1][0].image = '/images/static/'+rows[3][0].name }
            resolve(rows[1])
          }
        }
      }catch(e){
        logError(e, 'Function get Meta in Index')
        return;
      }
    });
  })
}

function suggestBlogs() {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT `title`, `url`, `cover_img`, `created_at` FROM blogs ORDER BY id DESC LIMIT 6'
    pool.query(sql, (err, rows) => {
      try{
        if(err) throw err;
        resolve(rows)
      }catch(e){
        logError(e, 'Function suggestBlogs in Index')
        return;
      }
    });
  });
}

function verifyToken(req, res, next){
  if(req.cookies.jwt){
    const bearerHeader = req.cookies.jwt
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
  }
}

function verifyAdmin(req, res, next){
  if(req.cookies.jwt){
    const bearerHeader = req.cookies.jwt
    try{
      const user = jwt.verify(bearerHeader,'secretkey')
        if (user.user.role!=='Admin'){
          res.redirect('/blog')
          res.end()
          return;
        }
        next();
      } catch(e){
        logError(e, 'Function verifyAdmin in Index')
        res.status(403);
        return;
      }
    }else{
      res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
    }
}

function blogMetaData(id) {
  return new Promise((resolve, reject) => {
      let sql =   `SELECT title, url FROM blogs ORDER BY id DESC;
                  SELECT name, url FROM blog_metas WHERE type = 'category';
                  SELECT name, url FROM blog_metas WHERE type = 'tag';
                  SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '0' ORDER BY id DESC;
                  SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '1' ORDER BY id ASC`
      pool.query(sql, [1, 2, 3, 4, 5], (err, results) => {
          try{
              if(results){ resolve(results ) }else if(err){ throw err }
          }catch(e){
              logError(e, 'Function blogMetaData in Index')
              res.status(500);
              return;
          }
      });
  });
}

function sendMailOnError(e, func) {
  const mailBody =`
      <h2><strong>Hi</h2>
      <p>There has been error in AmitKK. Please check if website is running or not.</p>
      <p>Then check the log</p>
      ${e}<br/>
      ${func}
      <p>Warm Regards</p>
      <p>Team AmitKK</p>
  `
  let transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai@2203',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
  let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.amitkk.com", html: mailBody }
  transporter.sendMail( mailOptions, (error, info)=>{
      res.send({ success: true, message: "Please check your mail" })
  })
}

function logError(e, func){
  // sendMailOnError(e, func)
}

export default router;